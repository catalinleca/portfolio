# Portfolio Project Context

## Stack
- **Next.js 16** + React 19 + TypeScript
- **CSS Modules** + design tokens (no Tailwind — intentional)
- **Framer Motion** for page transitions and scroll-triggered reveals
- **MDX** via `next-mdx-remote` for case study content
- **SSG/ISR** on Vercel (NOT `output: 'export'`)

## Key Decisions & Reasoning

### Why no Tailwind
- Tailwind is already demonstrated via HedgeHunt (separate project)
- CSS Modules show actual CSS knowledge — rarer and more impressive
- Readable code with meaningful class names, no "utility soup"
- Modern CSS features: native nesting, custom properties, `@layer`

### Why MDX (not a CMS)
- Content is repo-owned, version controlled, zero vendor dependency
- `git push` triggers 30s Vercel build — that IS the deploy pipeline
- **Upgrade path**: Sanity when visual editing/collaboration needed, Payload CMS for client work templates

### Why Framer Motion
- One dependency for real visible value — page transitions + scroll reveals
- CSS transitions for hover micro-interactions (not Framer)
- No gratuitous animation — motion serves readability

## Design Direction
- Dark editorial aesthetic (content-focused, precise typography, subtle motion)
- Palette: #0e0e11 bg, #c8c5bf text, #cc7832 accent (dark theme)
- Fonts: DM Sans (body), DM Serif Display (headings), JetBrains Mono (code/labels)
- Generous whitespace
- Aesthetic direction not fully finalized — open to refinement

## Details
- **Code map, standards, working style** → `.claude/active/`
- **Agent definitions** → `.claude/agents/`
- **Full implementation plan** → `.claude/implementation-plans/portfolio-plan.md`
