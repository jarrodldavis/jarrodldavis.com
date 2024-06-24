import type { ImprecvDataSchema } from "@/imprecv/types";

export type PersonalData = ImprecvDataSchema["personal"];

export type WorkData = Exclude<ImprecvDataSchema["work"], undefined>;
export type WorkOrganizationData = Exclude<ImprecvDataSchema["work"], undefined>[number];
export type WorkPositionData = WorkOrganizationData["positions"][number];

export type EducationData = ImprecvDataSchema["education"];
export type EducationInstitutionData = EducationData[number];

export type ProjectsData = Exclude<ImprecvDataSchema["projects"], undefined | null>;
export type ProjectData = ProjectsData[number];

export interface SkillsData {
  skills: ImprecvDataSchema["skills"];
  languages: ImprecvDataSchema["languages"];
  interests: ImprecvDataSchema["interests"];
}

export type LanguageData = ImprecvDataSchema["languages"][number];
