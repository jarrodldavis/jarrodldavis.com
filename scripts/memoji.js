#!/bin/env node
// @ts-check
import ICAL from 'ical.js';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const in_path = path.join(process.cwd(), path.join('src', 'routes', 'memoji.vcf'));
const raw_vcf = await fs.readFile(in_path, 'utf8');

const parsed_vcf = ICAL.Component.fromString(raw_vcf);
assert.equal(parsed_vcf.name, 'vcard', 'expected parsed vCard');

const photo = parsed_vcf.getFirstPropertyValue('photo');
assert.ok(photo, 'expected parsed vCard photo value to be available');
assert.ok(typeof photo === 'string', 'expected parsed vCard photo value to be a string');

const out = Buffer.from(photo, 'base64');
const out_path = path.join(process.cwd(), path.join('src', 'routes', 'memoji.png'));
await fs.writeFile(out_path, out);

console.log('Memoji photo extracted successfully.');
