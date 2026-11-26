# General Natal — Yang Changsheng to Bounded Root-Comparison Operand Authority

Date: 2026-09-15

Issue: #598

## Scope

This research-only artifact governs exactly one semantic bridge:

```text
yang_changsheng_to_bounded_changsheng_root_comparison_operand_binding
```

It admits an already-governed Yang-Changsheng result from #549/#551 as the `長生` constituent of the existing #566/#568 bounded comparison operand.

It does not create a second Changsheng matcher, reopen the Yin-Changsheng exception, execute a chart-level comparison, rank roots, assign numeric weight, derive Gyeokguk, or emit production facts.

## Upstream authority chain

### #549 / #551 — Changsheng heavy-root clause

The selected source directly states:

```text
長生祿旺，根之重者也
```

and immediately preserves the Yin exception:

```text
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣
```

#551 governs exactly these research-only states:

```text
Yang Changsheng -> established
Yin Changsheng  -> excluded_by_yin_exception
non-Changsheng  -> not_applicable
```

The Yin state excludes only the source-native heavy-root-by-長生 clause. It does not classify Yin Changsheng as light root, no root, or 餘氣.

### #566 / #568 — bounded comparison observation

The same selected-source family directly states:

```text
得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類
```

#566/#568 preserves that statement as an observation-only proposition:

```text
three_peers_less_than_one_applicable_changsheng_lu_ren_root
```

whose right operand is:

```text
applicable_changsheng_lu_ren_root
```

That artifact explicitly keeps chart-level comparison evaluation, transitive closure, generalized global ranking, numeric weighting, and generalized root-weight classification unauthorized.

### #594 / #596 — sibling Ren constituent

#594/#596 separately admits an already-governed month-command Yangren result as only the `刃` constituent of the same bounded operand.

That sibling bridge does not alter Changsheng authority and is not consumed as Changsheng evidence.

## Direct selected-source bridge

Selected source:

```text
子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱
```

Reviewed transcriptions:

- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- https://ctext.org/wiki.pl?chapter=974137&if=en

Relevant governed observations are:

```text
長生祿旺，根之重者也
得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣
```

The source therefore places `長生` directly inside the bounded comparison operand and separately supplies the heavy-root semantic plus the explicit Yin exception already governed by #551.

No additional source-table composition is needed for this bridge.

## Bounded executable adapter

The adapter accepts only an upstream `ChangshengHeavyRootClauseEvaluation` produced under #551.

It does not accept raw stem/branch inputs and does not call the Twelve-Growth mapping locally.

```text
heavyRootByChangshengClause = established
  -> applicable_bounded_changsheng_root_operand

heavyRootByChangshengClause = not_applicable
  -> not_applicable_bounded_changsheng_root_operand

heavyRootByChangshengClause = excluded_by_yin_exception
  -> excluded_by_yin_changsheng_exception
```

Only the positive state carries:

```text
boundedOperandKind = applicable_changsheng_lu_ren_root
```

This is operand admission only. It does not execute the proposition.

## Why Yin Changsheng remains excluded

The selected source explicitly says:

```text
陰長生不作此論
```

#551 already governs that sentence as an executable exclusion from the Changsheng heavy-root clause.

This artifact therefore cannot use the later grouped phrase `長生祿刃` to erase that earlier explicit exception.

Accordingly:

```text
YIN_CHANGSHENG_TO_BOUNDED_OPERAND = UNAUTHORIZED
```

and the following remain unauthorized:

```text
Yin Changsheng -> bounded Changsheng operand
Yin Changsheng -> light root
Yin Changsheng -> no root
Yin Changsheng -> 餘氣
```

## No local Twelve-Growth rediscovery

The upstream #551 evaluation already includes the governed stage result.

This adapter does not import or invoke the Twelve-Growth mapping and does not create another stem-branch stage table.

Therefore:

```text
upstreamChangshengEvaluationConsumed = true
rawChartFactsConsumed = false
localTwelveGrowthRediscoveryAuthorized = false
twelveGrowthStageMappingConsumedDirectly = false
```

## Comparison boundary

The adapter does not accept a peer-stem count or a chart snapshot.

It therefore cannot emit:

```text
three peers < one Changsheng
```

as a chart-level fact.

The following remain unauthorized:

```text
peer-count evaluator
chart-level root comparison evaluator
transitive closure
global root ranking
numeric root weight
linear weight scale
ordinary strong/weak classification
generalized root-weight classifier
GEJU candidate
GEJU establishment
production fact
```

## Authority verdict

```text
DIRECT_SOURCE_THREE_PEERS_LESS_THAN_CHANGSHENG_LU_REN = OBSERVED
DIRECT_SOURCE_CHANGSHENG_HEAVY_ROOT_SEMANTIC = OBSERVED
DIRECT_SOURCE_YIN_CHANGSHENG_EXCEPTION = OBSERVED
UPSTREAM_CHANGSHENG_EVALUATOR = AVAILABLE_RESEARCH_ONLY
UPSTREAM_BOUNDED_COMPARISON_OPERAND = AVAILABLE_OBSERVATION_ONLY
YANG_CHANGSHENG_TO_BOUNDED_OPERAND = AUTHORIZED_RESEARCH_ONLY
YIN_CHANGSHENG_TO_BOUNDED_OPERAND = UNAUTHORIZED
LOCAL_TWELVE_GROWTH_REDISCOVERY = UNAUTHORIZED
PEER_COUNT_CONSUMPTION = false
CHART_LEVEL_ROOT_COMPARISON_EVALUATOR = UNAUTHORIZED
TRANSITIVE_CLOSURE = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
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

No MyeongHa composition, ProductHost, Character, Narrative, LLM prompt, API/browser product exposure, SKU, Payment, Entitlement, Refund, or Commerce behavior changes under this authority artifact.
