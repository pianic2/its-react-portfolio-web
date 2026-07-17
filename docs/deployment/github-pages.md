# GitHub Pages release validation

This document records the repeatable production validation procedure for IRPW-22.

## Required repository settings

- Pages source: GitHub Actions
- Deployment environment: `github-pages`
- Allowed deployment branch: `main`

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
