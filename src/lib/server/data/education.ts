import { display_string } from '$lib/server/data/common';
import yaml from 'yaml';
import { z } from 'zod';
import education_raw from './education.yaml?raw';
import { skill_usage_object } from './skills';

const education_schema = z.array(
	skill_usage_object((base) =>
		base.extend({
			name: display_string,
			url: z.string().url(),
			dates: display_string,
			qualification: display_string,
		}),
	),
);

const education = education_schema.parse(yaml.parse(education_raw));

type EducationEntry = (typeof education)[number];

export { education, type EducationEntry };
