import { Box, Link, Stack, Text } from '@/components/0-primitive';
import type { BlogPost } from '@/lib/blog/schema';
import { tokens } from '@/theme';

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return <Text variant="body">No posts yet.</Text>;
  }

  return (
    <Stack spacing={4}>
      {posts.map((post) => (
        <Box key={post.slug}>
          <Link href={`/blog/${post.slug}`} sx={{ textDecoration: 'none' }}>
            <Text
              variant="subtitle"
              component="h2"
              sx={{
                color: tokens.palette.text,
                '&:hover': { color: tokens.palette.accent },
              }}
            >
              {post.frontmatter.title}
            </Text>
          </Link>
          <Text variant="caption" sx={{ color: tokens.palette.muted, mt: 1 }}>
            {post.frontmatter.description}
          </Text>
          <Text variant="caption" sx={{ display: 'block', mt: 1, color: tokens.palette.muted }}>
            {post.frontmatter.date} · {post.readingTime}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}
