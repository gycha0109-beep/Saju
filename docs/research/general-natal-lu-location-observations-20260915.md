# General Natal — Four-element Lu-location observations with Earth attachment boundary

Recorded: 2026-09-15
Issue: #569
Authority level: `AUTHORIZED_OBSERVATION_ONLY`

## 1. Scope

This artifact governs only:

```text
four_element_lu_location_observations_with_earth_attachment_boundary
```

It does not create a stem/day-master Lu matcher and does not emit a heavy-root classification.

## 2. Upstream authority

This review chains to:

- #530/#531 root-weight primitive authority review;
- #559/#560 selected-source Lu/Linguan term binding.

The upstream Lu/Linguan artifact already establishes:

```text
祿臨官也 = observed in selected source
Lu heavy-root semantic = observed upstream
source-internal Yin-Lu interpretation = AMBIGUOUS
selected-source complete Lu branch matcher = unauthorized
#548 mapping as Lu input = forbidden cross-tradition composition
```

Those boundaries remain unchanged.

## 3. Selected direct source

`子平真詮 / 子平真詮評註`

Directly reviewed:

- https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm
- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Relevant passages include:

```text
長生祿旺，根之重者也
祿臨官也
寅申巳亥，稱為四生（亦是四祿）之地
巳為火之祿，亥為水之祿，與午子相去一間耳。金木可以類推。
甲祿於寅，乙祿於卯
土居中央，寄於四隅。附火而生，生於寅，祿於巳；附水而生，生於申，祿於亥。
```

## 4. Why this is observation-only

The same selected source contains two surfaces that must not be silently collapsed:

1. a five-element doctrinal discussion in which the four corner branches are treated as `四祿` and Fire/Water Lu positions are directly named with Metal/Wood to be inferred analogically;
2. stem-level examples such as `甲祿於寅，乙祿於卯`, plus a preserved forward/reverse table surface.

#559/#560 already governed that stem-level Yin-Lu interpretation as `AMBIGUOUS`.

Therefore this artifact records a doctrinal location registry only. It does not claim that every Yin/Yang stem of an element takes the same Lu branch.

## 5. Governed non-Earth doctrinal registry

```text
木 -> 寅
火 -> 巳
金 -> 申
水 -> 亥
```

Evidence character differs by element and is recorded explicitly:

```text
木 -> bounded 甲祿於寅 anchor + selected-source five-element/four-Lu doctrine
火 -> direct 巳為火之祿
金 -> selected-source 金木可以類推 + four-Lu scope + remaining corner
水 -> direct 亥為水之祿
```

This registry is an immutable source observation surface, not an executable chart interpretation rule.

## 6. Earth boundary

The selected source does not give one context-free Earth Lu location.

It instead records:

```text
附火 -> 祿於巳
附水 -> 祿於亥
```

and separately describes Earth as central and attached among the four corners.

The current canonical input pair `FiveElement + EarthlyBranch` does not contain a governed selector that determines which Earth attachment doctrine applies.

Therefore:

```text
EARTH_SINGLE_LU_LOCATION = UNRESOLVED
EARTH_ATTACHMENT_SELECTION_RULE = UNAUTHORIZED
```

The implementation preserves both source observations and refuses to invent a single Earth Lu branch.

## 7. Cross-tradition isolation

#547/#548 governs a complete Twelve-Growth table from `命理探源`.

That table remains a different selected-source authority and is not consumed here.

Forbidden composition:

```text
#548 臨官 cell
+ selected-source 祿臨官也
-> selected-source complete Lu matcher
```

This artifact does not import or call the #548 mapping.

## 8. Explicit non-authority

The following remain unauthorized:

```text
same-element Yin/Yang stem -> same Lu branch
乙 -> 寅
辛 -> 申
丁 -> 巳
癸 -> 亥
土 -> one fixed Lu branch
canonical Earth element+branch -> attachment selection
#548 Twelve-Growth stage -> selected-source Lu
Lu doctrinal location -> stem/day-master heavy-root match
Lu location -> numeric weight
Lu location -> ordinary strong/weak
Lu location -> GEJU candidate
Lu location -> GEJU establishment
Lu location -> production fact
```

## 9. Required verdict

```text
DIRECT_SOURCE_LU_HEAVY_ROOT_SEMANTIC             = OBSERVED
DIRECT_SOURCE_LU_LINGUAN_TERM_EQUIVALENCE        = OBSERVED
DIRECT_SOURCE_FOUR_LU_LOCATION_SCOPE              = OBSERVED
DIRECT_SOURCE_FIRE_LU_LOCATION                    = OBSERVED
DIRECT_SOURCE_WATER_LU_LOCATION                   = OBSERVED
DIRECT_SOURCE_METAL_WOOD_ANALOGY                  = OBSERVED
DIRECT_SOURCE_EARTH_MULTI_ATTACHMENT_BOUNDARY     = OBSERVED
FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_REGISTRY       = AUTHORIZED_OBSERVATION_ONLY
EARTH_SINGLE_LU_LOCATION                          = UNRESOLVED
EARTH_ATTACHMENT_SELECTION_RULE                   = UNAUTHORIZED
SOURCE_INTERNAL_YIN_LU_INTERPRETATION             = AMBIGUOUS
STEM_LEVEL_LU_BRANCH_MATCHER                      = UNAUTHORIZED
LU_HEAVY_ROOT_STEM_MATCHER                        = UNAUTHORIZED
#548_TWELVE_GROWTH_MAPPING_AS_LU_INPUT            = FORBIDDEN_CROSS_TRADITION
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                = UNAUTHORIZED
```

## 10. Production boundary

No production authority changes.

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is touched.
