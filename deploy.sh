#!/usr/bin/env bash
# Build the site and copy it to DreamHost from your own computer.
# Use this if you'd rather not use the GitHub Actions workflow, or as a fallback.
#
# Usage (replace the three values with yours):
#   DREAMHOST_USER=fossweb \
#   DREAMHOST_HOST=iad1-shared-a1-23.dreamhost.com \
#   DREAMHOST_PATH=fossapalooza.eu \
#   ./deploy.sh
#
# Add DRY_RUN=1 to see what would change without copying anything.
set -euo pipefail

: "${DREAMHOST_USER:?Set DREAMHOST_USER to your DreamHost shell user}"
: "${DREAMHOST_HOST:?Set DREAMHOST_HOST to your DreamHost server name}"
: "${DREAMHOST_PATH:?Set DREAMHOST_PATH to your website folder, e.g. fossapalooza.eu}"

# Safety check: rsync --delete removes files on the server that are not in public/,
# so never point it at the home folder itself.
case "${DREAMHOST_PATH%/}" in
  ""|"/"|"~"|"."|".."|"~/") echo "Refusing to deploy: DREAMHOST_PATH must be your website folder, e.g. fossapalooza.eu" >&2; exit 1 ;;
esac

hugo --minify --gc

RSYNC_FLAGS=(-avz --delete --filter='protect .well-known/')
if [[ "${DRY_RUN:-}" == "1" ]]; then RSYNC_FLAGS+=(--dry-run); fi

rsync "${RSYNC_FLAGS[@]}" public/ "${DREAMHOST_USER}@${DREAMHOST_HOST}:~/${DREAMHOST_PATH%/}/"