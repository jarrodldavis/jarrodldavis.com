import { photoContents } from "@/app/contact-card.vcf";
import resumeData from "@/app/resume-data";
import SatoriImage from "@/app/satori-image";
import { TITLE_FORMATTER } from "@/app/utils";
import GeistMonoSemiBold from "geist/assets/fonts/geist-mono/GeistMono-SemiBold.ttf";
import GeistMonoUltraBlack from "geist/assets/fonts/geist-mono/GeistMono-UltraBlack.ttf";
import { ImageResponse } from "next/og";
import assert from "node:assert/strict";

export const size = { width: 1200, height: 630 };

const { name, titles } = resumeData.personal;
assert.ok(titles, "expected titles to be present");

export const alt = `A Memoji of me in a green circle next to my name (${name}) and job titles (${TITLE_FORMATTER.format(titles)}).`;

export default async function Image() {
  assert.ok(titles, "expected titles to be present");

  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-around bg-zinc-900 px-24 text-stone-300">
        <SatoriImage
          src={photoContents}
          style={{
            boxShadow: "inset 0 4px 16px 0 #09090b",
          }}
          tw="h-72 w-72 rounded-full border-4 border-[#09090b] bg-zinc-700 p-6"
        />

        <div tw="flex flex-col">
          <p tw="text-6xl font-black">{name}</p>
          <ul tw="flex flex-col text-3xl font-semibold">
            {titles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { data: GeistMonoSemiBold, name: "Geist Mono", weight: 600 },
        { data: GeistMonoUltraBlack, name: "Geist Mono", weight: 900 },
      ],
    },
  );
}
