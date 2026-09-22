/**
 * The only file permitted to contain literal colour.
 *
 * `<meta name="theme-color">` is consumed by the browser chrome before any stylesheet is
 * parsed, so it cannot reference a CSS variable. These two values must be kept in step with
 * `--paper` in `index.css`, light and dark.
 */
export const themeColor = {
  light: "#f6f2e9",
  dark: "#16130f",
} as const;
