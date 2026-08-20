import { site } from '@/content/site';
import { listPublished } from '@/lib/blog/posts';

export function GET() {
  const posts = listPublished();
  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${site.canonical}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site.canonical}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description}]]></description>
    </item>`,
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} Blog</title>
    <link>${site.canonical}/blog</link>
    <description>${site.description}</description>
    <language>en</language>
    <atom:link href="${site.canonical}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
