# R089 — cross-engine calculation disagreement audit

Date: 2026-09-20  
Issue: #1038  
Status: COMPARATOR MANIFEST READY / EXTERNAL REPLAY PENDING

## Current engine

- engine: `manseryeok@2.0.0`
- adapter: `myeonghwa-manseryeok-adapter@0.1.0`
- current adapter scope: `Asia/Seoul`
- calculation-policy profiles already distinguish civil/solar and midnight/jasi/split-jasi sensitivity.

## External comparator candidates

These are **comparators**, not authorities:
- `k-saju`: https://github.com/bunhine0452/k-saju
- `baziflow-core`: https://github.com/Eastern-Sunrise/bazi-core
- `tyme-bazi-mcp`: https://github.com/Zojekin/tyme-bazi-mcp

## Normalization rule

Do not compare raw outputs until conventions are matched. A mismatch caused by different declared policies is classified `POLICY_DIFFERENCE`, not `ENGINE_BUG`.

## Disagreement classes

1. INPUT_NORMALIZATION
2. YEAR_BOUNDARY
3. MONTH_SOLAR_TERM_BOUNDARY
4. DAY_BOUNDARY
5. HOUR_BRANCH
6. TRUE_SOLAR_TIME
7. LUNAR_SOLAR_CONVERSION
8. LUCK_DIRECTION_OR_START
9. TEN_GOD_DERIVATION
10. UNKNOWN_TIME_HANDLING

## Per-vector evidence

Pin:
- engine name/version/commit;
- convention profile;
- exact input;
- raw output;
- canonicalized output;
- disagreement paths;
- classification: AGREEMENT / POLICY_DIFFERENCE / DATASET_DIFFERENCE / IMPLEMENTATION_DISAGREEMENT / UNRESOLVED.

## Rejected shortcuts

- MAJORITY_VOTE_IS_TRUTH
- EXTERNAL_ENGINE_AGREEMENT_AUTO_CHANGES_PRODUCTION
- MIX_INTERPRETATION_OUTPUT_INTO_CALCULATION_PARITY
- COMPARE_UNMATCHED_CONVENTIONS_AS_BUG
- UNPINNED_LATEST_ENGINE_VERSION

`externalReplayPending = true`.