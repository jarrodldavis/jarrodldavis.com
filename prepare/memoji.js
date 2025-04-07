import ICAL from 'ical.js';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { create_writer } from './utils.js';

/**
 * @param {string} base_path
 * @returns {import('./types').Extractor}
 */
export default function create_memoji_extractor(base_path) {
	const in_path = path.join(base_path, path.join('src', 'lib', 'memoji.vcf'));
	const out_path = path.join(base_path, path.join('src', 'lib', 'memoji.png'));
	const write = create_writer();

	async function memoji_extractor() {
		const raw_vcf = await fs.readFile(in_path, 'utf8');

		const parsed_vcf = ICAL.Component.fromString(raw_vcf);
		assert.equal(parsed_vcf.name, 'vcard', 'expected parsed vCard');

		const photo = parsed_vcf.getFirstPropertyValue('photo');
		assert.ok(photo, 'expected parsed vCard photo value to be available');
		assert.ok(typeof photo === 'string', 'expected parsed vCard photo value to be a string');

		const out = Buffer.from(photo, 'base64');
		await write(out_path, out);
	}

	memoji_extractor.in_path = in_path;
	memoji_extractor.out_path = out_path;
	return memoji_extractor;
}
