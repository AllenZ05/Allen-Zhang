# allenzhang05.com

Personal website of Allen Zhang — built with Next.js (App Router, static export), React, Framer Motion, and CSS Modules. Deployed on Netlify.

## Development

```bash
nvm use         # Node 24; matches Netlify and CI
npm ci
npm run dev      # local dev server
npm run build    # static export to out/
npm run lint     # biome + eslint
npm run preview  # built export on http://127.0.0.1:4175
npm run format   # biome auto-format
```

## Editing content

Most structured page content lives in data files:

- `src/data/profile.js` — role, availability, email, and social links shared across pages and metadata

- `src/data/projects.js` — project cards (covers live in `public/projects/`)
- `src/data/experiences.jsx` — work experience timeline and design team cards
- `src/data/about.js` — skills and education

The introduction is in `src/views/About/About.jsx`. Page descriptions and canonical/social metadata live in `src/app/*/page.jsx` and `src/app/siteConfig.js`.

Project cards use small WebP thumbnails; their `preview` field points to the full image loaded only when opened. The fall-detection diagram is an editable SVG in `public/projects/`. The social card source is `assets/social-preview.svg`, with its PNG export in `public/social-preview.png`.

## Browser checks

```bash
npx playwright install chromium   # once per Playwright update
npm run build
npm run test:e2e
```

The checks cover navigation, themes, mobile dialog focus, About tabs, project previews, contact fallback, reduced motion, static content without JavaScript, and layout widths. They start and stop a local static server on port 4175. Analytics requests are blocked during the tests.

GitHub Actions runs lint, build, and these browser checks on pushes and pull requests. The workflow belongs in `.github/workflows/website.yml` at the **parent repository root**, alongside `Allen-Zhang/`.
