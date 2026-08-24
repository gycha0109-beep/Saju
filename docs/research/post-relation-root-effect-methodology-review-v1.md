# Post-Relation Root Effect Methodology Review v1

- Stage: I19
- Status: **RESEARCH REVIEW IMPLEMENTED / EFFECT RESOLUTION BLOCKED**
- Date: 2026-08-20
- Methodology namespace: `M-STRENGTH-FUYI`
- Production authority: **NOT AUTHORIZED**
- Numeric scoring: **NOT AUTHORIZED**

## 1. Purpose

I18D can detect that a tracked branch relation touches a same-element root position. I19 asks a narrower question:

```text
relation candidate touches a root
!=
root effect is known
```

The stage does not attempt to label a root `preserved`, `destroyed`, `strengthened`, or `transformed` merely because a clash or combination exists.

## 2. Source audit result

### 《滴天髓》 / 《滴天髓闡微》 — clash

The source tradition explicitly makes clash outcome conditional on relative force.

Research conclusions:

- a flourishing side can uproot a declining side,
- a declining side clashing with a flourishing side can instead stimulate the flourishing side,
- root uprooting is not inferred from the clash pair alone,
- season, additional roots, peer/supporting stems, and surrounding force can alter the result,
- therefore `branch_clash` is insufficient to determine post-relation root state.

References:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93/03
- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE

### 《滴天髓》 — 戰合 / 從化

Combination is likewise contextual.

Research conclusions:

- a combination can assist, restrain, settle movement, or alter flow depending on context,
- combination presence and transformation establishment are separate states,
- transformation requires additional conditions,
- therefore `branch_six_combination` or `branch_three_combination` cannot directly produce a transformed root state.

References:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93/07
- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93/08

## 3. Circular-dependency finding

A naive implementation would do this:

```text
clash exists
-> ask whether one side is strong or weak
-> use final strength classifier
-> decide root damage
-> feed damaged root back into final strength classifier
```

This is circular reasoning.

I19 therefore forbids use of the final `DAY_MASTER_STRENGTH_CLASSIFICATION` as an input to root-effect resolution.

The required dependency must be pre-classification evidence that is independently derived from source-bounded structural context.

## 4. Machine-readable named states

I19 currently permits only review states:

```text
NO_TRACKED_RELATION_CANDIDATE
UNRESOLVED_CLASH_RELATIVE_FORCE
UNRESOLVED_COMBINATION_CONDITIONS
UNRESOLVED_MULTIPLE_RELATIONS
INPUT_INDETERMINATE
```

These are not post-relation root verdicts.

The following remain unauthorized:

```text
ROOT_PRESERVED
ROOT_DISRUPTED
ROOT_DESTROYED
ROOT_STRENGTHENED
ROOT_TRANSFORMED
```

## 5. Required dependencies

### Clash

Before an actual effect can be reviewed, a source-backed independent context must exist for:

```text
RELATIVE_BRANCH_FORCE
SEASONAL_COMMAND_CONTEXT
EXTERNAL_SUPPORT_RESCUE
```

### Combination

Before an actual effect can be reviewed, a source-backed independent context must exist for:

```text
COMBINATION_TRANSFORMATION_CONDITIONS
COMPETING_RELATION_PRECEDENCE
SEASONAL_COMMAND_CONTEXT
```

## 6. Safety / scope guards

I19 maintains:

```text
classificationAuthorized = false
numericScoringAuthorized = false
effectiveRootState = not_determined
numericWeight = not_assigned
```

A root with no tracked relation candidate is not automatically called preserved. It only means that the current structural router found no tracked clash / six-combination / three-combination candidate affecting that root position.

Unknown-time scenario bases remain fail-closed until the scenario is materialized and reviewed independently.

## 7. Terminal decision

```text
POST_RELATION_ROOT_EFFECT_REVIEW = IMPLEMENTED / RESEARCH ONLY
ROOT_EFFECT_RESOLUTION = BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES
PRODUCTION_STRENGTH_CLASSIFIER = NOT IMPLEMENTED
PRODUCTION_STRENGTH_CLASSIFICATION = NOT AUTHORIZED
NUMERIC_STRENGTH_SCORING = NOT AUTHORIZED
```

## 8. Next gate

The next safe stage is:

```text
I20 — Independent Relative-Force Evidence Review
```

I20 must not use a final strength verdict as an input. It must examine whether relative branch force can be represented from independently observable, versioned evidence such as seasonal context, intrinsic root class, local support/rescue, and competing relations without collapsing them into an arbitrary numeric score.

Combination transformation conditions remain a separate research branch and must not be silently solved by I20.
