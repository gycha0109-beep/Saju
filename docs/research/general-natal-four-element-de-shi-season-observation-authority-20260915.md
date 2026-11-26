# General Natal — four-element 得時 season observation authority

Date: 2026-09-15
Issue: #628
Status: research-only / observation authority

## Scope

This record governs exactly one selected-source primitive:

```text
春木夏火秋金冬水為得時
```

It records four immutable element-season observations only. It does not create a season resolver, a chart-level 得時 matcher, or a 旺衰 classifier.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Fresh direct-source review on 2026-09-15 confirms the source sentence:

```text
春木夏火秋金冬水為得時
```

Therefore this artifact records exactly:

```text
木 + 春 -> source-observed 得時 pair
火 + 夏 -> source-observed 得時 pair
金 + 秋 -> source-observed 得時 pair
水 + 冬 -> source-observed 得時 pair
```

The same passage contains additional examples and surrounding context, including Wood born in specific months. Those are not silently imported into this primitive. They require separate bounded authority review because #628 is deliberately limited to the four direct element-season observations.

## Upstream authority

This artifact chains to the exact #623/#624 semantic-axis authority version and definition hash.

That upstream authority establishes only the selected source relations:

```text
得時 -> 旺
失時 -> 衰
黨眾 -> 強
助寡 -> 弱
```

and keeps chart-level 旺衰/強弱 classification unauthorized.

This artifact does not weaken that boundary.

## Canonical representability

Current canonical contracts provide:

```text
FiveElement = 목 | 화 | 토 | 금 | 수
FourPillarsFact.month -> PillarFact -> BranchFact
SolarTermContext
```

However they do not provide:

```text
canonical Season fact
canonical branch -> 春夏秋冬 resolver
canonical solar-term -> 春夏秋冬 resolver
```

Therefore:

```text
CANONICAL_FIVE_ELEMENT_IDENTITY = AVAILABLE
CANONICAL_MONTH_BRANCH = AVAILABLE
CANONICAL_SEASON_FACT = MISSING
CANONICAL_SEASON_RESOLVER = UNAUTHORIZED
EXECUTABLE_DE_SHI_MATCHER = UNAUTHORIZED
```

Fact availability is not semantic resolver authority. This research artifact consumes no chart facts.

## Earth boundary

The selected sentence enumerates:

```text
木 / 火 / 金 / 水
```

but not `土`.

That omission is not authority for:

```text
土 has no 得時 season
```

Earth therefore remains:

```text
EARTH_DE_SHI_SEASON = UNRESOLVED
```

## Authority decision

```text
DIRECT_SOURCE_FOUR_ELEMENT_DE_SHI_SEASON_PAIRS = OBSERVED
FOUR_ELEMENT_DE_SHI_SEASON_REGISTRY = AUTHORIZED_OBSERVATION_ONLY
EARTH_DE_SHI_SEASON = UNRESOLVED

CANONICAL_SEASON_RESOLVER = UNAUTHORIZED
MONTH_BRANCH_TO_SEASON_MAPPING = UNAUTHORIZED
SOLAR_TERM_TO_SEASON_MAPPING = UNAUTHORIZED
CHART_LEVEL_DE_SHI_MATCHER = UNAUTHORIZED
DE_SHI_TO_FINAL_WANG_VERDICT = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
ORDINARY_STRENGTH_CLASSIFICATION = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
寅卯辰 -> 春 or any complete branch-season table
巳午未 -> 夏
申酉戌 -> 秋
亥子丑 -> 冬
solarTermContext -> season
土 -> any 得時 season
source omission -> Earth negative verdict
four observed pairs -> complete five-element 得時 table
得時 -> final chart 旺
得時 -> ordinary 強/弱
season -> numeric/non-numeric strength score
root-heavy/root-light -> ordinary strength
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
