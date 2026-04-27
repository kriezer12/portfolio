---
name: Terminal Minimalist
colors:
  surface: '#101411'
  surface-dim: '#101411'
  surface-bright: '#363a37'
  surface-container-lowest: '#0b0f0c'
  surface-container-low: '#181d19'
  surface-container: '#1c211d'
  surface-container-high: '#272b28'
  surface-container-highest: '#313632'
  on-surface: '#e0e3de'
  on-surface-variant: '#bfc9c0'
  inverse-surface: '#e0e3de'
  inverse-on-surface: '#2d312e'
  outline: '#89938b'
  outline-variant: '#3f4942'
  surface-tint: '#88d7aa'
  primary: '#88d7aa'
  on-primary: '#003822'
  primary-container: '#52a077'
  on-primary-container: '#00311d'
  inverse-primary: '#166b47'
  secondary: '#c7c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a3f4c5'
  primary-fixed-dim: '#88d7aa'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005233'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#101411'
  on-background: '#e0e3de'
  surface-variant: '#313632'
typography:
  h1:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  section-gap: 48px
---

## Brand & Style

This design system is rooted in the functional precision of command-line interfaces and the focused environment of code editors. It targets a technical audience that prizes information density and clarity over decorative flourishes. The aesthetic movement is a synthesis of **Minimalism** and **Brutalism**, stripped of all skeuomorphic depth, shadows, and gradients.

The emotional response should be one of "calm efficiency." By removing visual noise, the UI recedes into the background, allowing the content—primarily text and data—to command total attention. It celebrates the beauty of the monospace character and the structural integrity of the grid.

## Colors

The palette is strictly dark-mode, centered on an absolute near-black background to minimize eye strain and maximize contrast. 

- **Primary Accent:** A muted "Phosphor Green" used sparingly for interactive elements, success states, and primary call-to-actions.
- **Text Hierarchy:** High-contrast white for primary headers, a medium-gray for body text, and a deep-gray for metadata and deactivated states.
- **Structural Color:** A very low-contrast gray is used for thin dividers and borders, ensuring they define space without creating visual clutter.

## Typography

This design system exclusively utilizes **JetBrains Mono**. The typeface is selected for its exceptional legibility and its ability to maintain a consistent vertical rhythm. 

Hierarchy is established through size and weight rather than color or stylistic changes. Headings should be kept relatively small to maintain the terminal feel; use uppercase sparingly for labels and tags to create variety without breaking the monospace grid. All text must align to a consistent baseline to preserve the "printed code" aesthetic.

## Layout & Spacing

The layout philosophy follows a **fixed-column grid** that mimics the character-width constraints of a terminal. Every element, from text blocks to dividers, must align to a 4px base unit. 

Instead of containment boxes, use generous whitespace and thin 1px horizontal lines to separate content sections. Information density should be high, but layout "breathing room" is managed through strict vertical margins. Align all text to the left; avoid centered layouts which break the logical flow of a terminal-inspired interface.

## Elevation & Depth

This design system is **entirely flat**. There is no Z-axis depth represented by shadows or blurs. 

Hierarchy is conveyed through:
1.  **Indentation:** Nested content should be shifted to the right, much like code blocks.
2.  **Tonal contrast:** Active or focused elements may use the primary green accent, while background or secondary information uses muted grays.
3.  **Dividers:** 1px solid lines (`#333333`) are the only method for separating distinct functional areas. 
4.  **Selection states:** Use a solid background fill (the primary green) with inverted text to show focus or selection.

## Shapes

The shape language is **strictly rectangular**. There are no rounded corners in this design system. Every button, input field, and selection state must have sharp, 90-degree angles to maintain the blocky, digital character of a terminal window. This sharpness reinforces the precision of the brand.

## Components

### Buttons
Buttons are defined by a 1px solid border of the primary color with text inside. On hover, the button should invert: the background fills with the primary color and the text changes to the background color (`#0a0a0a`).

### Skill Bars & Progress
Use block characters to represent values. For example, a skill bar should be a string of characters: `████████░░░░` (80%). The "filled" portion uses the primary green, and the "unfilled" portion uses a muted gray.

### Input Fields
Inputs are simple text lines preceded by a prompt character (e.g., `> _`). Use a blinking 1px wide rectangle as the cursor for active states. No background fill for inputs; use only a bottom border or a full 1px border.

### Checkboxes & Radios
Represent these using ASCII-style indicators. 
- Unchecked: `[ ]`
- Checked: `[x]` (using the primary green for the 'x').
- Radio: `( )` and `(*)`

### Lists
Lists should not use bullet points. Use dashes `-` or numbers followed by a period `1.` for a cleaner, more typewriter-like appearance.

### Dividers
Vertical and horizontal dividers must be 1px solid `#333333`. Never use shadows or gradients to create separation.