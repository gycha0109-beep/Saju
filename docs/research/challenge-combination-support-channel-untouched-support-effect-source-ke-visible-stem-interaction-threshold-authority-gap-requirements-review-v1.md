# I118 — Source 克 Visible-Stem Interaction Threshold Authority Gap Requirements Review

## Status

STRICT CLOSED

## Exact verified implementation

- code/test/export HEAD: `5dd747bcf41f15fccbd673658e5aef0149af57eb`
- CI: `#907` — SUCCESS
- verification: 176 test files / 1054 tests
- I118 tests: 8/8
- lint/typecheck/test/build: PASS

## Decision

`VISIBLE_STEM_BINARY_INTERACTION_THRESHOLD_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_THRESHOLD_AUTHORIZED`

## Confirmed authority gap

`SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED`

I117 established only qualitative positional force semantics for visible heavenly stems:

```text
邻干 -> 力大
隔干 -> 次之
远干 -> 无力
```

I118 does not reinterpret that ordering as a Boolean interaction rule. Instead, it freezes the authority requirements that a future source candidate must satisfy before binary effective-interaction eligibility may be considered resolved.

## Mandatory authority requirements

Exactly six requirements are frozen:

```text
EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS
VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY
QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION
WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS
CONTEXT_AND_EXCEPTION_CONDITIONS
INDEPENDENT_NORMATIVE_PROVENANCE
```

All six are mandatory and all six remain unsatisfied by the currently registered I107 source for the binary-threshold purpose.

## Authority acceptance boundary

A future candidate must provide normative evidence that directly addresses visible-heavenly-stem binary effective-interaction semantics.

The evidence contract requires:

```text
evidenceMustHaveExactLocator = true
originalOrVerifiedSourceContextRequired = true
explicitVisibleStemScopeRequired = true
explicitBinaryEligibilitySemanticsRequired = true
explicitWuLiBoundarySemanticsRequired = true
explicitExceptionOrContextTreatmentRequired = true
```

The current qualitative source language alone is insufficient.

## Forbidden substitutions

The following may not satisfy the I118 authority contract by themselves:

```text
general knowledge
search snippets
model synthesis
numeric calibration
qualitative positional ordering alone
```

Also:

```text
crossCandidateSynthesisAuthorized = false
multiSourceCompositionPolicyResolved = false
hiddenStemAuthorityMaySubstitute = false
unrelatedClashOrCombinationSettlementAuthorityMaySubstitute = false
```

A multi-source composition policy has not been authorized by this gate.

## Qualitative-force / Boolean-threshold separation

The following non-equivalences remain binding:

```text
relation existence != effective interaction
qualitative positional force != binary interaction eligibility
力大 != automatically eligible
次之 != automatically eligible
无力 != automatically no interaction
无力 != zero damage
slot distance != binary threshold
qualitative ordering != numeric weight
```

Therefore:

```text
wuLiMayNotBePreclassifiedAsNoInteraction = true
liDaMayNotBePreclassifiedAsEligible = true
ciZhiMayNotBePreclassifiedAsEligible = true
qualitativeForceOrderingMayNotSubstituteForBinaryThreshold = true
numericCutoffMayNotBeInvented = true
```

Empirical calibration may test a separately authorized normative rule, but it may not create that normative rule.

## Existing I107 source status

The existing source remains admissible as non-binary visible-stem positional authority:

```text
existingI107SourceMayRemainNonBinaryPositionalAuthority = true
existingI107SourceMayBeAutoPromotedToThresholdAuthority = false
```

Registration or reuse of that source does not close the threshold gap. Any newly registered threshold candidate requires explicit requirement-coverage evaluation before promotion.

## I98 boundary

The visible-stem effective-interaction set is still unresolved:

```text
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
effectiveInteractionSetResolved = false
damageEvaluationAuthorized = false
i98KeDamageVocabularyEvaluationResolved = false
i98ResearchMethodologyMaterializationAuthorized = false
```

No damage outcome or materialized I98 methodology may be inferred from this gate.

## Hidden-stem lane remains separate

`SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

I118 does not resolve hidden-stem interaction eligibility and does not allow hidden-stem authority to substitute for the visible-stem threshold contract.

## Global guards

```text
methodologyDefinitionCreatedByThisGate = false
ruleDefinitionCreatedByThisGate = false
registrySnapshotMutatedByThisGate = false
reviewAttestationCreatedByThisGate = false
structuralRelationKindMutationAuthorized = false
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

`NO_TRACKED_RELATION_TOUCH` semantics remain unchanged.

## Verification note

An intermediate test-only HEAD failed CI #906 during TypeScript fixture compilation because the negative test attempted to assign literal `true` through a `Partial<...>` field whose contract type is literal `false`. The fixture override typing was widened without changing I118 methodology semantics. Exact-head CI #907 then passed the full repository verification suite.

## Next gate

`UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW`

I119 may freeze the governed acquisition/discovery admission contract for authority capable of satisfying the six I118 requirements. It must not perform authority discovery, infer a threshold, introduce numeric weights, compose partial candidates without a separately authorized composition policy, or alter hidden-stem, settlement, scoring, classification, or production interpretation authority.
