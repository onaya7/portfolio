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

/** The stores' own badge wording. */
const storeLabels: Record<StoreLink["key"], string> = {
  appStore: "Download on the App Store",
  googlePlay: "Get it on Google Play",
  web: "Visit the website",
};

/** The role's download links that are actually set, in a fixed order. */
export function storeLinks(role: Role): StoreLink[] {
  return (["appStore", "googlePlay", "web"] as const).flatMap(key => {
    const href = role.stores[key];
    return href ? [{ key, label: storeLabels[key], href }] : [];
  });
}
