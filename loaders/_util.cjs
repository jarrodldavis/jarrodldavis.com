const ICAL = require("ical.js");
const assert = require("node:assert/strict");

/**
 * @param {string} content
 */
module.exports.parseVcfPhoto = function parseVcfPhoto(content) {
  /** @type {ICAL.Component} */
  let component;
  try {
    component = ICAL.Component.fromString(content);
  } catch (cause) {
    throw new Error("failed to parse vCard contents", { cause });
  }

  assert.equal(component.name, "vcard", "expected parsed vCard");

  const photo = component.getFirstPropertyValue("photo");
  assert.ok(photo, "expected parsed vCard photo value to be available");

  return photo;
};
