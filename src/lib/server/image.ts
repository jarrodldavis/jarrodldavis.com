import { getRequestEvent } from '$app/server';
import type { ImageInfo } from '$lib/types';
import { hash } from 'crypto';

const ICO_OFFSET = 22;
const PNG_OFFSET = 0;
const PNG_WIDTH_INDEX = 16;
const PNG_HEIGHT_INDEX = 20;

export async function fetch_image_info(name: string): Promise<ImageInfo> {
	const { fetch } = getRequestEvent();

	const url = `/${name}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}

	const response_array = await response.bytes();
	const hex = hash('SHA256', response_array, 'hex').slice(0, 16);

	const response_view = new DataView(response_array.buffer);
	const offset = name.endsWith('.ico') ? ICO_OFFSET : PNG_OFFSET;
	const width = response_view.getUint32(offset + PNG_WIDTH_INDEX).toString();
	const height = response_view.getUint32(offset + PNG_HEIGHT_INDEX).toString();

	return { hash: hex, width, height, name };
}
