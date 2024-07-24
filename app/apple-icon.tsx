import { photo, photoContents } from "@/app/contact-card.vcf";
import SatoriImage from "@/app/satori-image";
import { ImageResponse } from "next/og";

export const size = { width: photo.width, height: photo.height };

export default async function Icon() {
  return new ImageResponse(<SatoriImage src={photoContents} tw="rounded-full" />, { ...size });
}
