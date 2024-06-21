#!/bin/env node

// @ts-check

import installTypst from "./_typst.mjs";

console.log("=> Installing `typst` CLI...");
await installTypst();

console.log("=> Done!");
