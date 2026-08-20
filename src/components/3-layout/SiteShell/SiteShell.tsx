import type { ReactNode } from 'react';
import { Box } from '@/components/0-primitive';
import { SkipLink } from '@/components/1-composition';
import { Navigation } from '@/components/2-module/Navigation';

type SiteShellProps = {
  children: ReactNode;
  footer?: ReactNode;
};

export function SiteShell({ children, footer }: SiteShellProps) {
  return (
    <Box
      data-testid="site-shell"
      className="bg-transparent"
      sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'transparent', color: '#fff' }}
    >
      <SkipLink />
      <Navigation />
      <Box component="main" id="main" sx={{ position: 'relative', zIndex: 20, pt: 8 }}>
        {children}
      </Box>
      {footer}
    </Box>
  );
}
