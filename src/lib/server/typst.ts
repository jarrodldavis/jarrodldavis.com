import { read } from '$app/server';
import template from '$lib/template.typ?raw';
import type { Resume } from '$lib/types';
import {
	NodeCompiler as Compiler,
	type NodeTypstDocument as Document,
	type NodeTypstCompileResult as Result
} from '@myriaddreamin/typst-ts-node-compiler';
import assert from 'node:assert/strict';
import CodeItalic from 'source-code-pro/VF/SourceCodeVF-Italic.otf';
import CodeRoman from 'source-code-pro/VF/SourceCodeVF-Upright.otf';
import SansItalic from 'source-sans/VF/SourceSans3VF-Italic.otf';
import SansRoman from 'source-sans/VF/SourceSans3VF-Upright.otf';
import SerifItalic from 'source-serif/VAR/SourceSerif4Variable-Italic.otf';
import SerifRoman from 'source-serif/VAR/SourceSerif4Variable-Roman.otf';

type SuccessResult = Result & {
	result: Document;
};

function handleErrors(compiler: Compiler, result: Result): asserts result is SuccessResult {
	const error = result.takeError();
	const warnings = result.takeWarnings();

	if (error?.compilationStatus === 'internal_error') {
		throw new Error('Typst compile failed with an internal error.', { cause: error });
	}

	const causes = [error, warnings].filter(Boolean);
	const diagnostics = causes.flatMap((error) => compiler.fetchDiagnostics(error) as unknown[]);

	if (diagnostics.length) {
		const cause = causes[0];
		throw new AggregateError(diagnostics, `Typst compile failed with diagnostics.`, { cause });
	}

	if (!result.result) {
		throw new Error('Typst compile failed with an unknown error.');
	}
}

const FONT_PATHS = [SansItalic, SansRoman, SerifItalic, SerifRoman, CodeItalic, CodeRoman];
const FONTS = await Promise.all(FONT_PATHS.map(async (f) => Buffer.from(await read(f).bytes())));

export function render_pdf(resume: Resume): ArrayBuffer {
	const compiler = Compiler.create({ fontArgs: [{ fontBlobs: FONTS }], workspace: '/' });
	compiler.addSource('/data.yaml', JSON.stringify(resume));
	const compiled = compiler.compile({ mainFileContent: template });
	handleErrors(compiler, compiled);
	const rendered = compiler.pdf(compiled.result);
	assert(rendered.buffer instanceof ArrayBuffer, 'expected rendered PDF to be an ArrayBuffer');
	return rendered.buffer;
}
