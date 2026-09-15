# General Natal — 印綬 正/偏 source-category authority

Date: 2026-09-16  
Issue: #655  
Scope: `yinshou_zheng_pian_source_category_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact narrows the source-side meaning of `印綬`. It does not create a canonical Ten-God mapping or an executable support rule.

## Exact fresh implementation base

```text
8e19d8ada3557fc2dd1788ed2f0a3035a3a5eda4
```

## Selected direct source

```text
子平真詮 / 子平真詮評註
三十五、論印綬
https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm
```

Fresh direct review on 2026-09-16 confirms:

```text
印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。
```

The source therefore treats the 正/偏 variants of 印 together within the 印綬 discussion and the same 格-level treatment.

That observation is stronger than merely seeing the word `印綬`, but it remains source-side terminology. It does not by itself establish the runtime identity of the project's Korean canonical `정인` and `편인` enum values.

## Upstream authority

#642/#644 already preserves:

```text
比劫印綬通根扶助為黨眾
```

as observation-only authority.

It explicitly leaves 印綬 canonical mapping, support counting, thresholds, 黨眾/助寡 resolution, final 強弱, strength scalars, Gyeokguk, and Production unauthorized.

This artifact pins that exact upstream version/hash and narrows only one question:

```text
What does the selected source itself include in the 印綬 discussion?
```

Answer supported by the direct source:

```text
正/偏 variants of 印 are treated together.
```

## Canonical-input representability

No canonical chart input is needed for an observation-only source-category registry.

```text
CANONICAL_INPUT_REQUIRED = false
CHART_FACTS_CONSUMED = false
TEN_GOD_FACTS_CONSUMED = false
STEM_FACTS_CONSUMED = false
BRANCH_FACTS_CONSUMED = false
HIDDEN_STEM_FACTS_CONSUMED = false
CANONICAL_REPRESENTABILITY = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

The following bridge remains deliberately unresolved:

```text
canonical 정인 -> source 正印 ?
canonical 편인 -> source 偏印 ?
source 正印/偏印 -> runtime 印綬 constituent ?
```

## Governed observation

Exactly one immutable observation is recorded:

```text
sourceCategory = 印綬
sourceVariantAxis = 正偏
zhengPianVariantsGroupedTogether = true
sameGejuTreatmentObserved = true
canonicalMappingAuthorized = false
```

No function accepts chart facts, canonical Ten-God values, stems, branches, hidden stems, or counts.

## Explicit non-authority

The following remain unauthorized:

```text
canonical 정인 == source 正印
canonical 편인 == source 偏印
canonical 정인/편인 -> 印綬 runtime constituent
any Ten-God presence -> 印綬
정인 + 편인 count
one 印 -> 黨眾
absence of 印 -> 助寡
印綬 -> 強
source category observation -> ordinary strength
numeric or non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
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
