import { roles } from "@/content/roles";
import type { Role, YearMonth } from "@/content/types";

/**
 * Everything computed from the roles. Add or edit a role in `content/roles.ts` and the home
 * page, the work pages, the figures strip and the sitemap follow. Nothing here is typed by hand.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(ym: YearMonth): { year: number; month: number } {
  const [year, month] = ym.split("-").map(Number);
  return { year: year ?? 0, month: month ?? 1 };
}

/** Months since year 0, for ordering and arithmetic. */
function ordinal(ym: YearMonth): number {
  const { year, month } = parse(ym);
  return year * 12 + (month - 1);
}

export function formatMonth(ym: YearMonth): string {
  const { year, month } = parse(ym);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(role: Role): string {
  return `${formatMonth(role.start)} - ${role.end ? formatMonth(role.end) : "Now"}`;
}

export function formatYears(role: Role): string {
  const start = parse(role.start).year;
  const end = role.end ? parse(role.end).year : null;
  if (end === start) return String(start);
  return `${start} - ${end ?? "Now"}`;
}

/**
 * Inclusive month count. An open role is counted to the build date, which is also when the
 * page is generated, so it is correct on the day it is served.
 */
export function formatDuration(role: Role): string {
  const now = new Date();
  const endOrdinal = role.end ? ordinal(role.end) : now.getFullYear() * 12 + now.getMonth();
  const months = Math.max(1, endOrdinal - ordinal(role.start) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [years && `${years} yr${years > 1 ? "s" : ""}`, rest && `${rest} mo${rest > 1 ? "s" : ""}`];
  return parts.filter(Boolean).join(" ");
}

/** Newest start first. Ties go to the one that ended later. */
export const timeline: Role[] = [...roles].sort((a, b) => {
  const byStart = ordinal(b.start) - ordinal(a.start);
  if (byStart !== 0) return byStart;
  const endA = a.end ? ordinal(a.end) : Infinity;
  const endB = b.end ? ordinal(b.end) : Infinity;
  return endB - endA;
});

export const featured = timeline.filter(role => role.featured);
export const alsoShipped = timeline.filter(role => !role.featured);
export const current = timeline.find(role => role.end === null) ?? null;

/** Every role with a stated figure, in timeline order. */
export const measured = timeline.filter((role): role is Role & { metric: NonNullable<Role["metric"]> } =>
  Boolean(role.metric),
);

export function roleBySlug(slug: string): Role | undefined {
  return roles.find(role => role.slug === slug);
}

/** The role after this one in the timeline, wrapping at the end. */
export function nextRole(role: Role): Role {
  const index = timeline.findIndex(r => r.slug === role.slug);
  return timeline[(index + 1) % timeline.length] ?? role;
}

/** "FirstBank Ghana" style display name, used in titles. */
export function displayName(role: Role): string {
  if (role.product) return role.product;
  if (role.context && role.context.startsWith("Ghana")) return `${role.company} Ghana`;
  return role.company;
}
