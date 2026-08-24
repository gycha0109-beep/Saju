# I122 — Source 克 Visible-Stem Interaction Threshold 无力 Boundary Targeted Authority Discovery Evidence

## Status

STRICT CLOSED

## Exact verified implementation

- code/test/export HEAD: `840bf0d81ad8aaef08734ebc93ea752581470b4c`
- CI: `#926` — SUCCESS
- verification: 180 test files / 1086 tests
- I122 tests: 8/8
- lint/typecheck/test/build: PASS

## Decision

`TARGETED_WU_LI_DISCOVERY_FOUND_COMPLEMENTARY_NONCOMPOSABLE_EVIDENCE_NO_SINGLE_SOURCE_FULL_SIX_ADMISSION`

## Targeted discovery result

I122 searched specifically for a source-local visible-heavenly-stem `无力 / 無力` semantic boundary while preserving the I119 single-candidate/full-six contract.

The inspected corpus exposed two complementary evidence shapes:

```text
A. literal 无力 / 無力 is present, but its binary interaction boundary is not explicitly defined
B. an explicit remote-interaction boundary is present, but the required positional 无力 / 無力 literal is absent or used in another context
```

No inspected candidate supplied both shapes plus the remaining I118 loci in the same normalized source.

## Candidate observations

### 1. 陈园 — 《邵伟华四柱预测学入门》

The existing I107 source retains the exact visible-stem positional phrase:

```text
两干相克
邻干力大
隔干次之
远干无力
```

Result:

```text
literalWuLiObserved = true
explicitWuLiSemanticBoundaryObserved = false
registrationAcceptedUnderI119 = false
```

The source does not explicitly define `无力` as no interaction, zero effect, negligible force, or conditional residual interaction.

### 2. 韦千里 — 《千里命稿》

Exact historical work identity was strengthened through the National Library of China mechanical-scan metadata exposed by Wikimedia Commons:

```text
author = 韋千里
publisher = 韋氏命苑
publication = 民國24 [1935]
scan length = 123 pages
provenanceTier = primary
```

The same work remains strong for distinguishing lighter 克 force from explicit non-克 conditions, but targeted reinspection did not verify a same-work `無力` locator connecting those semantics to the I107 literal.

```text
weiQianliSameWorkWuLiLocatorVerified = false
registrationAcceptedUnderI119 = false
```

### 3. 朱祖夏 — 《八字与用神》

The inspected book-attributed reproduction states a conditional remote-interaction boundary equivalent to:

```text
remote restraint is weak because of distance
and normally affects the remote target only when one side is sufficiently strong
```

This is directly relevant to the binary-interaction question.

However:

```text
zhuZuxiaRemoteConditionalBoundaryObserved = true
zhuZuxiaTargetLiteralObservedInRemoteBoundarySection = false
```

The same passage does not define the remote-position boundary with the required literal `无力 / 無力`.

### 4. Practitioner example — `无力遥克`

A visible-stem example using the phrase `无力遥克` was found.

Result:

```text
practitionerRemoteWuLiLiteralObserved = true
practitionerRemoteWuLiBoundaryExplicitlyDefined = false
```

The example demonstrates literal usage but does not provide a general normative definition separating no interaction from weak, ineffective, or context-dependent interaction. It also does not expose a full-six I118 authority set.

## Complementary evidence is not composable authority

The evidence can be summarized as:

```text
陈园 / practitioner material -> target literal exists
韦千里 / 朱祖夏 material     -> explicit interaction/non-interaction boundary evidence exists
```

But I119 and I121 explicitly prohibit manufacturing the missing semantic equivalence by combining candidates.

Therefore:

```text
complementaryEvidenceExistsAcrossCandidates = true
complementaryEvidenceMayBeComposed = false
crossCandidateSemanticEquivalenceAuthorized = false
wuLiMayBeEquatedToBuNengXiangKe = false
wuLiMayBeEquatedToWeakButConditionalInteraction = false
```

No statement such as either of the following is authorized:

```text
无力 = 不能相克
无力 = weak-but-conditionally-active interaction
```

unless one exact source makes that connection itself or a separately governed composition policy is normatively authorized.

## Candidate registration result

```text
inspectedCandidateCount = 4
literalBearingCandidateCount = 2
explicitBoundaryBearingCandidateCount = 2
fullSixCandidateCount = 0
registeredCandidateCount = 0
candidateRegistrationPerformedByThisGate = false
requirementCoverageEvaluatedByThisGate = false
authorityAcquiredByThisGate = false
```

## Verification correction

An intermediate exact-head run, CI `#924`, failed only because the I122 source used the non-existent provenance tier literal `historical_primary`.

Repository `ProvenanceTier` permits:

```text
primary
scholarly_secondary
practitioner_secondary
cross_reference
heuristic
internal
```

The NLC mechanical scan candidate was corrected to canonical `primary`; no evidence interpretation, candidate disposition, authority decision, or blocker changed. Exact-head CI `#926` then passed the full suite.

## Authority guards

```text
searchSnippetMayCountAsAuthorityEvidence = false
modelSynthesisMayCountAsAuthorityEvidence = false
noResultMayCreateDefaultThreshold = false
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
effectiveInteractionSetResolved = false
thresholdRuleCreatedByThisGate = false
damageEvaluationAuthorized = false
i98KeDamageVocabularyEvaluationResolved = false
i98ResearchMethodologyMaterializationAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

Separate hidden-stem blocker remains:

`SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

Primary visible-stem blocker remains:

`SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED`

## Next gate

`UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW`

I123 may evaluate whether the existence of complementary candidate evidence creates any governed basis for cross-candidate composition. It must not perform composition, infer semantic equivalence, relax the I118/I119 full-coverage contract, create a threshold, or authorize classification, scoring, settlement, hidden-stem behavior, or production interpretation.
