# IRPW-41 post-remediation verification package

## Status and guardrail

This document prepares the verification work required by IRPW-41. It is not a verification report and records no finding as resolved.

Do not start execution until IRPW-37, IRPW-38, IRPW-39 and IRPW-40 are merged into `main`, the resulting release-candidate SHA is known, and its GitHub Pages deployment is available. The audited baseline was `eff1b43b67da15ad8c78a8f7c01dcb529e185b7d`.

IRPW-41 supplies evidence to IRPW-31; it does not select GO, CONDITIONAL GO or NO-GO and does not transition Jira work items.

## Execution preconditions

- [ ] `main` is clean and its exact SHA is recorded.
- [ ] IRPW-37 through IRPW-40 are merged; the candidate contains their final commits.
- [ ] Quality and Pages workflow runs are identified for the same candidate SHA.
- [ ] The deployed Pages revision, production URL, Node.js 24 and npm versions are recorded.
- [ ] `VITE_WEB3FORMS_ACCESS_KEY` is configured for the production Pages build.
- [ ] A supported screen-reader/browser combination and reviewer are available, or the Project Owner accepts that limitation.
- [ ] Synthetic contact data and the recipient-mailbox observation procedure are approved; no real personal data is used.

## Evidence convention

Create a timestamped evidence directory only during final execution:

```text
docs/release-audits/irpw-41/evidence/<YYYY-MM-DDTHH-mm-ss+02-00>-<candidate-short-sha>/
```

Use these names:

```text
manifest.md
commands/<sequence>-<command>.log
workflows/<quality-or-pages>-<run-id>.md
visual/<route-key>-<locale>-<theme>-<width>.png
accessibility/<protocol>-<route-key>.md
contact/<locale>-<success-or-failure>.md
pages/<route-key>-<direct-or-refresh>.md
performance/<baseline-or-candidate>-<bundle-or-lighthouse>-<mobile-or-desktop>-<run>.json
reports/{verification-report,finding-matrix,residual-risk-register}.md
```

`route-key` uses `home`, `projects`, `skills`, `method`, `contact`, `privacy`, `not-found-localized`, `not-found-global`, or a project slug. Redact access keys, emails, form payloads, request headers and provider response bodies.

## Finding-to-evidence matrix

All entries begin in `Pending`. A final result must be `Resolved`, `Not resolved`, `Rejected with evidence`, or `Blocked with accepted limitation`.

| Finding                                       | Remediation | Required final evidence                                                                                            |
| --------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| IRPW-RC-001 navigation alignment and shadow   | IRPW-37     | Mobile/desktop screenshots, keyboard menu notes in both themes; shell alignment and non-dominant shadow confirmed. |
| IRPW-RC-002 Home hero hierarchy               | IRPW-37     | IT/EN Home evidence at 320, 768 and 1440 px; human hierarchy note.                                                 |
| IRPW-RC-003 Home learning tone                | IRPW-37     | Home screenshots and reuse-boundary review of the Skills interaction language.                                     |
| IRPW-RC-004 Projects journey and CTA strategy | IRPW-38     | Projects screenshots, CTA/keyboard checks and IT/EN editorial note.                                                |
| IRPW-RC-005 Skills mobile order               | IRPW-38     | 320/375 screenshots plus DOM, keyboard and screen-reader order notes.                                              |
| IRPW-RC-006 Contact mobile CTA competition    | IRPW-39     | 320/375 Contact screenshots and focus/order notes proving form-first conversion.                                   |
| IRPW-RC-007 initial bundle                    | IRPW-40     | Candidate asset inventory, route-chunk map and repeated Lighthouse comparison.                                     |
| IRPW-RC-008 duplicated Home/Skills language   | IRPW-37     | Source-review note and Home interaction evidence showing an explicit reuse boundary.                               |
| IRPW-RC-009 Method mobile resources           | IRPW-39     | IT/EN Method screenshots at 320/375 proving editorial-axis alignment.                                              |
| IRPW-RC-010 Contact supporting surfaces       | IRPW-39     | Contact screenshots in light/dark, mobile/desktop confirming secondary visual weight.                              |
| IRPW-RC-011 localized/global 404              | IRPW-39     | Both 404 contexts, direct-route proof, illustration semantics and reduced-motion notes.                            |
| IRPW-RC-012 Privacy mobile spacing            | IRPW-39     | Privacy screenshots at 320/375; approved wording unchanged.                                                        |
| IRPW-RC-013 HomeEdge Confluence evidence      | IRPW-38     | Public CTA crawl and anonymous-browser result proving inaccessible Confluence evidence is absent.                  |
| IRPW-RC-014 visual-token ownership            | IRPW-40     | Source ownership note, build and visual regression evidence for Method Flow/conversion values.                     |
| Residual: screen reader                       | IRPW-41     | Supported screen-reader smoke record or accepted unavailable-tool limitation.                                      |
| Residual: mobile menu keyboard                | IRPW-41     | Complete trigger, initial focus, trap, Escape, close and focus-restoration record.                                 |
| Residual: Web3Forms live smoke                | IRPW-41     | Redacted IT/EN production synthetic-submission records and safe failure check.                                     |
| Residual: visual coverage                     | IRPW-41     | Completed matrix plus named screenshots for changed/high-risk surfaces.                                            |

## Viewport, locale and theme matrix

Review `home`, `projects`, `skills`, `method`, `profile`, `contact`, `privacy`, every project detail, `not-found-localized`, and `not-found-global` at 320, 375, 768, 1024 and 1440 px in IT and EN. Review light/dark themes for all high-risk surfaces:

| Surface              | Required emphasis                                                            |
| -------------------- | ---------------------------------------------------------------------------- |
| Navigation and Home  | Desktop/mobile menu, hero and learning hierarchy.                            |
| Projects and details | Journey, CTA destinations, public evidence and readability.                  |
| Skills               | Visual, DOM, keyboard and screen-reader order.                               |
| Method               | Flow loading, resource axis, reduced motion and layout stability.            |
| Contact and Privacy  | Form-first conversion, status/error semantics and unchanged privacy meaning. |
| Both 404 contexts    | Direct load, illustration semantics/motion and fallback-shell boundary.      |

Capture screenshots at minimum for every changed surface at 320, 768 and 1440 px. Record the other required widths as reviewed; attach evidence whenever a defect, copy-pressure issue or layout instability appears.

## Final quality and deployment protocol

Run only after preconditions in a fresh candidate checkout:

```bash
git status --short
git rev-parse HEAD
node --version
npm --version
npm ci
npm run check
git diff --check
```

Record results independently. Verify Quality and Pages succeeded for the same SHA. On Pages, directly open and refresh Italian/English nested routes, project details and both not-found contexts under `/its-react-portfolio-web/`; record console errors, failed assets and unexpected warnings without logging form data.

## Screen-reader smoke protocol

1. Record OS, browser, screen reader, versions, theme, locale and candidate SHA.
2. On Home, identify document language, skip link, banner, navigation, main landmark, level-one heading and footer.
3. Operate the language switch and verify destination/focus outcome.
4. On Projects and Skills, read heading hierarchy, project/card names, evidence/CTA names and mobile order.
5. On Contact, verify labels, helper text, errors, live success/error feedback and privacy disclosure without exposing values.
6. On both 404 contexts, verify illustration semantics and reduced-motion behaviour.
7. Record paraphrased expected/actual results and any unavailable combination as a limitation.

## Mobile-menu keyboard protocol

At 320 px in IT and EN, and in light/dark where the control differs:

1. Tab to the menu trigger and record visible focus and accessible name.
2. Activate with Enter and Space in separate passes.
3. Record initial focus target and dialog semantics.
4. Tab and Shift+Tab through controls; confirm focus is trapped and order is visual/semantic.
5. Activate a destination and confirm route-change focus.
6. Reopen, press Escape, and confirm close plus restoration to trigger.
7. Repeat language and theme controls where relevant.

## Web3Forms production smoke protocol

Use production only after configuration and recipient-observation approval. Submit no passwords, credentials, health, financial or real personal data. Use distinct markers such as `IRPW41-<sha>-it-<timestamp>` and `IRPW41-<sha>-en-<timestamp>` with a test mailbox or approved synthetic sender.

1. Confirm deployment, locale and privacy disclosure.
2. Submit valid synthetic data in IT; verify localized pending/success feedback and approved delivery observation.
3. Repeat in EN with a different marker.
4. Reproduce provider/network failure only through an approved safe method; never alter production configuration.
5. Verify controlled errors, retained values where appropriate and no payload/provider details in console or evidence.
6. Redact every identifier except synthetic marker prefixes.

## Pages direct-route protocol

For `/its-react-portfolio-web/`, test initial direct navigation and refresh for `/it`, `/en`, one nested page per locale, IT/EN project details, invalid localized/global routes, and a nested route with query/hash. Confirm `404.html` preserves path/query/hash; React Router renders the intended route; assets use the project base path; no console error or failed request occurs.

## Bundle and Lighthouse protocol

The IRPW-35 reference is approximately 996.90 kB minified / 304.33 kB gzip for its single initial JavaScript chunk. It is comparison context, not a success budget.

1. Preserve final `npm run build` output and `dist` inventory.
2. Identify initial assets, route chunks and the `@xyflow/react` loading boundary from build output/network evidence.
3. Run mobile and desktop Lighthouse at least three times each on a consistent production URL/profile; preserve individual runs and medians for Performance, LCP, CLS and INP/TBT where available.
4. Compare like-for-like conditions, recording browser, throttling, cache, route, timestamp and limitations.
5. Confirm lazy boundaries expose accessible loading, avoid meaningful CLS and preserve focus/direct-route behaviour.

## Existing automated-test inventory

| Area                    | Existing coverage                                                                                                           | Final use                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Navigation              | `src/components/navigation/navigation.test.tsx`                                                                             | Dialog semantics, Escape and focus restoration.                       |
| Focus                   | `src/app/focus-management.test.tsx`                                                                                         | Skip link and client-route focus.                                     |
| Routes/content          | `src/routes/AppRoutes.test.tsx`, `criticalLinks.test.tsx`, `sitemap.test.ts`                                                | Localized routes, CTAs, slugs and sitemap.                            |
| Contact UI              | `src/features/contact/ContactForm.test.tsx`                                                                                 | Validation focus, announcements, success/reset and controlled errors. |
| Contact adapter         | `src/services/contact/contact.test.ts`                                                                                      | Configuration, request shape and provider/network mappings.           |
| Automated accessibility | `src/tests/accessibility.test.tsx`, `src/theme/contrast.test.ts`                                                            | Automated baseline only.                                              |
| Content parity          | `src/content/contentValidation.test.ts`, `PortfolioContentContext.test.tsx`                                                 | Localized typed-content structure.                                    |
| Page composition        | `SupportingPages.test.tsx`, `ProfileContactPrivacyPages.test.tsx`, `ProjectShowcase.test.tsx`                               | Supporting pages, Contact/Privacy and Projects regressions.           |
| Release contracts       | `quality-baseline.test.ts`, `scripts/release-pages.mjs`, `scripts/verify-pages-bundle.mjs`, `scripts/performance-check.mjs` | Static release, bundle and performance guards.                        |

These tests do not replace manual or production verification. Any new test after remediation belongs to the owning lane or an explicitly agreed shared area; this preparation must not alter routes, schemas, locales, themes, components, app layout or build configuration.

## Final report outline

After integration, report the candidate manifest, commands/workflows, completed finding matrix, visual/accessibility/provider/Pages/performance evidence, residual-risk register, limitations and recommendation input for IRPW-31. Do not make the Project Owner's decision automatically.
