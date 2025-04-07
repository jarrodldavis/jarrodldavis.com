import SatoriImg, { create_handler } from '$lib/satori-img';

export const GET = create_handler(({ src }) => (
	<div tw="flex h-full w-full bg-zinc-900 p-8">
		<SatoriImg
			src={src}
			style={{
				boxShadow: 'inset 0 4px 12px 0 #09090b'
			}}
			tw="rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
		/>
	</div>
));
