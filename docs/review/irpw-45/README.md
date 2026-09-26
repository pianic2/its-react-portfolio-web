# IRPW-45 visual and engineering evidence

**Branch:** `IRPW-45-design-system-refinement-v2` | **Validated application SHA:** `20b86dc8415b80e47e99b70ff956894dda6a4900` | **Baseline:** `da8a8f613dc81306ec8ad5cdf320204af1d2e5a7` | **Runtime:** Node 24.17.0, Vite 8.1.4

## Design contract

The refinement preserves Digital Studio / Pop Editorial Engineering. It uses four emphasis levels: structural surfaces stay neutral and flat; ordinary controls stay quiet until active, hovered or focused; featured support gets one restrained rule or accent; each viewport has one signature focal composition. The patterned navigation shell remains recognizable chrome, while its links rest quietly. The Home thesis remains “I build projects to understand how things really work.” Projects lead with artwork and narrative, Profile keeps its editorial progression, Contact retains its form path, and Privacy uses compact document hierarchy.

The implementation reuses existing semantic colors, typography, radius and shadow values. It adds no token, UI library, dependency or parallel component system. The `standard` `StudioCard` is now structural; `featured` stays explicit. MUI button hover surfaces retain their semantic variant, and the desktop navigation uses separate content-sized tracks from 1200 px.

## Changed surface summary

- Theme and shared surfaces: regular Paper/Card structures use a 12 px radius and no default offset shadow; ordinary controls retain their semantic backgrounds while hover treatment stays restrained.
- Navigation: desktop mode starts at 1200 px, link resting states are quieter, the active route remains underlined and semantically marked, and the mobile Drawer keeps its modal behavior.
- Home: the eyebrow uses the accessible text role, the thesis stays exact, the learning blocks no longer compete as raised/rotated cards, and CTAs retain their order.
- Projects: `ProjectGuide` is now supporting guidance; full-width project artwork, narrative, work/evidence notes and links lead.
- Profile and Privacy: shorter openings bring their content forward while retaining heading order, manifesto, update metadata and localized links.
- Contact: no page source or form-flow changes; final renders retain the existing conversion composition.
- Test stability: axe checks use a 15-second local timeout; the lazy Italian Method route assertion uses a 5-second query wait. Axe rules, assertions, application routes and load behavior are unchanged.

## Backend integration preservation

No backend/provider integration code changed. `src/content`, contact services/adapters, Blog and Contact integration points, environment-variable contracts, route configuration and data-loading architecture remain outside the implementation diff. No Wagtail/API audit or remediation was attempted; any findings belong to that follow-up task.

## Before and after browser captures

`before/` contains all 25 baseline screenshots. `after/` contains all 54 final screenshots: the five Italian pages at 320, 390, 768, 1024, 1280, 1440 and 1920 px; both themes on representative pages; and English samples. `interactions/` contains the scrolled Projects artwork/narrative and lower evidence capture. Screenshots were captured with the local production-style Vite preview after fonts settled.

Examples:

| Surface                    | Before                                                          | After                                                               |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| Home light, 1440           | `before/home-1440-light.png`                                    | `after/home-it-1440-light.png`                                      |
| Home dark, 1440            | `before/home-1440-dark.png`                                     | `after/home-it-1440-dark.png`                                       |
| Projects light, 1440       | `before/projects-1440-light.png`                                | `after/projects-it-1440-light.png`                                  |
| Projects dark, 1440        | `before/projects-1440-dark.png`                                 | `after/projects-it-1440-dark.png`                                   |
| Profile light/dark, 1440   | `before/profile-1440-light.png`, `before/profile-1440-dark.png` | `after/profile-it-1440-light.png`, `after/profile-it-1440-dark.png` |
| Contact light/dark, 1440   | `before/contact-1440-light.png`, `before/contact-1440-dark.png` | `after/contact-it-1440-light.png`, `after/contact-it-1440-dark.png` |
| Privacy light/dark, 390    | `before/privacy-390-light.png`, `before/privacy-390-dark.png`   | `after/privacy-it-390-light.png`, `after/privacy-it-390-dark.png`   |
| First project after scroll | —                                                               | `interactions/homeedge-top.png`, `interactions/homeedge-detail.png` |

The final capture metrics recorded 54/54 pages with loaded font readiness, an H1, and no horizontal overflow. Captures at 1200 px and above use desktop navigation. Reviewers inspected the full width matrix, not only overflow metrics.

## Independent review

- **Art direction:** Home is materially stronger than baseline: its desktop thesis is three lines instead of four at 1440, the hero is about 80 px shorter, and the next section appears sooner. The open right side at 1920 reads as deliberate negative space inside the shared centered layout and patterned signature surface; adding filler would weaken the composition. The guide is less prominent than the project artwork.
- **Responsive:** PASS for Home, Projects, Profile, Contact and Privacy at 320, 390, 768, 1024, 1280, 1440 and 1920 px. The Projects 1024 split introduction is present and legible. Initial reports that it was missing and that English Contact shifted vertically were corrected after re-opening the original captures at full detail.
- **Projects adversarial review:** PASS. The 01 banner leads into project-specific narrative, evidence status, work-in-progress notes, tags and destination links. No unresolved Blocker or High visual finding remains.
- **Navigation / engineering review:** PASS. An earlier 1200 px active-link overlap was corrected and independently re-reviewed; focused navigation tests pass. Task 3 page-code review found no issue.
- **Accessibility / browser interaction:** PASS. The mobile Drawer exposes a named modal dialog, traps keyboard focus in both directions, closes on Escape and restores focus to its trigger. Keyboard focus on the close button renders a 3 px outline with 3 px offset. Reduced-motion emulation is honored. Contact fields have associated labels, required state and 56 px control targets; navigation controls are at least 46 px.
- **Adversarial review:** no unresolved Blocker, High or Medium design/engineering findings. Three LOW observations at 320 px remain contained and readable: the Italian Home eyebrow leaves “FORMAZIONE” on a second line, the English Home GitHub action wraps, and the Privacy date chip wraps.

## Validation

- Baseline `npm run check` at `da8a8f6` -> PASS before implementation.
- Focused theme/surface, navigation and page tests -> PASS. The accessibility engineer also ran contrast + navigation checks (37/37), the axe suite (7/7), and the route suite (28/28).
- Final responsive browser matrix -> PASS, 54 captures across the requested 320, 390, 768, 1024, 1280, 1440 and 1920 px widths. `capture-metrics.json` records each page and confirms loaded font readiness, H1 presence and no horizontal overflow.
- Final `npm run check` -> PASS (Node 24.17.0): format, lint, typecheck, architecture, content validation, 29 test files / 205 tests, production build, 24-route sitemap, Pages bundle contract and performance budget.
- The build still prints the existing Vite 500 kB chunk warning; `performance:check` passes. This issue makes no route or loading architecture change.

No UI or backend integration changes were needed after independent design, accessibility, responsive, visual QA and adversarial reviews. Final delivery SHA is recorded in the delivery report and Jira evidence.
