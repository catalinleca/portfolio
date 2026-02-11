# Code Map

## App Routes
- `src/app/(home)/page.tsx` — Homepage (SSG), imports all sections
- `src/app/layout.tsx` — Root layout (DM Sans + DM Serif Display + JetBrains Mono, Nav, global styles)
- `src/app/case-study/hedgehunt/page.tsx` — HedgeHunt case study (MDX via next-mdx-remote, SSG)

## Homepage Sections — `src/app/(home)/_sections/`
- `Hero/` — Headline, proof points, resume/social buttons (ExternalLink), stat cards
- `TechStrip/` — Scrolling marquee of tech stack items
- `CaseStudies/` — Featured work section (SectionShell + CaseStudyCard + WindowChrome)
- `Capabilities/` — Three capability rows (SectionShell, 2-col grid)
- `Experience/` — Work history list + ArrowLink to resume (SectionShell)
- `Contact/` — CTA with ArrowLinks to email/social (SectionShell)
- `content.ts` — All static data for home sections (heroStats, techStack, hedgehuntTags, capabilities, experience, contactLinks)

## Case Study Content — `src/app/case-study/hedgehunt/`
- `page.tsx` — MDX compilation + rendering, imports from `@/ui/case-study`
- `content.ts` — `hedgehuntMeta` + `hedgehuntSections` (typed interfaces: CaseStudySection, CaseStudyMeta)
- `page.module.css` — Layout styles

## Shared UI — `src/ui/shared/`
- `SectionLabel/` — Mono-font label with `#` prefix and trailing line
- `ArrowLink/` — `<Link>` or `<a>` with animated arrow span (gap animation on hover). Used by CaseStudyCard, Experience, Contact
- `ExternalLink/` — Thin `<a>` wrapper with `target="_blank" rel="noopener noreferrer"`. Used by Hero, Nav
- `SectionShell/` — Shared section layout (max-width, padding, border, responsive gutter, optional SectionLabel). Used by CaseStudies, Capabilities, Experience, Contact

## Case Study UI — `src/ui/case-study/`
- `ExecutiveSummary/` — 2×2 grid (problem, constraints, architecture, results)
- `DecisionCard/` — Collapsible ADR card using `<details>/<summary>`
- `Mermaid/` — Client-side Mermaid diagram renderer (imports theme from `@/data/theme`)
- `SectionNav/` — Sticky nav with IntersectionObserver-based active tracking

## Navigation — `src/ui/navigation/`
- `Nav/` — Fixed top nav. Hash links use `<Link href="/#section">`. Resume uses `<ExternalLink>`

## Layout — `src/ui/layout/`
- `Footer/` — Copyright + "Built with" line

## Motion — `src/ui/motion/`
- `PageTransition/` — Framer Motion fade-in on page mount (reduced-motion aware)
- `SectionReveal/` — Framer Motion scroll-triggered reveal using `<motion.div>` (reduced-motion aware)

## Data — `src/data/`
- `theme.ts` — JS-accessible design token values (must stay in sync with tokens.css)

## Styles
- `src/styles/tokens.css` — Design tokens (colors, spacing, typography, layout, transitions, shadows, radius)
- `src/styles/prose.css` — MDX/article typography (nested selectors for headings, code, blockquote, table)
- `src/styles/globals.css` — CSS reset, token import, base body styles, selection color

## Content
- `src/content/case-studies/hedgehunt.mdx` — HedgeHunt case study (MDX with ExecutiveSummary, DecisionCard, Mermaid components)
- `src/lib/mdx.ts` — `getCaseStudySource(slug)` — reads MDX file from disk

## Import Conventions
Every folder has a barrel `index.ts`. Import from the group:
```ts
import { Hero, CaseStudies } from "@/app/(home)/_sections";
import { PageTransition, SectionReveal } from "@/ui/motion";
import { SectionShell, ArrowLink, ExternalLink } from "@/ui/shared";
import { ExecutiveSummary, DecisionCard, Mermaid, SectionNav } from "@/ui/case-study";
```
Content modules imported with relative paths:
```ts
import { heroStats, techStack } from "../content";        // home sections
import { hedgehuntMeta, hedgehuntSections } from "./content"; // case study page
```

## Config
- `CLAUDE.md` — Project context and key decisions
- `.claude/active/` — Code map (this file), standards, working style
- `.claude/agents/` — Agent definitions (standards, content-reviewer)
- `tsconfig.json` — TypeScript config (`@/` alias → `src/`)
- `next.config.ts` — Next.js config
