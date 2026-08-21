# Portfolio v2 — "Printed Terminal" Design Spec

**Date:** 2026-08-22
**Branch:** `feat/portfolio-v2`
**Status:** Approved design, pending implementation plan

## 1. Motivation

Rebuild the portfolio site with a drastically different layout and aesthetic, targeting Awwwards-level craft while staying intuitive and recruiter-scannable. v1's terminal identity (JetBrains Mono, phosphor green on near-black, flat surfaces) is retained as brand DNA; its execution is rebuilt around an editorial-brutalist backbone.

## 2. Goals & Non-Goals

**Goals**

- Memorable first impression within seconds of load
- Projects/experience scannable in under 30 seconds (primary audience: recruiters and technical hiring managers; secondary: fellow developers)
- One uncompromising visual identity (dark-only)
- Real motion craft without sacrificing Core Web Vitals

**Non-Goals**

- Light theme support
- Preloader/boot-sequence intros
- Global WebGL backgrounds
- Content rewrites (existing copy, projects, posts, certifications carry over)
- Any backend contact form (see D15)

## 3. Decisions Log (from grilling session)

| # | Decision | Choice |
|---|----------|--------|
| D1 | DESIGN.md conventions | Keep full DNA: mono type, green/dark palette, flat & sharp |
| D2 | Scope | Structural overhaul: layout, navigation, transitions; features kept but restyled |
| D3 | Motion stack | Add `motion` + `lenis` + ReactBits (vendored); Three.js dropped |
| D4 | Audience | Recruiters first, devs second; <30s scan |
| D5 | Aesthetic direction | Editorial Brutalism backbone + ⌘K command palette (from Terminal OS option) |
| D6 | Performance model | Tiered: full effects desktop, reduced mobile, `prefers-reduced-motion` honored |
| D7 | Page architecture | Hybrid: one-pager core + `/blog`; `/tech-stack` folded into About; `/certifications` stays a route |
| D8 | Global Three.js background | Removed entirely |
| D9 | ChatBot | Removed (widget, `/api/chat`, Gemini SDK) |
| D10 | Preloader | None; instant render + staggered entrances |
| D11 | Theme | Dark-only; remove `ThemeToggle` and `next-themes` |
| D12 | Latest-writing strip | Added to home near Contact |
| D13 | Project presentation | Full-width index rows expanding into detail modal |
| D14 | Hero treatment | V1 staggered split reveal + V2 outline/fill type mix |
| D15 | Contact email sending | Removed entirely — open send endpoints are spam/abuse vectors (and Resend billing risk); contact becomes link-only |

## 4. Art Direction

- **Canvas:** near-black surface family (`#101411` base; container tones derived from DESIGN.md v1 scale)
- **Accent:** phosphor green `#88d7aa`, used sparingly: interactive states, indices, cursor blocks
- **Type:** JetBrains Mono exclusively (via `next/font`), hierarchy through size/weight only
- **Structure:** hairline `1px` rules as the only separators; index numbers (`01–06`) prefix every section; asymmetric editorial grid; left-aligned
- **Depth:** none — no shadows, gradients, or border-radius anywhere
- **Selection/hover state:** solid green fill with inverted dark text (carried from DESIGN.md)
- DESIGN.md is rewritten to v2 during implementation to reflect this system

## 5. Architecture & Navigation

### Routes

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Rebuilt | Narrative core (see §6) |
| `/blog` + post routes | Restyled | Existing markdown pipeline (`lib/blog.ts`) unchanged |
| `/certifications` | Restyled | Stays a standalone route |
| `/projects` | Retired | Content lives in home index rows + modal |
| `/tech-stack` | Retired | Folds into About section |

### Header

Fixed slim top bar: `KO.` wordmark · indexed mono nav labels (01 About … 06 Contact) · ⌘K hint. Mobile: full-screen overlay menu with oversized type entries.

### ⌘K Command Palette

Lazy-loaded. Fuzzy jump to home sections and blog posts, plus actions: copy email, download CV, open GitHub / LinkedIn / Calendly. Distinct from any conversational UI (ChatBot is removed).

## 6. Home Narrative (top to bottom)

1. **Hero** — "KENNETH OSORIO" in staggered split-letter reveal (ReactBits SplitText); rotating role badge AI/SWE → DEVOPS → CLOUD with blinking block cursor; meta line (Cavite PH, coordinates); scroll cue
2. **Marquee strip** — infinite discipline ticker between hairline rules (CSS animation)
3. **About** — asymmetric two-column: bio text + tech-stack index with block-bar meters (`████████░░`)
4. **Experience** — ledger rows: year / role / org / one-liner
5. **Projects** — full-width index rows (`01 GITDIGEST ——→`); click opens detail modal: summary, stack tags, links, screenshots; focus-trapped, Esc-closable
6. **Latest writing** — 3 most recent posts as compact index row linking to `/blog`
7. **Contact** — oversized `> let's build something_`; email copy-on-click; Calendly + social links. No form, no send endpoint (D15)
8. **Footer** — minimal: live PH clock, social repeat, back-to-top

## 7. Motion System

- `motion` (framer-motion successor): staggered mount entrances, scroll-triggered reveals (`whileInView`)
- `lenis`: smooth scrolling, desktop pointer only
- CSS keyframes: marquee, cursor blink
- ReactBits vendored into `components/reactbits/`: SplitText, RotatingText, GlareHover (project/contact rows)
- Hover language: row invert (green fill, inverted text) per art direction
- `prefers-reduced-motion: reduce`: disables transforms, marquee becomes static line, lenis off, content renders fully visible

## 8. Performance & Accessibility Budget

- Targets: mobile LCP < 2.5s, CLS < 0.1
- JS budget aided by removals: `three` (~600KB), `@google/generative-ai`, `next-themes`, `@hcaptcha/react-hcaptcha`
- Additions: `motion`, `lenis` (palette lazy-loaded so its cost is deferred)
- Fonts: existing `next/font` JetBrains Mono subset
- Images: `next/image` throughout; project screenshots sized to layout
- Keyboard: full nav including palette (arrow/enter/Esc) and modal focus trap
- Contrast: `#88d7aa` on `#101411` ≈ 10:1 (AA+)

## 9. Removals & Additions

**Removed:** `components/Background3D.tsx`, `components/ChatBot.tsx` (+ module css), `app/api/chat/`, `app/api/contact/` (D15 — removes the abuse-prone public send endpoint), `components/ThemeToggle.tsx`, contact form UI from `Contact.tsx`, `three` + `@types/three` deps, `@google/generative-ai` dep, `next-themes` dep, `resend` dep, `@hcaptcha/react-hcaptcha` dep, `/projects` and `/tech-stack` route folders.

**Untouched:** `app/api/og`, blog pipeline, `middleware.ts`, deployment files.

## 10. Verification Plan

- `npm run type-check` and `npm run build` clean
- Lighthouse (mobile): perf ≥ 90 target, LCP/CLS within §8 budget
- Manual passes: keyboard-only navigation, `prefers-reduced-motion` emulation, mobile viewport sweep (375px–1440px)
- Visual check against DESIGN.md v2 rules (no radius/shadows/gradients)

## 11. Risks

- Marquee + smooth scroll can cause jank on low-end mobile → mitigated by tiered motion (D6)
- Modal content growth could bloat home bundle → modal code-split, screenshots lazy
- ReactBits components are copy-vendored: track provenance in file headers for future updates
