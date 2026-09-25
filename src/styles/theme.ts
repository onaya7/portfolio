/**
 * The only file permitted to contain literal colour.
 *
 * `<meta name="theme-color">` and the generated Open Graph image cannot read CSS variables.
 * Keep these in step with `--bg`, `--fg`, `--muted` and `--accent` in `index.css`.
 */
export const themeColor = {
  dark: "#0c0c0b",
  light: "#f5f5f3",
} as const;

export const ogPalette = {
  bg: "#0c0c0b",
  fg: "#f2f0eb",
  muted: "#a6a39c",
  line: "#282825",
  accent: "#f0845c",
} as const;
