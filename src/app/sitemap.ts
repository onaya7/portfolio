import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { timeline } from "@/lib/work";

/**
 * Derived from the roles, so a new one is never missed. Entries must be absolute: Next applies
 * `metadataBase` to canonical URLs but not to sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...timeline.map(role => `/work/${role.slug}`)];
  return paths.map(path => ({ url: new URL(path, site.url).toString(), lastModified: new Date() }));
}
