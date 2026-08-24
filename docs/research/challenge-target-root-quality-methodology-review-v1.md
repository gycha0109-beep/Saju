# I28 Challenge Target Root-Quality Methodology Review v1

## Purpose

I28 audits whether the I18C day-master intrinsic root taxonomy may be reused for the target element of output, wealth, and officer/control challenge mechanisms.

The review is deliberately prior to implementation. It does **not** emit target root quality, post-relation force, effective mechanism force, usefulness/harmfulness, day-master strength, or numeric scoring.

## Source audit

### 1. I18C heavy/light root ordering has a direct day-master basis

In the `衰旺` commentary of `滴天髓闡微`, the discussion is explicitly framed around `日干/日主` and distinguishes heavier `長生/祿/旺` roots from lighter `墓庫/餘氣` roots.

Therefore the existing I18C ordering has a direct source basis for day-master strength research.

It does **not** follow that the complete I18C claim contract can be copied unchanged to every relation-derived target element.

### 2. Rootedness itself is not exclusive to the day master

The same text also uses rootedness language for non-day-master entities and forces, including examples describing:

- a month stem `壬水` as `通根`,
- `官印` as `通根`,
- `木火` as `無根`,
- `官星` as `無根` or structurally supported/unsupported.

This is sufficient to reject the opposite extreme conclusion that root semantics are meaningful only for the day master.

### 3. Challenge targets introduce an anchor problem absent from I18C

I18C always has a concrete day stem anchor.

I27, by contrast, first derives an abstract mechanism `targetElement`. A target element may be evidenced only in branch-main or hidden-stem channels with no visible target-element heavenly stem.

The source audit does not justify treating every such hidden-only element presence as an intrinsic root-quality verdict.

Therefore challenge-target root evidence must require a manifested target-stem anchor before a root-class candidate is emitted.

### 4. Earth remains unresolved

`欽定協紀辨方書` records competing earth growth-stage treatments. I18C already preserves this disagreement instead of selecting a hidden default.

I28 carries the same boundary forward:

```text
earthRootConventionResolved = false
```

## Methodology decision

```text
CHALLENGE_SPECIFIC_MODIFIED_REUSE_REQUIRED
```

Rejected alternatives:

```text
EXACT_I18C_REUSE       = REJECTED
TOTAL_CONCEPT_REJECTION = REJECTED
```

The correct middle position is:

- reuse deterministic structural substrate where the semantics are unchanged,
- adapt source-bounded non-earth branch locators under a challenge-specific namespace,
- do not reuse I18C day-master claim types, subject, polarity, or methodology identity,
- require a visible target-stem anchor,
- keep earth unresolved,
- keep all downstream force/effect conclusions blocked.

## Reuse audit

### `HIDDEN_STEM_MEMBERSHIP`

```text
REUSE_AS_STRUCTURAL_SUBSTRATE
```

Hidden-stem membership can answer whether a target-element stem is contained in a branch. Membership alone does not assign root quality.

### `NON_EARTH_STRONG_AND_RESIDUAL_BRANCH_LOCATORS`

```text
ADAPT_UNDER_CHALLENGE_NAMESPACE
```

The I18C non-earth branch sets may seed challenge-target root-location candidates only after a visible target stem anchors the rootedness question.

### `I18C_ROOT_CLASS_LABELS_AND_CLAIM_TYPES`

```text
DO_NOT_REUSE_DIRECTLY
```

The existing labels and claims are artifacts of the `day_master_strength` methodology and cannot be attached directly to an abstract challenge target.

### `HIDDEN_ONLY_TARGET_ELEMENT_PRESENCE`

```text
DO_NOT_REUSE_DIRECTLY
```

Hidden-only or branch-main-only target presence remains I27 structural evidence. It is not automatically promoted to root quality.

### `EARTH_ROOT_CLASS`

```text
DO_NOT_REUSE_DIRECTLY
```

The unresolved convention remains explicit.

## Next implementation guards

Any challenge-target root evidence adapter must satisfy all of the following:

```text
VISIBLE_TARGET_STEM_ANCHOR_REQUIRED
CHALLENGE_SPECIFIC_METHODOLOGY_NAMESPACE_REQUIRED
CHALLENGE_SPECIFIC_CLAIM_TYPE_REQUIRED
NON_EARTH_BRANCH_LOCATORS_ONLY_AS_CANDIDATE_SUBSTRATE
HIDDEN_ONLY_MEMBERSHIP_NOT_ROOT_QUALITY
EARTH_ROOT_CLASS_REMAINS_UNRESOLVED
POST_RELATION_STATE_NOT_INFERRED
EFFECTIVE_MECHANISM_FORCE_NOT_INFERRED
USEFULNESS_HARMFULNESS_NOT_INFERRED
NUMERIC_WEIGHT_NOT_ASSIGNED
STRENGTH_CLASSIFICATION_NOT_AUTHORIZED
```

## Implementation

- `src/research/i28-challenge-target-root-quality-methodology-review.ts`
- `src/research/index.ts`
- `test/i28-challenge-target-root-quality-methodology-review.test.ts`

## Verification

```text
HEAD:          526ace5ff60b96b1e7966d927294fc9631e3bf30
CI run number: 463
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        64 files / 348 tests PASS
build:         PASS
```

The I28 regression suite contains 5 passing tests covering:

- modified reuse instead of direct I18C reuse,
- visible target-stem anchor requirement,
- hidden-only membership fail-closed behavior,
- conditional reuse of non-earth branch locators,
- unresolved earth convention and downstream authorization guards,
- deterministic review identity.

## Review conclusion

```text
GENERAL_ROOT_SEMANTICS_BEYOND_DAY_MASTER      = SOURCE SUPPORTED
I18C_DIRECT_REUSE                             = NOT AUTHORIZED
CHALLENGE_SPECIFIC_MODIFIED_REUSE             = REQUIRED
VISIBLE_TARGET_STEM_ANCHOR                    = REQUIRED
NON_EARTH_BRANCH_LOCATOR_REUSE                = AUTHORIZED AS CANDIDATE SUBSTRATE ONLY
HIDDEN_ONLY_TARGET_MEMBERSHIP_ROOT_QUALITY    = NOT AUTHORIZED
EARTH_ROOT_CONVENTION                         = UNRESOLVED
TARGET_INTRINSIC_ROOT_QUALITY                  = NOT DETERMINED
TARGET_POST_RELATION_FORCE_STATE               = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                      = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS       = NOT DETERMINED
STRENGTH_CLASSIFICATION                        = NOT AUTHORIZED
NUMERIC_SCORING                                = NOT AUTHORIZED
```

## Next gate

```text
I29 — Challenge Target Intrinsic Root Evidence Adapter
```

I29 may implement only the candidate-evidence adapter authorized by I28. It must not resolve post-relation root state or effective mechanism force.
