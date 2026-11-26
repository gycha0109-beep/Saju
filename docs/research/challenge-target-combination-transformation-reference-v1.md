# I37 Challenge Target Combination Transformation Reference Adapter v1

## Purpose

I37 attaches only the traditional transformation-reference metadata explicitly authorized by I36 to already-resolved I35 challenge-target combination candidates.

It does **not** establish an actual challenge-target transformation state.

## Upstream contract

I37 requires:

- resolved I35 combination dependency evidence,
- an I36 methodology review whose decision is `REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED`,
- I36 authorization for stem-pair and full three-combination reference metadata,
- continued prohibition on challenge transformation-state emission.

If I35 is unresolved, I37 emits no fabricated reference items.

## Emitted reference kinds

### 1. Stem five-combination

For a tracked stem-five combination, I37 may attach the I36 traditional mapping, for example:

```text
丙 + 辛 -> 水
```

but only as:

```text
referenceKind = STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE
referenceScope = DAY_STEM_SCOPED_REFERENCE_ONLY
referenceDirectChallengeTransformationUseAuthorized = false
```

Therefore:

```text
traditionalReferenceElement != actual transformed challenge element
```

### 2. Full branch three-combination

For a structurally complete tracked three-combination, I37 may attach the traditional bureau reference, for example:

```text
寅 + 午 + 戌 -> 火局
```

with:

```text
referenceKind = THREE_COMBINATION_BUREAU_REFERENCE
referenceScope = FULL_THREE_BRANCH_BUREAU_REFERENCE_ONLY
fullThreeBranchMembershipRequired = true
fullThreeBranchMembershipObserved = true
```

This still does not establish an effective bureau or any post-relation subject replacement.

### 3. Branch six-combination

I36 did not authorize one stable transformed-element mapping contract for six-combination relations.

I37 therefore emits:

```text
referenceKind = SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED
referenceScope = UNRESOLVED
traditionalReferenceElement = not emitted
```

No popular secondary convention is silently imported.

## Hard guards

Every emitted reference item preserves:

```text
referenceDirectChallengeTransformationUseAuthorized = false
currentTransformationEstablished                     = false
currentTransformationTargetElement                   = not_emitted
bindingState                                         = not_determined
postCombinationSubjectIdentity                       = not_determined
targetPostRelationRootState                          = not_determined
effectiveMechanismForceVerdict                       = not_determined
relationSpecificUsefulnessHarmfulness                = not_determined
numericScore                                         = not_assigned
```

Report-level guards remain:

```text
challengeTransformationStateEmissionAuthorized = false
transformationTargetElementEmissionAuthorized   = false
combinationBindingStateEmissionAuthorized        = false
postCombinationSubjectIdentityPolicyResolved     = false
classificationAuthorized                        = false
numericScoringAuthorized                        = false
```

## Non-equivalences

```text
traditional stem mapping reference      != challenge-target transformation
full three-combination membership       != effective bureau
three-combination bureau reference      != post-combination subject identity
six-combination participation           != transformed-element mapping
reference metadata available            != transformation policy resolved
reference metadata available            != effective mechanism force
```

## Verification

```text
I37 code HEAD: d3fcd7306f230a1bb9c510e810702f70227dbafa
CI run:        #516
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        77 files / 413 tests PASS
build:         PASS
```

The dedicated I37 regression suite contains 5 passing tests covering:

- a stem-five traditional element reference with day-stem-only scope,
- a complete three-combination bureau reference without effective-bureau promotion,
- unresolved six-combination transformed-element mapping,
- unresolved-I35 fail-closed behavior,
- deterministic report identity and downstream transformation/effect/scoring/classification guards.

## Conclusion

```text
I37_REFERENCE_METADATA                  = RESOLVED
ACTUAL_CHALLENGE_TRANSFORMATION_STATE   = NOT AUTHORIZED
STEM_REFERENCE_DIRECT_CHALLENGE_USE     = NOT AUTHORIZED
THREE_COMBINATION_EFFECTIVE_BUREAU      = NOT ESTABLISHED
SIX_COMBINATION_REFERENCE_MAPPING       = UNRESOLVED
POST_COMBINATION_SUBJECT_IDENTITY       = NOT DETERMINED
TARGET_POST_RELATION_ROOT_STATE         = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE               = NOT DETERMINED
```

## Next gate

```text
I26 v7 — Challenge Context Availability with I37 Transformation Reference Metadata
```

I26 v7 may use aligned I37 reference metadata only to refine unresolved combination-transformation dependencies. It must not upgrade `MECHANISM_EFFECTIVE_FORCE_CONTEXT` beyond `PARTIAL_SUBSTRATE`, and it must not treat a traditional mapping reference as an actual transformed challenge state.
