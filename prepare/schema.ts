import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import { type Extractor, create_writer } from './utils.ts';

export default function create_schema_extractor(base_path: string): Extractor {
	const in_path = path.join(base_path, path.join('src', 'lib', 'schema.yaml'));
	const out_path = path.join(base_path, path.join('src', 'lib', 'schema.ts'));
	const write = create_writer();

	async function schema_extractor() {
		const raw_schema = await fs.readFile(in_path, 'utf8');
		const parsed_schema = YAML.parse(raw_schema) as unknown;
		const stringified_schema = JSON.stringify(parsed_schema, null, '\t');
		const out = `
// This file is auto-generated from schema.yaml. Do not edit it directly.

import type { JSONSchema } from 'json-schema-to-ts';

export const RESUME_SCHEMA = ${stringified_schema} as const satisfies JSONSchema;
`.trimStart();

		await write(out_path, Buffer.from(out, 'utf8'));
	}

	schema_extractor.in_path = in_path;
	schema_extractor.out_path = out_path;
	return schema_extractor;
}
