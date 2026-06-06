import template from '$lib/template.typ?raw';
import type { Resume } from '$lib/types';
import {
	NodeCompiler as Compiler,
	type NodeTypstDocument as Document,
	type NodeTypstCompileResult as Result
} from '@myriaddreamin/typst-ts-node-compiler';
import assert from 'node:assert/strict';

type SuccessResult = Result & {
	result: Document;
};

function isDiagnostic(v: unknown): v is { message: string } {
	return !!v && typeof v === 'object' && 'message' in v && typeof v.message === 'string';
}

function handleErrors(compiler: Compiler, result: Result): asserts result is SuccessResult {
	const error = result.takeError();
	const warnings = result.takeWarnings();

	if (error?.compilationStatus === 'internal_error') {
		throw new Error('Typst compile failed with an internal error.', { cause: error });
	}

	const causes = [error, warnings].filter(Boolean);
	const diagnostics = causes.flatMap((error) => compiler.fetchDiagnostics(error) as unknown[]);

	const cause = causes[0];
	if (diagnostics.length === 1) {
		const message = diagnostics.find(isDiagnostic)?.message ?? '<unknown>';
		throw new Error(`Typst compile failed with a diagnostic: ${message}`, { cause });
	} else if (diagnostics.length > 1) {
		throw new AggregateError(diagnostics, `Typst compile failed with diagnostics.`, { cause });
	}

	if (!result.result) {
		throw new Error('Typst compile failed with an unknown error.');
	}
}

export function render_pdf(resume: Resume): ArrayBuffer {
	const compiler = Compiler.create({ workspace: '/' });
	compiler.addSource('/data.yaml', JSON.stringify(resume));
	const compiled = compiler.compile({ mainFileContent: template });
	handleErrors(compiler, compiled);
	const rendered = compiler.pdf(compiled.result);
	assert(rendered.buffer instanceof ArrayBuffer, 'expected rendered PDF to be an ArrayBuffer');
	return rendered.buffer;
}
