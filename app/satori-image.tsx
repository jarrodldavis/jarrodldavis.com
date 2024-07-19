/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes } from "react";

type SatoriImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "className" | "src"> & {
  src: Buffer;
};

export default function SatoriImage({ src: { buffer }, ...props }: SatoriImageProps) {
  // https://github.com/vercel/satori/issues/606
  return <img src={buffer as unknown as string} {...props} />;
}
