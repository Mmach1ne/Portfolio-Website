> Ingest this file, implement the Low-Level Tasks in order, and generate the code that satisfies the High and Mid-Level Objectives. Do not skip validation gates. Do not keep the old JS/CSS tree alive after Task 15.

# SPEC: TypeScript + Atomic Redesign

**Status:** Ready to execute  
**Repo:** Portfolio-Website (`https://rayxueportfolio.com`)  
**Date:** 2026-08-20  
**Source of truth for current code:** `.ai/AGENTS.md` plus the files listed in Beginning context (inspected, not assumed)

---

## High-Level Objective

Rebuild the portfolio as a **production TypeScript + React SPA**: pnpm, current dependencies, MUI themed to the existing space aesthetic, **atomic component tiers**, and a **vendor wrapper layer** so no feature code imports third-party UI libraries directly. Keep the same content, routes, Netlify contact form, and visual identity (dark `#0a0a0a`, accent `#64ffda`, Intro Rust Line display type, desktop planets/stars/cursor). Make the implementation **one responsive tree** instead of two duplicated apps, with code that is readable on first pass and defensible in review.

Success means: `pnpm lint`, `pnpm lint:type`, `pnpm test`, and `pnpm build` all pass; desktop and mobile still show hero → about/skills → seven projects → contact; `/coming-soon` works on all viewports; Netlify form posts from every viewport; no `@mui/*`, `framer-motion`, or `react-router-dom` imports outside `src/vendor/` (plus the documented theme bootstrap exception in `src/theme/`).

---

## Mid-Level Objective

1. **Tooling baseline** — pnpm lockfile, TypeScript strict, Vite, Biome, ESLint import-boundary rules, Vitest. Package name `ray-xue-portfolio`. Node pinned. Unused npm packages gone.
2. **Design system** — Tokenized MUI theme matching current colors/type. All MUI / Emotion / Framer Motion / React Router usage goes through `src/vendor/` wrappers with portfolio default styles.
3. **Atomic UI** — `src/components/` numbered tiers `0-primitive` → `4-page` with one-way imports. Shared primitives replace seven one-off project CSS worlds and duplicated nav/contact/skills markup.
4. **Content layer** — One typed source for bio, skills, projects, social, nav. Desktop/mobile copy divergence resolved (see Content Canonicalization).
5. **Experience** — Single app shell with hash sections. Desktop extras (planets, star field, custom cursor) are modules gated by breakpoint + `prefers-reduced-motion`. Mobile is the same pages, denser layout, working contact form.
6. **Production bar** — Tests for content, form encoding, and key UI. Error boundary. A11y (labels, focus, skip link). `netlify.toml` SPA fallback. Dead files deleted. `.ai/AGENTS.md` and `README.md` rewritten to match the new tree.

---

## State Documentation

```yaml
current_state:
  files:
    - package.json
    - package-lock.json
    - vite.config.js
    - eslint.config.js
    - index.html
    - src/main.jsx
    - src/App.jsx
    - src/App.css
    - src/index.css
    - src/PortfolioMobile.jsx
    - src/PortfolioMobile.css
    - src/planetOverrides.css
    - src/hooks/userPerformance.js
    - src/components/*.jsx
    - src/styles/*.css
    - public/* (assets present: Logos, fonts, PDFs, rocket.png)
  behavior: |
    Vite + React 19 JavaScript SPA. App.jsx (lines 9–21) splits at 768px:
    mobile renders PortfolioMobile with no Router; desktop wraps BrowserRouter
    with "/" → Portfolio and "/coming-soon" → ComingSoon. Desktop Portfolio.jsx
    is a long scroll page: Navigation, 150 SMIL stars, shooting stars, four
    lazy planets with Framer Motion parallax, hero, about+skills, seven unique
    ProjectSection* panels, Netlify contact POST. Mobile duplicates copy in
    local arrays (logos, projects) and paints a non-submitting form
    (PortfolioMobile.jsx lines 242–250: inputs with no name/onSubmit).
    Content is hardcoded in JSX. Styling is ~19 unscoped CSS files with
    @font-face repeated 12 times. No tests. No tsconfig.
  issues:
    - Dual apps: changing copy requires Portfolio.jsx + ProjectSection*.jsx AND PortfolioMobile.jsx
    - Seven near-copy project panels (ProjectSection.jsx … ProjectSection7.jsx) + ~4.3k lines of CSS
    - Unused deps: three, react-three-fiber, @react-three/drei, @heroicons/react (zero src imports)
    - vite.config.js chunks '@react-three/fiber' but package.json installs 'react-three-fiber'
    - Duplicate DOM id="bg" in PlanetSVG.jsx:51, Planet2.jsx:65, Planet3.jsx:67; planets inject extra stars via document.getElementById
    - StaticStarsSVG.jsx:20 Math.random() 150 times per mount; not seeded; SMIL animate on all
    - Dead: GrassSVG.jsx, styles/Forest.css, planetOverrides.css (never imported), hooks/userPerformance.js (never imported; filename vs comment mismatch)
    - Mobile contact does not submit; desktop ContactSection.jsx:36–43 POSTs Netlify encoded body
    - Raybot GitHub differs: desktop LLM-RAG-Agent vs mobile LLM-Agent.git
    - App.jsx already gates mobile, Portfolio.jsx:30–43 still tracks isMobile
    - cursor: none globally in index.css:5 even on touch devices
    - package.json name still "my-react-app"; README is Vite template
    - No netlify.toml; /coming-soon refresh likely 404 on Netlify
    - No TypeScript, no pnpm, no tests, no import boundaries
    - Formatting debt: navigation.jsx vs PascalCase; class Pcode-preview; subtitle "SyS"

desired_state:
  files: |
    See Ending context. Single TS tree under src/. Vendor wrappers. Atomic
    components. content/*.ts. theme/. Tests colocated. pnpm-lock.yaml.
    No package-lock.json. No leftover .jsx/.css from the old tree except
    CSS modules colocated with visual modules that cannot be expressed as sx.
  behavior: |
    One React tree for all viewports. Hash nav still #home #about #projects
    #contact. "/coming-soon" for Clothing ML. Contact form works everywhere
    (Netlify Forms, form-name=contact, honeypot bot-field). Desktop keeps
    space scene + custom cursor. Mobile uses same sections without planets/
    cursor. Theme is MUI but visually still dark space + mint accent +
    Intro Rust Line headings. Feature code imports only @/components,
    @/content, @/hooks, @/lib, @/theme, @/vendor.
  benefits:
    - One place to edit copy, theme, and button styles
    - Type-safe content and props
    - Import rules prevent MUI/motion leakage and circular atomic imports
    - Less scroll/pointer work (seeded stars, no planet star injection, reduced-motion)
    - Reviewable, testable, deployable
```

---

## Implementation Notes

### Locked stack (do not reopen during execute)

| Area | Choice | Why |
|------|--------|-----|
| Package manager | **pnpm** (`packageManager` field, `pnpm-lock.yaml`). DELETE `package-lock.json` | User requirement |
| Language | **TypeScript** `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` | User requirement; first-read types |
| Runtime | **Node 22 LTS** via `.nvmrc` + `engines.node` | Vite 7 + MUI 9; LTS for a static SPA |
| UI | **React 19** + **Vite 7** + `@vitejs/plugin-react` | Current line of existing stack |
| Design system | **MUI 9** (`@mui/material`) + **Emotion** | User allowed MUI; theming + a11y primitives without looking like default Material |
| Motion | Keep **framer-motion**, wrap it | Already drives scroll/in-view; planets stay CSS |
| Router | Keep **react-router-dom** 7, wrap it | `/` and `/coming-soon` |
| Quality | **Biome** (format + lint) + **ESLint 9** (boundaries + `no-restricted-imports` only) | Biome for daily; ESLint for the vendor/atomic rules MUI wrapping needs |
| Tests | **Vitest** + **Testing Library** + **happy-dom** | Prod bar; no tests today |
| 3D | **Do not add Three.js** | Declared but unused; planets are CSS/SVG |
| CSS strategy | MUI `sx` + theme for layout/type/chrome. **CSS modules only** for planet/star keyframes that are not worth fighting in `sx` | Cleaner than 19 global stylesheets |

Install **latest stable** of the packages below at execute time; pin whatever pnpm resolves in the lockfile.

**Dependencies:** `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `framer-motion`

**DevDependencies:** `typescript`, `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `biome` (`@biomejs/biome`), `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-boundaries`, `globals`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `happy-dom`, `vite-plugin-sitemap`, `vite-plugin-compression2`, `terser`

**Remove:** `@heroicons/react`, `three`, `react-three-fiber`, `@react-three/drei`, `rollup-plugin-visualizer` (unless you actually wire `analyze`; default is remove)

### Visual identity (preserve)

Copy tokens from `src/App.css` `:root` (lines 11–17) and title styles (lines 225–276):

- Background `#0a0a0a`, text `#fff`, accent `#64ffda`
- Display font: `Intro Rust Line` from `/fonts/IntroRust-Line.otf` (`font-display: swap`), **declared once** in theme/global styles
- Body font: Inter or system UI (mobile already uses Inter in `PortfolioMobile.css:19`; desktop mix of Intro Rust + system — **headings/display = Intro Rust Line, body/UI = Inter**)
- Hero: “Hi, I'm Ray” / “I'm a full stack developer.” / View More
- Nav brand: `RAY XUE`
- Desktop: star field, shooting stars, four CSS planets with scroll fade-in, fog layer, custom cursor (not on coarse pointer)
- Project panels keep their illustrated mockups (STM32 board, PyTorch editor, Harmoni chat, paper preview, Raybot terminal, transit map, audio dashboard) — rebuilt from shared chrome primitives, not 7 unique 600-line CSS files
- Do not introduce a Material-looking paper/elevation/ripple default. Theme: `elevation: 0`, disable ripples, square-ish 8px radii, mint focus rings

### Vendor wrapper rule (non-negotiable)

**Problem this solves:** User requirement — “If using external imports, everything needs to be wrapped in a custom rule set so I can edit styles, then re-exported.”

```
src/vendor/           ← ONLY files allowed to import third-party UI packages
  mui/                ← Button, TextField, Typography, Box, Stack, Link, …
  icons/              ← GitHub, LinkedIn, Email, Menu, Close, ChevronDown only
  motion/             ← motion, AnimatePresence, useScroll, useTransform
  router/             ← BrowserRouter, Routes, Route, Link, useNavigate
  styled.ts           ← styled, css (from @mui/material/styles)
  index.ts            ← public barrels
src/theme/            ← MAY import createTheme / ThemeProvider / CssBaseline FROM vendor only
```

**Forbidden in `src/components/**`, `src/app/**`, `src/pages/**`, `src/hooks/**`, `src/lib/**`, `src/content/**`:**

- `@mui/material`, `@mui/material/*`, `@mui/icons-material`, `@mui/icons-material/*`
- `@emotion/react`, `@emotion/styled`
- `framer-motion`
- `react-router-dom`

`react` and `react-dom` stay direct imports (runtime, not style).

Each wrapped component:

1. Imports the MUI/motion/router primitive
2. Applies **portfolio default styles** (styled() or default `sx`)
3. Exports a **named** component + props type
4. Re-exports only the props the rest of the app should use (do not re-export the entire MUI namespace)

ESLint `no-restricted-imports` on all files except `src/vendor/**`.  
`eslint-plugin-boundaries` enforces atomic tiers (below).

### Atomic tiers (non-negotiable)

```
src/components/
  0-primitive/     # atoms — no business copy, no data fetching
  1-composition/   # molecules — small combinations of primitives
  2-module/        # organisms — section-sized, may read content types
  3-layout/        # templates — page chrome, section wrappers
  4-page/          # pages — route-level composition only
```

**Import direction (lower may not import higher):**

| From | May import |
|------|------------|
| `0-primitive` | `vendor`, `theme` tokens (type-only / sx), `react` |
| `1-composition` | `0-primitive`, `vendor`, `theme` |
| `2-module` | `0`, `1`, `vendor`, `theme`, `content` types, `hooks`, `lib` |
| `3-layout` | `0`, `1`, `2`, `vendor`, `theme`, `hooks` |
| `4-page` | `0`–`3`, `content`, `hooks`, `lib`, `vendor`, `theme` |
| `app/` | `4-page`, `3-layout`, `theme`, `vendor/router` |

**File shape (every public component):**

```
src/components/0-primitive/Button/Button.tsx
src/components/0-primitive/Button/Button.test.tsx   # primitives with logic; skip empty snapshot tests
src/components/0-primitive/Button/index.ts          # export { Button, type ButtonProps }
```

Named exports only. One component per folder. Index barrels per tier are allowed (`0-primitive/index.ts`) but pages should import from the component folder or the tier barrel — pick **tier barrels** and stick to it.

### Responsive model (replace the 768 split)

Delete the two-app split in `src/App.jsx:9–21`.

- Breakpoint token `md = 768` (match current)
- `useMediaQuery` from vendor (wrap MUI) + `prefers-reduced-motion`
- **Same page components** on all widths
- Hide `PlanetScene` and `CustomCursor` when `(max-width: 768px)` **or** coarse pointer **or** reduced motion
- Mobile nav can be compact; do not mount a second `PortfolioMobile` tree
- `/coming-soon` available on mobile (currently missing)

### Content canonicalization

Put all of this in `src/content/`. When desktop and mobile disagree, **desktop project body + mobile social profile** unless noted:

| Item | Canonical |
|------|-----------|
| STM32 | title `STM32 Comms`; github `https://github.com/Mmach1ne/ECE-198-RJD`; pdf `/STM32Comms.pdf` |
| Clothing ML | buttons → `/coming-soon` (not `#`) |
| Harmoni | github `https://github.com/yanxue06/HarmoniQ` |
| Thermal | pdf `/ThermalDynamic.pdf` |
| Raybot | github **`https://github.com/Mmach1ne/LLM-RAG-Agent`** (desktop `ProjectSection5.jsx:202`; drop mobile `LLM-Agent.git`) |
| Raybot demo | `https://effervescent-haupia-013614.netlify.app` |
| Transit | github `https://github.com/Mmach1ne/UWTransportGPS.git` |
| Audio | display title **AUDILOG**; subtitle Windows audio logger; github `https://github.com/Mmach1ne/AudioLogger.git` |
| Social GitHub | `https://github.com/Mmach1ne` (profile). Footer may also link the portfolio repo as optional `source` |
| LinkedIn | `https://www.linkedin.com/in/ray-xue-uw` |
| Email | `r29xue@uwaterloo.ca` |
| Copyright | `Ray Xue ©2026` |
| Skills | HTML, Java, CSS, React, JS, TS, C++, C#, Python, Git — files under `/Logos/` as today. Fix C.png labeled `C#` in `Portfolio.jsx:92` only if the asset is actually C#; keep label matching the file’s language |

Fix typos in copy when moving: `SyS` → `System`; keep meaning.

### Performance rules

- Seed star positions once (`mulberry32` or similar + constant seed). Never `Math.random()` during render.
- Cap static stars (~60 default, fewer on mobile). Honor `prefers-reduced-motion` (static stars, no shooting stars, no planet parallax).
- Planets **must not** call `document.getElementById('bg')` or inject stars. Unique class names, no duplicate `id="bg"`.
- Custom cursor: `pointer: fine` only; do not set `cursor: none` on `html` for touch.
- Lazy-load project visual modules below the fold (`React.lazy` + vendor `Suspense`).
- Drop `vite.config.js` `three-vendor` chunk.

### Coding standards

- SOLID / KISS / DRY / YAGNI from `.ai/AGENTS.md`
- No `any`. No `eslint-disable` without a one-line reason
- Functions small enough to read without scrolling a novel; project visuals may be longer but must use shared chrome (`WindowChrome`, `MetricBar`, `CodeBlock`, `StatusDot`)
- Accessible forms: visible labels (can be visually hidden), `required`, error/success text, honeypot field present but hidden
- `rel="noopener noreferrer"` on external links
- Do not commit secrets. Do not add a CMS.

### Scripts (`package.json`)

```
dev            vite
build          tsc --noEmit && vite build
preview        vite preview
serve          vite preview --port 3000
lint           biome check . && eslint .
lint:fix       biome check --write . && eslint . --fix
lint:type      tsc --noEmit
format         biome format --write .
test           vitest run
test:watch     vitest
```

### Netlify

CREATE `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Keep the hidden `contact` form in `index.html` for Netlify Forms detection (already at `index.html:55–59`).

### Path alias

`@/*` → `src/*` in `tsconfig.app.json` and `vite.config.ts`.

---

## Context

### Beginning context

Inspected and still present at spec time:

**Root:** `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `README.md`, `.gitignore`, `.ai/AGENTS.md`

**Entry:** `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`, `src/planetOverrides.css`

**Mobile:** `src/PortfolioMobile.jsx`, `src/PortfolioMobile.css`

**Desktop UI:** `src/components/Portfolio.jsx`, `navigation.jsx`, `ComingSoon.jsx`, `ContactSection.jsx`, `ProjectSection.jsx` … `ProjectSection7.jsx`, `PlanetSVG.jsx`, `Ring.jsx`, `Planet2.jsx`, `Planet3.jsx`, `StaticStarsSVG.jsx`, `ShootingStarsSVG.jsx`, `GrassSVG.jsx`

**CSS:** `src/styles/navigation.css`, `ContactSection.css`, `ComingSoon.css`, `Forest.css`, `PlanetSVG.css`, `Planet2.css`, `Planet3.css`, `Rings.css`, `ProjectSection.css` … `ProjectSection7.css`

**Dead hook:** `src/hooks/userPerformance.js`

**Public (present on disk, contrary to stale AGENTS.md note):** `public/Logos/*`, `public/fonts/IntroRust-Line.otf`, `public/STM32Comms.pdf`, `public/ThermalDynamic.pdf`, `public/rocket.png`, `public/robots.txt`, `public/sitemap.xml`, `public/google0dd5f682f1795159.html`, `public/desktop.ini` (delete), `public/vite.svg`

**SEO shell:** `index.html` title, OG/Twitter, JSON-LD Person, canonical `https://rayxueportfolio.com`, favicon `/rocket.png`

### Ending context

```
Portfolio-Website/
├── .nvmrc
├── .gitignore
├── biome.json
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── public/                    # keep Logos, fonts, PDFs, rocket.png, robots, GSC html
│   └── (no desktop.ini)
├── .ai/
│   ├── AGENTS.md              # rewritten for the new tree
│   └── prp/execute/spec-typescript-atomic-redesign.md
└── src/
    ├── main.tsx
    ├── vite-env.d.ts
    ├── app/
    │   ├── App.tsx
    │   ├── ErrorBoundary.tsx
    │   └── providers.tsx      # Theme + Router
    ├── content/
    │   ├── site.ts
    │   ├── nav.ts
    │   ├── skills.ts
    │   ├── projects.ts
    │   ├── social.ts
    │   └── index.ts
    ├── theme/
    │   ├── tokens.ts
    │   ├── theme.ts
    │   ├── ThemeProvider.tsx
    │   └── globalStyles.ts
    ├── vendor/
    │   ├── mui/
    │   ├── icons/
    │   ├── motion/
    │   ├── router/
    │   ├── styled.ts
    │   └── index.ts
    ├── components/
    │   ├── 0-primitive/       # Box, Stack, Text, Button, Link, Image, Input, Textarea, Icon, …
    │   ├── 1-composition/     # BrandMark, NavItem, FormField, SocialLinks, SkillTile, WindowChrome, CodeBlock, MetricBar, StatusDot, SectionHeading
    │   ├── 2-module/          # Navigation, Hero, About, SkillsGrid, ProjectShowcase, project visuals, StarField, ShootingStars, PlanetScene, ContactForm, SiteFooter, CustomCursor
    │   ├── 3-layout/          # SiteShell, HashSection, PageBackdrop
    │   └── 4-page/            # HomePage, ComingSoonPage
    ├── hooks/
    │   ├── useMedia.ts
    │   ├── usePrefersReducedMotion.ts
    │   ├── useHashSection.ts
    │   └── useFinePointer.ts
    ├── lib/
    │   ├── netlifyForm.ts
    │   ├── scroll.ts
    │   └── seededRandom.ts
    └── test/
        └── setup.ts
```

**Deleted by the end:** all beginning-context `.jsx` sources, `src/styles/**`, `src/App.css`, `src/index.css`, `src/PortfolioMobile.*`, `src/planetOverrides.css`, `src/hooks/userPerformance.js`, `src/components/GrassSVG.jsx`, `package-lock.json`, `vite.config.js`, old `eslint.config.js` contents (replaced), `public/desktop.ini`.

Planet/star **CSS modules** live next to their `2-module` folders, e.g. `src/components/2-module/PlanetEarth/PlanetEarth.module.css` — not a revival of `src/styles/`.

---

## Low-Level Tasks

> Ordered from start to finish. Each task is one execute prompt. Do not start task N+1 if task N validation failed.

### 1. Scaffold pnpm + TypeScript tooling

```
Prompt: Convert this Vite React JS app to pnpm + TypeScript tooling without migrating UI yet. Create package.json scripts, tsconfigs, vite.config.ts, biome.json, eslint.config.js (boundaries + restricted imports stubs), vitest, .nvmrc, netlify.toml. Delete package-lock.json after pnpm install. Do not move JSX components in this task.

CREATE:
  - pnpm-lock.yaml (via pnpm install)
  - .nvmrc (22)
  - tsconfig.json, tsconfig.app.json, tsconfig.node.json
  - vite.config.ts (replace vite.config.js)
  - vitest.config.ts
  - biome.json
  - eslint.config.js (flat; TS + react-hooks + boundaries placeholders + no-restricted-imports for vendor packages)
  - netlify.toml
  - src/vite-env.d.ts
  - src/test/setup.ts

UPDATE:
  - package.json: name "ray-xue-portfolio"; type module; packageManager pnpm; engines.node >=22; scripts as Implementation Notes; deps listed there; remove three/heroicons/r3f
  - .gitignore: keep node_modules/dist; add *.tsbuildinfo; keep pnpm-debug

DELETE after install succeeds:
  - package-lock.json
  - vite.config.js

Details:
  - alias @ -> src
  - sitemap hostname https://rayxueportfolio.com
  - gzip + brotli via vite-plugin-compression2
  - manualChunks: react-vendor, mui-vendor, motion-vendor only (no three, no hardcoded jsx paths)
  - biome ignore dist, pnpm-lock.yaml
  - eslint-plugin-boundaries elements: vendor, primitive, composition, module, layout, page, theme, content, app, hooks, lib
  - Until src/vendor exists, keep restricted-import rule ready but do not fail the old jsx tree: either ignore **/*.{js,jsx} from restricted imports OR complete this task only after creating empty vendor barrels that old code does not use. Preferred: this task creates empty src/vendor/* re-export files and src/main.tsx is NOT switched yet. Leave index.html pointing at /src/main.jsx until Task 12 so the site still runs if someone serves mid-migration.

Validation:
  - command: pnpm install
    expect: exit 0, pnpm-lock.yaml exists, no package-lock.json
  - command: test -f .nvmrc && test -f vite.config.ts && test -f netlify.toml
    expect: all exist
```

### 2. CREATE vendor wrappers

```
Prompt: Implement src/vendor as the only place that imports @mui/*, @emotion/*, framer-motion, react-router-dom. Wrap each primitive with portfolio default styles so feature code never needs sx for basics.

CREATE (minimum set — add more only when a later task needs them):
  src/vendor/styled.ts
  src/vendor/mui/Box.tsx
  src/vendor/mui/Stack.tsx
  src/vendor/mui/Container.tsx
  src/vendor/mui/Typography.tsx
  src/vendor/mui/Button.tsx          # variants: primary | secondary | ghost matching .view-more-btn / .btn-primary / .btn-secondary
  src/vendor/mui/TextField.tsx       # dark transparent field, inset 1px rgba border like ContactSection.css:71–77
  src/vendor/mui/Link.tsx
  src/vendor/mui/AppBar.tsx
  src/vendor/mui/Toolbar.tsx
  src/vendor/mui/IconButton.tsx
  src/vendor/mui/Drawer.tsx          # or Modal+Stack for mobile nav overlay
  src/vendor/mui/CssBaseline.tsx
  src/vendor/mui/ThemeProvider.tsx
  src/vendor/mui/useMediaQuery.ts
  src/vendor/mui/useTheme.ts
  src/vendor/mui/createTheme.ts
  src/vendor/mui/GlobalStyles.tsx
  src/vendor/icons/GitHub.tsx
  src/vendor/icons/LinkedIn.tsx
  src/vendor/icons/Email.tsx
  src/vendor/icons/Menu.tsx
  src/vendor/icons/Close.tsx
  src/vendor/icons/ChevronDown.tsx
  src/vendor/motion/motion.ts        # export motion, AnimatePresence
  src/vendor/motion/scroll.ts        # useScroll, useTransform
  src/vendor/router/index.ts         # BrowserRouter, Routes, Route, Link, useNavigate, useLocation
  src/vendor/index.ts

Details:
  - Button primary: transparent / light text / glow hover like App.css .view-more-btn:265-276
  - Button secondary: mint outline #64ffda
  - Typography variant mapping: display | title | subtitle | body | caption | code
  - Do not export MuiButton as a public name; export Button
  - Turn on eslint no-restricted-imports for the rest of src
  - React.Suspense stays imported from react (not vendor)

Validation:
  - command: pnpm exec eslint src/vendor --max-warnings 0
    expect: vendor may import the forbidden packages; no errors
  - command: rg "@mui/material" src --glob '!src/vendor/**' ; echo done
    expect: no matches outside vendor
```

### 3. CREATE theme tokens and MUI theme

```
Prompt: Create src/theme with tokens copied from App.css :root and title/about type scale. createTheme must look like the current site, not default Material. Import createTheme, ThemeProvider, CssBaseline, GlobalStyles only from @/vendor.

CREATE:
  - src/theme/tokens.ts        # palette, fontFamily, spacing, breakpoints.md=768, zIndex (cursor 1000, nav 1000, content 20, stars 0)
  - src/theme/theme.ts         # createTheme from @/vendor only
  - src/theme/globalStyles.ts  # @font-face once for Intro Rust Line from /fonts/IntroRust-Line.otf; body margin 0; overflow-x hidden
  - src/theme/ThemeProvider.tsx
  - src/theme/index.ts

Details:
  - palette.background.default = #0a0a0a
  - palette.text.primary = #fff
  - palette.primary.main = #64ffda
  - typography.h1 clamp(2rem, 8vw, 4rem) Intro Rust Line (match .title)
  - components.MuiButton disableElevation, disableRipple
  - components.MuiPaper elevation 0, background transparent
  - CssBaseline via ThemeProvider wrapper

Validation:
  - command: pnpm lint:type
    expect: theme files typecheck
  - command: rg "@mui/" src/theme
    expect: no matches (vendor only)
```

### 4. CREATE 0-primitive components

```
Prompt: Build atomic primitives that re-export vendor widgets with app-level names. Primitives add no domain strings.

CREATE under src/components/0-primitive/:
  Box, Stack, Cluster (flex wrap gap), Text, Button, IconButton, Link, Image, Input, Textarea, Icon, Divider, VisuallyHidden, Container

Each: Folder/Component.tsx + index.ts. Image wraps img with width/height required in props (prevent layout shift). Link: internal vs external (external gets target _blank + rel). Button supports loading text.

Validation:
  - command: pnpm lint:type
    expect: exit 0 for these files
  - command: pnpm exec eslint src/components/0-primitive
    expect: zero @mui imports
```

### 5. CREATE 1-composition components

```
Prompt: Build molecules from primitives. No page-level layout.

CREATE under src/components/1-composition/:
  BrandMark          # "RAY XUE" mint display
  NavItem            # hash link + active underline
  SectionHeading     # large Intro Rust title + optional mint underline (contact-title::after)
  FormField          # label + Input/Textarea + error
  SocialLinks        # github / linkedin / email from props, not hardcoded URLs in JSX
  SkillTile          # logo img + label
  WindowChrome       # traffic-light dots + title — used by project mockups
  CodeBlock          # numbered lines or children
  MetricBar          # label + fill % + status
  StatusDot          # active/idle
  SkipLink           # href #main

Validation:
  - command: pnpm exec eslint src/components/1-composition
    expect: may import 0-primitive and vendor; must not import 2-module or 4-page
```

### 6. CREATE lib + hooks

```
Prompt: Extract helpers. No UI.

CREATE:
  src/lib/netlifyForm.ts
    encode(data: Record<string, string>): string  # COPY logic from ContactSection.jsx:14–19
    submitContact(fields): Promise<'success' | 'error'>  # COPY fetch from ContactSection.jsx:36–58; never throw to UI without mapping
  src/lib/scroll.ts
    scrollToId(id: string): void  # scrollIntoView smooth; no-op if missing
  src/lib/seededRandom.ts
    mulberry32(seed: number): () => number
  src/hooks/useFinePointer.ts      # matchMedia (pointer: fine)
  src/hooks/usePrefersReducedMotion.ts
  src/hooks/useMedia.ts            # wrap vendor useMediaQuery for md
  src/hooks/useHashSection.ts      # rAF scroll spy for home|about|projects|contact — MIRROR navigation.jsx:21–64 without the bugs (always update active from actual section)

CREATE tests:
  src/lib/netlifyForm.test.ts      # encode joins uri-encoded pairs; submitContact mocks fetch ok/fail
  src/lib/seededRandom.test.ts     # same seed → same sequence

Validation:
  - command: pnpm test -- src/lib
    expect: pass
```

### 7. CREATE content layer

```
Prompt: Move all hardcoded copy into typed modules. Do not invent new projects.

CREATE:
  src/content/site.ts       # name, title, description, canonical, copyrightYear 2026
  src/content/nav.ts        # Home/About/Projects/Contact ids
  src/content/skills.ts     # logos array from Portfolio.jsx:85–96
  src/content/social.ts     # github, linkedin, email, optional sourceRepo
  src/content/projects.ts   # 7 projects with visual discriminant
  src/content/index.ts
  src/content/projects.test.ts  # unique ids; every link href is /coming-soon, /, mailto, https, or /something.pdf

Type Project roughly:
  id, slug, title, subtitle, description, tech: string[],
  links: { kind: 'github' | 'demo' | 'pdf' | 'comingSoon'; href: string; label: string }[]
  visual: 'stm32' | 'clothingMl' | 'harmoni' | 'thermal' | 'raybot' | 'transit' | 'audiolog'

Canonical links: see Content Canonicalization. Include short mobile description AND long desktop description if they differ, or one description used everywhere (prefer one).

Validation:
  - command: pnpm test -- src/content
    expect: pass
```

### 8. CREATE visual 2-modules (stars, planets, cursor)

```
Prompt: Port space visuals without duplicate ids or document.getElementById star injection. CSS modules colocated.

CREATE:
  src/components/2-module/StarField/     # seeded ~60 stars; CSS or SVG opacity animation; reduced-motion = static
  src/components/2-module/ShootingStars/ # 0 if reduced-motion; else few comets
  src/components/2-module/PlanetEarth/   # from PlanetSVG.jsx + PlanetSVG.css (strip #bg stars)
  src/components/2-module/PlanetRing/    # from Ring.jsx + Rings.css
  src/components/2-module/PlanetIce/     # Planet2
  src/components/2-module/PlanetGas/     # Planet3
  src/components/2-module/PlanetScene/   # four motion wrappers; COPY parallax ranges from Portfolio.jsx:46–56; hide if !desktop or reduced-motion
  src/components/2-module/CustomCursor/  # COPY rAF mousemove from Portfolio.jsx:59–78; render null if !fine pointer
  src/components/2-module/PageFog/       # fog opacity useTransform [0,500] → [0.8,0]

Do not port GrassSVG or Forest.css.

Validation:
  - command: rg "getElementById\\('bg'\\)" src
    expect: no matches
  - command: rg "id=.bg." src
    expect: no duplicate id bg
```

### 9. CREATE project visual 2-modules + ProjectShowcase

```
Prompt: Replace ProjectSection.jsx–ProjectSection7.jsx with one ProjectShowcase plus seven visual slots built from WindowChrome/CodeBlock/MetricBar/StatusDot. Preserve the illustrated look, not the class-name soup.

CREATE:
  src/components/2-module/ProjectShowcase/   # title, subtitle, description, actions, visual slot; responsive stack vs 2/3 column
  src/components/2-module/projectVisuals/Stm32Visual/
  src/components/2-module/projectVisuals/ClothingMlVisual/
  src/components/2-module/projectVisuals/HarmoniVisual/
  src/components/2-module/projectVisuals/ThermalVisual/
  src/components/2-module/projectVisuals/RaybotVisual/
  src/components/2-module/projectVisuals/TransitVisual/
  src/components/2-module/projectVisuals/AudiologVisual/
  src/components/2-module/projectVisuals/index.ts  # map visual discriminant → lazy component

Coming-soon links use vendor useNavigate or Link to /coming-soon.
PDF links use <a download>.
GitHub/demo use vendor Link external.

On viewports < md, ProjectShowcase may hide the heavy visual and show tech chips + links only (mobile cards today). Keep visuals on md+ so desktop still feels illustrated.

Validation:
  - command: pnpm lint:type
    expect: exit 0
  - Visual check later in task 16; here ensure each visual is a function component with no hardcoded github URLs (URLs come from content via props)
```

### 10. CREATE remaining 2-modules (nav, hero, about, contact, footer)

```
Prompt: Port Navigation, hero, about/skills, contact form, footer. One implementation for all viewports.

CREATE:
  src/components/2-module/Navigation/     # MIRROR navigation.jsx behavior: fixed, blur, scroll shrink, hash spy, mobile drawer. Use content/nav + social. Desktop links always visible from md up.
  src/components/2-module/Hero/           # title, subtitle, View More → scrollToId('projects') or about — current button scrolls to about via projectsRef on about (Portfolio.jsx:172–174). KEEP that: View More scrolls to #about.
  src/components/2-module/About/          # PFP /Logos/PFP.jpeg, bio from content, SkillsGrid
  src/components/2-module/SkillsGrid/     # 3-col desktop, 2-col mobile; Git tile no longer needs inline gridColumn hack if using auto-placement
  src/components/2-module/ContactForm/    # names name/email/message; hidden form-name; honeypot bot-field; status messages from ContactSection.jsx:136–145
  src/components/2-module/SiteFooter/     # social + copyright + scroll to top
  src/components/2-module/ProjectsBlock/  # maps content.projects → ProjectShowcase
  src/components/2-module/ScrollHint/     # mobile chevron from PortfolioMobile.jsx:286–298; optional, hide at #contact

CREATE tests:
  src/components/2-module/ContactForm/ContactForm.test.tsx  # submit calls fetch with form-name=contact
  src/components/2-module/Navigation/Navigation.test.tsx    # renders four nav labels from content

Validation:
  - command: pnpm test
    expect: pass
```

### 11. CREATE 3-layout and 4-page

```
Prompt: Assemble templates and pages only. No leftover copy in pages.

CREATE:
  src/components/3-layout/SiteShell/     # SkipLink, Navigation, main#main, footer slot
  src/components/3-layout/HashSection/   # id + minHeight + component="section"
  src/components/3-layout/PageBackdrop/  # StarField + ShootingStars + PlanetScene + Fog + Cursor
  src/components/4-page/HomePage/        # SiteShell + backdrop + Hero #home + About #about + Projects #projects + Contact #contact
  src/components/4-page/ComingSoonPage/  # backdrop + message from ComingSoon.jsx:11

Validation:
  - command: pnpm exec eslint src/components/4-page src/components/3-layout
    expect: pages do not import @mui or framer-motion
```

### 12. REPLACE app bootstrap

```
Prompt: Switch the running app to TypeScript entry. Preserve SEO and Netlify form in index.html.

CREATE:
  src/app/ErrorBoundary.tsx
  src/app/providers.tsx     # ThemeProvider then Router
  src/app/App.tsx           # Routes / and /coming-soon — BOTH viewports
  src/main.tsx              # createRoot, no viewport injection (already in index.html). Optional: keep pull-to-refresh guard from main.jsx:19–37 in a small lib if still needed; do not preventDefault hashchange (main.jsx:15–17 is hostile to in-page hashes — DELETE that listener).

UPDATE:
  index.html script src to /src/main.tsx
  Keep hidden Netlify form, meta, JSON-LD, favicon

DELETE later (task 15): main.jsx, App.jsx

Validation:
  - command: pnpm dev  (smoke: curl localhost)
    expect: index serves, root mounts
  - command: pnpm lint:type
    expect: exit 0
```

### 13. UPDATE production HTML/SEO only if needed

```
Prompt: Align index.html copy with src/content/site.ts. Do not strip crawler tags.

UPDATE index.html:
  - Keep robots, canonical, OG, Twitter, JSON-LD, apple-touch-icon
  - Title/description must match content/site.ts (manual sync is OK; no extra library)

Validation:
  - command: rg "rayxueportfolio.com" index.html
    expect: canonical still present
  - command: rg "form-name|name=\"contact\"" index.html
    expect: hidden Netlify form still present
```

### 14. Tests + a11y pass

```
Prompt: Fill remaining tests. Add skip link, form labels, focus-visible in global styles. Respect prefers-reduced-motion in modules (already required in task 8).

CREATE/UPDATE tests until coverage of:
  - content uniqueness
  - netlify encode/submit
  - ContactForm success path
  - HomePage renders hero heading (Testing Library)
  - ComingSoonPage heading

No snapshot farms.

Validation:
  - command: pnpm test
    expect: exit 0
  - command: pnpm lint
    expect: exit 0
```

### 15. DELETE old tree

```
Prompt: Remove every beginning-context implementation file that has been replaced. Do not leave orphan CSS.

DELETE:
  src/main.jsx, App.jsx, App.css, index.css, planetOverrides.css
  src/PortfolioMobile.jsx, PortfolioMobile.css
  src/hooks/userPerformance.js
  src/components/ComingSoon.jsx, ContactSection.jsx, GrassSVG.jsx, navigation.jsx
  src/components/Planet*.jsx, Ring.jsx, StaticStarsSVG.jsx, ShootingStarsSVG.jsx, Portfolio.jsx
  src/components/ProjectSection.jsx, ProjectSection2.jsx … ProjectSection7.jsx
  src/styles/** (entire folder)
  public/desktop.ini
  src/assets/react.svg if unused

UPDATE .gitignore if needed.

Validation:
  - command: find src -name '*.jsx' -o -name 'userPerformance.js'
    expect: empty
  - command: pnpm build
    expect: exit 0, dist/ created
```

### 16. Rewrite docs

```
Prompt: Replace README Vite boilerplate. Rewrite .ai/AGENTS.md to map the NEW codebase (structure, commands, vendor rule, atomic rule, Netlify, content paths). Do not describe the old JSX tree as current.

UPDATE:
  README.md
  .ai/AGENTS.md

Validation:
  - command: rg "my-react-app|PortfolioMobile|userPerformance" README.md .ai/AGENTS.md
    expect: no matches describing them as current implementation
```

### 17. Final gates

```
Prompt: Run the full quality bar and fix failures forward.

Validation:
  - command: pnpm lint
    expect: exit 0
  - command: pnpm lint:type
    expect: exit 0
  - command: pnpm test
    expect: exit 0
  - command: pnpm build
    expect: exit 0
  - command: rg "from '@mui/material'|from \"@mui/material\"|from 'framer-motion'|from 'react-router-dom'" src --glob '!src/vendor/**'
    expect: no matches
  - command: ls pnpm-lock.yaml && test ! -f package-lock.json
    expect: pnpm lock only
  - Manual: desktop home, scroll planets, all 7 projects, contact submit (Netlify deploy or netlify dev), /coming-soon, width < 768 same sections + working form, no custom cursor on touch
```

---

## Implementation Strategy

**Order:** Tooling (1) → vendor (2) → theme (3) → primitives (4) → composition (5) → lib (6) → content (7) → visuals (8–9) → sections (10) → pages (11) → bootstrap (12–13) → tests (14) → delete (15) → docs (16) → gates (17).

**Dependency graph:** 2 before 3 and 4. 4 before 5. 6 and 7 before 10. 8–10 before 11. 12 before 15. 15 before 17.

**Parallel (after 3–5 exist):** Task 6 and 7 can run in parallel. Task 8 and 9 can run in parallel. Do not parallelize 15 with anything.

**Progressive enhancement:** Until task 12, old `main.jsx` may still boot so `pnpm dev` is not dark. After 12, old files are dead weight until 15.

**Rollback:** Git revert the branch. Do not delete `public/` binaries. Keep `index.html` Netlify form intact in every commit that is deployable. If a mid-migration deploy is required, do not merge until task 12+15+17 pass.

**Cleanup after execute:** No `/tmp` scripts. No `*.jsx` leftovers. No duplicate `@font-face`. No `console.log` in vendor (Terser drop_console remains OK).

---

## Risks and Mitigations

| Risk | Mitigation | Go / no-go |
|------|------------|------------|
| MUI defaults look “Material” and break the space brand | Theme disables ripple/elevation; vendor Button copies `.view-more-btn`; visual QA vs current site | No-go if hero/nav/contact are purple/rounded Material out of the box |
| CSS planet ports regress | Colocate CSS modules; do not rewrite planet math in sx | Planets must still read as Earth/ring/ice/gas at desktop width |
| Star field tanks FPS | Seeded fewer stars; reduced-motion off ramp; no per-planet star DOM | No-go if 150 SMIL stars remain |
| Netlify form breaks | Keep hidden form in `index.html`; same field names; encode helper tested | No-go if desktop POST contract changes |
| `/coming-soon` 404 on refresh | `netlify.toml` SPA 200 | Must exist before deploy |
| Missing public assets in some clones | This checkout **has** Logos/font/PDFs/rocket.png; do not delete | Build may warn if fonts missing; do not fake binaries |
| eslint-plugin-boundaries misconfigured, blocks vendor | Vendor type exempt from atomic rules; only forbids feature→@mui | Lint must pass in task 17 |
| Scope blowup (CMS, 3D, blog) | YAGNI: out of scope | Reject those PRs in this spec |

---

## User Interaction Points (decisions already locked)

The user asked the agent to decide stack and cleanliness. These are **locked**, not open questions:

1. MUI 9 + Emotion, fully wrapped, themed to current dark/mint/Intro Rust identity  
2. Atomic folders `0-primitive` … `4-page`  
3. pnpm + TypeScript strict + Vitest  
4. One responsive tree; desktop-only planets/cursor  
5. Content unified per the canonical table (Raybot URL = `LLM-RAG-Agent`)

If execute must choose anyway: prefer **deleting** unused 3D and heroicons; prefer **fewer** stars over canvas engines; prefer **CSS modules for planets** over forcing MUI `sx` for keyframes.

---

## Quality Checklist

- [x] Current state fully documented (from inspected files, with line references)
- [x] Desired state clearly defined (ending tree + behavior)
- [x] All objectives measurable (lint/type/test/build + import grep)
- [x] Tasks ordered by dependency
- [x] Each task has validation an AI can run
- [x] Risks identified with mitigations
- [x] Rollback strategy included
- [x] Integration points noted (Netlify Forms, sitemap hostname, GSC file, `/coming-soon`, public assets)

---

## Out of scope

- CMS, markdown blog, i18n, auth, analytics pixels, Three.js, Tailwind, Next.js, changing domain, rewriting project writeups into new claims, adding/removing projects, replacing Intro Rust Line with a different display font
