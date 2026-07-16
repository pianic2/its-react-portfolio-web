# Shared layout and interaction primitives

IRPW-16 turns the Digital Studio tokens into reusable application components. The primitives remain application-local: this repository does not publish a separate component package.

## Layout

### `PageContainer`

Defines the single optical horizontal axis used by the header, page sections and footer. It consumes the responsive page-gutter tokens, honours left and right safe areas and reserves inline-end clearance for Pop Art offset shadows.

Use `reserveShadowClearance={false}` only when the visible surface cannot extend beyond its content box.

### `PageSection`

Creates a semantic section with token-driven responsive block spacing. Supported spacing levels are `compact`, `regular` and `spacious`; pages should not introduce one-off section padding.

## Application shell

`AppLayout` owns the persistent landmarks only:

- skip link;
- route focus manager;
- sticky site header;
- main outlet;
- site footer.

Page composition remains the responsibility of page routes.

## Navigation

`PrimaryNavigation` is the single source for desktop and mobile navigation. `NavigationLink` uses React Router active state, `aria-current`, a structural underline and shadow compression so the current page is not communicated through colour alone.

The mobile and tablet layout uses a temporary Material UI Drawer. It closes after navigation, supports Escape and relies on the MUI modal focus trap and focus restoration.

`LanguageSwitch` treats the localized URL as authoritative and stores the selected preference only as the next root-route default. `ThemeToggle` exposes the active light/dark state with `aria-pressed`.

## Links and actions

- `InternalLink` is for in-application navigation.
- `ExternalLink` adds a visible external-link icon and safe new-tab attributes when requested.
- `ButtonLink` is a navigation link presented as a call-to-action.
- `StudioIconButton` provides shared Pop Art hover, active, focus-visible, disabled and reduced-motion states for compact icon actions.
- MUI `Button` remains the primitive for actions that do not navigate.

## Surfaces

`StudioCard` provides only `standard` and `featured` variants. Both reserve their own offset-shadow footprint. Cards remain non-interactive unless they contain an explicit link or button.

## Accessibility and motion

- keyboard focus remains visible;
- skip navigation transfers focus to the main landmark;
- route changes focus the main landmark after client-side navigation;
- active, hover and disabled states do not rely only on colour;
- motion is removed by the existing `prefers-reduced-motion` theme policy;
- semantic landmarks and navigation lists are preserved.

## Showcase boundary

The existing `/__dev/design-system` route remains development-only scaffolding. IRPW-16 supplies reusable primitives; the complete responsive state matrix, screenshots and recorded visual-review findings remain IRPW-17 scope.
