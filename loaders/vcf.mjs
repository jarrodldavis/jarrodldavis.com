import { EOL } from "node:os";
import { basename } from "node:path";
import { parseVcfPhoto } from "./_util.mjs";

/**
 * @param {string} content
 * @this {{ resourcePath: string }}
 */
export default function vcfLoader(content) {
  const photo = parseVcfPhoto(content);
  const pngResource = `./${basename(this.resourcePath)}.png`;

  return [
    `export const raw = ${JSON.stringify(content.trim())};`,
    `export { default as photo } from ${JSON.stringify(pngResource)};`,
    `export const photoContents = /*#__PURE__*/ Buffer.from(${JSON.stringify(photo)}, "base64");`,
  ].join(EOL);
}
