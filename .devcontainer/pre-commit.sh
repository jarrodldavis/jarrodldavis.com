#!/bin/zsh
set -euo pipefail

pnpm build
pnpm lint
