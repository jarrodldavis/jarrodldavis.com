#!/bin/env node
// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const in_path = path.join(process.cwd(), path.join('src', 'lib', 'schema.yaml'));
const raw_schema = await fs.readFile(in_path, 'utf8');
const parsed_schema = YAML.parse(raw_schema);
const stringified_schema = JSON.stringify(parsed_schema, null, '\t');
const out_path = path.join(process.cwd(), path.join('src', 'lib', 'schema.ts'));
const out = `
// This file is auto-generated from schema.yaml. Do not edit it directly.

import type { JSONSchema } from 'json-schema-to-ts';

export const RESUME_SCHEMA = ${stringified_schema} as const satisfies JSONSchema;
`.trimStart();

await fs.writeFile(out_path, out, 'utf8');

console.log('Schema generated successfully.');
