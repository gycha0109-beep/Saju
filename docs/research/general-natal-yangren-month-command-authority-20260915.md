# General Natal — Five-Yang-stem month-command Yangren matcher

Recorded: 2026-09-15
Issue: #571
Authority level: `AUTHORIZED_RESEARCH_ONLY`

## 1. Scope

This artifact governs exactly:

```text
five_yang_stem_month_command_yangren_matcher
```

The scope is deliberately narrower than an arbitrary stem-branch 刃 table.

## 2. Upstream authority

#553/#554 already governs the selected-source Yangren eligibility boundary:

```text
Yang day master -> eligible for later Yangren classification
Yin day master  -> excluded from Yangren scope
```

That upstream artifact accepts no branch and identifies no branch as 刃.

#569/#570 separately records selected-source Lu-location observations. It does not create a stem-level Lu matcher.

#547/#548 is a different selected-source Twelve-Growth table from `命理探源`; this artifact does not consume it.

## 3. Selected direct source

`子平真詮 / 子平真詮評註 — 論陽刃 / 論建祿月劫`

Directly reviewed:

- https://www.ncc.com.tw/fate/paleo/bg/bg_035.htm

The source states:

```text
祿前一位，惟五陽有之
五陽者，甲丙戊庚壬也
```

It then gives an explicit positional boundary:

```text
甲木生卯月為刃
若非卯月而乾透乙，或年日時支為卯，則應名之為劫而不名為刃
```

This means the governed semantic is **month-command-specific**. A matching branch in year/day/hour position is not automatically the same Yangren fact.

The same selected-source section supplies the remaining Yang-stem month-command evidence:

```text
丙生午月
戊生午月
辛卯、丁酉、庚午、丙子，即陽刃格
己酉、丙子、壬寅、丙午 ... 月令陽刃
```

and later states:

```text
月劫者月令逢劫也，陽干為刃，陰乾為劫
```

## 4. Governed mapping

For the **month branch only**:

```text
甲 + 卯月 -> yangren_month_command_established
丙 + 午月 -> yangren_month_command_established
戊 + 午月 -> yangren_month_command_established
庚 + 酉月 -> yangren_month_command_established
壬 + 子月 -> yangren_month_command_established
```

Canonical Korean stem/branch values used by the repository are:

```text
갑 + 묘
병 + 오
무 + 오
경 + 유
임 + 자
```

Other Yang-stem/month-branch pairs return:

```text
no_governed_yangren_month_match
```

All Yin day masters return the upstream exclusion state:

```text
excluded_by_selected_source_scope
```

## 5. Canonical input

The matcher consumes only:

```text
StemFact.value
StemFact.yinYang
pillars.month.branch
```

The implementation calls the governed #553/#554 eligibility predicate first and accepts one `EarthlyBranch` argument semantically bound to the month branch.

It does not consume:

```text
hidden-stem order
Twelve-Growth stage
#548 table
other pillar branches
```

## 6. Month-command boundary

The selected source is explicit that the same branch outside the month-command position is not automatically called 刃.

Therefore:

```text
ARBITRARY_PILLAR_YANGREN_MATCHER = UNAUTHORIZED
YEAR_DAY_HOUR_SAME_BRANCH_AS_YANGREN = UNAUTHORIZED
```

This artifact does not provide an API accepting a pillar selector or an arbitrary branch collection.

## 7. No 帝旺 bridge

The complete Twelve-Growth mapping in #547/#548 belongs to `命理探源` and explicitly does not authorize `帝旺 -> 刃`.

This matcher is governed from `子平真詮評註` source statements and examples directly. It neither imports nor queries the #548 stage map.

```text
TWELVE_GROWTH_STAGE_MAPPING_CONSUMED = false
DIWANG_TO_YANGREN_EQUIVALENCE = UNAUTHORIZED
```

## 8. No root-weight escalation

Although the root-weight research chain contains source observations involving `刃`, this issue does not equate a month-command Yangren match with a generalized heavy-root class or numeric weight.

```text
YANGREN_TO_HEAVY_ROOT_EQUIVALENCE = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
ORDINARY_STRENGTH_CLASSIFICATION = UNAUTHORIZED
```

## 9. Required verdict

```text
DIRECT_SOURCE_FIVE_YANG_SCOPE                   = OBSERVED
DIRECT_SOURCE_MONTH_COMMAND_BOUNDARY             = OBSERVED
DIRECT_SOURCE_JIA_MAO_YANGREN                    = OBSERVED
DIRECT_SOURCE_BING_WU_YANGREN                    = OBSERVED
DIRECT_SOURCE_WU_WU_YANGREN                      = OBSERVED
DIRECT_SOURCE_GENG_YOU_YANGREN                   = OBSERVED
DIRECT_SOURCE_REN_ZI_YANGREN                     = OBSERVED
CANONICAL_DAY_MASTER_AND_MONTH_BRANCH            = AVAILABLE
FIVE_YANG_MONTH_COMMAND_YANGREN_MATCHER           = AUTHORIZED_RESEARCH_ONLY
YIN_STEM_YANGREN_EXCLUSION                       = AUTHORIZED_RESEARCH_ONLY
ARBITRARY_PILLAR_YANGREN_MATCHER                 = UNAUTHORIZED
YEAR_DAY_HOUR_SAME_BRANCH_AS_YANGREN             = UNAUTHORIZED
DIWANG_TO_YANGREN_EQUIVALENCE                    = UNAUTHORIZED
#548_TWELVE_GROWTH_MAPPING_CONSUMED              = false
YANGREN_TO_HEAVY_ROOT_EQUIVALENCE                = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER               = UNAUTHORIZED
```

## 10. Explicit non-authority

Do not infer or implement:

```text
帝旺 -> 刃
#548 stage cell -> 刃
陰干 刃 mapping
same branch in year/day/hour -> month-command Yangren
Yangren month match -> numeric weight
Yangren month match -> ordinary strong/weak
Yangren month match -> generalized root-weight class
Yangren month match -> GEJU candidate
Yangren month match -> GEJU establishment
production fact emission
```

## 11. Production boundary

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
