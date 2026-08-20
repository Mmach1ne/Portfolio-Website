import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { Box, Link, Text } from '@/components/0-primitive';
import { WindowChrome } from '@/components/1-composition';
import { tokens } from '@/theme';

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
  },
};

export const mdxComponents = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <Text variant="title" component="h1" sx={{ mt: 4, mb: 2 }} {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <Text variant="subtitle" component="h2" sx={{ mt: 3, mb: 2 }} {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <Text
      variant="subtitle"
      component="h3"
      sx={{ mt: 3, mb: 1, fontSize: '1.125rem' }}
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <Text variant="body" component="p" sx={{ mb: 2 }} {...props} />
  ),
  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
    if (!href) return <span {...props}>{children}</span>;
    const external = href.startsWith('http');
    return (
      <Link href={href} external={external} {...props}>
        {children}
      </Link>
    );
  },
  ul: ({ children }: React.ComponentProps<'ul'>) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }: React.ComponentProps<'ol'>) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <Text variant="body" component="li" sx={{ mb: 0.5 }} {...props} />
  ),
  pre: ({ children }: React.ComponentProps<'pre'>) => (
    <WindowChrome title="code">
      <Box
        component="pre"
        sx={{
          m: 0,
          overflow: 'auto',
          fontFamily: tokens.fontFamily.mono,
          fontSize: '0.875rem',
          lineHeight: 1.6,
        }}
      >
        {children}
      </Box>
    </WindowChrome>
  ),
  code: ({ children }: React.ComponentProps<'code'>) => (
    <Box component="code" sx={{ fontFamily: tokens.fontFamily.mono }}>
      {children}
    </Box>
  ),
};
