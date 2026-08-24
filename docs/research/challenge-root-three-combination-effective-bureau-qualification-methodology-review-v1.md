# I44 Challenge Root Three-Combination Effective-Bureau Qualification Methodology Review v1

## Purpose

I44 resolves whether a complete branch three-combination (`三合`) may emit a source-bounded bureau-formation state for challenge-root analysis, while keeping post-interaction effectiveness separate.

## Decision

```text
FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED
```

## Source-bounded formation rule

The adopted source basis supports the following structural rule:

```text
full three-branch membership -> structural bureau formation
missing one branch            -> no full-three bureau formation
```

Traditional bureau identity remains:

```text
申子辰 -> 水局
巳酉丑 -> 金局
亥卯未 -> 木局
寅午戌 -> 火局
```

Accordingly:

```text
fullThreeMembershipRequiredForTraditionalBureau = true
missingOneBranchBlocksFullThreeBureauFormation = true
fullThreeMembershipAuthorizesStructuralBureauFormation = true
structuralBureauFormationStateEmissionAuthorized = true
traditionalBureauElementReferenceMayBeUsedForFormationIdentity = true
```

## Structural formation is not post-interaction effectiveness

I44 explicitly separates formation from the later interaction state:

```text
structuralBureauFormationEqualsPostInteractionEffectiveBureau = false
postInteractionBureauStateEmissionAuthorized = false
postInteractionEffectiveBureauVerdictAuthorized = false
```

A formed bureau can still be affected by clash or competing relations. Formation therefore does not imply intactness, dominance, final root state, or effective mechanism force.

## Full-three adjacency and lead-out are not formation prerequisites

The source audit found adjacency and visible-stem lead-out conditions directly in two-branch partial-combination discussion, not as mandatory prerequisites for an already complete three-branch bureau.

Therefore:

```text
fullThreeAdjacencyRequiredForFormation = false
fullThreeVisibleLeadOutRequiredForFormation = false
twoBranchAdjacencyRuleTransferToFullThreeAuthorized = false
twoBranchLeadOutRuleTransferToFullThreeAuthorized = false
```

Observed spacing and lead-out may remain contextual evidence, but they do not block full-three structural formation.

## Clash remains a post-formation settlement problem

The source basis also supports that clash may break or damage a formed bureau and that proximity can change the interpretation.

```text
clashCanBreakOrDamageBureau = true
clashProximityCanChangeBureauDamageInterpretation = true
deterministicClashBreakDamageSettlementPolicyResolved = false
```

Thus:

```text
clash exists != bureau automatically broken
structural bureau formed != post-interaction bureau intact
```

## Seasonal and support context

Seasonal-command and support/interference context are not structural formation prerequisites:

```text
seasonalCommandRequiredForStructuralBureauFormation = false
supportInterferenceRequiredForStructuralBureauFormation = false
```

Their effect on challenge force remains unresolved:

```text
seasonalCommandEffectOnChallengeForceResolved = false
supportInterferenceEffectOnChallengeForceResolved = false
competingRelationInteractionSettlementResolved = false
```

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
full three membership != final post-interaction bureau state
structural bureau formation != effective mechanism force
spacing / lead-out observation != full-three formation prerequisite
clash topology != deterministic breakage / damage magnitude
traditional bureau element != subject replacement
```

## Verification

```text
I44 code HEAD: f74e8449fc7515cf9943508abbad910d1b909b8c
CI run:        #567
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        89 files / 473 tests PASS
build:         PASS
```

The dedicated I44 suite contains 5 passing tests covering full-membership formation authorization, missing-branch blocking, adjacency/lead-out scope correction, clash settlement blocking, and downstream fail-closed guards.

## Conclusion

```text
FULL-THREE STRUCTURAL BUREAU FORMATION = AUTHORIZED
ADJACENCY AS FORMATION PREREQUISITE    = BLOCKED
VISIBLE LEAD-OUT AS FORMATION PREREQ   = BLOCKED
POST-INTERACTION BUREAU STATE          = UNRESOLVED
CLASH BREAK / DAMAGE SETTLEMENT        = UNRESOLVED
EFFECTIVE MECHANISM FORCE              = UNRESOLVED
```

## Next implementation gate

```text
I45 — Challenge Root Three-Combination Bureau Formation Evidence
```

I45 must materialize only source-bounded structural bureau formation from aligned full-three condition evidence and preserve every post-interaction, effective-force, scoring, and classifier guard.
