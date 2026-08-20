import type { Metadata } from 'next';
import { BlogIndexPage } from '@/components/4-page/BlogIndexPage';
import { site } from '@/content/site';
import { listPublished } from '@/lib/blog/posts';

export const metadata: Metadata = {
  title: `Blog – ${site.name}`,
  description: 'Notes on projects, research, and engineering.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const posts = listPublished();
  return <BlogIndexPage posts={posts} />;
}
