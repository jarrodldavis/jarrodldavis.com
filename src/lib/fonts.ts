const paths = Object.values(
	import.meta.glob(
		[
			'/node_modules/source-sans/OTF/*.otf',
			'/node_modules/source-serif/OTF/*.otf',
			'/node_modules/source-code-pro/OTF/*.otf'
		],
		{ eager: true, import: 'default' }
	)
);

if (!paths.every((path) => typeof path === 'string')) {
	throw new Error('expected all font paths to be strings');
}

export const fontPaths = paths;
