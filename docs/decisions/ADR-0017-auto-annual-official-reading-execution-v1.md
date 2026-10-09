# ADR-0017 — Automatic Annual Structural Impact Production in Official Reading

- Status: Accepted
- Date: 2026-10-07
- Scope: connect the bounded R198 annual structural-impact producer to the governed Official Reading execution path
- Extends: ADR-0016

## Context

R198 can produce a governed annual structural-impact bundle from:

- a canonical Saju snapshot;
- one annual ReadingRequest;
- one governed structure id;
- governed R192 structural role assignments.

Before R199, executeProductReading could consume only a manually supplied R196 impact bundle.
That left the product orchestration incomplete even though the deterministic producer existed.

## Decision

GovernedReadingExecutionOptions now supports two mutually exclusive annual temporal inputs.

### Manual path

`governedAnnualTemporalStructure`

- baseline;
- prebuilt governed annual impact bundle.

This path remains supported for explicit upstream orchestration and tests.

### Automatic path

`governedAnnualTemporalProduction`

- baseline;
- governed structural role assignments.

When the resolved consumer authority is Official Reading and the request is annual, execution calls
produceAnnualStructuralImpactBundleV1.

A resolved producer result is converted internally to the same manual input shape:

- the supplied baseline is retained;
- the R198 bundle becomes the impact bundle.

The existing R194 -> R193 -> R195 path then remains authoritative for temporal transition, reading-safe
projection, rendering, artifact hashing, and public response transport.

## Fail-closed behavior

Manual and automatic inputs cannot be supplied together.

Any governed annual temporal input requires:

- an annual request;
- Official Reading consumer authority.

If R198 returns unavailable, execution returns invariant_blocked. It does not:

- retry with another temporal method;
- drop the annual structure section silently;
- invoke legacy narrative;
- ask an LLM to settle the missing semantics.

The internal reason code identifies the bounded producer gate. Dayun-context and structural-role subreasons are
also preserved when available.

If R194 later rejects the produced bundle or transition, the existing annual temporal integration block remains
in force.

## Authority boundary

R199 does not alter:

- Preview Official Reading section authorization;
- R198 bounded eligibility;
- branch/root semantics;
- Dayun transition handling;
- canonical interpretation claim authority;
- renderer semantics;
- LLM authority.

The automatic producer is orchestration, not a new semantic authority.

## Public boundary

Producer ids, bundle ids, role-assignment ids, and internal gate details are not added to the ReadingArtifact or
ProductReadingResponse. The consumer receives only the settled reading-safe annual structure projection already
defined by R194/R195.
