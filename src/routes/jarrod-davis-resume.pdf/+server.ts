import render_pdf from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ fetch }) => render_pdf({ fetch, pathname: '/resume' });
