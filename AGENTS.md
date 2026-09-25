# AGENTS.md

Guidance for AI coding agents working in this repository.

## Commands

Yarn is the package manager.

- `yarn dev` - dev server with Turbopack (http://localhost:3000)
- `yarn build` / `yarn start` - production build / serve
- `yarn typecheck` - `tsc --noEmit`
- `yarn lint` - ESLint flat config
- `yarn format` - Prettier (120 cols, sorted imports)

**Never run `yarn build` while `yarn dev` is running.** The production build overwrites `.next`
and leaves the dev server serving 500s. To verify a build while dev is up, copy the project
(without `node_modules` and `.next`) to a scratch folder, symlink `node_modules`, and build there.

There is no test runner.

## What this site is

A portfolio for Samuel Ayano, Senior Mobile Engineer. Its single source of truth is
`/Users/user/Documents/samuel cv/Samuel Ayano resume ME.pdf`. A sibling `Samuel Ayano cv.pdf`
describes an unrelated back-end web career and is **dead content**; nothing from it belongs here.

Visual references the design was built against: charlesarchibong.com (typographic project
covers, pill buttons, dark ground) and juliusayang.vercel.app (figures strip, experience list,
stack grid).

## The content rule

**Every claim and every number comes from the resume.** Do not invent a metric, a sector, a
tool, a store link or a screenshot. Where the resume is silent, the type says so: `sector` is
nullable, `metric` and `links` are optional, and `profiles[].href` is null until supplied. The
renderer omits what is missing; it never fills it.

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3. No motion library, no state
library, no component library. Everything is a server component except three client leaves:
`ThemeToggle`, `Reveal` and `CopyEmail`. Every route is statically generated.

- `src/content/` - typed content: `roles.ts` (all nine roles), `profile.ts` (identity, contact,
  education, certificates), `stack.ts`, `approach.ts`.
- `src/lib/work.ts` - everything derived from the roles: timeline order, featured split, current
  role, measured figures, periods and durations, next-role links. **Never hand-maintain anything
  derivable**; add a role and the home page, work pages, figures, OG images and sitemap follow.
- `src/app/page.tsx` stacks sections from `src/app/_sections/`. `src/app/work/[slug]/` is the
  case-study page and its generated Open Graph image.
- `src/lib/metadata.ts` - `pageMetadata()`. Next *replaces* a nested `openGraph` rather than
  merging, so every page builds a complete object.
- Featured roles (`featured: true`) get large covers in Selected work; the grid alternates 7/5
  and 5/7 column spans. The first figure is the resume's tenure claim; the other three are the
  newest roles with a `metric`.

## Design system

- **Type**: Geist (display and body) and Geist Mono (labels, dates, tags). Two variable files,
  nothing else. Display sizes run tight (`-0.045em`) at weight 400.
- **Colour**: tokens are RGB channels in `src/styles/index.css`, defined for dark (default, and
  the no-JS state) and light (`[data-theme="light"]`, opt-in via the toggle, stored in
  localStorage and applied by an inline script before paint). One accent, a warm signal orange.
  Work covers use five tones (`moss`, `slate`, `clay`, `bone`, `ink`), each a bg/fg pair per
  theme. **Hex in a component is a lint error**; `src/styles/theme.ts` is the one exception, for
  `<meta name="theme-color">` and the OG images.
- **Contrast**: `fg`, `muted`, `subtle` and `accent` clear 4.5:1 on `bg` and `surface` in both
  themes; cover labels sit at 80% opacity, the lowest that still clears 4.5:1 on every tone.
  Re-check if you change a token.
- **Shape**: controls are full pills; surfaces use the 1.25rem `rounded-card`. Nothing else.
- **Banned**: em-dashes and en-dashes anywhere in copy (use a hyphen), an eyebrow label above
  section headings, decorative status dots, placeholder images or URLs, glassmorphism beyond
  the header's blur, purple-blue gradients.

## Motion

Transform and opacity only.

- **Hero rise**: headline lines and hero blocks rise once on load, 700ms, 70ms stagger. Starts
  at opacity 0.01, not 0, so the h1 stays an LCP candidate.
- **Reveal**: `[data-reveal]` elements fade up once on entering the viewport. The hidden state
  only applies under `html.js-reveal`, set by the inline script when IntersectionObserver exists
  and reduced motion is off, and withdrawn after 3s if `Reveal` never hydrates. Hidden is
  opacity 0 so contrast audits skip it.
- **Hover**: cover wordmark lifts, arrows nudge, buttons press to 0.98.
- Reduced motion, no JavaScript and no observer all render the resting state. Keep that true.
- No scroll-linked animation and no scroll listeners.

## Verified budget

Mobile Lighthouse, production build: performance 98-99, accessibility 100, best practices 100,
SEO 100, CLS 0, on `/` and work pages. Hold these.

## Open items, needing Samuel rather than code

- A headshot, and App Store / Play Store URLs with permitted screenshots. `Role.links` renders
  when set. The typographic covers stand in until real images exist; never add a placeholder.
- LinkedIn and GitHub URLs (`profiles` in `src/content/profile.ts`, currently null).
- Certificate URLs behind the resume's "view" links (`certifications[].href`).
- Sectors for Uobis and David Consult, which the resume does not state.
- Store links or outcomes for OjaNow, Cornie Health (E-lerrah) and Uobis.
- `site.url` is a guess. Set `NEXT_PUBLIC_SITE_URL` once a domain exists.
