/**
 * Content types for the portfolio.
 *
 * Source of truth: `Samuel Ayano resume ME.pdf`. Nothing here may assert anything that
 * document does not support.
 *
 * Two design rules govern this file:
 *
 * 1. Gaps in the source are modelled as *variants*, never as missing or optional fields.
 *    `Outcome` has an `unstated` member and `Decision.tradeoff` is nullable, so a role with
 *    no published number cannot be silently skipped, and cannot be quietly padded with
 *    adjectives to look like it has one. The renderer is forced to say so.
 *
 * 2. Anything derivable is derived. Concurrency between roles, sector counts and the
 *    claim-to-evidence index are computed in `@/lib/derive` from the ISO dates and the
 *    `claims` tags, so they cannot drift out of step with the roles themselves.
 */

/** The three claims the entire site exists to support. See `@/content/claims`. */
export type ClaimId = "regulated" | "offline" | "rails";

/**
 * A result with a number attached.
 *
 * `unstated` is the honest default. The resume gives a measurable outcome for four of the
 * nine roles; the other five say things like "on time and within budget", which is a claim
 * rather than a measurement, and are recorded as `unstated`.
 */
export type Outcome = { kind: "measured"; value: string; metric: string } | { kind: "unstated" };

/**
 * How many people or records the work touched.
 *
 * Deliberately separate from `Outcome`: "200 million identities" and "hundreds of thousands
 * of customers" describe the size of the system, not the effect of the work. Folding them
 * into `Outcome` would let scale masquerade as a result.
 */
export type Reach = { value: string; metric: string };

/**
 * A technical decision and what it cost.
 *
 * `tradeoff: null` means the resume states the decision but never its cost. That is the
 * single largest gap in the source material and it is rendered, not hidden.
 */
export type Decision = {
  decision: string;
  tradeoff: string | null;
};

/** A screenshot of shipped work. Only real, permitted images. Never a placeholder. */
export type Shot = {
  src: string;
  /** Required. A decorative screenshot of an app is a contradiction. */
  alt: string;
  width: number;
  height: number;
};

/** Public links to shipped work. Every field optional; absent means the affordance is not rendered. */
export type RoleLinks = {
  appStore?: string;
  playStore?: string;
  site?: string;
};

export type Role = {
  slug: string;
  company: string;
  /** Qualifier the resume attaches to the employer, e.g. the Ghana subsidiary project. */
  companyNote?: string;
  title: string;
  sector: Sector;
  /** ISO `YYYY-MM`, inclusive. Used for sorting and computing concurrency. */
  start: string;
  /** ISO `YYYY-MM`, inclusive. `null` means current. */
  end: string | null;
  /** The date range exactly as the resume writes it. Displayed verbatim. */
  dateLabel: string;
  problem: string;
  myRole: string;
  constraints: string[];
  decisions: Decision[];
  outcome: Outcome;
  reach?: Reach;
  stack: string[];
  /** Which of the three claims this role is evidence for. Empty is allowed and is meaningful. */
  claims: ClaimId[];
  links?: RoleLinks;
  shots?: Shot[];
  /** A discrepancy or absence in the source worth surfacing rather than smoothing over. */
  sourceNote?: string;
};

export type Sector = "Banking" | "Payments" | "Identity" | "Mobility" | "Healthtech" | "Q-commerce" | "Consultancy";

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
  /** Flags a transcription question in the source. */
  sourceNote?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: number;
  /** The resume links these as "view", but the URLs did not survive extraction. */
  href?: string;
};

export type Education = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  sourceNote?: string;
};

export type Claim = {
  id: ClaimId;
  /** The claim as the site states it. */
  statement: string;
  /** Why it is true, in one sentence. */
  support: string;
};

/** Nothing in the source populates this. The collection ships empty and its section stays hidden. */
export type Article = {
  slug: string;
  title: string;
  date: string;
  href: string;
  summary: string;
};
