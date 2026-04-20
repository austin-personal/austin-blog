import { getAllPosts, getCategories } from "@/lib/posts";
import type { Metadata } from "next";
import PostsClient from "./PostsClient";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all blog posts by category.",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <PostsClient posts={posts} categories={categories} />;
}
