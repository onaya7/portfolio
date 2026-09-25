/**
 * Identity and contact details, from `Samuel Ayano resume ME.pdf`.
 *
 * `site.url` drives canonical URLs, Open Graph and the sitemap. Set NEXT_PUBLIC_SITE_URL once a
 * domain exists.
 */
export const site = {
  name: "Samuel Ayano",
  title: "Senior Mobile Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelayano.com",
  locale: "en_NG",
  description:
    "Samuel Ayano is a senior mobile engineer in Lagos building banking, identity and mobility apps in Flutter, Swift and Kotlin for millions of users across Africa.",
} as const;

export const contact = {
  email: "samuelayano7@gmail.com",
  phone: "+234 816 757 9409",
  /** E.164, for the tel: href. */
  phoneHref: "+2348167579409",
  location: "Lagos, Nigeria",
} as const;

/**
 * The resume links the word "LinkedIn" but the URL did not survive, and it lists no GitHub.
 * Both stay null until supplied; the renderer omits anything null.
 */
export const profiles: { label: string; href: string | null }[] = [
  { label: "LinkedIn", href: null },
  { label: "GitHub", href: null },
];

export const education = {
  degree: "B.Eng. Electrical and Electronics Engineering",
  school: "University of Cross River State, Calabar",
} as const;

/** The resume's "view" links did not survive extraction. Add `href` when known. */
export const certifications: { name: string; issuer: string; year: number; href?: string }[] = [
  { name: "Software Engineering", issuer: "ALX Africa", year: 2023 },
  { name: "Back End Developer, I4G x Zuri Cohort 2", issuer: "Zuri Team", year: 2023 },
  { name: "Backend Web Development (Python)", issuer: "Side Hustle", year: 2022 },
  { name: "Soft Skills", issuer: "Jobberman Nigeria", year: 2022 },
  { name: "Global Citizenship Education for Youth", issuer: "APCEIU", year: 2022 },
];
