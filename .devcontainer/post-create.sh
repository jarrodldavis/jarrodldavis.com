#!/bin/sh

set -e

echo '==> Installing Playwright browsers...'
pnpm playwright install --with-deps

echo '==> Performing initial Vite build...'
pnpm generate
pnpm build

echo '==> Done!'
