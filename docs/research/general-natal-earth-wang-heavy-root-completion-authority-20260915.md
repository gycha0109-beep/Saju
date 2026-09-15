# General Natal — Earth Wang Heavy-Root Branch-Location Completion

- Issue: #575
- Status: research-only authority completion
- Fresh-main baseline: `5e22e03a2df63db04bd8a8d0b9c67a3a54281b68`
- Upstream primitive: #561 / `general-natal-wang-heavy-root-authority.ts`

## 1. Question

#561 authorized the selected-source Wang heavy-root matcher for Wood, Fire, Metal, and Water, while Earth remained fail-closed as `earth_boundary_unresolved`.

This review asks one narrow question:

> Does the same selected source directly govern an Earth Wang **branch-location set** strongly enough to complete the research-only five-element Wang heavy-root matcher without importing the separate Twelve-Growth table or inventing an 18-day timing calculation?

## 2. Direct selected source

Selected authority remains `子平真詮 / 子平真詮評註`:

- `https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm` — `論十干得時不旺失時不弱`
- `https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm` — `論陰陽生死`

The selected source supplies all parts needed for the bounded branch-location completion:

1. Wang belongs to the source-native heavy-root class together with Changsheng and Lu.
2. 生旺墓絕 is discussed at the five-element level rather than requiring separate Yin/Yang location tables.
3. Earth Wang is distributed across the four seasonal Earth branches `辰戌丑未`.
4. The commentary describes those mixed seasonal Earth locations as Earth-Wang land.

The source also records an eighteen-day seasonal allocation for Earth. That timing statement is evidence of a finer month-command layer, not permission to create a new timing evaluator in this primitive.

## 3. Upstream boundary

#561 currently governs:

```text
木 + 卯 -> wang_heavy_root_established
火 + 午 -> wang_heavy_root_established
金 + 酉 -> wang_heavy_root_established
水 + 子 -> wang_heavy_root_established
土 + any branch -> earth_boundary_unresolved
```

The #561 artifact is intentionally preserved unchanged for audit history.

This completion imports its exact mapping and definition hash, then resolves only the Earth branch-location boundary.

## 4. Canonical representability

The executable branch-location predicate needs only:

```text
StemFact.element
EarthlyBranch
```

Both already exist in the canonical calculation contract.

The canonical snapshot also contains birth-date/time and solar-term context, but the repository does not expose a governed `人元司令` / Earth eighteen-day subperiod fact. This primitive therefore does not derive one from raw timestamps.

## 5. Authorized completion

Earth branch-location registry:

```text
土 -> 辰 / 戌 / 丑 / 未
```

Completed research-only matcher:

```text
木 + 卯 -> wang_heavy_root_established
火 + 午 -> wang_heavy_root_established
金 + 酉 -> wang_heavy_root_established
水 + 子 -> wang_heavy_root_established
土 + 辰 -> wang_heavy_root_established
土 + 戌 -> wang_heavy_root_established
土 + 丑 -> wang_heavy_root_established
土 + 未 -> wang_heavy_root_established
all other pairs -> no_governed_heavy_root_match
```

Both canonical Earth stems (`戊`, `己`) use the same Earth-element branch-location set. No polarity-specific Earth table is introduced.

## 6. Required verdict

```text
DIRECT_SOURCE_WANG_HEAVY_ROOT_SEMANTIC = OBSERVED
DIRECT_SOURCE_EARTH_FOUR_SEASON_WANG = OBSERVED
DIRECT_SOURCE_EARTH_BRANCH_SET = OBSERVED
DIRECT_SOURCE_ELEMENT_LEVEL_NO_YINYANG_SPLIT = OBSERVED
EARTH_WANG_BRANCH_LOCATION_MAPPING = AUTHORIZED_RESEARCH_ONLY
COMPLETE_FIVE_ELEMENT_WANG_HEAVY_ROOT_MATCHER = AUTHORIZED_RESEARCH_ONLY
EARTH_MONTH_COMMAND_18_DAY_TIMING_EVALUATOR = UNAUTHORIZED
EARTH_WANG_EXACT_18_DAY_SUBPERIOD_CONSUMED = false
#548_TWELVE_GROWTH_MAPPING_CONSUMED = false
TWELVE_GROWTH_DIWANG_TO_WANG_EQUIVALENCE = UNAUTHORIZED
HIDDEN_STEM_DATA_CONSUMED = false
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## 7. Explicit non-authority

This completion does **not** authorize:

```text
#548 帝旺 -> 旺 root class
帝旺 -> 刃
辰戌丑未 -> 旺 for Wood / Fire / Metal / Water
18-day 人元司令 or month-command subperiod calculation
hidden-stem order -> Wang class
Wang -> numeric weight
Wang -> ordinary strong/weak
Wang -> generalized root-weight classifier
Wang -> GEJU_CANDIDATE
Wang -> GEJU_ESTABLISHMENT_STATE
production fact emission
```

The eighteen-day source observation remains documentary evidence only and is not consumed by the executable matcher.

## 8. Regression obligations

Tests must prove:

- exact Earth set is `['진', '술', '축', '미']`;
- both `戊` and `己` match all four Earth locations;
- Earth with any other branch returns `no_governed_heavy_root_match`;
- #561 Wood/Fire/Metal/Water mappings remain unchanged;
- the four Earth branches do not become Wang branches for non-Earth elements;
- Twelve-Growth, hidden-stem, 18-day timing, numeric strength, ordinary strength, generalized root-weight, Gyeokguk, and production escalation all remain closed.

## 9. Production boundary

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM prompt, API/browser exposure, SKU, Payment, Entitlement, Refund, or Commerce behavior is part of this primitive.
