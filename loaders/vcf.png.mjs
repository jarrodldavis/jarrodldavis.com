import { promisify } from "node:util";
import { parseVcfPhoto } from "./_util.mjs";

/**
 * @param {string} content
 */
export default async function vcfPngLoader(content) {
  return content;
}

/**
 * @this {{ fs: import('node:fs'), resourcePath: string }}
 */
export const pitch = async function vcfPngLoaderPitch() {
  const vcfPath = this.resourcePath.replace(/\.png$/, "");
  const readFile = promisify(this.fs.readFile);
  const content = await readFile(vcfPath, { encoding: "utf-8" });
  const photo = parseVcfPhoto(content);
  return Buffer.from(photo, "base64");
};
