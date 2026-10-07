# Rebranding — plan of action

The company did a full rebrand (new "GC" logo, new color palette, new typography, a documented brand voice). Only the favicon/app icon has been applied to this site so far; no other visual changes yet. The internal `seo-blog-tool` admin app (`Iniciar Blog Tool`) has had the full visual system applied already and can be used as a working reference for how the tokens and fonts look in practice (see the tool repo's `docs/architecture.md` → "Design decisions and rationale"). Status: **waiting on the brand guidelines, one Figma export per page and the copy from the team.** Not started.

## Requirements that must not be lost

- Build it in a **worktree or second clone on its own branch** and merge `main` into it often so new blog posts keep arriving; the main checkout stays on a clean `main` (see `architecture.md` → "Working next to the unattended publisher").
- **Before starting:** re-read the whole `Brand Guidelines 2026 - Updated.pdf` (pages 18 onward were never reviewed) and ask for Figma Dev Mode access.
- Keep the cookie-consent system (`utils/cookies/`, see `compliance.md`), the booking-button rule (the `a` renderer in `BlogDetailClient.jsx`, exact link to `BOOKING_URL`), `metadata.verification.google` in `app/[locale]/layout.js` (Search Console) and the blog front-matter contract (see `architecture.md`).
- Blog articles are **Montserrat-only**; Orbitron is for brand and large headline moments outside the article.
- When done, update the static paths in `app/sitemap.js`.

## Where the reference material lives

`rebrand-docs/` at the repo root — currently:
- `Brand Guidelines 2026 - Updated.pdf` (July 2026, ~46 MB): full spec (colors, type, usage rules, brand voice). It replaced the earlier `GOCO BRAND GUIDELINES 2026.pdf`. Logo variants and other brand assets also live in `Website/Reference/` (a sibling folder of both repos, not in git).
- `logo-GOCO.png`: the new logo (already copied to `app/[locale]/icon.png` as the favicon/app icon).

The folder is **gitignored** (`/rebrand-docs/`): it is reference material for planning and building, not something the site ships. Large files (the PDF, future Figma exports) stay out of git history on purpose. Figma page exports go in `rebrand-docs/figma-exports/`.

## Confirmed brand spec

- Colors: Goco Orange `#FF5308` (primary), Biscaye Blue `#00BCC9` (secondary), Sunset Yellow `#FFD166` (complementary), plus neutrals `#1B1B1B` (dark), `#FFF9F4` (cream) and `#FFFFFF`.
- Typography: **Orbitron** (Semibold) is the logo/display typeface, for the wordmark and short, large headline moments (site chrome, hero sections, nav-level branding). **Montserrat** (Regular/Medium/Semibold) is the secondary typeface for everything else.
- **Team decision: blog article content is Montserrat-only**: title/H1 through H2/H3 and body copy, no Orbitron anywhere inside an article.
- Brand voice: confident, direct, warm, thorough, value-rooted, structured, with "we say / we don't say" examples per context. It concerns editorial copy, not site code (summary in the tool repo's `docs/architecture.md`).

## Brand guideline map — `Brand Guidelines 2026 - Updated.pdf`

Pages 1–17 were read on 2026-09-23; **pages 18 onward were not reviewed, and the notes above came from the earlier version of the PDF.**
- p.3–5 Purpose, Mission/Vision (value-first I.T. + Project Management consulting; Florida's Tri-City region, expanding nationwide) and eight values: Excellence, Adaptability, Authority, Diligence, Ownership, Structure, Thoroughness, Transparency. Tagline on the cover: "You're in good company" (already the sign-off on every blog).
- p.7–9 Logo: built on the Ichthys symbol reinterpreted as an abstraction of "G" and "C" from three geometric elements (circle, triangle, line). Variants: main horizontal, horizontal 2, square, rectangle, symbol; light and dark backgrounds; correct uses on white, dark, orange, teal and gradient tiles.
- p.11 Colors: Goco Orange `#FF5308` (tints `#FF6A35`, `#FF8C5A`, `#FFC0A9`; shade `#9E3101`), Biscaye Blue `#00BCC9` (tints `#22D8E4`, `#DCFDFF`; shade `#005672`), Sunset Yellow `#FFD166` (tint `#FFDF96`), neutrals `#FFF9F4`, `#FFFFFF`, `#1B1B1B`.
- p.12 Typography: Orbitron Semibold (logo typeface), Montserrat Semibold/Medium/Regular (secondary).
- p.13 Shape symbology: circle = unity and the assess–implement–improve loop; triangle = direction, structure, progress; line = connection and the system backbone.
- p.14–15 **Work Areas** (Governance, Operational Systems, Communication Structure, Organizational Culture, Third Party Vendor Management, Financial Management & Budget Governance): each icon is a solid Goco Orange rounded-square tile holding a white glyph built from the three shapes, with a light-peach (`#FFC0A9`) accent layer and Biscaye-Blue outlined pill tags underneath. This is the icon language used for the `seo-blog-tool` favicon and the pattern to follow for any new site icons.
- p.16–17 Brand voice: Confident, Direct, Warm, Thorough, Value-rooted, Structured (each with an "excessive" and an "insufficient" boundary).

## Planned method (agreed with the team)

They provide the brand guidelines + a per-page Figma export + copy text; Claude replicates each page from that. Two refinements decided up front:

1. **Prefer Figma Dev Mode / Inspect access over flat exported images** where possible: exact hex, spacing and type values beat eyeballing a PNG. Not yet set up; walk through enabling shared Dev Mode access when the page designs are ready.
2. **Update the centralized design tokens first, not page by page.** The codebase already uses named color tokens (`primary-orange: '#FF4E00'`, `secondary-orange: '#FF723F'`, etc. in `tailwind.config.js`), referenced throughout the components (`bg-primary-orange`, `text-primary-orange`) rather than one-off hex values. Updating that one file to the confirmed hex values should propagate the change site-wide. Same for typography: add Orbitron and Montserrat to the `fontFamily` config and apply them per the article-versus-chrome rule above.

## Suggested order once page designs land

1. Update `tailwind.config.js` color tokens and add the two font families.
2. Verify the global token change across a few existing pages before touching any layout. Check blog post pages in particular: article headings and body must render in Montserrat only.
3. Go page by page against the Figma exports for layout and component changes, dropping in the provided copy.
4. Test each page locally (`npm run dev`) before pushing; never push straight to `main` without a local check.
5. Swap `public/logo.svg` (nav/footer logo) and any other brand imagery once provided; today only the icon has been applied.
