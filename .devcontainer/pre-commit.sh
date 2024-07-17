#!/bin/zsh
set -euo pipefail

pnpm lint
pnpm build

# restart dev server since `distDir` was cleared during build
touch next.config.mjs
