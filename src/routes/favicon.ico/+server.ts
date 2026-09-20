import { render_png } from '$lib/server/typst';
import type { RequestHandler } from './$types';
import template from './template.typ?raw';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const png_bytes = await render_png(template);
	const ico_bytes = new Uint8Array(22 + png_bytes.byteLength);
	const ico_data_view = new DataView(ico_bytes.buffer);

	// header
	ico_data_view.setUint16(0, 0, true); // reserved value
	ico_data_view.setUint16(2, 1, true); // file type (1 = ICO)
	ico_data_view.setUint16(4, 1, true); // number of images (1)

	// entry
	ico_data_view.setUint8(6, 32); // image width
	ico_data_view.setUint8(7, 32); // image height
	ico_data_view.setUint8(8, 0); // color palette (0 = 256+ colors)
	ico_data_view.setUint8(9, 0); // reserved value
	ico_data_view.setUint16(10, 1, true); // color planes (1)
	ico_data_view.setUint16(12, 24, true); // bits per pixel (24)
	ico_data_view.setUint32(14, png_bytes.byteLength, true); // image size
	ico_data_view.setUint32(18, 22, true); // offset
	ico_bytes.set(new Uint8Array(png_bytes), 22);

	return new Response(ico_bytes, {
		headers: {
			'Content-Type': 'image/x-icon',
			'Content-Length': ico_bytes.length.toString()
		},
		status: 200
	});
};
