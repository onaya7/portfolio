import portraitImage from "@/images/samuel-ayano.jpg";

/**
 * The headshot. Metadata (camera, EXIF) was stripped before it was committed; strip it again
 * if the file is replaced. The source is 480x516, so it is never shown wider than about 22rem.
 */
export const portrait = {
  image: portraitImage,
  alt: "Samuel Ayano, in glasses and a patterned black shirt",
} as const;
