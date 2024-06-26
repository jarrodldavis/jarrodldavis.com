import profileImage, { metadata } from "@/app/profile-image";
import { ImageResponse } from "next/og";

export const contentType = metadata.contentType;

export const size = { width: metadata.width, height: metadata.height };

export default async function icon() {
  // https://github.com/vercel/satori/issues/606
  const src = profileImage.buffer as unknown as string;
  // eslint-disable-next-line @next/next/no-img-element
  return new ImageResponse(<img alt="" src={src} tw="rounded-full" />, { ...size });
}
