# catalinleca.dev — Portfolio

Personal portfolio site for Catalin Leca, Senior Software Engineer.

## Stack

- **Next.js 16** + React 19 + TypeScript
- **CSS Modules** + design tokens (no Tailwind)
- **Framer Motion** for page transitions and scroll-triggered reveals
- **MDX** via `next-mdx-remote` for case study content
- Deployed on **Vercel** with SSG/ISR

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Analytics (PostHog)

This portfolio includes manual PostHog tracking for:
- Page views on route changes
- CTA/link clicks marked with `data-analytics-*`
- Scroll depth milestones (25/50/75/90)

Configure environment variables:

```bash
cp .env.example .env.local
```

Set:
- `NEXT_PUBLIC_POSTHOG_KEY` (required)
- `NEXT_PUBLIC_POSTHOG_HOST` (optional, defaults to `https://us.i.posthog.com`)

For excluding your own visits from reports:
- Use `?internal=1` once in the URL to mark your browser as internal traffic.
- Use `?internal=0` to clear the flag.

## Build

```bash
npm run build
npm start
```

## Deploy

Push to `main` — Vercel builds and deploys automatically.
