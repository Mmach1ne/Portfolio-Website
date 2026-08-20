import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { listPublished } from '@/lib/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = listPublished();

  return [
    { url: site.canonical, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${site.canonical}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.canonical}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${site.canonical}/coming-soon`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
