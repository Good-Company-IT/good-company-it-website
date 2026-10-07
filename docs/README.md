# Site Documentation — SEO Automation Project

This folder documents changes made to this site as part of the SEO blog-publishing automation project. It's the site-side counterpart to the tool's own documentation.

- [status.md](./status.md) — what's changed here, and what's live vs. not yet merged.
- [architecture.md](./architecture.md) — stable technical reference for this repo (blog content contract, publisher rules, public-repo rules, Vercel limits).
- [compliance.md](./compliance.md) — privacy and cookie rules; read before adding any tool, embed or form.
- [rebrand-plan.md](./rebrand-plan.md) — plan, brand spec and requirements for the future redesign.
- Open items and next steps are no longer tracked in this folder: they live in the team's private to-do list.
- [process-improvements.md](./process-improvements.md) — how the codebase itself improved (metadata, content model, images, nav) — the engineering counterpart to the tool repo's editorial-workflow improvements doc.

**Related repo**: [`Good-Company-IT/goco-seo-blog-tool`](https://github.com/Good-Company-IT/goco-seo-blog-tool) — the tool that publishes/updates blog posts in this repo. It's a separate repo on purpose (it runs `git` commands against this one; keeping them apart avoids build risk and secret exposure). Its own `docs/` folder has the full pipeline documentation, presentation, and project history.
