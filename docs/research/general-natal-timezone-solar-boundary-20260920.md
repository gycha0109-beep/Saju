# R088 — timezone / solar-time boundary sensitivity protocol

Date: 2026-09-20  
Issue: #1036  
Status: TEST MANIFEST READY / PRODUCTION BASELINE PINNED / VARIANT EXECUTION AUTHORITY PENDING

## Authority update

R087 established that the production calculation baseline is already authorized:
- `myeonghwa-production-civil-midnight-v1`;
- `Asia/Seoul`;
- midnight day boundary;
- true-solar correction OFF;
- `manseryeok@2.0.0`;
- `myeonghwa-manseryeok-adapter@0.1.0`.

R088 therefore does not describe Production calculation authority as absent. It studies **sensitivity variants outside or around that baseline**. Historical timezone-data/runtime provenance and any alternate solar-time method must be separately pinned before those variants can support governed evidence.

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
- LONGITUDE_CORRECTION_POLICY: authorized baseline OFF versus an explicitly identified sensitivity-only ON policy.
- APPARENT_SOLAR_COMPONENT: only if the selected sensitivity method explicitly includes it.
- BOUNDARY_CROSSING: whether the resulting timestamp crosses an hour-branch, day, or solar-term boundary.

The existing engine rejects historical civil-time correction before 1908-04-01 when that correction mode is requested. That support floor is an implementation boundary, not evidence that every post-1908 historical timezone variant is automatically research-authorized.

## Required outputs

For each variant record:
- original local input and provenance;
- timezone authority/data/runtime version;
- resolved UTC instant;
- calculation policy ID/version;
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
- TREAT_SENSITIVITY_POLICY_AS_PRODUCTION_DEFAULT
- ROBUSTNESS_CLAIM_BEFORE_EXECUTION

## Execution boundary

`executionPending = true` applies to the **R088 sensitivity-variant experiment**, not to the already-authorized Production calculation baseline.

Variant execution remains pending:
- explicit historical timezone-data/runtime provenance for historical-regime tests;
- an identified sensitivity-only solar-time policy/method when solar correction is tested;
- governed reproducible input fixtures;
- interpretation-comparison authority for downstream research-state claims.

No alternate calculation policy, solar-time method, or Production interpretation authority is promoted by this protocol.
