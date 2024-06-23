import { DateRange } from "@/app/common";
import type { WorkData, WorkOrganizationData, WorkPositionData } from "@/app/types";

export default function Work({ work }: { work: WorkData }) {
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
