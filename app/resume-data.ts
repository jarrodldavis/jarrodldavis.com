import schema from "@/imprecv/schema.json";
import parsedData from "@/imprecv/template.yml";
import type { ImprecvDataSchema } from "@/imprecv/types";
import Ajv from "ajv";
import formatsPlugin from "ajv-formats";

const ajv = new Ajv();
formatsPlugin(ajv);
schema.$schema = schema.$schema.replace(/^https:/, "http:");

if (!ajv.validate<ImprecvDataSchema>(schema, parsedData)) {
  if (ajv.errors) {
    throw new Ajv.ValidationError(ajv.errors);
  } else {
    throw new Error("An unexpected validation error occurred.");
  }
}

const resumeData: ImprecvDataSchema = parsedData;
export default resumeData;
