import { read } from '$app/server';
import data_path from '$lib/data.yaml';
import { RESUME_SCHEMA, type Resume } from '$lib/schema';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import YAML from 'yaml';

export async function load_resume(): Promise<Resume> {
	const raw_data = await read(data_path).text();
	const parsed_data = YAML.parse(raw_data);

	const ajv = new Ajv({ allErrors: true });
	addFormats(ajv);
	const validate = ajv.compile<Resume>(RESUME_SCHEMA);

	if (!validate(parsed_data)) {
		throw validate.errors
			? new Ajv.ValidationError(validate.errors)
			: new Error('Unknown validation error');
	}

	return parsed_data;
}
