#!/bin/env node
// @ts-check

import extract_memoji from './memoji.js';
import extract_schema from './schema.js';

const base_path = process.cwd();

await extract_memoji(base_path)();
console.log('Memoji photo extracted successfully.');

await extract_schema(base_path)();
console.log('Schema extracted successfully.');
