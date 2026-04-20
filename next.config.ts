import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/austin-blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
