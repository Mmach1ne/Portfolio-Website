import { createTheme } from '@/vendor';
import { tokens } from './tokens';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: tokens.palette.background,
      paper: 'transparent',
    },
    text: {
      primary: tokens.palette.text,
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    primary: {
      main: tokens.palette.accent,
    },
    error: {
      main: tokens.palette.error,
    },
  },
  typography: {
    fontFamily: tokens.fontFamily.body,
    h1: {
      fontFamily: tokens.fontFamily.display,
      fontSize: 'clamp(2rem, 8vw, 4rem)',
    },
    h2: {
      fontFamily: tokens.fontFamily.display,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: tokens.breakpoints.md,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ':focus-visible': {
          outline: `2px solid ${tokens.palette.accent}`,
          outlineOffset: '2px',
        },
      },
    },
  },
});
