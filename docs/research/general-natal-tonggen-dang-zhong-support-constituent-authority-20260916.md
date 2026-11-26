# General Natal — bounded 通根 → 黨眾 support-constituent authority

Date: 2026-09-16  
Issue: #693  
Status: research-only authority

## Decision

```text
DIRECT_SOURCE_TONGGEN_DANG_ZHONG_ASSOCIATION = OBSERVED
UPSTREAM_BOUNDED_TONGGEN = AVAILABLE_RESEARCH_ONLY
BOUNDED_TONGGEN_TO_DANG_ZHONG_SUPPORT_CONSTITUENT = AUTHORIZED_RESEARCH_ONLY
```

The admitted bridge is exactly:

```text
MukuYuqiBoundedTonggenEvaluation
  state = bounded_tonggen_observed
  tonggenObserved = true
  sourceRootKind = 墓庫 | 餘氣
  authority = research_only

→ tonggen_support_constituent_observed
  sourceConstituent = 通根
  sourceSupportPhrase = 通根扶助
  supportConstituentObserved = true
  dangZhongEstablished = false
  zhuGuaEstablished = false
  qiangRuoEstablished = false
```

No raw chart facts are read and no root relation is rediscovered.

## Selected source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Freshly re-verified on 2026-09-16:

```text
比劫印綬通根扶助為黨眾
若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也。
蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重
```

These lines establish that 通根扶助 is source-associated with 黨眾 composition. They do not provide a complete cardinality rule, threshold, aggregation rule, or chart-level 黨眾 predicate.

## Governed upstream only

The bridge consumes only the #691/#692 research authority:

```text
GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION
GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH
```

That upstream authority already limits positive 通根 observations to governed non-Earth 墓庫/餘氣 states and leaves Earth plus generic root/stage/hidden-stem equivalence unresolved or unauthorized.

The source-semantic context is pinned through the #642/#644 authority:

```text
GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION
GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH
```

No raw stem/branch matcher, hidden-stem matcher, Twelve-Growth lookup, or whole-chart scan is added here.

## Fail-closed states

```text
no_bounded_tonggen_evidence
→ no_bounded_tonggen_support_constituent_evidence
→ NOT 黨眾=false
→ NOT 助寡=true
→ NOT no-other-support

unresolved_outside_governed_tonggen_scope
→ unresolved_outside_governed_tonggen_scope
→ no constituent evidence emitted
```

Earth therefore remains unresolved.

## Explicit non-authority

The following remain unauthorized:

```text
one bounded 通根 -> 黨眾
multiple bounded 通根 -> 黨眾
通根 count / threshold
absence of bounded 通根 -> 助寡
absence of bounded 通根 -> no other support
通根 + 比肩/印綬 aggregation
raw root -> support constituent
generic root -> support constituent
長生/祿/旺 -> support constituent
hidden stem -> support constituent
Earth 通根 completion
通根 -> 強
通根 -> 不弱
通根 + 比印 -> final 強弱 / 旺衰 resolver
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
SKU / Commerce activation
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

This artifact is research-only and does not modify ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior.
