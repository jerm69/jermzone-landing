'use client';

// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — do not edit in place.
// Canonical source: logpulse/client/Telemetry.tsx. Run logpulse/sync-clients.sh
// to propagate changes to every app; local edits will be overwritten.
// ─────────────────────────────────────────────────────────────────────────────
//
// Drop-in telemetry client. Mount once in the root layout:
//   <Telemetry app="wulv2" tokenStorageKey="token" metaFromStorage={{ league: 'activeLeague' }} />
//
// - Tracks page views including client-side navigation (what nginx cannot see)
// - Captures window errors / unhandled rejections
// - Batches events, flushes every 10s and on tab hide (sendBeacon)
// - Never throws, never blocks the app

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type TelemetryEvent = {
  type: 'page_view' | 'action' | 'error';
  action?: string;
  path?: string;
  referer?: string;
  meta?: Record<string, unknown>;
  ts: number;
};

export type TelemetryProps = {
  /** Event source label; must be allow-listed in the logpulse service. */
  app: string;
  /** Defaults to '/telemetry' (proxied to logpulse by nginx). */
  endpoint?: string;
  /** localStorage key holding the app's JWT, for user attribution. */
  tokenStorageKey?: string;
  /** { metaField: localStorageKey } merged into every event's meta. */
  metaFromStorage?: Record<string, string>;
};

type Config = TelemetryProps & { endpoint: string };

let queue: TelemetryEvent[] = [];
let config: Config | null = null;
let referrerSent = false;

function sessionId(): string {
  try {
    let sid = sessionStorage.getItem('lp_sid');
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem('lp_sid', sid);
    }
    return sid;
  } catch {
    return 'unknown';
  }
}

/**
 * `usePathname()` strips Next's basePath, so it reports `/app/dashboard` for a
 * page actually served at `/league/app/dashboard`. We record the real URL path
 * so events line up with nginx access logs and don't collide across apps.
 */
function fullPath(): string | undefined {
  try {
    return window.location.pathname;
  } catch {
    return undefined;
  }
}

function storageMeta(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed.slug ?? parsed.id ?? raw;
      return parsed;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

/** Record a custom action event, e.g. track('score_edit', { gameId }) */
export function track(action: string, meta?: Record<string, unknown>) {
  enqueue({ type: 'action', action, path: fullPath(), meta, ts: Date.now() });
}

function enqueue(e: TelemetryEvent) {
  if (queue.length >= 200) queue.shift(); // bound memory — drop oldest
  queue.push(e);
}

function flush(useBeacon = false) {
  if (!config || !queue.length) return;
  const baseMeta: Record<string, unknown> = {};
  for (const [field, key] of Object.entries(config.metaFromStorage || {})) {
    const v = storageMeta(key);
    if (v != null) baseMeta[field] = v;
  }
  const events = queue.splice(0, queue.length).map((e) => ({
    ...e,
    sessionId: sessionId(),
    meta: { ...baseMeta, ...(e.meta || {}) }
  }));
  const body = JSON.stringify({ app: config.app, events });
  try {
    if (useBeacon && navigator.sendBeacon) {
      // sendBeacon cannot carry an Authorization header, so unload-time events
      // are anonymous; they still correlate to the visit via sessionId.
      navigator.sendBeacon(config.endpoint, new Blob([body], { type: 'application/json' }));
    } else {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      const token = config.tokenStorageKey ? localStorage.getItem(config.tokenStorageKey) : null;
      if (token) headers.Authorization = `Bearer ${token}`;
      fetch(config.endpoint, { method: 'POST', headers, body, keepalive: true }).catch(() => {});
    }
  } catch {
    // swallow — telemetry must never break the app
  }
}

export default function Telemetry(props: TelemetryProps) {
  const pathname = usePathname();
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    config = { endpoint: '/telemetry', ...props };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush(true);
    };
    const onError = (ev: ErrorEvent) =>
      enqueue({
        type: 'error',
        action: 'window_error',
        path: fullPath(),
        meta: { message: String(ev.message).slice(0, 300) },
        ts: Date.now()
      });
    const onRejection = (ev: PromiseRejectionEvent) =>
      enqueue({
        type: 'error',
        action: 'unhandled_rejection',
        path: fullPath(),
        meta: { message: String(ev.reason).slice(0, 300) },
        ts: Date.now()
      });

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    const timer = setInterval(() => flush(), 10000);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Attach the external referrer to the first view of a session only, so we
    // can see where traffic came from without repeating it on every navigation.
    let referer: string | undefined;
    if (!referrerSent) {
      referrerSent = true;
      try {
        if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
          referer = document.referrer;
        }
      } catch {
        // ignore
      }
    }
    enqueue({ type: 'page_view', path: fullPath(), referer, ts: Date.now() });
  }, [pathname]);

  return null;
}
