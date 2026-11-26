# R087 — birth-time perturbation sensitivity protocol

Date: 2026-09-20  
Issue: #1031  
Status: TEST MANIFEST READY / CALCULATION AUTHORITY PINNED / FULL EXECUTION INPUT+INTERPRETATION AUTHORITY PENDING

## Authority update

The original workbench assumption that calculator authority was not pinned is stale.

Current governed calculation authority on merged main:
- policy: `myeonghwa-production-civil-midnight-v1`;
- authorization: `myeonghwa-production-calculation-default-authorization-v1`;
- authority record: `docs/decisions/ADR-0006-production-calculation-default-v1.md`;
- engine: `manseryeok@2.0.0`;
- adapter: `myeonghwa-manseryeok-adapter@0.1.0`;
- supported production timezone: `Asia/Seoul`;
- default day boundary: midnight;
- true-solar correction: OFF.

Source: `docs/product/21-production-calculation-authority-v1.md` plus adapter provenance in `src/calculation/manseryeok-adapter.ts`.

This pins a calculation baseline. It does **not** authorize historical-input imputation, alternate-policy promotion, or Production interpretation claims.

## Preconditions

Before a full perturbation execution may claim end-to-end sensitivity evidence, pin:
- independently reproducible exact timestamp precision;
- place/longitude authority when a tested policy requires it;
- timezone/local-time authority;
- selected calculation policy ID/version;
- engine + adapter versions;
- day-boundary policy;
- solar-term boundary behavior under the pinned engine/policy;
- interpretation comparison authority for any candidate-state or interpretation-claim delta.

Source-provided historical charts with incomplete timestamp/place provenance remain ineligible for independent recalculation.

## Perturbation families

### HOUR_BRANCH_BOUNDARY
For every governed two-hour boundary: `-30m, -15m, -1m, +1m, +15m, +30m`.

### DAY_BOUNDARY
At the selected policy boundary: `-1m, +1m`. The authorized V1 production baseline uses midnight. Alternate 23:00 behavior, if studied, must remain an explicitly separate sensitivity policy and must not be relabeled as the production default.

### SOLAR_TERM_BOUNDARY
For a pinned solar-term instant capable of changing month pillar: `-1m, +1m`.

### INTERIOR_CONTROL
Choose timestamps well inside the same hour/month/day segment where no pillar change is expected.

## Per-case output

Record separately:
1. timestamp delta;
2. year/month/day/hour pillar delta;
3. research candidate-state delta;
4. interpretation-claim delta;
5. expected/unexpected under the pinned calculation policy.

Calculation-layer observations may be produced only from governed reproducible inputs. Items 3–4 must remain unavailable/INDETERMINATE where the required interpretation authority is absent; calculation authority alone must not synthesize them.

## Boundary

`executionPending = true` now means **full end-to-end execution is pending governed reproducible input fixtures and interpretation-comparison authority**, not that the production calculation baseline is missing.

No robustness claim is authorized from the manifest alone. No Production interpretation authority is promoted.
