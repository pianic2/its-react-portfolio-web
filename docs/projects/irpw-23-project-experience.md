# IRPW-23 Project experience

## Scope

This delivery completes the Home and Projects editorial experiences without changing the global design system, implementing the remaining portfolio pages, or adding unverified project claims.

## Content architecture

`PortfolioContentProvider` is mounted once in the localized `AppLayout`. It exposes validated, synchronous content through `usePortfolioContent`, including the current language, all projects, featured projects, ID and slug lookups, and localized detail paths. Zod validation remains a module-load concern in the content loaders and is not repeated during React renders.

The project view model provides rendering-oriented fields such as the stable project number, localized origin label, primary claim status and label, repository URL, localized detail path, deterministic visual variant, explicit question, supporting text, work summary and possible future improvement. Components do not import raw content records or infer editorial copy from other fields.

## Components

- `EditorialSectionHeader` keeps heading copy and descriptive copy in separate responsive areas.
- `HomeHero`, `LearningSection`, `SkillsSection`, `ProcessSection` and `ContactSection` compose the six Home sections around the shared project showcase.
- `ProjectShowcaseCard` renders the exact localized question, description, supporting text, project origin, capability chips, one claim status, and explicit detail and repository actions. The Projects variant also renders the localized work and possible-improvement fields.
- `ProjectArtwork` composes repository-independent geometric artwork from Digital Studio theme tokens and existing halftone or diagonal patterns.
- `ProjectGuide`, `ProjectComparison`, `ProjectJourneySection` and `ProjectsClosingSection` complete the Projects narrative. Comparison uses three semantic panels rather than a wide table.
- `HomePage` and `ProjectsPage` only compose feature components; public copy remains in the validated content layer.
- `ProjectDetailPage` uses the context for slug resolution and presents a project hero, idea, built work, value, current stage, readable evidence items, and project navigation. Evidence separates localized type, title, description and link label. Internal claim copy and the raw `[UNVALIDATED]` marker are not rendered publicly.

## Responsive and accessibility contract

Project grids use `minmax(0, ...)`, every content boundary uses `min-width: 0`, and decorative transforms remain inside clipped artwork regions. Card shadows retain the clearance reserved by `PageContainer`. The visually hidden new-tab description in `ExternalLink` is positioned at the containing-block origin so it cannot extend the document width.

Decorations are hidden from assistive technology. Cards remain structured articles with explicit links rather than nested interactive surfaces. Claim status is conveyed with text, focus states come from the shared Digital Studio primitives, touch targets are at least 44 pixels, and reduced-motion preferences disable the card lift transition.

## Local review evidence

The following routes were checked with Chrome at 320, 360, 390, 430, 768, 1024, 1280, and 1440 pixels. Each measured `documentElement.scrollWidth` equal to `documentElement.clientWidth`:

- `/it`
- `/en`
- `/it/progetti`
- `/en/projects`
- `/it/progetti/homeedge-ai-platform`
- `/en/projects/its-library-api-laravel`
- `/it/progetti/gestore-liste-node`
- `/en/projects/node-list-manager`

Temporary review screenshots cover Home, Projects, and Project Detail in mobile and desktop layouts, both languages, and both themes. They are intentionally excluded from version control.
