#!/usr/bin/env bash
#
# Build and restart the RECNOS portal on the server.
#
# Run from anywhere; the script resolves the repo root itself. Usage:
#   cd /root/recnos-portal && git pull origin main && ./.deploy/deploy.sh
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

# This script lives in .deploy/, so the repo root is one level up. Resolving it
# here rather than relying on the caller's cwd means `npm run build` and the
# asset copies below always run against the project, not the .deploy directory.
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

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
# `pm2 reload` updates the environment but does NOT change the script path of a
# process that is already running. If ecosystem.config.js has changed the
# command itself, the process must be deleted and recreated instead. Delete and
# start here is the safe form: it always applies the current config.
# --update-env picks up PORT and HOSTNAME from the ecosystem file.
if pm2 describe recnos-portal >/dev/null 2>&1; then
  pm2 delete recnos-portal >/dev/null
fi
pm2 start .deploy/ecosystem.config.js --update-env

echo "==> Done. Current status:"
pm2 list
