# Code Standards

## TypeScript

- **Arrow functions only.** No `function` declarations. Exception: Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) use `export default function` as required by the framework.
- **No inline returns for components.** Always use a block body with explicit `return`.
- **Guard clauses and early returns.** Handle edge cases first, keep the happy path un-nested.
- **Named exports for components.** `export const Hero = () => { ... }`. Default exports only in Next.js route files.
- **Interfaces for props.** Named `XProps` (e.g., `SectionRevealProps`). Use `interface`, not `type`, for object shapes.
- **Self-explanatory code.** No "what" comments. Only "why" comments when the reason is truly non-obvious.
- **No impure functions in render.** `Date.now()`, `Math.random()` etc. must be at module scope, not inside component bodies. The React compiler linter enforces this.

## Naming

- Booleans: `isX`, `hasX` (e.g., `isLoading`, `hasError`)
- Arrays: plural (e.g., `companies`, `contactLinks`)
- Event handlers: `handleX` (e.g., `handleClick`, `handleCopy`)
- Props interfaces: `XProps` (e.g., `ArrowLinkProps`)
- Components: PascalCase
- CSS classes: camelCase (CSS Modules convention)

## React / Next.js

- **Server components by default.** Only add `'use client'` for browser APIs or interactivity. Client components: `SectionReveal`, `PageTransition` (motion), `Mermaid`, `SectionNav` (case-study), `Nav` (navigation), `CopyButton`, `ScrollLink` (shared).
- **Minimize client boundaries.** Extract small client islands (e.g., `CopyEmailBtn`, `CopyEmail`) that wrap shared client components, keeping parent components as server components.
- **Import order:**
  1. Next.js (`next/link`, `next/image`, etc.)
  2. Third-party (`framer-motion`, `next-mdx-remote`, etc.)
  3. Shared UI (`@/ui/shared`, `@/ui/case-study`, `@/ui/icons`, etc.)
  4. Local imports (content modules, sibling components)
  5. Styles (CSS Modules)
  6. Types

## CSS Modules

- **Co-located.** `Component.module.css` lives next to `Component.tsx`.
- **camelCase class names.** `styles.heroSection`, not `styles['hero-section']`.
- **Always use design tokens.** Colors, spacing, font sizes — reference `tokens.css` via custom properties. Raw rem values only for fine-tuned per-component tweaks outside the token scale.
- **CSS nesting for pseudo-classes and media queries.** Use native CSS nesting (`&:hover`, `&::after`, `@media`), not flat selectors. Exception: parent-driven hover (`.body:hover .child`) stays flat.
- **rgba values that derive from tokens get a comment:** `rgba(14, 14, 17, 0.88); /* --bg with opacity */`
- **Solid backgrounds for sticky/fixed elements.** Use `var(--bg)` not rgba+blur — prevents content bleed-through.

## Content / Data Separation

- **Static data lives in `content.ts` files**, not inline in components. Components are pure presentation.
- **Home sections:** `src/app/(home)/_sections/content.ts` — hedgehuntTags, companies (CompanyLogo[]), aboutMe, howIWork, contactEmail, contactLinks
- **Case studies:** `src/app/case-study/hedgehunt/content.ts` — hedgehuntMeta, hedgehuntSections (with exported typed interfaces)
- **Theme tokens for JS:** `src/data/theme.ts` — used by Mermaid and any future JS-side color usage

## Shared Components

- **ArrowLink** — for any "text →" link pattern. Internal links use `<Link>`, external use `<a>`. Arrow is always a `<span>` for gap animation.
- **ExternalLink** — for any `target="_blank"` link. No styling, inherits from consumer.
- **SectionShell** — for any section with the max-width + padding pattern. Pass `className` for padding overrides. No border-top.
- **SectionLabel** — rendered automatically by SectionShell when `label` prop is provided. Left-aligned with trailing line.
- **CopyButton** — for any copy-to-clipboard action. Handles clipboard API, icon swap (copy→check in green), "Copied!" toast animation.
- **ScrollLink** — for hash navigation. Uses `scrollIntoView` on same page, navigates to `/{href}` on other pages.

## File Organization

- **Barrel exports at every folder level.** Each component folder has an `index.ts`. Each group folder has an `index.ts`.
- **Import from the barrel, not the file.** `import { ArrowLink } from "@/ui/shared"` — never `import { ArrowLink } from "@/ui/shared/ArrowLink/ArrowLink"`.
- **Private sub-components are not exported.** `CaseStudyCard`, `WindowChrome`, `CopyEmail`, `CopyEmailBtn` are used only by their parent sections — not in any barrel.

## Component Structure

Each component lives in its own folder:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css  (if styled)
└── index.ts                  (barrel: re-exports from ComponentName.tsx)
```
