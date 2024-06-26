import profileImage, { metadata } from "@/app/profile-image";

export const contentType = metadata.contentType;

export const size = { width: metadata.width, height: metadata.height };

export default async function icon() {
  return new Response(profileImage);
}
