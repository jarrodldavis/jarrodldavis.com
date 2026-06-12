#!/bin/env -S node

import { format } from '@typstyle/typstyle-wasm-bundler';
import { glob, readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

interface Options {
	check?: boolean;
	write?: boolean;
}

const ExitCodes = {
	Success: 0,
	Format: 1,
	Error: 2
} as const;

type ExitCode = (typeof ExitCodes)[keyof typeof ExitCodes];

async function typstyle(options: Options = {}): Promise<ExitCode> {
	const { check = false, write = false } = options;

	const ignores = (await readFile('.gitignore', 'utf-8'))
		.split('\n')
		.filter((line) => line.trim() !== '' && !line.startsWith('#'));

	const typstFiles = await Array.fromAsync(glob('**/*.typ', { exclude: ignores }));

	if (typstFiles.length === 0) {
		console.log('No Typst files found');
		return ExitCodes.Success;
	}

	console.log(`Found ${typstFiles.length} Typst file(s)`);

	let result: ExitCode = ExitCodes.Success;

	for (const filePath of typstFiles) {
		const content = await readFile(filePath, 'utf-8');

		try {
			const formatted = format(content, { tab_spaces: 2, max_width: 120, wrap_text: false });

			if (content !== formatted) {
				if (check) {
					console.log(`✗ ${filePath} - formatting needed`);
					result = ExitCodes.Format;
				} else if (write) {
					await writeFile(filePath, formatted, 'utf-8');
					console.log(`✓ ${filePath} - formatted`);
				} else {
					console.log(`\n--- ${filePath} ---`);
					console.log(formatted);
				}
			} else {
				console.log(`✓ ${filePath} - already formatted`);
			}
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			console.error(`✗ ${filePath} - error: ${errorMessage}`);
			result = ExitCodes.Error;
		}
	}

	return result;
}

const { values } = parseArgs({
	options: {
		check: { type: 'boolean', description: 'Check if files need formatting' },
		write: { type: 'boolean', description: 'Format files in place' }
	}
});

process.exitCode = await typstyle({
	check: values.check ?? false,
	write: values.write ?? false
});
