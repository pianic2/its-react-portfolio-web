# IRPW-45 Design System Refinement v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Refine the existing portfolio into a more deliberate, accessible and responsive Digital Studio / Pop Editorial Engineering experience while satisfying IRPW-45.

**Architecture:** Preserve React, TypeScript, Vite, MUI, Emotion, existing theme tokens, shared layout/surface primitives, routes and bilingual content. Establish semantic emphasis in theme and shared primitives first, then tune navigation and the specified page archetypes using those shared roles; leave Contact composition and behavior intact unless review evidence justifies a targeted fix.

**Tech Stack:** React 19, TypeScript, MUI, Emotion, React Router, Vitest, React Testing Library, Oxlint, Prettier, Vite.

**Spec:** `docs/design-system/irpw-45-refinement-v2.md` and Jira `IRPW-45`.

## Global Constraints

- Preserve the warm canvas, Archivo Black and Atkinson Hyperlegible, existing brand palette, patterns, editorial numbering, strong outlines and offset-shadow identity.
- Do not introduce another UI framework, token system, state architecture, dependency, route model or application rewrite.
- Desktop navigation, language and theme controls are visible from `lg` (1200px); mobile drawer is used below `lg`.
- Preserve existing bilingual route behavior, drawer dialog semantics, Escape handling, focus containment/restoration, reduced motion, and at least 44px interactive targets.
- Keep every text/background pairing at WCAG AA contrast for normal text (4.5:1) in light and dark modes; only use matching `onX` roles with their corresponding semantic surfaces. Test the focus inner ring against canvas and surface backgrounds.
- Keep project claims, evidence, destination links, contact behavior, privacy content, and the exact Home thesis intact.
- No page-local magic values to work around weak shared primitives; add no token without a semantic role, both theme behaviors, and a real consumer.
- No unrelated cleanup or edits to the pre-existing dirty `main` checkout.

## Review Focus

- Long Italian navigation labels at exactly 1200px must fit with language/theme controls without clipping or forcing the drawer; cover both languages and the 1199/1200 transition in navigation tests and browser review.
- `text` on `surfaceStrong` and focus-ring color pairs must stay readable in both schemes; add these pairs to contrast tests and assert their required ratios.
- At 320px, the Home title, description and stacked actions must remain readable and reachable without horizontal overflow; cover the action order/availability in Home tests and inspect rendered mobile captures.
- Reduced-motion mode must remove hover/active movement from ordinary navigation and page surfaces; retain or add a focused reduced-motion assertion and inspect an emulated reduced-motion capture.
- Compact Privacy and Profile openings must expose their document/narrative content sooner without dropping headings, update metadata, links or semantic order; assert required content in page tests and compare mobile/desktop captures.

---

### Task 1: Semantic emphasis in theme and shared surfaces

**Files:**

- Modify: `src/theme/createDigitalStudioTheme.ts`
- Modify: `src/components/surfaces/StudioCard.tsx`
- Test: `src/theme/contrast.test.ts`
- Test: `src/theme/createDigitalStudioTheme.test.ts` (create only if no existing theme-default test covers the requirements)
- Test: existing shared surface tests if they already own `StudioCard` behavior.

**Interfaces:**

- Consumes: `DigitalStudioThemeTokens`, existing light/dark semantic color roles, radius/border/shadow scales.
- Produces: theme defaults and `StudioCard` variants that distinguish structural/ordinary surfaces from featured content without adding tokens or changing the component API. `StudioCard` standard is flat L0; featured is L2.

- [x] **Step 1: Write failing contrast and surface-role tests.** Cover both schemes, add `text` on `surfaceStrong` and `focusInner` on canvas/surface to the AA matrix, and assert structural Paper defaults use the existing regular 2px border and small 12px radius with no offset shadow; default Cards have no offset shadow; ordinary Buttons use existing 2px/12px border/radius, no resting offset and retain 48px touch height; `StudioCard` standard has no offset/margin and small radius while featured remains medium radius/offset. Verify composed MUI contained/outlined/text hover styles preserve their background/border roles rather than inheriting extra hover properties.
- [x] **Step 2: Run the focused tests and verify the missing contrast/default assertions fail.** Run: `npm run test -- src/theme/contrast.test.ts src/theme/createDigitalStudioTheme.test.ts` (omit the second path if it is not created).
- [x] **Step 3: Implement the smallest shared-theme changes.** Keep current token names and values unless a contrast failure proves a token value itself is deficient. Set structural Paper to existing `borderWidths.regular` and `radii.sm`, remove default Paper/Card offsets, set ordinary Button controls to `borderWidths.regular`/`radii.sm` with no resting offset and existing small-offset hover feedback. Explicitly neutralize MUI's variant hover background/border changes so contained, outlined and text Buttons preserve their semantic surface while ordinary hover changes at most transform and shadow. Make `StudioCard` standard flat with no shadow clearance; keep its existing featured variant at `radii.md` with medium offset. Keep stronger treatment explicit and movement suppressed under reduced motion.
- [x] **Step 4: Run focused theme and surface tests.** Run: `npm run test -- src/theme/contrast.test.ts src/theme/createDigitalStudioTheme.test.ts` plus any existing focused StudioCard test.
- [x] **Step 5: Inspect direct consumers of changed MUI defaults, including static standard StudioCards, StudioMotionCard, drawer and contact surfaces; capture Home and Contact in light/dark, including hovered contained/outlined/text actions.** Record affected consumers and any override needed; do not alter Contact without a demonstrated regression or material gain.

### Task 2: Navigation chrome and desktop breakpoint

**Files:**

- Modify: `src/components/navigation/SiteHeader.tsx`
- Modify: `src/components/navigation/NavigationLink.tsx`
- Test: `src/components/navigation/navigation.test.tsx`

**Interfaces:**

- Consumes: the shared theme/surface hierarchy from Task 1; existing `PrimaryNavigation`, language/theme controls, and `MobileNavigationDrawer` behavior.
- Produces: full horizontal desktop navigation and utility controls from `lg`, a visually quieter shell/link resting state, restrained active state, and unchanged accessible drawer behavior below `lg`.

- [x] **Step 1: Add failing tests for the desktop/mobile visibility contract at 1199px and 1200px, in Italian and English.** Assert desktop navigation and language/theme controls are visible at 1200px; the drawer trigger is visible below 1200px. Keep the existing localized active-link, Escape-close and focus-restoration tests.
- [x] **Step 2: Run `npm run test -- src/components/navigation/navigation.test.tsx` and confirm the new breakpoint test fails on the current `xl` threshold.**
- [x] **Step 3: Move the responsive threshold to `lg` and remove permanent heavy card treatment from individual desktop nav links.** Retain characterized outer shell, 48px targets, visible focus, semantic active state, localized labels, keyboard operation and drawer semantics. Keep hover to transform plus shadow and suppress movement under reduced motion.
- [x] **Step 4: Run the navigation suite, then inspect 1024/1199/1200/1280/1440/1536 captures in both languages.** Verify no overlap, clipping, forced desktop drawer or mobile-drawer regression.

### Task 3: Page archetype refinement

**Files:**

- Modify: `src/features/home/HomeHero.tsx`
- Modify: `src/features/home/LearningSection.tsx`
- Modify: `src/features/projects/components/ProjectGuide.tsx`
- Modify: `src/features/projects/components/ProjectShowcaseCard.tsx` only where it is required to keep artwork/narrative dominant and supporting evidence quieter.
- Modify: `src/pages/ProfilePage.tsx`
- Modify: `src/pages/PrivacyPage.tsx`
- Test: `src/routes/AppRoutes.test.tsx` (existing localized Home/Projects route contracts)
- Test: `src/features/projects/components/ProjectShowcase.test.tsx`
- Test: `src/pages/ProfileContactPrivacyPages.test.tsx`

**Interfaces:**

- Consumes: semantic theme/surface roles from Task 1 and navigation behavior from Task 2; existing localized content and shared `PageSection`/`PageContainer`/`StudioCard` primitives.
- Produces: Home signature hierarchy with a contrast-correct eyebrow and unrotated static learning articles; Projects artwork/narrative first with `ProjectGuide` as supporting instruction; Profile manifesto with less opening waste and quieter supporting boxes; compact Utility Privacy introduction and scan-friendly document progression. Contact markup/content/form behavior remain unchanged absent review evidence.

- [x] **Step 1: Add failing tests for the Home eyebrow contrast role, preserved thesis and CTA order; preserve ProjectGuide copy, artwork, narrative and evidence order in the existing route/showcase tests; and retain required Profile/Privacy headings, links and update metadata.**
- [x] **Step 2: Run the focused Home, project and `src/pages/ProfileContactPrivacyPages.test.tsx` suites and confirm each new assertion fails for its observed issue.**
- [x] **Step 3: Apply the shared emphasis contract to the page compositions.** Use the existing `text` semantic role for the Home eyebrow on `surfaceStrong`; make one home focal composition; render static Home Learning cards as flat `StudioCard` surfaces without the repeated rotation; demote ProjectGuide to structural/supporting guidance and avoid nested featured evidence panels; shorten Profile/Privacy opening rhythm using existing layout primitives and remove unnecessary rotation from ordinary Profile callouts. Keep Contact unchanged unless independent evidence identifies a concrete defect.
- [x] **Step 4: Run the focused suites and accessibility checks for changed pages.** Check both languages, light/dark semantics, reduced motion, preserved links and headings, and no console/runtime errors.
- [x] **Step 5: Review the full diff for task scope, then capture the complete required before/after page matrix and responsive widths.** Critically inspect Home, Projects, Profile, Contact and Privacy in both themes where required; do not mark a capture as passing without written visual evaluation.

### Task 4: Final integration and release evidence

**Files:**

- Modify: `docs/design-system/tokens.md` and/or `docs/design-system/shared-primitives.md` only where current docs contradict the implemented hierarchy.
- Create: `docs/review/irpw-45/` with selected before/after captures and a concise evidence report, if the artifacts are appropriate to commit.
- No product code changes unless a review finding requires a scoped fix.

**Interfaces:**

- Consumes: outputs from Tasks 1–3, Jira acceptance criteria, baseline captures under `/tmp/irpw45-baseline/`, all specialist review reports.
- Produces: complete validation record, final branch/SHA, recorded Jira evidence, and no unresolved Blocker/High design, responsive, accessibility or engineering finding.

- [x] **Step 1: Obtain independent Design, Accessibility, Responsive, Interaction, Visual QA and Adversarial reviews of the rendered result and diff.** Classify findings Blocker/High/Medium/Low and attach concrete evidence and viewport/theme.
- [x] **Step 2: Resolve all Blocker/High and materially relevant Medium findings with the single active executor; re-run the owning tests and affected browser matrix after each fix.**
- [x] **Step 3: Run `npm run check` on the final branch.** Record exact command outcomes and distinguish any proven pre-existing failure from a regression.
- [x] **Step 4: Confirm final diff, branch, SHA and commit metadata; add concise IRPW-45 evidence to Jira when write access is available.**
