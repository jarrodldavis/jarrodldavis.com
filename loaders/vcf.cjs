const assert = require("node:assert/strict");
const { EOL } = require("node:os");
const ICAL = require("ical.js");
const sharp = require("sharp");

/**
 * @param {string} content Content of the resource file
 */
module.exports = async function vcfLoader(content) {
  /**
   * @type {ICAL.Component}
   */
  let component;
  try {
    component = ICAL.Component.fromString(content);
  } catch (cause) {
    throw new Error("failed to parse vCard contents", { cause });
  }

  assert.equal(component.name, "vcard", "expected parsed vCard");

  const photo = component.getFirstPropertyValue("photo");
  assert.ok(photo, "expected parsed vCard photo value to be available");

  const profileImage = Buffer.from(photo, "base64");

  /**
   * @type {sharp.Metadata}
   */
  let sharpMeta;
  try {
    sharpMeta = await sharp(profileImage).metadata();
  } catch (cause) {
    throw new Error("failed to get photo metadata", { cause });
  }

  assert.ok(sharpMeta.format, "expected vCard photo to have known image format");
  assert.ok(sharpMeta.width, "expected vCard photo to have a width");
  assert.ok(sharpMeta.height, "expected vCard photo to have a height");
  assert.equal(sharpMeta.width, sharpMeta.height, "expected vCard photo to be square");

  const metadata = {
    contentType: `image/${sharpMeta.format}`,
    width: sharpMeta.width,
    height: sharpMeta.height,
  };

  return [
    `export const vcf = ${JSON.stringify(content.trim())};`,
    `export const photoContents = /*#__PURE__*/ Buffer.from(${JSON.stringify(photo)}, "base64");`,
    `export const photoMetadata = ${JSON.stringify(metadata)};`,
  ].join(EOL);
};
