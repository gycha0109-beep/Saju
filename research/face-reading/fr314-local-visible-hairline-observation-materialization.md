# FR314 — Local visible-hairline observation materialization

Status: materializer implemented; no real FR313 admission or real observation exists in the repository

Watchtower-Track: face-observation-engine

## Purpose

FR314 connects an actually admitted FR313 model receipt to the existing FR305 visible-hairline observation contract.

Implementation alone does not create evidence.

A real observation can be materialized only when:

- FR313 actually admitted the exact pinned hairline model;
- the exact FR305 model-admission receipt exists;
- a local runtime produced an explicitly visible boundary observation;
- the observation remains within the FR305 visibility and substitution boundaries.

## Local-only material

The following data are runtime-local and must not be committed to Git, GitHub issues, pull requests or public evidence artifacts:

- source face image;
- visible hairline boundary polyline;
- source-image digest;
- source observation references;
- derived subject-level vertical coordinate.

The repository-safe receipt contains only non-identifying execution state.

## Fail-closed behavior

FR314 returns unavailable without inventing a fallback when:

- an admitted FR313 receipt does not exist;
- a valid admission exists but no visible observation is available.

FR314 rejects the observation when:

- model ID or exact revision differs from the admitted model;
- fewer than two valid boundary points exist;
- normalized coordinates are outside the FR305 frame;
- any segment is degenerate;
- hidden segments were completed;
- provider face oval was substituted as hairline;
- face-mesh top vertices were substituted as hairline;
- source digest or observation references are missing;
- any protected observation material is declared publicly persisted.

## Successful local materialization

A successful local call constructs the exact:

`FR305VisibleHairlineObservation`

and passes it with the admitted model receipt into:

`deriveVisibleHairlineVerticalReferenceFR305`

The resulting neutral reference remains:

- canonical image-normalized 2D;
- visible-segments only;
- fail-closed;
- neutral observation only;
- cross-anchor span blocked.

## Repository-safe receipt

The public-safe receipt can state only:

- exact model revision matched;
- visible observation materialized;
- neutral reference available;
- hidden completion absent;
- prohibited substitution absent;
- no private observation material publicly persisted;
- cross-anchor span not ready;
- common coordinate-frame bridge not issued.

It contains neither the boundary geometry nor the derived subject-level coordinate.

## Authority boundary

Even after a real FR314 local materialization:

- anatomical hairline ground truth remains false;
- 髮際 traditional binding remains false;
- Three-Divisions span execution remains false;
- common coordinate-frame bridge remains absent;
- Product remains 18 / 29;
- Production remains false;
- Commerce remains false.

If FR313 admission and FR314 materialization both truly exist, neutral hairline reference capability may reach 7 / 7.

That is not equivalent to executable Three-Divisions spans.

## Current repository state

Real representative evidence has not been admitted, therefore:

- FR313 admission available: false;
- real visible-hairline observation materialized: false;
- neutral hairline reference materialized: false;
- handoff-ready neutral references: 6 / 7;
- remaining neutral references: 1;
- common coordinate-frame bridge: absent;
- traditional bindings: 0;
- Product: 18 / 29;
- Production / Commerce: false.

## Next

Only after a real admitted FR313 receipt and a successful real FR314 local materialization should FR315 define the common-coordinate-frame bridge needed for cross-reference span computation.
