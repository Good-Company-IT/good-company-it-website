# Process Improvements — Site Engineering

How this codebase's blog system has changed as a result of the SEO automation project. See the [tool repo's process-improvements.md](https://github.com/Good-Company-IT/goco-seo-blog-tool/blob/main/docs/process-improvements.md) for the *editorial workflow* side (how blogs get from a Word doc to published) — this file is about the *code*.

## Metadata: from broken to real

**Before**: `app/[locale]/blog/[slug]/page.jsx` had no `generateMetadata` at all — every blog post inherited the same generic site-wide title/description. Google indexed every post identically, and social shares (Facebook/LinkedIn/Twitter, which don't run JS) showed a generic card no matter which article was actually shared.

**After**: the page is a Server Component that reads the post's own `content/blog/{slug}.md` front-matter and generates real per-post `title`, `description`, canonical URL, and OpenGraph/Twitter metadata. Backward compatible — a post without a content file yet just inherits the old generic metadata, so nothing broke for posts not yet migrated.

## Content: from hardcoded objects to files

**Before**: every blog post was a hand-maintained JavaScript object (`MOCK_BLOG_39`, `MOCK_BLOG_40`, ...) inside `components/blog/utils/data.js` — a single file that had grown to 3,000+ lines. Adding or fixing a post meant editing a giant shared file by hand, with no structural validation and easy-to-miss mistakes (which is exactly how 20 of 21 live posts ended up missing their conclusion section — lost during manual editing, not missing from the original source).

**After** (in progress, migrating incrementally): each post is a standalone Markdown file with YAML front-matter in `content/blog/`, generated and validated automatically by the separate publishing tool. A post's old `data.js` entry is removed in the same commit that adds its new file, so a given post's data only ever lives in one place.

## Images: from bloating the repo to Cloudinary

**Before**: cover and inline images were committed directly into `public/imgs/blog/` — some as large as 15–20MB, since nothing enforced a size limit. Every version of every image stays in git history forever, so the repo only grows.

**After** (per migrated post): images are hosted on Cloudinary, auto-cropped to 1200×630, converted to WebP, and compressed to well under 200KB — with local pre-compression for oversized sources before upload. The repo stops accumulating image weight for every post that migrates.

## Navigation: small but real UX fix

**Before**: the "Blog" nav link was hardcoded as an external absolute URL with `target="_blank"`, forcing a new tab/window even though the blog is part of this same site.

**After**: a normal internal link, consistent with the rest of the nav (Services, About, Community).
