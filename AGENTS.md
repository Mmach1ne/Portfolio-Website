# Portfolio-Website (`ray-xue-portfolio`)

## Project Overview

Production personal site for **Ray Xue** at [rayxueportfolio.com](https://rayxueportfolio.com): a Next.js App Router portfolio with a WebGL space backdrop, seven interactive project showcases, a Netlify-backed contact form, `/coming-soon`, and a git-based MDX blog. Target visitors are recruiters, collaborators, and anyone browsing projects or posts. There is no auth, CMS, comments, or i18n — copy lives in TypeScript modules and blog posts in `content/blog/*.mdx`.

## Core Principles

- Self-documenting code with clear naming and predictable module boundaries
- Consistent error handling: contact submit returns `'success' | 'error'`; blog drafts are omitted from public routes via `getPost` / `listPublished`; WebGL falls back to `WebGlFallback`
- **SOLID**: single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **KISS**, **DRY**, **YAGNI**: prefer the smallest change that satisfies the requirement

## Tech Stack

Versions below are from `package.json` (caret ranges). Runtime pin: Node **22** (`.nvmrc`, `engines.node` `>=22`, Netlify `NODE_VERSION=22`).

| Area | Technology | Version |
|------|------------|---------|
| Language | TypeScript (`strict`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`) | ^5.8.3 |
| Runtime | Node.js | >=22 |
| UI | React / react-dom | ^19.1.0 |
| Framework | Next.js 15 App Router (`"type": "module"`) | ^15.3.3 |
| Styling | Tailwind CSS v4 + PostCSS (`@tailwindcss/postcss`) | ^4.1.8 |
| UI kit | MUI Material / icons / material-nextjs (via `src/vendor`) | ^7.1.0 |
| Emotion | @emotion/react, @emotion/styled | ^11.14.0 |
| Motion | framer-motion (via `src/vendor/motion`) | ^12.12.2 |
| 3D | three, @react-three/fiber, @react-three/drei (via `src/vendor/three`) | ^0.176.0 / ^9.1.2 / ^10.0.7 |
| Maps | maplibre-gl, react-map-gl (via `src/vendor/map`) | ^5.6.0 / ^8.0.4 |
| Blog | gray-matter, next-mdx-remote, reading-time, rehype-pretty-code, shiki | ^4.0.3 / ^5.0.0 / ^1.5.0 / ^0.14.1 / ^3.4.2 |
| Validation | zod | ^3.25.67 |
| Lint / format | Biome, ESLint 9, typescript-eslint, eslint-plugin-boundaries | ^2.0.0 / ^9.25.0 / ^8.32.1 / ^5.0.1 |
| Tests | Vitest, happy-dom, Testing Library | ^3.1.4 / ^17.4.4 / ^16.3.0 |
| Package manager | pnpm (`packageManager`) | 10.12.1 |
| Deploy | Netlify (`netlify.toml`: `pnpm build`, no SPA fallback) | — |

Path alias: `@/*` → `src/*` (`tsconfig.json`). Biome: 2-space indent, line width 100, single quotes, always semicolons.

## Development Commands

Run from the repo root with **pnpm**.

### Build & development

- `pnpm dev` — Next.js dev server
- `pnpm build` — production build → `.next/`
- `pnpm start` / `pnpm preview` — serve the production build (`next start`)

### Testing

- `pnpm test` — Vitest single run (`happy-dom`, setup `src/test/setup.ts`)
- `pnpm test:watch` — Vitest watch mode

### Code quality

- `pnpm lint` — `biome check .` then `eslint .`
- `pnpm lint:fix` — Biome write + ESLint `--fix`
- `pnpm lint:type` — `tsc --noEmit`
- `pnpm format` — `biome format --write .`

## Architecture Overview

Single package (not a monorepo). Component-based UI with **atomic import tiers** enforced by ESLint `eslint-plugin-boundaries`. Next.js owns routing; pages compose layout + modules; typed content and lib helpers stay out of the UI tree.

```text
Portfolio-Website/
├── content/blog/              # MDX posts (draft: true omitted from public routes)
├── public/
│   ├── fonts/IntroRust-Line.otf
│   ├── Logos/                 # skill/profile images
│   ├── textures/              # planet textures + ATTRIBUTION.md
│   ├── STM32Comms.pdf
│   ├── ThermalDynamic.pdf
│   └── rocket.png
├── src/
│   ├── app/                   # Next.js routes, metadata, providers, globals.css
│   │   ├── page.tsx           # /
│   │   ├── coming-soon/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── api/contact/route.ts
│   │   ├── feed.xml/route.ts  # RSS
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── layout.tsx         # fonts, JSON-LD
│   │   └── providers.tsx      # MUI App Router cache + ThemeProvider + ErrorBoundary
│   ├── content/               # site, nav, skills, projects, social, transitRoute
│   ├── components/
│   │   ├── 0-primitive/       # Box, Button, Link, Text, Image, …
│   │   ├── 1-composition/     # Slider, Sparkline, Typewriter, canvases, FormField, …
│   │   ├── 2-module/          # Hero, nav, SpaceCanvas, project visuals, ContactForm, …
│   │   ├── 3-layout/          # SiteShell, PageBackdrop, HashSection, ErrorBoundary
│   │   └── 4-page/            # HomePage, ComingSoonPage, BlogIndexPage, BlogPostPage
│   ├── vendor/                # only layer allowed to import MUI, motion, three, maps, next/link
│   ├── theme/                 # MUI createTheme; numeric tokens mirrored from globals.css
│   ├── hooks/                 # useMedia, useFinePointer, usePrefersReducedMotion, …
│   ├── lib/                   # blog, netlifyForm, webgl, scroll, seededRandom
│   └── test/                  # Vitest setup + next mocks
├── biome.json
├── eslint.config.js
├── next.config.ts             # transpilePackages for MUI
├── vitest.config.ts
└── netlify.toml
```

### Layers

| Layer | Location | Purpose |
|-------|----------|---------|
| Routes | `src/app/` | App Router pages, metadata, sitemap, RSS, contact API. Thin files that render a `4-page` component. May import `next`, `next/font`, `next/navigation` for metadata and handlers. |
| Pages | `src/components/4-page/` | Full-page composition (`HomePage` sections: hero, about, projects, contact). |
| Layout | `src/components/3-layout/` | Chrome: `SiteShell` (skip link + nav + main), `PageBackdrop` (space canvas + fog + cursor), `HashSection`, `ErrorBoundary`. |
| Modules | `src/components/2-module/` | Feature UI: Navigation, Hero, About, ProjectsBlock / ProjectShowcase, ContactForm, SpaceCanvas / planets, BlogList, project visuals (including MapLibre `TransitVisual`). |
| Compositions | `src/components/1-composition/` | Reusable widgets built from primitives (no feature copy). |
| Primitives | `src/components/0-primitive/` | Thin wrappers around vendor/HTML. |
| Vendor | `src/vendor/` | Re-exports and wrappers for MUI, icons, motion, `next/link`, Three.js / R3F, MapLibre. |
| Content | `src/content/` | Typed site copy. Edit here rather than hardcoding strings in components. |
| Blog IO | `src/lib/blog/` | Zod frontmatter (`schema.ts`), filesystem (`fs.ts`), `listPublished` / `getPost`. |
| Theme | `src/theme/` | Dark MUI theme. Canonical colors/fonts live in `src/app/globals.css` `@theme`; keep `src/theme/tokens.ts` in sync. |

Lower atomic tiers must not import higher tiers. Tests under `**/*.test.{ts,tsx}` and `src/test/**` are ignored by boundaries.

## Key Technical Concepts

1. **Vendor isolation** — Feature code must not import `@mui/*`, `@emotion/*`, `framer-motion`, `three`, `@react-three/*`, `maplibre-gl`, `react-map-gl`, or `react-router-dom`. Use `@/vendor` (or `@/components/0-primitive`). ESLint `no-restricted-imports` enforces this; `src/vendor/**` is exempt. Router is Next.js (`@/vendor/router` re-exports `next/link` and `next/navigation` hooks).

2. **Atomic import graph** — ESLint `boundaries/element-types` is deny-by-default. Typical allow list: primitives → vendor/theme; compositions → primitives; modules → compositions + content/hooks/lib; layout → modules (not content); pages → layout + content/lib; `src/app` → vendor, theme, layout, page.

3. **Git-based MDX blog** — Posts are `content/blog/*.mdx` with Zod frontmatter (`title`, `description`, `date`, `tags`, optional `draft` / `cover`). `draft: true` posts are parsed but omitted from `listPublished`, `getPost` (returns `null` → `notFound()`), sitemap, and RSS. Rendering uses `next-mdx-remote/rsc` plus `rehype-pretty-code` (`github-dark`) in `BlogPostPage/mdx.tsx`.

4. **Netlify contact** — `public/__forms.html` is a static `name="contact"` form (`data-netlify`, honeypot `bot-field`) so Netlify can register the form at deploy time. Runtime POST goes `ContactForm` → `submitContact` (`src/lib/netlifyForm.ts`) → `/__forms.html`. Do not put `data-netlify` in React; `@netlify/plugin-nextjs` v5 fails the build if it finds those attributes without a public HTML form.

5. **WebGL backdrop and a11y** — `PageBackdrop` mounts `SpaceCanvas` (dynamic, `ssr: false`). Reduced motion or missing WebGL uses `WebGlFallback`; planets are not hidden on mobile — quality drops instead. Custom cursor only when `useFinePointer()` (`pointer: fine`). Mobile (`useMedia('md')`, 768px): 250 twinkle points (800 desktop), 2 meteors (6), DPR `[1, 1]` (`[1, 1.5]` desktop), planet segments ~28 (~56 desktop). Planet texture credit: `public/textures/ATTRIBUTION.md`.
