#!/bin/sh
set -eu

rm -rf public
mkdir public
typst compile imprecv/template.typ public/jarrod-davis-resume.pdf
