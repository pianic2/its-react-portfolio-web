# IRPW-9 content model

## Purpose

The content layer keeps bilingual portfolio data independent from React rendering and route construction. Static content remains versioned in the repository and is validated before pages consume it.

## Data flow

```text
raw bilingual content
  -> Zod schemas
  -> referential and locale-parity validation
  -> locale/project loaders
  -> page view data
  -> React pages
```

## Boundaries

- `src/content/schema.ts` owns runtime contracts and inferred TypeScript types.
- `src/content/data.ts` owns shared factual records and equivalent Italian/English copy.
- `src/content/validation.ts` owns schema, reference, uniqueness and parity checks.
- `src/content/loaders.ts` owns locale selection, project lookup and localized route generation.
- React pages consume loaders and do not import raw content.
- `src/routes/routeConfig.ts` remains the source of truth for route paths and route matching.
- The design system is not changed by IRPW-9.

## Project identity and localization

Each project has a stable non-localized `projectId`. Each locale provides an explicit slug and editorial copy. Route switching must preserve the stable ID and resolve the target locale slug rather than copying the current URL segment.

Shared records own facts that must not drift between locales:

- project status;
- capability references;
- evidence;
- external links;
- asset references;
- portfolio ordering.

Localized records own:

- slug;
- title and summary;
- problem, approach and outcome;
- role description;
- metadata;
- claim presentation status.

## Claim status

- `verified`: requires at least one evidence reference and is reserved for claims supported by reviewed evidence.
- `demonstrated`: requires evidence and describes behaviour or structure visible in the repository or a reproducible demo.
- `declared`: records descriptive information without presenting it as independently verified.
- `planned`: describes future work and cannot reference evidence as completed work.

The current four projects use `demonstrated` claims backed by their canonical repositories. HomeEdge and AI Social wording explicitly preserves their documented maturity boundaries.

## Initial project set

1. HomeEdge AI Platform
2. Restaurant Kitchef Brain
3. AI Social Agent
4. ITS Libreria API

The source repositories are the factual evidence surface. Content must not claim production readiness, commercial readiness or completed roadmap components unless those repositories provide reviewed evidence.

## Validation

Run:

```bash
npm run content:validate
npm run check
```

Validation rejects:

- invalid schema values;
- unsupported verified or demonstrated claims;
- missing locale records;
- duplicate project IDs or localized slugs;
- unknown evidence references;
- missing capability references;
- different project or navigation sets between Italian and English;
- different claim status for the same project across locales.

Errors include a content path or entity identifier so the failing record is actionable.

## Adding a project

1. Add one shared project record with a stable ID, evidence and capability references.
2. Add one Italian localized record.
3. Add one English localized record with the same project ID and claim status.
4. Use an explicit slug in each locale.
5. Run content validation and the complete quality gate.
6. Add only claims supported by repository evidence.

## Adding a locale

A new locale requires a complete site record, navigation set, capability labels and one localized record for every shared project. Locale parity validation must be extended before the locale is exposed by routing.
