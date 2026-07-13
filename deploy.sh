#!/bin/bash
# Deploy jermzone-landing to Pi. Run from repo root: ./deploy.sh

set -e

REMOTE_USER="jt"
REMOTE_HOST="192.168.1.111"
REMOTE_PATH="/home/jt/jermzone-landing"

echo "🔄 Syncing to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH} ..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env*' \
  --exclude='*.log' \
  ./ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "🚀 Installing deps, building, and restarting PM2 ..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" "
  set -e
  cd ${REMOTE_PATH}
  npm install
  npm run build
  pm2 startOrRestart ecosystem.config.js
  pm2 save
"

echo "✅ jermzone-landing deployed."
