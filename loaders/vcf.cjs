const assert = require("node:assert/strict");
const { EOL } = require("node:os");
const ICAL = require("ical.js");

/**
 * @param {string} content Content of the resource file
 */
module.exports = function vcfLoader(content) {
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

  const properties = component.getAllProperties().reduce((properties, property) => {
    const group = property.getFirstParameter("group");
    const type = property.getFirstParameter("type");
    const name = property.name;
    const key = group ? `${group}.${name}` : type ? `${name}.${type}` : name;

    assert(!(key in properties), `expected key '${key}' to be unique amongst all vCard properties`);

    properties[key] = property.getFirstValue();
    return properties;
  }, /** @type {Record<string, string>} */ ({}));

  return [
    `export default ${JSON.stringify(properties)};`,
    `export const raw = ${JSON.stringify(content.trim())};`,
  ].join(EOL);
};
