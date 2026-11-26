# General Natal — Canonical month-branch bounded Tonggen priority-context authority

Date: 2026-09-16  
Issue: #714  
Scope: `governed_canonical_month_branch_to_bounded_tonggen_priority_context_evidence`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact creates one narrow month-specific semantic bridge. It starts from the canonical resolved day-master element and canonical resolved **month branch**, reuses the existing governed non-Earth 墓庫/餘氣 root matcher and bounded-Tonggen binder, and records only whether that positive bounded Tonggen falls inside the selected source's `月令之支` priority context.

It does not compare roots across pillars, assign numeric or non-numeric strength, or create a generalized root/Tonggen/四柱有根 resolver.

## Fresh implementation base

```text
9f682f9890ecb2696ea24ecc13c81abebc13b584
```

This base already contains:

```text
#557/#558 — non-Earth 墓庫/餘氣 light-root matcher
#691/#692 — governed 墓庫/餘氣 -> bounded Tonggen observation
#712/#713 — 月令之支 Tonggen-priority source observation
```

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-16 confirms:

```text
總之干多不如支重，而通根之中，尤以月令之支為最重也。
```

The source-side semantics consumed here are limited to:

```text
sourceContext        = 通根之中
sourcePriorityTarget = 月令之支
sourcePriorityPhrase = 尤以月令之支為最重
```

## Why a new bridge is needed

`MukuYuqiBoundedTonggenEvaluation` retains:

```text
element
branch
sourceRootKind
bounded Tonggen state
```

but it does **not** retain pillar-slot provenance.

Therefore this is unsafe:

```text
arbitrary precomputed bounded Tonggen evaluation
+ branch value happens to equal canonical month branch
→ assert month-branch provenance
```

The same branch value can occur in multiple pillars.

This artifact instead evaluates the month branch from the start:

```text
canonical resolved day-master element
+ canonical resolved month branch
↓
evaluateMukuYuqiLightRoot(...)
↓
bindGovernedMukuYuqiRootToBoundedTonggen(...)
↓
positive bounded Tonggen only
↓
month-branch priority-context evidence
```

No year/day/hour branch API is exposed by this bridge.

## Bounded executable result

Positive result:

```text
state = month_branch_bounded_tonggen_priority_context_observed
monthBranchTonggenObserved = true
priorityContextObserved = true
sourceContext = 通根之中
sourcePriorityTarget = 月令之支
sourcePriorityPhrase = 尤以月令之支為最重
numericWeightAssigned = false
nonNumericScalarAssigned = false
chartComparisonPerformed = false
```

This means only:

> within the already-governed non-Earth 墓庫/餘氣 subset, the canonical month branch has a positive bounded Tonggen observation, so the selected source's month-branch priority context is applicable.

It does **not** mean:

```text
this is globally the strongest root in the chart
this root has a numeric multiplier
this root establishes chart 強/不弱
this root establishes 黨眾
this result completes 四柱有根
```

## Nonmatch and Earth boundary

When the canonical month branch does not match the governed non-Earth 墓庫/餘氣 surface:

```text
state = no_month_branch_bounded_tonggen_priority_evidence
```

This is not:

```text
not a root
not Tonggen globally
no month-branch root
weak
助寡
```

For Earth:

```text
state = unresolved_outside_governed_month_branch_tonggen_scope
```

The historical Earth boundary is preserved unchanged.

## Upstream provenance

This artifact content-addresses and pins:

```text
GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION
GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH

GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION
GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH

GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION
GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH
```

It reuses the executable upstream matcher/binder. Their mappings are not copied into a second table.

## Explicit non-authority

Still unauthorized:

```text
arbitrary precomputed Tonggen -> month provenance
same branch value elsewhere -> month provenance
year/day/hour branch priority matcher
any month branch -> root
any month branch root -> Tonggen
any bounded Tonggen anywhere -> month priority
month-branch Tonggen -> globally strongest root
month-branch position -> numeric multiplier
month-branch position -> non-numeric strength scalar
canonical generalized Tonggen resolver
canonical 四柱有根 resolver
month-branch Tonggen -> 黨眾
month-branch Tonggen -> 強
month-branch Tonggen -> 不弱
month-branch Tonggen -> final 強弱
month-branch Tonggen -> final 旺衰
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production fact emission
SKU / Commerce
```

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
