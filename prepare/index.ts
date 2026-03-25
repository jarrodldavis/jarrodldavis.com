#!/bin/env -S node

import extract_memoji from './memoji.ts';
import extract_schema from './schema.ts';

const base_path = process.cwd();

await extract_memoji(base_path)();
console.log('Memoji photo extracted successfully.');

await extract_schema(base_path)();
console.log('Schema extracted successfully.');
