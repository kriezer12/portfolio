# DESIGN.md — Portfolio v2: "Printed Terminal"

Design system for kennethosorio.dev v2. One idea: the portfolio as a beautifully typeset terminal transcript — editorial brutalism carrying terminal DNA.

## Identity

- **Aesthetic:** Editorial Brutalism. Massive monospace typography, hairline rules, index numbers, asymmetric grid.
- **Emotional target:** calm authority. The type does the talking; everything else recedes.
- **Absolute rules:** no shadows, no gradients, no border-radius, no centered text blocks. Depth is conveyed only through indentation, tonal contrast, and hairlines.

## Tokens (CSS variables in `globals.css`)

Dark-only. There is no light theme.

| Token | Value | Role |
| --- | --- | --- |
| `--background` / `--surface` | `#101411` | Canvas |
| `--surface-container-lowest` | `#0b0f0c` | Wells, code blocks |
| `--surface-container` | `#1c211d` | Raised areas |
| `--surface-container-high` | `#272b28` | Hover fills |
| `--on-surface` | `#e0e3de` | Primary text |
| `--on-surface-variant` | `#bfc9c0` | Secondary text |
| `--outline` | `#89938b` | Metadata, muted labels |
| `--outline-variant` | `#3f4942` | Hairline rules |
| `--primary` | `#88d7aa` | Phosphor green accent |
| `--on-primary` | `#003822` | Text on accent fills |

Spacing scale: `--unit` 4px · `--gutter` 16px · `--margin` 24px · `--section-gap` 48px.

## Typography

JetBrains Mono exclusively (`next/font`, variable `--font-jetbrains-mono`). Hierarchy through size and weight only — never color or style tricks beyond the accent.

- Display (hero name): clamp ~56–96px, weight 700, tracking -0.03em
- H2 section titles: 20–28px, weight 700, prefixed with an index number (`01`, `02`, …) in `--primary`
- Body: 14px/22px, weight 400
- Labels/metadata: 11–12px uppercase, letter-spacing 0.15em, `--outline`

Outline/fill mix: section headings and select display lines may pair outlined stroke text with filled text (webkit-text-stroke in `--on-surface`) for depth without shadows.

## Layout

- Fixed-column editorial grid, left-aligned; max-width via `main`
- Hairline `1px solid var(--outline-variant)` rules are the only separators (`--rule`)
- Every home section carries a two-digit index prefix
- Asymmetric two-column splits allowed; equal-width card grids are not

## Components

### Buttons & interactive rows
Transparent background, 1px border in `--primary`, mono label. Hover/focus = solid `--primary` fill with `--on-primary` text (the invert rule). Rows use the same invert state plus GlareHover-style sheen where vendored.

### Skill meters
Block characters: `████████░░` — filled blocks in `--primary`, unfilled in `--outline-variant`.

### Inputs / prompts
Prompt character (`>`) + blinking block cursor (`▍`) in `--primary`. No fill; bottom or full 1px border only.

### Lists
Dashes or index numbers, never bullet dots.

## Motion

- Entrances: staggered rise/fade once on mount (motion). No preloader, ever.
- Scroll reveals fire once (`whileInView`, no re-hide).
- Marquees loop seamlessly; pause on hover.
- Smooth scrolling via lenis, desktop pointer devices only.
- `prefers-reduced-motion: reduce`: all transforms off, marquee renders as static line, smooth scroll disabled, content fully visible.

## Accessibility budget

Green-on-black contrast ≈ 10:1. Focus states always visible (invert rule doubles as focus style). Full keyboard operability incl. overlays/modals with focus traps.
