import global_data from '@csstools/postcss-global-data';
import { sveltekit } from '@sveltejs/kit/vite';
import browserslist from 'browserslist-to-esbuild';
import { createRequire } from 'module';
import open_props from 'open-props';
import jit_props from 'postcss-jit-props';
import preset_env from 'postcss-preset-env';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		sourcemap: true,
		target: browserslist(),
	},
	css: {
		devSourcemap: true,
		postcss: {
			plugins: [
				jit_props(open_props),
				global_data({
					files: [createRequire(import.meta.url).resolve('open-props/src/props.media.css')],
				}),
				preset_env(),
			],
		},
	},
	esbuild: {
		target: 'es2022',
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
