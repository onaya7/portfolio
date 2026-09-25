/** "2026-03". Month precision is all the resume gives. */
export type YearMonth = `${number}-${string}`;

export type Sector = "Banking" | "Payments" | "Identity" | "Mobility" | "Commerce" | "Health";

/**
 * Cover surfaces for the work cards. Each maps to a pair of CSS variables in `styles/index.css`
 * (`--tone-<name>-bg` / `--tone-<name>-fg`), defined for both themes.
 */
export type Tone = "moss" | "slate" | "clay" | "bone" | "ink";

/**
 * A figure the resume states outright. `value` is printed as written; never round, never
 * extrapolate, never add one the resume does not contain.
 */
export type Metric = { value: string; label: string };

export type Role = {
  slug: string;
  company: string;
  /** Qualifier printed after the company, e.g. the Ghana subsidiary. */
  context?: string;
  /** Product name when it differs from the company, e.g. E-lerrah at Cornie Health. */
  product?: string;
  title: string;
  terms?: "Contract" | "Internship";
  start: YearMonth;
  /** `null` is the current role. */
  end: YearMonth | null;
  /** `null` where the resume does not say. */
  sector: Sector | null;
  /** One sentence for cards and meta descriptions. Restates the resume, adds nothing. */
  summary: string;
  /** The resume's bullets, tightened for reading. Same claims, same order. */
  highlights: string[];
  /** Only tools the resume ties to this role. */
  stack: string[];
  metric?: Metric;
  tone: Tone;
  /** Short labels printed on the cover. */
  tags: string[];
  /** Featured roles get a large cover on the home page. */
  featured?: boolean;
  /** Store links. Leave undefined until a real URL exists; never add a placeholder. */
  links?: { label: string; href: string }[];
};
