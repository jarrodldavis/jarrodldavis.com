import type React from 'react';

type IconProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
	src: ArrayBuffer;
};

export default function SatoriImg({ src, ...props }: IconProps) {
	// https://github.com/vercel/satori/issues/606
	return <img src={src as unknown as string} {...props} />;
}
