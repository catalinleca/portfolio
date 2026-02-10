# Portfolio Plan

## Context

You need a personal portfolio that serves as a **navigation hub** connecting your work (HedgeHunt, performance remediation case) to evaluators. The strategy from your prior conversation is solid - I'm validating it, tightening it, and making it actionable.

**Core tension solved:** Product (HedgeHunt) stays product-first. Portfolio stays engineer-first. They link to each other but never mix concerns.

---

## Strategy Validation

Your 3-layer model (Business > Product Depth > Technical) is correct. I'm not changing it.

**What I'd refine:**

1. **Case study lives on YOUR portfolio, not on HedgeHunt.** The product site links to `hedgehunt.app`. The engineering story lives at `catalinleca.dev/case-study/hedgehunt`. This keeps the product clean and your portfolio comprehensive.

2. **The cross-link is subtle:** HedgeHunt landing footer says "Built by Catalin Leca" (linked). Your portfolio features HedgeHunt as a case study card. Neither dominates the other.

3. **Second case study (performance remediation)** can start as "Coming soon" - don't let it block shipping the portfolio.

---

## Tech Stack

**Next.js + MDX + CSS Modules + Framer Motion** in a **separate repository** (not inside HuntHub monorepo).

**Why Next.js:**
- De facto React framework - having it in your portfolio is itself a signal
- SSG with `generateStaticParams` for case study pages, ISR-ready on Vercel
- App Router + RSC gives you clean page/layout composition
- You're deep in the React ecosystem already - staying consistent
- If you want to add interactivity later (e.g., interactive architecture diagram, filtering), React is already there

**Why MDX (not a CMS):**
- Content is repo-owned — maximum ownership, version controlled, zero vendor dependency
- Markdown + React components = rich content (diagrams, code blocks, interactive elements) without a CMS
- You're a developer editing your own content — `git push` triggers a 30s Vercel build. That IS your CMS.
- Zero infrastructure to maintain — no database, no API, no admin panel
- Migration path: if you outgrow MDX (need visual editing, collaboration, structured content at scale), upgrade to Sanity. If you want a reusable self-hosted CMS template for client work, use Payload CMS.

**Why CSS Modules (not Tailwind):**
- Built into Next.js — zero config, zero dependencies
- Real CSS with meaningful class names — readable, maintainable, no "utility soup"
- Shows actual CSS knowledge (rarer and more impressive than Tailwind utility classes)
- Modern CSS features: native nesting, custom properties, `@layer`, container queries
- Tailwind is already demonstrated via HedgeHunt — portfolio shows a different, deeper skill
- Open Props (optional) for design tokens: consistent spacing, typography, colors, shadows

**Why Framer Motion:**
- One dependency that creates real visible value — page transitions, entrance animations, scroll reveals
- Industry standard for React animation
- Sleek portfolio feel without CSS animation boilerplate
- Only used for motion primitives (opacity, transform, layout) — not overengineered

**Why separate repo:**
- Portfolio = personal identity. HuntHub = product. Different concerns, different deploy cycles.
- Portfolio repo can be public (the code IS signal). HuntHub stays private.
- No cross-workspace dependency noise.

**Hosting:** Vercel (natural fit for Next.js, free tier, edge CDN, instant deploys). SSG/ISR — not static export.
**Domain:** `catalinleca.dev` or similar (completely separate from `hedgehunt.app`).

**Key deps:** `next@15`, `react@19`, `typescript`, `next-mdx-remote`, `framer-motion`, `clsx`, `open-props` (optional)
**No Tailwind** — intentional. CSS Modules + design tokens for a clean, readable codebase.
**No MUI / styled-components** — overkill for a content site. CSS Modules are sufficient.
**No CMS in v1** — MDX-first. Upgrade path to Sanity or Payload documented above.

---

## Design Direction

**The portfolio must NOT look like HedgeHunt.** HedgeHunt uses warm earthy tones (#B6591B orange, #E4D5C1 parchment, Georgia serif). The portfolio should signal "senior engineer" not "treasure hunt."

- **Palette:** Neutral - near-white bg (#FAFAFA), dark text (#0F172A), one muted accent (blue or teal) used sparingly on links and hover
- **Typography:** Clean sans-serif (Inter or system stack). Weight contrast for hierarchy, not font-family contrast.
- **Spacing:** Generous whitespace. Sections separated by 80-120px.
- **Layout:** Single column, max-width ~720px for text, ~1024px for grids.
- **Animations:** Subtle, intentional motion via Framer Motion:
  - Page transitions (fade + slight y-translate)
  - Section entrance animations (scroll-triggered reveals)
  - Hover micro-interactions on cards and links (CSS transitions, not Framer)
  - No parallax. No gratuitous animation. Motion serves readability.
- **Aesthetic direction:** Editorial / Stripe-ish — content-focused, precise typography, subtle motion. TBD: may incorporate dark sections for case studies.
- **No dark mode** in v1.

---

## HedgeHunt - What to Highlight in Case Study

Split into two categories: **domain context** (explains what the product does) and **technical challenges** (where the engineering depth lives). The case study should lead with context so the reader understands the domain, THEN go deep on technical decisions.

### Domain Context (brief, sets the stage)
These aren't technically deep but they explain what the reader is looking at:
- **4 Challenge Types** (Clue, Quiz, Mission, Task) - each with distinct UI and behavior
- **Steps** - the building blocks of hunts, with settings (location, hints, time limits, attempts)
- **Sharing & Permissions** (Owner > Admin > View) - standard RBAC, provides scope context

### Technical Challenges (where senior credibility lives)
These are the features worth going deep on:

| Feature | What Makes It Non-Trivial |
|---------|--------------------------|
| **Live Preview** (iframe + SDK) | Typed postMessage protocol, independent app embedding, lifecycle management |
| **Hunt Versioning** (Draft > Publish > Release) | Immutable snapshots, active players unaffected by edits, rollback capability |
| **AI Hunt Generation** | Natural language -> structured multi-step hunt data, prompt engineering |
| **Publishing Workflow** | Version panel, set-as-live, take-offline, step cloning, optimistic locking |
| **Validation System** | Strategy pattern, 4 modes (exact, fuzzy/Levenshtein, contains, numeric-range) |
| **Asset Management** (brief) | S3 presigned URLs, CloudFront CDN, video/audio compression pipeline |

### Player Technical Highlights
- HATEOAS navigation (server provides `_links`, client follows them)
- Prefetching next step while playing current (instant transitions)
- Session persistence (localStorage + API resume)
- GPS/photo/audio capture with AI validation (GPT-4o vision)

### Architecture Highlights
- Monorepo: 5 apps + 3 shared packages
- OpenAPI YAML -> generated TypeScript types + Zod schemas (single source of truth)
- Strategy pattern for validation (each challenge type = independent validator)
- 217 backend tests

---

## Portfolio Sections

### Page 1: Homepage (single page)

#### 1. Hero
- Name, role ("Senior Frontend Engineer")
- Positioning line: *"I build complex, production-grade frontend systems - from editor UIs and real-time experiences to performance-critical platforms."*
- 2-3 factual proof bullets (multi-app platform, 5+ years across named companies, 217 tests + solo delivery)
- Icon links: GitHub, LinkedIn, Email

#### 2. Featured Case Studies (PRIMARY)
Two cards, side by side (desktop), stacked (mobile):

**Card 1 - HedgeHunt:**
- "Case Study" label
- Title + 1-sentence description
- 3 signal bullets (React 19 Editor, Node.js API w/ 217 tests, 5 apps + 3 packages)
- CTA: "Read case study" -> `/case-study/hedgehunt`
- Secondary: "Visit product" -> `hedgehunt.app`
- Optional: Editor UI screenshot

**Card 2 - Performance Remediation:**
- "Coming soon" initially, or short write-up
- Pairs well: one shows building, one shows diagnosing/fixing

#### 3. Selected Clients
Grayscale logo strip: Vodafone, Financial Times, EF Education First, Trading 212, Zafran.
No links. Just visual credibility. SVG logos normalized to same height.

#### 4. Capabilities (3 columns)
**Complex UI Systems:** Hunt editor, drag-and-drop, multi-step forms, real-time iframe preview, asset management
**Platform Quality:** 217 tests, type-safe API boundary (OpenAPI->Zod), versioned content system, authorization model
**Delivery Impact:** Solo full-stack delivery, monorepo (5 apps + 3 packages), production infra (Fly.io, S3, CloudFront), AI integration

#### 5. Experience (compressed timeline)
```
Senior FE - Zafran (Cybersecurity)     2024-2025
Senior FE - Trading 212                2023-2024
FE Engineer - EF Education First       2022-2023
FE Engineer - Financial Times          2021-2022
FE Engineer - Vodafone                 2019-2021
```
One line of impact per entry. Most recent first.

#### 6. Contact
"Get in touch" + email (primary), GitHub, LinkedIn. Optional status line ("Currently building HedgeHunt").

---

### Page 2: HedgeHunt Case Study (`/case-study/hedgehunt`)

This is where senior credibility lives. Follows the **context first, then depth** pattern.

#### a. Opening (above the fold)
Title, subtitle (solo project, dates), 3-sentence summary of what/why/how.

#### b. The Product - Domain Context (brief, no-tech)
What HedgeHunt does, who it's for. Introduce the domain concepts:
- 4 challenge types (clue, quiz, mission, task) - what they are, not how they're built
- Steps as building blocks, with settings (location, hints, time limits)
- Creator and player experiences (1-2 screenshots each)
- Link to live product + walkthrough video

This section answers: "What am I looking at?" before the reader encounters any architecture.

#### c. System Architecture (THE one diagram)
Clean SVG showing: monorepo (5 apps + 3 packages), data flow (OpenAPI -> types -> apps), infrastructure (Fly.io, S3, CloudFront). Based on ASCII diagrams in `architecture.md`.

#### d. Key Technical Decisions (5 ADRs)
Each: Decision + Context + Trade-offs + Outcome. Concise.

1. **Hunt Versioning** - Draft/Publish/Release separation. Why: active players can't be disrupted by edits. Trade-off: complex data model (Hunt + HuntVersion + Step per version) but zero risk to active sessions.
2. **Shared Type System** - OpenAPI YAML -> generated TypeScript + Zod. Why: 5 apps must agree on types. Trade-off: generation step in workflow but zero type drift.
3. **Editor-Player iframe SDK** - Typed postMessage communication. Why: apps must be independently deployable. Trade-off: serialization overhead but complete app separation.
4. **Validation Strategy Pattern** - One validator per challenge type. Why: Open/Closed, new types don't modify existing code. Trade-off: more files but each is focused and testable.
5. **HATEOAS for Player Navigation** - Server provides `_links`, client follows them. Why: server is single source of truth for game progression. Trade-off: larger responses but trivial client logic.

#### e. Patterns Worth Highlighting (shorter section)
- Optimistic locking for concurrent step editing
- Prefetching next step while playing current (instant transitions)
- React Query as state layer (no Redux, no global state)
- AI integration: GPT-4o for hunt generation + answer validation

#### f. What I'd Do Differently (senior self-awareness)
3-5 honest paragraphs on trade-offs, unexpected complexity, what worked vs. friction.

#### g. Numbers
Metrics block: commits, tests, apps, packages, challenge types, "solo developer."

#### h. Links
Product, editor, walkthrough video, GitHub ("available on request" if private).

---

## File Structure

```
portfolio/
├── next.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── images/
│   │   ├── hedgehunt-editor.png
│   │   ├── hedgehunt-player.png
│   │   ├── architecture.svg
│   │   └── logos/ (vodafone.svg, ft.svg, ef.svg, trading212.svg, zafran.svg)
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx                (root layout: meta, fonts, global styles)
│   │   ├── layout.module.css         (root layout styles)
│   │   ├── page.tsx                  (homepage - imports all sections)
│   │   ├── page.module.css           (homepage styles)
│   │   └── case-study/
│   │       └── hedgehunt/
│   │           └── page.tsx          (case study page - renders MDX)
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Hero.module.css
│   │   ├── CaseStudies.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── CaseStudyCard.module.css
│   │   ├── Clients.tsx
│   │   ├── Clients.module.css
│   │   ├── Capabilities.tsx
│   │   ├── Capabilities.module.css
│   │   ├── Experience.tsx
│   │   ├── Experience.module.css
│   │   ├── Contact.tsx
│   │   ├── Contact.module.css
│   │   ├── Footer.tsx
│   │   ├── Footer.module.css
│   │   ├── PageTransition.tsx        ('use client' - Framer Motion wrapper)
│   │   └── SectionReveal.tsx         ('use client' - scroll-triggered entrance)
│   ├── content/
│   │   └── case-studies/
│   │       └── hedgehunt.mdx         (case study content in MDX)
│   ├── mdx-components/
│   │   ├── ADRCard.tsx               (custom MDX component for ADR blocks)
│   │   ├── ADRCard.module.css
│   │   ├── MetricsBlock.tsx          (custom MDX component for metrics)
│   │   ├── MetricsBlock.module.css
│   │   ├── CodeBlock.tsx             (syntax-highlighted code)
│   │   └── Diagram.tsx               (SVG diagram wrapper)
│   ├── styles/
│   │   ├── globals.css               (CSS reset + custom properties / design tokens)
│   │   ├── tokens.css                (color, spacing, typography tokens)
│   │   └── prose.css                 (MDX content typography — long-form readable styles)
│   └── lib/
│       └── mdx.ts                    (MDX compilation helper using next-mdx-remote)
```

**Notes:**
- All components are RSC by default (no `'use client'`) — pure server rendering for content
- `'use client'` only on: `PageTransition.tsx`, `SectionReveal.tsx` (Framer Motion requires client)
- SSG with `generateStaticParams` for case study routes — not `output: 'export'`
- Content lives in `src/content/` as `.mdx` files — version controlled, portable
- Custom MDX components in `src/mdx-components/` — reusable across all case studies
- CSS Modules co-located with components (Component.tsx + Component.module.css)

---

## Implementation Order

### Phase 1: Scaffold + Homepage (1-2 days)
1. Create `portfolio` repo, init Next.js 15 + TypeScript (no Tailwind)
2. Install deps: `next-mdx-remote`, `framer-motion`, `clsx`
3. Configure `next.config.ts` (no `output: 'export'` — SSG/ISR on Vercel)
4. Define design tokens in `tokens.css` + global reset in `globals.css` (neutral palette, NOT HedgeHunt colors)
5. Build root layout.tsx (meta, Inter font, global styles, PageTransition wrapper)
6. Build all 6 homepage sections as RSC components with CSS Modules (Hero -> Contact)
7. Add SectionReveal (Framer Motion) for scroll-triggered entrance animations
8. Deploy to Vercel + connect domain

### Phase 2: Case Study Page (2-3 days)
1. Set up MDX pipeline: `next-mdx-remote` + custom MDX components (ADRCard, MetricsBlock, CodeBlock, Diagram)
2. Define `prose.css` for long-form readable typography
3. Create `hedgehunt.mdx` in `src/content/case-studies/`
4. Write Opening + Product context sections in MDX
5. Create architecture diagram (Excalidraw -> SVG), embed via Diagram component
6. Write 5 ADRs using ADRCard component (this is the hard part - budget most time here)
7. Write Patterns + "What I'd Do Differently"
8. Add screenshots + MetricsBlock
9. Walkthrough video embed (record separately)

### Phase 3: Polish + Cross-linking (half day)
1. Responsive testing (mobile, tablet, desktop)
2. Lighthouse audit (target: 100 across the board)
3. SEO: meta tags, og:image, canonical URLs
4. HedgeHunt landing footer: "Built by Catalin Leca" -> portfolio link
5. Portfolio case study: link to hedgehunt.app

### Phase 4: Second Case Study + Refinements (later)
1. Performance remediation write-up
2. Walkthrough video (record + embed)
3. Iterate based on feedback

---

## Template for Future Projects

When adding a new project to the portfolio:

1. **Add a case study card** to homepage Section 2 (same format: label, title, description, 3 bullets, CTA)
2. **Create a new `.mdx` file** in `src/content/case-studies/[project-name].mdx`
3. **Add a route** at `src/app/case-study/[project-name]/page.tsx` that renders the MDX
4. **Follow the case study structure**: Opening > Product Context > Architecture > ADRs > Patterns > Reflection > Numbers > Links
5. **Reuse MDX components**: ADRCard, MetricsBlock, CodeBlock, Diagram — consistent across all case studies
6. **Screenshots + one diagram** per project (minimum)
7. **Update capabilities section** if the new project demonstrates different skills

## Content Management Strategy

**Default (v1): MDX in repo**
- Content authored in `.mdx` files, committed to git
- `git push` triggers Vercel build (~30s) — this is the deploy pipeline
- Rich content via React components embedded in MDX
- Maximum ownership, zero infrastructure

**Upgrade to Sanity when:**
- You want non-code editing (visual studio)
- You need structured content across many pages
- You want collaboration (someone else contributes)
- You want content workflows without building them

**Upgrade to Payload CMS when:**
- You want the portfolio to double as a sellable self-hosted CMS template
- You need platform features (auth, roles, private content, multi-tenant)

**Ownership model:**
- MDX = maximum ownership of content
- Sanity = managed backend, still portable
- Payload = maximum ownership of infrastructure

---

## Verification

- [ ] Homepage loads in <1s, Lighthouse 95+ across all categories
- [ ] Case study is scannable in 2 min (check with someone unfamiliar)
- [ ] No HedgeHunt visual language leaks into portfolio design
- [ ] Cross-links work both directions (portfolio -> product, product footer -> portfolio)
- [ ] Mobile responsive (test on real device)
- [ ] ADRs each communicate a clear decision + trade-off (not just "I used X technology")
- [ ] "What I'd Do Differently" section is honest, not performative

---

## Key Risk: Content Over Code

The technical implementation is straightforward (Next.js + MDX + CSS Modules). **The hard part is writing the case study content.** The ADRs need to be specific enough to signal depth but concise enough to be scannable. Budget 2x more time for writing than for coding.

## Failure Modes / Maintenance Risk

| Layer | What Can Fail | Mitigation |
|-------|---------------|------------|
| **Content (MDX)** | Typo in MDX syntax breaks build | Vercel preview deploys catch this before prod |
| **Hosting (Vercel)** | Vercel outage | Extremely rare; static/SSG pages cached at edge |
| **Dependencies** | Framer Motion / next-mdx-remote breaking change | Pin versions, update intentionally |
| **No database** | Nothing | That's the point — zero data layer to corrupt or migrate |

Compared to CMS-backed approaches: no database migrations, no auth/admin surface area, no API to keep alive. The portfolio has the fewest possible failure modes.
