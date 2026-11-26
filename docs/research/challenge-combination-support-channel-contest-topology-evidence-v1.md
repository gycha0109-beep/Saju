# I54 — Challenge Combination Support Channel Direct Contest Topology Evidence Adapter

## Decision

```text
DIRECT_STRUCTURAL_CONTEST_TOPOLOGY_EVIDENCE = RESOLVED
SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_VERDICT = BLOCKED
CONTEST_OUTCOME_SETTLEMENT = UNRESOLVED
```

I54 materializes only the tracked structural relations that directly touch each I52 support-channel source identity. It independently re-derives the current structural relation graph and does not promote relation presence into activation, persistence, neutralization, destruction, or net-effect verdicts.

## Authoritative identity chain

I54 requires:

```text
resolved StructuralPillarInput
resolved I39 condition evidence
resolved I52 support-channel evidence bound to that exact I39 report
canonical I53 direct-contest-routing methodology review
```

Current structural relations are recomputed with:

```text
deriveStructuralRelationCandidates(pillars)
```

A support source is matched by exact:

```text
source pillar
source component
source value
target participant identity
support channel kind
current combination relation id
mechanism
```

`year:stem` and `year:branch` are distinct identities. Pillar-only matching is not accepted.

## Topology states

```text
NO_TRACKED_RELATION_TOUCH
CURRENT_COMBINATION_PARTICIPATION
COMPETING_CLASH_TOUCH
COMPETING_COMBINATION_TOUCH
MULTIPLE_TRACKED_RELATION_TOUCHES
```

For each source the adapter preserves descriptive metadata only:

```text
touchingRelationIds
touchingRelationKinds
touchCount
```

`touchCount` is not a force magnitude or score.

## Fail-closed conditions

```text
PILLARS_UNRESOLVED
I39_UNRESOLVED_OR_MISALIGNED
I52_UNRESOLVED_OR_MISALIGNED
I53_METHODOLOGY_NOT_AUTHORIZED
SUPPORT_SOURCE_IDENTITY_MISMATCH
CURRENT_COMBINATION_IDENTITY_MISMATCH
```

Stale I52 evidence or a mutated support-source pillar/component identity cannot refine the current graph.

## Explicit non-equivalences

```text
NO_TRACKED_RELATION_TOUCH          != ACTIVE / PERSISTED
CURRENT_COMBINATION_PARTICIPATION != BOUND / NEUTRALIZED
COMPETING_CLASH_TOUCH              != BROKEN / DESTROYED
COMPETING_COMBINATION_TOUCH        != BOUND / NEUTRALIZED
MULTIPLE_TRACKED_RELATION_TOUCHES  != fixed precedence
relation touch count               != force magnitude
```

## Guards

```text
contestTopologyEvidenceAvailable                 = true
supportChannelActivationVerdictAuthorized        = false
supportChannelPersistenceVerdictAuthorized       = false
supportChannelNeutralizationVerdictAuthorized    = false
supportChannelDestructionVerdictAuthorized       = false
supportChannelNetEffectVerdictAuthorized         = false
effectiveMechanismForceVerdict                   = not_determined
relationSpecificUsefulnessHarmfulness             = not_determined
classificationAuthorized                          = false
numericScoringAuthorized                          = false
```

Every emitted item likewise keeps:

```text
supportChannelActive       = not_determined
supportChannelPersisted    = not_determined
supportChannelNeutralized  = not_determined
supportChannelDestroyed    = not_determined
supportChannelNetEffect    = not_resolved
numericScore               = not_assigned
```

## Regression coverage

The I54 test suite verifies:

1. current-combination participation routing,
2. competing clash routing,
3. competing combination routing,
4. multiple tracked touches without precedence,
5. no-touch routing without ACTIVE/PERSISTED promotion,
6. stale I52 fail-close,
7. support source identity tamper fail-close,
8. current combination identity drift fail-close,
9. deterministic global guards.

## Verification

```text
I54 code HEAD c86af33c2029f53a4ee7b0c8bbacd3c92ea2d47a
CI #626        SUCCESS
Test files     104 passed
Tests          552 passed
lint           PASS
typecheck      PASS
build          PASS
```

## Next gate

```text
I26 v17 — Challenge Context Availability with Support-Channel Contest Topology
```

I26 v17 may record directional support topology and direct structural contest topology as available substrate. It must keep support-channel activation/persistence and contest-outcome/persistence settlement unresolved, preserve `MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE`, and keep every effect/scoring/classification guard closed.
