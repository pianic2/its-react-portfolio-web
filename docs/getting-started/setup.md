# Local setup

## Prerequisites

- Node.js 24 (`.node-version`; `package.json` requires `>=24 <25`)
- npm (the repository ships `package-lock.json`)

## Install and run

```bash
npm ci
npm run dev
```

The Vite development server serves the site from `/`. Production builds use the
GitHub Pages base path `/its-react-portfolio-web/` (see `vite.config.ts`).

In development only, the design system showcase is available at
`/__dev/design-system`. It is excluded from production builds.

To preview a production build locally:

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env.local`. Vite exposes every `VITE_*` value to browser
code, so never store secrets in these variables.

| Variable                    | Used by                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_BACKEND_API_URL`      | Backend adapter, blog engagement section and contact submissions (`POST <url>/api/contact/`). Required by the Pages release check. |
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms contact adapter (`src/services/contact/web3Forms.ts`).                                                                   |
| `VITE_ANALYTICS_SITE_ID`    | Optional analytics identifier; keep empty until the provider is approved.                                                          |

When `VITE_BACKEND_API_URL` is empty, the blog engagement section is not
rendered and contact submissions return a configuration error.

## Next steps

- Run the [quality gates](../development/quality-gates.md) before opening a pull request.
- Read the [content model](../architecture/content-model.md) before editing portfolio content.
