import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://www.goodcompanyit.com";
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// English URLs only: no content is produced in other languages, and the /es
// blog posts canonicalize to /en (see app/[locale]/blog/[slug]/page.jsx).
const STATIC_PATHS = ["", "/about", "/services", "/community", "/contact", "/blog", "/privacy", "/terms"];

// Legal documents whose canonical URL is under /es: the Spanish-only data-processing policy (Colombian
// data-protection law) and the Spanish versions of the Privacy & Cookie Policy and of the Terms.
const SPANISH_ONLY_PATHS = [
  "/es/politica-de-tratamiento-de-datos",
  "/es/privacy",
  "/es/terminos",
];

function getBlogEntries() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
      const slug = data.slug || file.replace(/\.md$/, "");
      const lastModified = data.date ? new Date(data.date) : undefined;
      return {
        url: `${BASE_URL}/en/blog/${slug}`,
        lastModified: lastModified && !isNaN(lastModified) ? lastModified : undefined,
      };
    });
}

// Every published post appears automatically; nothing to maintain by hand.
export default function sitemap() {
  const pages = STATIC_PATHS.map((p) => ({ url: `${BASE_URL}/en${p}` }));
  const spanishOnly = SPANISH_ONLY_PATHS.map((p) => ({ url: `${BASE_URL}${p}` }));
  return [...pages, ...spanishOnly, ...getBlogEntries()];
}
