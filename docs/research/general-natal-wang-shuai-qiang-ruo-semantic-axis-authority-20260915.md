# General Natal — 旺衰 / 強弱 semantic-axis authority

Date: 2026-09-15
Issue: #623
Status: research-only / observation authority

## Scope

This record governs exactly one selected-source semantic boundary:

```text
旺衰 and 強弱 are distinct axes.
```

It does not create an ordinary strong/weak chart classifier.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

The reviewed passage directly distinguishes the four terms and states the following source relations:

```text
得時 -> 旺
失時 -> 衰
黨眾 -> 強
助寡 -> 弱
旺 and 弱 may coexist
衰 and 強 may coexist
```

The surrounding commentary is explicitly context-sensitive. It gives month command special importance while also allowing year/month/day/hour support or opposition to alter the picture. Therefore these observations must not be converted into a month-branch-only verdict or a count-based strength classifier.

## Upstream boundary

This artifact chains to the exact #530/#531 root-weight authority version and definition hash.

That upstream review already keeps the following bridge unauthorized:

```text
root weight -> ordinary strength
```

This artifact does not weaken that boundary. The selected source's nearby root discussion is not treated as permission to collapse root class into 強弱.

The separately governed #547/#548 Twelve-Growth table comes from a different selected source and is not consumed as ordinary-strength input.

## Authority decision

```text
DIRECT_SOURCE_WANG_SHUAI_QIANG_RUO_DISTINCTION = OBSERVED
DIRECT_SOURCE_DE_SHI_TO_WANG_GENERAL_RELATION = OBSERVED
DIRECT_SOURCE_SHI_SHI_TO_SHUAI_GENERAL_RELATION = OBSERVED
DIRECT_SOURCE_DANG_ZHONG_TO_QIANG_GENERAL_RELATION = OBSERVED
DIRECT_SOURCE_ZHU_GUA_TO_RUO_GENERAL_RELATION = OBSERVED
DIRECT_SOURCE_WANG_BUT_RUO_POSSIBLE = OBSERVED
DIRECT_SOURCE_SHUAI_BUT_QIANG_POSSIBLE = OBSERVED
DIRECT_SOURCE_CONTEXT_SENSITIVITY = OBSERVED

WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_REGISTRY = AUTHORIZED_OBSERVATION_ONLY
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO_CLASSIFIER = UNAUTHORIZED
DANG_ZHONG_COUNTER = UNAUTHORIZED
ZHU_GUA_COUNTER = UNAUTHORIZED
ROOT_CLASS_TO_QIANG_RUO_EQUIVALENCE = UNAUTHORIZED
TWELVE_GROWTH_STAGE_TO_ORDINARY_STRENGTH = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
ORDINARY_STRENGTH_CLASSIFICATION = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Canonical-input boundary

No chart facts are consumed by this authority artifact.

The repository has canonical day-master, pillar, Ten-God, hidden-stem-membership, and structural-relation facts, but factual representability does not establish the missing semantic resolver for:

```text
得時 / 失時
黨眾 / 助寡
final 旺衰
final 強弱
```

The current General Natal source-condition frontier therefore remains correct in keeping day-master flourishing classification unavailable.

## Explicit non-authority

Do not derive or implement:

```text
month branch alone -> final 旺/衰
peer/resource/root count -> final 強/弱
黨眾 or 助寡 -> numeric threshold
heavy/light root -> ordinary strong/weak
bounded root comparison -> ordinary strong/weak
#548 Twelve-Growth stage -> ordinary strong/weak
hidden-stem storage order -> strength
numeric or nonnumeric strength score
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
