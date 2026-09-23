# Pending — Site Side

## START HERE — state and open items (updated 2026-09-23)

The sections below are a chronological log; if one contradicts this block, this block wins. The tool-side twin is `../../seo-blog-tool/docs/pending.md` (see its "START HERE" and the "Operations runbook" in its `architecture.md`).

**State.** Production is `main`, auto-deployed by Vercel (Hobby plan). `content/blog/` holds **39 posts** (matches the Sheet's 39 Published). Locales are **en and es only** — French was removed on 2026-09-18 and `/fr/*` redirects (308) to `/en/*`. Blog posts arrive as commits straight to `main` from `seo-blog-tool` ("Add blog #N: slug" / "Update blog #N: slug"), each one triggering a Vercel deployment — roughly 5 a month once the monthly schedule is running.

**⚠️ Read before starting the redesign — how it can silently break blog publishing.** The publisher (`seo-blog-tool`, including the unattended 9 AM Windows task) commits into this checkout and refuses to run unless it is **clean, on `main`, and in sync with origin**. Uncommitted redesign work, or a feature branch checked out here, makes every scheduled publish fail (logged, retried the next day). Recommended setup: build the redesign in a **second clone or `git worktree`** on its own branch (e.g. `redesign`) and keep this original checkout permanently on a clean `main` — or point the tool at a dedicated publishing clone through the `WEBSITE_REPO_PATH` env var. While the branch is alive, merge `main` into it regularly so new `content/blog/*.md` files keep flowing in, and keep the blog markdown contract working after the redesign: front-matter `slug, title, description, keyword, category, author, date, readTime, image, imageAlt, featured` (read with `gray-matter`), body in Markdown with GFM tables and inline Cloudinary images. Also remember `main` **is** production, and every pushed branch creates a Vercel preview deployment that counts toward the 10GB Deployment Storage cap.

**Open items, in priority order**
1. **Redesign / rebrand** — tokens, fonts, layouts, logo swap; waiting on the Figma exports. See "Rebranding — plan of action". Includes the new sitemap.
2. **Sitemap + robots.txt** — `public/sitemap.xml` still lists 63 URLs that all belong to toptiertrader.com (the codebase was cloned from that project); the plan (dynamic `app/sitemap.js`, `/en` only, then Search Console) is in its own section below and is scheduled for the redesign.
3. **Vercel storage watch** — check Usage → Deployment Storage → Projects now and then. Reminder: delete the stale branch `test/blog-automation-webapp` if its last commit (`git log -1 origin/test/blog-automation-webapp`) is still weeks old — **as of 2026-09-23 its last commit is from 2026-08-17 (5+ weeks; still 73 commits not in `main`, all superseded), so it now meets the team's "several weeks" bar; ask Julián to confirm, then `git push origin --delete test/blog-automation-webapp`.** It is the only remote branch besides `main`. Optional savings: ~53MB of oversized in-use SVGs and two team photos (details in the Vercel section).
4. **Blog image follow-ups** (audit of all 30 covers and 12 inline images on 2026-09-03): the covers of #10 `managed-it-services-top-cybersecurity-guide`, #12 `ai-driven-phishing-hackers-exploit-personalization-fight-back`, #13 `cloud-misconfigurations-compliance-data-risk`, #14 `supply-chain-attacks-target-small-businesses` and #44 `why-it-visibility-matters-you-cant-protect-what-you-cant-see` have baked-in text slightly clipped by the fixed 1200×630 banner crop — that comes from the source image, so republishing alone won't fix it; it needs a new source cover in Drive with more margin, then a republish. Inline images still uploaded under the old force-crop preset (checked visually, no visible loss): #1 `how-to-recognize-prevent-phishing-attacks`, #6 `why-do-businesses-need-managed-it-services`, #9 `benefits-managed-it-service-provider-msp`, #11 `why-smbs-must-embrace-zero-trust-security`, #43 `how-to-secure-microsoft-365-google-workspace` — they self-heal on their next republish. Also: #27's URL is awkward (`it-projects-it-project-ownership-best-guide-to-better`); fixing it means a new slug plus a redirect.
5. **Code cleanup** (deferred): dead Strapi path and plaintext token in `components/blog/utils/data.js`, empty `MOCK_BLOG_N` fallback, the client-fetch fallback in `BlogDetailClient.jsx`, unused translation keys — see "Planned cleanup".
6. **Optional SEO**: every blog is still served at `/es/blog/{slug}` with the same English text and a self-canonical (duplicate content); point those canonicals at `/en` or `noindex` them (decide during the sitemap work).

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

## Sitemap + robots.txt — deferred to the redesign (planned, not started)

**The problem, confirmed 2026-09-18:** `public/sitemap.xml` (repo and live) lists 63 URLs, **all on `toptiertrader.com`** — a leftover from the project this codebase was cloned from (generated 2024-07 with xml-sitemaps.com, arrived in the "Initial Push"). `public/robots.txt` is also inherited: it disallows `wp-login.php` (WordPress) and has no `Sitemap:` line. Effect: goodcompanyit.com has **no usable sitemap** — none of its pages or ~30 blog posts are listed. Google ignores cross-domain URLs in a sitemap, so it isn't a penalty, just a missed tool (Search Console will flag it, and new posts are discovered only by crawling `/blog`). Team decision: don't patch it now — build the right one as part of the redesign.

**Plan for the redesign** (do all of it together):
1. `app/sitemap.js` (Next.js metadata route, dynamic): static pages (`/en`, `/en/about`, `/en/services`, `/en/community`, `/en/contact`, `/en/blog`) + one entry per `content/blog/*.md` (`/en/blog/{slug}`, `lastModified` from the front-matter `date`). Every published post then appears automatically, no manual upkeep.
2. **`/en` URLs only** (team decision — no content is being produced in other languages).
3. `app/robots.js` with the `Sitemap:` line pointing at it; drop the WordPress `wp-login.php` rule.
4. Delete `public/sitemap.xml` and `public/robots.txt` (a static file in `public/` would conflict with the dynamic routes).
5. Submit the new sitemap in Google Search Console and confirm it reads without errors.
6. Optional, decide then: blog posts are still served under `/es/blog/{slug}` with the same English text and a self-canonical (duplicate content). Point those canonicals at the `/en` version, or `noindex` them.

## Site cleanup 2026-09-18 — French removed, toptiertrader leftovers deleted (done)

Found while reviewing the sitemap: `/fr/about`, `/fr/services`, `/fr/community` and `/fr/contact` returned **HTTP 500 in production** (each page's `generateMetadata` referenced a `metadata_fr` object that was never declared → `ReferenceError`), while "FR" sat in the language switcher. Team decision: French isn't going to happen, so instead of patching it, French was removed entirely (rebuild it later if ever needed):
- Deleted `locales/fr/`; `i18nConfig.js` locales now `['en', 'es']`; removed FR from `LanguageChanger.js`, the `if (locale === "fr")` branches in about/services/community/contact, `metadata_fr` and the `'fr'` alternates in `blog/page.jsx`, and the `lang_fr` translation keys.
- **`next.config.mjs` redirects `/fr/:path*` → `/en/:path*` (permanent).** `/fr/blog` and `/fr/blog/{slug}` had been returning 200, so they may be indexed; this sends them to the English page instead of a 404. Remove the redirect if French ever returns.
- Verified locally (dev server): `/en/*` and `/es/*` all 200, `/fr/*` → 308 → `/en/*`, no errors in the server log.
- **French support claim removed from the copy:** `components/contact/WorkingWithUs/WorkingWithUs.jsx` and `components/home/WhyGoco/WhyGoco.jsx` said "Bilingual support (English, Spanish, French)"; French support isn't offered, so both now read "Bilingual support (English, Spanish)" (the body copy already just said "bilingual"). No other mention of French remains in the code or content.

Deleted the dead toptiertrader promo code (a June-2025 "buy a challenge" promo for another company; the banner was already commented out and nothing appeared in the live HTML):
- `components/common/Banner/` (whole folder: `MainBanner`, `JuneSummerPromoBanner`, its images), `components/common/PopUp/PromoPopUp.jsx`, `PopUp/assets/` (two ~1.4MB PNGs) and `PopUp/animations.css` (only that popup used it).
- `ClientOnlyWrapper.jsx` no longer imports the banner or takes `couponTranslations`/`locale`; `layout.js` no longer builds `couponTranslations`, and no longer passes the footer the toptiertrader-only `affiliates`/`refundLink` keys (the footer never used them).
- `locales/{en,es}/common.json`: 54 → 4 keys (only the `cookie_*` keys are used; the rest were TopTier Trader copy — payouts, challenges, coupon codes). `navbar.json`: removed `academy`, `affiliates`, `beta`, `challenges`, `competitions`, `cm_*`, `dashboard`, `leaderboards`, `merch`, `rewards`.
- Every deleted key was checked for zero references in the code first. Still present on purpose: `public/sitemap.xml` (see above) — the only remaining `toptier` string in the repo.
- Left alone, not toptiertrader: unused "Zeenti Client" template keys in `home.json` and unused IT-consulting keys in `footer.json`.

## SEO republish project: done

All work tracked here previously (merging the test-branch metadata fix, migrating the 13 content-blocked posts, the two post-go-live regressions) is complete and live on `main`. See `status.md` for the full list. Nothing outstanding from this project.

## Rebranding — plan of action

The company did a full rebrand (new "GC" logo, new color palette, new typography, a documented brand voice). Only the favicon/app icon has been applied to this site so far; no other visual changes to `good-company-it-website` yet. The internal `seo-blog-tool` admin app (`Iniciar Blog Tool`) *has* had the full visual system applied already — see its own `docs/architecture.md` — and can be used as a working reference for how the tokens/fonts look in practice before doing the same here.

**Where the reference material lives**: `good-company-it-website/rebrand-docs/` — currently:
- `Brand Guidelines 2026 - Updated.pdf` (July 2026, ~46MB) — full spec (colors, type, usage rules, brand voice). It replaced the earlier `GOCO BRAND GUIDELINES 2026.pdf`. Logo variants and other brand assets also live in `Website/Reference/` (a sibling folder of both repos, not in git).
- `logo-GOCO.png` — the new logo (also already copied to `app/[locale]/icon.png` as the site's favicon/app icon).

This folder is **gitignored** (`/rebrand-docs/` in `.gitignore`) — it's reference material for planning/building from, not something the site ships. Large files (the guidelines PDF, and future Figma exports) staying out of git history is intentional. Figma page exports, when they arrive, go in `rebrand-docs/figma-exports/`.

**Confirmed brand spec** (read from the guidelines PDF):
- Colors: Goco Orange `#FF5308` (primary), Biscaye Blue `#00BCC9` (secondary), Sunset Yellow `#FFD166` (complementary), plus neutrals `#1B1B1B` (dark), `#FFF9F4` (cream/off-white), `#FFFFFF`.
- Typography: **Orbitron** (Semibold) is the logo/display typeface — for the wordmark and short, large headline moments (site chrome, hero sections, nav-level branding). **Montserrat** (Regular/Medium/Semibold) is the secondary typeface for everything else.
- **Team decision: blog article content is Montserrat-only** — title/H1 through H2/H3 and body copy, no Orbitron anywhere inside an article. Orbitron stays reserved for site-level branding moments outside the article itself. (Applied already in the `seo-blog-tool` admin app: the article-title preview there uses Montserrat, while the app's own chrome — its header, modal titles — keeps Orbitron.)
- Brand voice / tone guidance exists too (confident, direct, warm, thorough, value-rooted, structured; concrete "we say / we don't say" examples per context) — tracked in `seo-blog-tool`'s docs since it's about editorial copy, not site code. See that repo's `docs/pending.md`.

**Brand guideline map — `Brand Guidelines 2026 - Updated.pdf`**. Pages 1–17 were read on 2026-09-23; **pages 18 onward were not reviewed in that pass, and the notes above came from the earlier version of the PDF — re-read the whole updated file before starting the redesign.**
- p.3–5 Purpose, Mission/Vision (value-first I.T. + Project Management consulting; Florida's Tri-City region, expanding nationwide) and eight values: Excellence, Adaptability, Authority, Diligence, Ownership, Structure, Thoroughness, Transparency. Tagline on the cover: "You're in good company" (already the sign-off on every blog).
- p.7–9 Logo: built on the Ichthys symbol reinterpreted as an abstraction of "G" and "C" from three geometric elements (circle, triangle, line). Variants: main horizontal, horizontal 2, square, rectangle, symbol; light and dark backgrounds; correct uses on white, dark, orange, teal and gradient tiles.
- p.11 Colors: Goco Orange `#FF5308` (tints `#FF6A35`, `#FF8C5A`, `#FFC0A9`; shade `#9E3101`), Biscaye Blue `#00BCC9` (tints `#22D8E4`, `#DCFDFF`; shade `#005672`), Sunset Yellow `#FFD166` (tint `#FFDF96`), neutrals `#FFF9F4` (cream), `#FFFFFF`, `#1B1B1B`.
- p.12 Typography: Orbitron Semibold (logo typeface), Montserrat Semibold/Medium/Regular (secondary).
- p.13 Shape symbology: circle = unity and the assess–implement–improve loop; triangle = direction, structure, progress; line = connection and the system backbone.
- p.14–15 **Work Areas** (Governance, Operational Systems, Communication Structure, Organizational Culture, Third Party Vendor Management, Financial Management & Budget Governance): each icon is a solid Goco Orange rounded-square tile holding a white glyph built from the three shapes, with a light-peach (`#FFC0A9`) accent layer, and Biscaye-Blue outlined pill tags underneath. This is the icon language used for the `seo-blog-tool` favicon and the pattern to follow for any new site icons.
- p.16–17 Brand voice: Confident, Direct, Warm, Thorough, Value-rooted, Structured (each with an "excessive" and an "insufficient" boundary).

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
- Remove the dead Strapi call path from `components/blog/utils/data.js` (unreachable in production, but still executes and fails on every request before falling back to the static array) — including the hardcoded plaintext API token. Deleting the line does not remove it from git history: if that Strapi instance (or the project this codebase was cloned from) still exists anywhere, revoke/rotate the token at the source.
- Unused translation keys left over from other templates: `locales/*/home.json` (e.g. "Zeenti Client", "Digital Excellence" — no component uses them) and `footer.json` (IT-consulting keys nothing renders). Harmless; delete when convenient.
- Remove the now-empty static `MOCK_BLOG_N` array/fallback logic entirely.
- Remove `BlogDetailClient.jsx`'s client-side fetch fallback — every original post now has a `content/blog/{slug}.md` file and is server-rendered, so the fallback path is only still relevant for brand-new posts published via the tool's web app before their file exists... actually it's always present once published, so this fallback may already be fully dead. Worth confirming before removing.

## Not part of this project's scope

General design/UI adjustments unrelated to the rebrand or the blog system are normal ongoing site work, done directly in this repo.
