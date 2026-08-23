# DESIGN.md — Portfolio v3: "Gallery Editorial"

Design system for kennethosorio.dev v3. One idea: the portfolio as a printed design annual / exhibition catalog come alive — paper, ink, and one vermilion accent, choreographed by GSAP.

Spec & implementation detail: `docs/superpowers/specs/2026-08-23-portfolio-v3-gallery-editorial-design.md` (prototype: `prototypes/v3-gallery-editorial.html`).

## Identity

- **Aesthetic:** Gallery Editorial. Editorial typography on a paper field, a live drafting-grid canvas behind the content, index numbers and hairline rules as structure.
- **Emotional target:** quiet gallery confidence. The grid frames the work; type and whitespace do the talking.
- **Absolute rules:** no shadows, no gradients, no border-radius. Accent color is spent, not splashed — vermilion appears only decoratively or at large sizes.

## Tokens (CSS variables on `.v3-root` in `globals.css`)

Light-only. V3 is a light theme; the v2 dark token block coexists untouched above it (blog + `/certifications` still depend on it).

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F2EFE9` | Canvas |
| `--ink` | `#141413` | Text, inverted fills |
| `--vermilion` | `#FF4D00` | The single accent |
| `--rule` | `rgba(20,20,19,0.12)` | Hairline rules, grid lines |
| `--rule-strong` | `rgba(20,20,19,0.28)` | Emphasized rules, crosshairs |
| `--font-display` / `--font-body` | Clash Display / Satoshi (Fontshare) | Headings / body |
| `--font-mono` | JetBrains Mono (`next/font`) | Labels, nav, readouts, tags |
| `--ease` | `cubic-bezier(0.76, 0, 0.24, 1)` | Shared motion curve |

Spacing: `--gutter` is fluid — `clamp(20px, 4vw, 64px)` — and rails align to it.

## Typography

Three voices, strictly separated:

- **Display** (Clash Display): hero name `clamp` large with tight leading; second line may render as outline stroke (`webkit-text-stroke`) against filled first line.
- **Body** (Satoshi): paragraphs, blurbs, descriptions.
- **Mono** (JetBrains Mono): uppercase micro-labels, section indexes `(01)`–`(06)`, nav, tags-as-pills, coordinate readout, clocks.

Hierarchy comes from size, weight, and mask reveals — never from color tricks beyond the accent.

## Layout

- Fixed background canvas (`GridCanvas`, `position: fixed; z-index: -1`) draws a 12-column drafting grid: vertical hairlines only at rails 0/4/8/12, horizontal rules at ⅓ and ⅔ viewport height, crosshairs at their intersections. Content scrolls over it; the grid never moves.
- Nearest crosshair reacts to the cursor (scales, rotates 90°, tints vermilion); a mono coordinate readout sits bottom-center ≥1024px.
- Sections stack full-width with generous vertical rhythm, each opened by a shared `SectionHeader`: index + masked title + note.
- Asymmetric column splits inside sections (Capabilities spans 5/2/3); equal card grids are not used.

## Components

- **Fixed chrome:** `TopBar` (brand `K.O.³`, mono nav with left-origin underline sweep, live Manila clock, pulsing "Open to work" dot), `Marquee` (seamless −50% loop, pauses on hover), `CustomCursor` (dot + trailing ring that expands and tints vermilion over interactives).
- **Rows:** WorkList and ExperienceList rows are hairline-separated ledgers. Hover/focus = full ink invert with padding shift + arrow slide-in (work) or subtle tint + indent (experience). Invert doubles as the focus style.
- **Contact:** giant two-line CTA with scrub parallax, pulsing vermilion orb, magnetic buttons with elastic return.
- All copy lives in `content/v3.ts` — components stay presentational.

## Motion

GSAP + ScrollTrigger via `lib/gsap.ts` (client-only registration, Lenis wired into the ticker). Lenis runs on desktop fine-pointers only.

- Entrances are masked rise/reveal, fire once (`once: true`). No preloader — the hero timeline plays on mount.
- Scrubs: manifesto word opacity (0.14 → 1) between viewport 78% → 45%; hero name and CTA parallax out on scroll.
- Every animated component scopes its animation in `gsap.context()` for cleanup.
- React Bits vendored in `components/reactbits/`: SplitText (word masks), RotatingText (hero role line, off by default).

## Accessibility & fallbacks

- `prefers-reduced-motion: reduce`: all transforms off, marquee static, smooth scroll off, grid drawn once and static, readout and custom cursor disabled, content fully visible.
- No-JS safety: hidden states are applied only from JS — SSR HTML renders complete and visible.
- Ink-on-paper contrast ≈ 15:1; vermilion reserved for decoration and large text only.
- Focus states always visible (underline sweep + row invert double as focus styles); all interactives are real `<a>`/`<button>` elements.
- Decorative canvases (`GridCanvas`, `DotField`, cursor, readout) are `aria-hidden`; native cursor is never hidden on touch devices.
