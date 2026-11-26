# I39 Challenge Target Combination Condition Evidence Adapter v1

## Purpose

I39 materializes only the combination-condition dimensions authorized by I38 while preserving the exact I35 subject/relation identity and aligned I37 reference metadata.

I39 does **not** decide transformation, binding, effective bureau, subject replacement, post-relation root state, or effective mechanism force.

## Inputs and alignment

I39 requires:

- four resolved pillars,
- resolved I35 combination dependency evidence,
- I35 candidates structurally aligned to the current pillars,
- resolved I37 reference metadata bound to the exact I35 report,
- I38 decision `PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED`,
- I38 authorization for a challenge-specific condition evidence adapter,
- all I38 transformation/binding/effective-bureau verdict authorizations remaining false.

Cross-material I35/I37 evidence fails closed.

## Stem condition evidence

For a tracked target-stem five-combination, I39 preserves:

- month branch and command element,
- target-element seasonal phase,
- each participant's same-element/resource stem and branch positions,
- competing tracked relation topology.

The emitted state remains:

```text
conditionEvidenceState          = CANDIDATE_SUBSTRATE_ONLY
transformationConditionVerdict  = not_determined
trueTransformationVerdict       = not_determined
bindingState                    = not_determined
```

No seasonal/support pattern is promoted into `真化` or `合而不化` binding.

## Three-combination condition evidence

For a tracked full branch three-combination, I39 additionally materializes:

```text
fullMembershipNecessary = true
fullMembershipObserved  = true
participantPositions    = exact pillar positions
adjacencyState          = CONTIGUOUS_THREE_SLOTS | SEPARATED_WITH_GAP
clashTopology           = touching tracked branch clashes
traditionalBureauReferenceElement = I37 reference element when available
visibleLeadOutStemPositions      = visible stems matching that reference element
leadOutState                      = presence/absence/reference-unavailable
```

All of these remain candidate substrate.

```text
effectiveBureauVerdict = not_determined
```

Thus:

```text
three branches complete     != effective bureau
contiguous placement        != effective bureau
clash topology present      != bureau broken
lead-out stem present       != bureau effective
```

## Six-combination condition evidence

I39 does not manufacture a six-combination transformation target.

It preserves:

```text
sixCombinationConventionState =
  UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH
```

This explicitly carries forward I38's finding that mapping-like selection-manual references exist but do not form one complete, uniform challenge-target transformation contract.

## Hard guards

Report-level guards:

```text
transformationConditionVerdict                 = not_determined
challengeTransformationStateEmissionAuthorized = false
combinationBindingStateEmissionAuthorized       = false
postCombinationSubjectIdentityPolicyResolved    = false
targetPostRelationRootState                     = not_determined
effectiveMechanismForceVerdict                  = not_determined
relationSpecificUsefulnessHarmfulness           = not_determined
classificationAuthorized                        = false
numericScoringAuthorized                        = false
```

Every item independently preserves the same downstream boundaries.

## Verification

Initial I39 CI:

```text
CI #528 FAILURE
```

Exact cause:

```text
TypeScript exactOptionalPropertyTypes
threeBranchCondition?: ... was inferred as explicit undefined for non-three-combination items
```

No methodology or fixture failure occurred.

Remediation:

- compute the optional three-branch evidence first,
- spread the field only when a concrete value exists.

Final code HEAD:

```text
a76ad6bb0f738e4fb3eb7e56c5df8677614e2c33
```

Final code CI:

```text
CI #529 SUCCESS
lint:      PASS
typecheck: PASS
Vitest:    80 files / 428 tests PASS
build:     PASS
```

The dedicated regression suite contains 5 passing tests covering:

- target-stem seasonal/support/competition substrate,
- contiguous full three-combination plus visible bureau-element lead-out,
- separated three-combination plus touching clash topology,
- explicit unresolved six-combination convention,
- cross-material I37 fail-closed behavior,
- deterministic report identity and all downstream guards.

## Conclusion

```text
CHALLENGE_COMBINATION_CONDITION_EVIDENCE = AVAILABLE
TRANSFORMATION_CONDITION_VERDICT          = NOT DETERMINED
TRUE_TRANSFORMATION                       = NOT DETERMINED
BINDING                                   = NOT DETERMINED
THREE_COMBINATION_EFFECTIVE_BUREAU        = NOT DETERMINED
SIX_COMBINATION_UNIFORM_CONVENTION        = UNRESOLVED
POST_COMBINATION_SUBJECT_IDENTITY         = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                 = NOT DETERMINED
```

## Next gate

```text
I26 v8 — Challenge Context Availability with I39 Condition Evidence
```

I26 v8 may use aligned I39 evidence only to replace generic combination-condition gaps with explicit condition-composition/effect/precedence dependencies. It must keep `MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE` and may not promote any I39 evidence into transformation or effective-bureau state.
