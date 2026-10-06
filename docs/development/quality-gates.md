# Quality gates

`npm run check` is the canonical quality contract. The
[Quality workflow](../../.github/workflows/quality.yml) runs it on every pull
request to `main` and on every push to `main`, using the Node.js version in
`.node-version`.

## Gate stages

| Script                  | Runs                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| `npm run check:static`  | `format:check`, `lint`, `typecheck`, `architecture:check`, `content:validate` |
| `npm run check:test`    | `test` (full Vitest suite)                                                    |
| `npm run check:release` | `build`, `release:bundle`, `performance:check`                                |
| `npm run check`         | All three stages in order                                                     |

## Individual scripts

| Script                            | Purpose                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run format` / `format:check` | Prettier write / check                                                                           |
| `npm run lint`                    | oxlint with React, Vitest and jsx-a11y plugins; warnings are denied                              |
| `npm run typecheck`               | `tsc -b`                                                                                         |
| `npm run architecture:check`      | `scripts/architecture-check.mjs`: blocking source rules plus a non-blocking informational report |
| `npm run content:validate`        | Bilingual content validation (`src/content/contentValidation.test.ts`)                           |
| `npm run test` / `test:watch`     | Vitest run / watch mode                                                                          |
| `npm run build`                   | Type build, Vite production build and `sitemap.xml` / `robots.txt` generation                    |
| `npm run release:bundle`          | `scripts/verify-pages-bundle.mjs`: checks the Pages bundle in `dist`                             |
| `npm run performance:check`       | `scripts/performance-check.mjs`: compares emitted assets with `scripts/performance-budget.json`  |
| `npm run release:config`          | Fails when `VITE_BACKEND_API_URL` is missing                                                     |
| `npm run release:pages`           | `release:config` followed by `check`; used by the Pages workflow                                 |

## Performance budget

`scripts/performance-budget.json` lists the expected emitted assets with their
minified and gzip sizes. An unexpected asset, or an asset above its size plus the
configured allowance, fails `performance:check`. Update the budget only with
measured evidence; see the [IRPW-40 performance evidence](../review/irpw-40/performance-evidence.md).

## Related

- [Content model validation rules](../architecture/content-model.md#validation)
- [GitHub Pages deployment](../operations/github-pages.md)
