'use client';

import { Container, Text } from '@/components/0-primitive';
import { BlogList } from '@/components/2-module/BlogList';
import { SiteFooter } from '@/components/2-module/SiteFooter';
import { PageBackdrop } from '@/components/3-layout/PageBackdrop';
import { SiteShell } from '@/components/3-layout/SiteShell';
import type { BlogPost } from '@/lib/blog/schema';

type BlogIndexPageProps = {
  posts: BlogPost[];
};

export function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <>
      <PageBackdrop />
      <SiteShell footer={<SiteFooter />}>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Text variant="title" component="h1" sx={{ mb: 4 }}>
            Blog
          </Text>
          <BlogList posts={posts} />
        </Container>
      </SiteShell>
    </>
  );
}
