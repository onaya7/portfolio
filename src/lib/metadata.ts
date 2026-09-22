import type { Metadata } from "next";
import { site } from "@/content/contact";

/**
 * Per-page metadata.
 *
 * Next replaces nested `openGraph` objects rather than merging them with the root layout's,
 * so every page builds its own complete object through here.
 */
export function pageMetadata({
  title,
  description = site.description,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
