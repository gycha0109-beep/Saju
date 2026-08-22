# I60 — Challenge Combination Support Channel Current-Chart Settlement Substrate Verification Evidence Adapter

## Decision

```text
CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE = AVAILABLE
ROUTED_SETTLEMENT_OUTCOMES                                = UNRESOLVED
SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE                    = UNRESOLVED
```

I60 applies the exact I59 verification routes to I58 routed dependency items and may mark a dependency-level chart substrate verified only when the already-closed authority domain and exact source/relation identity align.

## Exact verification routes

### I33 clash substrate

For clash relative-force / rescue / generic clash-context dependencies, I60 requires:

```text
I33.status == RESOLVED_DEPENDENCY_EVIDENCE
same mechanism
exactly one touching relation id
exactly one touching relation kind == branch_clash
source component == branch
I33 clashRelationId == touching relation id
source pillar + branch value == exact I33 clash participant
```

Only then may:

```text
currentChartSettlementSubstrateVerified = true
```

For rescue routing, I60 additionally preserves the exact I33 `rescueTopologyCandidates` count without converting it to rescue effectiveness.

### I35 combination substrate

Current-combination verification requires exact:

```text
mechanism
currentCombinationRelationId
currentCombinationRelationKind
source pillar + component + value participant
```

Competing-combination verification additionally requires a single touching combination relation id/kind that is itself an exact I35 candidate for the same mechanism and source participant.

### I47 narrow bureau context

For `CLASH_INTERACTION_SETTLEMENT`, I33 may verify the generic exact clash substrate. I47 is attached only when:

```text
currentCombinationRelationKind == branch_three_combination
I47 formationRelationId == currentCombinationRelationId
I47 clashRelationId == touching clash relation id
source pillar participates in that exact clash placement
```

Possible annotation:

```text
VERIFIED_BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

remains bureau-local.

```text
narrow bureau break context != support source destroyed
narrow bureau break context != generic settlement outcome
```

### Multi-touch / competing precedence

I60 preserves:

```text
BLOCKED_MULTI_TOUCH_PAIRING
BLOCKED_COMPETING_RELATION_PRECEDENCE
```

No id-kind pair reconstruction or fixed precedence is introduced.

## Evidence semantics

A true flag means only:

```text
currentChartSettlementSubstrateVerified = true
```

It does not mean:

```text
settlementOutcomeResolved
supportChannelActive
supportChannelPersisted
supportChannelNeutralized
supportChannelDestroyed
supportChannelNetEffect resolved
effectiveMechanismForce determined
```

## Global guards

```text
anyRoutedSettlementOutcomeResolved       = false
contestOutcomeVerdictAuthorized          = false
supportChannelActivationVerdictAuthorized = false
supportChannelPersistenceVerdictAuthorized = false
supportChannelNeutralizationVerdictAuthorized = false
supportChannelDestructionVerdictAuthorized = false
supportChannelNetEffectVerdictAuthorized = false
effectiveMechanismForceVerdict           = not_determined
relationSpecificUsefulnessHarmfulness    = not_determined
classificationAuthorized                 = false
numericScoringAuthorized                 = false
```

## Verification

Initial CI #647 failed at typecheck because the first regression fixtures used three obsolete enum literals from older research vocabulary. The production I60 implementation and methodology semantics were unchanged. Fixtures were replaced with contract-focused current-type evidence fixtures.

```text
I60 remediated HEAD 13f03705d9fa2395042da395173d3939baf2e18c
CI #648              SUCCESS
Test files           113 passed
Tests                608 passed
lint                  PASS
typecheck             PASS
build                 PASS
```

Dedicated I60 suite: 7/7 PASS.

## Next gate

```text
I26 v20 — Challenge Context Availability with Current-Chart Settlement Substrate Verification
```

I26 v20 may refine chart-substrate-verification blockers when aligned I60 evidence verifies the exact dependency substrate. It must replace such a blocker with an explicit settlement-outcome-unresolved blocker rather than remove the dependency entirely.

Expected semantics:

```text
chart-specific substrate verified != settlement outcome resolved
support-channel activation/persistence remains unresolved
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
effectReady                        = false
classificationAuthorized           = false
numericScoringAuthorized           = false
```
