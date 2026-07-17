# ITS React Portfolio Web

Bilingual personal portfolio built for the ITS Prodigi course. It presents
projects, technical capabilities and an evidence-based engineering method
without publishing private contact details or unverified claims.

## Technical baseline

- React 19 and TypeScript with strict type checking
- Vite
- React Router
- Material UI and Emotion
- Vitest and React Testing Library

Later delivery packages add the validated content model, complete page set,
accessibility checks, end-to-end tests and GitHub Pages deployment.

## Local development

Requirements:

- Node.js 24 LTS, declared in `.node-version` and `package.json`
- npm 11 or a version compatible with the lockfile

Install the exact dependency tree and start the development server:

```bash
npm ci
npm run dev
```

The terminal prints the local URL. Do not assume a fixed port because Vite may
select another available one.

## Quality checks

Run the complete local quality gate:

```bash
npm run check
```

It verifies formatting, lint rules, strict type checking, content validation,
automated tests and the production build. Each check is also available
independently through `format:check`, `lint`, `typecheck`, `content:validate`,
`test` and `build`. `npm run build` performs the TypeScript project build before
creating the production bundle in `dist/`.

To inspect that bundle locally:

```bash
npm run preview
```

## Continuous integration

The `Quality` GitHub Actions workflow runs for pull requests targeting `main`
and for updates to `main`. It installs the dependency tree with `npm ci` on
Node.js 24 and executes formatting, lint, type-checking, content validation,
tests and the production build as separate, visible gates.

The workflow uses the repository token only with `contents: read`, does not use
secrets and does not publish or deploy artifacts. Superseded runs for the same
pull request or branch are cancelled, and the quality job has a bounded timeout.
GitHub-owned actions are pinned to reviewed full commit SHAs, with a readable
major-version comment. Action updates require an explicit pull-request review.

GitHub Pages publishing is intentionally handled by a separate delivery package
and must only deploy reviewed changes from `main`.

## Environment configuration

Copy the documented template and fill only the values needed locally:

```bash
cp .env.example .env.local
```

Only variables prefixed with `VITE_` are available to browser code. They are
public at build time and must never contain passwords, API secrets, access
tokens or private contact data. Local `.env` variants are ignored by Git; the
empty `.env.example` contract remains tracked.

The contact form and analytics identifiers stay unset until the project owner
approves their provider and configuration.

## Delivery traceability

- The [GitHub repository](https://github.com/pianic2/its-react-portfolio-web)
  is the technical source of truth for code and documentation.
- Jira project `IRPW` records scope, workflow, evidence and owner decisions.
- Work is delivered through bounded branches and pull requests linked to the
  corresponding Jira issue.
- A task is not moved to Done without the project owner's explicit decision.

Material AI assistance is recorded in the relevant Jira task or pull request,
including its purpose, human review and any subsequent modification.

## Content and privacy boundaries

Public content may include verified repository, demo and professional profile
links. Do not commit personal email addresses, phone numbers, precise location
data, secrets, invented metrics or unsupported production/security claims.

## Home and Projects content architecture

Home and Projects read all bilingual editorial copy through
`PortfolioContentContext`. The validated content repository owns the complete
Home section model, the Projects page model and the localized project fields
used by both page variants. Components do not contain public copy.

Project identity, origin, ordering, repository links and claim status remain
shared invariants. Questions, supporting text, work summaries and possible
future improvements are localized explicitly and are never inferred from
other fields. The Projects comparison uses responsive semantic panels so it
does not require a horizontally scrolling table on narrow screens.
