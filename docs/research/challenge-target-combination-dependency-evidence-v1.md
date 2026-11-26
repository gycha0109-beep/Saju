# I35 Challenge Target Combination Dependency Evidence Adapter v1

## Purpose

I35 implements only the combination dependency substrate authorized by I34 for challenge targets already routed by I31.

It does **not** emit a transformed element, effective bureau, binding/preservation result, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification.

## Identity chain

```text
resolved pillars
  -> I29 challenge-target intrinsic root evidence
  -> I31 challenge-target relation participation evidence
  -> I35 challenge-target combination dependency evidence
```

I35 independently recomputes the expected I29 and I31 identities and fails closed on cross-material inputs.

Fail-closed states:

```text
PILLARS_UNRESOLVED
ROOT_EVIDENCE_UNRESOLVED
ROOT_EVIDENCE_MISALIGNED
RELATION_EVIDENCE_UNRESOLVED
RELATION_EVIDENCE_MISALIGNED
```

## Supported subjects

I35 preserves two combination subjects separately:

```text
VISIBLE_TARGET_STEM
TARGET_ROOT_CANDIDATE
```

Supported routed relation kinds:

```text
stem_five_combination
branch_six_combination
branch_three_combination
```

Hidden-only target presence is not promoted into a root-effect subject.

## Structural dependency evidence

For each routed combination candidate I35 preserves:

```text
mechanism / target element
subject kind / position / value
root candidate class where applicable
relation ID / kind / arity
relation source IDs
relation participants
month branch / command element
target-element seasonal phase
participant seasonal phases
visible same-element stem positions
visible resource stem positions
same-element branch positions
resource branch positions
competing tracked relation topology
```

Other structural relations sharing one or more participant positions are recorded only as competing topology:

```text
precedence    = not_determined
relationEffect = not_determined
```

## Structural completion is not transformation

For every I35 candidate:

```text
structuralMembershipComplete = true
transformationEstablished    = false
transformationTargetElement  = not_emitted
```

For a three-combination this means only that all three tracked membership branches are structurally present in the candidate relation. It does not establish an effective or transformed bureau.

## Seasonal/support context

Seasonal phases and same-element/resource positions are attached as named dependency context only.

```text
supportInterferenceEffect            = not_resolved
completeSupportInterferenceModelAvailable = false
numericWeight                        = not_assigned
```

No support or interference position is summed, weighted, or converted into transformation force.

## Hard guards

```text
transformationTargetElementEmissionAuthorized = false
completeSupportInterferenceModelAvailable      = false
hiddenOnlyTargetCombinationRootEffectAuthorized= false
earthTargetCombinationRootEffectAuthorized     = false
combinationEffectVerdict                       = not_determined
targetPostRelationRootState                    = not_determined
effectiveMechanismForceVerdict                 = not_determined
relationSpecificUsefulnessHarmfulness           = not_determined
classificationAuthorized                       = false
numericScoringAuthorized                       = false
```

## Verification

```text
I35 code HEAD: 73357abf04932b59fc1a94b376bfedb4bcf08896
CI run:        #504
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        74 files / 398 tests PASS
build:         PASS
```

The dedicated I35 regression suite contains 5 passing tests covering:

- visible target-stem five-combination dependency evidence,
- branch six-combination dependency evidence,
- full structural three-combination membership without transformation,
- competing clash topology without precedence/effect,
- cross-material I29/I31 rejection,
- transformation/root-state/effective-force/scoring/classification guards,
- deterministic report identity.

## Conclusion

```text
COMBINATION_DEPENDENCY_SUBSTRATE = IMPLEMENTED
TRANSFORMATION                   = NOT ESTABLISHED
TRANSFORMATION_TARGET_ELEMENT    = NOT EMITTED
COMBINATION_EFFECT               = NOT DETERMINED
TARGET_POST_RELATION_ROOT_STATE  = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE        = NOT DETERMINED
STRENGTH_CLASSIFICATION          = NOT AUTHORIZED
NUMERIC_SCORING                  = NOT AUTHORIZED
```
