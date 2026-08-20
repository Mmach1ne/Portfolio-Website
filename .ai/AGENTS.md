# Portfolio-Website

Personal portfolio for **Ray Xue** (`https://rayxueportfolio.com`). Next.js App Router, Tailwind v4 + MUI, Three.js space backdrop, MapLibre transit widget, and git-based MDX blog.

## Project Overview

Production site: hero, about/skills, seven interactive project showcases, Netlify contact form, `/coming-soon`, and `/blog`. WebGL space scene (twinkling stars, meteor pool, scroll-linked planets) on desktop and mobile with a reduced-quality mobile profile. Custom cursor on fine pointers only.

## Core Principles

- Self-documenting code with clear naming and predictable module boundaries
- **SOLID**, **KISS**, **DRY**, **YAGNI**

## Tech Stack

| Area | Technology |
|------|------------|
| Language | TypeScript (strict) |
| Runtime | Node.js ≥22 (`.nvmrc`) |
| Framework | Next.js 15 App Router |
| UI | React 19 |
| Styling | Tailwind CSS v4 (`src/app/globals.css`) + MUI 7 (via `src/vendor/mui`) |
| Motion | framer-motion (via `src/vendor/motion`) |
| 3D | three, @react-three/fiber, @react-three/drei (via `src/vendor/three`) |
| Maps | maplibre-gl, react-map-gl (via `src/vendor/map`) |
| Blog | MDX in `content/blog/`, gray-matter, next-mdx-remote/rsc |
| Package manager | pnpm |
| Lint | Biome + ESLint 9 (boundaries + restricted imports) |
| Tests | Vitest + Testing Library + happy-dom |

## Development Commands

Run from repo root with **pnpm**.

- `pnpm dev` — Next.js dev server
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm lint` / `pnpm lint:fix` — Biome + ESLint
- `pnpm lint:type` — TypeScript check
- `pnpm test` / `pnpm test:watch` — Vitest

## Architecture

```text
content/blog/            # MDX posts (draft: true git-only)
src/
├── app/                 # Next.js routes, globals.css, providers
├── content/             # site, nav, skills, projects, social
├── lib/blog/            # post schema, fs, listPublished
├── theme/               # MUI createTheme (tokens in globals.css)
├── vendor/              # mui, motion, router (next/link), three, map
├── components/
│   ├── 0-primitive/
│   ├── 1-composition/   # Slider, Sparkline, Typewriter, canvases, …
│   ├── 2-module/        # nav, hero, SpaceCanvas, project widgets, contact
│   ├── 3-layout/        # SiteShell, PageBackdrop, ErrorBoundary
│   └── 4-page/          # HomePage, ComingSoonPage, BlogIndexPage, BlogPostPage
├── hooks/
├── lib/
└── test/setup.ts
public/textures/         # planet attribution (CC BY 4.0)
```

### Vendor rule

Feature code must **not** import `@mui/*`, `@emotion/*`, `framer-motion`, `three`, `@react-three/*`, `maplibre-gl`, `react-map-gl`, or `react-router-dom` directly. Use `@/vendor` wrappers or `@/components/0-primitive`.

Allowed framework imports in `src/app/**`: `next`, `next/font`, `next/image`, `next/navigation` for metadata and route handlers.

### Atomic tiers

Lower tiers must not import higher tiers. ESLint `eslint-plugin-boundaries` enforces this.

### Content

Edit copy in `src/content/`. Blog posts in `content/blog/*.mdx`. Site metadata from `src/content/site.ts` in root `layout.tsx`.

### Netlify

- Hidden `contact` form in `src/app/layout.tsx`
- `netlify.toml` — `pnpm build`, publish `.next`, `@netlify/plugin-nextjs`, no SPA fallback
- Contact POST via `src/lib/netlifyForm.ts` → `/api/contact`

### Mobile WebGL profile

| Knob | Desktop | Mobile |
|------|---------|--------|
| Twinkle points | 800 | 250 |
| Meteors | 6 | 2 |
| DPR | [1, 1.5] | 1 |
| Planet segments | ~56 | ~28 |

Planets are **not** hidden on mobile; reduced-motion disables the WebGL canvas entirely.

### Public assets

`public/Logos/`, `public/fonts/IntroRust-Line.otf`, PDFs, `rocket.png`, `public/textures/ATTRIBUTION.md`.

## Out of scope

No auth, CMS, comments, or i18n. Draft posts are git frontmatter only.
