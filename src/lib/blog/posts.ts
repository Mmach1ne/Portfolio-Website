import matter from 'gray-matter';
import readingTime from 'reading-time';
import { listPostSlugs, readRaw } from './fs';
import { type BlogPost, postFrontmatterSchema } from './schema';

function parsePost(slug: string): BlogPost {
  const raw = readRaw(slug);
  const { data, content } = matter(raw);
  const frontmatter = postFrontmatterSchema.parse(data);

  return {
    slug,
    frontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

export function listPublished(): BlogPost[] {
  return listPostSlugs()
    .map(parsePost)
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export function getPost(slug: string): BlogPost | null {
  const post = parsePost(slug);
  if (post.frontmatter.draft) return null;
  return post;
}
