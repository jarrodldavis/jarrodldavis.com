import type { PersonalData } from "@/app/types";

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
  ].filter((profile) => !!profile);

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-2xl font-bold uppercase">{name}</h1>

      <div className="flex flex-col items-center justify-center gap-4 min-[500px]:max-md:flex-row">
        {titles && (
          <ul role="list" className="flex flex-col font-bold md:flex-row md:gap-2 lg:gap-3">
            {titles.map((title) => (
              <li
                key={title}
                className="last:after:content-none md:contents md:after:content-['/']"
              >
                {title}
              </li>
            ))}
          </ul>
        )}

        <ul role="list" className="flex flex-col md:flex-row md:gap-2 lg:gap-4">
          {allProfiles.map(({ text, url }) => (
            <li
              key={url}
              className="last:after:content-none md:contents md:after:content-['\25C6']"
            >
              <a href={url}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
