// @ts-check

export default /** @satisfies {import('stylelint').Config} */ ({
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-no-unsupported-browser-features'],
	rules: {
		'plugin/no-unsupported-browser-features': true,
	},
	overrides: [{ files: '**/*.svelte', customSyntax: 'postcss-html' }],
});
