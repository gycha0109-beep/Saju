# I26 v17 — Challenge Context Availability with Support-Channel Contest Topology

## Decision

```text
DIRECTIONAL_SUPPORT_CHANNEL_TOPOLOGY = AVAILABLE
DIRECT_STRUCTURAL_CONTEST_TOPOLOGY   = AVAILABLE
SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE = UNRESOLVED
CONTEST_OUTCOME_PERSISTENCE_SETTLEMENT = UNRESOLVED
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
```

I26 v17 consumes aligned I54 contest-topology evidence and refines the v16 combined support-channel blocker. It does not convert direct relation touch topology into support activation, persistence, neutralization, destruction, net effect, or effective mechanism force.

## Identity closure

v17 accepts I54 only when:

```text
v16.supportChannelTopologyClosureAccepted == true
v16.conditionEvidenceReportId              == I39.reportId
v16.supportChannelEvidenceReportId          == I52.reportId
I54.upstreamI39ReportId                     == I39.reportId
I54.upstreamI52ReportId                     == I52.reportId
I54.upstreamI53ReviewId                     == I53.reviewId
```

The supplied I54 report must also equal deterministic recomputation from the same current pillars, I39, I52, and I53 inputs.

Stale or cross-chart contest evidence therefore cannot refine the current availability graph.

## Capability refinement

For aligned stem-five-combination support-source routes:

```text
challenge-target stem-combination support-channel activation/persistence and competing-interaction settlement
-> challenge-target stem-combination support-channel activation/persistence
-> challenge-target stem-combination support-channel contest outcome/persistence settlement
```

For aligned branch-six / branch-three support-source routes:

```text
challenge-root combination support-channel activation/persistence and competing-interaction settlement
-> challenge-root combination support-channel activation/persistence
-> challenge-root combination support-channel contest outcome/persistence settlement
```

I54 topology is recorded as an existing capability with counts of source routes by topology state. Those counts remain descriptive metadata only.

## Still unresolved

```text
support-channel activation
support-channel persistence
contest outcome / persistence settlement
clash relative-force settlement where touched
clash rescue settlement where applicable
stem-combination binding / interaction effect
six-combination binding / interaction effect
generic competing-relation interaction / settlement
contextual three-combination post-interaction bureau state where applicable
target post-relation root state
effective mechanism force
relation-specific usefulness / harmfulness
challenge effect verdict
```

## Non-equivalences

```text
directional support topology       != support effect
NO_TRACKED_RELATION_TOUCH          != ACTIVE / PERSISTED
CURRENT_COMBINATION_PARTICIPATION != BOUND / NEUTRALIZED
COMPETING_CLASH_TOUCH              != BROKEN / DESTROYED
COMPETING_COMBINATION_TOUCH        != BOUND / NEUTRALIZED
MULTIPLE_TRACKED_RELATION_TOUCHES  != fixed precedence
resolved direct topology           != resolved contest outcome
resolved contest topology          != effective mechanism force
```

## Guards

```text
methodologyReadyForEffectResolution = false
challengeEffectVerdict              = not_determined
relativeForceVerdictAuthorized      = false
classificationAuthorized            = false
numericScoringAuthorized            = false
effectReady                          = false for every mechanism
MECHANISM_EFFECTIVE_FORCE_CONTEXT    = PARTIAL_SUBSTRATE
```

The consumed I54 contract additionally keeps all activation, persistence, neutralization, destruction, and net-support-effect verdict authorizations false.

## Verification

```text
I26 v17 code HEAD 85dda5b4d33055ee8923237842e4e4a62af5bb55
CI #628            SUCCESS
Test files         105 passed
Tests              557 passed
lint                PASS
typecheck           PASS
build               PASS
```

## Next unresolved dependency

```text
I55 — Challenge Combination Support Channel Contest Outcome / Persistence Settlement Methodology Review
```

I55 should audit whether the I54 source-local topology can support any deterministic settlement statement, or whether each touch must remain routed to its underlying relation-specific dependencies: clash relative-force/rescue settlement, combination binding/interaction settlement, and competing-relation settlement. It must not infer `ACTIVE`, `PERSISTED`, `DESTROYED`, `NEUTRALIZED`, force magnitude, usefulness/harmfulness, numeric score, or strong/weak classification merely from topology.
