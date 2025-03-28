import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import prepare from './prepare/vite-plugin';

export default defineConfig({
	plugins: [prepare(), tailwindcss(), enhancedImages(), sveltekit()],
	assetsInclude: ['**/*.yaml']
});
