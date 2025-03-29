#!/bin/zsh
set -euo pipefail

echo '==> Installing Playwright browsers...'
pnpm playwright install --with-deps

echo '==> Done!'
