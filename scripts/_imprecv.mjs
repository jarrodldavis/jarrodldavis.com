// @ts-check

import fs from "fs/promises";
import { compile } from "json-schema-to-typescript";
import prettierConfig from "../.prettierrc.json" with { type: "json" };

const SCHEMA_PATH = "imprecv/schema.json";
const TYPES_PATH = "imprecv/types.d.ts";

/**
 * @param {Object} options
 * @param {boolean} options.force
 */
export default async function installSchema({ force }) {
  /** @type {string} */
  let rawSchema = "";

  if (!force) {
    try {
      rawSchema = await fs.readFile(SCHEMA_PATH, { encoding: "utf-8" });
    } catch {
      // continue with fetch
    }
  }

  if (!rawSchema) {
    console.log("-> downloading schema...");

    const schemaResponse = await fetch(
      "https://raw.githubusercontent.com/jskherman/imprecv/main/cv.typ.schema.json",
    );

    if (!schemaResponse.ok) {
      throw new Error(
        `Failed to fetch schema: ${schemaResponse.status} ${schemaResponse.statusText}`,
      );
    }

    rawSchema = await schemaResponse.text();
    await fs.writeFile(SCHEMA_PATH, rawSchema);
  }

  console.log("-> parsing schema...");
  const parsedSchema = /** @type {unknown} */ (JSON.parse(rawSchema));
  const schema = /** @type {Parameters<typeof compile>[0]} */ (parsedSchema);

  console.log("-> compiling types...");
  const compiledTypes = await compile(schema, "cv.typ.schema.json", {
    additionalProperties: false,
    bannerComment: "",
    style: /** @type {import('prettier').Config} */ (prettierConfig),
  });

  await fs.writeFile(TYPES_PATH, compiledTypes);

  console.log("-> installation successful");
}
