# ADR-0014 — Governed Annual Structural Impact Binding

- Status: Accepted
- Date: 2026-10-06
- Scope: bind externally governed annual structural semantics to one snapshot, year, and structure before R194/R195 consumption
- Extends: ADR-0013

## Context

R195 can deliver a resolved annual structure transition through the Official Reading artifact and public response.
Its initial execution input accepted a bare array of R192 assessments.

That array is not itself annual. R192 assessments identify a structure and a settlement, but do not bind the
semantic result to:

- one CanonicalSajuSnapshot;
- one annual target year;
- one annual semantic producer.

A bare array could therefore be accidentally reused across years or snapshots.

The research record still does not authorize an internal general annual semantic producer:

- R153 preserves annual stem emphasis together with branch participation and rejects annual-stem-only,
  branch-ignored, fixed-precedence, and executable annual composition shortcuts;
- R159 preserves temporal trigger sufficiency and outcome settlement as unresolved.

## Decision

R196 introduces a content-addressed GovernedAnnualStructuralImpactBundleV1.

The bundle binds:

- authority = governed_upstream;
- snapshotId;
- targetYear;
- structureId;
- producer id and version;
- one or more resolved R192 assessments.

The bundle rejects:

- empty assessment sets;
- assessment structure mismatch;
- duplicate assessment ids;
- duplicate settlement ids;
- invalid or tampered content identity.

R194 now requires the bundle and verifies after annual fact materialization that:

- bundle snapshot equals the active canonical snapshot;
- bundle year equals the resolved annual target year;
- bundle structure equals the governed temporal baseline structure.

Only then may R193 consume the assessments.

## Internal producer boundary

This phase does not create annual semantics from annual stem, annual branch, Dayun, or observed temporal
triggers.

The product capability manifest remains:

- internal annual structural-impact producer unavailable;
- annual-stem-only resolver unauthorized;
- annual-branch-ignore resolver unauthorized;
- executable temporal outcome resolver unauthorized.

A later producer must establish its own governed annual composition policy before it may create these bundles.

## Consumer boundary

The bundle identity and producer metadata remain internal. The public annual timing section remains the same
settled structure transition introduced by R195.
