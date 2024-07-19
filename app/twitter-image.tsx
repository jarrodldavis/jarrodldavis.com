import { photo, photoContents } from "@/app/contact-card.vcf";
import SatoriImage from "@/app/satori-image";
import { ImageResponse } from "next/og";

export const size = { width: photo.width, height: photo.height };

export const alt = "A Memoji of me on a green background.";

export default async function Image() {
  return new ImageResponse(<SatoriImage src={photoContents} />, { ...size });
}
