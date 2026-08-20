export const tokens = {
  // CSS variables in src/app/globals.css @theme are canonical; keep numbers in sync.
  palette: {
    background: '#0a0a0a',
    text: '#ffffff',
    accent: '#64ffda',
    error: '#ff6b6b',
    muted: '#6b7280',
  },
  fontFamily: {
    display: '"Intro Rust Line", sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  spacing: (factor: number) => `${factor * 8}px`,
  breakpoints: {
    md: 768,
  },
  zIndex: {
    stars: 0,
    content: 20,
    nav: 1000,
    cursor: 10000,
  },
} as const;
