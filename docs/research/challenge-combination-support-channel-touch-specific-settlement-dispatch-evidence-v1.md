# I63 — Challenge Combination Support Channel Touch-Specific Settlement Dispatch Evidence Adapter

## Decision

```text
TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE = AVAILABLE
PAIR_ORDER / AGGREGATION / PRECEDENCE         = BLOCKED
SETTLEMENT_OUTCOMES                           = UNRESOLVED
```

I63 consumes resolved I61 relation-id/kind pair evidence and the canonical I62 dispatch methodology. It materializes the I62 dependency route for each exact I61 relation pair while preserving the containing mechanism, current-combination identity, target participant, support channel, and support-source identity.

## Per-pair materialization

Each dispatched relation preserves:

```text
relationId
relationKind
isCurrentCombinationRelation
dispatchClass
routedDependencies[]
precedenceWithinMultiTouch = not_determined
settlementOutcome          = not_determined
```

Examples:

```text
competing branch_clash
-> CLASH_RELATIVE_FORCE_SETTLEMENT
-> CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
-> CLASH_INTERACTION_SETTLEMENT

competing branch_six_combination
-> COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

## Fail-closed states

```text
I61_UNRESOLVED_OR_INVALID
I62_METHODOLOGY_NOT_AUTHORIZED
DISPATCH_MATERIALIZATION_MISMATCH
```

I63 verifies that I61 remains fail-closed and that I62 is the canonical methodology. Every materialized dispatch must preserve the exact relation id/kind/current-combination flag from the corresponding I61 pair.

## Multi-touch boundary

```text
allRelationPairsDispatched = true
```

means every exact pair has an explicit next dependency family. It does not mean those dependencies are resolved.

```text
all pairs dispatched != current-chart substrate verified for each dispatched route
all pairs dispatched != settlement outcomes resolved
all pairs dispatched != cross-relation precedence known
```

## Hard guards

```text
pairOrderSignificanceAuthorized            = false
multiTouchAggregationAuthorized            = false
crossRelationPrecedenceAuthorized           = false
settlementOutcomeVerdictAuthorized          = false
supportChannelActivationVerdictAuthorized   = false
supportChannelPersistenceVerdictAuthorized  = false
supportChannelNeutralizationVerdictAuthorized = false
supportChannelDestructionVerdictAuthorized  = false
supportChannelNetEffectVerdictAuthorized    = false
effectiveMechanismForceVerdict              = not_determined
relationSpecificUsefulnessHarmfulness       = not_determined
classificationAuthorized                     = false
numericScoringAuthorized                     = false
```

Per item:

```text
anySettlementOutcomeResolved = false
supportChannelActive          = not_determined
supportChannelPersisted       = not_determined
supportChannelNeutralized     = not_determined
supportChannelDestroyed       = not_determined
supportChannelNetEffect       = not_resolved
numericScore                  = not_assigned
```

## Verification

```text
I63 HEAD       4e576045690424603e25578b1d68a1e4989c85e4
CI #667        SUCCESS
Test files     118 passed
Tests          638 passed
lint           PASS
typecheck      PASS
build          PASS
```

Dedicated I63 suite: 6/6 PASS.

The earlier I62 docs run #664 was cancelled by later branch pushes; CI #667 verifies the branch tree containing the I62 closeout document together with I63 implementation and tests.

## Next gate

```text
I26 v22 — Challenge Context Availability with Touch-Specific Settlement Dispatch Evidence
```

v22 may remove only the former touch-specific dispatch-methodology blocker where aligned I63 evidence exists. It must replace that blocker with a narrower statement that each dispatched relation still requires current-chart relation-specific settlement substrate verification and/or settlement outcome resolution. Competing-relation precedence and support-channel activation/persistence remain independent unresolved blockers.
