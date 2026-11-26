# General Natal — Four Non-Earth Yang-Stem Lu Heavy-Root Authority

Date: 2026-09-15

Issue: #579

## Scope

This research-only artifact governs exactly one bounded primitive:

```text
four_non_earth_yang_stem_lu_heavy_root_matcher
```

It does not authorize a complete ten-stem Lu table, a generalized root-weight classifier, ordinary strong/weak classification, Gyeokguk candidate/establishment, production fact emission, SKU, or Commerce behavior.

## Upstream authority chain

This artifact chains to two already-governed selected-source surfaces without rewriting them:

1. `general-natal-root-term-binding-authority.ts` (#559/#560)
   - records `祿臨官也`;
   - records bounded `甲祿於寅，乙祿於卯` evidence;
   - preserves `sourceInternalYinLuInterpretation = AMBIGUOUS`;
   - forbids consuming the separate #548 `命理探源` Twelve-Growth table as Lu input.

2. `general-natal-lu-location-observations.ts` (#569/#570)
   - records `長生祿旺，根之重者也`;
   - freezes the selected-source observation-only doctrinal Lu registry:

```text
木 -> 寅
火 -> 巳
金 -> 申
水 -> 亥
```

   - records the Earth attachment boundary rather than one fixed Earth Lu location;
   - emits no stem/day-master matcher.

## Direct selected-source evidence

Selected source:

```text
子平真詮 / 子平真詮評註
```

Reviewed sections:

- `論十干十二支 / 論陰陽生死`
- `論十干得時不旺失時不弱`

URLs:

- https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm
- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Relevant governed observations include:

```text
長生祿旺，根之重者也
祿臨官也
甲祿於寅
巳為火之祿，亥為水之祿，與午子相去一間耳。金木可以類推。
```

The same selected-source chain contains a stem-level Yin-Lu tension already frozen by #559. This artifact therefore does not promote any Yin stem to an executable Lu matcher.

## Bounded executable mapping

Exactly four non-Earth Yang stems are governed:

```text
甲 / 갑 + 寅 / 인 -> lu_heavy_root_established
丙 / 병 + 巳 / 사 -> lu_heavy_root_established
庚 / 경 + 申 / 신 -> lu_heavy_root_established
壬 / 임 + 亥 / 해 -> lu_heavy_root_established
```

For those four stems with any other branch:

```text
no_governed_lu_match
```

All other stems are outside this primitive:

```text
乙 / 을
丁 / 정
戊 / 무
己 / 기
辛 / 신
癸 / 계

-> outside_governed_yang_non_earth_scope
```

`outside_governed_yang_non_earth_scope` is not a statement that those stems lack Lu. It means only that this artifact has no authority to classify them.

## Why 戊 is excluded

The selected source treats Earth through a separate attachment doctrine and #569 freezes that boundary as:

```text
附火 -> 祿於巳
附水 -> 祿於亥
single fixed Earth Lu location -> unresolved
```

Canonical `StemFact.value + EarthlyBranch` does not independently resolve which Earth attachment path applies. Therefore 戊 is not promoted into this matcher.

## Why Yin stems are excluded

#559 explicitly preserves:

```text
SOURCE_INTERNAL_YIN_LU_INTERPRETATION = AMBIGUOUS
```

Although the selected-source surface contains bounded Yin-related material, this artifact does not resolve or overwrite that ambiguity. It therefore does not infer:

```text
乙 -> 寅
丁 -> 巳
辛 -> 申
癸 -> 亥
己 -> any fixed Lu branch
```

## Cross-tradition prohibition

The separate #547/#548 Twelve-Growth mapping is selected from `命理探源`.

This artifact does not consume:

```text
#548 臨官 cell -> selected-source 祿
```

Therefore:

```text
foreignTwelveGrowthMappingConsumedAsLuInput = false
mingliTanyuanLinguanStageAsLuInputAuthorized = false
```

## Explicit non-authority

The following remain unauthorized:

```text
Yin-stem Lu matcher
Earth-stem Lu matcher
same-element Yin stem inherits Yang-stem Lu branch
#548 臨官 -> selected-source Lu
hidden-stem order -> Lu/root class
Lu -> numeric root weight
Lu -> ordinary strong/weak
Lu -> generalized root-weight classifier
Lu -> GEJU candidate
Lu -> GEJU establishment
Lu -> production fact
```

## Authority verdict

```text
DIRECT_SOURCE_LU_HEAVY_ROOT_SEMANTIC = OBSERVED
SELECTED_SOURCE_LU_LINGUAN_TERM_BINDING = OBSERVED
SELECTED_SOURCE_NON_EARTH_LU_LOCATION_REGISTRY = AVAILABLE_OBSERVATION_ONLY
DIRECT_SOURCE_JIA_YIN_LU = OBSERVED
DIRECT_SOURCE_FIRE_WATER_LU = OBSERVED
DIRECT_SOURCE_METAL_WOOD_ANALOGY = OBSERVED
FOUR_NON_EARTH_YANG_STEM_LU_MATCHER = AUTHORIZED_RESEARCH_ONLY
YIN_STEM_LU_MATCHER = UNAUTHORIZED
EARTH_STEM_LU_MATCHER = UNAUTHORIZED
SOURCE_INTERNAL_YIN_LU_INTERPRETATION = AMBIGUOUS
#548_TWELVE_GROWTH_MAPPING_CONSUMED = false
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM prompt, API/browser product exposure, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed by this authority artifact.
