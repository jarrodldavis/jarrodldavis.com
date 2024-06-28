import { List, sublist } from "@/app/common";
import { PrimarySection, SecondarySection, TertiarySection } from "@/app/sections";
import type { EducationData, EducationInstitutionData } from "@/app/types";

export default function Education({ education }: { education: EducationData }) {
  return (
    <PrimarySection title="Education">
      {education.map((institution, index) => (
        <EducationInstitution key={index} {...institution} />
      ))}
    </PrimarySection>
  );
}

function EducationInstitution(props: EducationInstitutionData) {
  return (
    <SecondarySection
      title={props.institution}
      url={props.url}
      subtitle={<p className="font-semibold">{props.location}</p>}
    >
      <TertiarySection
        title={`${props.studyType} in ${props.area}`}
        startDate={props.startDate}
        endDate={props.endDate}
      >
        <List
          items={[
            sublist("Honors", props.honors),
            sublist("Courses", props.courses),
            ...(props.highlights ?? []),
          ]}
        />
      </TertiarySection>
    </SecondarySection>
  );
}
