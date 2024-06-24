import { List } from "@/app/common";
import { PrimarySection, SecondarySection, TertiarySection } from "@/app/sections";
import type { WorkData, WorkOrganizationData, WorkPositionData } from "@/app/types";

export default function Work({ work }: { work: WorkData }) {
  return (
    <PrimarySection title="Work Experience">
      {work.map((organization, index) => (
        <WorkOrganization key={index} {...organization} />
      ))}
    </PrimarySection>
  );
}

function WorkOrganization({ location, organization, positions, url }: WorkOrganizationData) {
  return (
    <SecondarySection
      title={organization}
      url={url}
      subtitle={<p className="font-bold">{location}</p>}
    >
      {positions.map((position, index) => (
        <WorkPosition key={index} {...position} />
      ))}
    </SecondarySection>
  );
}

function WorkPosition({ endDate, highlights, position, startDate }: WorkPositionData) {
  return (
    <TertiarySection title={position} startDate={startDate} endDate={endDate}>
      {highlights && <List items={highlights} />}
    </TertiarySection>
  );
}
