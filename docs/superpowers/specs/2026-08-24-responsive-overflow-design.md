# Responsive Overflow Design

## Goal

Remove unintended horizontal scrolling across every public route while preserving the existing visual design and keeping intentionally wide code samples scrollable within their own containers.

## Scope

- Homepage (`/`)
- Blog index (`/blog`)
- Individual blog posts (`/blog/[slug]`)
- Certifications (`/certifications`)

## Design

Use a layered fix:

1. Add a shared horizontal containment rule at the document/root level so transformed or decorative elements cannot widen the page viewport.
2. Add route/component-level constraints (`min-width: 0`, `max-width: 100%`, and responsive grid changes) where flex/grid children or display typography can overflow their parent.
3. Keep blog `<pre>` blocks horizontally scrollable locally, rather than clipping their code content or expanding the document.
4. At small widths, stack or resize header, hero, contact, certification, and blog controls so text remains readable and interactive controls remain reachable.

## Verification

At representative desktop and mobile widths, verify that each route's document width equals the viewport width and that no visible component extends beyond the viewport. Also verify that blog code blocks retain internal horizontal scrolling and that the TypeScript build passes.
