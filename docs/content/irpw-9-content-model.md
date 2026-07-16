# IRPW-9 content layer

## Purpose and boundary

The content layer is the validated source for bilingual portfolio content. It is independent of React page composition and keeps stable facts separate from localized copy.

IRPW-9 supplies schemas, data, validation, view models, loaders and route integration. IRPW-23 consumes that contract through a localized React context while keeping visual composition outside the content layer.

## Data flow

```text
shared facts + localized copy
  -> Zod schemas
  -> integrity and locale-parity validation
  -> view-model assembly
  -> locale-aware loaders and route paths
  -> React rendering
```

## Directory responsibilities

- `src/content/schema.ts` defines runtime contracts and inferred TypeScript types. It has no dependency on React or routing.
- `src/content/data/shared.ts` contains stable IDs, capability references, evidence URLs, external URLs, asset references, featured flags and order.
- `src/content/data/it.ts` and `src/content/data/en.ts` contain localized site, navigation, CTA, capability, project, evidence-label and metadata copy.
- `src/content/data/index.ts` assembles the raw repository without validating or rendering it.
- `src/content/validation.ts` validates schemas, uniqueness, references and locale parity and produces actionable errors.
- `src/content/viewModels.ts` joins validated shared facts with one locale. Pages do not perform this join.
- `src/content/loaders.ts` exposes the public read API and is the only content module that constructs localized route paths.
- `src/content/context` exposes the validated loader API to localized React routes without duplicating or reparsing data.
- `src/routes/routeConfig.ts` owns path patterns and route matching. It does not own navigation labels.
- React pages consume loaders only and never import `src/content/data`.

This separation prevents raw data, validation policy, URL construction and rendering concerns from becoming page-specific code.

## Identity, slugs and localization

Each project has a stable, non-localized `id`. Localized records refer to it through `projectId`. Slugs are explicit locale-owned values and are not canonical identity.

Language switching on Project Detail resolves the current slug to a stable project ID and then asks the target locale for its path. Copying the source slug into the target route is not supported.

Italian and English must have equivalent project, capability, navigation, section, evidence, link, asset and claim contracts. Text may differ as a translation, but claim IDs, status and evidence references must remain equivalent.

## Claim contract

Every claim has:

- a stable `id`;
- localized `text`;
- one status from `verified`, `demonstrated`, `declared` or `planned`;
- evidence IDs governed by that status.

`verified` and `demonstrated` require at least one evidence reference. `declared` may carry evidence but is not promoted to independent verification. `planned` cannot reference evidence as proof of completed work. Validation also rejects evidence IDs that do not belong to the same project.

The view model provides the localized status label. Pages and Home do not interpret status values themselves.

## Public loader API

The supported project API is:

```ts
getFeaturedProjects(language)
getAllProjects(language)
getProjectById(language, projectId)
getProjectBySlug(language, slug)
getLocalizedProjectPath(projectId, language)
```

`getFeaturedProjects` returns validated view models in shared portfolio order. Each model includes a localized detail path, resolved capabilities, claims, evidence, links, assets, metadata and a deterministic visual variant. `PortfolioContentProvider` exposes this result to IRPW-23; visual components do not import raw files, filter records, reconstruct URLs or reinterpret claim status.

Unknown IDs and slugs return `null`. Project Detail renders a localized not-found state for an unknown slug.

## Validation

Run:

```bash
npm run content:validate
npm run check
```

Validation rejects:

- invalid schema values and non-HTTPS external URLs;
- duplicate shared project, capability and asset IDs;
- duplicate project-local evidence, link, section and claim IDs;
- duplicate slugs within a locale;
- missing locale projects or capability copy;
- unknown capability, evidence and asset references;
- localized evidence, link or asset sets that do not match shared facts;
- verified or demonstrated claims without evidence;
- Italian and English navigation, section or claim-contract drift.

Errors include locale, entity type, stable ID and data path whenever that context is available.

## Adding a project

1. Add one shared project in `data/shared.ts` with a stable ID, evidence, links, capabilities, asset references, featured flag and order.
2. Add one localized record in every locale file using the same project ID.
3. Keep section IDs, claim IDs, claim statuses and evidence references equivalent across locales.
4. Use a locale-owned slug and localized metadata.
5. Add only claims supported by the referenced source. Preserve explicit source limitations.
6. Run content validation and the complete quality gate.

## Adding a language

1. Add the language to `supportedLanguages` in `schema.ts`.
2. Add a complete locale file with site copy, navigation, CTAs, capability copy and every project.
3. Add localized path patterns in `routeConfig.ts`.
4. Generalize the parity checks currently comparing Italian and English.
5. Add loader, route-switch and negative validation tests before exposing the locale.

## Canonical project sources

### HomeEdge AI Platform

- Repository: <https://github.com/pianic2/homeedge-ai-platform>
- Primary evidence: <https://github.com/pianic2/homeedge-ai-platform/blob/main/README.md>

The portfolio states only that the Sprint 0 README defines the ESP32-C3 room/door MVP boundary and its included signals. Backend, mobile and AI service boundaries remain `[UNVALIDATED]`. The content does not claim production, commercial, safety-critical or security-grade readiness, or that target service directories prove implemented services.

### ITS Library API in Laravel

- Repository: <https://github.com/pianic2/its-php-libreria>
- Primary evidence: <https://github.com/pianic2/its-php-libreria/blob/main/README.md>

The content is limited to repository-documented REST resources, Laravel Sanctum protection and the local Docker Compose setup. It does not claim deployment or production readiness.

### ITS Node.js Project

- Selected repository: <https://github.com/pianic2/todo-list-manager-node>
- Server evidence: <https://github.com/pianic2/todo-list-manager-node/blob/main/src/server.js>
- Manifest evidence: <https://github.com/pianic2/todo-list-manager-node/blob/main/package.json>

The public account also contains `todo-server`, but its public evidence is only a one-line README and no root `package.json` was available. `todo-list-manager-node` was selected because its source demonstrates an Express application with modular list and nested-item routes, while its manifest declares SQLite, Jest and Supertest.

The `todo-list-manager-node` README currently contains a `Code` link that points to the Laravel repository. That link and the README's live-demo statements are therefore not used as portfolio evidence. The content does not claim deployment, uptime, production maturity or results.

## Asset references

The schema supports shared asset provenance plus localized alternative text. The current canonical dataset intentionally contains no public portfolio assets because no reviewed asset was required for IRPW-9. Adding a project asset requires both a shared asset record and matching localized asset copy; dangling references fail validation.
