# Code Standards

## TypeScript

- **Arrow functions only.** No `function` declarations. Exception: Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) use `export default function` as required by the framework.
- **No inline returns for components.** Always use a block body with explicit `return`.
- **Guard clauses and early returns.** Handle edge cases first, keep the happy path un-nested.
- **Named exports for components.** `export const Hero = () => { ... }`. Default exports only in Next.js route files.
- **Interfaces for props.** Named `XProps` (e.g., `SectionRevealProps`). Use `interface`, not `type`, for object shapes.
- **Self-explanatory code.** No "what" comments. Only "why" comments when the reason is truly non-obvious.

## Naming

- Booleans: `isX`, `hasX` (e.g., `isLoading`, `hasError`)
- Arrays: plural (e.g., `clients`, `capabilities`)
- Event handlers: `handleX` (e.g., `handleClick`, `handleSubmit`)
- Props interfaces: `XProps` (e.g., `CaseStudyCardProps`)
- Components: PascalCase
- CSS classes: camelCase (CSS Modules convention)

## React / Next.js

- **Server components by default.** Only add `'use client'` for Framer Motion or browser APIs. All `'use client'` components live in `src/components/motion/`.
- **Import order:**
  1. Next.js (`next/link`, `next/image`, etc.)
  2. Third-party (`framer-motion`, `next-mdx-remote`, etc.)
  3. Local components (from barrel exports)
  4. Styles (CSS Modules)
  5. Types

## CSS Modules

- **Co-located.** `Component.module.css` lives next to `Component.tsx`.
- **camelCase class names.** `styles.heroSection`, not `styles['hero-section']`.
- **Always use design tokens.** Colors, spacing, font sizes — reference `tokens.css` via custom properties. Never hardcode values.
- **CSS nesting for pseudo-classes and media queries.** Use native CSS nesting (`&:hover`, `@media`), not flat selectors.

## File Organization

- **Barrel exports at every folder level.** Each component folder has an `index.ts`. Each group folder (`home/`, `layout/`, `motion/`) has an `index.ts`.
- **Import from the barrel, not the file.** `import { Hero } from "@/components/home"` — never `import { Hero } from "@/components/home/Hero/Hero"`.
- **Private sub-components are not exported.** `CaseStudyCard` is used only by `CaseStudies` — it's not in the barrel.

## Component Structure

Each component lives in its own folder:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css  (if styled)
└── index.ts                  (barrel: re-exports from ComponentName.tsx)
```
