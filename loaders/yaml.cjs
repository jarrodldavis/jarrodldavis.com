const YAML = require("yaml");

/**
 * @param {string} content Content of the resource file
 */
module.exports = function yamlLoader(content) {
  return `export default ${JSON.stringify(YAML.parse(content.trim()))};`;
};
