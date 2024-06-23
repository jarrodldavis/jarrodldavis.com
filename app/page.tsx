import { ImprecvDataSchema } from "@/imprecv/types";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-us", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type PersonalData = ImprecvDataSchema["personal"];
type WorkData = Exclude<ImprecvDataSchema["work"], undefined>;
type WorkOrganizationData = Exclude<ImprecvDataSchema["work"], undefined>[number];
type WorkPositionData = WorkOrganizationData["positions"][number];

export default async function Home() {
  const { default: resumeData } = await import("./resume-data");
  return (
    <main className="mx-auto max-w-5xl p-12 font-serif">
      <Heading {...resumeData.personal} />
      {resumeData.work && <Work work={resumeData.work} />}
      <Education />
      <Affiliations />
      <Projects />
      <Awards />
      <Publications />
      <Skills />
      <References />
      <EndNote />
    </main>
  );
}

function Heading({ email, location, name, phone, profiles, titles, url }: PersonalData) {
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

function Work({ work }: { work: WorkData }) {
  return (
    <section className="mt-3">
      <h2 className="mb-2 border-b-2 border-black text-xl font-bold uppercase">Work Experience</h2>
      {work.map((organization, index) => (
        <WorkOrganization key={index} {...organization} />
      ))}
    </section>
  );
}

function WorkOrganization({ location, organization, positions, url }: WorkOrganizationData) {
  return (
    <section>
      <hgroup className="flex justify-between text-nowrap font-bold">
        <h3>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer noopener">
              {organization}
            </a>
          ) : (
            organization
          )}
        </h3>
        <p>{location}</p>
      </hgroup>

      {positions.map((position, index) => (
        <WorkPosition key={index} {...position} />
      ))}
    </section>
  );
}

function WorkPosition({ endDate, highlights, position, startDate }: WorkPositionData) {
  return (
    <section className="mb-4">
      <hgroup className="flex justify-between text-nowrap">
        <h4 className="italic">{position}</h4>
        {<DateRange startDate={startDate} endDate={endDate} />}
      </hgroup>
      {highlights && (
        <ul className="ml-4 list-outside list-disc">
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DateRange({ startDate, endDate }: Pick<WorkPositionData, "endDate" | "startDate">) {
  const start = startDate ? new Date(startDate) : null;

  if (!start?.valueOf()) {
    throw new Error("invalid start date");
  }

  const end = endDate
    ? endDate.toLowerCase() === "present"
      ? "Present"
      : new Date(endDate)
    : null;

  if (!end?.valueOf()) {
    throw new Error("invalid end date");
  }

  return (
    <p>
      <time dateTime={start.toISOString().split("T")[0]}>{DATE_FORMATTER.format(start)}</time>
      <span> &ndash; </span>
      {end instanceof Date ? (
        <time dateTime={end.toISOString().split("T")[0]}>
          {end instanceof Date ? DATE_FORMATTER.format(end) : null}
        </time>
      ) : (
        end
      )}
    </p>
  );
}

function Education() {
  return <></>;
}

function Affiliations() {
  return <></>;
}

function Projects() {
  return <></>;
}

function Awards() {
  return <></>;
}

function Publications() {
  return <></>;
}

function Skills() {
  return <></>;
}

function References() {
  return <></>;
}

function EndNote() {
  return <></>;
}
