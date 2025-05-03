import SatoriImg, { create_handler, type ImageComponentProps } from '$lib/satori-img';
import type { RequestHandler } from './$types';

const TwitterIconImage = ({ src }: ImageComponentProps) => (
	<div tw="flex h-full w-full bg-zinc-900 p-8">
		<SatoriImg
			src={src}
			style={{
				boxShadow: 'inset 0 4px 12px 0 #09090b'
			}}
			tw="rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
		/>
	</div>
);

export const GET: RequestHandler = create_handler(TwitterIconImage);
