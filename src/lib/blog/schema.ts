import { z } from 'zod';

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.string().min(1),
  tags: z.array(z.string()),
  draft: z.boolean().optional(),
  cover: z.string().optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type BlogPost = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};
