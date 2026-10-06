# IRPW-17 responsive design-system showcase validation

This record separates implemented evidence from checks that still require a dependency-complete checkout and browser review.

## Scope implemented

- `/__dev/design-system` remains guarded by `import.meta.env.DEV` and is absent from production routing;
- the former monolithic IRPW-15 review page is decomposed into development-only showcase modules;
- `PageContainer`, `PageSection`, `StudioCard`, application link primitives and `StudioIconButton` replace duplicated layout, surface and interaction implementations;
- showcase sections follow one centred full-width flow, while each section owns its internal responsive grid;
- the showcase exposes semantic colours, typography, spacing, responsive layout tokens, radii, border widths, shadows and decorative patterns;
- Material UI buttons, chips, alerts and form states are exercised through the customized Digital Studio theme;
- internal, external and button links are distinguishable by semantics and presentation;
- active and inactive navigation states use the real `NavigationLink` implementation;
- the real temporary mobile navigation Drawer can be opened and closed for focus-trap and restoration review;
- Italian and British flag graphics are shown through the shared `LanguageFlag` component;
- standard and featured `StudioCard` variants are reviewed with short and long content;
- focus, disabled state and reduced-motion behaviour are exposed through real interactive controls;
- outlined fields use a surface-backed label plate so borders and focus rings never cross the label text;
- a local, non-persisted reduced-motion override supports repeatable visual comparison without changing application preferences;
- the route reports the current viewport width, Material UI breakpoint, theme and operating-system reduced-motion preference;
- a development-only component laboratory exercises a project preview, release-readiness panel and contact composition with realistic content pressure.

## Source-review findings addressed

| Finding                                                                                          | Impact                                                                                                               | Resolution                                                                                                                     |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| The review route reimplemented page gutters, safe areas and shadow clearance.                    | The showcase could drift from production layout behaviour.                                                           | Replaced the local container with `PageContainer` and `PageSection`.                                                           |
| `PageContainer` reserved shadow clearance only on the inline end.                                | The optical axis could appear left-biased and the content width could become difficult to reason about.              | Shadow and safe-area clearance are now symmetric, border-box based and bounded by an explicit maximum inline size.             |
| The global two-column showcase grid received multiple fragment children.                         | Some desktop rows contained one left-hand card and an empty right-hand cell, creating a large apparent right margin. | Replaced the global grid with one centred vertical flow; responsive grids now exist only inside the section that owns them.    |
| Review panels used local `Paper` composition instead of the shared surface primitive.            | Card variants and shadow footprint were not reviewed consistently.                                                   | Replaced top-level review panels with `StudioCard`-based `ShowcaseSection`.                                                    |
| The component sample used direct MUI `Card` and `Link` elements.                                 | Shared IRPW-16 primitives were not exercised by the review route.                                                    | Added explicit samples for `StudioCard`, `InternalLink`, `ExternalLink`, `ButtonLink` and `StudioIconButton`.                  |
| Structural layout contained fixed dimensions and shadow translations.                            | Responsive review depended on demo-specific magic values.                                                            | Replaced structural values with tokens, `theme.spacing()`, content-based sizing and `shadowOffsets`.                           |
| The halftone preview rendered as an incomplete or overly sparse dot row in some viewport states. | The decorative pattern no longer represented the intended Pop Art language.                                          | Rebuilt the token as a staggered two-layer radial pattern and set explicit repeat and tile sizing in the hero surface.         |
| The outlined-field focus ring continued behind the floating label.                               | The label looked crossed by the border and focus treatment, especially in dark mode.                                 | Added a surface-backed, padded and raised `MuiInputLabel` plate while retaining the high-contrast focus ring around the field. |
| The showcase exposed primitives but did not test realistic compositions.                         | Components could look correct in isolation while failing under actual content density.                               | Added three development-only composed candidates covering project evidence, delivery status and contact-form layout.           |
| Reduced motion was described but could not be compared repeatedly inside the route.              | Review depended entirely on external browser configuration.                                                          | Added system-preference reporting and a local, non-persisted reduced-motion preview.                                           |
| No test targeted the showcase contract.                                                          | Required sections and interaction states could disappear unnoticed.                                                  | Added focused rendering, navigation, disabled-state, theme, Drawer, reduced-motion and composed-component tests.               |

## Canonical browser evidence matrix

The following screenshots and manual checks remain required before Project Owner approval.

| Check                                                        | 390 px mobile | 768 px tablet | 1440 px desktop |
| ------------------------------------------------------------ | ------------- | ------------- | --------------- |
| Light theme                                                  | Pending       | Pending       | Pending         |
| Dark theme                                                   | Pending       | Pending       | Pending         |
| No horizontal overflow                                       | Pending       | Pending       | Pending         |
| Centred optical axis                                         | Pending       | Pending       | Pending         |
| Offset shadows remain visible                                | Pending       | Pending       | Pending         |
| Halftone repeats across the full preview surface             | Pending       | Pending       | Pending         |
| Typography wraps without clipping                            | Pending       | Pending       | Pending         |
| Outlined labels remain isolated from borders and focus rings | Pending       | Pending       | Pending         |
| Keyboard focus remains visible                               | Pending       | Pending       | Pending         |
| Disabled states remain perceivable                           | Pending       | Pending       | Pending         |
| Reduced-motion behaviour                                     | Pending       | Pending       | Pending         |

Boundary checks without mandatory screenshots: 320 px, 600 px, 1024 px and 1280 px.

Additional evidence required:

- one screenshot showing a keyboard focus ring;
- one screenshot showing the focused outlined-field label treatment in dark mode;
- one screenshot showing the floating mobile navigation Drawer;
- one screenshot showing the component laboratory at desktop width;
- a textual result for operating-system `prefers-reduced-motion: reduce`, because a still image cannot prove the absence of motion.

## Automated validation status

The implementation environment could not resolve GitHub or the npm registry and did not contain repository dependencies. Therefore these commands have not been executed and must not be reported as passing:

```text
npm ci
npm run check
```

The new TypeScript and TSX files were parsed with the TypeScript compiler API and produced no syntax diagnostics. Full module resolution, strict project type checking, Oxlint, Vitest, Prettier and Vite production build remain pending in a dependency-complete checkout.

## Completion boundary

IRPW-17 remains incomplete until:

1. `npm ci` and `npm run check` pass from the branch checkout;
2. the canonical browser evidence matrix is completed;
3. visual and accessibility findings are recorded in the pull request;
4. the Project Owner approves the result and explicitly authorizes merge and Jira completion.
