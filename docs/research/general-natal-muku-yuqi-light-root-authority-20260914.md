# General Natal Muku/Yuqi light-root authority

Date: 2026-09-14
Issue: #557

Scope: `muku_yuqi_four_element_light_root_mapping_with_earth_boundary`
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Selected source

`子平真詮 / 子平真詮評註`

- `論十干得時不旺失時不弱`: https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- `論陰陽生死`: https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm

The source authority chain directly states the light-root semantic `墓庫餘氣，根之輕者也`. Xu Lewu's commentary directly enumerates the four non-Earth element mappings:

```text
木: 墓庫=未, 餘氣=辰
火: 墓庫=戌, 餘氣=未
金: 墓庫=丑, 餘氣=戌
水: 墓庫=辰, 餘氣=丑
```

The same selected commentary states that these classes cannot simply be interchanged, treats 墓 at the element level without a Yin/Yang split, and states `土為本氣，無所謂庫`.

## Canonical input and executable boundary

The matcher consumes exactly:

```text
StemFact.element
EarthlyBranch
```

It does not consume `derivedFacts.hiddenStems.*`, hidden-stem membership, or hidden-stem array order. The existing hidden-stem dataset remains membership-only, and its canonical array order remains storage order only.

Research-only output states:

```text
muku_light_root_established
yuqi_light_root_established
no_governed_light_root_match
earth_boundary_unresolved
```

For `土`, every branch returns `earth_boundary_unresolved`. This is deliberate fail-closed behavior: the selected source rejects a 土 墓庫 in this framing, but does not directly govern a complete 土 餘氣 mapping.

## Authority verdict

```text
DIRECT_SOURCE_MUKU_YUQI_LIGHT_ROOT_SEMANTIC      = OBSERVED
DIRECT_SOURCE_FOUR_ELEMENT_MUKU_MAPPING           = OBSERVED
DIRECT_SOURCE_FOUR_ELEMENT_YUQI_MAPPING           = OBSERVED
DIRECT_SOURCE_ELEMENT_LEVEL_NO_YINYANG_SPLIT      = OBSERVED
DIRECT_SOURCE_EARTH_MUKU_NON_APPLICABILITY        = OBSERVED
EARTH_YUQI_MAPPING                                = UNRESOLVED
NON_EARTH_MUKU_YUQI_MATCHER                       = AUTHORIZED_RESEARCH_ONLY
COMPLETE_FIVE_ELEMENT_MUKU_YUQI_MAPPING            = UNAUTHORIZED
TWELVE_GROWTH_MU_TO_MUKU_EQUIVALENCE              = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                 = UNAUTHORIZED
```

## Explicit non-authority

This primitive does not authorize:

```text
hidden-stem array order -> 餘氣
hidden-stem membership -> complete root class
十二長生 墓 -> 墓庫
土 餘氣 mapping invention
墓庫/餘氣 -> numeric weight
light-root -> ordinary strong/weak
root-weight -> GEJU candidate
root-weight -> GEJU establishment
production fact emission
```

No hidden-stem matcher or 十二長生 table is imported into the executable predicate.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

This artifact advances only the four-element 墓庫/餘氣 research primitive. It does not complete the generalized root-weight classifier or any production Gyeokguk authority.
