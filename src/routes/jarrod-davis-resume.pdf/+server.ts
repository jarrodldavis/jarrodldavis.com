import make_pdf_renderer from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const prerender = true;

const render_pdf = make_pdf_renderer();

export const GET: RequestHandler = () => render_pdf('/resume');
