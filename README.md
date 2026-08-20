# Ray Xue Portfolio

Production site for [rayxueportfolio.com](https://rayxueportfolio.com) — Next.js App Router, Tailwind v4, MUI, Three.js space backdrop, and git-based MDX blog.

## Stack

- **pnpm** + **TypeScript** (strict) + **Next.js 15** App Router
- **React 19** + **Tailwind CSS v4** + **MUI 7** (vendor-wrapped)
- **Three.js** / React Three Fiber backdrop (stars, meteors, scroll-linked planets)
- **MapLibre** (OpenFreeMap) for the transit project widget
- **MDX blog** (`content/blog/*.mdx`, `next-mdx-remote/rsc`)
- **Biome** + **ESLint** (import boundaries)
- **Vitest** + Testing Library

## Commands

Run from the repo root with **pnpm** (Node **22+**).

| Command | Description |
|---------|-------------|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build → `.next/` |
| `pnpm start` | Serve production build |
| `pnpm lint` | Biome + ESLint |
| `pnpm lint:type` | `tsc --noEmit` |
| `pnpm test` | Vitest (single run) |
| `pnpm format` | Biome format |

## Architecture

- **`src/app/`** — Next.js routes (`/`, `/blog`, `/coming-soon`, API, sitemap, RSS)
- **`src/vendor/`** — MUI, motion, `next/link`, Three.js, MapLibre (only layer for those deps)
- **`src/components/0-primitive` … `4-page`** — atomic UI tiers (one-way imports)
- **`src/content/`** — typed site copy, nav, skills, projects, social links
- **`src/lib/blog/`** — MDX frontmatter parsing and post listing
- **`content/blog/`** — MDX posts (`draft: true` omitted from public routes)
- **`src/theme/`** — MUI theme; design tokens in `src/app/globals.css` `@theme`

## Deploy

Netlify OpenNext adapter: `pnpm build`, publish `.next` (overrides a leftover Vite `dist` setting). No SPA fallback. Hidden contact form in root `layout.tsx`; POST via `/api/contact`.

Planet texture credit: `public/textures/ATTRIBUTION.md`.

## Agent context

See [`.ai/AGENTS.md`](.ai/AGENTS.md) for structure, import rules, and content paths.
