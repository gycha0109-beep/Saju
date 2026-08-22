# I46 Challenge Root Three-Combination Clash Break / Damage Settlement Methodology Review v1

## Purpose

I46 audits whether a clash touching an I45 `STRUCTURAL_BUREAU_FORMED` three-combination may receive a deterministic post-formation settlement.

## Decision

```text
TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL
```

## Source-bounded direct break rule

The `方局` discussion in `滴天髓闡微` distinguishes clash placement and proximity. For a complete three-combination, when the extra clash branch is embedded within the bureau arrangement and is tightly adjacent to the bureau participant it directly clashes, the source explicitly treats the bureau as broken.

I46 therefore authorizes exactly:

```text
EMBEDDED_WITHIN_BUREAU_SPAN
+ TIGHT_TO_CLASHED_PARTICIPANT
-> BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

## Contextual cases

The same source does not give one deterministic damage state for:

```text
EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT
OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
```

Instead it requires the assembled bureau and damaged-bureau possibilities to be considered together. I46 therefore preserves:

```text
CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED
```

It does **not** manufacture `DAMAGED` from these topologies.

For:

```text
OUTSIDE_BUREAU_SPAN_NOT_TIGHT
NO_TRACKED_CLASH
```

I46 emits no direct settlement from this rule. Absence of the direct break condition is not proof of an intact bureau.

## Anti-generalization

`三命通會·論沖擊` also states that clash may bring benefit or harm according to context and cannot be judged by one universal rule. I46 therefore rejects:

```text
clash exists -> bureau broken
clash exists -> bureau damaged
no tracked clash -> bureau intact
```

## Authorized placement model

I46 authorizes the next adapter to classify:

```text
EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT
OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
OUTSIDE_BUREAU_SPAN_NOT_TIGHT
NO_TRACKED_CLASH
```

The intended implementation meanings are:

- bureau span: min/max pillar positions occupied by the three bureau participants,
- embedded: clash counterpart position lies inside that span but is not itself one of the bureau participant positions,
- tight: clash counterpart is immediately adjacent in pillar order to the bureau participant it directly clashes.

These are categorical topology rules only. No distance score or force weight is authorized.

## Blocked policies

```text
embeddedNonTightDeterministicDamageVerdictAuthorized = false
outsideTightDeterministicDamageVerdictAuthorized = false
outsideNonTightDeterministicSettlementAuthorized = false
noTrackedClashIntactVerdictAuthorized = false
damagedBureauMagnitudeClassificationAuthorized = false
multipleClashAggregationAuthorized = false
clashForceWeightingAuthorized = false
seasonalOverrideOfTightEmbeddedBreakResolved = false
supportOverrideOfTightEmbeddedBreakResolved = false
genericPostInteractionBureauStateEmissionAuthorized = false
```

Only the tight embedded case may emit a post-interaction bureau state.

## Downstream guards

```text
effectiveMechanismForceVerdict = not_determined
targetPostRelationRootState = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

Bureau breakage does not imply challenge-root destruction, a final root state, effective challenge force, usefulness/harmfulness, or strong/weak classification.

## Verification

```text
I46 code/regression HEAD: 694f03b31099b5355e4a20142e8504ec35ecfe9b
CI run:                   #580
result:                   SUCCESS

lint:                     PASS
typecheck:                PASS
Vitest:                   92 files / 488 tests PASS
build:                    PASS
```

Dedicated I46 suite: 5/5 PASS.

## Next gate

```text
I47 — Challenge Root Three-Combination Clash Placement & Settlement Evidence
```

I47 must consume aligned I45 structural bureau-formation evidence, classify each tracked clash by bureau-span placement and immediate adjacency, emit `BROKEN_BY_TIGHT_EMBEDDED_CLASH` only for the authorized topology, and preserve every other case as contextual or no-direct-settlement evidence.
