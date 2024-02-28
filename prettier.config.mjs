// @ts-check

export default /** @satisfies {import('prettier').Config} */ ({
	useTabs: true,
	singleQuote: true,
	printWidth: 100,
	proseWrap: 'always',
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-organize-imports'],
	overrides: [
		{ files: '*.svelte', options: { parser: 'svelte' } },
		{ files: ['.vscode/*.json', 'tsconfig.json'], options: { parser: 'jsonc' } },
		// https://github.com/microsoft/vscode/pull/146957
		{ files: '.devcontainer/*.json', options: { parser: 'jsonc', trailingComma: 'none' } },
	],
});
