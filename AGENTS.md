# jermzone-landing

Next.js 14 landing page (MUI). Served at the root of `jerm.zapto.org`, port
3002, PM2 name `jermzone-landing`.

No `basePath` — this app owns `/`. The sibling apps mount at `/games` and
`/league`.

## Commands

```bash
npx tsc --noEmit     # verify
npm run build
npm run dev          # localhost:3002
./deploy.sh          # or: jz deploy landing
```

`npm run lint` currently prompts to configure ESLint instead of running checks;
use `npx tsc --noEmit` and `npm run build` until lint is configured.

## Deploy

Builds **locally** and rsyncs `.next`. It previously built on the Pi, which
competes with the live services for limited RAM — the same pattern that caused
Next.js heap exhaustion during wulv2 builds.

## nginx

`nginx.conf` in this repo is the **reference** for the :80 routing intent of
the whole Pi (landing, games, league, api, telemetry). It is **not** the live
config: certbot added 443 blocks for `jerm.zapto.org`,
`wakeupleague.servegame.com`, `wakeupleague.com` and `www.wakeupleague.com`.
Copying this file over the live one would remove HTTPS from every site.

To change nginx:

```bash
jz nginx pull    # fetch live + timestamped backup
jz nginx test    # sudo nginx -t on the Pi
jz nginx apply   # installs the logpulse includes only; never overwrites live
```

Port map: 3000 wulv2-frontend, 3001 wulv2-backend, 3002 landing, 3003 games,
3004 logpulse.

## Telemetry

`src/components/Telemetry.tsx` is **generated** — edit
`logpulse/client/Telemetry.tsx` and run `logpulse/sync-clients.sh`. Mounted in
`src/app/layout.tsx` as `<Telemetry app="jermzone" />` (anonymous; this app has
no login).
