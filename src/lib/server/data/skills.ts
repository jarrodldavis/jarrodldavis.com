import yaml from 'yaml';
import { z } from 'zod';
import { display_string } from './common';
import skills_raw from './skills.yaml?raw';

export const identifier = z
	.string()
	.min(1)
	.regex(/^[a-z0-9_]+$/);

const identifier_reference = /\[([^\]]+)\]/g;

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
		type Skill = (typeof parsed_groups)[string]['skills'][string] & { group_id: string };

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

const skill_usage_description = display_string.transform((value, ctx) => {
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
});

const base_skill_usage_object = z.strictObject({
	description: skill_usage_description,
	additional_skills: z.array(skill_identifier).nonempty().optional(),
});

function skill_usage_object<T extends typeof base_skill_usage_object>(
	extend_schema: (base: typeof base_skill_usage_object) => T,
) {
	const full_schema = extend_schema(base_skill_usage_object);
	return full_schema.transform((obj: z.infer<typeof full_schema>, ctx) => {
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
}

export { skill_identifier, skill_usage_object };

type Skills = typeof skills;
type SkillUsage = z.infer<ReturnType<typeof skill_usage_object>>;

export { skill_groups, skills, type SkillUsage, type Skills };
