import make_pdf_renderer from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const prerender = true;

const render_pdf = make_pdf_renderer();

export const GET: RequestHandler = ({ fetch, url }) => {
	return render_pdf({ fetch, origin: url.origin, pathname: '/resume' });
};
