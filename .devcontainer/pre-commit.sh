#!/bin/zsh
set -euo pipefail

pnpm install
pnpm build
pnpm check
pnpm lint
