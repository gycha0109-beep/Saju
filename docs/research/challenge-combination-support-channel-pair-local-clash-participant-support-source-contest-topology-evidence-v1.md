# I72 — Challenge Combination Support Channel Pair-Local Clash Participant Support-Source Contest Topology Evidence

## Status

STRICT CLOSED / EXACT CURRENT-CHART SUPPORT-SOURCE IDENTITY + RELATION-TOUCH PAIRS MATERIALIZED / EFFECT VERDICTS BLOCKED

## Authority

- Code HEAD: `e921bd77b685101c6878a3eb6992173871cf9743`
- CI #712: SUCCESS
- 129 test files / 702 tests
- dedicated I72 suite: 6/6 PASS
- lint/typecheck/test/build: PASS
- I71 closeout `382f65c3...` CI #709: SUCCESS

## Evidence boundary

I72 consumes:

- all four resolved pillars,
- exact resolved I68 pair-local clash comparative evidence,
- the exact aligned canonical I20c support-context report,
- canonical I71 methodology.

For each exact I68 clash participant, I72 reuses I20c source-position metadata, reads the exact source stem/branch value from the resolved pillars, deduplicates identical source identities while preserving all attached support-signal provenance, then independently recomputes structural relation candidates.

## Materialized source identity

```text
participant role
participant pillar + branch
source pillar
source component (stem | branch)
source exact value
support-signal provenance[]
```

## Materialized contest topology

For each source:

```text
NO_TRACKED_RELATION_TOUCH
EVALUATED_CLASH_PARTICIPATION
OTHER_CLASH_TOUCH
COMBINATION_TOUCH
MULTIPLE_TRACKED_RELATION_TOUCHES
```

Every touch is emitted as an authoritative recomputed pair:

```text
relationId
relationKind
isEvaluatedClashRelation
```

No id-kind pairing is reconstructed from separate metadata arrays.

## Fail-closed alignment

I72 rejects:

- unresolved pillars,
- non-canonical I71 methodology,
- unresolved or guard-violating I68/I20c inputs,
- an I68 evaluated clash not independently reproduced from the pillars,
- I68 participant/support signals that do not exactly match I20c participant identity,
- I20c signal labels that disagree with their underlying source-position fields.

## Strict non-equivalences

```text
support-source identity known     != support source active
relation touch pair known         != relation outcome
NO_TRACKED_RELATION_TOUCH         != ACTIVE / PERSISTED
EVALUATED_CLASH_PARTICIPATION     != DESTROYED
OTHER_CLASH_TOUCH                 != DESTROYED
COMBINATION_TOUCH                 != BOUND / NEUTRALIZED
MULTIPLE_TRACKED_RELATION_TOUCHES != fixed precedence
source count / touch count        != support magnitude
```

## Guards

```text
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
clashWinnerVerdictAuthorized = false
rescueEffectAuthorized = false
clashSettlementAuthorized = false
crossRelationPrecedenceAuthorized = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

Source-level fields remain:

```text
sourceActive = not_determined
sourcePersisted = not_determined
sourceNeutralized = not_determined
sourceDestroyed = not_determined
effectiveSupportEffect = not_resolved
relativeForceVerdict = not_determined
numericWeight = not_assigned
```

## Next gate

The next gate must audit the settlement dependency graph for each source-local topology state before any activation/persistence or effective-support semantics are introduced.

In particular, `EVALUATED_CLASH_PARTICIPATION` can create a recursive dependency: resolving the evaluated clash relative force may depend on effective support whose persistence itself depends on settlement of that same clash. Such self-dependency must be identified and governed explicitly rather than hidden inside an effect formula.