/** "2026-03". Month precision is all the record gives. */
export type YearMonth = `${number}-${string}`;

export type Sector = "Banking" | "Payments" | "Identity" | "Mobility" | "Commerce" | "Health" | "Events";

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

/**
 * Where the app can be downloaded. `null` until a real, public listing URL exists; the page shows
 * a store button only for the ones that are set.
 */
export type Stores = {
  /** The app's name, needed only when the role lists more than one app in `moreApps`. */
  name?: string;
  /** https://apps.apple.com/... */
  appStore: string | null;
  /** https://play.google.com/store/apps/details?id=... */
  googlePlay: string | null;
  /** A product website, if there is one. */
  web?: string | null;
};

/** A further app on the same role, e.g. a bank's corporate and retail apps. */
export type AppListing = { name: string; appStore: string | null; googlePlay: string | null };

/**
 * One app screenshot. Put the file in `public/work/<slug>/` and reference it from the site root,
 * e.g. `/work/firstbank-ghana/home.png`. Portrait phone captures (about 9:19.5, such as
 * 1170x2532) fit the frame without cropping. Only add screenshots you have permission to show.
 */
export type Screenshot = {
  src: `/work/${string}`;
  /** What the screen shows, for screen readers, e.g. "Transfer confirmation with PAPSS". */
  alt: string;
  /** Optional caption under the frame. */
  caption?: string;
};

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
  /** Download links. Fill in when the listing is public. */
  stores: Stores;
  /** Further apps on the same role, each with its own store buttons. */
  moreApps?: AppListing[];
  /**
   * Screenshots, in the order they should appear. The first one also appears on the home-page
   * cover. A file that does not exist on disk is skipped, so a typo never renders a broken image.
   */
  shots: Screenshot[];
};
