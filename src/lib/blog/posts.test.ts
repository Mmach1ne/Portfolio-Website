import { describe, expect, it, vi } from 'vitest';
import * as fs from './fs';
import { getPost, listPublished } from './posts';

describe('blog posts', () => {
  it('parses hello.mdx frontmatter and content', () => {
    const post = getPost('hello');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('hello');
    expect(post?.frontmatter.title).toBeTruthy();
    expect(post?.frontmatter.description).toBeTruthy();
    expect(post?.frontmatter.tags.length).toBeGreaterThan(0);
    expect(post?.content.length).toBeGreaterThan(0);
    expect(post?.readingTime).toMatch(/min read$/);
  });

  it('parses thermal-dynamics.mdx', () => {
    const post = getPost('thermal-dynamics');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('thermal-dynamics');
    expect(post?.frontmatter.title).toMatch(/thermal/i);
    expect(post?.content).toMatch(/ThermalDynamic\.pdf/);
  });

  it('omits draft posts from listPublished', () => {
    const readRawActual = fs.readRaw;

    vi.spyOn(fs, 'listPostSlugs').mockReturnValue(['hello', 'draft-post']);
    vi.spyOn(fs, 'readRaw').mockImplementation((slug) => {
      if (slug === 'draft-post') {
        return [
          '---',
          'title: Draft Post',
          'description: Not public',
          'date: 2026-01-01',
          'tags: [draft]',
          'draft: true',
          '---',
          'This should not appear in the index.',
        ].join('\n');
      }

      return readRawActual(slug);
    });

    const slugs = listPublished().map((post) => post.slug);
    expect(slugs).toContain('hello');
    expect(slugs).not.toContain('draft-post');

    vi.restoreAllMocks();
  });
});
