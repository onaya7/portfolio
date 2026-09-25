import type { Config } from "tailwindcss";

/**
 * Colours are RGB channels behind CSS variables so opacity modifiers work (`text-fg/60`).
 * Values live in `src/styles/index.css` for both themes. Hex in a component is a lint error.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        raised: token("raised"),
        line: { DEFAULT: token("line"), strong: token("line-strong") },
        fg: token("fg"),
        muted: token("muted"),
        subtle: token("subtle"),
        accent: { DEFAULT: token("accent"), ink: token("accent-ink") },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.65" }],
        lead: ["clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", { lineHeight: "1.6" }],
        h3: ["clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["clamp(2rem, 1.5rem + 2vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        display: ["clamp(2.625rem, 1.6rem + 4.2vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        figure: ["clamp(2.75rem, 2rem + 3vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],
        cover: ["clamp(3.25rem, 2rem + 6vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.055em" }],
      },
      maxWidth: { page: "80rem", prose: "38rem" },
      borderRadius: { card: "1.25rem" },
      transitionTimingFunction: { out: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
} satisfies Config;
