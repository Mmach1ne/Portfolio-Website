import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BlogPostPage } from '@/components/4-page/BlogPostPage';
import { mdxComponents, mdxOptions } from '@/components/4-page/BlogPostPage/mdx';
import { getPost, listPublished } from '@/lib/blog/posts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listPublished().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} – Ray Xue`,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <BlogPostPage post={post}>
      <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
    </BlogPostPage>
  );
}
