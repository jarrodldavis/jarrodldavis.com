import { building } from '$app/environment';
import { getRequestEvent } from '$app/server';
import type { KitConfig } from '@sveltejs/kit';
import { lookup } from 'mrmime';
import path from 'node:path';
import { chromium, type Request as PlaywrightRequest, type Route } from 'playwright';

type FulfillOptions = NonNullable<Parameters<Route['fulfill']>[0]>;

export default function make_pdf_renderer({
	outDir = '.svelte-kit'
}: Pick<KitConfig, 'outDir'> = {}) {
	return render_pdf.bind(null, path.join(outDir, 'output/client'));
}

async function render_pdf(asset_root: string, pathname: string) {
	const origin = getRequestEvent().url.origin;
	await using browser = await chromium.launch();
	await using context = await browser.newContext({ baseURL: origin });
	await using page = await context.newPage();

	const errors = new Array<unknown>();

	page.on('console', (message) => {
		if (message.type() == 'error') {
			const error = new Error('page logged error to console');
			errors.push(Object.assign(error, { text: message.text(), location: message.location() }));
		}
	});

	await page.route('/**', async (route, request) => {
		try {
			await route.fulfill(await handle_page_request(asset_root, request));
		} catch (error) {
			errors.push(error);
			await route.abort().catch((error) => errors.push(error));
		}
	});

	const response = await page.goto(pathname);
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
	request: PlaywrightRequest
): Promise<FulfillOptions> {
	const { fetch, url: top_level_url } = getRequestEvent();
	const request_url = new URL(request.url());
	const request_init: RequestInit = {
		method: request.method(),
		headers: await request.allHeaders(),
		body: request.postDataBuffer()
	};

	// First, try the SvelteKit-optimized fetch...
	let response = await fetch(request_url, request_init);

	// ...and if that short-circuits (e.g., for Vite-bundled assets)...
	if (response.status === 404 && request_url.origin === top_level_url.origin) {
		// ...read from the filesystem during prerendering since there's no public-facing server...
		if (building) {
			return {
				path: path.join(asset_root, request_url.pathname),
				contentType: lookup(request_url.pathname) ?? '',
				status: 200
			};
		}

		// ...otherwise, fetch from the public-facing server.
		response = await globalThis.fetch(request_url, request_init);
	}

	if (!response.ok) {
		throw Object.assign(new Error('response not ok'), {
			url: request_url.toString(),
			status: response.status
		});
	}

	return {
		body: Buffer.from(await response.arrayBuffer()),
		headers: Object.fromEntries(response.headers),
		status: response.status
	};
}
