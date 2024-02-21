import type { Config } from '@sveltejs/adapter-vercel';
import type { RequestHandler } from './$types';

export const prerender = false;

export const config: Config = { runtime: 'edge' };

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/jarrod-davis-resume.pdf');
	if (!response.ok) {
		return response;
	}

	// Manually clone response since `Response#clone` doesn't always work.
	// Apparently `undici` doesn't know what cloning means...
	const headers = new Headers(response.headers);
	headers.append('content-type', 'application/pdf');
	headers.append('content-disposition', 'attachment; filename="jarrod-davis-resume.pdf"');

	const { status, statusText } = response;
	return new Response(response.body, { headers, status, statusText });
};
