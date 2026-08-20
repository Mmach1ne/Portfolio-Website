import type { ReactNode } from 'react';
import { Box } from '@/components/0-primitive';

type HashSectionProps = {
  id: string;
  children: ReactNode;
  minHeight?: string | number;
};

export function HashSection({ id, children, minHeight = 'auto' }: HashSectionProps) {
  return (
    <Box component="section" id={id} sx={{ minHeight, px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 } }}>
      {children}
    </Box>
  );
}
