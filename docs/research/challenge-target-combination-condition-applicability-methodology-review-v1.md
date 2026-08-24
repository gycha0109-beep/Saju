# I38 Challenge Target Combination Condition Applicability Methodology Review v1

## Purpose

I38 determines which source-backed combination/transformation condition dimensions may be reused for challenge targets after I36/I37 established that traditional mappings are reference metadata only.

The result is **partial condition applicability**, not a transformation verdict.

## Decision

```text
PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED
```

I38 authorizes a future challenge-specific **condition evidence adapter** while keeping every transformation/binding/effective-bureau result contract blocked.

## Stem transformation conditions

`三命通會` explicitly states:

```text
大凡化氣只取日干而言
```

and then conditions the traditional stem transformation discussion on month/time vitality and interfering stems.

Therefore the following dimensions may be reused only as candidate substrate:

```text
STEM_SEASONAL_COMMAND          -> REUSE_AS_CANDIDATE_SUBSTRATE
STEM_SUPPORT_INTERFERENCE      -> REUSE_AS_CANDIDATE_SUBSTRATE
STEM_COMPETING_STEM_TOPOLOGY  -> REUSE_AS_CANDIDATE_SUBSTRATE
```

But the result contracts remain blocked:

```text
STEM_TRUE_TRANSFORMATION_RESULT        -> DO_NOT_REUSE_RESULT_CONTRACT
STEM_NON_TRANSFORMATION_BINDING_RESULT -> DO_NOT_REUSE_RESULT_CONTRACT
```

`滴天髓闡微` distinguishes true transformation from `合而不化` and shows that surrounding season/root/support/competition can matter. Its descriptions of non-transformation as binding or lingering remain embedded in day-master/use-god interpretation and are not challenge-target binding verdicts.

## Three-combination conditions

`三命通會` states that when one member of a three-combination is missing, it cannot be treated as `三合化局`.

Therefore:

```text
THREE_COMBINATION_FULL_MEMBERSHIP = REUSE_AS_NECESSARY_PREREQUISITE
```

However full membership alone is not sufficient for an effective bureau.

`滴天髓闡微` additionally treats structural placement as relevant: clash against a combination may damage it depending on placement, tightly connected combinations are distinguished from separated relations, and heavenly-stem lead-out may matter to whether the combined qi is usable.

I38 therefore authorizes only candidate evidence dimensions:

```text
THREE_COMBINATION_CLASH_TOPOLOGY      -> REUSE_AS_CANDIDATE_SUBSTRATE
THREE_COMBINATION_ADJACENCY_SPACING   -> REUSE_AS_CANDIDATE_SUBSTRATE
THREE_COMBINATION_LEAD_OUT_CONTEXT    -> REUSE_AS_CANDIDATE_SUBSTRATE
```

while keeping:

```text
THREE_COMBINATION_EFFECTIVE_BUREAU_RESULT -> DO_NOT_REUSE_RESULT_CONTRACT
```

## Six-combination source nuance

`選擇紀要` contains mapping-like references:

```text
子丑 -> 土
寅亥 -> 木
卯戌 -> 火
辰酉 -> 金
巳申 -> 水
午未 -> 日/月
```

This changes the earlier question from “is there any mapping-like source?” to the more precise issue: **is there one complete, uniform, Saju challenge-specific transformed-element convention?**

I38 answers no.

Reasons:

- `午未` is not presented as one transformed element,
- the source is a selection/calendar manual context,
- no complete challenge-target result methodology is established by the table.

Therefore:

```text
sixCombinationMappingLikeReferenceExists                    = true
sixCombinationCompleteUniformTransformationConventionResolved = false
sixCombinationSelectionContextDirectSajuChallengeUseAuthorized = false
sixCombinationTransformationVerdictAuthorized                 = false
```

and the mapping-like source remains:

```text
REFERENCE_ONLY_SCOPE_MISMATCH
```

## Authorized next implementation scope

I38 authorizes only a challenge-specific condition evidence adapter that may materialize:

- stem seasonal-command evidence,
- stem support/interference location evidence,
- competing-relation topology,
- exact three-branch membership,
- clash topology touching the three-combination,
- adjacency/spacing evidence,
- heavenly-stem lead-out evidence.

None of these may be promoted into a transformation result.

## Hard guards

```text
stemTrueTransformationVerdictReuseAuthorized       = false
stemNonTransformationBindingVerdictReuseAuthorized = false
threeCombinationFullMembershipSufficientForEffectiveBureau = false
threeCombinationEffectiveBureauVerdictAuthorized   = false
sixCombinationTransformationVerdictAuthorized       = false
challengeTransformationStateEmissionAuthorized      = false
combinationBindingStateEmissionAuthorized            = false
postCombinationSubjectIdentityPolicyResolved         = false
targetPostRelationRootState                          = not_determined
effectiveMechanismForceVerdict                       = not_determined
relationSpecificUsefulnessHarmfulness                = not_determined
classificationAuthorized                             = false
numericScoringAuthorized                             = false
```

## Non-equivalences

```text
seasonal condition observed          != true transformation
support/interference observed        != transformation effect resolved
competing topology observed          != precedence resolved
合而不化 source description          != challenge binding verdict
three branches complete              != effective bureau
clash topology observed              != bureau broken/preserved
adjacency observed                   != bureau effective
lead-out stem observed               != bureau effective
six-combination mapping-like source  != adopted transformation convention
```

## Verification

```text
I38 code HEAD: 63d8bc66dea5437192713f21ce20ae935bbb1a52
CI run:        #524
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        79 files / 423 tests PASS
build:         PASS
```

The dedicated I38 regression suite contains 5 passing tests covering:

- reusable stem condition dimensions versus blocked result contracts,
- full three-combination membership as necessary but not sufficient,
- clash/adjacency/lead-out candidate dimensions,
- mapping-like but incomplete/scope-mismatched six-combination reference,
- challenge-specific condition-adapter authorization with downstream guards,
- deterministic methodology identity and explicit source inventory.

## Conclusion

```text
CONDITION_DIMENSION_REUSE              = PARTIALLY AUTHORIZED
DAY_MASTER_TRANSFORMATION_RESULT_REUSE = NOT AUTHORIZED
NON_TRANSFORMATION_BINDING_REUSE       = NOT AUTHORIZED
THREE_COMBINATION_EFFECTIVE_BUREAU     = NOT AUTHORIZED
SIX_COMBINATION_UNIFORM_CONVENTION     = UNRESOLVED
CHALLENGE_CONDITION_EVIDENCE_ADAPTER   = AUTHORIZED
ACTUAL_TRANSFORMATION_STATE            = NOT AUTHORIZED
EFFECTIVE_MECHANISM_FORCE              = NOT DETERMINED
```

## Next gate

```text
I39 — Challenge Target Combination Condition Evidence Adapter
```

I39 may materialize only the condition dimensions authorized above. It must preserve source/subject identity and may not emit true transformation, binding, effective bureau, post-combination subject replacement, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, or classification.
