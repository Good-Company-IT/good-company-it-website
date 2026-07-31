# Status — Site Changes from the SEO Automation Project

## Live on `main` today

- ✅ **Blog nav link fixed** (`e4c9b09`) — was hardcoded as an external absolute URL with `target="_blank"`, forcing it to open in a new tab even though the blog is served by this same site. Now a normal internal link (`href="/blog"`), consistent with the rest of the nav.
- ✅ **Disconnected test mock blog removed** (`5a35522`) — "Cybersecurity & I.T.: Safeguarding Your Digital World" was the very first test entry from early in the project, had no real metadata, and was never an official post. Removed from `components/blog/utils/data.js`.

## Built and verified, but only on the `test/blog-automation-webapp` branch — not yet on `main`

- ✅ **Server-side blog metadata (fixes a real SEO bug)** (`486d8f0`) — `app/[locale]/blog/[slug]/page.jsx` is now an async Server Component:
  - `generateMetadata({ params })` reads `content/blog/{slug}.md` (front-matter via `gray-matter`) and returns real per-blog `title`, `description`, canonical URL, OpenGraph, and Twitter card metadata.
  - **The bug this fixes**: previously, every blog post shared the site's generic metadata — Google indexed every post with the same title/description, and social shares (Facebook/LinkedIn/Twitter, which don't execute JS) showed a generic card for every article regardless of which one was shared.
  - **Backward compatible by design**: a blog with no `content/blog/{slug}.md` file yet returns `{}` from `generateMetadata`, silently inheriting the old generic metadata — i.e., today's behavior is the fallback, nothing breaks for unmigrated posts.
  - `components/blog/single-blogs/BlogDetailClient.jsx` now accepts an `initialBlog` prop; if the server already loaded the data, it skips its own client-side fetch entirely. If not (post not migrated), it falls back to its original `getBlogBySlug()` fetch from `data.js` — unchanged behavior.
  - Verified on a local dev server: correct metadata + body content for a migrated post; byte-for-byte identical behavior to before for a non-migrated one.
  - Adds `gray-matter` as a dependency.
- ✅ **Two blog posts migrated to the new content-file system**: `content/blog/cloud-misconfigurations-compliance-data-risk.md` (#13, commit `9f3499a`) and `content/blog/supply-chain-attacks-target-small-businesses.md` (#14, commit `f608352`). Their corresponding `MOCK_BLOG_N` hardcoded entries were removed from `data.js` in the same commits — old and new data never coexist for a migrated post.

## Known issues found during this project

- **Fixed** (see above): missing per-post metadata.
- **Root-caused, being fixed via migration (external tool)**: 20 of the 21 originally-live blog posts are missing a real conclusion section — traced to the old manual publishing process losing content during conversion, not to the source documents (the original `.docx` files do contain real conclusions). Gets fixed automatically as each post is migrated through the new pipeline.
- **Flagged, not fixed (explicit decision)**: `components/blog/utils/data.js` has a hardcoded Strapi API token in plaintext, pointing at `localhost:1337` (which is unreachable in production — Strapi is effectively dead code today; the static `MOCK_BLOG_N` array is what actually serves content). Left alone since Strapi isn't a current priority.
- **Resolves automatically per migrated post**: several images already committed to this repo are far above a reasonable size (some 15–20MB) — each gets replaced with a Cloudinary-hosted, compressed (1200×630 WebP, well under 200KB) version as its post is migrated.

## Ongoing content work

Publishing new posts and migrating/fixing existing ones is handled by a separate tool — see [`Good-Company-IT/goco-seo-blog-tool`](https://github.com/Good-Company-IT/goco-seo-blog-tool). That repo's `docs/pending.md` has the current status of the historical migration (2 of 20 original posts done; 13 blocked on content fixes from the marketing team; 5 unblocked by a recent image-compression fix but not yet re-run).
