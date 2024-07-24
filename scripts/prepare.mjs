#!/bin/env -S node --disable-warning=ExperimentalWarning

import installSchema from "./_imprecv.mjs";
import installTypst from "./_typst.mjs";

const force = process.argv.includes("--force");

console.log("=> Installing `typst` CLI...");
await installTypst({ force });

console.log("=> Installing `imprecv` schema...");
await installSchema({ force });

console.log("=> Done!");
