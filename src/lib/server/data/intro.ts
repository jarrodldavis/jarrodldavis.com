import yaml from 'yaml';
import { z } from 'zod';
import intro_raw from './intro.yaml?raw';
import { skill_usage_object } from './skills';

const intro_schema = z.array(skill_usage_object((base) => base));
const intro = intro_schema.parse(yaml.parse(intro_raw));

type IntroEntry = (typeof intro)[number];

export { intro, type IntroEntry };
