import { building } from '$app/environment';
import type { KitConfig } from '@sveltejs/kit';
import fs from 'fs/promises';
import { lookup } from 'mrmime';
import path from 'node:path';
import { chromium, type Request as PlaywrightRequest } from 'playwright';

type Fetch = typeof fetch;

interface RenderOptions {
	fetch: Fetch;
	origin: string;
	pathname: string;
}

export default function make_pdf_renderer({
	outDir = '.svelte-kit'
}: Pick<KitConfig, 'outDir'> = {}) {
	return render_pdf.bind(null, path.join(outDir, 'output/client'));
}

async function render_pdf(asset_root: string, options: RenderOptions) {
	await using browser = await chromium.launch();
	await using context = await browser.newContext({ baseURL: options.origin });
	await using page = await context.newPage();

	const errors = new Array<unknown>();

	page.on('console', (message) => {
		if (message.type() !== 'error') {
			return;
		}

		errors.push(
			Object.assign(new Error('page logged error to console'), {
				text: message.text(),
				location: message.location()
			})
		);
	});

	await page.route('/**', async (route, request) => {
		try {
			await route.fulfill(await handle_page_request(asset_root, options, request));
		} catch (error) {
			errors.push(error);
			await route.abort().catch((error) => errors.push(error));
		}
	});

	const response = await page.goto(options.pathname);
	if (!response) {
		throw new Error('response is blank');
	}

	const finish_error = await response.finished();
	if (finish_error) {
		throw new Error('response failed to finish', { cause: finish_error });
	}

	if (errors.length) {
		throw new AggregateError(errors, 'one or more errors occurred during page load');
	}

	if (!response.ok()) {
		return new Response(await response.body(), {
			status: response.status(),
			statusText: response.statusText(),
			headers: await response.allHeaders()
		});
	}

	return new Response(await page.pdf(), {
		headers: {
			'content-type': 'application/pdf'
		}
	});
}

async function handle_page_request(
	asset_root: string,
	options: RenderOptions,
	request: PlaywrightRequest
) {
	const url = new URL(request.url());
	const request_init: RequestInit = {
		method: request.method(),
		headers: await request.allHeaders(),
		body: request.postDataBuffer()
	};

	// First, try the SvelteKit-optimized fetch...
	let response = await options.fetch(url, request_init);

	// ...and if that short-circuits (e.g., for Vite-bundled assets)...
	if (url.origin === options.origin && response.status === 404) {
		// ...read from the filesystem during prerendering since there's no public-facing server...
		if (building) {
			return {
				body: await fs.readFile(path.join(asset_root, url.pathname)),
				headers: { 'content-type': lookup(url.pathname) ?? '' },
				status: 200
			};
		}

		// ...otherwise, fetch from the public-facing server.
		response = await globalThis.fetch(url, request_init);
	}

	if (!response.ok) {
		throw Object.assign(new Error('response not ok'), {
			url: url.toString(),
			status: response.status
		});
	}

	return {
		body: Buffer.from(await response.arrayBuffer()),
		headers: Object.fromEntries(response.headers),
		status: response.status
	};
}
