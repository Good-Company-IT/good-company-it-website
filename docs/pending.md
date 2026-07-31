# Pending — Site Side

## Decision needed: merge the test-branch work to `main`

Three verified, working commits currently sit only on `test/blog-automation-webapp`, not on `main`:

1. `486d8f0` — server-side metadata generation (the real SEO fix, see `status.md`).
2. `9f3499a` — migrated blog #13 to the new content-file system.
3. `f608352` — migrated blog #14 to the new content-file system.

These are proven (tested on a local dev server, and #13/#14 are live-equivalent content just not on production yet) and don't depend on the other 13 blocked blogs being fixed first. **Merging them to `main` now — instead of waiting for all 20 posts — is a real option**, not something that has to wait. This hasn't been done yet only because it wasn't explicitly requested; flag to the team next time this is picked up.

## Waiting on the marketing team (via the tool project)

13 of the original 20 live blog posts need real content rework (missing H2 structure and/or their target keyword not naturally present) before they can be migrated. Full list lives in the tool repo's `docs/pending.md` and was also handed to the team directly. Nothing to do here until that lands — re-running the tool's `republishLiveBlogs.js` after each fix is what actually re-tests a given post.

## Planned cleanup (explicitly deferred, do only after full migration)

Once every original post is migrated to `content/blog/*.md`:
- Remove the dead Strapi call path from `components/blog/utils/data.js` (it's unreachable in production today, but still executes and fails on every request before falling back to the static array).
- Remove the now-empty static `MOCK_BLOG_N` array/fallback logic entirely.
- Remove `BlogDetailClient.jsx`'s client-side fetch fallback once no post depends on it anymore (every post will have a `content/blog/{slug}.md` file and be server-rendered).
- Re-audit `components/blog/utils/data.js` for the hardcoded Strapi token (remove alongside the rest of that dead code, or sooner if desired independently).

## Not part of this project's scope (noted, not started)

- General design/UI adjustments, image updates unrelated to blog posts, other hyperlink fixes — normal ongoing site work, done directly in this repo the same way the nav fix was (no connection to the SEO tool needed).
