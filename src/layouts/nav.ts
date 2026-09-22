/** Single source for the nav. `sitemap.ts` derives from this, so a new route is listed once. */
export const navLinks = [
  { href: "/", label: "record" },
  { href: "/about", label: "about" },
] as const;
