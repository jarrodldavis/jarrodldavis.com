#!/bin/sh
set -eu

dnf install -y tar xz
./install-typst.sh
