import { load_resume } from '$lib/server';
import type { PageServerLoad } from './$types';

export const csr = false;

export const prerender = true;

export const load: PageServerLoad = () => {
	return { resume: load_resume() };
};
