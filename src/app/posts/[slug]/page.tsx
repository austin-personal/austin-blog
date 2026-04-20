import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE, CATEGORIES } from "@/lib/constants";
import { mdxComponents } from "@/components/MDXComponents";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/headings";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [SITE.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: SITE.author.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE.author.name,
    },
  };

  return (
    <div className="flex gap-8">
      <TableOfContents headings={headings} />

      <article className="min-w-0 flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{CATEGORIES[post.category] ?? post.category}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-light" }],
                ],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}
