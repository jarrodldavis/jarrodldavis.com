import { chromium } from 'playwright';

interface RenderOptions {
	fetch: typeof fetch;
	path: string;
}

const ORIGIN = 'http://render_pdf.local';

export default async function render_pdf({ fetch, path }: RenderOptions) {
	await using browser = await chromium.launch();
	await using context = await browser.newContext({ baseURL: ORIGIN });
	await using page = await context.newPage();

	await page.route('/**', async (route, request) => {
		const url = new URL(request.url());

		const response = await fetch(url.origin === ORIGIN ? url.pathname : url, {
			method: request.method(),
			headers: await request.allHeaders(),
			body: request.postDataBuffer(),
		});

		await route.fulfill({
			body: Buffer.from(await response.arrayBuffer()),
			headers: Object.fromEntries(response.headers),
			status: response.status,
		});
	});

	const response = await page.goto(path);
	if (!response) {
		throw new Error('Playwright returned no response.');
	}

	const finish_error = await response.finished();
	if (finish_error) {
		throw new Error('Playwright response failed to finish.', { cause: finish_error });
	}

	if (!response.ok()) {
		return new Response(await response.body(), {
			status: response.status(),
			statusText: response.statusText(),
			headers: await response.allHeaders(),
		});
	}

	const pdf_buffer = await page.pdf();

	return new Response(pdf_buffer, {
		headers: {
			'content-type': 'application/pdf',
		},
	});
}
