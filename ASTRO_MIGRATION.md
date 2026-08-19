# Astro migration workspace

This branch contains an Astro replacement for the existing Jekyll/Moon site. The original Jekyll files remain in place temporarily as the source of truth for visual and URL comparisons.

## Local preview

```sh
npm install
npm run dev
```

Open <http://localhost:4321>. To inspect the same output Astro will eventually publish:

```sh
npm run build
npm run preview
```

## Safety

- Work stays on `astro-migration` until it is explicitly merged.
- `.github/workflows/astro-branch-check.yml` only builds and uploads an artifact. It has no Pages deployment permission and cannot replace the live website.
- `CNAME` is copied into the static output, but local builds do not affect DNS or GitHub Pages.
- A production Pages deployment workflow should only be added as part of the final, explicitly approved cutover.

## Content

Blog posts live in `src/content/blog/` as Markdown or MDX. Required frontmatter:

```yaml
---
title: "Post title"
date: 2026-08-19
excerpt: "A short description."
tags: [Example]
---
```

Set `draft: true` to exclude a post from generated pages. Set `project: true` to list it under Projects instead of Posts.

Interactive React components can be imported into MDX and selectively hydrated:

```mdx
import Example from '../../components/Example';

<Example client:visible />
```

`client:visible` delays loading and running the component until it approaches the viewport. Ordinary prose and mathematical notation remain static HTML.

## Preserved routes

- `/`
- `/about/`
- `/posts/`
- `/projects/`
- `/tags/`
- `/personal-interests-and-motivations/`
- `/404`

The migration also adds `/entropy-simplex-experiment/` as an MDX/React proof of concept.
