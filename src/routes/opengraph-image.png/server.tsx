import { read } from '$app/server';
import SatoriImg, { create_handler, type ImageComponentProps } from '$lib/satori-img';
import PlexMonoBold from '@ibm/plex-mono/fonts/complete/woff/IBMPlexMono-Bold.woff';
import PlexMonoSemiBold from '@ibm/plex-mono/fonts/complete/woff/IBMPlexMono-SemiBold.woff';
import type { RequestHandler } from './$types';

const OpenGraphImage = ({ profile, src }: ImageComponentProps) => (
	<div tw="flex h-full w-full items-center justify-around bg-zinc-900 px-24 text-stone-300">
		<SatoriImg
			src={src}
			style={{
				boxShadow: 'inset 0 4px 16px 0 #09090b'
			}}
			tw="h-72 w-72 rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
		/>

		<div tw="flex flex-col">
			<p tw="text-7xl font-bold">{profile.name}</p>
			<ul tw="flex flex-col text-4xl font-semibold">
				{profile.titles.map((title, index) => (
					<li key={index}>{title}</li>
				))}
			</ul>
		</div>
	</div>
);

const width = 1200;
const height = 630;
const fonts = [
	{ data: await read(PlexMonoBold).arrayBuffer(), name: 'IBM Plex Mono', weight: 700 } as const,
	{ data: await read(PlexMonoSemiBold).arrayBuffer(), name: 'IBM Plex Mono', weight: 600 } as const
];

export const GET: RequestHandler = create_handler(OpenGraphImage, { width, height, fonts });
