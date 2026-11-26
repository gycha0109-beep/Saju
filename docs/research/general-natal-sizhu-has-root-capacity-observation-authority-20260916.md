# General Natal — 四柱有根 source-side capacity observation authority

Date: 2026-09-16  
Issue: #709  
Scope: `sizhu_has_root_source_capacity_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact records one selected-source statement about `四柱有根` and nothing more.

It does not authorize a canonical `四柱有根` resolver, a generalized root classifier, a strength classifier, a Gyeokguk derivation, or a Production fact.

## Fresh implementation base

Implementation branch creation used fresh `main`:

```text
93b366d986f9c892e605e0acb93f1a31c9566d16
```

The immediately preceding General Natal merge `928d9b3a151ef50b084d372e703f218f1103411b` is the parent of that main commit. The intervening commit is unrelated Relationship / Spouse T8 work.

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十幹得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-16 confirms:

```text
十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。
```

The statement is preserved as a source-side capacity context:

```text
sourceSubject            = 十幹
sourceCondition          = 四柱有根
sourceMoonCommandPhrase  = 不論月令休囚
sourceCapacityPhrase     = 便能受財官食神而當傷官七煞
contextObserved          = true
```

## Adjacent source context

The same passage continues with:

```text
長生祿旺，根之重者也；墓庫餘氣，根之輕者也。
```

and later discusses Tonggen. Those nearby statements are separately governed by repository research authorities.

Textual proximity does not prove that every existing heavy/light root fact, Twelve-Growth stage, hidden-stem membership, or bounded Tonggen observation is an exhaustive implementation of `四柱有根`.

## Upstream authority pins

This artifact pins, but does not execute:

```text
General Natal root-weight primitive authority review
bounded 墓庫/餘氣 -> Tonggen authority
peer-support-without-Tonggen weak-context observation authority
```

The root-weight review itself says the complete stem-branch root-class mapping is unavailable and the generalized root-weight classifier is unauthorized.

The bounded Tonggen authority explicitly rejects generic root -> Tonggen equivalence and does not establish ordinary strength.

The negative-context authority explicitly rejects turning bounded no-evidence into a global `不通根` verdict or absence into a generic weak classifier.

## Canonical-input representability

No chart-level canonical input is consumed in this observation-only registry.

```text
CANONICAL_INPUT_REQUIRED            = false
CHART_FACTS_CONSUMED                = false
ROOT_WEIGHT_EVALUATION_CONSUMED     = false
BOUNDED_TONGGEN_EVALUATION_CONSUMED = false
TWELVE_GROWTH_FACTS_CONSUMED        = false
HIDDEN_STEM_FACTS_CONSUMED          = false
CANONICAL_REPRESENTABILITY          = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

There is no exported function accepting stems, branches, hidden stems, root evaluations, Tonggen evaluations, counts, or chart facts.

## Explicit non-authority

The following remain unauthorized:

```text
any existing root fact == 四柱有根
root heavy/light == 四柱有根
長生 / 祿 / 旺 == 四柱有根
墓庫 / 餘氣 == 四柱有根
Twelve Growth Stage == 四柱有根
hidden-stem occurrence/order == 四柱有根
bounded Tonggen == 四柱有根
四柱有根 -> 黨眾
四柱有根 -> 強
四柱有根 -> 不弱
四柱有根 -> final 強弱
四柱有根 -> final 旺衰
四柱有根 -> numeric strength
四柱有根 -> non-numeric strength scalar
財官食神 / 傷官七煞 capacity phrase -> production calculation rule
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

## Why observation-only is required

The selected sentence supplies a direct semantic statement but does not independently define a complete machine predicate for `四柱有根` across all stems, branches, Yin/Yang exceptions, Earth boundaries, root classes, and Tonggen cases.

The repository already contains several bounded root-related authorities, but their own boundaries prohibit silently composing them into a generalized root resolver. Therefore this frontier can safely register the source statement while preserving the unresolved implementation gap.

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
