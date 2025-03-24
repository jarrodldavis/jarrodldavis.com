import { load_resume } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const resume = await load_resume();
	return { resume };
}) satisfies PageServerLoad;
