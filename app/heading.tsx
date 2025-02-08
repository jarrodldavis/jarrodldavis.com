import { photo } from "@/app/contact-card.vcf";
import type { PersonalData } from "@/app/types";
import Image from "next/image";

export default function Heading({ email, name, phone, profiles, titles }: PersonalData) {
  interface ProfileLink {
    text: string;
    url: string;
  }

  const allProfiles: ProfileLink[] = [
    email && {
      text: email,
      url: `mailto:${email}`,
    },
    phone && {
      url: `tel:${phone}`,
      text: phone,
    },
    ...profiles.map(({ url }) => ({ url, text: url.split(/:\/?\/?/)[1]! })),
  ].filter(Boolean);

  return (
    <div className="2xs:gap-0 tall:2xs:gap-4 xs:gap-4 flex flex-col items-center gap-2 text-center">
      <div className="tall:flex-col max-2xs:flex-col 2xs:gap-3 flex flex-row items-center gap-2 text-center">
        <Image
          alt="A Memoji of me on a green background"
          src={photo}
          priority
          sizes="(min-height: 500px) and (min-width: 475px) 8rem, (min-height: 500px) 6rem, 4rem"
          className="tall:w-32 tall:border-2 tall:p-3 tall:max-xs:w-24 tall:max-xs:p-2.5 box-content w-16 rounded-full border-0 border-slate-200 bg-slate-300 p-2 shadow-inner shadow-slate-400 dark:border-zinc-950 dark:bg-zinc-700 dark:shadow-zinc-950"
        />

        <h1 className="font-mono text-4xl font-black">{name}</h1>
      </div>

      <div className="tall:2xs:gap-4 xs:gap-4 xs:max-md:flex-row flex flex-col items-center justify-center gap-2">
        {titles && (
          <ul
            role="list"
            className="tall:gap-y-1 flex flex-col font-semibold md:flex-row md:gap-2 lg:gap-3"
          >
            {titles.map((title) => (
              <li
                key={title}
                className="after:font-mono last:after:content-none md:contents md:after:content-['/'_/_'']"
              >
                {title}
              </li>
            ))}
          </ul>
        )}

        <ul
          role="list"
          className="tall:gap-y-1 flex flex-col font-mono md:flex-row md:gap-3 md:tracking-tighter md:max-lg:text-sm lg:gap-4 lg:tracking-tight"
        >
          {allProfiles.map(({ text, url }) => (
            <li
              key={url}
              className="last:after:content-none md:contents md:after:content-['\25C6'_/_'']"
            >
              <a
                href={url}
                className="text-blue-900 hover:text-blue-700 hover:underline dark:text-blue-100 dark:hover:text-blue-300"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
