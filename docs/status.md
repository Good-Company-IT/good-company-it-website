# Status — Site Changes from the SEO Automation Project

## Live on `main` — SEO republish project (complete)

- ✅ **Server-side blog metadata** (`486d8f0`, cherry-picked to `main` as `e08bf96`) — `app/[locale]/blog/[slug]/page.jsx` is an async Server Component:
  - `generateMetadata({ params })` reads `content/blog/{slug}.md` (front-matter via `gray-matter`) and returns real per-post `title`, `description`, canonical URL, and OpenGraph/Twitter metadata.
  - **The bug this fixed**: every blog post used to inherit the same generic site-wide metadata — Google indexed every post identically, and social shares (Facebook/LinkedIn/Twitter, which don't run JS) showed a generic card regardless of which article was shared.
  - `BlogDetailClient.jsx` accepts an `initialBlog` prop from the server; falls back to its own client fetch only for a post with no content file yet.
  - **Verified on the live site**: `Ctrl+U` on a real published post shows the real `<title>`, `<meta name="description">`, canonical link, and full Open Graph/Twitter tags.
- ✅ **All 20 of the originally-live blog posts migrated** from hardcoded `MOCK_BLOG_N` objects in `data.js` to `content/blog/{slug}.md` files, each with real metadata and corrected content (missing H2 structure, missing conclusions, keyword placement — see the tool repo's `docs/pending.md` for the full per-post history). Confirmed live and file-verified against the real repo.
- ✅ **Blog listing page fixed to read the new content files** (`a408df1`) — found right after the above went live: the `/blog` grid page (`Main.jsx` / `data.js`'s `fetchBlogData()`) only ever read Strapi + a handful of hardcoded static entries, never `content/blog/*.md`. Once the 20 posts' static entries were removed by the migration, they became reachable by direct URL but invisible in the listing. `app/[locale]/blog/page.jsx` now also reads every file in `content/blog/` and passes it to `Main` as `initialBlogs`, merged client-side with whatever `fetchBlogData()` still returns.
- ✅ **`removeMockBlogEntry` (tool-side) fixed for the last-surviving-reference case** — as the static fallback arrays in `data.js` emptied out post by post, the regex that strips a `MOCK_BLOG_N` reference couldn't handle it being the *sole* remaining array element (no comma to anchor on). Fixed in the tool repo; mentioned here because it blocked site commits, not because the fix lives in this repo.
- ✅ **Blog card Share button wired up, Bookmark removed** (`f359e52`, `components/blog/utils/BlogGrid.jsx`) — both were unimplemented placeholders (`// Handle bookmark/share logic here`, no-ops). Share now calls `navigator.share()` where supported (native OS share sheet — verified on Windows/Edge), falling back to copying the URL with a brief checkmark-icon confirmation. Bookmark removed — low value for a B2B site with no login/reading-list feature; kept as a future idea if repurposed (e.g. "email me this article" for lead capture) rather than left as a dead button.
- ✅ **Blog nav link fixed** (`e4c9b09`) — was hardcoded as an external absolute URL with `target="_blank"`; now a normal internal link.
- ✅ **Disconnected test mock blog removed** (`5a35522`) — first-ever test entry, no real metadata, never an official post.
- ✅ **Categories assigned** for the original 20 (`Cybersecurity` / `Managed IT Services` / `IT Operations`) and for a second batch of new posts (`Compliance`, `Cyber Resilience` added — see tool repo's `docs/pending.md` for the per-post reasoning). Category isn't inferred by any code — it's a Sheet column copied straight into front-matter; assignment is a manual, content-read judgment call, not automated (team explicitly declined an API-cost-per-call classifier).
- ✅ **Blog #1 re-published solo** (`25f838e`) to fix a heading-structure issue found after the fact — used the tool's targeted-republish mode (`node src/republishLiveBlogs.js 1`) to update just that one post without touching the other 19.
- ✅ **Cover/inline image cropping fixed for #17-#20** (`e4457a3` here; see tool repo's `docs/pending.md` for the full saga) — split Cloudinary into two upload presets (`goco_blog_cover` force-crops to a fixed 1200×630 for the banner slot, `goco_blog_aux` never crops, for inline text-heavy graphics). `BlogCoverImage.jsx` extracted as the shared cover-image component (hero + both grid card variants), reverted to a plain full-bleed `object-cover` fill now that the cover always arrives pre-cropped to match. Confirmed live on both images.

## Known issues found during this project — resolved

- ~~Missing per-post metadata~~ — fixed (see above).
- ~~20 of 21 originally-live posts missing a real conclusion section~~ — traced to the old manual publishing process losing content during conversion (not missing from the source `.docx` files); fixed automatically as each post migrated through the new pipeline.
- ~~Oversized images committed to the repo (some 15–20MB)~~ — resolved per migrated post: hosted on Cloudinary, auto-compressed to well under 200KB.
- **Flagged, still not fixed (explicit decision, unchanged)**: `components/blog/utils/data.js` has a hardcoded Strapi API token in plaintext, pointing at an unreachable `localhost:1337`. Left alone — not a current priority. See "Planned cleanup" in `pending.md`.

## Rebranding — new initiative, just started

- **Favicon/app icon updated** (new "GC" logo) — the only visual change applied so far. See `pending.md` for the full plan and what's still waiting on assets.
- `rebrand-docs/` folder created at the repo root (gitignored — reference material, not shipped): brand guidelines PDF + the new logo file. See `pending.md`.

## Ongoing content work

New blog posts (beyond the original 20) are published through the same tool, via its web app rather than the batch script — see [`Good-Company-IT/goco-seo-blog-tool`](https://github.com/Good-Company-IT/goco-seo-blog-tool)'s `docs/pending.md` for current status.
