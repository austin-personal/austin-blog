import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://austin-personal.github.io/austin-blog";
const SITE_NAME = "Austin Playground";
const SITE_DESC = "Development, technology, and everything in between.";
const POSTS_DIR = path.join(process.cwd(), "content/posts");
const OUT_DIR = path.join(process.cwd(), "out");

function getMDXFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
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

function fileToSlug(filePath) {
  return path
    .relative(POSTS_DIR, filePath)
    .replace(/\.mdx$/, "")
    .replace(/\//g, "-");
}

function getPosts() {
  return getMDXFiles(POSTS_DIR)
    .map((file) => {
      const raw = fs.readFileSync(file, "utf-8");
      const { data } = matter(raw);
      return { ...data, slug: fileToSlug(file) };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateSitemap(posts) {
  const urls = [
    { loc: SITE_URL, priority: "1.0", changefreq: "weekly" },
    { loc: `${SITE_URL}/posts`, priority: "0.9", changefreq: "weekly" },
    { loc: `${SITE_URL}/about`, priority: "0.5", changefreq: "monthly" },
    ...posts.map((p) => ({
      loc: `${SITE_URL}/posts/${p.slug}`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: p.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), xml.trim());
  console.log("Generated sitemap.xml");
}

function generateFeed(posts) {
  const items = posts
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${SITE_URL}/posts/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${p.category}</category>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESC}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(OUT_DIR, "feed.xml"), feed.trim());
  console.log("Generated feed.xml");
}

const posts = getPosts();
generateSitemap(posts);
generateFeed(posts);
