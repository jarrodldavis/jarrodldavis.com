// @ts-check

export default /** @satisfies {import('stylelint').Config} */ ({
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-no-unsupported-browser-features'],
	rules: {
		'custom-property-pattern': null,
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
		'plugin/no-unsupported-browser-features': [true, { ignore: ['css-nesting'] }],
	},
	overrides: [{ files: '**/*.svelte', customSyntax: 'postcss-html' }],
});
