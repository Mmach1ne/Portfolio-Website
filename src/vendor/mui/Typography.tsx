import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import MuiTypography from '@mui/material/Typography';

export type TypographyVariant = 'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'code';

export type TypographyProps = Omit<MuiTypographyProps, 'variant'> & {
  variant?: TypographyVariant;
};

const variantMap: Record<TypographyVariant, MuiTypographyProps['variant']> = {
  display: 'h1',
  title: 'h2',
  subtitle: 'h3',
  body: 'body1',
  caption: 'caption',
  code: 'body2',
};

const variantSx: Record<TypographyVariant, MuiTypographyProps['sx']> = {
  display: {
    fontFamily: '"Intro Rust Line", sans-serif',
    fontSize: 'clamp(2rem, 8vw, 4rem)',
    lineHeight: 1.1,
  },
  title: {
    fontFamily: '"Intro Rust Line", sans-serif',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  },
  subtitle: {
    fontFamily: '"Intro Rust Line", sans-serif',
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    opacity: 0.7,
  },
  body: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  caption: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '0.875rem',
    opacity: 0.7,
  },
  code: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '0.875rem',
  },
};

export function Typography({ variant = 'body', sx, ...props }: TypographyProps) {
  return (
    <MuiTypography
      variant={variantMap[variant]}
      sx={[variantSx[variant], ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  );
}
