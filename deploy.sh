#!/bin/bash
# Deploy jermzone-landing to Pi. Build locally, ship artifacts.
# Run from repo root: ./deploy.sh

set -e

REMOTE_USER="jt"
REMOTE_HOST="192.168.1.111"
REMOTE_PATH="/home/jt/jermzone-landing"

# Built here rather than on the Pi: remote `npm run build` competes with the
# live services for the Pi's limited RAM, which previously caused Next.js heap
# exhaustion and PM2 restart storms. Matches jermzone-games and wulv2.
echo "🏗️  Building locally..."
npm run build

echo "🔄 Syncing to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH} ..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next/cache' \
  --exclude='.env*' \
  --exclude='*.log' \
  ./ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "🚀 Installing runtime deps and restarting PM2 ..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" "
  set -e
  cd ${REMOTE_PATH}
  npm ci --production
  pm2 startOrRestart ecosystem.config.js
  pm2 save
"

echo "✅ jermzone-landing deployed."
