# Code Map

## App Routes
- `src/app/(home)/page.tsx` — Homepage (SSG), imports all sections
- `src/app/layout.tsx` — Root layout (DM Sans + DM Serif Display + JetBrains Mono, Nav, global styles)
- `src/app/case-study/hedgehunt/page.tsx` — HedgeHunt case study (MDX via next-mdx-remote with `parseFrontmatter: true`, SSG)

## Homepage Sections — `src/app/(home)/_sections/`
Order: Hero → CaseStudies → About → Contact

- `Hero/` — Eyebrow with auto-calculated years experience, headline, intro, CTAs (View My Work + Resume + GitHub + LinkedIn + CopyEmailBtn). 2-col grid layout with photo
- `Hero/CopyEmailBtn.tsx` — Wraps shared CopyButton for Hero button styling
- `CaseStudies/` — Featured work section (SectionShell + CaseStudyCard + WindowChrome + company logo strip)
- `CaseStudies/CaseStudyCard.tsx` — Full-card clickable via stretched `::after` link. "Read case study →" + "Visit app ↗" links
- `About/` — Full-width text paragraphs (4 paragraphs: what drives you, how you work, team mindset, industry breadth)
- `Contact/` — CTA heading + CopyEmail + ArrowLinks to social (SectionShell)
- `Contact/CopyEmail.tsx` — Wraps shared CopyButton for Contact styling
- `content.ts` — Static data: hedgehuntTags, CompanyLogo[], companies, aboutMe, contactEmail, contactLinks

## Case Study Content — `src/app/case-study/hedgehunt/`
- `page.tsx` — MDX compilation + rendering, imports from `../_components`
- `content.ts` — `hedgehuntMeta` + `hedgehuntSections` (typed interfaces)
- `page.module.css` — Layout styles, padding uses `var(--nav-height)` token

## Shared UI — `src/ui/shared/`
- `SectionLabel/` — Mono-font label with `#` prefix and trailing line (left-aligned)
- `ArrowLink/` — `<Link>` or `<a>` with animated arrow span (gap animation on hover)
- `ExternalLink/` — Thin `<a>` wrapper with `target="_blank" rel="noopener noreferrer"`
- `SectionShell/` — Shared section layout (max-width, padding, responsive gutter, optional SectionLabel). No border-top
- `CopyButton/` — Client component. Clipboard copy + icon swap (CopyIcon → CheckIcon in green) + "Copied!" float-up toast
- `ScrollLink/` — Client component. `<a>` wrapper that uses `scrollIntoView` for same-page hashes, navigates to homepage for cross-page

## Icons — `src/ui/icons/`
- `ArrowRightIcon.tsx` — Phosphor arrow-right (bold) as React SVG component
- `CopyIcon.tsx` — Phosphor copy icon as React SVG component (currentColor, 1em sizing)
- `CheckIcon.tsx` — Phosphor check-fat icon as React SVG component

## Case Study Components — `src/app/case-study/_components/`
- `ExecutiveSummary/` — 2×2 grid (problem, constraints, architecture, results)
- `DecisionCard/` — Collapsible ADR card using `<details>/<summary>`. Optional `id` prop for deep linking
- `CodeShowcase/` — Title + description + syntax-highlighted code block. No card wrapper (code block inherits prose.css styling)
- `Highlight/` — `HighlightGrid` (2-col grid, 1-col on mobile) + `HighlightCard` (compact static card with title + body)
- `DetailGrid/` — `DetailGrid` (2-col `<dl>` grid) + `DetailItem` (`<dt>` + `<dd>`). Mono purple labels, compact cards. For label-description pairs (challenge types, package names)
- `ProcessFlow/` — Horizontal connected steps with ArrowRightIcon between them. `ProcessFlow` (wrapper with title) + `ProcessStep` (label + detail). Vertical on mobile
- `StatGrid/` — `StatGrid` (responsive grid) + `Stat` (large number + label). Used for the Numbers section
- `Mermaid/` — Client-side Mermaid diagram renderer (imports theme from `@/data/theme`)
- `SectionNav/` — Sticky nav with IntersectionObserver, `top: var(--nav-offset)` syncs with main nav hide/show

## Navigation — `src/ui/navigation/`
- `Nav/` — Fixed top nav, auto-hides on scroll down (client component). Sets `--nav-offset` CSS var on `<html>` for SectionNav coordination. Links: work, about (ScrollLink), Resume (ExternalLink), Let's Talk (ScrollLink)

## Layout — `src/ui/layout/`
- `Footer/` — Copyright + "Built with" line

## Motion — `src/ui/motion/`
- `PageTransition/` — Framer Motion fade-in on page mount (reduced-motion aware)
- `SectionReveal/` — Framer Motion scroll-triggered reveal (reduced-motion aware)

## Data — `src/data/`
- `theme.ts` — JS-accessible design token values (must stay in sync with tokens.css)

## Styles
- `src/styles/tokens.css` — Design tokens (colors, spacing, typography, layout, nav height/offset, transitions, shadows, radius). Includes `--green: #6a8759` for success states, `--purple: #9876aa` for inline code
- `src/styles/prose.css` — MDX/article typography
- `src/styles/globals.css` — CSS reset, token import, base body styles

## Content
- `src/content/case-studies/hedgehunt.mdx` — HedgeHunt case study MDX with frontmatter
- `src/lib/mdx.ts` — `getCaseStudySource(slug)` — reads MDX file from disk

## Static Assets
- `public/Catalin_Leca_Resume.pdf` — Resume (named for downloads)
- `public/images/logos/` — Company logos (SVG + webp): trading-212, ef, FT, vodafone, autodesk-2, bearingpoint
- `public/images/hedgehunt-editor.webp` — Platform editor screenshot (used in CaseStudyCard)
- `public/images/me-photo.webp` — Profile photo

## Import Conventions
Every folder has a barrel `index.ts`. Import from the group:
```ts
import { Hero, CaseStudies, About, Contact } from "@/app/(home)/_sections";
import { PageTransition, SectionReveal } from "@/ui/motion";
import { SectionShell, ArrowLink, ExternalLink, CopyButton, ScrollLink } from "@/ui/shared";
import { ArrowRightIcon, CopyIcon, CheckIcon } from "@/ui/icons";
import { ExecutiveSummary, DecisionCard, CardField, HighlightGrid, HighlightCard, DetailGrid, DetailItem, CodeShowcase, ProcessFlow, ProcessStep, StatGrid, Stat, Mermaid, SectionNav } from "../_components";
```
