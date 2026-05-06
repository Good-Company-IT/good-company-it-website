import BlogDetailClient from "@/components/blog/single-blogs/BlogDetailClient";

export default function BlogDetail({ params }) {
  const { slug } = params;
  return <BlogDetailClient slug={slug} />;
}
