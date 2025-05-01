import path from 'node:path';
import type { Plugin } from 'vite';
import create_memoji_extractor from './memoji';
import create_schema_extractor from './schema';
import type { Extractor } from './types';

type LoadPluginContext = ThisParameterType<
	Extract<Plugin['load'], { handler: unknown }>['handler']
>;

type ResolveIdPluginContext = ThisParameterType<
	Extract<Plugin['resolveId'], { handler: unknown }>['handler']
>;

export default function prepare(): Plugin {
	const extractors: Extractor[] = [];

	async function run_extractor(full_path: string, ctx: LoadPluginContext | ResolveIdPluginContext) {
		const out_path = full_path.split('?')[0];
		const extractor = extractors.find((extractor) => extractor.out_path === out_path);

		if (!extractor) {
			return;
		}

		ctx.addWatchFile(extractor.in_path);

		try {
			await extractor();
		} catch (cause) {
			ctx.error(new Error('failed to run extractor', { cause }));
		}
	}

	return {
		name: 'prepare-plugin',
		enforce: 'pre',
		configResolved(config) {
			extractors.push(create_memoji_extractor(config.root), create_schema_extractor(config.root));
		},
		async resolveId(source, importer) {
			if (!importer) {
				return null;
			}

			const full_out_path = path.resolve(path.dirname(importer), source);
			await run_extractor(full_out_path, this);

			return null;
		},
		async load(id) {
			await run_extractor(id, this);
			return null;
		}
	};
}
