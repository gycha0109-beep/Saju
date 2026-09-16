# General Natal — 比劫 assistance without 通根 weak-context observation authority

Date: 2026-09-16  
Issue: #702  
Scope: `bijie_assistance_without_tonggen_weak_context_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact preserves the selected commentary's negative-side 通根 context as source observations only. It creates no chart matcher, negative-root resolver, strength classifier, or Production fact.

## Fresh implementation base

```text
c146bc45011fd84ed7f5f003f73de47fe94bdbc1
```

The branch is created from the exact fresh main after #699/#701 merged and its merged-SHA CI/PCC both succeeded.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Fresh direct review on 2026-09-16 confirms:

```text
比劫如朋友，通根如家室，有比劫之助而不通根，則浮而不實。
譬如四辛卯，金不通根，四丙申，火不通根，雖天元一氣，仍作弱論。
```

The source directly supplies four bounded observations:

```text
1. 比劫如朋友 / 通根如家室.
2. 有比劫之助而不通根 -> source says 浮而不實.
3. 四辛卯 -> source says 金不通根 and 仍作弱論.
4. 四丙申 -> source says 火不通根 and 仍作弱論.
```

These are literal source-context observations, not normalized predicates.

## Upstream authority pinned

### #691 / #692

`general-natal-muku-yuqi-bounded-tonggen-authority.ts` governs only bounded positive non-Earth 墓庫/餘氣 Tonggen evidence and exposes:

```text
bounded_tonggen_observed
no_bounded_tonggen_evidence
unresolved_outside_governed_tonggen_scope
```

Critically:

```text
no_bounded_tonggen_evidence != global 不通根
```

It means only that the bounded adapter found no positive evidence inside its governed surface.

### #693 / #697

`general-natal-tonggen-dang-zhong-support-constituent-authority.ts` admits a positive bounded Tonggen observation as one research-only 黨眾-associated support constituent while keeping all absence, count, aggregation, 強/不弱, final 強弱/旺衰, and Production paths closed.

This artifact pins both upstream version and definition hashes without consuming either evaluator at runtime.

## Canonical representability

No chart input is required or consumed:

```text
CANONICAL_INPUT_REQUIRED = false
CHART_FACTS_CONSUMED = false
TONGGEN_EVALUATION_CONSUMED = false
TEN_GOD_FACTS_CONSUMED = false
STEM_FACTS_CONSUMED = false
BRANCH_FACTS_CONSUMED = false
HIDDEN_STEM_FACTS_CONSUMED = false
CANONICAL_REPRESENTABILITY = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

No function is exported by this authority module.

## Explicit non-authority

The following remain unauthorized:

```text
#692 no_bounded_tonggen_evidence -> 不通根
#692 no_bounded_tonggen_evidence -> 弱
absence of 墓庫/餘氣 Tonggen evidence -> no root anywhere
one or more 比劫 + no bounded Tonggen -> 弱
visible 比肩 count -> 弱
四辛卯 -> executable chart matcher
四丙申 -> executable chart matcher
不通根 -> 助寡
通根 present -> 不弱
source examples -> final 強弱
source examples -> final 旺衰
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

The direct source's `仍作弱論` wording is preserved as source evidence only. It is not promoted into a general-purpose ordinary-strength resolver.

## Required verdict

```text
DIRECT_SOURCE_BIJIE_WITHOUT_TONGGEN_FLOATING_CONTEXT = OBSERVED
DIRECT_SOURCE_FOUR_XIN_MAO_WEAK_EXAMPLE = OBSERVED
DIRECT_SOURCE_FOUR_BING_SHEN_WEAK_EXAMPLE = OBSERVED
BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_REGISTRY = AUTHORIZED_OBSERVATION_ONLY

CANONICAL_NOT_TONGGEN_RESOLVER = UNAUTHORIZED
BOUNDED_NO_EVIDENCE_TO_NOT_TONGGEN = UNAUTHORIZED
ABSENCE_OF_BOUNDED_TONGGEN_TO_WEAK = UNAUTHORIZED
BIJIE_COUNT_TO_WEAK = UNAUTHORIZED
EXACT_FOUR_XIN_MAO_MATCHER = UNAUTHORIZED
EXACT_FOUR_BING_SHEN_MATCHER = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO_CLASSIFIER = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
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

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
