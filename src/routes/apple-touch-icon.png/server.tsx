import SatoriImg, { create_handler, type ImageComponentProps } from '$lib/satori-img';
import type { RequestHandler } from './$types';

const AppleTouchIconImage = ({ src }: ImageComponentProps) => <SatoriImg src={src} />;
const width = 180;
const height = 180;

export const GET: RequestHandler = create_handler(AppleTouchIconImage, { width, height });
