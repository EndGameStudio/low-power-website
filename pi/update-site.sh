#!/bin/sh
# Run on the Pi from cron or a systemd timer (e.g. every 15 minutes). Makes $SITE_DIR,
# the web root, match the `deploy` branch: one shallow commit, with nothing older kept.
#
# One-time setup:
#   git clone --depth 1 --branch deploy https://github.com/EndGameStudio/low-power-website.git /var/www/site
set -eu

SITE_DIR=${SITE_DIR:-/var/www/site}
cd "$SITE_DIR"

before=$(git rev-parse HEAD)
git fetch --quiet --depth 1 origin deploy
git reset --quiet --hard FETCH_HEAD
git clean --quiet -fdx

# deploy is force-pushed, so each update orphans the last one; drop it rather than let
# the SD card fill with old copies of the site.
if [ "$(git rev-parse HEAD)" != "$before" ]; then
  git reflog expire --expire=now --all
  git gc --quiet --prune=now
fi
