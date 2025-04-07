import { dev } from '$app/environment';
import { read } from '$app/server';
import memoji from '$lib/memoji.png?raw';
import SatoriImg from '$lib/satori-img';
import { ImageResponse } from '@vercel/og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	// `read` doesn't handle HMR paths (with cache-busing query params)
	const img = await (dev ? fetch : read)(memoji);
	if (!img.ok) {
		throw new Error(`failed to fetch image: ${img.status} ${img.statusText}`);
	}

	const src = await img.arrayBuffer();
	const output = new ImageResponse(<SatoriImg src={src} tw="rounded-full" />, {
		width: 128,
		height: 128
	});

	// Errors that occur during response output are not logged, so read response here to force any
	// errors to be thrown before output begins.
	const clone = output.clone();
	await output.arrayBuffer();
	return clone;
};
