# R087 — birth-time perturbation sensitivity protocol

Date: 2026-09-20  
Issue: #1031  
Status: TEST MANIFEST READY / EXECUTION PENDING CALCULATOR AUTHORITY

## Preconditions

Do not execute against a historical/source example unless all required calculation provenance is available:
- exact timestamp precision;
- place/longitude authority;
- timezone/local-time authority;
- solar-time policy;
- day-boundary policy;
- solar-term boundary policy;
- calculator/ephemeris version.

## Perturbation families

### HOUR_BRANCH_BOUNDARY
For every governed two-hour boundary: `-30m, -15m, -1m, +1m, +15m, +30m`.

### DAY_BOUNDARY
At the explicitly selected day-boundary policy only: `-1m, +1m`. R087 does not choose 23:00 vs 00:00.

### SOLAR_TERM_BOUNDARY
For a pinned solar-term instant capable of changing month pillar: `-1m, +1m`.

### INTERIOR_CONTROL
Choose timestamps well inside the same hour/month/day segment where no pillar change is expected.

## Per-case output

Record:
1. timestamp delta;
2. four-pillar delta;
3. research candidate-state delta;
4. interpretation-claim delta;
5. expected/unexpected under the pinned calculation policy.

## Boundary

`executionPending = true` until a governed calculator version and reproducible birth inputs are available.

No robustness claim is authorized from the manifest alone.