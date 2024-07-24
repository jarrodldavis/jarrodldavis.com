import { List, sublist } from "@/app/common";
import { PrimarySection } from "@/app/sections";
import type { SkillsData } from "@/app/types";
import { formatLanguage } from "@/app/utils";

export default function Skills({ skills, languages, interests }: SkillsData) {
  return (
    <PrimarySection title="Skills, Languages, and Interests">
      <List
        items={[
          sublist("Languages", languages.map(formatLanguage)),
          ...skills.map(({ category, skills }) => sublist(category, skills)),
          sublist("Interests", interests),
        ]}
      />
    </PrimarySection>
  );
}
