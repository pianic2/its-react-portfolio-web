<p align="center">
  <img
    src="docs/assets/readme-background.svg"
    alt="Technology stack background"
    width="100%"
  />
</p>

<h1 align="center">ITS React Portfolio Web</h1>

<p align="center">A bilingual portfolio built with React and TypeScript to present projects, skills, and engineering practice.</p>

<p align="center">
  <a href="https://github.com/pianic2/its-react-portfolio-web/actions/workflows/quality.yml"><img alt="Quality workflow status for main" src="https://github.com/pianic2/its-react-portfolio-web/actions/workflows/quality.yml/badge.svg?branch=main" /></a>
</p>

## Quick start

Requires Node.js `>=24 <25` and npm.

```bash
npm ci
npm run dev
```

## Architecture

| Area                           | Responsibility                                                     |
| ------------------------------ | ------------------------------------------------------------------ |
| `src/routes`                   | Localized route matching                                           |
| `src/content`                  | Italian and English content, Zod validation, and localized loaders |
| `src/pages` and `src/features` | Page composition and reusable portfolio sections                   |
| `src/services`                 | Backend and contact adapters                                       |
| `src/theme`                    | Material UI theme and design tokens                                |

Stable content IDs are kept separate from translated copy and localized slugs. See the [content model](docs/content/irpw-9-content-model.md) for its validation and identity rules.

## Development

| Command                | Purpose                           |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the Vite development server |
| `npm run lint`         | Check lint rules                  |
| `npm run typecheck`    | Check TypeScript projects         |
| `npm run format:check` | Check formatting                  |

## Testing

| Command         | Purpose                                     |
| --------------- | ------------------------------------------- |
| `npm run test`  | Run the Vitest suite                        |
| `npm run check` | Run static, test, build, and release checks |

The [Quality workflow](.github/workflows/quality.yml) runs `npm run check` for pull requests and pushes to `main`.

## Deployment

The project is configured for GitHub Pages with the `/its-react-portfolio-web/` base path. See the [deployment guide](docs/deployment/github-pages.md) for route recovery and release validation.

## Project structure

```text
src/
├── app/          # Application setup
├── content/      # Validated bilingual portfolio content
├── features/     # Reusable page sections
├── pages/        # Route-level pages
├── routes/       # Localized route configuration
├── services/     # Backend and contact adapters
└── theme/        # Material UI theme and tokens
```

See also: [design tokens](docs/design-system/tokens.md) and [portfolio wordmark](docs/assets/logo.svg).
