# Code Map

## App Routes
- `src/app/page.tsx` — Homepage (SSG)
- `src/app/layout.tsx` — Root layout (Inter font, global styles)
- `src/app/case-study/hedgehunt/page.tsx` — HedgeHunt case study (MDX, SSG)

## Components

### `src/components/home/` — Homepage sections
- `Hero/` — Name, headline, proof points, social links
- `CaseStudies/` — Featured work grid (contains private `CaseStudyCard`)
- `Clients/` — Client logo strip
- `Capabilities/` — Three-column capability breakdown
- `Experience/` — Work history list
- `Contact/` — CTA with email/social links

### `src/components/layout/` — App-wide structural pieces
- `Footer/` — Copyright + source link

### `src/components/motion/` — `'use client'` animation wrappers
- `PageTransition/` — Framer Motion fade-in on page mount
- `SectionReveal/` — Framer Motion scroll-triggered reveal

Every folder has a barrel `index.ts`. Import from the group, not the file:
```ts
import { Hero, CaseStudies } from "@/components/home";
import { Footer } from "@/components/layout";
import { PageTransition, SectionReveal } from "@/components/motion";
```

## Styles
- `src/styles/tokens.css` — Design tokens (colors, spacing, typography)
- `src/styles/prose.css` — MDX/article typography
- `src/app/globals.css` — CSS reset, token imports, base styles

## Content
- `src/content/case-studies/hedgehunt.mdx` — HedgeHunt case study source
- `src/lib/mdx.ts` — MDX file reader utility

## Config
- `CLAUDE.md` — Project context and key decisions
- `.claude/active/` — Code map, standards, working style
- `.claude/agents/` — Agent definitions (standards, content-reviewer)
- `tsconfig.json` — TypeScript config (`@/` alias → `src/`)
- `next.config.ts` — Next.js config
