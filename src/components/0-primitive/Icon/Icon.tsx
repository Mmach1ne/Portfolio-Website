import type { ReactNode } from 'react';
import { Box } from '../Box';
export type IconProps = { children: ReactNode; label?: string; size?: number };
export function Icon({ children, label, size = 24 }: IconProps) {
  return (
    <Box
      component="span"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      sx={{ display: 'inline-flex', width: size, height: size }}
    >
      {children}
    </Box>
  );
}
