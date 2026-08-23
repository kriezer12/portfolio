# Portfolio v3 — "Gallery Editorial" Design

- **Date:** 2026-08-23
- **Status:** Approved (brainstorming complete)
- **Reference:** `prototypes/v3-gallery-editorial.html` (single-file static prototype)
- **Branch:** `feat/portfolio-v3`
- **Inspiration:** haoqi.design background grid system (replicated 1:1)

## 1. Overview

Rebuild the portfolio homepage as v3, replacing the v2 "Printed Terminal" design in place. V3 is a "gallery editorial" aesthetic: printed design annual / exhibition catalog come alive — paper background, ink text, vermilion accent, editorial typography (Clash Display / Satoshi / JetBrains Mono), canvas-driven background grid, and GSAP-choreographed motion.

### Locked decisions

| Decision | Choice |
| --- | --- |
| Background grid | Full 1:1 haoqi.design replication: canvas grid + live XY readout + mouse-reactive crosshairs |
| Sections | Prototype only: Hero, Manifesto, Selected Work, Capabilities, Experience, Contact |
| Writing section | Dropped from homepage |
| Blog routes | `app/(blog)/` and `/certifications` stay untouched and working |
| Rollout | Replace v2 homepage in place on `feat/portfolio-v3`; Vercel preview for review |
| Architecture | Approach A: section components + dedicated GSAP motion layer |
| Animation stack | GSAP (+ ScrollTrigger) + React Bits; Lenis smooth scroll retained |
| Preloader | **None** — hero intro timeline plays on mount (curtain concept dropped) |
| CSS tokens | Coexist: v2 token block stays untouched (blog + certifications depend on it); v3 adds its own vars alongside |
| Global chrome | `ParticlesBackground` + `PaletteMount` removed from root layout for all routes |
| Work row links | NFC Loyalty Platform row keeps `#` placeholder |
| Mobile nav | Prototype-true: nav links hidden <900px, no hamburger (fast-follow later) |
| Metadata | `<title>`/description/OG/Twitter copy refreshed to v3 positioning; `/og-image.png` file unchanged |

## 2. Architecture & file map

```
lib/gsap.ts                  GSAP + ScrollTrigger registration (client-only),
                             Lenis↔ScrollTrigger wiring, shared eases
content/v3.ts                Typed content data: profile, work entries,
                             capability groups, experience, links, marquee words

components/v3/
  GridCanvas.tsx             1:1 haoqi grid — fixed canvas, rails/rules/crosshairs,
                             cursor reactivity, reduced-motion static fallback
  CoordinateReadout.tsx      "0983 X 0246 Y" live mouse readout (bottom-center)
  CustomCursor.tsx           dot + trailing ring, hidden on coarse pointers
  TopBar.tsx                 brand, nav, MNL clock, "Open to work" status
  Marquee.tsx                seamless -50% loop track, pauses on hover
  Hero.tsx                   dot-field canvas + masked name reveal + role/blurb/cue
  SectionHeader.tsx          shared (idx / masked title / note) for §02–06
  Manifesto.tsx              word-split statement, scroll-scrubbed opacity + colophon
  WorkList.tsx               Selected Work rows (invert-on-hover)
  Capabilities.tsx           3 cap groups + "currently studying" foot
  ExperienceList.tsx         experience rows
  Contact.tsx                giant CTA + orb, email/links, footer strip

app/page.tsx                 composes v3 sections; JSON-LD jobTitle updated to
                             "AI / Software Engineer" to match refreshed metadata
app/layout.tsx               Fontshare (Clash Display, Satoshi) + next/font JetBrains Mono
app/globals.css              v3 tokens added alongside untouched v2 tokens
```

**Server/client split:** all v3 section components are `"use client"` — they still SSR initial HTML (SEO intact); JSON-LD and metadata remain server-side in `page.tsx`/`layout.tsx`.

**Styling:** CSS Modules per component (existing repo convention) + shared tokens in `globals.css`. Prototype CSS ports nearly verbatim, split by section. Tailwind stays installed for blog routes.

**Deleted with v2:** `Hero`, `About`, `Projects`, `Writing` (homepage section), `Contact`, `ParticlesBackground`, `SectionHeader`, `palette/` (command palette — not in prototype). **Kept:** `Header` + `Footer` (+ their CSS modules) — still imported by `app/certifications/page.tsx`. `components/reactbits/` stays (reused). `DESIGN.md` rewritten for v3.

**Data:** all copy hardcoded in `content/v3.ts` — no CMS, no env vars, no API changes.

## 3. GridCanvas spec (1:1 haoqi.design)

**Layer:** one `<canvas>`, `position: fixed; inset: 0`, `z-index: -1`, `pointer-events: none`, DPR-aware (capped at 2). Content scrolls over it; grid never moves. (Haoqi's second front canvas carries their 3D scene/grain — not part of the grid, skipped.)

**Geometry (recomputed on resize):**
- Gutters: `--gutter` (clamp 20–64px) — rails align with content edges
- 12-column model; vertical hairlines drawn **only at rails 0 / 4 / 8 / 12**, full viewport height
- Horizontal rules at exactly ⅓ and ⅔ viewport height, full width
- Crosshairs (15px "+", 1px strokes) at 4 intersections: rails {0, 12} × rules {⅓, ⅔}; positions/count in a config object for later tuning

**Colors:** lines `rgba(20,20,19,0.08)` (haoqi's exact dark-theme alpha); crosses ~0.3 alpha at rest.

**Cursor reactivity (canvas-drawn, not DOM):** nearest crosshair within ~160px lerps to 1.9× scale + 90° rotation and shifts to vermilion; springs back on exit. One shared rAF loop draws grid + crosses; loop pauses on `visibilitychange`.

**CoordinateReadout:** fixed bottom-center, hidden < 1024px, JetBrains Mono, live zero-padded `NNNN X NNNN Y` viewport coords via rAF-throttled mousemove.

**Fallbacks:** `prefers-reduced-motion` → grid drawn once, static, no loop, readout hidden. Coarse pointer → no reactivity, grid still renders. Canvas code has zero dependencies (plain lerp math) — works without GSAP.

## 4. Fixed chrome

- **No preloader** (decision): the hero entrance timeline plays directly on mount (~0.15s delay). Reduced motion → content renders fully visible, no entrance animation.
- **CustomCursor:** dot tracks 1:1, ring lerps (0.16), ring expands + tints vermilion over `a, button, [data-hover]`; hidden on coarse pointers; `cursor: none` applied only while active.
- **TopBar:** brand `K.O.³`, mono nav with left-origin underline sweep (hidden <900px), live MNL clock (`Intl.DateTimeFormat`, `Asia/Manila`, 24h), pulsing "Open to work" dot.
- **Marquee:** CSS `-50%` keyframe loop, duplicated content halves from `content/v3.ts`, pauses on hover; renders as static line on reduced motion.

## 5. Sections

- **Hero:** DotField canvas (28px dot grid, repel within 150px radius, density/size boost near cursor; disabled on reduced-motion/coarse pointers), masked "KENNETH / OSORIO." reveal with outline-stroke second line, role + blurb mask reveals, breathing scroll stem; name parallax-out on scroll (scrub). Entrance timeline plays on mount — no preloader precedes it.
- **SectionHeader** (shared): `(0N)` index slide-in + masked title rise, `once: true`.
- **Manifesto:** word split preserving `.hl` vermilion phrases, opacity 0.14→1 scrubbed between viewport 78%→45%; colophon aside from `content/v3.ts`.
- **WorkList:** 4 entries from data; row hover = full ink invert + padding shift + arrow slide-in; tags as mono pills; external links `target="_blank" rel="noopener"`.
- **Capabilities:** 12-col groups (span 5 / 2 / 3) + "currently studying" foot; item hover indent + vermilion.
- **ExperienceList:** 4 rows; subtle bg tint + indent hover.
- **Contact:** two-line giant CTA with scrub parallax, pulsing vermilion orb, magnetic buttons (GSAP elastic return), email + link columns, footer strip with second clock.

## 6. Motion system

- `lib/gsap.ts` (client-only) registers ScrollTrigger once.
- Lenis wired via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`; enabled on desktop fine-pointer only (v2 convention).
- Every animated component uses `gsap.context()` scoped to its root for cleanup; entrance reveals use `once: true`; scrubs for manifesto opacity and CTA/hero parallax.
- React Bits: **SplitText** powers manifesto/hero word masks; **RotatingText** vendored for the hero role line, off by default (single flag to enable).
- No GSAP (CDN blocked, JS disabled after SSR): content fully visible, no hidden states — hidden states are applied only from JS (matches prototype's fallback behavior).

## 7. Data model (`content/v3.ts`)

```ts
profile: { name, role, blurb, location, email, status }
work:     { index, title, description, tags[], href }[]        // 4 entries
capabilities: { label, items: { code, name }[] }[]             // 3 groups
studying: { label, text }                                      // CCNA + certs
experience: { year, role, org, tag }[]                         // 4 entries
links:    { label, href }[]                                    // GitHub, LinkedIn, Instagram
marqueeWords: string[]
```

Sources: `context.md` + prototype markup. Typed with explicit interfaces; no `any`.

## 8. Accessibility & fallbacks

- `prefers-reduced-motion: reduce`: preloader skipped, all transforms off, marquee static, smooth scroll off, grid static, readout hidden, content fully visible.
- Focus states always visible (nav underline sweep + row invert double as focus styles); keyboard operability preserved — all interactive elements are real `<a>`/`<button>`.
- Contrast: ink on paper ≈ 15:1; vermilion used decoratively and for large text only.
- Custom cursor never hides the native cursor on touch devices; decorative canvases are `aria-hidden`.

## 9. Verification & rollout

1. `npm run type-check`
2. `npm run build`
3. Visual pass on `npm run dev` (localhost) after changes + Vercel preview on the branch
4. Manual checks: reduced-motion emulation, mobile viewport (<900px, <520px), keyboard nav, blog routes still render

No test framework exists in the repo; none added in this scope.

## 10. Out of scope

- Blog (`app/(blog)/`) and `/certifications` restyling
- Theme toggle (v3 is light-only, like the prototype)
- Command palette (removed with v2)
- New sections beyond the prototype (no Writing section on homepage)
