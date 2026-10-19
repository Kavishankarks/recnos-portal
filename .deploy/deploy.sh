#!/usr/bin/env bash
#
# Build and restart the RECNOS portal on the server.
#
# Run from /root/recnos-portal after `git pull origin main`.
#
# The copy steps are not optional. `output: "standalone"` produces
# .next/standalone/server.js plus a trimmed node_modules, but it does NOT copy
# the client assets or public/ into that directory. The standalone server
# resolves both relative to its own location, so without these copies the site
# serves HTML with no CSS, no JavaScript and no images.
#
# `set -euo pipefail` matters here: if the build fails, the copy and restart
# must not run, or the restart would bring up a stale or half-built release.
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Building"
npm run build

echo "==> Copying static assets into the standalone bundle"
rm -rf .next/standalone/.next/static
cp -r .next/static .next/standalone/.next/static

# public/ is optional; a project without one should still deploy.
if [ -d public ]; then
  rm -rf .next/standalone/public
  cp -r public .next/standalone/public
fi

echo "==> Restarting recnos-portal"
# --update-env picks up PORT and HOSTNAME from the ecosystem file.
pm2 reload ecosystem.config.js --update-env

echo "==> Done. Current status:"
pm2 list
