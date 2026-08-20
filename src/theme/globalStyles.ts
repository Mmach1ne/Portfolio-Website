import { tokens } from './tokens';

export const globalStyles = {
  '@font-face': {
    fontFamily: 'Intro Rust Line',
    src: 'url(/fonts/IntroRust-Line.otf) format("opentype")',
    fontDisplay: 'swap',
  },
  html: {
    scrollBehavior: 'smooth',
  },
  body: {
    margin: 0,
    overflowX: 'hidden',
    backgroundColor: tokens.palette.background,
    color: tokens.palette.text,
    fontFamily: tokens.fontFamily.body,
  },
  '#root': {
    minHeight: '100vh',
  },
  '.skip-link': {
    position: 'absolute',
    top: '-40px',
    left: 0,
    background: tokens.palette.accent,
    color: tokens.palette.background,
    padding: '8px 16px',
    zIndex: tokens.zIndex.nav + 1,
    '&:focus': {
      top: 0,
    },
  },
} as const;
