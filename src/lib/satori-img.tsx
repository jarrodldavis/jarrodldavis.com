import { dev } from '$app/environment';
import { getRequestEvent, read } from '$app/server';
import memoji from '$lib/memoji.png?enhanced';
import { load_resume } from '$lib/server';
import type { Profile } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { ImageResponse } from '@vercel/og';
import type React from 'react';

export interface ImageComponentProps {
	profile: Profile;
	src: ArrayBuffer;
}

type ImageResponseOptions = ConstructorParameters<typeof ImageResponse>[1];

type SatoriImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
	src: ArrayBuffer;
};

export default function SatoriImg({ src, ...props }: SatoriImgProps) {
	return (
		<img
			/* @ts-expect-error -  https://github.com/vercel/satori/issues/606 */
			src={src}
			{...props}
		/>
	);
}

export async function create_response(
	Image: React.FC<ImageComponentProps>,
	options?: ImageResponseOptions
): Promise<ImageResponse> {
	// `read` doesn't handle dev-time enhanced image paths
	const img = await (dev ? getRequestEvent().fetch : read)(memoji.img.src);
	if (!img.ok) {
		throw new Error(`failed to fetch image: ${img.status} ${img.statusText}`);
	}

	const src = await img.arrayBuffer();
	const { profile } = load_resume();
	const output = new ImageResponse(<Image profile={profile} src={src} />, {
		width: memoji.img.w,
		height: memoji.img.h,
		...options
	});

	return output;
}

export function create_handler(
	Image: React.FC<ImageComponentProps>,
	options?: ImageResponseOptions
): RequestHandler {
	return async () => {
		const output = await create_response(Image, options);

		// Errors that occur during response output are not logged, so read response here to force any
		// errors to be thrown before output begins.
		const clone = output.clone();
		await output.arrayBuffer();
		return clone;
	};
}
