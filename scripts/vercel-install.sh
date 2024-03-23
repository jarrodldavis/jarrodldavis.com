#!/bin/sh

set -e

echo '==> Collecting environment info...'
echo '--> Amazon Linux' && cat /etc/os-release
echo '--> dnf' && dnf --version
echo '--> Node.js' && node --version
echo '--> pnpm' && pnpm --version

echo '==> Installing pnpm dependencies...'
pnpm install

echo '==> Installing Chromium system dependencies...'
# https://github.com/amazonlinux/amazon-linux-2023/issues/356#issuecomment-1897811704
dnf install --assumeyes findutils
dnf deplist https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm | \
  grep provider | \
  sort --unique | \
  awk '{print $2}' | \
  xargs dnf install --best --allowerasing --skip-broken --assumeyes

echo '==> Installing Chromium...'
pnpm playwright install chromium
