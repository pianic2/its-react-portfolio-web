# Digital Studio token intent

The Digital Studio theme translates a Pop Art visual language into reusable, accessible Material UI foundations. The visual identity is energetic, spacious and graphic, while content structure and interaction remain predictable.

## Architecture

The system uses three layers:

1. stable primitive values inside the token module;
2. semantic roles such as `canvas`, `primary`, `text`, `border` and `focusInner`;
3. Material UI palette, typography, spacing, transitions and component defaults.

Application components should consume semantic theme roles. Raw colour values, border widths, radii and transition timings belong in the token source rather than page-level `sx` objects.

## Colour schemes

The theme provides `light` and `dark` modes. Both retain the Pop Art identity through saturated colour blocks, strong outlines and graphic offset shadows. Dark mode is not a generic developer palette: it uses a deep aubergine canvas with yellow, pink and cyan accents.

Required foreground and background combinations are covered by automated WCAG 2.2 AA contrast checks. Decorative halftone and stripe patterns must not carry information or reduce text contrast.

## Typography

- `Archivo Black` is the intended self-hosted display face for short headings and graphic statements.
- `Atkinson Hyperlegible Next` is the intended self-hosted body and interface face.
- System fallbacks remain in the stack until the font assets are added and verified.

Display typography is not used for paragraphs, form content or long navigation labels.

## Spacing and shape

Material UI spacing uses the design-system `spacing.base` token, currently 4 px. Components should prefer `theme.spacing()` instead of literal padding or gap values.

The radius scale ranges from compact 6 px details to 48 px feature surfaces. Pill geometry is reserved for chips, badges and deliberately pill-shaped controls.

## Optical alignment and safe areas

Page gutters, panel insets and section gaps are named layout tokens. All top-level review surfaces use the same horizontal inset so headings, copy and controls share one vertical axis across the page.

Pop Art shadows extend towards the inline and block ends. Layouts must reserve clearance equal to the largest shadow offset so the visible silhouette remains centred and is not clipped against the viewport. Nested shadowed surfaces reserve their own inline-end and block-end clearance.

Viewport spacing also honours `env(safe-area-inset-*)` values. This keeps the same visual rhythm when the site is displayed in a standalone or full-screen context on devices with rounded corners, camera cut-outs or home indicators.

## Borders and elevation

Pop Art separation is created with high-contrast outlines and offset shadows rather than realistic floating elevation. Components should use the named border-width, shadow-offset and shadow tokens. Shadows are decorative and never the only boundary between content regions.

## Motion and reduced motion

Interaction may use short translations and shadow compression to communicate hover and press states. Motion is an enhancement, not a requirement. Under `prefers-reduced-motion: reduce`, non-essential transforms, smooth scrolling and transitions are removed or reduced to near-instant changes.

The development showcase also provides a local, non-persisted reduced-motion override. It exists only for repeatable review and does not alter the public preference model.

## Focus

Interactive elements use a high-contrast double-ring focus treatment based on `focusInner` and `focusOuter`. Focus styling uses `:focus-visible` so keyboard navigation remains clear without adding persistent outlines to pointer interaction.

## Development review route

During development, `/__dev/design-system` exposes the complete IRPW-17 review surface for tokens, typography, layout foundations, shared primitives, focus, disabled state, responsive behaviour and reduced motion.

The route is excluded from production routing and from the public bilingual navigation contract. It remains application-local: it is not Storybook, a separate package or a public component-library product.
