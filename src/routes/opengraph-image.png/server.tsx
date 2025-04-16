import { read } from '$app/server';
import SatoriImg, { create_handler } from '$lib/satori-img';
import PlexMonoBold from '@ibm/plex-mono/fonts/complete/woff/IBMPlexMono-Medium.woff';

export const GET = create_handler(
	({ profile, src }) => {
		return (
			<div tw="flex h-full w-full items-center justify-around bg-zinc-900 px-24 text-stone-300">
				<SatoriImg
					src={src}
					style={{
						boxShadow: 'inset 0 4px 16px 0 #09090b'
					}}
					tw="h-72 w-72 rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
				/>

				<div tw="flex flex-col">
					<p tw="text-7xl font-black">{profile.name}</p>
					<ul tw="flex flex-col text-4xl font-semibold">
						{profile.titles.map((title, index) => (
							<li key={index}>{title}</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
	{
		width: 1200,
		height: 630,
		fonts: [{ data: await read(PlexMonoBold).arrayBuffer(), name: 'Plex Mono' }]
	}
);
