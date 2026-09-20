import type { Plugin } from 'vite';
import create_memoji_extractor from './memoji.ts';
import create_schema_extractor from './schema.ts';
import type { Extractor } from './utils.ts';

export default function prepare(): Plugin {
	const extractors: Extractor[] = [];

	return {
		name: 'prepare-plugin',
		enforce: 'pre',
		configResolved(config) {
			extractors.push(create_memoji_extractor(config.root), create_schema_extractor(config.root));
		},
		async buildStart() {
			for (const extractor of extractors) {
				this.addWatchFile(extractor.in_path);

				try {
					await extractor();
				} catch (cause) {
					this.error(Error('failed to run extractor', { cause }));
				}
			}
		},
		async watchChange(id) {
			const extractor = extractors.find((extractor) => extractor.in_path === id);
			if (!extractor) {
				return;
			}

			try {
				await extractor();
			} catch (cause) {
				this.error(Error('failed to run extractor', { cause }));
			}
		}
	};
}
