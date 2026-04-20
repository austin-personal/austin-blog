import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="py-6">
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
      <h2 className="mt-2 text-xl font-semibold text-gray-900">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-1 text-gray-600 line-clamp-2">{post.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
