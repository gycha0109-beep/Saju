# I47 Challenge Root Three-Combination Clash Placement & Settlement Evidence v1

## Purpose

I47 applies the I46 source-bounded clash-placement methodology to aligned I45 `STRUCTURAL_BUREAU_FORMED` evidence and current resolved pillars.

## Inputs

```text
resolved pillars
I45 structural bureau-formation evidence
I46 clash break/damage settlement methodology
```

I47 recomputes the structural relation graph and rejects stale formation/clash identities.

## Placement model

For each tracked branch clash touching a formed three-combination, I47 identifies:

- the bureau participant directly involved in the clash,
- the external clash counterpart,
- the min/max pillar span occupied by the three bureau participants,
- whether the counterpart is embedded inside that span,
- whether it is immediately adjacent to the directly clashed bureau participant.

The resulting classes are:

```text
EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT
OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
OUTSIDE_BUREAU_SPAN_NOT_TIGHT
```

No distance score or force weight is assigned.

## Settlement

Only the source-bounded direct-break topology may emit a deterministic post-interaction state:

```text
EMBEDDED + TIGHT
-> settlement = BREAK_AUTHORIZED
-> postInteractionBureauState = BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

The two source-contextual classes remain:

```text
EMBEDDED + NON-TIGHT -> CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED
OUTSIDE  + TIGHT     -> CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED
```

Outside/non-tight and no-clash cases emit no intactness result from I46/I47.

## Multiple clash guard

```text
multipleClashAggregationAuthorized = false
```

I47 emits the deterministic item-level bureau state only when exactly one direct source-bounded break is present. It does not add clash weights or combine multiple clash scores.

## Fail-closed alignment

I47 requires:

- all four resolved pillars,
- I45 status `RESOLVED_STRUCTURAL_BUREAU_FORMATION`,
- I45 branch-three relation and participant positions to match the current structural relation graph,
- each tracked I45 `branch_clash` relation ID to resolve to a current branch clash,
- exactly one bureau participant and one external counterpart for each tracked clash,
- the exact fail-closed I46 methodology contract.

Stale/misaligned formation or clash evidence emits no settlement items.

## Hard guards

```text
genericPostInteractionBureauStateEmissionAuthorized = false
damagedBureauMagnitudeClassificationAuthorized = false
multipleClashAggregationAuthorized = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

`BROKEN_BY_TIGHT_EMBEDDED_CLASH` is a bureau state only. It is not root destruction, effective force, usefulness/harmfulness, or a strength label.

## Verification

```text
I47 code/regression HEAD: 2e5102d976faa35d6cc6626adeaca5b36754cbbe
CI run:                   #584
result:                   SUCCESS

lint:                     PASS
typecheck:                PASS
Vitest:                   93 files / 493 tests PASS
build:                    PASS
```

Dedicated I47 suite: 5/5 PASS, covering all four placement classes, no-clash behavior, stale-I45 fail-close, deterministic identity, and no-force/no-scoring guards.

## Next integration gate

```text
I26 v13 — Challenge Context Availability with Clash Placement Settlement
```

v13 should mark the direct embedded+tight break route as resolved for the affected bureau item, refine the two contextual placement classes to an explicit intact-versus-damaged settlement dependency, and leave all generic effective-force, post-relation root, seasonal/support, usefulness/harmfulness, score, and classifier guards closed.
