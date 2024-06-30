const { EOL } = require("node:os");
const { basename } = require("node:path");
const { parseVcfPhoto } = require("./_util.cjs");

/**
 * @param {string} content
 * @this {{ resourcePath: string }}
 */
module.exports = function vcfLoader(content) {
  const photo = parseVcfPhoto(content);
  const pngResource = `./${basename(this.resourcePath)}.png`;

  return [
    `export const raw = ${JSON.stringify(content.trim())};`,
    `export { default as photo } from ${JSON.stringify(pngResource)};`,
    `export const photoContents = /*#__PURE__*/ Buffer.from(${JSON.stringify(photo)}, "base64");`,
  ].join(EOL);
};
