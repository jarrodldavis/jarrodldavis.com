import { render_png } from '$lib/server/typst';
import type { RequestHandler } from './$types';
import template from './template.typ?raw';

export const prerender = true;

export const GET: RequestHandler = async () =>
	new Response(await render_png(template), {
		headers: {
			'content-type': 'image/png'
		}
	});
