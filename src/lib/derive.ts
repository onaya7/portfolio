import { claims } from "@/content/claims";
import { roles } from "@/content/roles";
import type { Claim, ClaimId, Role, Sector } from "@/content/types";

/**
 * Views computed from the content layer.
 *
 * Nothing here is authored by hand. Add a role and the timeline, the concurrency map, the
 * sector list, the stack frequencies and the claim evidence index all update with it.
 */

/** `YYYY-MM` to a comparable integer. `null` (current) resolves to the given `now`. */
function monthIndex(iso: string): number {
  const [y, m] = iso.split("-");
  return Number(y) * 12 + (Number(m) - 1);
}

function endIndex(role: Role, now: string): number {
  return monthIndex(role.end ?? now);
}

/** Current month as `YYYY-MM`. Passed in explicitly so output is deterministic and testable. */
export function currentMonth(date = new Date()): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Roles newest first by start date. */
export function rolesByRecency(): Role[] {
  return [...roles].sort((a, b) => monthIndex(b.start) - monthIndex(a.start));
}

/**
 * Roles whose date ranges overlap, keyed by slug.
 *
 * The resume has several concurrent engagements. Rather than flattening the timeline into a
 * tidy fiction, this exposes the overlap so the layout can show it as what it is.
 * Ranges are inclusive, so a role ending in the month another begins counts as touching.
 */
export function concurrencyMap(now = currentMonth()): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const a of roles) {
    const overlapping = roles
      .filter(b => b.slug !== a.slug)
      .filter(b => monthIndex(a.start) <= endIndex(b, now) && monthIndex(b.start) <= endIndex(a, now))
      .map(b => b.slug);
    map.set(a.slug, overlapping);
  }
  return map;
}

/** Gaps of at least one month where no role was running. */
export function employmentGaps(now = currentMonth()): { from: string; to: string; months: number }[] {
  const ranges = [...roles]
    .map(r => ({ start: monthIndex(r.start), end: endIndex(r, now) }))
    .sort((a, b) => a.start - b.start);

  const gaps: { from: string; to: string; months: number }[] = [];
  let covered = ranges[0]?.end ?? 0;

  for (const range of ranges.slice(1)) {
    if (range.start > covered + 1) {
      gaps.push({ from: toIso(covered), to: toIso(range.start), months: range.start - covered - 1 });
    }
    covered = Math.max(covered, range.end);
  }
  return gaps;
}

function toIso(index: number): string {
  return `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, "0")}`;
}

/** Sectors worked in, most roles first. */
export function sectorsByWeight(): { sector: Sector; count: number }[] {
  const counts = new Map<Sector, number>();
  for (const role of roles) counts.set(role.sector, (counts.get(role.sector) ?? 0) + 1);
  return [...counts]
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => b.count - a.count || a.sector.localeCompare(b.sector));
}

/** Technologies by how many roles used them, most first. */
export function stackByWeight(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const role of roles) for (const item of role.stack) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Each claim with the roles that evidence it.
 *
 * If a claim comes back with no roles, the site is asserting something it cannot support and
 * the claim should be cut, not softened.
 */
export function claimEvidence(): { claim: Claim; evidence: Role[] }[] {
  return claims.map(claim => ({
    claim,
    evidence: rolesByRecency().filter(role => role.claims.includes(claim.id)),
  }));
}

/** Roles supporting none of the three claims. Supporting cast, and the layout should treat them as such. */
export function rolesWithoutClaim(): Role[] {
  return roles.filter(role => role.claims.length === 0);
}

/** Roles with a real measured outcome. */
export function rolesWithOutcome(): Role[] {
  return roles.filter(role => role.outcome.kind === "measured");
}

/** Roles where the resume gives no measurable outcome. Rendered honestly, never padded. */
export function rolesWithoutOutcome(): Role[] {
  return roles.filter(role => role.outcome.kind === "unstated");
}

/** Every decision across every role whose cost the resume never states. The largest content gap. */
export function decisionsMissingTradeoff(): { role: Role; decision: string }[] {
  return roles.flatMap(role =>
    role.decisions.filter(d => d.tradeoff === null).map(d => ({ role, decision: d.decision })),
  );
}

/** Claims with no supporting role. Must be empty. */
export function unsupportedClaims(): ClaimId[] {
  return claimEvidence()
    .filter(entry => entry.evidence.length === 0)
    .map(entry => entry.claim.id);
}

/** Total span of the career in whole years, from the earliest start to today. */
export function yearsActive(now = currentMonth()): number {
  const starts = roles.map(r => monthIndex(r.start));
  const earliest = Math.min(...starts);
  return Math.floor((monthIndex(now) - earliest) / 12);
}
