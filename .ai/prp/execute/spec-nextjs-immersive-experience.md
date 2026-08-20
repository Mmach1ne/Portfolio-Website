> Ingest this file, implement the Low-Level Tasks in order, and generate the code that satisfies the High and Mid-Level Objectives. Do not skip validation gates. Do not keep Vite / `react-router-dom` / CSS-planet wrappers alive after the delete task. This spec **supersedes** the out-of-scope list in `.ai/prp/execute/spec-typescript-atomic-redesign.md` for Next.js, Tailwind, Three.js, and a markdown blog. **Auth is out of scope** (user decision). It does **not** reopen that spec’s completed atomic/vendor work — it migrates and extends the current TypeScript tree.

# SPEC: Next.js Immersive Experience

**Status:** Ready to execute  
**Repo:** Portfolio-Website (`https://rayxueportfolio.com`)  
**Date:** 2026-08-20  
**Predecessor:** `.ai/prp/execute/spec-typescript-atomic-redesign.md` (executed; current tree is the Vite + MUI + atomic SPA)  
**Source of truth for current code:** `.ai/AGENTS.md` plus the files listed in Beginning context (inspected, not assumed)

---

## High-Level Objective

Migrate the portfolio from a Vite SPA to a **Next.js App Router** site that keeps the dark space identity (`#0a0a0a`, mint `#64ffda`, Intro Rust Line) but makes it **stylistically sharper and more interactive**: Tailwind token layer, stronger button/highlight chrome, a **Three.js** backdrop (twinkling stars, recurring shooting stars, four planets copied from open-source R3F/planet patterns and tinted to the existing CSS planet palettes — **on desktop and mobile**), and a **git-based MDX blog**. Each of the seven projects gets a **custom interactive widget** (moving transit map, thermal sim stats, clothing-ML trainer sliders + code, and similarly alive visuals for STM32 / Harmoni / Raybot / Audiolog).

Success means: `pnpm lint`, `pnpm lint:type`, `pnpm test`, and `pnpm build` all pass; Netlify deploys as Next.js (no SPA `/* → /index.html` fallback); home still reads hero → about/skills → seven projects → contact; `/coming-soon` and `/blog` work; `draft: true` posts are omitted from the public site (git-only; no login); WebGL scene is behind content (`pointer-events: none`) with a 2D fallback; planets render on phone-width with a mobile quality profile; no `@mui/*`, `framer-motion`, `three`, `@react-three/*`, `maplibre-gl`, or `react-map-gl` imports outside the documented vendor/app exceptions.

---

## Mid-Level Objective

1. **Framework cutover** — Next.js App Router (latest stable 15/16 at execute), pnpm, TypeScript strict. Delete Vite, `index.html` bootstrap, `react-router-dom`. Netlify OpenNext runtime. Contact form still posts.
2. **Tailwind + MUI coexistence** — Tailwind v4 owns layout, motion utilities, and highlight states. MUI stays wrapped in `src/vendor/mui` for inputs/a11y. One CSS-variable token set feeds both. Site does not look like default Material or default Tailwind gray.
3. **Chrome upgrade** — Buttons, chips, nav active states, and project CTAs get mint-forward hover/focus/active treatments. Hash nav works from `/blog` (`/#about`, not `#about`).
4. **MDX blog** — `/blog`, `/blog/[slug]`. Posts are `content/blog/*.mdx`. `draft: true` is excluded from list/sitemap/RSS (publish by flipping the flag and committing). No auth, `/login`, or `/admin`.
5. **Space scene** — One R3F canvas: seeded twinkling stars, pooled shooting stars, four planets (earth / yellow-ring / ice / gas) matching current palettes, **visible on mobile** with a lower quality profile. CSS full-viewport planet demos are deleted.
6. **Project widgets** — Replace static `WindowChrome` mocks with per-project interactive modules (map, sliders, charts, terminals). Visible on mobile in a compact form. Honor `prefers-reduced-motion`.
7. **Production bar** — Tests for blog parser, contact, widgets (reduced-motion). Attribution for CC-BY textures. `.ai/AGENTS.md` + `README.md` rewritten for the Next tree.

---

## State Documentation

```yaml
current_state:
  files:
    - package.json              # vite, react-router-dom, MUI 7, no next/three/tailwind
    - vite.config.ts
    - index.html                # SEO + hidden Netlify form
    - netlify.toml              # SPA 200 to /index.html
    - src/main.tsx
    - src/app/App.tsx           # Routes / and /coming-soon (not Next.js app dir)
    - src/app/providers.tsx     # Theme + BrowserRouter
    - src/theme/*               # tokens + MUI theme + Emotion GlobalStyles
    - src/vendor/mui|motion|router
    - src/components/0-primitive … 4-page
    - src/components/2-module/PlanetEarth|Ring|Ice|Gas/*.module.css
    - src/components/2-module/StarField/StarField.tsx
    - src/components/2-module/ShootingStars/ShootingStars.tsx  # two SVG paths
    - src/components/2-module/projectVisuals/*Visual.tsx       # static chrome
    - src/content/projects.ts|nav.ts|site.ts
    - no content/blog, no auth, no app/layout.tsx
  behavior: |
    Vite + React 19 + react-router-dom 7 SPA. Hash sections #home #about
    #projects #contact. PageBackdrop stacks StarField (~60 seeded SVG stars
    with SMIL twinkle), two looping SVG comets, four lazy CSS planets with
    framer-motion scroll fade, fog, custom cursor. ProjectShowcase hides
    visuals below 768px (ProjectShowcase.tsx isMobile branch). Contact POSTs
    urlencoded form-name=contact via src/lib/netlifyForm.ts. Buttons: primary
    is transparent white-glow (vendor/mui/Button.tsx); secondary is mint
    outline. No blog, no auth, no WebGL.
  issues:
    - Planet CSS modules are leftover full-page demos: PlanetEarth.module.css
      .wrapper is width/height 100vw/100vh; same pattern in PlanetIce/PlanetGas
      :root and * rules. Planets fight the layout instead of sitting as orbs.
    - ShootingStars.tsx is two fixed paths, not a pool of meteors that appear.
    - StarField twinkles via SMIL <animate>; count capped but look is flat.
    - Project visuals are WindowChrome + MetricBar/CodeBlock with static %.
      TransitVisual is not a map. ThermalVisual is two Text nodes.
      ClothingMlVisual is four frozen code lines (the “AI trainer”).
    - CodeBlock keys lines by string and uses indexOf for numbers (wrong on dupes).
    - Nav hrefs are #home etc. (nav.ts) — they will not reach home sections from /blog.
    - vendor/mui/Link is MUI <a>, not a client-side router. Hash-only SPA hid this.
    - netlify.toml SPA fallback will break Next.js blog/contact routes if left in place.
    - No Tailwind; almost all layout is MUI sx. Primary button glow is white, not mint.
    - Planets gated off mobile in PlanetScene.tsx:36 (`isMobile || reducedMotion || !finePointer`).
    - AGENTS.md/README still describe Vite SPA as current (accurate today, stale after this spec).

desired_state:
  files: |
    See Ending context. Next.js src/app routes. Tailwind globals + @theme tokens.
    vendor/three, vendor/map, vendor/router → next/link.
    content/blog/*.mdx. public/textures/planets + ATTRIBUTION.md.
    Interactive projectVisuals. No vite.config.ts, no src/main.tsx, no CSS planet 100vw wrappers.
    No auth.ts, middleware, /login, /admin, next-auth.
  behavior: |
    Same content and visual brand, richer motion. / /coming-soon /blog /blog/[slug].
    Space canvas behind marketing pages on all viewports: stars, meteors, planets
    (mobile uses the quality profile below). Widgets play on md+ and a compact
    version on small screens. draft: true posts never appear in public routes.
    Contact still succeeds on Netlify. Reduced-motion: static stars, no meteors,
    no planet spin, widgets freeze at rest poses. Custom cursor still fine-pointer only.
  benefits:
    - Real routes (blog) instead of a two-route SPA
    - Space background that feels alive on phone and desktop
    - Projects demonstrate themselves instead of screenshot-like chrome
    - One token pipeline (CSS variables) for Tailwind + MUI
    - Type-safe MDX frontmatter; no hosted CMS; no auth surface to maintain
```

---

## Implementation Notes

### Locked stack (do not reopen during execute)

| Area | Choice | Why |
|------|--------|-----|
| Package manager | **pnpm** (already `packageManager: pnpm@10.12.1`) | User requirement; already done |
| Language | **TypeScript** strict, `noUncheckedIndexedAccess`, keep `verbatimModuleSyntax` where Next allows | Current tsconfig.app.json |
| Runtime | **Node 22** (`.nvmrc`) | Keep |
| Framework | **Next.js App Router**, latest stable at execute (15.x or 16.x). **Not** `output: 'export'` | User requirement; contact route handler + MDX. Netlify OpenNext supports App Router. **No Auth.js** |
| UI | **React 19** (already) | Keep |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme`) **and** **MUI** via vendor | User asked for both. Tailwind for layout/highlights; MUI for fields/a11y |
| Motion | Keep **framer-motion** via `src/vendor/motion` for scroll/fog/in-view | Already wired in PlanetScene/PageFog |
| 3D | **three** + **@react-three/fiber** + **@react-three/drei** via `src/vendor/three` | User requirement; previous spec removed unused copies — this spec uses them for real |
| Maps | **maplibre-gl** + **react-map-gl/maplibre** via `src/vendor/map`. Tiles: **OpenFreeMap** dark style, no token | Bus tracker widget |
| Auth | **None** | User: remove it. Drafts are git frontmatter only |
| Blog | Git **MDX** in `content/blog/`. `gray-matter` + `next-mdx-remote/rsc` + `rehype-pretty-code` (Shiki) | User asked for markdown blog, not a hosted CMS (CMS stays out of scope) |
| Quality | Biome + ESLint boundaries + Vitest | Keep; extend restricted-imports |
| Deploy | Netlify **auto** Next adapter (OpenNext). Build `pnpm build`. **Delete** SPA rewrite | Current host |

Install **latest stable** of new packages at execute time; pin in `pnpm-lock.yaml`.

**Add dependencies:** `next`, `@mui/material-nextjs`, `tailwindcss` `@tailwindcss/postcss` `postcss`, `three` `@react-three/fiber` `@react-three/drei`, `maplibre-gl` `react-map-gl`, `gray-matter` `next-mdx-remote` `rehype-pretty-code` `shiki` `reading-time` `zod`

**Do not add:** `next-auth`, `@auth/*`, any OAuth SDK

**Add types:** `@types/three`, `@types/maplibre-gl` if not bundled

**Remove:** `vite`, `@vitejs/plugin-react`, `vite-plugin-sitemap`, `vite-plugin-compression2`, `react-router-dom`, `terser` (unless still used)

**Keep:** `react`, `react-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `framer-motion`, biome, eslint stack, vitest, testing-library, happy-dom

### Visual identity (preserve, then sharpen)

Copy tokens from `src/theme/tokens.ts` into CSS variables (single source, then MUI `createTheme` reads the same numbers):

- Background `#0a0a0a`, text `#fff`, accent `#64ffda`, error `#ff6b6b`, muted `#6b7280`
- Display: Intro Rust Line (`/fonts/IntroRust-Line.otf`) via `next/font/local` + `@font-face` fallback
- Body: Inter via `next/font/google`
- Hero copy unchanged (`src/content/site.ts`)
- Do **not** replace Intro Rust Line
- Do **not** invent new project claims; widget numbers may animate but must asymptote to copy already in `projects.ts` (e.g. Clothing ML 94%)

**Button / highlight upgrade (user-requested):** replace white glow primary in `src/vendor/mui/Button.tsx`.

| Variant | Rest | Hover | Focus-visible | Active |
|---------|------|-------|---------------|--------|
| `primary` | transparent, mint 1px border, mint label, Intro Rust | fill `rgba(100,255,218,0.14)`, glow `0 0 24px rgba(100,255,218,0.45)` | 2px mint ring offset 2 | scale `.98` |
| `secondary` | mint outline, mint label | **solid mint** fill, label `#0a0a0a` | same ring | scale `.98` |
| `ghost` | no border, 70% white | 100% white + `rgba(100,255,218,0.08)` fill | same ring | scale `.98` |
| `demo` (new) | violet-mint gradient border (`#64ffda` / `#a78bfa`) | brighter glow | same ring | scale `.98` |

Project links: `github`/`pdf` → `secondary`; `demo` → `demo`; hero CTA → `primary`. Tech chips: hover mint border + `text-accent`. Nav active: keep mint underline (`NavItem.tsx`) and add a soft mint text-shadow on active.

Disable MUI ripple/elevation (already in `src/theme/theme.ts`). No purple default Material.

### Vendor wrapper rule (extended, non-negotiable)

```
src/vendor/
  mui/          ← @mui/*, @emotion/*, @mui/material-nextjs
  icons/
  motion/       ← framer-motion
  router/       ← next/link, next/navigation (NOT react-router-dom)
  three/        ← three, @react-three/fiber, @react-three/drei
  map/          ← maplibre-gl, react-map-gl
  styled.ts
```

**Forbidden in `src/components/**`, `src/content/**`, `src/hooks/**`, `src/lib/**`, `src/theme/**`:**

- `@mui/material`, `@mui/icons-material`, `@emotion/*`
- `framer-motion`
- `react-router-dom` (must be gone entirely)
- `three`, `@react-three/fiber`, `@react-three/drei`
- `maplibre-gl`, `react-map-gl`
- `next-auth`, `next-auth/react` (must not appear anywhere)

**Exceptions (framework glue, not style leakage):**

| Location | Allowed extra imports |
|----------|------------------------|
| `src/vendor/**` | the packages listed above |
| `src/app/**` route files | `next`, `next/font`, `next/image`, `next/navigation` for `metadata` / `generateStaticParams` / `notFound` |
| `src/lib/blog/**` | `gray-matter`, `next-mdx-remote/rsc`, `rehype-pretty-code` (content pipeline, not UI chrome) |

`react` / `react-dom` stay direct.

ESLint `no-restricted-imports` must be updated. `eslint-plugin-boundaries`: add elements `three-vendor` is unnecessary — keep `vendor` covering all of `src/vendor/**`. Add `app` pattern `src/app/**` (Next routes). Current `src/app/App.tsx` **moves** — see Task 1.

### Atomic tiers (keep)

Same `0-primitive` → `4-page` one-way imports as `.ai/AGENTS.md`. Next.js `src/app/page.tsx` files are **thin**: they render `4-page` components. Pages still must not import `@mui` or `three` directly.

New primitives/compositions allowed when a later task needs them (`Slider`, `Sparkline`, `HeatMapCanvas`, `WaveformCanvas`, `Typewriter`). Do not dump widget business copy into primitives.

### Next.js app directory vs current `src/app/`

**Collision:** today `src/app/` is a React SPA folder (`App.tsx`, `providers.tsx`, `ErrorBoundary.tsx`), not App Router.

**Task 1 must:**

1. MOVE `ErrorBoundary.tsx` → `src/components/3-layout/ErrorBoundary/` (or keep under `src/components/4-page` — prefer layout)
2. MOVE providers into `src/app/providers.tsx` as a **`'use client'`** tree: `AppRouterCacheProvider` + `StyledEngineProvider injectFirst` + MUI ThemeProvider. **No SessionProvider.**
3. CREATE `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/coming-soon/page.tsx`, `src/app/globals.css`
4. DELETE `src/app/App.tsx`, `src/main.tsx`, `index.html`, Vite configs

Root layout owns: fonts, metadata (from `src/content/site.ts`), skip-link-safe body classes, hidden Netlify `<form name="contact">` for detection. **Mount `PageBackdrop` in `SiteShell`** so home, blog, and coming-soon share the space scene.

### Tailwind + MUI (how they share the page)

1. `StyledEngineProvider injectFirst` so **Tailwind can override MUI**
2. `@mui/material-nextjs/v15-appRouter` `AppRouterCacheProvider` (use the package’s current App Router export if v16-named)
3. **One reset:** Tailwind v4 preflight. **Stop using MUI CssBaseline as a second global reset** — migrate `src/theme/globalStyles.ts` (`@font-face`, body, skip-link) into `src/app/globals.css`. ThemeProvider keeps `createTheme` only.
4. Tokens in `globals.css`:

```css
@theme {
  --color-bg: #0a0a0a;
  --color-fg: #ffffff;
  --color-accent: #64ffda;
  --color-error: #ff6b6b;
  --font-display: "Intro Rust Line", sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --breakpoint-md: 768px;
}
```

5. New layout uses `className` (Tailwind). Existing `sx` may remain until a file is touched; **any file you edit for chrome/widgets must land on tokens + Tailwind** rather than adding more one-off `sx` colors.

### Auth — deleted from this spec

Do **not** add Auth.js, NextAuth, OAuth apps, `src/middleware.ts`, `/login`, `/admin`, `vendor/auth`, or `AUTH_*` env vars. There is nothing to protect on a public portfolio plus git-based blog.

### Markdown blog

`content/blog/*.mdx` frontmatter (zod-validated):

```ts
{
  title: string
  description: string
  date: string        # ISO date
  tags: string[]
  draft?: boolean
  cover?: string      # /path in public
}
```

Routes: `/blog` index (sorted date desc), `/blog/[slug]`. MDX components map to primitives (`Text`, `Link`, `CodeBlock` / pretty-code). Reading time shown. RSS: `src/app/feed.xml/route.ts`. Sitemap: `src/app/sitemap.ts` includes `/`, `/blog`, each **published** slug, `/coming-soon`.

**Drafts (no auth):** `draft: true` → omit from `listPublished`, `generateStaticParams`, sitemap, RSS. Visiting `/blog/[slug]` for a draft `notFound()`. To publish, set `draft: false` (or omit) and commit. Optional: `next dev` may include drafts if `INCLUDE_DRAFTS=true` — **production never does**.

**Starter posts (do not invent a fake career essay):**

1. `hello.mdx` — short intro using existing `site.about.bio` meaning
2. `thermal-dynamics.mdx` — restates `projects.ts` thermal description + link to `/ThermalDynamic.pdf`

That is enough to prove the pipeline. Do not add a CMS, comments, or i18n.

### Three.js space scene — copy from open source, tint to this site

**Do not write a planet renderer from a blank shader.** MIRROR proven MIT patterns, then **re-skin**.

| Piece | Copy from (license) | Adapt |
|-------|---------------------|--------|
| Canvas / `useFrame` / `useTexture` / `Float` | `@react-three/fiber` + `@react-three/drei` (MIT, pmndrs) | Wrap re-exports in `src/vendor/three` |
| Earth layers (day map, cloud sphere, fresnel atmosphere, reduced-motion pause) | [yuvrajraina/tinyearth](https://github.com/yuvrajraina/tinyearth) (MIT) — **copy the layer idea**, do not add the npm package | Diameter ~180–240px world units mapped to ~18–22vh; colors pulled toward `--earth-blue #208bd2`, land bias `#45cb69`, aura `#10329b` from `PlanetEarth.module.css` |
| Other planets + ring geometry | [jjteoh-thewebdev/r3f-solar-system](https://github.com/jjteoh-thewebdev/r3f-solar-system) (MIT) sphere + ring mesh | **Ring planet:** yellow body `#fdd835` / `#f9a825`, ring `#ffd54f` (`PlanetRing.module.css`). **Ice:** Neptune `#1e3a8a` / `#3b82f6`, aura `#1e40af`. **Gas:** Jupiter bands `#fbbf24` / `#d97706`, red spot `#dc2626` (`PlanetGas.module.css`) |
| Textures | [Solar System Scope 2k](https://www.solarsystemscope.com/textures/) **CC BY 4.0** (credit required) and/or NASA Blue Marble (public domain, as tinyearth does) | Convert to **webp ≤1024px** wide; store in `public/textures/planets/`; list sources in `public/textures/ATTRIBUTION.md` **and** footer caption |
| Distant star field | drei `<Stars>` | Low opacity, behind everything |
| **Twinkling** stars | Custom `Points` + shader: per-vertex phase from `mulberry32` (`src/lib/seededRandom.ts`, seed `42` to match current StarField). Opacity `0.25–1` oscillation. Three size classes | This is what current SMIL does; do it in the shader. **Do not** `Math.random()` in render |
| **Shooting stars** | drei `<Trail>` ([docs](http://drei.docs.pmnd.rs/abstractions/trail), MeshLine, inspired by TheSpite Codevember 2021 #9) | **Pool of 4–8 meteors.** Each sleeps a seeded 2–9s, spawns at random upper-left, travels +x/−y across the far plane (`z` behind planets), fades, recycles. Width thin, color white → mint tail. `prefers-reduced-motion` or `document.hidden` → pool disabled |

**Scene graph (single Canvas, `gl={{ alpha: true, antialias: true }}`, `dpr={[1, 1.5]}`, `frameloop` always unless reduced-motion then `never`):**

1. Twinkle points + dim `<Stars>` (z far)
2. Meteor pool (z mid-far)
3. Four planet groups at the same screen anchors as `PlanetScene.tsx` today (`top 10% left 5%`, `top 25% right 5%`, `top 45% left 10%`, `top 65% right 10%`) — implement with `viewport` + percentage or drei `Html`/manual projection. Scroll fade **COPY** ranges from `PlanetScene.tsx` (`useTransform` `[200,600]`, `[800,1200]`, `[1600,2000]`, `[2400,2800]`)
4. Fog stays CSS/motion in `PageFog` (do not also fog the GL scene heavily)

**Mounting:** `next/dynamic(..., { ssr: false })` from `PageBackdrop`. `pointer-events: none`. z-index `tokens.zIndex.stars` (0); main stays 20.

**Gating (planets on mobile — locked):**

Current `PlanetScene.tsx:36` returns null when `isMobile || reducedMotion || !finePointer`. **Change:** do **not** hide planets for viewport width or coarse pointer. CSS planets were full-viewport demos; R3F orbs at ~14–18vh on a phone are cheap if quality is scaled.

Hide the **whole Canvas** only when `prefers-reduced-motion` (2D static star fallback) or WebGL is unavailable.

| Knob | Desktop (`min-width: 768px`) | Mobile |
|------|------------------------------|--------|
| Twinkle points | 800 | 250 |
| Distant drei Stars | 1000 | 400 |
| Meteors | 6 | 2 |
| Planet texture long edge | 1024 webp | **512** webp (`earth-sm.webp` etc. or `anisotropy`/size in `useTexture`) |
| Sphere segments | 48–64 | 24–32 |
| `dpr` | `[1, 1.5]` | **1** (`AdaptiveDpr` from drei) |
| `antialias` | true | false |
| Planet on-screen size | ~18–22vh | ~12–16vh, same percentage anchors |

**Safety net (keep FPS honest):** wrap the scene in drei `PerformanceMonitor`. If average FPS stays `< 28` for a few seconds, drop planet maps to unlit vertex-colored spheres (keep silhouettes + spin) before ever unmounting planets. Do not start with planets-off-on-mobile.

Custom cursor stays `pointer: fine` only (`CustomCursor.tsx`).

**DELETE after 3D lands:** `PlanetEarth/Ice/Gas/Ring` CSS modules’ `100vw` demo chrome, unused `.header` blocks, `:root` leaks. Do not leave duplicate `id="bg"` (already gone — keep it gone).

### Project widgets (highly custom)

`ProjectShowcase.tsx` currently **skips visuals on mobile**. **Change:** always show the visual; on `<md` use a shorter height (`min-h-[220px]`) and disable map drag / heavy canvas DPR.

All widgets: `prefers-reduced-motion` → static rest pose (no rAF loops). Pause loops when off-screen (`IntersectionObserver`). No hardcoded GitHub URLs (still from `content`).

Shared compositions to CREATE before per-project work: `Slider`, `Sparkline`, `StatGrid`, `Typewriter`, `EqualizerBars`, `HeatMapCanvas`, `WaveformCanvas`.

| visual | Widget behavior |
|--------|-----------------|
| `stm32` | GPIO pin grid pulsing; UART `Typewriter` of keystrokes; SVG oscilloscope polyline; MetricBars **animate** toward current 85/100 |
| `clothingMl` | **AI trainer:** left `CodeBlock` (fix line keys — use index; optional blink cursor); sliders **epochs / learning rate / batch**; SVG loss+accuracy curves that re-run toward **94%** accuracy when sliders change; Fashion-MNIST class chips with moving confidence |
| `harmoni` | Chat bubbles staggered in; `EqualizerBars`; track progress slider (display-only) |
| `thermal` | **Simulation stats:** `HeatMapCanvas` heatsink false-color; slider fan RPM 0–100 lerps T_max / T_avg / CFM; `Sparkline` of temperature; labels only, **no new scientific claims** beyond existing paper copy |
| `raybot` | Terminal `Typewriter` of the current four lines then loop; memory slots lighting; token sparkline |
| `transit` | **Moving map:** MapLibre, OpenFreeMap dark, center **University of Waterloo** `[43.4723, -80.5449]`. Hardcoded GeoJSON loop (campus / University Ave — not a live GTFS scrape). 3–5 bus markers interpolate along the line at seeded speeds. Overlay Route 13 + GPS/fleet stats (can tick ±2%). `scrollZoom: false`. Reduced-motion: static markers |
| `audiolog` | `WaveformCanvas` time-domain bars; VU MetricBars; scrolling caption ticker |

Do not call real UW transit APIs (CORS, keys, flakiness). Simulated telemetry is the feature.

### Contact + Netlify after Next.js

Keep `encode` + `submitContact` contract (`form-name=contact`, fields `name|email|message`).

- Hidden form in **root layout** (Netlify detection on prerendered HTML)
- `submitContact` may POST `/` **or** `POST /api/contact` which forwards the same urlencoded body — pick one and test. If Next.js middleware intercepts `/` POST, **must** use the route handler
- **DELETE** from `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Replace `[build]` with `command = "pnpm build"` and do **not** force `publish = "dist"`. Let Netlify’s Next adapter own `.next`. Node 22 in Netlify env / `engines`.

### Performance rules

- Seed all decorative randomness (`mulberry32`)
- Texture webp, max 1024 on the long side
- One WebGL context total
- `dpr` 1 on mobile, `[1, 1.5]` desktop (`AdaptiveDpr`)
- Mobile stars ≤ 250; planet textures 512px; sphere ≤ 32 segments
- Pause GL `frameloop` when `document.hidden` or canvas off-screen
- Dynamic import Canvas and MapLibre
- No `getElementById('bg')` star injection (already removed — keep)
- Custom cursor: `pointer: fine` only (current `CustomCursor.tsx`) — **not** a reason to hide planets

### Coding standards

- SOLID / KISS / DRY / YAGNI from `.ai/AGENTS.md`
- No `any`. No `eslint-disable` without a one-line reason
- Named exports. One component per folder
- `rel="noopener noreferrer"` on external links (primitive `Link` already)
- Do not commit `.env.local` or raw multi-MB textures
- Do not add auth, i18n, analytics pixels, comments, a hosted CMS, or extra projects

### Scripts (`package.json`)

```
dev            next dev
build          next build
preview        next start
start          next start
lint           biome check . && eslint .
lint:fix       biome check --write . && eslint . --fix
lint:type      tsc --noEmit
format         biome format --write .
test           vitest run
test:watch     vitest
```

### Path alias

Keep `@/*` → `src/*`. Next `tsconfig` `paths` + plugin.

---

## Context

### Beginning context

Inspected and present at spec time:

**Root:** `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `biome.json`, `index.html`, `netlify.toml`, `README.md`, `.gitignore`, `.nvmrc`, `.ai/AGENTS.md`, `.ai/prp/execute/spec-typescript-atomic-redesign.md`

**Entry / SPA app:** `src/main.tsx`, `src/app/App.tsx`, `src/app/providers.tsx`, `src/app/ErrorBoundary.tsx`, `src/vite-env.d.ts`

**Theme / vendor / content / lib / hooks:** `src/theme/*`, `src/vendor/**`, `src/content/{site,nav,skills,projects,social,index,*.test}.ts`, `src/lib/{netlifyForm,scroll,seededRandom}*`, `src/hooks/*`, `src/test/setup.ts`

**UI:** `src/components/0-primitive/**`, `1-composition/**`, `2-module/**` (including CSS planet modules and static `projectVisuals`), `3-layout/**`, `4-page/**`

**Public:** `public/Logos/*`, `public/fonts/IntroRust-Line.otf`, PDFs, `rocket.png`, `robots.txt`, `sitemap.xml`, GSC html

### Ending context

```
Portfolio-Website/
├── .nvmrc                          # 22
├── .gitignore                      # + .next
├── biome.json
├── eslint.config.js                # restricted imports extended
├── next.config.ts
├── netlify.toml                    # no SPA fallback
├── package.json                    # next scripts; no vite
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json                   # Next
├── vitest.config.ts
├── content/blog/
│   ├── hello.mdx
│   └── thermal-dynamics.mdx
├── public/
│   ├── fonts/IntroRust-Line.otf
│   ├── Logos/
│   ├── textures/planets/*.webp
│   ├── textures/ATTRIBUTION.md
│   ├── STM32Comms.pdf
│   ├── ThermalDynamic.pdf
│   └── rocket.png
├── .ai/AGENTS.md                   # rewritten
└── src/
    ├── mdx-components.tsx          # if required by chosen MDX path; else map in lib/blog
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── providers.tsx           # client
    │   ├── page.tsx                # HomePage
    │   ├── coming-soon/page.tsx
    │   ├── blog/page.tsx
    │   ├── blog/[slug]/page.tsx
    │   ├── api/contact/route.ts    # if POST / is unreliable
    │   ├── feed.xml/route.ts
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── content/                    # site, nav (+ blog), skills, projects, social
    ├── theme/                      # tokens + createTheme (no CssBaseline global reset)
    ├── vendor/                     # mui, motion, router(next), three, map, icons
    ├── components/                 # atomic tiers; 3D modules; widgets
    ├── lib/blog/                   # listPosts, getPost, schema
    ├── lib/netlifyForm.ts
    ├── lib/seededRandom.ts
    └── test/setup.ts
```

**Deleted by the end:** `vite.config.ts`, `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/vite-env.d.ts`, `tsconfig.app.json` / `tsconfig.node.json` if absorbed, `react-router-dom`, CSS-planet `100vw` demo styles, two-path `ShootingStars` SVG (replaced by R3F pool; 2D fallback may remain as `MeteorField2D`). `public/sitemap.xml` static file — replace with `src/app/sitemap.ts` (delete stale xml or regenerate). **Never create** `src/auth.ts`, `src/middleware.ts`, `/login`, `/admin`, or `vendor/auth`.

---

## Low-Level Tasks

> Ordered from start to finish. Each task is one execute prompt. Do not start task N+1 if task N validation failed.

### 1. REPLACE Vite with Next.js App Router (keep UI compiling)

```
Prompt: Cut the site from Vite + react-router to Next.js App Router without adding blog/3D yet. Home and /coming-soon must render the existing HomePage and ComingSoonPage. Preserve SEO metadata from index.html and src/content/site.ts.

CREATE:
  - next.config.ts
      transpilePackages: ['@mui/material','@mui/system','@mui/icons-material','@mui/material-nextjs']
      no output:'export'
  - postcss.config.mjs (can be empty of Tailwind until task 2 if needed; prefer adding Tailwind in task 2 immediately after if you batch 1–2)
  - src/app/layout.tsx
      metadata title/description/canonical/OG/Twitter from site.ts
      JSON-LD Person same as index.html:55–47 (GitHub Mmach1ne, LinkedIn ray-xue-uw)
      favicon /rocket.png
      hidden Netlify form (COPY index.html:55–59)
  - src/app/page.tsx            # render HomePage
  - src/app/coming-soon/page.tsx
  - src/app/providers.tsx       # 'use client'; ThemeProvider; no BrowserRouter
  - src/app/robots.ts
  - src/app/sitemap.ts          # /, /coming-soon, later blog

MOVE:
  - src/app/ErrorBoundary.tsx → src/components/3-layout/ErrorBoundary/

UPDATE:
  - package.json scripts (Implementation Notes); add next; remove vite plugins and react-router-dom
  - tsconfig for Next (jsx preserve, plugin next, paths @/*)
  - netlify.toml: DELETE spa redirect; build pnpm build
  - .gitignore: .next
  - src/vendor/router/index.ts: REPLACE react-router-dom with next/link + useRouter/usePathname/useSearchParams
      export { Link, useRouter, usePathname, useSearchParams }
      DELETE BrowserRouter, Routes, Route
  - src/vendor/index.ts: drop BrowserRouter/Route/Routes
  - src/vendor/mui/Link.tsx: MUI Link component={NextLink} for internal hrefs
  - Navigation / ProjectShowcase / 0-primitive Link: useNavigate() → useRouter().push
  - vitest.config.ts: keep alias; add next/font mocks if tests import layout

DELETE:
  - vite.config.ts, src/main.tsx, src/app/App.tsx, index.html, src/vite-env.d.ts

Details:
  - Hash sections stay ids on HomePage
  - Do not preventDefault on Next Link for /blog yet (task 4)
  - Keep pull-to-refresh guard only if you re-home it in a client hook; optional. Do not reintroduce hashchange preventDefault.

Validation:
  - command: pnpm install && pnpm lint:type
    expect: exit 0
  - command: pnpm build
    expect: exit 0, .next exists, no dist/ required
  - command: test ! -f vite.config.ts && test ! -f index.html
    expect: both gone
  - command: rg "react-router-dom" -g '!*.md' .
    expect: no matches in src/ or package.json deps
```

### 2. ADD Tailwind v4 and unify tokens

```
Prompt: Add Tailwind v4. Move global resets from theme/globalStyles.ts + CssBaseline into src/app/globals.css. Wire MUI AppRouterCacheProvider + StyledEngineProvider injectFirst. Tokens in @theme must match src/theme/tokens.ts.

CREATE:
  - src/app/globals.css
  - postcss.config.mjs with @tailwindcss/postcss

UPDATE:
  - src/app/layout.tsx import globals.css; next/font/local Intro Rust; next/font/google Inter; expose as --font-display / --font-body
  - src/app/providers.tsx: AppRouterCacheProvider + injectFirst + ThemeProvider
  - src/theme/ThemeProvider.tsx: remove CssBaseline + GlobalStyles (or CssBaseline enableColorScheme only — prefer remove)
  - src/theme/tokens.ts: comment that CSS variables are canonical; keep TS object in sync (duplicate numbers OK if both match)

Details:
  - md breakpoint 768
  - body bg #0a0a0a
  - skip-link styles from globalStyles.ts:22–33

Validation:
  - command: pnpm build
    expect: exit 0
  - command: rg "CssBaseline" src/theme src/app
    expect: unused or enableColorScheme-only
  - Visual: page still black, not white preflight flash
```

### 3. MODIFY buttons, chips, nav highlights

```
Prompt: Implement the button/highlight table in Implementation Notes. Hero, contact submit, project CTAs, tech chips, NavItem.

UPDATE:
  - src/vendor/mui/Button.tsx  # primary mint glow not white; add variant demo
  - src/components/0-primitive/Button/Button.tsx  # pass through demo
  - src/components/2-module/ProjectShowcase/ProjectShowcase.tsx  # demo kind → demo variant
  - src/components/1-composition/NavItem/NavItem.tsx  # stronger active
  - tech chips in ProjectShowcase: hover mint

Validation:
  - command: pnpm exec eslint src/vendor/mui/Button.tsx src/components/0-primitive/Button
    expect: pass
  - Manual: hero CTA mint glow; secondary fills mint on hover
```

### 4. MODIFY navigation for multi-route + ADD Blog item

```
Prompt: Hash links must work from /blog. Add Blog to content/nav.

UPDATE:
  - src/content/nav.ts  # discriminated hash vs route; add { id:'blog', label:'Blog', href:'/blog', kind:'route' }
  - src/components/2-module/Navigation/Navigation.tsx
      if pathname !== '/' then hash hrefs become /#home etc.
      Blog uses vendor Link (client nav)
  - src/components/2-module/Navigation/Navigation.test.tsx  # five labels including Blog
  - useHashSection: only spy when pathname is /

Validation:
  - command: pnpm test -- src/components/2-module/Navigation
    expect: pass
```

### 5. CREATE MDX blog pipeline

```
Prompt: Git-based MDX blog with zod frontmatter and pretty-code. Drafts excluded from public routes (no auth).

CREATE:
  - src/lib/blog/schema.ts
  - src/lib/blog/fs.ts           # listPostSlugs, readRaw
  - src/lib/blog/posts.ts        # listPublished, getPost(slug) — skip draft
  - src/lib/blog/posts.test.ts   # hello + thermal parse; draft omitted from listPublished
  - content/blog/hello.mdx
  - content/blog/thermal-dynamics.mdx
  - src/app/blog/page.tsx
  - src/app/blog/[slug]/page.tsx
  - src/app/feed.xml/route.ts
  - src/components/4-page/BlogIndexPage/
  - src/components/4-page/BlogPostPage/
  - src/components/2-module/BlogList/
  - MDX component map using 0-primitive Text/Link and WindowChrome for <pre>

UPDATE:
  - sitemap.ts include published slugs only
  - projects.test allowedHrefPattern unchanged unless you add /blog links

Details:
  - next-mdx-remote/rsc (not @next/mdx-as-pages unless you need mdx-components.tsx — prefer remote/rsc + folder of files)
  - Cover images optional
  - Do not invent extra posts
  - Do not create /admin, /login, or auth helpers

Validation:
  - command: pnpm test -- src/lib/blog
    expect: pass
  - command: pnpm build
    expect: /blog and /blog/hello prerender
  - command: rg "next-auth|Auth.js|/admin|/login" src content --glob '!*.md'
    expect: no matches
```

### 6. CREATE vendor/three + twinkling stars + shooting-star pool

```
Prompt: Add R3F vendor wrappers. Replace StarField SMIL + two SVG comets with one Canvas: seeded twinkle points + meteor Trail pool. 2D fallback if WebGL missing.

CREATE:
  - src/vendor/three/canvas.ts      # Canvas, useFrame, useThree, useLoader
  - src/vendor/three/drei.ts        # Stars, Trail, useTexture, Float, AdaptiveDpr, PerformanceMonitor
  - src/vendor/three/index.ts
  - src/components/2-module/SpaceCanvas/   # dynamic ssr:false wrapper
  - src/components/2-module/TwinkleStars/  # shader points, mulberry32 seed 42
  - src/components/2-module/MeteorPool/    # 4–8 Trails, recycle
  - src/components/2-module/WebGlFallback/ # CSS/SVG stars + canvas meteors
  - src/lib/webgl.ts                 # isWebGLAvailable()

UPDATE:
  - PageBackdrop: SpaceCanvas instead of StarField+ShootingStars (keep PageFog, CustomCursor, planets slot)
  - eslint restricted-imports: three, @react-three/*

Details:
  - COPY Trail usage from drei docs (width/length/attenuation)
  - Meteors behind future planets (renderOrder / z)
  - Counts: 800 desktop twinkle, 250 mobile; meteor 6 desktop / 2 mobile
  - Export AdaptiveDpr + PerformanceMonitor from vendor/three (used in task 7)
  - reduced-motion: static twinkle, MeteorPool null; do not mount Canvas

Validation:
  - command: rg "from 'three'|from \"three\"|@react-three" src --glob '!src/vendor/**'
    expect: no matches
  - command: pnpm lint:type
    expect: pass
```

### 7. REPLACE CSS planets with R3F planets (open-source port)

```
Prompt: Port four planets to R3F meshes. MIRROR tinyearth layering for Earth and r3f-solar-system spheres/rings for the others. Tint to existing CSS variables. Download CC-BY / NASA webp textures. Keep PlanetScene scroll ranges.

CREATE:
  - public/textures/planets/*.webp
  - public/textures/ATTRIBUTION.md  # Solar System Scope CC BY 4.0 and/or NASA Blue Marble URLs
  - src/components/2-module/PlanetEarth3D/
  - src/components/2-module/PlanetRing3D/
  - src/components/2-module/PlanetIce3D/
  - src/components/2-module/PlanetGas3D/
  - UPDATE PlanetScene to compose 3D groups inside the same Canvas (not four extra Canvases)

UPDATE:
  - PageBackdrop / PlanetScene: one Canvas parent owned by SpaceCanvas; planets as children
  - SiteFooter: one line texture credit (required for CC BY)

DELETE:
  - PlanetEarth/Ice/Gas/Ring CSS modules and TSX DOM planets (after 3D works)
  - leftover .header / 100vw .wrapper

Details:
  - **Show planets on mobile.** Delete the PlanetScene.tsx:36 gate `isMobile || reducedMotion || !finePointer`.
    Keep reduced-motion as the only intentional hide (plus WebGL fallback).
  - Mobile quality profile from Implementation Notes (512 textures, 24–32 segments, dpr 1, smaller vh).
  - PerformanceMonitor: FPS < 28 → unlit colored spheres, not unmount.
  - Atmosphere fresnel COPY tinyearth idea; do not npm-install react-earth-lite
  - Ring spin ~10s matching PlanetRing.module.css animation
  - No OrbitControls (decorative, pointer-events none)

Validation:
  - command: rg "100vw" src/components/2-module/Planet
    expect: no matches
  - command: test -f public/textures/ATTRIBUTION.md
    expect: exists
  - command: pnpm build
    expect: exit 0
```

### 8. CREATE widget compositions (Slider, charts, canvases)

```
Prompt: Build shared 1-composition tools for project widgets. No project copy inside them.

CREATE under src/components/1-composition/:
  Slider            # wrap MUI Slider in vendor first (src/vendor/mui/Slider.tsx) — mint track
  Sparkline         # SVG path from number[]
  StatGrid          # label/value pairs
  Typewriter        # rAF or interval; reduced-motion shows full text
  EqualizerBars     # CSS/SVG bars
  HeatMapCanvas     # 2D canvas gradient grid
  WaveformCanvas    # seeded noise bars
  PinGrid           # boolean[] cells

UPDATE:
  - vendor/mui export Slider
  - CodeBlock: key by index not string; line numbers = index+1 (fix indexOf bug in CodeBlock.tsx:21-25)

Validation:
  - command: pnpm exec eslint src/components/1-composition src/vendor/mui/Slider.tsx
    expect: pass
  - command: pnpm test -- src/components/1-composition/CodeBlock   # add a small test for duplicate lines
    expect: pass
```

### 9. REPLACE TransitVisual with moving MapLibre map

```
Prompt: Interactive UW campus bus map. OpenFreeMap dark. Simulated buses. vendor/map only.

CREATE:
  - src/vendor/map/index.ts     # Map, Source, Layer, Marker from react-map-gl/maplibre; import maplibre css here
  - src/content/transitRoute.ts # GeoJSON LineString + stop names; coords around 43.4723,-80.5449
  - rewrite TransitVisual.tsx as map + overlay stats

UPDATE:
  - eslint restricted-imports maplibre-gl, react-map-gl
  - ProjectShowcase: do not hide this on mobile; disable drag on coarse pointer if needed

Details:
  - style URL https://tiles.openfreemap.org/styles/dark
  - 3–5 buses: progress 0–1 along line, speed from mulberry32
  - Route 13 label from current TransitVisual
  - No Mapbox token. No live GTFS.

Validation:
  - command: rg "maplibre-gl|react-map-gl" src --glob '!src/vendor/**'
    expect: no matches
  - command: pnpm lint:type
    expect: pass
```

### 10. REPLACE ThermalVisual with simulation stats

```
Prompt: Heatsink sim widget: heat map + fan RPM slider + stats + sparkline. Do not add new research claims.

REWRITE src/components/2-module/projectVisuals/ThermalVisual/

Details:
  - WindowChrome title ThermalDynamic.pdf (keep)
  - Slider 0–100 fan RPM
  - T_max/T_avg lerp (display). Sparkline history buffer cap 60
  - HeatMapCanvas cool blue → mint → amber
  - reduced-motion: static heatmap mid RPM

Validation:
  - command: pnpm lint:type
    expect: pass
```

### 11. REPLACE ClothingMlVisual with trainer (code + sliders)

```
Prompt: AI trainer widget: code snippet + epochs/lr/batch sliders + animating accuracy/loss + class confidences. Asymptote accuracy 94% to match projects.ts.

REWRITE ClothingMlVisual/

Details:
  - Keep a short FashionCNN snippet (current four lines OK; may add 2–3 lines, still illustrative)
  - Play/pause
  - Confidence bars for a few Fashion-MNIST labels
  - Sliders restart the toy curve

Validation:
  - command: pnpm lint:type
    expect: pass
```

### 12. REPLACE remaining project visuals (STM32, Harmoni, Raybot, Audiolog)

```
Prompt: Highly custom interactive widgets for the other four projects using compositions from task 8. Preserve titles from current files.

REWRITE:
  - Stm32Visual.tsx
  - HarmoniVisual.tsx
  - RaybotVisual.tsx
  - AudiologVisual.tsx

UPDATE:
  - ProjectShowcase.tsx: remove !isMobile visual skip; add compact class on useMedia('md')

Validation:
  - command: rg "isMobile" src/components/2-module/ProjectShowcase/ProjectShowcase.tsx
    expect: may still exist for compact layout, must still mount Visual
  - command: pnpm test
    expect: pass
```

### 13. UPDATE contact for Next.js + a11y/reduced-motion sweep

```
Prompt: Ensure Netlify form still works. Pause GL and widget rAF when hidden. Focus rings already mint.

CREATE or UPDATE:
  - src/app/api/contact/route.ts if POST / fails in Next
  - src/lib/netlifyForm.ts target URL
  - ContactForm.test.tsx still mocks fetch

UPDATE SpaceCanvas/MeteorPool/widgets: document.hidden and IntersectionObserver pause

Validation:
  - command: pnpm test -- src/lib/netlifyForm src/components/2-module/ContactForm
    expect: pass
  - command: rg "form-name" src/app/layout.tsx
    expect: hidden form present
```

### 14. DELETE leftovers + UPDATE docs

```
Prompt: Remove Vite-era files if any remain. Rewrite README and .ai/AGENTS.md for Next.js, vendor/three, vendor/map, blog paths, texture attribution, mobile planet quality profile. Do not describe Vite or auth as current.

DELETE leftovers: dist references, react-router types, CSS planet files, static public/sitemap.xml if replaced

UPDATE:
  - README.md
  - .ai/AGENTS.md
  - biome ignore .next

Validation:
  - command: rg "vite.config|react-router-dom|PortfolioMobile|BrowserRouter|next-auth|Auth.js" README.md .ai/AGENTS.md package.json
    expect: no current-implementation matches
  - command: ls content/blog/*.mdx
    expect: at least hello.mdx thermal-dynamics.mdx
```

### 15. Final gates

```
Prompt: Run the full quality bar and fix forward.

Validation:
  - command: pnpm lint
    expect: exit 0
  - command: pnpm lint:type
    expect: exit 0
  - command: pnpm test
    expect: exit 0
  - command: pnpm build
    expect: exit 0
  - command: rg "from '@mui/material'|from 'framer-motion'|from 'three'|from '@react-three|from 'maplibre-gl'|from 'next-auth'|from 'react-router-dom'" src --glob '!src/vendor/**'
    expect: no feature-code matches (app route files may import next/*)
  - command: test ! -f vite.config.ts && test ! -f index.html && test ! -f src/auth.ts && test ! -f src/middleware.ts
    expect: true
  - Manual:
      desktop home: twinkling stars, meteors appear, four planets on scroll, mint button hover
      all 7 widgets interact
      transit map moves
      /blog, /blog/hello
      /coming-soon
      contact submit
      width < 768: stars + meteors + **planets** (smaller), compact widgets, no custom cursor
      prefers-reduced-motion: no meteors/spin/loops; no WebGL canvas
```

---

## Implementation Strategy

**Order:** Next cutover (1) → Tailwind tokens (2) → chrome (3) → nav routes (4) → blog (5) → WebGL stars/meteors (6) → planets (7) → widget kit (8) → transit/thermal/trainer (9–11) → remaining widgets (12) → contact (13) → docs/delete (14) → gates (15).

**Dependency graph:** 1 before everything. 2 before 3. 4 before 5 (Blog nav). 6 before 7 (one Canvas). 8 before 9–12. 7 after 6 so planets share the scene. 14 after 7 (CSS planet delete).

**Parallel after 2:** 3 and 4. After 8: 9, 10, 11 can run in parallel. Do not parallelize 1, 7 (canvas parenting), or 14.

**Progressive enhancement:** After task 1 the site is deployable (plain home). 3D and widgets layer on. Do not merge to production until 15 if the Netlify SPA redirect has already been removed — remove redirect only when Next adapter is confirmed.

**Rollback:** Git revert the branch. Restore `netlify.toml` SPA rewrite only if rolling back to Vite. Keep `public/` binaries and `content/blog` if reverting 3D only.

**Cleanup after execute:** No `/tmp` texture zips. No unused CSS planet `:root`. No `console.log`. No second Canvas. No `package-lock.json`. No auth leftovers.

---

## Risks and Mitigations

| Risk | Mitigation | Go / no-go |
|------|------------|------------|
| Next.js + leftover SPA redirect 404s blog/contact | Delete `/* → /index.html` only with OpenNext; verify `/blog` and contact POST | No-go if `/blog` 404s on refresh |
| Netlify Forms undetectable on App Router | Hidden form in `layout.tsx`; route handler fallback | No-go if contact cannot POST |
| MUI + Tailwind double reset / white flash | One preflight; drop CssBaseline; `bg-bg` on body | No-go if first paint is light gray |
| Material look / white button glow remains | Task 3 table; disable ripple | No-go if primary still white-glows only |
| WebGL kills mobile FPS with planets on | Mobile quality table; AdaptiveDpr; 512 textures; PerformanceMonitor degrades maps before unmount; pause when hidden | No-go if scroll jank on a mid-tier phone **after** the quality profile is applied |
| CC-BY textures used without credit | ATTRIBUTION.md + footer | No-go if SSS textures ship without credit |
| Draft posts in sitemap/RSS | Filter `draft: true` always in production | No-go if `/blog` lists drafts |
| Mapbox-style paid tiles | OpenFreeMap only, no token | No-go if build requires MAPBOX_TOKEN |
| Seven widgets + R3F bundle size | dynamic import Canvas and MapLibre; next analyze if > budget | Warn if first load > 400kB JS gz; still ship, lazy below fold |
| Scope: auth/CMS/comments/i18n/live GTFS | Explicitly out | Reject those PRs in this spec |

---

## User Interaction Points (decisions already locked)

The user asked to pull in the previous spec’s out-of-scope items, then **dropped auth** and allowed **planets on mobile** if performance holds. These are **locked**:

1. **Next.js App Router** on Netlify (not Vite, not static export)  
2. **Tailwind v4 + wrapped MUI** (not Tailwind-only, not MUI-only)  
3. **No auth** — no Auth.js, OAuth, `/login`, `/admin`  
4. **MDX files in git** (two starter posts; `draft: true` omitted in production)  
5. **R3F planets on desktop and mobile**, copied from tinyearth + r3f-solar-system + SSS/NASA textures, **tinted** to current CSS palettes, with the mobile quality profile  
6. **Twinkle shader + meteor pool** (not two SVG comets)  
7. **Per-project widgets** including MapLibre transit, thermal sim, clothing-ML trainer sliders  
8. **Mint-forward buttons** (replace white primary glow)

If execute must choose anyway: prefer **one** WebGL context; prefer **OpenFreeMap** over Mapbox; prefer **next-mdx-remote/rsc** over a CMS; prefer **degrading planet textures** over hiding planets on mobile; prefer **deleting** CSS planet demos after 3D works.

---

## Out of scope

- Hosted CMS (Sanity/Contentful), Keystatic/Tina in-browser editors, comments, i18n  
- **Auth** (Auth.js, OAuth, sessions, `/login`, `/admin`)  
- Analytics pixels, changing domain, replacing Intro Rust Line  
- Adding/removing the seven projects or rewriting their claims  
- Live GTFS / real UW API, Mapbox paid tiles  
- Multiple WebGL canvases, OrbitControls playground, physics engines  
- Mobile custom cursor  
- Hiding planets solely because the viewport is `< 768px`  

---

## Quality Checklist

- [x] Current state fully documented (from inspected files, with path/line references)
- [x] Desired state clearly defined (ending tree + behavior)
- [x] All objectives measurable (lint/type/test/build + import grep + manual)
- [x] Tasks ordered by dependency
- [x] Each task has validation an AI can run
- [x] Risks identified with mitigations
- [x] Rollback strategy included
- [x] Integration points noted (Netlify OpenNext, Forms, OpenFreeMap, CC-BY textures, GSC/public assets)
