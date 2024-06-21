#!/bin/zsh
set -euo pipefail

echo '==> Fixing directory permissions...'
sudo chown -v "$(id -un)":"$(id -gn)" .. .

echo '==> Installing pre-commit hook...'
ln -sfv "$(realpath .devcontainer/pre-commit.sh)" .git/hooks/pre-commit

echo '==> Removing global packages...'
npm ls --global --json \
    | jq --raw-output '.dependencies // [] | keys | .[]' \
    | xargs npm uninstall --global

echo '==> Setting up pnpm...'
sudo corepack enable
corepack prepare
pnpm config set store-dir ~/.local/share/pnpm/store

echo '==> Installing pnpm dependencies...'
pnpm install

echo '==> Done!'
