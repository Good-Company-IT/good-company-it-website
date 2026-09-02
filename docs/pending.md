# Pending — Site Side

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
