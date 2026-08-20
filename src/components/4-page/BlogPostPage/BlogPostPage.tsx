'use client';

import type { ReactNode } from 'react';
import { Box, Container, Text } from '@/components/0-primitive';
import { SiteFooter } from '@/components/2-module/SiteFooter';
import { PageBackdrop } from '@/components/3-layout/PageBackdrop';
import { SiteShell } from '@/components/3-layout/SiteShell';
import type { BlogPost } from '@/lib/blog/schema';
import { tokens } from '@/theme';

type BlogPostPageProps = {
  post: BlogPost;
  children: ReactNode;
};

export function BlogPostPage({ post, children }: BlogPostPageProps) {
  return (
    <>
      <PageBackdrop />
      <SiteShell footer={<SiteFooter />}>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Text variant="title" component="h1" sx={{ mb: 1 }}>
            {post.frontmatter.title}
          </Text>
          <Text variant="caption" sx={{ color: tokens.palette.muted, mb: 4 }}>
            {post.frontmatter.date} · {post.readingTime}
          </Text>
          <Box
            sx={{
              '& figure[data-rehype-pretty-code-figure]': { my: 3 },
              '& :not(pre) > code': {
                px: 0.75,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.06)',
                fontFamily: tokens.fontFamily.mono,
                fontSize: '0.875em',
              },
            }}
          >
            {children}
          </Box>
        </Container>
      </SiteShell>
    </>
  );
}
