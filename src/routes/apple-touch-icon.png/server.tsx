import SatoriImg, { create_handler } from '$lib/satori-img';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = create_handler(({ src }) => <SatoriImg src={src} />, {
	width: 180,
	height: 180
});
