import { photo, photoContents } from "@/app/contact-card.vcf";
import { ImageResponse } from "next/og";

export const size = { width: photo.width, height: photo.height };

export const alt = "A Memoji of me on a green background.";

export default async function Image() {
  // https://github.com/vercel/satori/issues/606
  const src = photoContents.buffer as unknown as string;
  // eslint-disable-next-line @next/next/no-img-element
  return new ImageResponse(<img alt="" src={src} />, { ...size });
}
