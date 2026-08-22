# I62 — Challenge Combination Support Channel Touch-Specific Settlement Dispatch Methodology Review

## Decision

```text
PAIR_KIND_DISPATCH = AUTHORIZED
CROSS_RELATION_PRECEDENCE = BLOCKED
SETTLEMENT_OUTCOME = BLOCKED
```

Canonical decision:

```text
PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED
```

I62 defines only how an exact authoritative I61 relation-id/kind pair may be routed into an already-existing I55 settlement dependency family. It introduces no new clash, rescue, binding, neutralization, destruction, activation, persistence, precedence, force, scoring, or classification rule.

## Exact pair requirement

I62 operates only on an I61 pair that already carries:

```text
relationId
relationKind
isCurrentCombinationRelation
precedence = not_determined
settlementOutcome = not_determined
```

I62 does not reconstruct or infer relation identity from I54's separate `touchingRelationIds[]` and `touchingRelationKinds[]` metadata.

## Dispatch mapping

### Current combination pair

For:

```text
isCurrentCombinationRelation = true
relationKind in {
  stem_five_combination,
  branch_six_combination,
  branch_three_combination
}
```

route to:

```text
CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

### Competing clash pair

For:

```text
isCurrentCombinationRelation = false
relationKind = branch_clash
```

route to:

```text
CLASH_RELATIVE_FORCE_SETTLEMENT
CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
CLASH_INTERACTION_SETTLEMENT
```

### Competing combination pair

For:

```text
isCurrentCombinationRelation = false
relationKind in {
  stem_five_combination,
  branch_six_combination,
  branch_three_combination
}
```

route to:

```text
COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

## Multi-touch boundary

Dispatch is pair-local and unordered.

```text
multiple dispatched pairs != ranked relations
multiple dispatched pairs != fixed precedence
multiple dispatched pairs != aggregate settlement
```

Every routed pair preserves:

```text
precedenceWithinMultiTouch = not_determined
settlementOutcome          = not_determined
```

## Hard guards

```text
exactI61PairRequired                              = true
touchSpecificSettlementDispatchAuthorized          = true
pairDispatchMayReuseI55DependencyVocabulary         = true
crossRelationPrecedenceAuthorized                   = false
multiTouchAggregationAuthorized                     = false
pairOrderSignificanceAuthorized                     = false
dispatchToSettlementOutcomeAuthorized               = false
clashDispatchToRelativeForceVerdictAuthorized       = false
clashDispatchToRescueEffectAuthorized               = false
combinationDispatchToBindingVerdictAuthorized       = false
combinationDispatchToNeutralizationVerdictAuthorized = false
dispatchToSupportChannelActivationAuthorized        = false
dispatchToSupportChannelPersistenceAuthorized       = false
dispatchToSupportChannelDestructionAuthorized       = false
dispatchToSupportChannelNetEffectAuthorized         = false
dispatchToEffectiveMechanismForceAuthorized         = false
dispatchToUsefulnessHarmfulnessAuthorized           = false
classificationAuthorized                            = false
numericScoringAuthorized                            = false
```

## Non-equivalences

```text
pair dispatch != settlement outcome
clash dispatch != clash winner / relative-force verdict
clash rescue route != rescue effectiveness
combination dispatch != BOUND / NEUTRALIZED
pair dispatch != support channel ACTIVE / PERSISTED / DESTROYED
pair dispatch != effective mechanism force
```

## Verification

```text
I62 HEAD       00e05416c22afe32a5c82879d9641cc63e5c83df
CI #663        SUCCESS
Test files     117 passed
Tests          632 passed
lint           PASS
typecheck      PASS
build          PASS
```

Dedicated I62 suite: 8/8 PASS.

## Next gate

```text
I63 — Challenge Combination Support Channel Touch-Specific Settlement Dispatch Evidence Adapter
```

I63 may materialize the I62 route for each exact I61 relation pair, preserving the containing mechanism/current-combination/support-source identity. It must not order pairs, aggregate them, resolve any routed dependency, or emit support activation/persistence, destruction, net effect, effective mechanism force, numeric scoring, or strength classification.
