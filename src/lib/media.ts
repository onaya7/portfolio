import { existsSync } from "node:fs";
import path from "node:path";
import type { Role, Screenshot } from "@/content/types";

/**
 * Screenshots whose file exists in `public/`. Pages are generated at build time, so a missing or
 * misspelled file is dropped here instead of shipping a broken image.
 */
export function availableShots(role: Role): Screenshot[] {
  return role.shots.filter(shot => {
    const found = existsSync(path.join(process.cwd(), "public", shot.src));
    if (!found && process.env.NODE_ENV !== "production") {
      console.warn(`[work/${role.slug}] screenshot not found, skipped: public${shot.src}`);
    }
    return found;
  });
}

export type StoreLink = { key: "appStore" | "googlePlay" | "web"; label: string; href: string };

/** One app's buttons. `name` is set only when a role has more than one app. */
export type StoreGroup = { name?: string; links: StoreLink[] };

/** The stores' own badge wording. */
const storeLabels = {
  appStore: "Download on the App Store",
  googlePlay: "Get it on Google Play",
} as const;

function appLinks(app: { appStore: string | null; googlePlay: string | null }): StoreLink[] {
  return (["appStore", "googlePlay"] as const).flatMap(key => {
    const href = app[key];
    return href ? [{ key, label: storeLabels[key], href }] : [];
  });
}

/**
 * The role's download links that are actually set: one group per app, in content order, then
 * the website on its own. Apps are named only when there is more than one.
 */
export function storeGroups(role: Role): StoreGroup[] {
  const apps = [{ name: role.stores.name, ...role.stores }, ...(role.moreApps ?? [])];
  const named = apps.length > 1;
  const groups: StoreGroup[] = apps
    .map(app => ({ name: named ? app.name : undefined, links: appLinks(app) }))
    .filter(group => group.links.length > 0);

  const web = role.stores.web;
  if (web) {
    // A website button names its domain, so a company site reads differently from a product site.
    const label = `Visit ${new URL(web).hostname.replace(/^www\./, "")}`;
    groups.push({ links: [{ key: "web", label, href: web }] });
  }
  return groups;
}
