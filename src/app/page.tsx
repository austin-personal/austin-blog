import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Austin Playground
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Development, technology, and everything in between.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </>
  );
}
