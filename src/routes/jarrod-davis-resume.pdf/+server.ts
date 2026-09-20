import { render_pdf } from '$lib/server/typst';
import type { RequestHandler } from './$types';
import template from './template.typ?raw';

export const prerender = true;

export const GET: RequestHandler = async () =>
	new Response(await render_pdf(template), {
		headers: {
			'content-type': 'application/pdf'
		}
	});
