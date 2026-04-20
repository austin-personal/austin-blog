import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          austin-blog
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Development, technology, and everything in between.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">All Posts</h2>
        <PostList posts={posts} />
      </section>
    </>
  );
}
