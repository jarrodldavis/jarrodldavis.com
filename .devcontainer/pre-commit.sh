#!/bin/zsh
set -euo pipefail

pnpm prettier --check .
pnpm build
