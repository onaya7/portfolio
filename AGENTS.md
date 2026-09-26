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
Use `ln -sfn`, not `ln -sf`: on a second run `-sf` follows the existing link and plants a
`node_modules/node_modules` symlink inside the real project, which Turbopack rejects once the
project moves ("points out of the filesystem root").

This repo lives at `Samuel_space/MyPortfolio/samuel_portfolio`, next to `victoria_portfolio`.
`MyPortfolio/.claude/launch.json` starts this site by name (`samuel_portfolio`) from the parent.

There is no test runner.

## What this site is

A portfolio for Samuel Ayano, Software Engineer with mobile at the core (`site.title` and
`site.focus`); backend (Go, Python, Django, Flask, C) is presented as range, not the headline.
Its source of truth is
`/Users/user/Documents/samuel cv/Samuel Ayano resume ME.pdf`, plus two contracts Samuel gave
directly in September 2026 that the resume predates: WeTribe (Sep 2024 - Nov 2025) and Lotus
Bank CIB and RIB apps (10 Aug - 20 Sep 2026), both Senior Mobile Engineer, Flutter; and
Astravest (Adastra Tech Limited), Engineering Lead on contract since 18 May 2026 and ongoing,
across mobile (Flutter, Swift/SwiftUI, Kotlin) and backend (Go), where he led the team to
stabilise v1 while driving v2. His backend languages and skills (PostgreSQL, Prisma, security,
ORMs) were also given directly, with no public project to show, so nothing is linked. The
ORMs, Redis and backend auth items he left as "etc" are listed in `stack.ts` for him to confirm. Security is two
groups, mobile and backend, sharing a tinted row in the Stack grid; `stack.ts` notes which items
he named and which were filled in. A sibling `Samuel Ayano cv.pdf`
describes an unrelated back-end web career and is **dead content**; nothing from it belongs here.

Visual references the design was built against: charlesarchibong.com (typographic project
covers, pill buttons, dark ground) and juliusayang.vercel.app (figures strip, experience list,
stack grid).

## The content rule

**Every claim and every number comes from the resume or from Samuel.** Lotus Bank's highlights come
from his work log for the contract (completed items only). WeTribe's were drafted from public
research at his request and are marked as a draft until he confirms them. Do not invent a metric, a sector, a
tool, a store link or a screenshot. Where the resume is silent, the type says so: `sector` is
nullable and `metric` is optional. The renderer omits what is missing; it never fills it.

Store links on Mintyn, FirstBank Ghana, OjaNow, MyAza, WeTribe, Astravest and both Lotus Bank apps were
checked against the listings (developer name matches, September 2026). A role with more than one
app lists the rest in `moreApps`, and each app's buttons are then labelled with its name. The
other five roles have no verifiable listing, so
their store fields stay null, but each has its company or product website as `web` (all but
Citigo, which has no site that can be tied to it). NGSS has two candidate "Nester Verify"
Android apps; leave its store links null until Samuel says which one he worked on.

## Screenshots and store links

Every role carries two slots in `src/content/roles.ts`, empty until Samuel supplies real ones:

- `stores: { appStore, googlePlay, web? }` - public listing URLs, or `null`. Set ones render as
  buttons under the summary on the work page, with the stores' own wording.
- `shots: Screenshot[]` - `{ src, alt, caption? }`. Files go in `public/work/<slug>/` (folders
  exist with a `.gitkeep`) and `src` is root-relative, e.g. `/work/mintyn/home.png`. Portrait
  phone captures at about 9:19.5 fit the frame uncropped.

The first screenshot rises out of the home-page cover and the work-page cover; two or more add a
scrollable "Screens" gallery. `lib/media.ts` drops any `src` whose file is missing (with a dev
warning), so a typo never ships a broken image. Never add a placeholder URL or image; an empty
slot is the correct state.

## Portrait

`public/images/samuel-ayano.jpg` (480x516), imported through `src/content/portrait.ts`. EXIF
(camera make and model) was stripped before commit; strip it again if the file is replaced.
It is shown in greyscale at no more than 22rem wide, and it is the home page's LCP element, so
it is not animated and loads with high priority. The home Open Graph image embeds it too.

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3. No motion library, no state
library, no component library. Everything is a server component except four client leaves:
`ThemeToggle`, `Reveal`, `CopyEmail` and `EmailComposer`. Every route is statically generated.

**Email compose dialog.** Every mailto link with `data-compose` (`Button` adds it to mailto
hrefs; the footer address has it too) opens `EmailComposer`, a native `<dialog>` mounted once in
the layout, prefilled from `emailDraft()` in `content/profile.ts`. On a work page the article's
`data-compose-topic` names the product in the draft. The visitor's name, email and phone are
required: Continue stays disabled until all three pass validation (errors show after a field is
left), and they are appended to the message as a signature. They live in component state for
the visit only; never persist them. Continue hands off to the mail app via a mailto URL (CRLF
line breaks); the dialog then offers Gmail and copy-address in case no mail app
is set up. Without JavaScript, or on a modifier-click, the links stay plain mailto links.

- `src/content/` - typed content: `roles.ts` (every role), `profile.ts` (identity, contact,
  education, certificates), `stack.ts`, `approach.ts`, `backend.ts` (the Backend section).
- Two roles are ongoing (Mintyn and Astravest). The one marked `hero: true` (Mintyn) fills the
  hero's "Now" card; the others are listed under it as "Also now".
- `src/lib/media.ts` - screenshot existence checks and store-link labels (server only).
- `src/lib/work.ts` - everything derived from the roles: timeline order, featured split, current
  role, measured figures, periods and durations, next-role links. **Never hand-maintain anything
  derivable**; add a role and the home page, work pages, figures, OG images and sitemap follow.
- `src/app/page.tsx` stacks sections from `src/app/_sections/`. `src/app/work/[slug]/` is the
  case-study page and its generated Open Graph image.
- `src/lib/metadata.ts` - `pageMetadata()`. Next *replaces* a nested `openGraph` rather than
  merging, so every page builds a complete object.
- Featured roles (`featured: <position>`, currently Mintyn 1, FirstBank Ghana 2, OjaNow 3, NGSS 4)
  get large covers in Selected work, in that order; the grid alternates 7/5
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
- **Shape**: controls are full pills; surfaces use the 1.25rem `rounded-card`. The one exception
  is `PhoneShot`, whose 2rem radius matches a phone's corners.
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
- **Compose dialog**: opens in 200ms (fade and 12px rise), closes instantly.
- Reduced motion, no JavaScript and no observer all render the resting state. Keep that true.
- No scroll-linked animation and no scroll listeners.

## Verified budget

Mobile Lighthouse, production build: performance 97-99 (LCP 2.5s on `/`, the portrait),
accessibility 100, best practices 100, SEO 100, CLS 0, on `/` and work pages. Hold these.

## Open items, needing Samuel rather than code

- App screenshots for the `shots` slots (Samuel is sending them). Only permitted ones.
- Which Nester Verify app belongs to NGSS; any link for Citigo; store links for E-lerrah and Uobis if they exist.
- Certificate URLs behind the resume's "view" links (`certifications[].href`).
- Sectors for Uobis and David Consult, which the resume does not state.
- Outcomes for OjaNow, Cornie Health (E-lerrah) and Uobis.
- Confirm the WeTribe highlights. They were drafted from the App Store listing at Samuel's
  request, not from a work log, and are marked DRAFT in `roles.ts`.
- `site.url` is a guess. Set `NEXT_PUBLIC_SITE_URL` once a domain exists.
