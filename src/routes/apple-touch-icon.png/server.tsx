import SatoriImg, { create_handler } from '$lib/satori-img';

export const GET = create_handler(({ src }) => <SatoriImg src={src} />, {
	width: 180,
	height: 180
});
