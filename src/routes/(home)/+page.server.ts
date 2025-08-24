import { building } from '$app/environment';
import { VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL } from '$env/static/private';
import { load_resume } from '$lib/server';
import { fetch_image_info } from '$lib/server/image';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ url }) => {
	return {
		base_url: get_base_url(url),
		resume: load_resume(),
		images: {
			opengraph: await fetch_image_info('opengraph-image.png'),
			twitter: await fetch_image_info('twitter-icon.png'),
			apple: await fetch_image_info('apple-touch-icon.png'),
			favicon_png: await fetch_image_info('favicon.png'),
			favicon_ico: await fetch_image_info('favicon.ico')
		}
	};
};

function get_base_url(load_url: URL) {
	if (!building) {
		return load_url.toString();
	} else if (VERCEL_ENV === 'production') {
		return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
	} else {
		return `https://${VERCEL_URL}`;
	}
}
