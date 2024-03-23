#!/bin/sh

set -e

pnpm run generate
pnpm run build
pnpm run lint
