import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";

interface SidebarProps {
  categories: string[];
  recentPosts: PostMeta[];
}

export default function Sidebar({ categories, recentPosts }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 space-y-8">
        <section>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Categories
          </h3>
          <ul className="mt-3 space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/posts?category=${cat}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {CATEGORIES[cat] ?? cat}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Recent Posts
          </h3>
          <ul className="mt-3 space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors leading-snug"
                >
                  {post.title}
                </Link>
                <time className="text-xs text-gray-400" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </aside>
  );
}
