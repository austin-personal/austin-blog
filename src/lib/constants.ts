export const SITE = {
  name: "austin-blog",
  description: "Development, technology, and everything in between.",
  url: "https://austin-personal.github.io/austin-blog",
  author: {
    name: "Austin Kim",
    email: "austin@example.com",
    bio: "Software engineer who loves building things.",
  },
  postsPerPage: 10,
} as const;

export const CATEGORIES: Record<string, string> = {
  dev: "Development",
  life: "Life",
  career: "Career",
} as const;
