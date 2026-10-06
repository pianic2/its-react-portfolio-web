# IRPW-45 Visual Hierarchy Contract

**Design read:** Preserve the Digital Studio / Pop Editorial Engineering identity for a technical portfolio. Keep the warm canvas, Archivo Black and Atkinson Hyperlegible, editorial numbering, strong ink outlines, offset shadows, patterns, and high-contrast palette. Use the bundled PostHog study only for hierarchy and chromatic scarcity; do not import its colors, type, branding, or components.

## Emphasis levels

| Level                | Role                                                                        | Treatment                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 — Structural       | Canvas, section rhythm, document rules, header shell, quiet grouping        | Neutral semantic surface; thin or no border; contained radius; no offset shadow or pattern by default.                                                                               |
| 1 — Interactive      | Links, nav items, inputs, ordinary buttons and compact controls             | Quiet resting state; active/focus states remain explicit and keyboard-visible; hover changes at most two major properties.                                                           |
| 2 — Featured         | Project evidence, a key callout, contact form, one supporting profile block | One clear rule or restrained accent; existing medium border/radius/shadow at most; do not nest equally loud panels.                                                                  |
| 3 — Hero / Signature | A page’s primary focal moment                                               | Strong color, pattern, display type, or large offset shadow may appear together only when they form one intentional focal composition. Normally one dominant L3 moment per viewport. |

Existing semantic color pairs remain authoritative. `primary`, `secondary`, and `accent` carry brand meaning; `success`, `warning`, and `error` carry feedback meaning. Render each `onX` role only against its matching color surface. Do not add color tokens for roles the current palette already expresses.

Keep the current numeric scales and assign them by purpose: `xs`/`sm` radii for structural and interactive surfaces, `md` for featured surfaces, and `lg` only for signature surfaces; pill remains for chips. Structural surfaces have no offset shadow; interactive surfaces use the small offset only for feedback; featured surfaces may use a small or medium offset; the large offset is reserved for L3. Preserve the largest-shadow clearance in shared layout primitives.

`StudioCard` `standard` is the L0 structural surface: existing surface fill, small radius, regular border, no offset shadow and no reserved shadow margin. `featured` is L2: `surfaceStrong`, medium radius and medium offset. MUI Paper/Card defaults stay structural; stronger treatment is explicit. Do not add a parallel emphasis API.

The MUI theme owns typography. Keep Archivo Black for short display statements and Atkinson Hyperlegible for body and interface text. Page components may control measure and responsive fit, but must not redefine type roles without rendered evidence. Motion uses transform and shadow for ordinary feedback, avoids rotation on normal content, and respects the existing reduced-motion policy.

## Page archetypes

- **Home — Marketing / Landing:** preserve “I build projects to understand how things really work.” Treat the thesis and one visual device as the signature; keep the primary CTA first and make support copy and secondary actions recede.
- **Projects — Portfolio / Editorial:** artwork and project narrative lead. `ProjectGuide` explains how to read the work and stays at L0/L1; evidence remains available without nested high-emphasis cards.
- **Profile — Portfolio / Editorial:** keep the manifesto and asymmetric essay rhythm. Shorten the opening so the first meaningful section appears sooner; callouts and numbered markers support the story.
- **Contact — Conversion:** preserve the form, reading order, and conversion path. The form is the primary object; change its surrounding composition only when browser evidence shows a clear gain.
- **Privacy / 404 — Utility / Information:** compact introduction, short vertical setup, semantic document headings and scan-friendly links. No L3 decoration.

## Navigation and responsive behavior

The header shell is L0 chrome; its links are L1. Keep the characterized shell, reduce its visual mass, and remove permanent card treatment from individual links. Show desktop navigation, language, and theme controls from MUI `lg` (1200px); use the mobile drawer below that breakpoint. Preserve active-state semantics, visible focus, Escape close, modal focus containment/restoration, and touch targets.

Design mobile, tablet, desktop, and ultrawide compositions rather than only changing columns. Validate 320, 390, 768, 1024, 1280, 1440, and 1920px, plus transition neighbors at 599/600, 899/900, 1199/1200, and 1535/1536px. Check both languages at the desktop-nav threshold, both themes on the required page matrix, reading order, focal priority, and horizontal overflow.
