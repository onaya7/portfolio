import { site } from "@/content/profile";
import { ogImage, ogSize, portraitDataUri } from "@/lib/og";

export const alt = `${site.name}, ${site.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    kicker: `${site.title}, ${site.focus.toLowerCase()}`,
    title: "Mobile apps for money, identity and movement.",
    footnote: "Flutter / Swift / Kotlin / Go",
    photo: portraitDataUri(),
  });
}
