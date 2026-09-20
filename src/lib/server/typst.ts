import { fontPaths } from '$lib/fonts';
import memoji_path from '$lib/memoji.png';
import { load_resume, read_buffer } from '$lib/server';
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

const fonts = await Promise.all(fontPaths.map(read_buffer));

async function compile(
	template: string,
	resume: Resume | undefined,
	memoji: Buffer | undefined,
	render: RenderFn
): Promise<ArrayBuffer> {
	resume ??= load_resume();
	memoji ??= await read_buffer(memoji_path);

	const compiler = Compiler.create({ fontArgs: [{ fontBlobs: fonts }], workspace: '/' });
	compiler.addSource('/src/lib/data.yaml', JSON.stringify(resume));
	compiler.mapShadow('/src/lib/memoji.png', memoji);
	const compiled = compiler.compile({ mainFileContent: template });
	handleErrors(compiler, compiled);

	const rendered = await render(compiler, compiled.result);
	assert(rendered.buffer instanceof ArrayBuffer, 'expected render result to be an ArrayBuffer');
	return rendered.buffer;
}

export async function render_pdf(
	template: string,
	resume?: Resume,
	memoji?: Buffer
): Promise<ArrayBuffer> {
	return compile(template, resume, memoji, (compiler, document) => {
		return compiler.pdf(document);
	});
}

export async function render_png(
	template: string,
	resume?: Resume,
	memoji?: Buffer
): Promise<ArrayBuffer> {
	return compile(template, resume, memoji, (compiler, document) => {
		return sharp(Buffer.from(compiler.plainSvg(document))).toBuffer();
	});
}
