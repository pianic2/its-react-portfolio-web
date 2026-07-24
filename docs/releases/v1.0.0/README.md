# v1.0.0 release-candidate evidence pack

## Status and decision boundary

This package prepares the Portfolio Web `1.0.0` release candidate for Project
Owner review. It does not declare the release published.

- Version: `1.0.0`
- Source baseline: `e1473161bb742b9280fc1ea6f619cc161420c407`
- Candidate branch: `release/irpw-v1.0.0`
- Repository: <https://github.com/pianic2/its-react-portfolio-web>
- Public Pages URL: <https://pianic2.github.io/its-react-portfolio-web/>
- Audit date: 2026-07-24 UTC
- Project Owner actions still required: merge, final Jira decision, `v1.0.0`
  tag and GitHub Release

The immutable candidate SHA and final pull-request URL are recorded by GitHub
when this branch is published. They are also added to the IRPW-31 and IRPW-34
delivery comments. A Pages same-SHA verification is intentionally pending until
the Project Owner merges the pull request.

## Release-candidate manifest

| Item                  | Evidence                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| Runtime               | Node.js `24.14.0`; npm `11.9.0`                                                     |
| Deterministic install | `npm ci` passed; 237 packages installed                                             |
| Version files         | `package.json` and `package-lock.json` both declare `1.0.0`                         |
| Production base       | `/its-react-portfolio-web/` in `vite.config.ts`                                     |
| Route contract        | 20 indexable IT/EN routes generated in `sitemap.xml`                                |
| Contact provider      | Web3Forms adapter; access key not recorded in evidence                              |
| Quality workflow      | `.github/workflows/quality.yml`                                                     |
| Pages workflow        | `.github/workflows/pages.yml`                                                       |
| Rollback              | Dedicated revert pull request, successful Quality run, replacement Pages deployment |
| Release notes         | [RELEASE_NOTES.md](./RELEASE_NOTES.md)                                              |

No open pull request existed when the source baseline was recorded. `AGENT.md`
was not present on `main`; the repository intentionally ignores `AGENTS.md`.

## Local certification

The first complete run passed. A second run exposed a timeout in the first Home
route test because Iconify attempted runtime API access from JSDOM. The test
environment now replaces decorative Iconify output with a local SVG stub. This
keeps the quality contract independent from network availability without
changing production components.

After that correction, three complete runs passed consecutively:

| Run     | Result | Duration | Test result                        |
| ------- | ------ | -------: | ---------------------------------- |
| Final 1 | Passed | 81.101 s | 25 files, 151 tests; content 28/28 |
| Final 2 | Passed | 80.372 s | 25 files, 151 tests; content 28/28 |
| Final 3 | Passed | 85.482 s | 25 files, 151 tests; content 28/28 |

Every successful run covered formatting, lint with warnings denied, strict
TypeScript, architecture blocking rules, bilingual content validation, the full
Vitest suite, production build, Pages bundle validation and the measured
performance budget.

The architecture check emitted only informational review candidates:

- six content/schema files exceed 500 lines;
- `MethodNarrativeSection` and `SupportingPageIndex` are possible dead-file
  candidates requiring manual confirmation.

These are post-1.0 maintainability observations, not release defects.

## Build and performance

The candidate build emits four measured assets:

| Normalized asset   |        Minified |            Gzip | Result                 |
| ------------------ | --------------: | --------------: | ---------------------- |
| Initial JavaScript | about 800.57 kB | about 242.69 kB | Within measured budget |
| Method JavaScript  | about 193.33 kB |  about 61.37 kB | Deferred route chunk   |
| Initial CSS        |   about 0.16 kB |   about 0.13 kB | Within measured budget |
| Method CSS         |  about 11.14 kB |   about 2.03 kB | Deferred route chunk   |

Vite still reports its generic 500 kB advisory for the initial chunk. The
project-specific budget passes and the original IRPW-35 entry bundle was
reduced by approximately 19% through IRPW-40. No Lighthouse executable or
adjustable browser profile was available in the certification environment, so
new repeated Lighthouse medians are an explicit residual evidence limitation.

`npm audit --omit=dev` reports GHSA-qwww-vcr4-c8h2 against the installed React
Router 7 line. The advisory applies only to unstable React Server Components
APIs. This static client-side Vite application does not use RSC, Server Actions
or a React Router server runtime, so there is no active exploit path in the
release architecture. The advisory has no same-major automated fix and remains
a monitored supply-chain observation rather than a release defect.

## GitHub Actions and deployment

The source baseline has a successful Quality run:

- Quality:
  <https://github.com/pianic2/its-react-portfolio-web/actions/runs/30040228894>
- SHA: `e1473161bb742b9280fc1ea6f619cc161420c407`

Its Pages build succeeded, including configured release validation and artifact
creation, but deployment failed:

- Pages:
  <https://github.com/pianic2/its-react-portfolio-web/actions/runs/30040342320>
- Failure: three identical `github-pages` artifacts were produced; deploy-pages
  rejected the ambiguous artifact set.

The release candidate upgrades and pins:

- `actions/upload-pages-artifact` v5.0.0 at
  `fc324d3547104276b827a68afc52ff2a11cc49c9`;
- `actions/deploy-pages` v5.0.0 at
  `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128`.

Both v5 actions use the current Node.js 24 artifact/deployment path. The latest
successful Pages deployment before this candidate is:

- Pages:
  <https://github.com/pianic2/its-react-portfolio-web/actions/runs/30040223084>
- SHA: `c9889f442dd83b226362b629ad978a9234694c8f`

Therefore the public site is healthy but does not yet prove the final candidate
SHA. That proof is the mandatory post-merge condition.

## Route, locale and runtime coverage

The public site was checked in a cloud Chrome session at a 1363 px viewport.
Every indexable route was opened directly:

- seven static Italian routes;
- seven static English routes;
- three project details per language;
- localized invalid project slug;
- global unknown route;
- root preference redirect;
- a nested Method route with query string and hash, including browser refresh.

For the 20 indexable routes the checks confirmed:

- the expected localized H1;
- matching document language;
- route-specific title and canonical URL;
- IT/EN alternate links;
- no horizontal overflow at the observed viewport;
- direct-load and refresh recovery below the GitHub Pages base path.

Live `robots.txt` references the generated sitemap, and live `sitemap.xml`
contains the 20 contract URLs. Existing remediation evidence and tests cover
the 320, 375, 768, 1024 and 1440 px responsive contracts; a new complete
route-by-locale-by-theme screenshot matrix was not produced in this
environment.

## Interaction and accessibility coverage

The live verification confirmed:

- one H1 and the expected landmark structure on representative routes;
- skip link and focusable main target;
- mobile navigation dialog semantics;
- initial dialog focus, forward and reverse focus containment;
- Escape close and focus restoration to the menu trigger;
- route-equivalent IT-to-EN project switching;
- stored language preference used by the root redirect;
- dark-theme activation and persistence after refresh;
- no horizontal overflow on all audited routes at the observed viewport;
- decorative 404 SVG semantics and localized/global 404 content;
- Contact validation focuses the first invalid field and exposes all three
  localized errors;
- successful English and Italian Web3Forms responses with synthetic,
  non-sensitive audit data;
- success output receives programmatic focus;
- Contact privacy disclosure matches the Web3Forms adapter flow.

Missing configuration, provider rejection, invalid provider response, network
failure and abort behavior are covered deterministically by the service and form
test suites. Production failure was not induced because changing or intercepting
the live provider would not be a safe release validation method.

A real assistive-technology session such as NVDA, VoiceOver or Orca was not
available. The semantic browser tree and automated accessibility tests are
positive but do not substitute for that human screen-reader smoke test.

## IRPW-27 existing implementation evidence

IRPW-27 is already satisfied and does not require reimplementation:

- `src/theme/tokens.ts` owns reusable halftone and diagonal CSS gradients,
  semantic colors, layout metrics, motion and focus tokens;
- `src/features/projects/components/ProjectArtwork.tsx` composes responsive,
  decorative code-native project art;
- `src/pages/NotFoundPage.tsx` provides a decorative, non-focusable inline SVG;
- `src/components/navigation/LanguageFlag.tsx` provides hidden-from-AT inline
  SVG flags;
- reduced-motion rules are applied across shared actions, cards, navigation
  and page illustrations;
- theme, layout, shared primitive, 404 and accessibility tests protect these
  contracts;
- existing review images in `docs/review/irpw-23` and `docs/review/irpw-26`
  show the visual language in the rendered product.

## Final defect register

| ID              | Severity                | Status                                 | Evidence or disposition                                                                            |
| --------------- | ----------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IRPW-RC-001–014 | Major/Minor/Observation | Closed                                 | IRPW-37–IRPW-40 code and post-remediation audit                                                    |
| IRPW-RC-015     | Major                   | Fixed in candidate                     | Home Skills CTA now targets the localized Skills route; regression tests added                     |
| IRPW-RC-016     | Blocker                 | Fixed, post-merge verification pending | Pages artifact duplication; Actions upgraded and pinned to v5                                      |
| IRPW-RC-017     | Major quality risk      | Fixed in candidate                     | JSDOM Iconify network dependency removed from test runtime                                         |
| IRPW-RC-018     | Minor                   | Deferred post-1.0                      | Global, non-localized 404 is outside `AppLayout`, so live metadata does not add explicit `noindex` |

The intermittent LeetCode image/probe behavior was not reopened: the profile
link is correct, the owner previously verified it on a real browser, and the
cloud-browser observation remains environment-specific.

## Residual-risk register

| Risk                                                                   | Level              | Owner action                                                                            |
| ---------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Final Pages deployment has not run on the candidate SHA                | Release gate       | Merge only after PR Quality passes; require Pages success on the merged SHA before tag  |
| No real screen-reader smoke session                                    | Minor evidence gap | Accept explicitly or execute a supported NVDA/VoiceOver/Orca smoke test                 |
| No fresh repeated Lighthouse medians                                   | Minor evidence gap | Accept the bundle budget or run three mobile and three desktop measurements post-deploy |
| Fresh screenshot matrix is representative, not exhaustive              | Minor evidence gap | Accept existing human/remediation evidence or complete the matrix post-deploy           |
| Global unknown route lacks explicit runtime `noindex` metadata         | Minor defect       | Backlog after 1.0 unless the owner changes release scope                                |
| Initial chunk remains above Vite's generic advisory                    | Observation        | Monitor against the project budget; optimize post-1.0 only with measured benefit        |
| React Router RSC advisory is present but not architecturally reachable | Observation        | Monitor GHSA-qwww-vcr4-c8h2; reassess during a planned dependency upgrade               |

## Preliminary technical recommendation

**CONDITIONAL GO for merging the release-candidate pull request.**

There is no known unresolved product Blocker or Critical defect in the branch.
Release authorization remains withheld until all of these conditions are true:

1. the pull-request Quality workflow passes on the final head SHA;
2. the Project Owner merges the pull request;
3. Quality and Pages both pass on the resulting `main` SHA;
4. the public route smoke test confirms that same deployed SHA;
5. the Project Owner accepts or closes the named residual evidence gaps;
6. only then are the `v1.0.0` tag and GitHub Release authorized.

IRPW-31 remains open for the Project Owner's final decision.
