import SatoriImg, { create_handler } from '$lib/satori-img';

export const GET = create_handler(({ src }) => <SatoriImg src={src} tw="rounded-full" />);
