import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogDetailClient from "@/components/blog/single-blogs/BlogDetailClient";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// Blogs published through the new pipeline live here as Markdown + front-matter.
// Older blogs not yet migrated have no file here — BlogDetailClient falls back
// to its existing data.js-based fetch in that case.
function getBlogFromFile(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...data, content };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogFromFile(slug);
  if (!blog) return {};

  // Posts are English-only, so /es/blog/{slug} is a duplicate of the /en one.
  // Both point their canonical at /en: visitors can still use /es, but search
  // engines index a single version.
  const url = `https://www.goodcompanyit.com/en/blog/${slug}`;

  return {
    metadataBase: new URL("https://www.goodcompanyit.com"),
    title: blog.title,
    description: blog.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      url,
      images: blog.image ? [{ url: blog.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blog = getBlogFromFile(slug);
  return <BlogDetailClient slug={slug} initialBlog={blog} />;
}
