# R089 — cross-engine calculation disagreement audit

Date: 2026-09-20  
Issue: #1038  
Status: COMPARATOR MANIFEST READY / COMPARATOR COMMITS SNAPSHOTTED / EXTERNAL REPLAY PENDING

## Governed baseline

- Saju repository baseline reviewed at: `86c043553430ed7fc9f6bd90e2e68953ad24d879`
- production calculation policy: `myeonghwa-production-civil-midnight-v1`
- engine: `manseryeok@2.0.0`
- adapter: `myeonghwa-manseryeok-adapter@0.1.0`
- production timezone: `Asia/Seoul`
- production day boundary: midnight
- production true-solar correction: OFF

This baseline is authoritative for the product calculation path. External engines remain comparison instruments only.

## External comparator snapshot

The candidate repositories were rechecked before clean rebuild and the then-current default-branch heads were snapshotted:

| Comparator | Repository | Default branch | Snapshot commit | Authority |
|---|---|---|---|---|
| K_SAJU | bunhine0452/k-saju | main | `7185fa5be80166d705e83741bf82b06fa98ce6e9` | COMPARATOR_ONLY |
| BAZI_CORE | Eastern-Sunrise/bazi-core | master | `ede8eb34620dbe31f072c34659be4077178e6cda` | COMPARATOR_ONLY |
| TYME_BAZI_MCP | Zojekin/tyme-bazi-mcp | main | `27ce0b997f4a1371cce419f311749bebbcb8b373` | COMPARATOR_ONLY |

These commits freeze candidate source for a later audit. They do not certify correctness, policy equivalence, package versions, or suitability for Production.

## Normalization rule

Do not compare raw outputs until conventions are matched. At minimum compare:
- calendar input semantics;
- timezone/civil-time authority;
- day-boundary convention;
- solar-term boundary convention;
- true-solar/longitude/equation-of-time policy;
- unknown-time semantics;
- sex/direction inputs for luck-cycle calculation.

A mismatch caused by different declared policies is `POLICY_DIFFERENCE`, not `ENGINE_BUG`. A dataset/ephemeris difference is not automatically an implementation bug either.

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
- baseline repository commit;
- engine/comparator name, version if exposed, and exact commit/source snapshot;
- convention profile;
- exact input;
- raw output;
- canonicalized output;
- disagreement paths;
- classification: AGREEMENT / POLICY_DIFFERENCE / DATASET_DIFFERENCE / IMPLEMENTATION_DISAGREEMENT / UNRESOLVED.

If a comparator does not expose a trustworthy semantic version, record `VERSION_UNAVAILABLE`; do not infer a version from repository age or commit order.

## Rejected shortcuts

- MAJORITY_VOTE_IS_TRUTH
- EXTERNAL_ENGINE_AGREEMENT_AUTO_CHANGES_PRODUCTION
- MIX_INTERPRETATION_OUTPUT_INTO_CALCULATION_PARITY
- COMPARE_UNMATCHED_CONVENTIONS_AS_BUG
- DATASET_DIFFERENCE_IS_AUTOMATIC_ENGINE_BUG
- UNPINNED_LATEST_ENGINE_VERSION
- INFER_VERSION_FROM_COMMIT_OR_DATE

`externalReplayPending = true`. Snapshotting comparator commits prepares reproducibility; it does not constitute replay or validation.
