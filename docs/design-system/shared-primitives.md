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

The programmatically focused main landmark intentionally suppresses its browser outline because it is not a tab-stop control. Keyboard focus remains visible on the skip link and every interactive element.

Page composition remains the responsibility of page routes.

## Navigation

`PrimaryNavigation` is the single source for desktop and mobile navigation. `NavigationLink` uses React Router active state, `aria-current`, a structural underline and shadow compression so the current page is not communicated through colour alone.

The mobile and tablet layout uses a temporary Material UI Drawer. Its paper is a floating surface with safe-area-aware external margins and reserved shadow clearance rather than a rounded panel attached directly to the viewport. Vertical navigation links share one full-width column. The Drawer closes after navigation, supports Escape and relies on the MUI modal focus trap and focus restoration.

`LanguageSwitch` renders one destination-language link. The compact and full presentations expose a custom inline flag graphic plus the target language code or name. The localized URL remains authoritative and the selected preference is stored only as the next root-route default. Fixed flag colours are content semantics and are intentionally isolated inside `LanguageFlag`; application surfaces continue to consume theme tokens.

`ThemeToggle` exposes the active light/dark state with `aria-pressed`.

## Links and actions

- `InternalLink` is for in-application navigation.
- `ExternalLink` adds a visible external-link icon and safe new-tab attributes when requested.
- `ButtonLink` is a navigation link presented as a call-to-action.
- `StudioIconButton` provides shared Pop Art hover, active, focus-visible, disabled and reduced-motion states for compact icon actions.
- MUI `Button` remains the primitive for actions that do not navigate.

## Surfaces

`StudioCard` provides only `standard` and `featured` variants. Both reserve their own offset-shadow footprint. Cards remain non-interactive unless they contain an explicit link or button.

## Accessibility and motion

- keyboard focus remains visible on interactive controls;
- skip navigation transfers focus to the main landmark;
- route changes focus the main landmark after client-side navigation without drawing a viewport-sized focus rectangle;
- active, hover and disabled states do not rely only on colour;
- motion is removed by the existing `prefers-reduced-motion` theme policy;
- semantic landmarks and navigation lists are preserved.

## Showcase integration

The development-only `/__dev/design-system` route consumes these primitives directly. IRPW-17 adds the responsive state matrix, local review controls, focused showcase tests and the visual/accessibility evidence record without creating a second application or public UI package.
