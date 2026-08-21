# I84 — Challenge Combination Support Channel Untouched Support Effect Additional Authority Requirements Review

## Status

**STRICT CLOSED**

## Decision

`ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED`

## Scope

I84 freezes the minimum acceptance contract for any future authority candidate proposed to close the untouched-support activation/persistence/effective-support gap identified by I83.

I84 does not identify, approve, combine, or synthesize candidate authorities and does not implement an untouched-support effect rule.

## Frozen mandatory requirements

All six requirements are mandatory:

```text
EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE
STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION
SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS
SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT
UNTOUCHED_PERSISTENCE_STATE_SEMANTICS
INDEPENDENT_PROVENANCE_BASIS
```

Each requirement preserves:

```text
mandatory = true
currentCanonicalAuthoritySatisfies = false
futureAuthorityCandidateMustSatisfy = true
silenceOrAbsenceOfContestMaySatisfy = false
supportDirectionAloneMaySatisfy = false
scopedPatternExampleAloneMaySatisfy = false
numericCalibrationMaySubstitute = false
```

## Candidate acceptance boundary

```text
candidateMayPassWithPartialCoverage = false
candidateMayPassBySilence = false
candidateMayPassFromAbsenceOfTrackedContestAlone = false
candidateMayPassFromSupportDirectionAlone = false
candidateMayPassFromScopedPatternExampleAlone = false
candidateMayPassFromNumericCalibration = false
```

Candidate-set composition is deliberately unresolved:

```text
candidateSetCompositionPolicyResolved = false
partialCandidateCompositionAuthorized = false
implicitCrossSourceSynthesisAuthorized = false
```

Therefore multiple partial sources cannot be silently combined into a universal untouched-support rule.

## Preserved guards

```text
newNormativeUntouchedSupportPolicyAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
universalDefaultActiveRuleAuthorized = false
universalDefaultPersistedRuleAuthorized = false
universalDefaultEffectiveSupportRuleAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
crossRelationPrecedenceAuthorized = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

## Next gate

`I85 — Untouched Support Effect Authority Candidate Inventory`

I85 may inventory only existing canonical/registered authority candidates against the six frozen I84 requirements. It must preserve per-source provenance and requirement-level coverage, must not implicitly combine partial candidates, and must not authorize an untouched-support effect rule merely because several sources collectively mention support, stability, or absence of contest.
