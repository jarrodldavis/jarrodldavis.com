import SatoriImg, { create_response } from '$lib/satori-img';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const width = 32;
	const height = 32;
	const image = ({ src }: { src: ArrayBuffer }) => <SatoriImg src={src} tw="rounded-full" />;
	const png_response = await create_response(fetch, image, { width, height });
	const png_bytes = await png_response.bytes();

	const ico_bytes = new Uint8Array(22 + png_bytes.length);
	const ico_data_view = new DataView(ico_bytes.buffer);

	// header
	ico_data_view.setUint16(0, 0, true); // reserved value
	ico_data_view.setUint16(2, 1, true); // file type (1 = ICO)
	ico_data_view.setUint16(4, 1, true); // number of images (1)

	// entry
	ico_data_view.setUint8(6, width); // image width
	ico_data_view.setUint8(7, height); // image height
	ico_data_view.setUint8(8, 0); // color palette (0 = 256+ colors)
	ico_data_view.setUint8(9, 0); // reserved value
	ico_data_view.setUint16(10, 1, true); // color planes (1)
	ico_data_view.setUint16(12, 24, true); // bits per pixel (24)
	ico_data_view.setUint32(14, png_bytes.length, true); // image size
	ico_data_view.setUint32(18, 22, true); // offset
	ico_bytes.set(png_bytes, 22);

	const headers = new Headers();
	headers.set('Content-Type', 'image/x-icon');
	headers.set('Content-Length', ico_bytes.length.toString());

	return new Response(ico_bytes, { headers, status: 200 });
};
