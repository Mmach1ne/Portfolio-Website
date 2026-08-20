import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'demo';

export type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: ButtonVariant;
};

const focusRing = {
  '&:focus-visible': {
    outline: '2px solid #64ffda',
    outlineOffset: '2px',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

const variantStyles: Record<ButtonVariant, MuiButtonProps['sx']> = {
  primary: {
    borderRadius: '50px',
    background: 'transparent',
    border: '1px solid #64ffda',
    color: '#64ffda',
    fontFamily: '"Intro Rust Line", sans-serif',
    textTransform: 'none',
    px: 3,
    py: 1,
    boxShadow: 'none',
    transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease',
    '&:hover': {
      background: 'rgba(100, 255, 218, 0.14)',
      boxShadow: '0 0 24px rgba(100, 255, 218, 0.45)',
    },
    ...focusRing,
  },
  secondary: {
    borderRadius: '8px',
    border: '1px solid #64ffda',
    color: '#64ffda',
    background: 'transparent',
    fontFamily: 'Inter, system-ui, sans-serif',
    textTransform: 'none',
    transition: 'background 0.2s ease, color 0.2s ease, transform 0.1s ease',
    '&:hover': {
      background: '#64ffda',
      color: '#0a0a0a',
      borderColor: '#64ffda',
    },
    ...focusRing,
  },
  ghost: {
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.7)',
    background: 'transparent',
    fontFamily: 'Inter, system-ui, sans-serif',
    textTransform: 'none',
    transition: 'background 0.2s ease, color 0.2s ease, transform 0.1s ease',
    '&:hover': {
      color: '#ffffff',
      background: 'rgba(100, 255, 218, 0.08)',
    },
    ...focusRing,
  },
  demo: {
    borderRadius: '8px',
    border: '1px solid transparent',
    background:
      'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(135deg, #64ffda, #a78bfa) border-box',
    color: '#64ffda',
    fontFamily: 'Inter, system-ui, sans-serif',
    textTransform: 'none',
    transition: 'box-shadow 0.2s ease, transform 0.1s ease',
    '&:hover': {
      boxShadow: '0 0 24px rgba(100, 255, 218, 0.45)',
      background:
        'linear-gradient(rgba(100,255,218,0.12), rgba(100,255,218,0.12)) padding-box, linear-gradient(135deg, #64ffda, #a78bfa) border-box',
    },
    ...focusRing,
  },
};

export function Button({ variant = 'primary', sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      disableElevation
      disableRipple
      sx={[variantStyles[variant], ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  );
}
