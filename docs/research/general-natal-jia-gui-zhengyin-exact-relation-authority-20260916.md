# General Natal — 甲/癸 正印 exact-relation authority

Date: 2026-09-16  
Issue: #662  
Scope: `jia_day_master_gui_visible_stem_to_zhengyin_exact_relation_observation`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact governs exactly one literal selected-source stem relation:

```text
甲 day master + 癸 visible counterpart stem -> source relation 正印
```

It does not establish a general 正印 resolver or a canonical Korean Ten-God alias.

## Selected direct source

```text
子平真詮 / 子平真詮評註
二十三、論宮分用神配六親
https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm
```

Fresh direct review on 2026-09-16 anchors the commentary sentence:

```text
偏財為母之正夫者，譬如甲以癸為正印，戊為偏財，戊癸合也；丙以乙為正印，庚為偏財，乙庚合也。餘可類推。
```

The exact clause governed here is:

```text
甲以癸為正印
```

The same source sentence also mentions `丙以乙為正印` and says `餘可類推`, but those statements are deliberately not operationalized by this issue. This keeps the first implementation primitive literal and non-generalizing.

## Upstream authority

#655/#661 established only a source-side observation that the 正/偏 variants of 印 are treated together under the 印綬 discussion. Its definition hash and version are imported directly by the implementation.

That upstream artifact explicitly did **not** authorize:

```text
canonical 정인 -> 正印
canonical 편인 -> 偏印
runtime 印綬 resolver
印綬 support counting
黨眾/助寡
ordinary 強弱
```

This exact-pair artifact preserves those boundaries.

## Canonical representability

Current canonical raw facts expose:

```text
derivedFacts.dayMaster -> StemFact.value -> HeavenlyStem
pillars.*.stem          -> StemFact.value -> HeavenlyStem
```

`HeavenlyStem` contains both `갑` and `계`, and the existing canonical-input binding review governs the raw paths `derivedFacts.dayMaster` and `pillars.*.stem`.

Therefore:

```text
EXACT_JIA_GUI_PAIR = REPRESENTABLE
```

No canonical Ten-God value is required or consumed.

## Bounded evaluator

Input:

```ts
{
  dayMaster: HeavenlyStem;
  visibleCounterpartStem: HeavenlyStem;
}
```

Only this pair matches:

```text
갑 + 계 -> jia_gui_zhengyin_relation_observed
```

Every other pair returns:

```text
outside_selected_source_pair_scope
```

The evaluator does not scan pillars. The caller must supply one already-selected **visible stem**.

## Explicit non-authority

The following remain unauthorized:

```text
canonical 정인 == source 正印
canonical 편인 == source 偏印
generalized 正印 resolver
opposite-polarity resource relation -> 正印
丙 + 乙 -> 正印 under this issue
餘可類推 -> full ten-stem table
canonical Ten-God recomputation
whole-chart 正印 scan
hidden-stem 正印 recognition
branch Ten-God consumption
正印 -> runtime 印綬 constituent
正印 count -> 黨眾
absence of 正印 -> 助寡
正印 -> final 強
numeric or nonnumeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts / SKU / Commerce
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

No production consumer, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
