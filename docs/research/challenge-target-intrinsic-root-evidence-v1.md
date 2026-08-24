# I29 Challenge Target Intrinsic Root Evidence Adapter v1

## Purpose

I29 implements the candidate-evidence adapter authorized by I28 for the target element of output, wealth, and officer/control challenge mechanisms.

The adapter is intentionally narrower than a root-quality resolver. It answers only whether source-bounded intrinsic root **candidate evidence** can be attached to a visibly manifested target-element heavenly stem.

It does **not** determine target root quality, post-relation root state, effective mechanism force, usefulness/harmfulness, day-master strength, or numeric magnitude.

## Upstream contract

I29 consumes the resolved structural target evidence produced by I27.

For every challenge mechanism I27 provides:

```text
targetElement
visibleStemPositions
branchMainElementPositions
hiddenMembershipPositions
```

I29 uses `targetElement` and `visibleStemPositions` as the anchor boundary and derives root-location candidates from the resolved pillar branches.

## I28 methodology constraints implemented

### Visible target-stem anchor

A challenge target begins as a relation-derived element, not automatically as a manifested stem.

Therefore:

```text
visibleTargetStemPositions.length === 0
=> NO_VISIBLE_TARGET_STEM_ANCHOR
=> rootCandidates = []
```

Branch-main or hidden-stem target presence without a visible target-element heavenly stem remains structural evidence only.

I29 never promotes hidden-only presence to root quality.

### Challenge-specific candidate namespace

I29 does not reuse the I18C day-master claim contract.

Its candidate labels are challenge-specific:

```text
target_birth_lu_wang_root_candidate
target_storage_residual_root_candidate
target_earth_root_class_unresolved
```

The report explicitly preserves:

```text
directI18CClaimReuse = false
```

### Non-earth locator adaptation

For non-earth target elements with a visible target-stem anchor, I29 adapts the source-bounded branch locations reviewed in I18C/I28:

```text
木: 亥 寅 卯
火: 寅 巳 午
金: 巳 申 酉
水: 申 亥 子
```

A branch is emitted as a candidate only when its hidden-stem membership actually contains the target element.

Storage branches `辰 戌 丑 未` that contain the target element may emit:

```text
target_storage_residual_root_candidate
```

These are intrinsic candidate locations only. No magnitude or final quality is assigned.

### Earth remains unresolved

When the target element is earth and a visible earth stem is present, matching branch locations may be retained as structural candidates, but their class is always:

```text
target_earth_root_class_unresolved
```

The report keeps:

```text
earthRootConventionResolved = false
```

## Evidence states

I29 distinguishes four states:

```text
NO_VISIBLE_TARGET_STEM_ANCHOR
NON_EARTH_ROOT_CANDIDATE_EVIDENCE
VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE
EARTH_ROOT_CLASS_UNRESOLVED
```

`VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE` is deliberately not called `rootless`, `weak`, or any equivalent verdict. It means only that no candidate matched the source-bounded locator contract implemented in this gate.

## Candidate evidence shape

Each emitted candidate preserves:

```text
branchPosition
branch
candidateClass
structuralBasis = hidden_stem_membership_and_source_bounded_branch_locator
relationEffect  = not_evaluated
effectiveState  = not_determined
numericWeight   = not_assigned
```

Multiple candidates remain separate observations. They are not counted, summed, ranked, or converted to a score.

## Fail-closed behavior

All four pillars must be resolved.

```text
incomplete pillars
=> PILLARS_UNRESOLVED
=> mechanisms = []
```

Snapshots with unresolved scenarios remain:

```text
SCENARIO_MATERIALIZATION_REQUIRED
```

No scenario is silently collapsed.

## Hard guards

```text
targetIntrinsicRootQualityVerdict       = not_determined
targetPostRelationForceState             = not_determined
effectiveMechanismForceVerdict           = not_determined
relationSpecificUsefulnessHarmfulness     = not_determined
classificationAuthorized                 = false
numericScoringAuthorized                 = false
```

## Prohibited equivalences

```text
visible target stem                  != strong target
root candidate                       != root-quality verdict
multiple root candidates             != additive force
no source-bounded candidate          != rootless verdict
hidden-only target presence          != root quality
intrinsic root candidate             != post-relation root state
intrinsic root candidate             != effective mechanism force
earth candidate presence             != resolved earth root class
```

## Implementation

- `src/research/i29-challenge-target-intrinsic-root-evidence.ts`
- `src/research/index.ts`
- `test/i29-challenge-target-intrinsic-root-evidence.test.ts`

## Verification

The first implementation gate, CI `#467`, failed only on one lint error caused by a runtime constant used solely for type derivation. The constant was removed and replaced by a type-level exclusion without changing the methodology contract.

Verified remediation head:

```text
HEAD:          6a0c3d6b149ab5dadd5504b2009bb8cb12a25e5d
CI run number: 468
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        65 files / 353 tests PASS
build:         PASS
```

The I29 regression suite contains 5 passing tests covering:

- visible non-earth target-stem anchors with strong/residual candidate evidence,
- hidden-only target presence producing no root candidate,
- earth target class remaining unresolved,
- visible target stem with no source-bounded candidate remaining non-verdict evidence,
- unresolved-pillar fail-closed behavior and downstream authorization guards.

## Closeout conclusion

```text
CHALLENGE_TARGET_INTRINSIC_ROOT_ADAPTER       = IMPLEMENTED / VERIFIED
VISIBLE_TARGET_STEM_ANCHOR                    = ENFORCED
HIDDEN_ONLY_TARGET_ROOT_PROMOTION              = PROHIBITED
NON_EARTH_ROOT_CANDIDATE_EVIDENCE             = IMPLEMENTED
EARTH_ROOT_CLASS                               = UNRESOLVED
TARGET_INTRINSIC_ROOT_QUALITY_VERDICT          = NOT DETERMINED
TARGET_POST_RELATION_FORCE_STATE               = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                      = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS       = NOT DETERMINED
STRENGTH_CLASSIFICATION                        = NOT AUTHORIZED
NUMERIC_SCORING                                = NOT AUTHORIZED
```

## Next gate

The root candidate substrate should first be reflected back into the force-context availability graph without pretending that candidate evidence is a root-quality verdict:

```text
I26 v3 — Challenge Context Availability with Intrinsic Root Candidate Evidence
```

After that integration, the next methodology gap is target post-relation root state. Any such review must remain separate from effective mechanism force and usefulness/harmfulness.
