# Pending — Site Side

## Vercel "Deployment Storage" hitting the 10GB free-tier limit — partially fixed

Vercel emailed that the team hit 100% of the free Hobby tier's Deployment Storage. Diagnosed and confirmed via Vercel's own docs (`vercel.com/docs/deployment-storage`): this metric is build output + static assets, and it accumulates **across every retained deployment**, not just the current production one — so a heavy `public/` folder times dozens of historical deployments adds up fast. The blog cover/inline images (hosted on Cloudinary) never touch this at all — the real cause was dead weight committed straight into the repo's `public/` folder, which Next.js bundles into every single deployment.

**Fixed (`fe15cec`)**: `public/imgs/blog/{39,40,41,42,43,44a,47,50}.{jpg,png}` (~76MB) were leftover local cover images from before the Cloudinary migration — confirmed zero references anywhere in the code (the `MOCK_BLOG_N` entries that used them were already removed). `public/imgs/community/ourCommunity/marc-video.MOV` (84MB) was an unused raw duplicate of `marc-video.mp4`, the only one actually referenced. Deleted both — **~160MB removed from every future deployment's output**, no visual change to the site. Didn't touch git history (out of scope, doesn't affect this metric — Deployment Storage is about build output from the current tree, not the `.git` folder size).

**Deployment Retention Policy — checked, not configurable on this plan.** On Hobby, retention is a fixed 30 days across Canceled/Errored/Preview/Production, with no dashboard control to shorten it (confirmed empirically: Project Settings → Security shows only "OIDC Federation" and a read-only "Recently Deleted Deployments" list, no editable policy section — that section is Pro/Enterprise-only). So this lever isn't available without upgrading; the two levers actually in the team's control on Hobby are output size (above) and deployment/branch volume (below).

**Fixed (`git push origin --delete`, 2026-09-08)**: found 5 stale branches beyond `main` — each one a Vercel deployment retention *exception* ("last preview deployment for an active branch" is exempt from the 30-day auto-cleanup forever, as long as the branch exists), so they were pinning storage indefinitely regardless of retention settings. Diffed each against `main` before touching anything:
- `julian`, `marc` — 0 commits ahead of `main` (fully merged, pure leftover pointers) — deleted.
- `blog/phishing-attacks` — 1 commit, an early draft superseded by the real published post already live on `main` — deleted.
- `test/blog-automation-14` — 1 commit, an early test-publish of blog #14 superseded by the real one on `main` — deleted.
- `test/blog-automation-webapp` — **73 commits ahead of `main`**, the staging branch the whole SEO project published through before cutting over to `main` directly. Team decision: **keep it a while longer rather than delete now**, since it's real history, not a leftover pointer.

**Reminder — revisit `test/blog-automation-webapp`**: check its last commit date next time this doc gets touched (`git log -1 origin/test/blog-automation-webapp`). If it's been several weeks with no new activity (everything already publishes straight to `main` now, so it shouldn't need touching again), delete it the same way — `git push origin --delete test/blog-automation-webapp`. Confirm first that `git log main..origin/test/blog-automation-webapp` doesn't show anything that isn't already superseded on `main`.

New test branches are fine to create if needed later — the problem was never having a test branch, it was one sitting unused indefinitely.

**Possible follow-up, not done (needs visual QA first)**: several *in-use* SVGs are suspiciously huge for vector files — `public/imgs/services/background.svg` (19MB), `contact/linesBackground.svg` (12MB), `services/heroBack.svg` (11MB), `community/background.svg` (6.4MB), `texture.svg` (5MB) — likely SVGs with a base64-embedded raster image inside rather than real vector paths. Converting these to properly compressed WebP/PNG (or real vectors) could shave another ~50MB off every deployment, but needs a visual check first since it changes actual served assets. `team/member3.jpg` (8.7MB) and `team/member4.JPG` (2.7MB) are also candidates for basic compression. Not urgent given the fixes above already cut per-deployment output roughly in half and stopped several branches from pinning storage indefinitely.

## SEO republish project: done

All work tracked here previously (merging the test-branch metadata fix, migrating the 13 content-blocked posts, the two post-go-live regressions) is complete and live on `main`. See `status.md` for the full list. Nothing outstanding from this project.

## Rebranding — plan of action

The company did a full rebrand (new "GC" logo, new color palette, new typography, a documented brand voice). Only the favicon/app icon has been applied to this site so far; no other visual changes to `good-company-it-website` yet. The internal `seo-blog-tool` admin app (`Iniciar Blog Tool`) *has* had the full visual system applied already — see its own `docs/architecture.md` — and can be used as a working reference for how the tokens/fonts look in practice before doing the same here.

**Where the reference material lives**: `good-company-it-website/rebrand-docs/` — currently:
- `GOCO BRAND GUIDELINES 2026.pdf` — full spec (colors, type, usage rules, brand voice).
- `logo-GOCO.png` — the new logo (also already copied to `app/[locale]/icon.png` as the site's favicon/app icon).

This folder is **gitignored** (`/rebrand-docs/` in `.gitignore`) — it's reference material for planning/building from, not something the site ships. Large files (the guidelines PDF, and future Figma exports) staying out of git history is intentional. Figma page exports, when they arrive, go in `rebrand-docs/figma-exports/`.

**Confirmed brand spec** (read from the guidelines PDF):
- Colors: Goco Orange `#FF5308` (primary), Biscaye Blue `#00BCC9` (secondary), Sunset Yellow `#FFD166` (complementary), plus neutrals `#1B1B1B` (dark), `#FFF9F4` (cream/off-white), `#FFFFFF`.
- Typography: **Orbitron** (Semibold) is the logo/display typeface — for the wordmark and short, large headline moments (site chrome, hero sections, nav-level branding). **Montserrat** (Regular/Medium/Semibold) is the secondary typeface for everything else.
- **Team decision: blog article content is Montserrat-only** — title/H1 through H2/H3 and body copy, no Orbitron anywhere inside an article. Orbitron stays reserved for site-level branding moments outside the article itself. (Applied already in the `seo-blog-tool` admin app: the article-title preview there uses Montserrat, while the app's own chrome — its header, modal titles — keeps Orbitron.)
- Brand voice / tone guidance exists too (confident, direct, warm, thorough, value-rooted, structured; concrete "we say / we don't say" examples per context) — tracked in `seo-blog-tool`'s docs since it's about editorial copy, not site code. See that repo's `docs/pending.md`.

**Planned method** (agreed with the team): they provide the brand guidelines doc + a per-page Figma export + copy text; Claude replicates each page from that. Confirmed as a sound approach, with two refinements decided up front:

1. **Prefer Figma Dev Mode / Inspect access over flat exported images** where possible — exact hex/spacing/type values beat eyeballing a PNG. Not yet set up; revisit when the actual page designs are ready to hand off, and walk through enabling shared Dev Mode access at that point.
2. **Update centralized design tokens first, not page-by-page** — the codebase already uses named color tokens (`primary-orange: '#FF4E00'`, `secondary-orange: '#FF723F'`, etc. in `tailwind.config.js`), referenced throughout components (`bg-primary-orange`, `text-primary-orange`, ...) rather than one-off hex values. Updating this one file to the confirmed hex values above should propagate the color change site-wide instead of hunting through every component individually. Same logic applies to typography — add both Orbitron and Montserrat to `tailwind.config.js`'s `fontFamily` config, and apply per the article-vs-chrome rule above.

**Suggested order once page designs land** (not yet started, no blockers — just waiting on the Figma exports):
1. Update `tailwind.config.js` color tokens and add the two font families, per the confirmed spec above.
2. Verify the global token change looks right across a few existing pages before touching per-page layout. Pay attention to blog post pages specifically — confirm article headings/body render in Montserrat only, not Orbitron.
3. Go page by page against the Figma exports for actual layout/component changes, dropping in the provided copy.
4. Test each page locally (`npm run dev`) before pushing — same review process used throughout the SEO project (never push straight to `main` without a local check first).
5. Swap `public/logo.svg` (nav/footer logo) and any other brand imagery once provided — not done yet, only the icon has been applied.

## Planned cleanup (explicitly deferred, unrelated to rebranding)

Now that the SEO migration is fully done, this is unblocked whenever the team wants to schedule it:
- Remove the dead Strapi call path from `components/blog/utils/data.js` (unreachable in production, but still executes and fails on every request before falling back to the static array) — including the hardcoded plaintext API token.
- Remove the now-empty static `MOCK_BLOG_N` array/fallback logic entirely.
- Remove `BlogDetailClient.jsx`'s client-side fetch fallback — every original post now has a `content/blog/{slug}.md` file and is server-rendered, so the fallback path is only still relevant for brand-new posts published via the tool's web app before their file exists... actually it's always present once published, so this fallback may already be fully dead. Worth confirming before removing.

## Not part of this project's scope

General design/UI adjustments unrelated to the rebrand or the blog system are normal ongoing site work, done directly in this repo.
