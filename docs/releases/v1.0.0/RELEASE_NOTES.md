# Portfolio Web v1.0.0

## Overview

Portfolio Web `1.0.0` is the first release candidate for the bilingual public
portfolio. It presents selected projects, skills, an evidence-based delivery
method, profile, contact and privacy information on GitHub Pages.

## Main capabilities

- Complete Italian and English route sets with equivalent language switching.
- Home, Projects, project details, Skills, Method, Profile, Contact and Privacy
  experiences.
- Responsive navigation, persistent light/dark theme and keyboard-oriented
  focus management.
- Typed bilingual content model with validation against locale drift.
- Web3Forms contact flow with local validation, anti-spam field, controlled
  provider errors and explicit privacy disclosure.
- Code-native CSS and SVG visual language using shared Digital Studio tokens.

## Accessibility

- Skip navigation and client-route focus management.
- Visible shared focus styles and minimum interaction targets.
- Mobile menu focus containment, Escape handling and trigger focus restoration.
- Semantic loading states for lazy routes.
- Localized form labels, errors, status announcements and success focus.
- Decorative visuals hidden from assistive technology.
- Reduced-motion rules for non-essential transitions and transforms.

Automated checks and semantic browser inspection pass. A real screen-reader
smoke session remains an explicitly documented evidence limitation.

## Localization and SEO

- Italian and English public content and route contracts.
- Route-specific titles, descriptions, canonicals, `hreflang`, Open Graph and
  Twitter metadata.
- Generated 20-route sitemap and matching robots declaration.
- Localized project slugs and non-indexable invalid localized project routes.

The global non-localized fallback still lacks explicit runtime `noindex`
metadata and is deferred as a minor post-1.0 correction.

## Quality and delivery

- Canonical `npm run check` covers formatting, lint, strict TypeScript,
  architecture rules, bilingual content, 151 tests, production build, Pages
  artifact contract and performance budget.
- Three consecutive complete post-fix runs passed.
- Method and graph code are deferred into a route chunk.
- GitHub-owned workflow actions are pinned to reviewed full commit SHAs.
- Pages upload and deployment actions are upgraded to Node.js 24-compatible v5
  releases.

## Release-candidate fixes

- Correct the Home Skills CTA so it opens the localized Skills page.
- Remove Iconify runtime API access from the JSDOM test environment.
- Replace the Pages v3/v4 artifact path that produced duplicate deployment
  artifacts with pinned v5 actions.
- Align `package.json` and `package-lock.json` on version `1.0.0`.

## Known limitations and deferred scope

- Final same-SHA Pages verification requires the release pull request to be
  merged by the Project Owner.
- Fresh repeated Lighthouse medians and a complete screenshot matrix were not
  produced in the release environment.
- The initial JavaScript entry remains above Vite's generic 500 kB advisory but
  is below the measured project budget.
- `npm audit` reports GHSA-qwww-vcr4-c8h2 for unstable React Router RSC APIs;
  the static client-side application does not use the affected architecture.
- IRPW-28 and IRPW-29 visual-asset work is deferred; no AI images are required
  for this release.
- IRPW-33 custom-domain planning is deferred; GitHub Pages remains the supported
  public host.
- Optional architectural splitting and possible dead-file cleanup remain
  post-1.0 maintenance work.

## Rollback

If the release deployment fails after merge:

1. keep the last successful Pages revision serving;
2. create a dedicated revert pull request for the release commit;
3. run and review the normal Quality workflow;
4. merge the revert only after approval;
5. let Pages deploy the replacement `main` revision;
6. repeat the public route and asset smoke test.

Manual workflow reruns are reserved for transient deployment-infrastructure
failures when the validated source revision is unchanged.
