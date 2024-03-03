import yaml from 'yaml';
import { z } from 'zod';
import experience_raw from './experience.yaml?raw';
import intro_raw from './intro.yaml?raw';
import skills_raw from './skills.yaml?raw';

const identifier_reference = /\[([^\]]+)\]/g;

const identifier = z
	.string()
	.min(1)
	.regex(/^[a-z0-9_]+$/);

const display_string = z.string().min(1);

const skills_schema = z
	.record(
		identifier,
		z.strictObject({
			name: display_string,
			skills: z.record(
				identifier,
				z.strictObject({
					name: z
						.tuple([display_string, display_string])
						.refine(([short, long]) => short.length < long.length, {
							message: 'expected short display name to be shorter than long',
						})
						.transform(([short, long]) => ({ short, long }))
						.or(display_string.transform((value) => ({ short: value, long: value }))),
					url: z.string().url().optional(),
				}),
			),
		}),
	)
	.transform((parsed_groups, ctx) => {
		type Skill = (typeof parsed_groups)[string]['skills'][string] & {
			group_id: string;
		};
		const skills = new Map<string, Skill>();
		const groups = new Map<string, { name: string; skills: string[] }>();

		for (const [group_id, group] of Object.entries(parsed_groups)) {
			const group_skills = new Array<string>();
			for (const [skill_id, skill] of Object.entries(group.skills)) {
				if (skills.has(skill_id)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `'${skill_id}' is an already-defined skill identifier`,
						path: [...ctx.path, group_id, 'skills', skill_id],
					});
				} else {
					skills.set(skill_id, { ...skill, group_id });
					group_skills.push(skill_id);
				}
			}
			groups.set(group_id, { name: group.name, skills: group_skills });
		}

		return { skills, skill_groups: groups };
	});

const { skills, skill_groups } = skills_schema.parse(yaml.parse(skills_raw));

const skill_identifier = identifier.refine(
	(val) => skills.has(val),
	(val) => ({ message: `'${val}' is not a defined skill identifier` }),
);

const skill_usage_object = z
	.strictObject({
		description: display_string.transform((value, ctx) => {
			const matches = value.matchAll(identifier_reference);
			const parts = Array<{ literal: string } | { skill_id: string }>();
			let index = 0;

			for (const match of matches) {
				if (!('index' in match)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `The match '${match[0]}' did not provide a match index`,
						fatal: true,
					});
					return parts;
				}

				const ref_start = match.index;
				parts.push({ literal: value.slice(index, ref_start) });
				index = ref_start + match[0].length;

				const skill_id = match[1];
				if (!skill_id) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `'${match[0]}' is not a valid identifier reference`,
					});
					parts.push({ literal: value.slice(ref_start, index) });
				} else if (!skills.has(skill_id)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `'${match[0]}' is not a defined skill identifier`,
					});
					parts.push({ literal: value.slice(ref_start, index) });
				} else {
					parts.push({ skill_id });
				}
			}

			parts.push({ literal: value.slice(index, value.length) });

			return parts;
		}),
		additional_skills: z.array(skill_identifier).nonempty().optional(),
	})
	.transform((obj, ctx) => {
		let skills = obj.description.flatMap((part) => ('skill_id' in part ? part.skill_id : []));

		if (obj.additional_skills) {
			obj.additional_skills.forEach((skill_id, index) => {
				if (skills.includes(skill_id)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `'${skill_id}' is already referenced in the description`,
						path: [...ctx.path, 'additional_skills', index],
					});
				}
			});

			skills = skills.concat(obj.additional_skills);
		}

		return { ...obj, all_skills: skills };
	});

const intro_schema = z.array(skill_usage_object);
const intro = intro_schema.parse(yaml.parse(intro_raw));

const experience_schema = z
	.array(
		z
			.strictObject({
				company: display_string,
				url: z.string().url(),
				titles: z.array(z.strictObject({ name: display_string, dates: display_string })).nonempty(),
				product: display_string,
				responsibilities: z.array(skill_usage_object).nonempty(),
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

export type SkillUsage = z.infer<typeof skill_usage_object>;
export type IntroEntry = (typeof intro)[number];
export type ExperienceEntry = (typeof experience)[number];
export type Skills = typeof skills;

export { experience, intro, skill_groups, skills };
