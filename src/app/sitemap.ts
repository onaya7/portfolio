import type { MetadataRoute } from "next";
import { site } from "@/content/contact";
import { roles } from "@/content/roles";
import { navLinks } from "@/layouts/nav";

/**
 * Derived from the nav and the content layer, so a new route or role is never missed.
 *
 * Entries must be absolute. Next applies `metadataBase` to `alternates.canonical` but not to
 * sitemap `url` fields, and the sitemap protocol rejects relative paths, so the origin is
 * joined here explicitly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...navLinks.map(link => link.href), ...roles.map(role => `/work/${role.slug}`)];
  return paths.map(path => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
  }));
}
