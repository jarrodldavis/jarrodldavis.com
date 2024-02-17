#!/bin/sh

set -e

echo '==> Performing initial Vite build...'
pnpm generate
pnpm build

echo '==> Installing Playwright browsers...'
pnpm playwright install --with-deps

echo '==> Done!'
