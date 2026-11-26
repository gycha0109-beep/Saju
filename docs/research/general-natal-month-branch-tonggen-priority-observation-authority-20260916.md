# General Natal — Month-branch Tonggen priority source observation authority

Date: 2026-09-16  
Issue: #712  
Scope: `month_branch_tonggen_priority_source_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact records one selected-source statement about positional priority inside Tonggen context and nothing more.

It does not authorize a canonical month-branch root-priority evaluator, a generalized Tonggen resolver, a canonical `四柱有根` resolver, a strength classifier, a Gyeokguk derivation, or a Production fact.

## Fresh implementation base

Implementation branch creation used fresh `main`:

```text
66de797a8a2c60614cf3f475b437f08ae480fa4d
```

That main already contains #709/#711, the observation-only `四柱有根` capacity authority.

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十幹得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-16 confirms:

```text
總之干多不如支重，而通根之中，尤以月令之支為最重也。
```

This artifact preserves only the bounded source-side semantics:

```text
sourceContext        = 通根之中
sourcePriorityTarget = 月令之支
sourcePriorityPhrase = 尤以月令之支為最重
priorityObserved      = true
```

## Adjacent authority

The repository already separately governs:

```text
- selected-source heavy/light root semantics and bounded relative examples;
- bounded 墓庫/餘氣 -> Tonggen observation;
- selected-source 四柱有根 capacity context as observation-only authority.
```

Those authorities are pinned for provenance but are not consumed as executable input here.

In particular, the source sentence does not by itself define:

```text
- whether any specific month branch establishes a root;
- whether a month-branch root establishes Tonggen;
- a multiplier for month-branch position;
- a complete positional ordering among all roots;
- a bridge from root/Tonggen to 四柱有根;
- a bridge from root/Tonggen/四柱有根 to 強, 不弱, final 強弱, or 旺衰.
```

## Canonical-input representability

No chart-level canonical input is consumed in this observation-only registry.

```text
CANONICAL_INPUT_REQUIRED               = false
CHART_FACTS_CONSUMED                   = false
MONTH_BRANCH_FACT_CONSUMED             = false
ROOT_WEIGHT_EVALUATION_CONSUMED        = false
BOUNDED_TONGGEN_EVALUATION_CONSUMED    = false
SIZHU_HAS_ROOT_OBSERVATION_CONSUMED    = false
CANONICAL_REPRESENTABILITY             = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

There is no exported function accepting a month branch, stems, branches, hidden stems, root evaluations, Tonggen evaluations, counts, or chart facts.

## Explicit non-authority

The following remain unauthorized:

```text
month branch contains same element -> root
month branch root -> Tonggen
month branch Tonggen -> strongest root in every comparison
month branch position -> numeric multiplier
month branch position -> non-numeric generalized weight scalar
month branch root -> 黨眾
month branch root -> 強
month branch root -> 不弱
month branch root -> final 強弱
month branch root -> final 旺衰
bounded Tonggen -> 四柱有根
四柱有根 -> strength
source priority phrase -> executable root-weight evaluator
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

## Why observation-only is required

The selected sentence supplies a direct positional-priority statement only inside a `通根之中` context. It does not independently define the prerequisite canonical Tonggen predicate or a machine rule for comparing every possible root by pillar, class, stem, branch, season, or Yin/Yang exception.

The repository's existing root/Tonggen authorities intentionally remain bounded. Promoting the sentence into a multiplier, total order, or chart-level strength resolver would therefore exceed both the selected source and the current canonical authority graph.

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
