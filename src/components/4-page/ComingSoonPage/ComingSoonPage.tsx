'use client';

import { Box, Text } from '@/components/0-primitive';
import { PageBackdrop } from '@/components/3-layout/PageBackdrop';
import { site } from '@/content';

export function ComingSoonPage() {
  return (
    <>
      <PageBackdrop />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <Text variant="title">{site.comingSoon.message}</Text>
      </Box>
    </>
  );
}
