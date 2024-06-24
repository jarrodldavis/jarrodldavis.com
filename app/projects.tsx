import { DateRange, List } from "@/app/common";
import { PrimarySection, SecondarySection } from "@/app/sections";
import type { ProjectData, ProjectsData } from "@/app/types";

export default function Projects({ projects }: { projects: ProjectsData }) {
  return (
    <PrimarySection title="Projects">
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </PrimarySection>
  );
}

function Project({ name, url, startDate, endDate, highlights }: ProjectData) {
  return (
    <SecondarySection
      title={name}
      url={url}
      subtitle={<DateRange startDate={startDate} endDate={endDate} />}
    >
      <List items={highlights} />
    </SecondarySection>
  );
}
