# I61 — Challenge Combination Support Channel Relation Identity Pair Evidence Adapter

## Decision

```text
RELATION_ID_KIND_PAIR_EVIDENCE = AVAILABLE
PAIR_RECONSTRUCTION_FROM_I54_SEPARATE_ARRAYS = NOT USED
TOUCH_SPECIFIC_SETTLEMENT_DISPATCH = NOT AUTHORIZED
CROSS_RELATION_PRECEDENCE = NOT AUTHORIZED
SETTLEMENT_OUTCOMES = UNRESOLVED
```

I61 resolves only the structural identity-pairing substrate gap that remained for multi-touch support sources after I54/I56/I60.

## Method

I61 does not zip or infer pairs from:

```text
I54.touchingRelationIds[]
I54.touchingRelationKinds[]
```

Instead it independently recomputes `deriveStructuralRelationCandidates(pillars)` and selects every relation touching the exact support-source identity:

```text
source pillar + component + value
```

It emits authoritative pairs:

```text
{ relationId, relationKind, isCurrentCombinationRelation }
```

only when independently recomputed touches agree with I54's existing id set, kind set, count, topology state, current-combination identity, and source identity.

## Fail-closed states

```text
PILLARS_UNRESOLVED
I54_UNRESOLVED_OR_INVALID
CURRENT_COMBINATION_IDENTITY_MISMATCH
SUPPORT_SOURCE_IDENTITY_MISMATCH
I54_TOUCH_METADATA_MISMATCH
```

## Multi-touch boundary

For `MULTIPLE_TRACKED_RELATION_TOUCHES`, I61 can now preserve each exact relation id↔kind pair without inventing array-position correspondence.

```text
relation pair known != relation precedence known
relation pair known != touch-specific settlement dispatched
relation pair known != settlement outcome
```

## Hard guards

```text
pairReconstructionFromSeparateI54ArraysUsed = false
touchSpecificSettlementDispatchAuthorized    = false
crossRelationPrecedenceAuthorized             = false
contestOutcomeVerdictAuthorized               = false
supportChannelActivationVerdictAuthorized     = false
supportChannelPersistenceVerdictAuthorized    = false
supportChannelNeutralizationVerdictAuthorized = false
supportChannelDestructionVerdictAuthorized    = false
supportChannelNetEffectVerdictAuthorized      = false
effectiveMechanismForceVerdict                = not_determined
relationSpecificUsefulnessHarmfulness         = not_determined
classificationAuthorized                       = false
numericScoringAuthorized                       = false
```

Per relation pair:

```text
precedence        = not_determined
settlementOutcome = not_determined
```

## Verification

```text
I61 final HEAD 32d3fe2b93a6908b9f274e4111069c756bce20c1
CI #654         SUCCESS
Test files      115 passed
Tests           619 passed
lint             PASS
typecheck        PASS
build            PASS
```

Dedicated I61 suite: 6/6 PASS.

## Next gate

```text
I26 v21 — Challenge Context Availability with Relation Identity Pair Evidence
```

v21 may remove only the prior multi-touch relation identity-pairing blocker when aligned I61 evidence proves the exact pairs. It must preserve competing-relation precedence, relation-specific settlement outcomes, support activation/persistence, effective mechanism force, scoring, and classification as unresolved/unauthorized.
