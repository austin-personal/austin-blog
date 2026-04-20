"use client";

import { useState, useMemo } from "react";
import PostList from "@/components/PostList";
import CategoryFilter from "@/components/CategoryFilter";
import type { PostMeta } from "@/lib/posts";

interface PostsClientProps {
  posts: PostMeta[];
  categories: string[];
}

export default function PostsClient({ posts, categories }: PostsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Posts</h1>
      <div className="mt-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <div className="mt-4">
        <PostList posts={filteredPosts} />
      </div>
    </>
  );
}
