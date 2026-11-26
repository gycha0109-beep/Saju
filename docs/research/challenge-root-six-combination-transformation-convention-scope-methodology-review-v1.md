# I43 Challenge Root Six-Combination Transformation Convention Scope Methodology Review v1

## Purpose

I43 closes the question of whether branch six-combination (`六合`) should retain a live transformed-element route for challenge-root post-relation analysis.

The review distinguishes **structural 六合 participation** from a **uniform transformed-element result convention**.

## Decision

```text
UNIFORM_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMED_ELEMENT_ROUTE_BLOCKED
```

## Structural 六合 remains valid

`三命通會` explicitly establishes the six pairings:

```text
子丑
寅亥
卯戌
辰酉
巳申
午未
```

Accordingly:

```text
sixCombinationStructuralPairingSourceResolved = true
sixCombinationStructuralParticipationRemainsValid = true
```

I43 does not remove relation identity, participants, seasonal context, support/interference context, or competing-relation topology already materialized by I31/I35/I39/I41.

## Uniform transformed-element contract is not available

The adopted `三命通會` 六合 section does not provide one uniform transformed-element result contract for all six pairings that can function as a challenge-root post-relation transformation rule.

A separate selection-method source contains mapping-like annotations for five pairings:

```text
子丑 -> 土
寅亥 -> 木
卯戌 -> 火
辰酉 -> 金
巳申 -> 水
```

but its `午未` entry is not a sixth uniform element result; it is annotated as:

```text
午為日，未為月
```

The material is also from a calendrical selection context rather than the Bazi challenge-root result domain.

Therefore:

```text
externalMappingLikeReferenceObserved = true
externalMappingLikeReferenceCompleteUniformElementSet = false
externalMappingLikeReferenceDomainMatchesChallengeRootBazi = false
externalMappingLikeReferenceDirectAdoptionAuthorized = false
```

## Closed transformed-element route

```text
sixCombinationTraditionalReferenceElementEmissionAuthorized = false
sixCombinationChallengeRootTransformationStateEmissionAuthorized = false
sixCombinationChallengeRootTransformationTargetElementAdoptionAuthorized = false
```

The incomplete/cross-domain convention is not promoted into a normative challenge-root transformed-element rule.

## No transformed element is not no effect

I43 explicitly preserves:

```text
sixCombinationNoEffectConclusionAuthorized = false
sixCombinationStructuralInteractionEvidenceStillRelevant = true
sixCombinationInteractionSettlementPolicyStillRequired = true
```

Thus a six-combination may still matter structurally or through interaction/binding/settlement. Only the transformed-element route is closed.

## Hard guards

```text
postCombinationSubjectIdentityPolicyResolved = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

## Non-equivalences

```text
六合 structural pairing != transformed element
mapping-like annotation != normative Bazi challenge-root result contract
transformed-element route blocked != 六合 has no effect
structural interaction evidence != settlement verdict
```

## Verification

```text
I43 code HEAD: e6dca3134bcd2875cf6aef05a978e8ad293b5cd2
CI run:        #559
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        87 files / 463 tests PASS
build:         PASS
```

The dedicated I43 suite contains 5 passing tests covering:

- structural 六合 retention with transformed-element route closure,
- rejection of incomplete cross-domain mapping adoption,
- no-effect inference prevention,
- source-basis separation,
- deterministic downstream fail-closed guards.

## Conclusion

```text
SIX-COMBINATION STRUCTURAL PARTICIPATION = RETAINED
UNIFORM TRANSFORMED-ELEMENT ROUTE         = CLOSED / BLOCKED
BINDING / INTERACTION / SETTLEMENT        = UNRESOLVED
POST-COMBINATION SUBJECT IDENTITY         = UNRESOLVED
EFFECTIVE MECHANISM FORCE                 = UNRESOLVED
```

## Next integration gate

```text
I26 v11 — Challenge Context Availability with Six-Combination Convention Closure
```

I26 v11 should remove the six-combination transformed-element reference and transformation-target dependencies as live unresolved routes, retain the negative closure as an existing capability, and redirect the remaining six-combination effect path to binding/interaction and relation-specific settlement. It must not infer no effect, subject preservation, root preservation, effective force, usefulness/harmfulness, scoring, or classification.
