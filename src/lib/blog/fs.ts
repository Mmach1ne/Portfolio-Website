import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function listPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function readRaw(slug: string): string {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, 'utf8');
}
