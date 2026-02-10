# Code Map

## App Routes
- `src/app/page.tsx` — Homepage (SSG)
- `src/app/layout.tsx` — Root layout (Inter font, global styles)
- `src/app/case-study/hedgehunt/page.tsx` — HedgeHunt case study (MDX, SSG)

## Homepage Sections — `src/app/(home)/_sections/`
- `Hero/` — Name, headline, proof points, resume CTA, social links
- `CaseStudies/` — Featured work (single-column, `CaseStudyCard`)
- `Clients/` — Client strip + proof numbers row + subtitle
- `Capabilities/` — Three-column capability breakdown
- `Experience/` — Work history list + resume link
- `Contact/` — CTA with email/social links

## Layout — `src/app/(home)/_components/`
- `Footer/` — Copyright + source link

## Motion — `src/ui/motion/`
- `PageTransition/` — Framer Motion fade-in on page mount (reduced-motion aware)
- `SectionReveal/` — Framer Motion scroll-triggered reveal (reduced-motion aware)

## MDX Components — `src/mdx-components/`
- `ExecutiveSummary/` — 2x2 grid: problem, constraints, architecture, results
- `DecisionCard/` — Collapsible ADR card using `<details>/<summary>`

Every folder has a barrel `index.ts`. Import from the group, not the file:
```ts
import { Hero, CaseStudies } from "@/app/(home)/_sections";
import { PageTransition, SectionReveal } from "@/ui/motion";
import { ExecutiveSummary, DecisionCard } from "@/mdx-components";
```

## Styles
- `src/styles/tokens.css` — Design tokens (colors, spacing, typography, hedgehunt accent)
- `src/styles/prose.css` — MDX/article typography
- `src/app/globals.css` — CSS reset, token imports, base styles

## Content
- `src/content/case-studies/hedgehunt.mdx` — HedgeHunt case study source (MDX + frontmatter)
- `src/lib/mdx.ts` — MDX file reader utility

## Config
- `CLAUDE.md` — Project context and key decisions
- `.claude/active/` — Code map, standards, working style
- `.claude/agents/` — Agent definitions (standards, content-reviewer)
- `tsconfig.json` — TypeScript config (`@/` alias → `src/`)
- `next.config.ts` — Next.js config
