import type { Article } from "./types";

/**
 * Nothing in the source material populates this.
 *
 * The collection ships empty on purpose and its section is hidden by a length check at the
 * call site, following the reference repo's `testimonials: []` pattern. It is not filled with
 * invented posts, and the nav does not link to an empty page.
 */
export const writing: Article[] = [];
