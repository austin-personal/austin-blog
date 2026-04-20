import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  published: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMDXFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function fileToSlug(filePath: string): string {
  return path
    .relative(POSTS_DIR, filePath)
    .replace(/\.mdx$/, "")
    .replace(/\//g, "-");
}

function parsePost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug: fileToSlug(filePath),
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getMDXFiles(POSTS_DIR);

  return files
    .map((file) => {
      const post = parsePost(file);
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = getMDXFiles(POSTS_DIR);

  for (const file of files) {
    const post = parsePost(file);
    if (post.slug === slug && post.published) {
      return post;
    }
  }

  return undefined;
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}
