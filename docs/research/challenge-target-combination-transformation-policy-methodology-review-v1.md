# I36 Challenge Target Combination Transformation Policy Methodology Review v1

## Purpose

I36 audits whether source-documented transformation mappings may be exposed after I35 has already materialized challenge-target combination dependency context.

The review separates **traditional reference mappings** from **actual challenge-target transformation state**.

## Primary-source findings

### 1. Stem five-combination transformation is explicitly day-stem scoped

`三命通會` states that `化氣` is taken with the `日干` and its combining counterpart. The same section records the traditional pair mappings:

```text
甲己 -> 土
乙庚 -> 金
丙辛 -> 水
丁壬 -> 木
戊癸 -> 火
```

It also attaches month/time vitality and interfering-stem conditions.

Therefore the mapping is source-documented, but the result contract is not directly reusable for a non-day-master challenge-target stem.

I36 decision:

```text
stemPairTraditionalReferenceEmissionAuthorized        = true
stemPairReferenceDirectChallengeTransformationUseAuthorized = false
stemTransformationDayStemScopeExplicit                = true
challengeTransformationStateEmissionAuthorized        = false
```

A pair mapping may be surfaced only as:

```text
DAY_STEM_SCOPED_REFERENCE_ONLY
```

### 2. Combination and transformation are distinct states

`滴天髓` / `滴天髓闡微` separately discuss true transformation and `合而不化`, and require month-command and surrounding context.

Therefore:

```text
combination exists != transformation
```

and no binding/disappearance/preservation state is emitted by I36.

### 3. Full three-combination bureau mappings are source-documented

`三命通會` records:

```text
申子辰 -> 水局
巳酉丑 -> 金局
亥卯未 -> 木局
寅午戌 -> 火局
```

and explicitly states that if one of the three branches is missing it cannot be treated as a transformed three-combination bureau.

The full structural set is therefore required before the traditional bureau element may be referenced.

However `滴天髓闡微` further records that clash, spacing, and whether the qi is led out can affect bureau force or disruption.

I36 therefore keeps:

```text
threeCombinationTraditionalBureauReferenceEmissionAuthorized = true
threeCombinationFullMembershipRequired                        = true
threeCombinationFullMembershipEstablishesEffectiveBureau       = false
```

### 4. Six-combination transformed element remains unresolved

The `支元六合` section establishes the six relation pairs, but the current source audit did not yield one sufficiently explicit, consistent transformed-element result contract suitable for challenge-target emission.

I36 intentionally does not import a popular convention.

```text
sixCombinationTraditionalTransformedElementMappingResolved = false
sixCombinationTransformationTargetElementEmissionAuthorized = false
```

## Authorized references

### Stem pair references

```text
甲己 -> 土  [DAY_STEM_SCOPED_REFERENCE_ONLY]
乙庚 -> 金  [DAY_STEM_SCOPED_REFERENCE_ONLY]
丙辛 -> 水  [DAY_STEM_SCOPED_REFERENCE_ONLY]
丁壬 -> 木  [DAY_STEM_SCOPED_REFERENCE_ONLY]
戊癸 -> 火  [DAY_STEM_SCOPED_REFERENCE_ONLY]
```

### Full three-combination references

```text
申子辰 -> 水局
巳酉丑 -> 金局
亥卯未 -> 木局
寅午戌 -> 火局
```

These references do not establish a transformed challenge state.

## Hard guards

```text
challengeTransformationStateEmissionAuthorized = false
combinationBindingStateEmissionAuthorized       = false
postCombinationSubjectIdentityPolicyResolved    = false
targetPostRelationRootState                     = not_determined
effectiveMechanismForceVerdict                  = not_determined
relationSpecificUsefulnessHarmfulness            = not_determined
classificationAuthorized                        = false
numericScoringAuthorized                        = false
```

## Verification

```text
I36 code HEAD: bf4196570d6a4e5cfb63af64a2d1182c35c6669c
CI run:        #512
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        76 files / 408 tests PASS
build:         PASS
```

The dedicated I36 regression suite contains 5 passing tests covering:

- all five traditional stem-pair reference mappings,
- day-stem scope limitation,
- required month/time and interfering-stem dependency context,
- all four full three-combination bureau references,
- full-membership-required but effective-bureau-blocked behavior,
- unresolved six-combination transformed-element mapping,
- downstream force/effect/scoring/classification guards,
- deterministic review identity.

## Conclusion

```text
TRADITIONAL_MAPPING_REFERENCE              = PARTIALLY AUTHORIZED
ACTUAL_CHALLENGE_TRANSFORMATION_STATE       = NOT AUTHORIZED
STEM_REFERENCE_DIRECT_USE                   = NOT AUTHORIZED
THREE_COMBINATION_EFFECTIVE_BUREAU          = NOT ESTABLISHED
SIX_COMBINATION_TRANSFORMED_ELEMENT_MAPPING = UNRESOLVED
TARGET_POST_RELATION_ROOT_STATE             = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                   = NOT DETERMINED
```

## Next gate

```text
I37 — Challenge Target Combination Transformation Reference Adapter
```

I37 may attach only the I36-authorized reference metadata to aligned I35 candidates. It must not establish transformation, binding, post-combination subject replacement, post-relation root state, effective force, usefulness/harmfulness, scoring, or classification.
