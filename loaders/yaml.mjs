import * as YAML from "yaml";

/**
 * @param {string} content
 */
export default function yamlLoader(content) {
  return `export default ${JSON.stringify(YAML.parse(content.trim()))};`;
}
