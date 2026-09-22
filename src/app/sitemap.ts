import type { MetadataRoute } from "next";
import { roles } from "@/content/roles";
import { navLinks } from "@/layouts/nav";

/** Derived from the nav and the content layer, so a new route or role is never missed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...navLinks.map(link => link.href), ...roles.map(role => `/work/${role.slug}`)];
  return paths.map(path => ({ url: path, lastModified: new Date() }));
}
