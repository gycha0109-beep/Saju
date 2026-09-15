# General Natal — 黨眾 / 助寡 context observation authority

Date: 2026-09-15
Issue: #642
Status: research-only / observation authority

## Scope

This record governs exactly one selected-source primitive:

```text
dang_zhong_zhu_gua_context_observation
```

It preserves direct source components and context examples only. It does not create a chart-level 黨眾/助寡 resolver or an ordinary 強弱 classifier.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Fresh direct-source review on 2026-09-15 confirms:

```text
比劫印綬通根扶助為黨眾

干庚辛而支酉丑，則金之黨眾，而木之助寡

干丙丁而支巳午，則火之黨眾，木洩氣太重，雖秉令而不強也

若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也
```

These statements are authoritative as selected-source observations. They are not a complete algorithm.

## Upstream authority

This artifact pins exact version + definition hash identity for:

```text
#623/#624 — 旺衰 vs 強弱 semantic-axis authority
#638/#639 — Wood month-command 得時 / 失時 timing authority
```

#623/#624 states `黨眾 -> 強` and `助寡 -> 弱` as source-semantic observations while explicitly prohibiting a counter or chart-level classifier.

#638/#639 provides a bounded timing matcher for 甲/乙 with 寅/卯 or 申/酉, while explicitly prohibiting local timing from becoming a final 旺/衰 or 強/弱 verdict.

This artifact preserves those boundaries.

## Representability and semantic gaps

Canonical chart facts contain visible stems, visible branches, day-master identity, Ten-God facts, and hidden stems. Those facts do not settle the selected source's missing operational semantics.

The source does not define here:

```text
how many matching stems constitute 干庚辛 / 干丙丁
how many matching branches constitute 支酉丑 / 支巳午
whether every listed symbol is required
which exact pillar positions are admissible for those two examples
what numeric/cardinality threshold 重疊 means
how 通根比印 composes with visible 比印
how opposing/supporting observations settle into one chart-level 強弱 result
```

Therefore:

```text
FACT_AVAILABILITY = PARTIAL / SUFFICIENT_FOR_OBSERVATION_ONLY
DANG_ZHONG_CARDINALITY_RULE = MISSING
ZHU_GUA_CARDINALITY_RULE = MISSING
POSITIONAL_PATTERN_RULE = MISSING
BI_YIN_CHONG_DIE_THRESHOLD = MISSING
TONG_GEN_BI_YIN_COMPOSITION_RULE = MISSING
CHART_LEVEL_DANG_ZHONG_RESOLVER = UNAUTHORIZED
CHART_LEVEL_ZHU_GUA_RESOLVER = UNAUTHORIZED
```

This artifact consumes no chart facts.

## Governed observations

Exactly four immutable observations are recorded:

```text
1. 比劫 / 印綬 / 通根扶助 are source-associated with 黨眾.

2. In the stated Wood context, 干庚辛 + 支酉丑 is described as 金之黨眾 and 木之助寡.

3. In the stated Wood context, 干丙丁 + 支巳午 is described as 火之黨眾, 木洩氣太重, and 雖秉令而不強.

4. In the stated out-of-season Wood context, 比印重疊 plus 年日時支通根比印 is described as 黨眾 and 雖失時而不弱.
```

No observation is normalized into a boolean predicate.

## Authority decision

```text
DIRECT_SOURCE_DANG_ZHONG_COMPONENTS = OBSERVED
DIRECT_SOURCE_METAL_PARTY_WOOD_SUPPORT_SPARSE_EXAMPLE = OBSERVED
DIRECT_SOURCE_FIRE_PARTY_WOOD_DRAIN_EXAMPLE = OBSERVED
DIRECT_SOURCE_OUT_OF_SEASON_WOOD_PARTY_EXAMPLE = OBSERVED
DANG_ZHONG_ZHU_GUA_CONTEXT_REGISTRY = AUTHORIZED_OBSERVATION_ONLY

DANG_ZHONG_COUNTER = UNAUTHORIZED
ZHU_GUA_COUNTER = UNAUTHORIZED
DANG_ZHONG_THRESHOLD = UNAUTHORIZED
ZHU_GUA_THRESHOLD = UNAUTHORIZED
DANG_ZHONG_BOOLEAN_RESOLVER = UNAUTHORIZED
ZHU_GUA_BOOLEAN_RESOLVER = UNAUTHORIZED
POSITIONAL_PATTERN_NORMALIZATION = UNAUTHORIZED
BI_YIN_CHONG_DIE_THRESHOLD = UNAUTHORIZED
TONG_GEN_BI_YIN_COMPOSITION = UNAUTHORIZED
LOCAL_CONTEXT_TO_FINAL_QIANG_RUO = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO_CLASSIFIER = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
count >= N -> 黨眾
count < N -> 助寡
one 庚/辛 + one 酉/丑 -> 金之黨眾
all 庚辛酉丑 are mandatory -> 金之黨眾
one 丙/丁 + one 巳/午 -> 火之黨眾
all 丙丁巳午 are mandatory -> 火之黨眾
重疊 -> threshold
通根比印 -> generalized support score
root heavy/light -> 黨眾/助寡
local 得時/失時 -> final 旺/衰
source context -> final 強/弱
context -> numeric/non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production facts
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
