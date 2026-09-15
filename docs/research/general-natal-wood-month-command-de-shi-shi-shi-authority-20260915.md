# General Natal — Wood month-command 得時 / 失時 authority

Date: 2026-09-15
Issue: #638
Status: research-only bounded matcher authority

## Scope

This record governs exactly one selected-source primitive:

```text
wood_month_command_de_shi_shi_shi_matcher
```

It uses only canonical day-master stem and month-branch facts. It does not create a Season fact, a branch-to-season resolver, or a complete five-element timing table.

## Fresh-main race record

Issue #638 was created while `main` was:

```text
e6ad978abd85840ac0fec33dda7d9740ff26736a
```

Before implementation branch creation, another completed track advanced `main` to:

```text
1ae77ab3852fcecd86f11ed56c5af5e576d38211
```

The implementation branch therefore starts from exact fresh main `1ae77ab3852fcecd86f11ed56c5af5e576d38211`. No stale-base implementation was performed.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Fresh direct-source review on 2026-09-15 confirms:

```text
甲乙木生於寅卯月，為得時者旺
甲乙木生於申酉月，為失時則衰
```

The same passage also distinguishes 旺衰 from 強弱 and states that other chart positions can alter total context. Accordingly, this artifact operationalizes only the directly enumerated **month-command timing state**. The local source phrase `旺`/`衰` is recorded as source evidence but is not promoted to a final chart 旺/衰 verdict.

## Upstream authority

This artifact pins the exact version and definition hash of:

```text
#623/#624 — Wang-Shuai vs Qiang-Ruo semantic-axis authority
#628/#635 — four-element 得時 season observation authority
```

The first keeps chart-level 旺衰/強弱 classification closed. The second keeps branch-to-season and season-resolver inference closed.

This artifact does not weaken either boundary.

## Canonical representability

Current canonical contracts provide:

```text
derivedFacts.dayMaster -> StemFact
derivedFacts.dayMaster.value -> HeavenlyStem
pillars.month -> PillarFact
pillars.month.branch -> BranchFact
pillars.month.branch.value -> EarthlyBranch
```

Therefore the selected source statement can be represented directly as:

```text
dayMaster.value + month.branch.value
```

without using:

```text
Season
solarTermContext -> season
month branch -> season
hidden-stem ordering
Twelve-Growth stage
root weighting
```

Required representability verdict:

```text
CANONICAL_DAY_MASTER_STEM = AVAILABLE
CANONICAL_MONTH_BRANCH = AVAILABLE
CANONICAL_SEASON_FACT = NOT_REQUIRED
CANONICAL_SEASON_RESOLVER = NOT_REQUIRED / UNAUTHORIZED
MONTH_BRANCH_TO_SEASON_MAPPING = NOT_REQUIRED / UNAUTHORIZED
```

## Governed bounded matcher

Exactly these local timing states are governed:

```text
甲 + 寅 -> de_shi_month_observed
甲 + 卯 -> de_shi_month_observed
乙 + 寅 -> de_shi_month_observed
乙 + 卯 -> de_shi_month_observed

甲 + 申 -> shi_shi_month_observed
甲 + 酉 -> shi_shi_month_observed
乙 + 申 -> shi_shi_month_observed
乙 + 酉 -> shi_shi_month_observed
```

For 甲/乙 with every other month branch:

```text
unresolved_by_selected_source_primitive
```

This is intentionally not a negative timing verdict. The selected primitive simply does not enumerate those branches.

For every non-甲/乙 day master:

```text
outside_selected_source_scope
```

The API is month-command-specific. Same branches in year/day/hour are not admissible inputs to this primitive.

## Authority decision

```text
DIRECT_SOURCE_JIA_YI_WOOD_SCOPE = OBSERVED
DIRECT_SOURCE_YIN_MAO_DE_SHI = OBSERVED
DIRECT_SOURCE_SHEN_YOU_SHI_SHI = OBSERVED
DIRECT_SOURCE_DE_SHI_WANG_PHRASE = OBSERVED
DIRECT_SOURCE_SHI_SHI_SHUAI_PHRASE = OBSERVED
CANONICAL_DAY_MASTER_AND_MONTH_BRANCH = AVAILABLE
WOOD_MONTH_COMMAND_TIMING_MATCHER = AUTHORIZED_RESEARCH_ONLY
OTHER_MONTH_BRANCH_TIMING_STATE = UNRESOLVED
NON_WOOD_DAY_MASTER = OUTSIDE_SELECTED_SOURCE_SCOPE
YEAR_DAY_HOUR_BRANCH_MATCHER = UNAUTHORIZED
CANONICAL_SEASON_RESOLVER = UNAUTHORIZED
MONTH_BRANCH_TO_SEASON_MAPPING = UNAUTHORIZED
GENERALIZED_FIVE_ELEMENT_DE_SHI_SHI_SHI_TABLE = UNAUTHORIZED
LOCAL_DE_SHI_TO_FINAL_CHART_WANG = UNAUTHORIZED
LOCAL_SHI_SHI_TO_FINAL_CHART_SHUAI = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
ORDINARY_QIANG_RUO_CLASSIFIER = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
寅卯辰 -> 春
申酉戌 -> 秋
any complete branch -> season table
solarTermContext -> season
木 + 辰 -> 得時
木 + 戌 -> 失時
火/金/水/土 month-branch 得時/失時 by analogy
four element-season observations -> complete month matcher
same branch in year/day/hour -> month-command timing
甲/乙 + 寅/卯 -> final chart 旺
甲/乙 + 申/酉 -> final chart 衰
得時/失時 -> ordinary 強/弱
root class -> timing state
timing state -> numeric/non-numeric strength score
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
