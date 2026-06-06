import { load_resume } from '$lib/server';
import { render_pdf } from '$lib/server/typst';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
	new Response(render_pdf(load_resume()), {
		headers: {
			'content-type': 'application/pdf'
		}
	});
