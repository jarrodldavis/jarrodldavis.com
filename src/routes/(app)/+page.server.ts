import { education, experience, intro, skills } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { education, experience, intro, skills };
};
