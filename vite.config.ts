import { sveltekit } from '@sveltejs/kit/vite';
import browserslist from 'browserslist-to-esbuild';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		sourcemap: true,
		target: browserslist(),
	},
	css: {
		devSourcemap: true,
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
