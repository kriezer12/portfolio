# Copilot Instructions - Portfolio (Next.js/React + TypeScript)

## Project Context
Personal portfolio website built with **Next.js 14+** and **TypeScript**. Uses the Stitch MCP server for UI design generation.

## Tech Stack
- **Framework**: Next.js (App Router preferred)
- **Language**: TypeScript
- **Styling**: CSS Modules, Tailwind CSS (if added), or standard CSS
- **MCP Servers**: Stitch (UI design generation)

## Build & Development Commands

### Setup
```bash
npm install
# or
yarn install
```

### Development Server
```bash
npm run dev
# Starts on http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
# or if not available:
npx tsc --noEmit
```

### Linting (when added)
```bash
npm run lint
# or
npx eslint .
```

## Project Structure (Conventional)

Once initialized, follow Next.js App Router conventions:
- `/app` - Route segments and layouts
- `/app/page.tsx` - Home page
- `/components` - Reusable React components
- `/public` - Static assets
- `next.config.ts` - Next.js configuration

## Key Conventions

### Component Organization
- Components are functional components with TypeScript interfaces
- Props interfaces are defined at the top of component files or in separate `types/` directory for shared types
- Component names use PascalCase

### TypeScript Standards
- Avoid `any` type - use proper typing
- Export types alongside implementations: `export type Props = { ... }; export default function Component(props: Props) { ... }`
- Use discriminated unions for complex state patterns

### File Naming
- React components: PascalCase (e.g., `Hero.tsx`, `ProjectCard.tsx`)
- Utilities & helpers: camelCase (e.g., `formatDate.ts`, `calculateLayout.ts`)
- Styles: Match component name with `.module.css` extension (e.g., `Hero.module.css`)

### Environment Variables
- Create `.env.local` for local development (not committed)
- Define type-safe env vars in a dedicated file if needed: `src/env.ts` or `config/env.ts`

## Design & UI Generation

The Stitch MCP integration allows generating UI screens. When creating designs:
- Generate screens for key pages (home, projects, about, contact)
- Export Stitch designs to component code when applicable
- Keep component logic separate from generated UI markup

## Routing & Navigation

- Use Next.js Link component for internal navigation
- Route organization: `/projects`, `/about`, `/contact`, etc.
- Dynamic routes for project details: `/projects/[slug]`

## Common Patterns

### Data Fetching
- Server Components for static/server-side data
- Client Components for interactive features
- Use `fetch()` with proper error handling in Server Components

### Styling Approach
- Start with CSS Modules for component-scoped styles
- Consider Tailwind if heavy styling work emerges
- Keep global styles minimal

## Performance Considerations
- Use Next.js Image component for portfolio images
- Lazy load project galleries
- Optimize font loading (system fonts or next/font)
- Check Core Web Vitals regularly during development

## Git Workflow
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Commit messages follow conventional commits
- PR titles are descriptive and reference related issues

## When Working on Changes
1. Start the dev server: `npm run dev`
2. Make code changes in TypeScript with proper types
3. Test in browser to verify visual changes
4. Run type checking before committing: `npm run type-check`
5. Commit with conventional commit format
