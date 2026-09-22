# IRPW-40 route loading and bundle evidence

## Measurement context

- Baseline commit: `eff1b43b67da15ad8c78a8f7c01dcb529e185b7d`.
- Candidate branch: `agent/irpw-40-performance-token-remediation`.
- Runtime: Node 24.17.0 and Vite 8.1.4.
- Command: `npm run build`.

## Bundle comparison

The baseline budget recorded the single initial JavaScript asset at 992,362 bytes
(302,660 bytes gzip). The candidate emits an initial `index` asset at 804,318
bytes (243,730 bytes gzip), a reduction of 188,044 bytes (18.9%) and 58,930
bytes gzip (19.5%).

The deferred `MethodPage` route asset is 193,333 bytes (61,370 bytes gzip). It
contains the Method route and its graph dependency, so `@xyflow/react` no
longer participates in the initial route payload. The initial CSS asset is 162
bytes (130 bytes gzip); Method route CSS is deferred with the route at 11,143
bytes (2,030 bytes gzip).

## Route and loading contract

- `MethodPage` is loaded through a route-level `React.lazy` boundary.
- The development-only design-system route is also lazy and is excluded from
  production routing.
- The loading boundary has a localized polite status announcement and busy state.
- The existing route suite covers localized Method rendering after the async
  boundary resolves.

## Lighthouse follow-up

No browser-derived Lighthouse score is recorded here: a comparable production
Pages deployment can only be measured after the remediation branches are
integrated. IRPW-41 owns the final deployed-route Lighthouse comparison using
the same viewport, locale, cache, and throttling settings for baseline and RC.
