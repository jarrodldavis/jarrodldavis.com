/**
 * @param {Buffer} content
 */
export default function ttfLoader(content) {
  return `export default Buffer.from(${JSON.stringify(content)});`;
}

export const raw = true;
