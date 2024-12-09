// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * @type {import("eslint").Linter.Config[]}
 */
const eslintConfig = compat.extends("next/core-web-vitals", "next/typescript", "prettier");

export default eslintConfig;
