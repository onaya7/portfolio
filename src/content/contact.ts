/**
 * Identity and contact details, verbatim from the resume.
 *
 * `site.url` drives the canonical URL, Open Graph tags and the sitemap. Override with
 * NEXT_PUBLIC_SITE_URL once a domain exists.
 */
export const site = {
  name: "Samuel Ayano",
  title: "Senior Mobile Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelayano.com",
  locale: "en_NG",
  description:
    "Senior Mobile Engineer building mobile money and identity software for African networks that cannot be relied on. Flutter, Swift and Kotlin across banking, payments, identity and mobility.",
} as const;

export const contact = {
  email: "samuelayano7@gmail.com",
  phone: "+234-816-757-9409",
  /** E.164, for the tel: href. */
  phoneHref: "+2348167579409",
  location: "Ikeja, Lagos State, Nigeria",
} as const;

/**
 * The resume links the word "LinkedIn" but the target URL did not survive extraction, and it
 * lists no GitHub at all. Both stay null until supplied; the renderer omits what is null
 * rather than linking somewhere that does not exist.
 */
export const profiles: { linkedin: string | null; github: string | null } = {
  linkedin: null,
  github: null,
};

/** The resume's PERSONAL PROFILE, verbatim. */
export const profileSummary =
  "Senior Mobile Engineer with over 6 years of software engineering experience and 5+ years specializing in building and shipping production-grade cross-platform and native mobile applications. Proven expertise in Flutter and native Android/iOS development for fintech, ride-hailing, healthtech, e-commerce, and identity verification products serving millions of users across Africa. Skilled in leading teams, architecting scalable solutions, and delivering high-performance apps using modern CI/CD, testing, and monitoring practices.";
