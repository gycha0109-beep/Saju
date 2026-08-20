# I30 Challenge Target Post-Relation Root-State Methodology Review v1

## Purpose

I30 audits whether the I19 day-master post-relation root-effect methodology can be reused for challenge mechanism target elements after I29 intrinsic candidate evidence exists.

The review is methodology-only. It does **not** emit target root quality, target post-relation root state, effective mechanism force, relation-specific usefulness/harmfulness, day-master strength, or numeric scoring.

## Source audit

### 1. Branch clash is conditional, not intrinsically destructive

`滴天髓` states the clash rule in terms of relative flourishing and decline: a flourishing side can uproot a declining side, while a declining side clashing with a flourishing side can instead stimulate the flourishing side.

`滴天髓闡微` further makes the outcome dependent on season, surrounding roots/support, and rescue context.

Therefore:

```text
branch clash exists != root destroyed
branch clash exists != root preserved
```

The conditional relation principle is reusable, but the day-master I19 result contract is not.

### 2. Combination presence is not transformation

`滴天髓闡微` contains examples where a combination can transform and help, while a non-transforming combination can instead bind or constrain.

`三命通會` also records explicit conditions under which stem combinations transform or fail to transform.

Therefore:

```text
stem five-combination exists != target stem transformed
branch combination exists    != root preserved
branch combination exists    != root strengthened
```

I30 authorizes relation participation routing only.

### 3. Stem and branch participation are separate channels

I29 introduced a visible target-stem anchor plus branch root candidates.

A challenge target can therefore participate in relations through two distinct channels:

- the visible target heavenly stem,
- an intrinsic root-candidate earthly branch.

The adapter following I30 must preserve these channels separately rather than collapsing them into one post-relation force score.

### 4. Hidden-only targets cannot acquire rootedness retroactively

I29 intentionally blocks hidden-only target presence from becoming root-quality evidence when there is no visible target-stem anchor.

A structural relation touching such a branch does not authorize creating a challenge-target root state that did not exist upstream.

### 5. Earth remains unresolved

The upstream earth root convention remains unresolved.

Therefore tracked relations may be recorded for an earth target, but they cannot close the post-relation root-state question.

### 6. Current relation router is bounded

The deterministic structural relation router currently tracks:

```text
stem_five_combination
branch_six_combination
branch_clash
branch_three_combination
```

It does not currently track branch punishment, harm, or break.

I30 therefore does not treat those families as absent or harmless; they remain outside the current evidence model.

## Methodology decision

```text
CHALLENGE_SPECIFIC_POST_RELATION_REVIEW_REQUIRED
```

Rejected alternative:

```text
DIRECT_I19_REUSE = REJECTED
```

The correct boundary is:

- reuse deterministic relation candidates as routing substrate,
- adapt clash dependencies under a challenge-specific namespace,
- route stem and branch combination participation without inferring transformation,
- preserve no-relation as routing information only,
- keep hidden-only and earth root-state questions unresolved,
- keep untracked relation families explicitly unsupported,
- keep all downstream force/effect conclusions blocked.

## Relation audit

### Visible target stem + five-combination

```text
ADAPT_UNDER_CHALLENGE_NAMESPACE
```

Required unresolved dependencies:

```text
COMBINATION_TRANSFORMATION_CONDITIONS
TARGET_STEM_COMPETING_SUPPORT_INTERFERENCE
SEASONAL_COMMAND_CONTEXT
```

### Root-candidate branch + clash

```text
ADAPT_UNDER_CHALLENGE_NAMESPACE
```

Required unresolved dependencies:

```text
RELATIVE_BRANCH_FORCE
SEASONAL_COMMAND_CONTEXT
EXTERNAL_SUPPORT_RESCUE
```

### Root-candidate branch + six/three combination

```text
ADAPT_UNDER_CHALLENGE_NAMESPACE
```

Required unresolved dependencies:

```text
COMBINATION_TRANSFORMATION_CONDITIONS
COMPETING_RELATION_PRECEDENCE
SEASONAL_COMMAND_CONTEXT
```

### No tracked relation

```text
REUSE_AS_RELATION_ROUTING_SUBSTRATE
```

This does **not** mean the root is preserved.

### Hidden-only target / earth target / untracked relation families

```text
DO_NOT_RESOLVE_FROM_CURRENT_SUBSTRATE
```

## Next implementation guards

```text
ALIGN_I29_WITH_SAME_RESOLVED_PILLAR_MATERIAL
ROUTE_VISIBLE_TARGET_STEM_RELATIONS_SEPARATELY
ROUTE_ROOT_CANDIDATE_BRANCH_RELATIONS_SEPARATELY
CLASH_REQUIRES_RELATIVE_FORCE_AND_RESCUE_CONTEXT
COMBINATION_TRANSFORMATION_REMAINS_UNRESOLVED
NO_TRACKED_RELATION_DOES_NOT_MEAN_PRESERVED
HIDDEN_ONLY_TARGET_POST_RELATION_ROOT_STATE_NOT_AUTHORIZED
EARTH_ROOT_STATE_REMAINS_UNRESOLVED
UNTRACKED_RELATION_FAMILIES_NOT_INFERRED
EFFECTIVE_MECHANISM_FORCE_NOT_INFERRED
USEFULNESS_HARMFULNESS_NOT_INFERRED
NUMERIC_WEIGHT_NOT_ASSIGNED
STRENGTH_CLASSIFICATION_NOT_AUTHORIZED
```

## Implementation

- `src/research/i30-challenge-target-post-relation-root-state-methodology-review.ts`
- `src/research/index.ts`
- `test/i30-challenge-target-post-relation-root-state-methodology-review.test.ts`

## Verification

```text
HEAD:          6a1f85ca21244280a3a00978a98b7618ad6fc55e
CI run number: 476
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        67 files / 363 tests PASS
build:         PASS
```

The I30 regression suite contains 5 passing tests covering:

- challenge-specific review instead of direct I19 reuse,
- conditional clash routing dependencies,
- stem/branch combination routing without transformation authorization,
- fail-closed no-relation, hidden-only, earth, and untracked-relation handling,
- downstream authorization guards and deterministic review identity.

## Review conclusion

```text
I19_DIRECT_REUSE                         = NOT AUTHORIZED
BRANCH_CLASH_CONDITIONAL_SEMANTICS       = REUSABLE AS ROUTING BASIS
STEM_COMBINATION_TRANSFORMATION           = NOT DETERMINED
BRANCH_COMBINATION_EFFECT                 = NOT DETERMINED
NO_TRACKED_RELATION_MEANS_PRESERVED       = false
HIDDEN_ONLY_TARGET_POST_RELATION_STATE    = NOT AUTHORIZED
EARTH_ROOT_CONVENTION                     = UNRESOLVED
UNTRACKED_RELATION_EFFECTS                = NOT AUTHORIZED
TARGET_POST_RELATION_ROOT_STATE           = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                 = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS  = NOT DETERMINED
STRENGTH_CLASSIFICATION                   = NOT AUTHORIZED
NUMERIC_SCORING                           = NOT AUTHORIZED
```

## Next gate

```text
I31 — Challenge Target Relation Participation Evidence Router
```

I31 may materialize only which tracked structural relations touch visible target stems and I29 root candidates, together with unresolved methodology dependencies. It must not resolve the post-relation root state or effective mechanism force.
