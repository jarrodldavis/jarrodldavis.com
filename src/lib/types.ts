import type { RESUME_SCHEMA } from '$lib/schema';
import type { FromSchema } from 'json-schema-to-ts';

export type Resume = FromSchema<typeof RESUME_SCHEMA>;
export type Location = FromSchema<(typeof RESUME_SCHEMA)['definitions']['location']>;
export type Profile = Resume['profile'];
export type WorkExperience = Resume['work'][number];
export type EducationExperience = Resume['education'][number];
export type ProjectExperience = Resume['projects'][number];
export type SkillCategory = Resume['skills'][number];
export type Language = Resume['languages'][number];
