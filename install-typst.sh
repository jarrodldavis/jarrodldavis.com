#!/bin/sh
set -eu

TYPST_VERSION="0.11.1"

arch="$(uname -m)"

case "$arch" in
    aarch64 | arm64)
        basename="typst-aarch64-unknown-linux-musl"
        ;;

    x86_64)
        basename="typst-x86_64-unknown-linux-musl"
        ;;

    *)
        echo "fatal: unsupported architecture: $arch"
        exit 1
        ;;
esac

url="https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/${basename}.tar.xz"

curl -L "$url" | tar -C /usr/local/bin -Jxf - "$basename/typst" --strip-components=1

typst --version
