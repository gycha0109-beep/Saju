# R088 — timezone / solar-time boundary sensitivity protocol

Date: 2026-09-20  
Issue: #1036  
Status: TEST MANIFEST READY / EXECUTION PENDING TIME AUTHORITY

## Separation rule

R088 treats these as separate transformations:
1. source local wall-clock input;
2. historical civil-time / timezone resolution;
3. optional governed longitude/solar-time transformation;
4. calendar pillar calculation.

No layer may be silently substituted for another.

## Sensitivity dimensions

- TIMEZONE_AUTHORITY_VARIANT: same wall clock, different historically supported offset authority.
- HISTORICAL_CIVIL_TIME_REGIME: regime boundary can change the resolved instant.
- LONGITUDE_CORRECTION_POLICY: OFF versus explicitly governed ON.
- APPARENT_SOLAR_COMPONENT: only if the selected method explicitly includes it.
- BOUNDARY_CROSSING: whether the resulting timestamp crosses an hour-branch, day, or solar-term boundary.

## Required outputs

For each variant record:
- original local input and provenance;
- timezone authority/data version;
- resolved UTC instant;
- solar-time method identifier and parameters, if any;
- corrected timestamp, if any;
- year/month/day/hour pillar delta;
- downstream research-state delta;
- boundary crossed and exact transformation that caused it.

## Rejected shortcuts

- CURRENT_OFFSET_FOR_HISTORICAL_DATE
- COUNTRY_ONLY_TIMEZONE_INFERENCE
- SOLAR_CORRECTION_BY_DEFAULT
- DOUBLE_APPLY_SOLAR_CORRECTION
- COLLAPSE_TIME_UNCERTAINTY_TO_EXACT_INSTANT
- ROBUSTNESS_CLAIM_BEFORE_EXECUTION

## Execution boundary

`executionPending = true` until timezone-data authority/version, solar-time method, ephemeris/calculator version, and reproducible birth inputs are pinned.

No Production calculation authority.