import yaml from 'yaml';
import { z } from 'zod';
import { display_string } from './common';
import experience_raw from './experience.yaml?raw';
import { skill_identifier, skill_usage_object } from './skills';

const experience_schema = z
	.array(
		z
			.strictObject({
				company: display_string,
				url: z.string().url(),
				titles: z.array(z.strictObject({ name: display_string, dates: display_string })).nonempty(),
				product: display_string,
				responsibilities: z.array(skill_usage_object((base) => base)).nonempty(),
				additional_skills: z.record(skill_identifier, z.null()),
			})
			.superRefine((entry, ctx) => {
				const skills = new Set(
					entry.responsibilities.flatMap((responsibility) => responsibility.all_skills),
				);

				Object.keys(entry.additional_skills).forEach((skill_id, index) => {
					if (skills.has(skill_id)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `'${skill_id}' is already referenced in a responsibility`,
							path: [...ctx.path, 'additional_skills', index],
						});
					}
				});
			}),
	)
	.nonempty();

const experience = experience_schema.parse(yaml.parse(experience_raw));

type ExperienceEntry = (typeof experience)[number];

export { experience, type ExperienceEntry };
