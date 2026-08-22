# I56 — Challenge Combination Support Channel Settlement Dependency Evidence Adapter

## Decision

```text
SETTLEMENT_DEPENDENCY_EVIDENCE = RESOLVED
SETTLEMENT_OUTCOME             = UNRESOLVED
```

I56 binds each exact I54 support-source topology item to the unresolved settlement dependency route authorized by I55. It materializes dependency evidence only and does not settle those dependencies.

## Authoritative upstream chain

```text
I54 direct contest topology evidence
-> I55 relation-specific settlement routing methodology
-> I56 settlement dependency evidence
```

I56 accepts I54 only when the topology report is resolved and all activation, persistence, neutralization, destruction, net-effect, force, usefulness/harmfulness, scoring, and classification guards remain closed.

I55 must match the canonical review id and routing-only decision:

```text
RELATION_SPECIFIC_SETTLEMENT_ROUTING_AUTHORIZED_CONTEST_OUTCOME_VERDICT_BLOCKED
```

## Preserved source identity

Every item preserves:

```text
mechanism
current combination relation id / kind
target participant pillar / component / value
support channel kind
source pillar / component / value
contest topology state
touching relation ids
touching relation kinds
touch count
```

No channel or relation count is converted into force magnitude.

## Materialized dependency routes

```text
NO_TRACKED_RELATION_TOUCH
  -> no direct tracked-contest settlement dependency

CURRENT_COMBINATION_PARTICIPATION
  -> CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT

COMPETING_CLASH_TOUCH
  -> CLASH_RELATIVE_FORCE_SETTLEMENT
  -> CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
  -> CLASH_INTERACTION_SETTLEMENT

COMPETING_COMBINATION_TOUCH
  -> COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT

MULTIPLE_TRACKED_RELATION_TOUCHES
  -> TOUCH_SPECIFIC_RELATION_SETTLEMENT
  -> COMPETING_RELATION_SETTLEMENT
```

Every item keeps:

```text
settlementDependenciesResolved = false
```

## Multi-touch authority boundary

I54 emits:

```text
touchingRelationIds[]
touchingRelationKinds[]
```

but does not emit an authoritative relation-id-to-kind pair mapping for multi-touch items.

Therefore I56 deliberately does **not** reconstruct or guess such pairs. `MULTIPLE_TRACKED_RELATION_TOUCHES` remains routed through generic touch-specific settlement plus competing-relation settlement until a later evidence contract supplies stronger identity pairing if needed.

```text
separate id/kind sets != authoritative id-kind pair mapping
```

## Fail-closed conditions

```text
I54_UNRESOLVED_OR_INVALID
I55_METHODOLOGY_NOT_AUTHORIZED
I54_TOPOLOGY_METADATA_MISMATCH
```

Topology metadata validation includes:

- `touchCount == touchingRelationIds.length`
- unique relation ids and kinds
- no-touch means zero ids/kinds
- current-combination participation means exactly one current relation id/kind
- competing clash means exactly one non-current `branch_clash`
- competing combination means exactly one non-current non-clash relation
- multi-touch means more than one relation touch

## Global guards

```text
contestOutcomeVerdictAuthorized              = false
supportChannelActivationVerdictAuthorized    = false
supportChannelPersistenceVerdictAuthorized   = false
supportChannelNeutralizationVerdictAuthorized = false
supportChannelDestructionVerdictAuthorized   = false
supportChannelNetEffectVerdictAuthorized     = false

effectiveMechanismForceVerdict            = not_determined
relationSpecificUsefulnessHarmfulness      = not_determined
classificationAuthorized                   = false
numericScoringAuthorized                   = false
```

Per-item verdicts remain:

```text
supportChannelActive       = not_determined
supportChannelPersisted    = not_determined
supportChannelNeutralized  = not_determined
supportChannelDestroyed    = not_determined
supportChannelNetEffect    = not_resolved
numericScore               = not_assigned
```

## Regression coverage

I56 verifies:

1. no-touch produces no direct contest dependency without ACTIVE/PERSISTED inference,
2. current combination routes to binding/interaction settlement,
3. competing clash routes to relative-force/rescue/interaction settlement,
4. competing combination routes to binding/interaction settlement,
5. multi-touch stays generic without invented id-kind pairing,
6. inconsistent I54 topology metadata fails closed,
7. non-canonical I55 methodology fails closed,
8. deterministic identity and all effect/force/scoring/classification guards remain closed.

## Verification

```text
I56 code HEAD aa80eed2f0e4d8a9aafb209c1cf4402cc99f960c
CI #633        SUCCESS
Test files     107 passed
Tests          571 passed
lint           PASS
typecheck      PASS
build          PASS
```

## Next gate

```text
I26 v18 — Challenge Context Availability with Settlement Dependency Evidence
```

I26 v18 may mark settlement dependency routing evidence as available and refine the broad contest-outcome/persistence-settlement blocker into explicit unresolved routed dependencies. It must not mark any routed dependency resolved, must retain support-channel activation/persistence as unresolved, and must preserve `MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE`, `effectReady = false`, and all scoring/classification guards.
