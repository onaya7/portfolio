import type { Config } from "tailwindcss";

/**
 * Direction A, "Settlement".
 *
 * Colours are space-separated RGB channels behind CSS variables so Tailwind's opacity
 * modifiers work (`text-ink/60`). Values live in `src/styles/index.css` and nowhere else.
 * Hex in a component is a lint error.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "media",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: token("paper"), 100: token("paper-100") },
        ink: token("ink"),
        rule: token("rule"),
        stamp: token("stamp"),
        void: token("void"),
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        micro: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.06em" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        lead: ["clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", { lineHeight: "1.55" }],
        section: ["clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)", { lineHeight: "1.2" }],
        title: ["clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem)", { lineHeight: "1.12" }],
        display: ["clamp(2.5rem, 1.6rem + 4.2vw, 4.75rem)", { lineHeight: "1.06" }],
      },
      spacing: {
        /** Fibonacci-flavoured vertical rhythm: 8 16 24 40 64 104 168. */
        r1: "0.5rem",
        r2: "1rem",
        r3: "1.5rem",
        r4: "2.5rem",
        r5: "4rem",
        r6: "6.5rem",
        r7: "10.5rem",
      },
      maxWidth: { measure: "34rem", ledger: "72rem" },
      transitionTimingFunction: {
        settle: "cubic-bezier(0.16, 1, 0.3, 1)",
        rule: "cubic-bezier(0.65, 0, 0.35, 1)",
        mark: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
