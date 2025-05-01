import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { builtinModules } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	...ts.configs.stylisticTypeChecked,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: {
					loadTypeScriptPlugins: true,
					allowDefaultProject: ['*.config.js']
				}
			}
		},
		rules: {
			'no-undef': 'off',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-restricted-imports': [
				'error',
				{
					paths: builtinModules.map((name) => ({
						name: name,
						message: `Use 'node:${name}' instead.`
					}))
				}
			],
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
