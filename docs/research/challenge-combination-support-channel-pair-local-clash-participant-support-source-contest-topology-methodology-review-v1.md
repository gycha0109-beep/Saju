# I71 — Challenge Combination Support Channel Pair-Local Clash Participant Support-Source Contest Topology Methodology Review

## Status

STRICT CLOSED / EXACT SUPPORT-SOURCE IDENTITY + CONTEST TOPOLOGY AUTHORIZED / EFFECT VERDICTS BLOCKED

## Authority

- Code HEAD: `a39d49dda337d389092c32e6d048e91eceadeb42`
- CI #708: SUCCESS
- 128 test files / 696 tests
- dedicated I71 suite: 6/6 PASS
- lint/typecheck/test/build: PASS

## Decision

```text
EXACT_SUPPORT_SOURCE_IDENTITY_AND_CONTEST_TOPOLOGY_AUTHORIZED_EFFECT_VERDICTS_BLOCKED
```

## Source mapping

I20c support-position fields may be converted to exact source identities only with resolved pillars:

```text
SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT -> participant position / stem
EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT    -> externalVisibleSameElementSupportPositions / stem
VISIBLE_RESOURCE_SUPPORT                 -> visibleResourceSupportPositions / stem
ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT   -> additionalSameElementBranchSupportPositions / branch
RESOURCE_BRANCH_SUPPORT                  -> resourceBranchSupportPositions / branch
```

The exact stem/branch value must be read from the resolved pillar fact. It must never be inferred from the qualitative signal label.

## Topology states

```text
NO_TRACKED_RELATION_TOUCH
EVALUATED_CLASH_PARTICIPATION
OTHER_CLASH_TOUCH
COMBINATION_TOUCH
MULTIPLE_TRACKED_RELATION_TOUCHES
```

Relation id-kind pairs must be emitted directly from independently recomputed structural relation candidates matched by exact source pillar/component/value identity.

## Strict boundaries

```text
source identity known                 != effective support
relation touch known                  != damage / neutralization
NO_TRACKED_RELATION_TOUCH             != ACTIVE / PERSISTED
EVALUATED_CLASH_PARTICIPATION         != DESTROYED
OTHER_CLASH_TOUCH                     != DESTROYED
COMBINATION_TOUCH                     != BOUND / NEUTRALIZED
MULTIPLE_TRACKED_RELATION_TOUCHES     != fixed precedence
relation/source multiplicity          != magnitude
```

## Guards

```text
sourceIdentityMayBeInferredFromSignalLabelAlone = false
multiTouchFixedPrecedenceAuthorized = false
relationTouchCountMagnitudeInferenceAuthorized = false
supportSourceCountMagnitudeInferenceAuthorized = false
supportCategoryFixedPrecedenceAuthorized = false
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

## Next gate

I72 may materialize exact current-chart support-source identities and relation-touch pairs for exact I68 clash participants using resolved pillars and aligned I20c evidence.

I72 must not emit activation, persistence, effective support, relative force, clash winner, rescue effect, settlement, scoring, or classification.