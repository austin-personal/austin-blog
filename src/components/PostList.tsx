import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-10 text-center text-gray-500">No posts yet.</p>;
  }

  return (
    <div className="divide-y divide-gray-200">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
