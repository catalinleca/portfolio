# Code Map

## App Routes
- `src/app/(home)/page.tsx` — Homepage (SSG), imports all sections
- `src/app/layout.tsx` — Root layout (DM Sans + DM Serif Display + JetBrains Mono, Nav, global styles)
- `src/app/case-study/hedgehunt/page.tsx` — HedgeHunt case study (MDX via next-mdx-remote, SSG)

## Homepage Sections — `src/app/(home)/_sections/`
Order: Hero → Capabilities → Experience → CaseStudies → HowIWork → Contact

- `Hero/` — Headline, eyebrow, CTAs (case study + resume + social), photo placeholder. 2-col grid layout
- `Capabilities/` — "What I'm usually trusted with" heading + 5 accent-dot bullet items (SectionShell)
- `Experience/` — Inline logo-strip entries: logo placeholder + role · company · period (SectionShell)
- `CaseStudies/` — Featured work section (SectionShell + CaseStudyCard + WindowChrome)
- `HowIWork/` — "Operating principles" heading + 4 accent-dot bullet items (SectionShell)
- `Contact/` — CTA with ArrowLinks to email/social (SectionShell)
- `content.ts` — All static data for home sections (hedgehuntTags, capabilities, ExperienceEntry interface, experience, howIWork, contactLinks)

## Case Study Content — `src/app/case-study/hedgehunt/`
- `page.tsx` — MDX compilation + rendering, imports from `@/ui/case-study`
- `content.ts` — `hedgehuntMeta` + `hedgehuntSections` (typed interfaces: CaseStudySection, CaseStudyMeta)
- `page.module.css` — Layout styles

## Shared UI — `src/ui/shared/`
- `SectionLabel/` — Mono-font label with `#` prefix and trailing line
- `ArrowLink/` — `<Link>` or `<a>` with animated arrow span (gap animation on hover). Used by CaseStudyCard, Contact
- `ExternalLink/` — Thin `<a>` wrapper with `target="_blank" rel="noopener noreferrer"`. Used by Hero, Nav
- `SectionShell/` — Shared section layout (max-width, padding, border, responsive gutter, optional SectionLabel). Used by CaseStudies, Capabilities, Experience, HowIWork, Contact

## Case Study UI — `src/ui/case-study/`
- `ExecutiveSummary/` — 2×2 grid (problem, constraints, architecture, results)
- `DecisionCard/` — Collapsible ADR card using `<details>/<summary>`
- `Mermaid/` — Client-side Mermaid diagram renderer (imports theme from `@/data/theme`)
- `SectionNav/` — Sticky nav with IntersectionObserver-based active tracking

## Navigation — `src/ui/navigation/`
- `Nav/` — Fixed top nav. Hash links: about, experience, work. Resume uses `<ExternalLink>`

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
import { Hero, CaseStudies, HowIWork } from "@/app/(home)/_sections";
import { PageTransition, SectionReveal } from "@/ui/motion";
import { SectionShell, ArrowLink, ExternalLink } from "@/ui/shared";
import { ExecutiveSummary, DecisionCard, Mermaid, SectionNav } from "@/ui/case-study";
```
Content modules imported with relative paths:
```ts
import { capabilities, howIWork } from "../content";        // home sections
import { hedgehuntMeta, hedgehuntSections } from "./content"; // case study page
```

## Config
- `CLAUDE.md` — Project context and key decisions
- `.claude/active/` — Code map (this file), standards, working style
- `.claude/agents/` — Agent definitions (standards, content-reviewer)
- `tsconfig.json` — TypeScript config (`@/` alias → `src/`)
- `next.config.ts` — Next.js config
