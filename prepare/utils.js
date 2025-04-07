import fs from 'node:fs/promises';

export function create_writer() {
	/**
	 * @type {Buffer | undefined}
	 */
	let old;

	/**
	 * @param {string} file
	 * @param {Buffer} data
	 */
	return async function write(file, data) {
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
