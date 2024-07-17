/**
 * @param {Buffer} content
 */
module.exports = function ttfLoader(content) {
  return `export default Buffer.from(${JSON.stringify(content)});`;
};

module.exports.raw = true;
