import type { Metadata } from "next";
import { site } from "@/content/profile";

/**
 * Per-page metadata. Next replaces a nested `openGraph` object rather than merging it with the
 * layout's, so each page builds a complete one here.
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
    openGraph: { type: "website", siteName: site.name, locale: site.locale, title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
