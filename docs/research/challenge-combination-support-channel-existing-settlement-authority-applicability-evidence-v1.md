# I58 — Challenge Combination Support Channel Existing Settlement Authority Applicability Evidence Adapter

## Decision

```text
EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE = AVAILABLE
CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION       = NOT PERFORMED
ROUTED_SETTLEMENT_OUTCOME                             = UNRESOLVED
```

I58 binds every exact I56 routed settlement dependency to the canonical I57 applicability classification and authority references while preserving source/target/current-combination identity.

## Identity chain

I58 requires:

```text
I56.status == RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE
I56 settlement/outcome/activation/persistence/net-effect/force/scoring guards remain closed
I57.reviewId == canonical I57 reviewId
I57 decision == EXISTING_RELATION_SPECIFIC_SUBSTRATE_REUSE_AUTHORIZED_GENERIC_SETTLEMENT_RESOLUTION_BLOCKED
```

Every I56 required dependency must map to exactly one I57 applicability item.

## Evidence distinction

I58 explicitly separates:

```text
reusableSubstrateAvailable
!= currentChartSettlementSubstrateVerified
!= settlementOutcomeResolved
```

For every mapped dependency:

```text
currentChartSettlementSubstrateVerified = false
settlementOutcomeResolved               = false
```

Thus methodology-level authority availability cannot be mistaken for chart-specific settlement closure.

## Preserved boundaries

### Narrow I47 bureau authority

```text
BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

remains an exact formed-three-combination bureau state only.

```text
bureau broken != support source destroyed
bureau broken != generic clash settlement
```

### Multi-touch

I58 preserves:

```text
MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT
```

No relation-id/kind pairing is reconstructed from separate I54 sets.

### Competing relations

I58 preserves:

```text
COMPETING_RELATION_PRECEDENCE_UNRESOLVED
```

No clash-over-combination or combination-over-clash precedence is introduced.

## Hard guards

```text
currentChartRelationSpecificSettlementEvidenceVerified = false
anyRoutedSettlementOutcomeResolved                      = false
contestOutcomeVerdictAuthorized                         = false
supportChannelActivationVerdictAuthorized                = false
supportChannelPersistenceVerdictAuthorized               = false
supportChannelNeutralizationVerdictAuthorized            = false
supportChannelDestructionVerdictAuthorized               = false
supportChannelNetEffectVerdictAuthorized                 = false
effectiveMechanismForceVerdict                           = not_determined
relationSpecificUsefulnessHarmfulness                    = not_determined
classificationAuthorized                                 = false
numericScoringAuthorized                                 = false
```

## Verification

Initial CI #640 failed at typecheck because the regression fixture used the non-existent mechanism literal `OUTPUT_CHALLENGE`. The authoritative `ChallengeMechanism` union uses `OUTPUT_LEAKAGE`, `WEALTH_EXPENDITURE_CONTROL`, and `OFFICER_CONTROL_PRESSURE`.

Only the fixture literal was corrected; methodology and implementation semantics were unchanged.

```text
I58 remediated HEAD 35f52dff7332b5fc2d31f730433cdb045ad7f8a6
CI #641              SUCCESS
Test files           110 passed
Tests                589 passed
lint                  PASS
typecheck             PASS
build                 PASS
```

Dedicated I58 suite: 7/7 PASS.

## Next gate

```text
I26 v19 — Challenge Context Availability with Existing Settlement Authority Applicability Evidence
```

I26 v19 should accept I58 only through the exact I56/I57 chain and refine the current routed-settlement blockers by distinguishing methodology-level reusable authority from unresolved chart-specific settlement-substrate verification. It must not remove the separate support-channel activation/persistence blocker or mark any routed settlement outcome resolved.

Expected state remains:

```text
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
effectReady                        = false
methodologyReadyForEffectResolution = false
```
