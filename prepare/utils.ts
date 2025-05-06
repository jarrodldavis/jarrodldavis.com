import fs from 'node:fs/promises';

export interface Extractor {
	(): Promise<void>;
	in_path: string;
	out_path: string;
}

export function create_writer() {
	let old: Buffer | undefined;

	return async function write(file: string, data: Buffer) {
		if (old?.equals(data)) {
			return;
		}

		const atomic_id = Math.random().toString(16);
		const atomic_path = file + '.' + atomic_id;

		await fs.writeFile(atomic_path, data, 'utf8');
		await fs.rename(atomic_path, file);

		old = data;
	};
}
