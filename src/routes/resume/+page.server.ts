import { load_resume } from '$lib/server';
import type { PageServerLoad } from './$types';

export const csr = false;

export const prerender = true;

export const load = (async () => {
	const resume = await load_resume();
	return { resume };
}) satisfies PageServerLoad;
