# allenzhang05.com

Personal website of Allen Zhang — built with Next.js (App Router, static export), React, Framer Motion, and CSS Modules. Deployed on Netlify.

## Development

```bash
npm ci
npm run dev      # local dev server
npm run build    # static export to out/
npm run lint     # biome + eslint
npm run format   # biome auto-format
```

## Editing content

Most structured page content lives in data files:

- `src/data/projects.js` — project cards (covers live in `public/projects/`)
- `src/data/experiences.jsx` — work experience timeline
- `src/data/about.js` — skills and education

The introduction is in `src/views/About/About.jsx`, the home page roles and availability are in `src/views/Home/HeroHome.jsx`, and search/social metadata is in `src/app/siteConfig.js` and `src/app/layout.jsx`.

See [the October 2026 review](docs/review-2026-10-10.md) for the modernization checkpoint and follow-up work.
