import type { PersonalData } from "@/app/types";

export default function Heading({
  email,
  location,
  name,
  phone,
  profiles,
  titles,
  url,
}: PersonalData) {
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
    url && {
      url,
      text: new URL(url).host,
    },
    ...profiles.map(({ url }) => ({ url, text: url.split(/:\/?\/?/)[1]! })),
  ].filter((profile) => !!profile);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold uppercase">{name}</h1>

      {titles && (
        <ul role="list" className="flex flex-row gap-3 whitespace-pre font-bold">
          {titles.map((title) => (
            <li key={title} className="contents after:content-['/'_/_''] last:after:content-none">
              {title}
            </li>
          ))}
        </ul>
      )}

      {location && (
        <p>
          {Object.values(location)
            .filter((value) => value)
            .join(", ")}
        </p>
      )}

      <ul role="list" className="flex gap-4 whitespace-pre">
        {allProfiles.map(({ text, url }) => (
          <li key={url} className="contents after:content-['\25C6'_/_''] last:after:content-none">
            <a href={url}>{text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
