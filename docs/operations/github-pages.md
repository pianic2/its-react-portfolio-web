# GitHub Pages release validation

This document records the repeatable production validation procedure for IRPW-22.

## Required repository settings

- Pages source: GitHub Actions
- Deployment environment: `github-pages`
- Allowed deployment branch: `main`

## Deployment workflow

The [Pages workflow](../../.github/workflows/pages.yml) deploys only validated
`main` revisions:

1. It starts when the Quality workflow completes successfully for `main`, or
   from a manual `workflow_dispatch` on `main`.
2. It checks out the exact revision that passed Quality and runs `npm ci`.
3. `npm run release:pages` requires `VITE_BACKEND_API_URL` (provided by the
   repository variable of the same name) and then runs the full `npm run check`.
4. The `dist` directory is uploaded and deployed to the `github-pages`
   environment.

The production base path `/its-react-portfolio-web/` is set in
`vite.config.ts` and `scripts/release-contract.mjs`. `public/404.html` recovers
direct and refreshed deep links on GitHub Pages.

## Smoke test

After a successful Pages deployment, verify:

1. The project root loads without console or asset errors.
2. `/it` and `/en` render the correct localized home page.
3. `/it/progetti` and `/en/projects` open directly in a new browser tab.
4. Refreshing both nested routes preserves the route and content.
5. A valid localized project-detail URL opens directly and survives refresh.
6. Query strings and hashes survive the Pages recovery redirect.
7. An unknown localized route renders the application Not Found page.
8. JavaScript, CSS and image requests resolve below `/its-react-portfolio-web/`.

Record the workflow run URL, deployed URL, commit SHA, browser and result in the
IRPW-22 Jira evidence comment.

## Rollback

Create a dedicated revert pull request, pass the normal quality gates, review and
merge it into `main`, then validate the replacement deployment with the same
smoke test. Manual reruns are reserved for deployment infrastructure failures on
an unchanged validated `main` revision.
