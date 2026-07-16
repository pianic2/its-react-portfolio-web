# IRPW-16 validation record

This record separates implemented evidence from checks that still require a dependency-complete repository checkout.

## Implemented evidence

- shared application shell, header, navigation, footer, container, section, link, icon-button and card source;
- route-aware active navigation with `aria-current` and a non-colour visual indicator;
- mobile and tablet temporary navigation Drawer;
- localized theme and language controls;
- safe-area-aware page gutters and offset-shadow clearance;
- skip navigation and client-side route focus management;
- localized fallback routes inside the application shell;
- focused unit and integration test source;
- concise component responsibility documentation.

## Project Owner visual review

The Project Owner reviewed the implementation on a narrow Android viewport in both light and dark modes and supplied screenshots of the application shell, the development design-system route and the mobile navigation.

The review identified three concrete defects:

1. the programmatically focused main landmark exposed a viewport-sized browser outline, appearing black in light mode and white in dark mode;
2. the mobile navigation paper used large rounded corners while remaining attached to the viewport edges;
3. the two-item language selector was visually heavy and competed with the primary navigation.

The branch was revised to:

- suppress the non-interactive main landmark outline while preserving focus visibility on the skip link and controls;
- make the Drawer a safe-area-aware floating surface with explicit external margins, full border and shadow clearance;
- align vertical navigation destinations to one full-width column;
- replace the two-item language selector with one destination-language button containing a custom Italian or British flag graphic;
- refine the site header with a smaller radius, reduced elevation, a semantic strong surface and a restrained three-colour accent strip.

The revised branch still requires Project Owner browser re-review. No post-fix screenshot or approval is claimed in this record.

## Checks completed in the implementation environment

- branch comparison against `main` confirms the IRPW-15 merge commit as the merge base;
- the branch is ahead of `main` with no divergence;
- changed TypeScript and TSX sources were syntax-transpiled in a local synthetic workspace;
- component code was statically reviewed against the existing strict TypeScript and Material UI contracts.

## Checks not completed in the implementation environment

The runtime could not resolve GitHub or the npm registry and did not contain the repository dependencies. Therefore the following commands have not been executed and must not be reported as passing:

```text
npm ci
npm run check
```

The newly added Vitest tests have not been executed in this environment.

## Required Project Owner review evidence

From a real checkout of `agent/irpw-16-shared-primitives`:

1. run `npm ci`;
2. run `npm run check`;
3. inspect 320, 390, 600, 768, 1024, 1280 and 1440 px viewport widths;
4. inspect light and dark themes;
5. confirm that the main focus rectangle no longer appears after route or language navigation;
6. confirm that the header and Drawer have balanced visible external margins including their shadow extents;
7. confirm that the destination-language flag control preserves the equivalent localized route and project slug;
8. navigate the shell using only the keyboard;
9. verify the skip link, active navigation, Drawer focus restoration and route focus movement;
10. enable `prefers-reduced-motion: reduce` and verify that interaction transforms are removed;
11. confirm that offset shadows, safe areas and sticky-header geometry do not create horizontal clipping.

No merge or completion claim is justified until these checks are recorded.
