import { photo, photoContents } from "@/app/contact-card.vcf";
import SatoriImage from "@/app/satori-image";
import { ImageResponse } from "next/og";

export const size = { width: photo.width, height: photo.height };

export const alt = "A Memoji of me in a green circle.";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-zinc-900 p-8">
        <SatoriImage
          src={photoContents}
          style={{
            boxShadow: "inset 0 4px 12px 0 #09090b",
          }}
          tw="rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
        />
      </div>
    ),
    { ...size },
  );
}
