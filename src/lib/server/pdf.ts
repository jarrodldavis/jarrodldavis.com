import { building } from '$app/environment';
import fs from 'fs/promises';
import { lookup } from 'mrmime';
import path from 'node:path';
import { chromium, type Request as PlaywrightRequest } from 'playwright';

type Fetch = typeof fetch;

interface RenderOptions {
	fetch: Fetch;
	pathname: string;
}

const APP_PATH = '/_app';
const OUT_DIR = '.svelte-kit/output/client';
const ORIGIN = 'http://render_pdf.local';

export default async function render_pdf({ fetch, pathname }: RenderOptions) {
	await using browser = await chromium.launch();
	await using context = await browser.newContext({ baseURL: ORIGIN });
	await using page = await context.newPage();

	const errors = new Array<unknown>();

	page.on('console', (message) => {
		if (message.type() !== 'error') {
			return;
		}

		errors.push(
			Object.assign(new Error('page logged error to console'), {
				text: message.text(),
				location: message.location(),
			}),
		);
	});

	await page.route('/**', async (route, request) => {
		try {
			await route.fulfill(await handle_page_request(request, fetch));
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
			headers: await response.allHeaders(),
		});
	}

	return new Response(await page.pdf(), {
		headers: {
			'content-type': 'application/pdf',
		},
	});
}

async function handle_page_request(request: PlaywrightRequest, fetch: Fetch) {
	const { origin, pathname } = new URL(request.url());
	if (origin !== ORIGIN) {
		throw new Error(`unexpected origin: ${origin}`);
	}

	if (building && pathname.startsWith(APP_PATH)) {
		return {
			body: await fs.readFile(path.join(OUT_DIR, pathname)),
			headers: { 'content-type': lookup(pathname) ?? '' },
			status: 200,
		};
	}

	const response = await fetch(pathname, {
		method: request.method(),
		headers: await request.allHeaders(),
		body: request.postDataBuffer(),
	});

	if (!response.ok) {
		throw Object.assign(new Error('response not ok'), { pathname, status: response.status });
	}

	return {
		body: Buffer.from(await response.arrayBuffer()),
		headers: Object.fromEntries(response.headers),
		status: response.status,
	};
}
