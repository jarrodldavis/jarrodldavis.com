const ICAL = require("ical.js");
const assert = require("node:assert/strict");

const Component = /** @type {ICAL.default} */ (/** @type {unknown} */ (ICAL)).Component;

/**
 * @param {string} content
 * @returns {string}
 */
module.exports.parseVcfPhoto = function parseVcfPhoto(content) {
  /** @type {InstanceType<typeof Component>} */
  let component;
  try {
    component = Component.fromString(content);
  } catch (cause) {
    throw new Error("failed to parse vCard contents", { cause });
  }

  assert.equal(component.name, "vcard", "expected parsed vCard");

  const photo = component.getFirstPropertyValue("photo");
  assert.ok(photo, "expected parsed vCard photo value to be available");
  assert.ok(typeof photo === "string", "expected parsed vCard photo value to be a string");

  return photo;
};
