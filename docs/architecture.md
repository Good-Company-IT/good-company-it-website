# Architecture Reference — site side

Stable reference for this repository. It does not hold a to-do list: open items are tracked outside the repo, in the team's private list. What is built and when is in [status.md](./status.md); privacy and cookie rules are in [compliance.md](./compliance.md); the rebrand plan is in [rebrand-plan.md](./rebrand-plan.md). The blog publishing tool has its own `docs/architecture.md` in [`Good-Company-IT/goco-seo-blog-tool`](https://github.com/Good-Company-IT/goco-seo-blog-tool) (private repo).

## What this repository is

- Next.js 14 site for goodcompanyit.com. Production is `main`, auto-deployed by Vercel (Hobby plan) on every push. Every other pushed branch creates a Vercel preview deployment.
- Locales are **en and es only**. French was removed on 2026-09-18 and `/fr/*` redirects (308, permanent) to `/en/*` in `next.config.mjs`; remove that redirect if French ever returns.
- Blog posts arrive as commits straight to `main` from the `seo-blog-tool` repo ("Add blog #N: slug" / "Update blog #N: slug"), roughly 5 a month, each one triggering a deployment. If a published post does not show up live, check the Vercel build first (see the tool repo's `docs/architecture.md` → "Troubleshooting: a blog is Published but not live"; Redeploy fixes transient build errors).

## Blog content contract

A post is `content/blog/{slug}.md`, read with `gray-matter`. Front-matter: `slug, title, description, keyword, category, author, date, readTime, image, imageAlt, featured`. Body: Markdown with GFM tables and inline Cloudinary images. Anything that rebuilds the blog pages must keep this contract working.

- `app/[locale]/blog/[slug]/page.jsx` is an async Server Component: `generateMetadata` reads the post file and returns real title, description, canonical and Open Graph/Twitter metadata; the page passes the parsed post to `BlogDetailClient` as `initialBlog`. A slug without a `.md` file shows "Blog not found".
- `app/[locale]/blog/page.jsx` reads every file in `content/blog/` and passes it to `Main` as `initialBlogs`.
- `/es/blog/{slug}` serves the same English text and canonicalizes to `/en/blog/{slug}`, so search engines index one version. Real Spanish posts are not planned (proposal in the tool repo's `docs/bilingual-blog-proposal.md`).
- `app/sitemap.js` (dynamic: static pages `/en`, `/en/about`, `/en/services`, `/en/community`, `/en/contact`, `/en/blog` plus one entry per `content/blog/*.md`, `/en` only) and `app/robots.js` (with the `Sitemap:` line). After a redesign that changes the page list, update the static paths in `app/sitemap.js`. No static `public/sitemap.xml` or `public/robots.txt` may exist (they would conflict with the dynamic routes).
- **Search Console ownership** is verified by two methods: the HTML tag (`metadata.verification.google` in `app/[locale]/layout.js`, read by Googlebot from the initial HTML, no cookies) and Google Tag Manager. GTM loads only after cookie consent, so **keep the HTML tag in any redesign**.

## Booking-button rule

In `components/blog/single-blogs/BlogDetailClient.jsx`, any Markdown link whose `href` is exactly `BOOKING_URL` (the company's booking-calendar link, defined as a constant in that file) renders as the orange brand button (`primary-orange`, calendar icon, opens in a new tab); every other link keeps the normal blue style. It works in any post: the `.docx` only needs that hyperlink in its own paragraph (conventions in the tool repo's `docs/architecture.md` → "Content conventions for the closing call to action"). If the booking URL changes, update the constant here: posts still using the old URL fall back to a plain link. Carry the `a` renderer rule over whenever the blog page is rebuilt.

## This repository must stay public

Vercel's free Hobby plan cannot deploy a private repository owned by a GitHub organization. Tested 2026-09-30: switching the repo to private and pushing a docs commit created no deployment, and GitHub said the free plan can't make the connection; it was reverted to public. Pro is not planned until the project is profitable. If that ever changes: Pro, then Settings → General → Danger Zone → Change visibility.

Because it is public, in this repo and its `docs/`:
- Never commit secrets, keys, tokens, `.env` files, private IDs or anything internal-sensitive. Sheet and Drive IDs and Cloudinary credentials live only in the private tool repo and in `.env` files. Assume everything here, including old versions, is readable by anyone.
- Julián's commits use his GitHub `noreply` e-mail (GitHub's "Keep my email addresses private" is on and `user.email` is set to it in both repos). Keep it that way; old commits keep the real address, history was not rewritten.
- **History scan (2026-10-07):** searched all history for key and secret patterns. The only credentials ever committed were the Firebase **web** configuration of the template this code was cloned from (`NEXT_PUBLIC_FIREBASE_*` in an old `.env` and `firebase/creds.js`), which is public by design and was removed on 2026-09-02; the old Strapi token only pointed at a local `localhost:1337`. Nothing needed rotating and no history rewrite was needed. The one other pattern hit was random text inside a large base64 SVG.

## Working next to the unattended publisher

The tool, including its 9:00 AM Windows task, commits into the main checkout and refuses to run unless that checkout is **clean, on `main` and in sync with `origin`**. Uncommitted work, or a feature branch checked out there, makes every scheduled publish fail (logged, retried next day). So:
- Do redesign and docs work in a second clone or `git worktree` on its own branch, and keep the main checkout permanently on a clean `main` (or point the tool at a dedicated clone through `WEBSITE_REPO_PATH`).
- After merging anything to `main`, `git pull` the main checkout the same day, before the next 9:00 run: it is behind `origin` until then.
- While a long-lived branch exists, merge `main` into it regularly so new `content/blog/*.md` files keep flowing in.

## Privacy, cookies and forms

All tracking goes through the consent system in `utils/cookies/` (Google Tag Manager and GA4 load only after the visitor accepts; Consent Mode defaults to denied; Global Privacy Control counts as a refusal; the footer has "Cookie settings"). **Read [compliance.md](./compliance.md) before adding any tool, embed or form.** The contact form posts to `app/api/contact/route.js`, which forwards to a Google Apps Script that writes a row to the company CRM; it needs the Vercel environment variables `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_TOKEN` (names only here; values live in Vercel).

## Vercel limits (Hobby)

- **Deployment Storage is capped at 10 GB** and accumulates across every retained deployment. Retention is fixed at 30 days on Hobby (no dashboard control).
- **A live branch pins its last preview deployment forever**, regardless of the 30-day retention, so stale branches silently consume storage. Keep `main` as the only long-lived branch, create short-lived branches for each change, and delete them after merging (stale branches were cleaned on 2026-09-08 and 2026-09-29).
- Cloudinary-hosted blog images do not count; the real weight is whatever sits in `public/` and is bundled into every deployment. About 160 MB of unused covers and a raw video were removed (`fe15cec`).
- Known optional savings (several large in-use SVGs that probably embed base64 rasters, and two team photos) are tracked in the team's private list; they need a visual check before changing.
