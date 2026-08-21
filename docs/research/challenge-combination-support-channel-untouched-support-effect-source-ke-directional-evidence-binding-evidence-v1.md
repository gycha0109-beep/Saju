# I111 — Source 克 Directional Evidence Binding Evidence

## Result

`STRICT CLOSED`

## Verified authority

```text
code/test/export HEAD = 3084bfdc296699933f0b32f1bf239b4158fd75ee
CI                    = #877 SUCCESS
Test Files            = 169 passed
Tests                 = 998 passed
I111                   = 8/8 passed
lint/typecheck/test/build = PASS
```

## Decision

```text
CURRENT_CHART_KE_COMPONENT_DIRECTIONAL_BINDINGS_MATERIALIZED_INTERACTION_ELIGIBILITY_AND_EFFECT_UNRESOLVED
```

I111 materializes research-only `克` directional vocabulary bindings on a fully resolved current chart using the exact I110 component and cycle contract.

## Current-chart substrate

The adapter independently verifies:

```text
visible stem element == canonical getHeavenlyStemElement(stem)
hidden stem array     == canonical getHiddenStemMembership(branch)
```

Any unavailable, ambiguous, or inconsistent pillar/hidden-stem substrate fails closed with no bindings.

Contracted participant scopes remain:

```text
VISIBLE_STEM
EARTHLY_BRANCH_HIDDEN_STEM
```

A raw earthly-branch element label is never materialized as a direct `克` participant.

## Binding semantics

Each emitted binding preserves:

```text
source component id / pillar position / component scope / stem / element
target component id / pillar position / component scope / stem / element
relation = 克
exact I110 cycle edge matched = true
source-to-target direction verified = true
```

The binding is only a source-vocabulary directional relation candidate.

```text
countsAsDirectionalVocabularyBinding = true
countsAsDamageOrEffectSettlement      = false
```

## Critical unresolved boundary

I111 does **not** establish that every element-control pair is an effective interaction pair.

Every binding retains:

```text
interactionEligibility = not_determined
positionalForceVerdict = not_determined
damageOutcome          = not_determined
damageMagnitude        = not_determined
settlementOutcome      = not_determined
```

Therefore:

```text
directional 克 binding != effective interaction
directional 克 binding != positional force
directional 克 binding != damage outcome
directional 克 binding != damage magnitude
directional 克 binding != settlement outcome
```

A zero-binding result on a fully resolved chart also cannot prove no damage or no effective interaction outside the contracted directional evidence domain.

## Preserved guards

```text
rawEarthlyBranchElementUsedAsParticipant = false
reversedDirectionInferenceUsed           = false
transitiveControlInferenceUsed           = false
generalKnowledgeFallbackUsed             = false
nonCyclePairMaterialized                 = false
interactionEligibilityResolvedByThisGate = false
positionalForceResolvedByThisGate        = false
damageOutcomeResolvedByThisGate          = false
damageMagnitudeResolvedByThisGate        = false
settlementOutcomeResolvedByThisGate      = false
sourceActivationVerdictAuthorized        = false
sourcePersistenceVerdictAuthorized       = false
sourceEffectiveSupportVerdictAuthorized  = false
relativeForceVerdictAuthorized           = false
clashWinnerVerdictAuthorized             = false
rescueEffectAuthorized                   = false
clashSettlementAuthorized                = false
crossRelationPrecedenceAuthorized        = false
noTrackedRelationTouchSemanticsRemainUnchanged = true
structuralRelationKindMutationPerformed  = false
methodologyDefinitionCreatedByThisGate   = false
ruleDefinitionCreatedByThisGate          = false
registrySnapshotMutatedByThisGate        = false
targetPostRelationRootState              = not_determined
effectiveMechanismForceVerdict           = not_determined
relationSpecificUsefulnessHarmfulness    = not_determined
classificationAuthorized                 = false
numericScoringAuthorized                 = false
```

## Next gate

```text
I112 — Untouched Support Effect Source 克 Directional Binding Promotion Readiness Review
```

I112 may decide whether I111 is sufficient to replace the old `克` vocabulary-binding absence at the directional-evidence layer. It must keep effective interaction eligibility and positional applicability unresolved unless separate authority establishes them, and must not promote potential directional bindings into damage/effect/settlement outcomes.
