import { read } from '$app/server';
import { fontPaths } from '$lib/fonts';
import type { Resume } from '$lib/types';
import {
	NodeCompiler as Compiler,
	type NodeTypstDocument as Document,
	type NodeTypstCompileResult as Result
} from '@myriaddreamin/typst-ts-node-compiler';
import assert from 'node:assert/strict';
import sharp from 'sharp';

type SuccessResult = Result & {
	result: Document;
};

type RenderFn = (compiler: Compiler, document: Document) => Buffer | Promise<Buffer>;

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

const fonts = await Promise.all(fontPaths.map(async (f) => Buffer.from(await read(f).bytes())));

async function compile(template: string, resume: Resume, render: RenderFn): Promise<ArrayBuffer> {
	const compiler = Compiler.create({ fontArgs: [{ fontBlobs: fonts }], workspace: '/' });
	compiler.addSource('/data.yaml', JSON.stringify(resume));
	const compiled = compiler.compile({ mainFileContent: template });
	handleErrors(compiler, compiled);
	const rendered = await render(compiler, compiled.result);
	assert(rendered.buffer instanceof ArrayBuffer, 'expected render result to be an ArrayBuffer');
	return rendered.buffer;
}

export async function render_pdf(template: string, resume: Resume): Promise<ArrayBuffer> {
	return await compile(template, resume, (compiler, document) => compiler.pdf(document));
}

export async function render_png(template: string, resume: Resume): Promise<ArrayBuffer> {
	return await compile(template, resume, (compiler, document) =>
		sharp(Buffer.from(compiler.plainSvg(document))).toBuffer()
	);
}
