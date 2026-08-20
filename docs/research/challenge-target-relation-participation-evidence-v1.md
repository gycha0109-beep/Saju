# I31 Challenge Target Relation Participation Evidence Router v1

## Purpose

I31 materializes which currently tracked structural relations touch challenge target stems and I29 intrinsic root candidates.

It implements only the routing substrate authorized by I30.

It does **not** resolve target intrinsic root quality, target post-relation root state, effective mechanism force, relation-specific usefulness/harmfulness, day-master strength, or numeric scoring.

## Input alignment

I31 consumes:

- resolved four-pillar structural material,
- a resolved I29 challenge-target intrinsic root evidence report.

Before relation routing is accepted, I31 recomputes the expected I29 report from the same pillar material and requires an exact report-ID match.

```text
expected I29 report ID == supplied I29 report ID
```

If the material does not match:

```text
ROOT_EVIDENCE_MISALIGNED
```

This blocks cross-snapshot or cross-fixture evidence mixing.

## Routed relation channels

### 1. Visible target stem channel

I31 maps `visibleTargetStemPositions` to touching:

```text
stem_five_combination
```

For each match it preserves:

```text
target stem position
target stem
relation ID
STEM_FIVE_COMBINATION_EFFECT_REVIEW_REQUIRED
COMBINATION_TRANSFORMATION_CONDITIONS
TARGET_STEM_COMPETING_SUPPORT_INTERFERENCE
SEASONAL_COMMAND_CONTEXT
transformationEstablished = false
relationEffect = not_determined
```

### 2. Intrinsic root-candidate branch channel

Each I29 root candidate is mapped independently to touching:

```text
branch_clash
branch_six_combination
branch_three_combination
```

Clash dependencies remain:

```text
RELATIVE_BRANCH_FORCE
SEASONAL_COMMAND_CONTEXT
EXTERNAL_SUPPORT_RESCUE
```

Combination dependencies remain:

```text
COMBINATION_TRANSFORMATION_CONDITIONS
COMPETING_RELATION_PRECEDENCE
SEASONAL_COMMAND_CONTEXT
```

## Fail-closed states

### No tracked relation

```text
NO_TRACKED_RELATION_CANDIDATE
```

This means only that the current deterministic router found no tracked relation touching that candidate.

It does **not** mean:

```text
root preserved
root unaffected
root strong
```

### Hidden-only target

```text
NO_VISIBLE_TARGET_STEM_ANCHOR
```

No post-relation root state is manufactured.

### Earth target

```text
EARTH_ROOT_CONVENTION_UNRESOLVED
```

Tracked relations may exist, but earth root-state closure remains blocked by the unresolved upstream convention.

### Untracked relation families

The current router remains bounded to:

```text
stem_five_combination
branch_six_combination
branch_clash
branch_three_combination
```

Therefore:

```text
branch punishment = explicitly unresolved
branch harm       = explicitly unresolved
branch break      = explicitly unresolved
```

## Implementation

- `src/research/i31-challenge-target-relation-participation-evidence.ts`
- `src/research/index.ts`
- `test/i31-challenge-target-relation-participation-evidence.test.ts`

## Verification

```text
HEAD:          4e0e6aed928f22a17598efc15a56583fae515d10
CI run number: 480
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        68 files / 368 tests PASS
build:         PASS
```

The I31 regression suite contains 5 passing tests covering:

- separate visible-target-stem and root-candidate branch relation channels,
- tracked clash and stem-combination routing without effect resolution,
- no-tracked-relation state without a preserved-root verdict,
- hidden-only and earth fail-closed boundaries,
- cross-pillar-material I29 misalignment rejection,
- downstream effect/classification/scoring guards and deterministic report identity.

## Result

```text
RELATION_PARTICIPATION_SUBSTRATE             = AVAILABLE FOR TRACKED RELATIONS
TARGET_STEM_COMBINATION_EFFECT               = NOT DETERMINED
ROOT_CANDIDATE_CLASH_EFFECT                  = NOT DETERMINED
ROOT_CANDIDATE_COMBINATION_EFFECT            = NOT DETERMINED
TARGET_POST_RELATION_ROOT_STATE              = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                    = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS     = NOT DETERMINED
UNTRACKED_RELATION_FAMILIES                  = EXPLICITLY UNRESOLVED
STRENGTH_CLASSIFICATION                      = NOT AUTHORIZED
NUMERIC_SCORING                              = NOT AUTHORIZED
```

## Next gate

```text
I26 v4 — Challenge Context Availability with Relation Participation Evidence
```

I26 v4 may enrich `MECHANISM_EFFECTIVE_FORCE_CONTEXT` with aligned I31 routing evidence, but it must preserve `PARTIAL_SUBSTRATE` and keep the target post-relation state unresolved.
