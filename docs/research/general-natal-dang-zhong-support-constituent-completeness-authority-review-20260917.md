# General Natal — 黨眾 support-constituent completeness before aggregation review

Date: 2026-09-17  
Issue: #766  
Status: research-only non-executable review

## Decision

```text
INCOMPLETE_AGGREGATION_BLOCKED
```

Current bounded support-constituent authorities are individually usable as research evidence, but they are not complete enough to form a shared chart-level collection, count, threshold, aggregation, or `黨眾` resolver.

## Selected source context

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Fresh review on 2026-09-17 preserves the already-governed source statements:

```text
比劫印綬通根扶助為黨眾
若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也。
蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重
```

The source clearly names `比劫 / 印綬 / 通根扶助` as support families. The current #642/#644 context authority also explicitly records that the complete `黨眾` cardinality rule, `比印重疊` threshold, and generalized `通根比印` composition rule are unavailable.

Therefore source naming of constituent families does not authorize constructing a complete chart-level collection from the currently implemented bounded adapters.

## Current bounded support surface

### 1. Visible 比肩 support — #645 / PR #646

Available:

```text
exact visible 비견 count 1 | 2 | 3
→ source category 比劫
→ support constituent evidence
```

Incomplete because:

```text
겁재 not consumed
branch Ten-God not consumed
hidden-stem Ten-God not consumed
比肩 + 劫財 aggregation unauthorized
```

Verdict:

```text
VISIBLE_BIJIAN_SUPPORT = AVAILABLE_RESEARCH_ONLY
GENERAL_BIJIE_SUPPORT_COVERAGE = INCOMPLETE
```

### 2. Exact 甲/乙 劫財→比劫 support — #699 / PR #701

Available only for:

```text
甲 day master + visible 乙
→ 劫財
→ exact source 比劫 support constituent
```

Still unauthorized:

```text
global 劫財 ↔ 比劫 alias
canonical 겁재 -> 比劫 mapping
generalized 劫財 resolver
whole-chart 劫財 scan
劫財 count
比肩 + 劫財 count
```

Verdict:

```text
EXACT_JIA_YI_JIECAI_BIJIE_SUPPORT = AVAILABLE_RESEARCH_ONLY
GENERAL_JIECAI_TO_BIJIE_SUPPORT = UNAUTHORIZED
GENERAL_BIJIE_SUPPORT_COVERAGE = INCOMPLETE
```

### 3. 印綬 support — #685 / PR #686

Available:

```text
one already-supplied resolved 정인 | 편인 fact
→ 正印 | 偏印
→ 印綬 source-category member
→ support constituent evidence
```

But the upstream is deliberately `singleFactInputOnly`.

Still unauthorized:

```text
whole-chart 印 scan
印綬 count
比劫 + 印綬 aggregation
```

Verdict:

```text
YINSHOU_SINGLE_FACT_SUPPORT = AVAILABLE_RESEARCH_ONLY
WHOLE_CHART_YINSHOU_SUPPORT_COVERAGE = INCOMPLETE
```

### 4. 墓庫 / 餘氣 通根 support — #693 / PR #697

Available:

```text
governed non-Earth 墓庫 | 餘氣 bounded Tonggen
→ 通根扶助 support constituent evidence
```

Still unauthorized:

```text
Earth Tonggen completion
Tonggen count
Tonggen + 比肩/印綬 aggregation
```

### 5. 旺 / Yang 長生 / four-Yang 祿 通根 support — #757 / PR #760

Available:

```text
旺 bounded Tonggen
Yang 長生 bounded Tonggen
four governed non-Earth Yang 祿 bounded Tonggen
→ 通根扶助 support constituent evidence
```

Still unresolved or unauthorized:

```text
Yin 長生 support
Yin 祿 support
Earth 祿 support
Earth 餘氣 support
Tonggen count
Tonggen + 比肩/印綬 aggregation
```

Combined Tonggen verdict:

```text
MUKU_YUQI_TONGGEN_SUPPORT = AVAILABLE_RESEARCH_ONLY
WANG_YANG_CHANGSHENG_FOUR_YANG_LU_TONGGEN_SUPPORT = AVAILABLE_RESEARCH_ONLY
TONGGEN_SUPPORT_COVERAGE = INCOMPLETE
```

## Independent source-composition blockers

Even if all three support families were canonically complete, the current selected-source authority still records:

```text
dangZhongCardinalityRuleAvailable = false
biYinChongDieThresholdAvailable = false
tongGenBiYinCompositionRuleAvailable = false
```

Therefore there is currently no governed basis for any of:

```text
number of constituents required for 黨眾
numeric meaning of 重疊
how 比劫 + 印綬 + 通根 are composed
whether categories are counted once or per occurrence
whether position changes aggregation
whether a positive constituent is sufficient
whether absence implies 助寡
```

## Completeness verdict

```text
DIRECT_SOURCE_BIJIE_YINSHOU_TONGGEN_SUPPORT_CONTEXT = OBSERVED

VISIBLE_BIJIAN_SUPPORT = AVAILABLE_RESEARCH_ONLY
EXACT_JIA_YI_JIECAI_BIJIE_SUPPORT = AVAILABLE_RESEARCH_ONLY
YINSHOU_SINGLE_FACT_SUPPORT = AVAILABLE_RESEARCH_ONLY
MUKU_YUQI_TONGGEN_SUPPORT = AVAILABLE_RESEARCH_ONLY
WANG_YANG_CHANGSHENG_FOUR_YANG_LU_TONGGEN_SUPPORT = AVAILABLE_RESEARCH_ONLY

GENERAL_BIJIE_SUPPORT_COVERAGE = INCOMPLETE
GENERAL_JIECAI_TO_BIJIE_SUPPORT = UNAUTHORIZED
WHOLE_CHART_YINSHOU_SUPPORT_COVERAGE = INCOMPLETE
TONGGEN_SUPPORT_COVERAGE = INCOMPLETE
DANG_ZHONG_CARDINALITY_RULE = MISSING
BI_YIN_CHONG_DIE_THRESHOLD = MISSING
TONGGEN_BI_YIN_COMPOSITION_RULE = MISSING

SUPPORT_CONSTITUENT_SURFACE_COMPLETE_FOR_AGGREGATION = false
SUPPORT_CONSTITUENT_COLLECTION = UNAUTHORIZED
SUPPORT_CONSTITUENT_COUNT = UNAUTHORIZED
DANG_ZHONG_THRESHOLD = UNAUTHORIZED
DANG_ZHONG_BOOLEAN_RESOLVER = UNAUTHORIZED
ZHU_GUA_BOOLEAN_RESOLVER = UNAUTHORIZED
TONGGEN_PLUS_BIYIN_AGGREGATION = UNAUTHORIZED
SUPPORT_TO_QIANG_OR_BU_RUO = UNAUTHORIZED
FINAL_QIANG_RUO = UNAUTHORIZED
FINAL_WANG_SHUAI = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Why a collection is blocked

A seemingly neutral array such as:

```text
[
  visibleBijianEvidence,
  exactJiaYiJiecaiEvidence,
  yinshouEvidence,
  tonggenEvidence,
]
```

would create misleading semantics if presented as the chart's support-constituent set. Missing canonical support routes would be indistinguishable from genuine absence, and `array.length` would become an accidental support count despite the explicit lack of source cardinality rules.

Therefore this review authorizes **no collection object and no executable aggregator**.

## Pinned upstream authorities

This review pins exact version/hash identities for:

```text
#642/#644  黨眾 / 助寡 source-context observation
#645/#646  visible 比肩 support constituent
#685/#686  single-fact 印綬 support constituent
#693/#697  墓庫 / 餘氣 Tonggen support constituent
#699/#701  exact 甲/乙 劫財→比劫 support constituent
#757/#760  旺 / Yang 長生 / four-Yang 祿 Tonggen support constituent
```

No historical authority is modified.

## Explicit non-authority

Do not infer or implement:

```text
union of current outputs = complete chart support set
array length = support count
visible 比肩 + exact 甲乙 劫財 = complete 比劫
single-fact 印綬 = exhaustive whole-chart 印綬
current Tonggen adapters = exhaustive Tonggen
one constituent -> 黨眾
multiple constituents -> 黨眾
absence -> 助寡
absence -> no support
重疊 -> guessed threshold
通根 + 比印 -> generalized formula
support -> 強
support -> 不弱
support -> final 強弱 / 旺衰
support -> numeric or non-numeric strength
support -> 四柱有根 settlement
support -> GEJU_CANDIDATE
support -> GEJU_ESTABLISHMENT_STATE
Production / SKU / Commerce
```

## Executable surface

```text
EXPORTED_EXECUTABLE_FUNCTIONS = 0
```

This artifact is a completeness review only.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is modified.
