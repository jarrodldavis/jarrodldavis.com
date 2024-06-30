const { promisify } = require("node:util");
const { parseVcfPhoto } = require("./_util.cjs");

/**
 * @param {string} content
 */
module.exports = async function vcfPngLoader(content) {
  return content;
};

/**
 * @this {{ fs: import('fs'), resourcePath: string,  }}
 * @returns
 */
module.exports.pitch = async function vcfPngLoaderPitch() {
  const vcfPath = this.resourcePath.replace(/\.png$/, "");
  const readFile = promisify(this.fs.readFile);
  const content = await readFile(vcfPath, { encoding: "utf-8" });
  const photo = parseVcfPhoto(content);
  return Buffer.from(photo, "base64");
};
