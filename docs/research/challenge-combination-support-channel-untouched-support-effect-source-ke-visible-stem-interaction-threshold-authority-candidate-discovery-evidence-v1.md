# I120 — Source 克 Visible-Stem Interaction Threshold Authority Candidate Discovery Evidence

## Status

STRICT CLOSED

## Exact verified implementation

- code/test/export HEAD: `c1a070056e75f1897fa8fb394b7232096c78761b`
- CI: `#916` — SUCCESS
- verification: 178 test files / 1070 tests
- I120 tests: 8/8
- lint/typecheck/test/build: PASS

## Decision

`NO_SINGLE_CANDIDATE_WITH_ALL_SIX_I118_REQUIRED_SEMANTIC_LOCATORS_VERIFIED_THRESHOLD_AUTHORITY_NOT_REGISTERED`

## Purpose

I120 performs governed external authority discovery under the I119 single-candidate/full-six-requirement contract.

It does not evaluate requirement satisfaction, acquire authority, or infer a visible-stem interaction threshold.

## Discovery contract preserved

```text
targetSourceTerm = 克
targetScope = VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY
discoveryMode = SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY
```

A candidate may proceed only when one exact normalized source exposes relevant reproducible semantic locators for all six I118 requirements.

Cross-source completion remains forbidden.

## Candidate 1 — existing I107 source reinspection

Source:

```text
陈园
《邵伟华四柱预测学入门》
广州出版社, 1995
ISBN 9787805922515
```

Relevant inspected visible-stem text remains centered on:

```text
两干相克
邻干力大
隔干次之
远干无力
```

and scoped exceptions such as mediation, combination, and counter-control conditions that can make a nominal 克 relation not treated as 克.

The existing source remains insufficient for I118 binary-threshold authority because it does not explicitly provide all of:

```text
EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS
QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION
WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS
```

In particular, literal `无力` is present but its semantic boundary is not explicitly defined as no interaction, ineffective interaction, negligible force, zero effect, or another state.

Therefore:

```text
registrationAcceptedUnderI119 = false
existingI107CandidatePromoted = false
```

## Candidate 2 — 韦千里《千里命稿》 / 《命学讲义》

Inspected research copy:

```text
韦千里
《千里命稿（命学讲义）》
1935 historical work
web-PDF reproduction inspected 2026-08-22
section: 第一部分 命学讲义上集 / 第十九节 补充篇 / 干克之区别
PDF page: 67
```

This candidate is materially stronger for the binary-interaction question.

The same inspected `干克之区别` section separately contains semantics equivalent to:

```text
克力较轻
地位愈远，克力愈轻
似克而非克
庚甲不克
仍作克论
地位远隔，不能相克
```

This provides exact research-relevant locators for five I118 requirements:

```text
EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS
VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY
QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION
CONTEXT_AND_EXCEPTION_CONDITIONS
INDEPENDENT_NORMATIVE_PROVENANCE
```

The candidate therefore demonstrates an important distinction:

```text
lighter 克 force != automatically no 克
不能相克 = separately stated non-克 condition in this source
```

However, full-text inspection did not verify an explicit visible-stem `无力` semantic-boundary locator in this same candidate.

Missing requirement:

```text
WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS
```

Therefore:

```text
verifiedRelevantLocatorCount = 5
allSixRequiredSemanticLocatorsVerified = false
registrationAcceptedUnderI119 = false
weiQianliCandidatePromoted = false
```

## Why the two candidates may not be combined

It would be tempting to map:

```text
陈园: 远干无力
```

to:

```text
韦千里: 地位远隔，不能相克
```

and infer:

```text
无力 = 不能相克
```

I119 explicitly forbids that move.

The two phrases come from different authority candidates. Combining them to manufacture the missing semantic boundary would be cross-candidate normative synthesis.

Therefore:

```text
crossCandidateCompositionPerformed = false
crossCandidateCompositionAuthorized = false
partialCandidatesMayBeCombinedToCloseGap = false
qualitativeOrderingMayCountAsBinaryThreshold = false
```

## Discovery result

```text
externalDiscoveryPerformed = true
inspectedCandidateCount = 2
registeredCandidateCount = 0
candidateRegistrationPerformedByThisGate = false
candidateRequirementCoverageEvaluatedByThisGate = false
candidateSatisfiesAllSixRequirements = not_evaluated
noFullSixSemanticLocatorCandidateVerified = true
missingWuLiBoundaryRemainsPrimaryDiscoveryDeficit = true
```

This is a scoped negative discovery result for the inspected corpus. It does not assert that no qualifying authority exists elsewhere.

## Authority guards

```text
searchSnippetMayCountAsAuthorityEvidence = false
modelSynthesisMayCountAsAuthorityEvidence = false
generalKnowledgeMayCountAsAuthorityEvidence = false
numericCalibrationMayCountAsNormativeAuthority = false
noCandidateFoundMayBeConvertedToDefaultRule = false
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
effectiveInteractionSetResolved = false
thresholdRuleCreatedByThisGate = false
damageEvaluationAuthorized = false
i98KeDamageVocabularyEvaluationResolved = false
i98ResearchMethodologyMaterializationAuthorized = false
```

Separate hidden-stem blocker remains:

```text
SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

Global guards remain closed:

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

No production classifier, numeric score, or production interpretation authority is created.

## Current visible-stem blocker

`SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED`

The discovery frontier is now narrower: the strongest inspected independent candidate exposes five relevant semantic loci, while the explicit same-candidate `无力` boundary remains missing.

## Next gate

`UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW`

I121 may freeze a targeted authority-discovery contract specifically for the missing `WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS` requirement while preserving the I119 rule that one candidate must ultimately support all six requirements. It must not equate `无力` with `不能相克` across sources, compose partial candidates, invent a threshold, introduce numeric weighting, or change hidden-stem, settlement, classifier, scoring, or production interpretation authority.
