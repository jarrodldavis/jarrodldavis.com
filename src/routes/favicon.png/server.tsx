import SatoriImg, { create_handler, type ImageComponentProps } from '$lib/satori-img';
import type { RequestHandler } from './$types';

const FaviconImage = ({ src }: ImageComponentProps) => <SatoriImg src={src} tw="rounded-full" />;

export const GET: RequestHandler = create_handler(FaviconImage);
