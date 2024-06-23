import type { ImprecvDataSchema } from "@/imprecv/types";

export type PersonalData = ImprecvDataSchema["personal"];
export type WorkData = Exclude<ImprecvDataSchema["work"], undefined>;
export type WorkOrganizationData = Exclude<ImprecvDataSchema["work"], undefined>[number];
export type WorkPositionData = WorkOrganizationData["positions"][number];
