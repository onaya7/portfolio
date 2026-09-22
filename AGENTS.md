# AGENTS.md

Guidance for AI coding agents working in this repository.

## Commands

Yarn is the package manager.

- `yarn dev` — dev server with Turbopack (http://localhost:3000)
- `yarn build` / `yarn start` — production build / serve
- `yarn typecheck` — `tsc --noEmit`
- `yarn lint` — ESLint flat config
- `yarn format` — Prettier (120 cols, sorted imports)

**Never run `yarn build` while `yarn dev` is running.** The production build overwrites `.next`
and leaves the dev server serving 500s until it is killed and `.next` deleted.

There is no test runner.

## What this site is

A portfolio for Samuel Ayano, Senior Mobile Engineer. Its single source of truth is
`/Users/user/Documents/samuel cv/Samuel Ayano resume ME.pdf`. A sibling `Samuel Ayano cv.pdf`
describes an unrelated back-end web career and is **dead content**; nothing from it belongs here.

The site exists to argue three claims, defined in `src/content/claims.ts`. Content that supports
none of them is decoration and should be cut rather than kept for completeness.

## The rule that governs everything

**Gaps in the source are modelled as types, not as missing fields.**

`Outcome` has an `unstated` member and `Decision.tradeoff` is nullable. Four of the nine roles
have a measured outcome; five do not, and all 31 recorded decisions lack a stated cost. Those
absences render as a struck rule and the words "not disclosed". They are the most distinctive
thing on the site.

Do not invent a number, do not soften an absence with adjectives, and do not hide a role because
it is thin. If new information arrives, change the content layer; never the renderer.

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3. No motion library, no state
library, no component library, no form library. Every page and section is a server component;
the only client components are `Reconcile` and `CopyEmail`.

- `src/content/` — the typed content layer. TypeScript objects, no JSON or MDX or CMS.
- `src/lib/derive.ts` — everything computed: concurrency between roles, employment gaps, sector
  and stack weights, the claim-to-evidence index. **Add a role and these update themselves.**
  Never hand-maintain anything derivable.
- `src/app/<route>/page.tsx` stacks sections from a sibling `_sections/` folder.
- `src/lib/metadata.ts` — `pageMetadata()`. Next *replaces* nested `openGraph` rather than
  merging, so every page builds a complete object.
- `sitemap.ts` derives from `layouts/nav.ts` plus the roles.

## Art direction: "Settlement"

The career as a financial record. Typography carries; there is no imagery.

- **Type**: Newsreader (display and body, 300/400 plus italic 300) and IBM Plex Mono (figures,
  dates, labels). Two families, no more. Static instances, not the variable cut: the variable
  files with the `opsz` axis came to 273kB and pushed mobile LCP to 3.3s.
- **Tokens** live in `src/styles/index.css` as space-separated RGB channels. `paper`,
  `paper-100`, `ink`, `rule`, `stamp`, `void`. **Hex in a component is a lint error**;
  `src/styles/theme.ts` is the one sanctioned exception, for `<meta name="theme-color">`.
- `rule` is decorative only and sits below 3:1 on purpose. Anything meaningful (the struck rule)
  or interactive uses `void`, which clears AA on both surfaces.
- Dark mode is `prefers-color-scheme` only. No toggle, no `next-themes`, no JS.
- **One grid break exists**: the h1 hangs into the left margin at `lg`. Do not add a second.
- Banned: dark-background hero, purple-blue gradients, glassmorphism, glowing borders, three
  equal feature cards, an eyebrow above every heading, em-dashes in copy, decorative status dots.

## Motion

Four interactions, one signature. Transform and opacity only, no exceptions.

- **Reconciliation** (signature): on the ledger entering view, the four measured figures roll
  into place and the five struck rules draw, staggered 70ms per row, once, never replaying.
  380ms per element.
- **Row mark** 120ms, **copy confirm** 140ms, **focus ring** 0ms by decision (the Frequency Gate
  says keyboard-initiated transitions are never animated).

The start state is gated on a `js-motion` class set by an inline script before first paint, only
when `IntersectionObserver` exists and reduced motion is not requested. **No JavaScript, no
observer and reduced motion all render the resting state, which is the correct figure.** This is
why `<html>` carries `suppressHydrationWarning`. Keep that property: the resting state must
always be the truth, and animation may only depart from it and return.

Do not add scroll-linked animation. Nothing on this site is driven by scroll position.

## Verified budget

Mobile Lighthouse, production build: performance 97, accessibility 100, best practices 100,
SEO 100, CLS 0, on `/`, `/about` and role pages. Hold these. The font payload is the main lever.

## Open items, needing Samuel rather than code

- App Store / Play Store URLs and permitted screenshots. `Role.links` and `Role.shots` are
  optional and render conditionally. **Never add a placeholder URL or image.**
- Tradeoffs for the decisions in each role. The largest content gap, 31 of 31.
- Outcomes for Mintyn, OjaNow, NGSS, Cornie Health, Uobis, or confirmation they ship without.
- Certification URLs behind the resume's "view" links.
- Corrected dates, or confirmation the concurrent roles are accurate.
- LinkedIn and GitHub URLs. Both are `null` in `src/content/contact.ts` and omitted from render.
- `src/content/writing.ts` is empty and its section is hidden by a length check.
- `site.url` is a guess. Set `NEXT_PUBLIC_SITE_URL` once a domain exists.
- There is no Open Graph image and no headshot.
