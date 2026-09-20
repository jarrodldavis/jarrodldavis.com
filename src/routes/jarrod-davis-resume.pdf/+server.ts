import { load_resume } from '$lib/server';
import { render_pdf } from '$lib/server/typst';
import template from '$lib/template.typ?raw';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () =>
	new Response(await render_pdf(template, load_resume()), {
		headers: {
			'content-type': 'application/pdf'
		}
	});
