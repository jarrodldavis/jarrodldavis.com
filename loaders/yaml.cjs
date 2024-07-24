const YAML = require("yaml");

/**
 * @param {string} content
 */
module.exports = function yamlLoader(content) {
  return `export default ${JSON.stringify(YAML.parse(content.trim()))};`;
};
