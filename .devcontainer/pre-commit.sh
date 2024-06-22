#!/bin/zsh
set -euo pipefail

pnpm prettier --check .
pnpm build

# restart dev server since `distDir` was cleared before build
touch next.config.mjs
