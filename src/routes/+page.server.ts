import { experience, intro, skills } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { intro, experience, skills };
};
