import vcf from "@/app/contact-card.vcf";
import assert from "node:assert/strict";
import sharp from "sharp";

const photo = vcf["photo"];
assert.ok(photo, "expected parsed vCard photo value to be available");

const profileImage = Buffer.from(photo, "base64");

export default profileImage;

let sharpMeta: sharp.Metadata;
try {
  sharpMeta = await sharp(profileImage).metadata();
} catch (cause) {
  throw new Error("failed to get photo metadata", { cause });
}

assert.ok(sharpMeta.format, "expected vCard photo to have known image format");
assert.ok(sharpMeta.width, "expected vCard photo to have a width");
assert.ok(sharpMeta.height, "expected vCard photo to have a height");
assert.equal(sharpMeta.width, sharpMeta.height, "expected vCard photo to be square");

export const metadata = {
  contentType: `image/${sharpMeta.format}`,
  width: sharpMeta.width,
  height: sharpMeta.height,
};
