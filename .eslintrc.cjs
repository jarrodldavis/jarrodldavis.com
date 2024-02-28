// @ts-check

const { include: config_files } = /** @satisfies {{ include: string[] }} */ (
	require('./tsconfig.config.json')
);

module.exports = /** @satisfies {import('eslint').Linter.Config} */ ({
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:svelte/all',
		'plugin:svelte/prettier',
		'plugin:compat/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
		extraFileExtensions: ['.svelte'],
		EXPERIMENTAL_useProjectService: true,
	},
	settings: {
		lintAllEsApis: true,
	},
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	rules: {
		'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
		'@typescript-eslint/no-unused-vars': 'off',
		'no-undef': 'off',
		'svelte/block-lang': ['error', { enforceScriptPresent: true, script: 'ts' }],
		'svelte/experimental-require-strict-events': 'off',
		'svelte/@typescript-eslint/no-unnecessary-condition': 'off',
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		{
			files: '*.cjs',
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: config_files,
			parserOptions: {
				project: 'tsconfig.config.json',
				EXPERIMENTAL_useProjectService: false,
			},
		},
	],
});
