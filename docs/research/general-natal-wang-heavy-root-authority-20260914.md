# General Natal Wang heavy-root authority

Date: 2026-09-14  
Issue: #561  
Scope: `wang_four_element_heavy_root_mapping_with_earth_boundary`  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Selected source identity

`子平真詮 / 子平真詮評註`

Directly reviewed:

- `論十干得時不旺失時不弱`: https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- `論刑沖會合解法`: https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- `論陰陽生死 / 論十干十二支`: https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm

No second source tradition is merged into the executable predicate.

## Direct source authority

The selected source directly states:

```text
長生祿旺，根之重者也
```

Therefore the source-native `旺` class is directly observed as a heavy-root class.

The same selected source directly enumerates:

```text
木: 旺=卯
火: 旺=午
金: 旺=酉
水: 旺=子
```

It also states that `子午卯酉` are the five-element Wang locations. The commentary treats this doctrine at the element level rather than requiring separate Yin/Yang stem mappings.

For Earth, the selected source instead states that Earth is seasonally lodged (`寄旺於四時`). This review does not collapse that multi-season statement into one invented fixed branch.

## Canonical input

The matcher consumes exactly:

```text
StemFact.element
EarthlyBranch
```

Canonical representability is already available in `src/contracts/calculation.ts`.

The matcher does not consume:

```text
#548 Twelve-Growth stage lookup
hidden-stem membership
hidden-stem storage order
```

## Research-only executable states

```text
wang_heavy_root_established
no_governed_heavy_root_match
earth_boundary_unresolved
```

Bounded mapping:

```text
木 + 卯 -> wang_heavy_root_established
火 + 午 -> wang_heavy_root_established
金 + 酉 -> wang_heavy_root_established
水 + 子 -> wang_heavy_root_established
土 + any branch -> earth_boundary_unresolved
other non-Earth pair -> no_governed_heavy_root_match
```

Because the mapping is source-native at the five-element level, same-element Yin and Yang stems use the same governed mapping.

## Authority verdict

```text
DIRECT_SOURCE_WANG_HEAVY_ROOT_SEMANTIC                 = OBSERVED
DIRECT_SOURCE_FOUR_ELEMENT_WANG_MAPPING                = OBSERVED
DIRECT_SOURCE_FOUR_CARDINAL_WANG_SCOPE                 = OBSERVED
DIRECT_SOURCE_ELEMENT_LEVEL_NO_YINYANG_SPLIT           = OBSERVED
DIRECT_SOURCE_EARTH_JIWANG_MULTI_SEASON_BOUNDARY       = OBSERVED
EARTH_WANG_BRANCH_MAPPING                              = UNRESOLVED
NON_EARTH_WANG_HEAVY_ROOT_MATCHER                      = AUTHORIZED_RESEARCH_ONLY
COMPLETE_FIVE_ELEMENT_WANG_MAPPING                     = UNAUTHORIZED
TWELVE_GROWTH_DIWANG_TO_WANG_EQUIVALENCE              = UNAUTHORIZED
DIWANG_TO_REN_EQUIVALENCE                              = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                     = UNAUTHORIZED
```

## Source-isolation boundary

#547/#548 governs a Twelve-Growth stem×branch table selected from `命理探源`. That table is a separate source authority and is not imported into this matcher.

Therefore this composition remains forbidden:

```text
#548 帝旺 cell
-> selected-source 旺 root class
```

Likewise:

```text
帝旺 -> 刃
```

remains unauthorized.

## Explicit non-authority

This primitive does not authorize:

```text
Earth fixed Wang branch invention
hidden-stem order -> Wang/root class
Wang -> numeric root weight
Wang -> ordinary strong/weak
Wang -> generalized root-weight classifier
Wang -> GEJU candidate
Wang -> GEJU establishment
production fact emission
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

No MyeongHa interpretation composition, ProductHost, Character, Narrative, LLM prompt, API/browser exposure, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
