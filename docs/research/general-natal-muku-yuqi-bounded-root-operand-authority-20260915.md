# General Natal governed Muku/Yuqi bounded operand authority

Date: 2026-09-15  
Issue: #607  
Scope: `governed_muku_yuqi_light_root_to_bounded_comparison_operand_binding`  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Selected source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Revalidated on 2026-09-15. The selected source directly states:

```text
墓庫餘氣，根之輕者也
得一比肩，不如得支中一墓庫
得二比肩，不如得一餘氣
```

The same passage directly enumerates the four non-Earth 墓庫/餘氣 mappings already governed by #557/#558.

## Upstream executable authority

#557/#558 already governs one research-only evaluation type:

```text
MukuYuqiLightRootEvaluation
```

with states:

```text
muku_light_root_established
yuqi_light_root_established
no_governed_light_root_match
earth_boundary_unresolved
```

and mappings:

```text
木: 墓庫=未, 餘氣=辰
火: 墓庫=戌, 餘氣=未
金: 墓庫=丑, 餘氣=戌
水: 墓庫=辰, 餘氣=丑
```

Earth remains fail-closed. The selected source states `土為本氣，無所謂庫`, while a complete Earth 餘氣 mapping is not directly governed.

#566/#568 separately records the following immutable observation-only propositions:

```text
one_peer_less_than_one_applicable_muku
  right.kind = applicable_muku_root

two_peers_less_than_one_applicable_yuqi
  right.kind = applicable_yuqi_root
```

It does not authorize chart-level comparison execution.

## Governed adapter

This artifact accepts only an already-governed #558 `MukuYuqiLightRootEvaluation`.

```text
muku_light_root_established
  -> applicable_bounded_muku_root_operand
  -> applicable_muku_root

yuqi_light_root_established
  -> applicable_bounded_yuqi_root_operand
  -> applicable_yuqi_root

no_governed_light_root_match
  -> not_applicable_bounded_light_root_operand
  -> no bounded operand

earth_boundary_unresolved
  -> earth_boundary_unresolved
  -> no bounded operand
```

The adapter does not accept raw day-master/branch inputs and contains no local 墓庫/餘氣 mapping table.

## Authority verdict

```text
DIRECT_SOURCE_ONE_PEER_LESS_THAN_MUKU              = OBSERVED
DIRECT_SOURCE_TWO_PEERS_LESS_THAN_YUQI             = OBSERVED
DIRECT_SOURCE_MUKU_YUQI_LIGHT_ROOT_SEMANTIC        = OBSERVED
UPSTREAM_MUKU_YUQI_EVALUATOR                       = AVAILABLE_RESEARCH_ONLY
UPSTREAM_BOUNDED_OPERANDS                          = AVAILABLE_OBSERVATION_ONLY
GOVERNED_MUKU_TO_BOUNDED_OPERAND                   = AUTHORIZED_RESEARCH_ONLY
GOVERNED_YUQI_TO_BOUNDED_OPERAND                   = AUTHORIZED_RESEARCH_ONLY
EARTH_YUQI_MAPPING                                 = UNRESOLVED
RAW_STEM_BRANCH_REDISCOVERY                        = UNAUTHORIZED
HIDDEN_STEM_CONSUMED                               = false
TWELVE_GROWTH_MU_CONSUMED                          = false
PEER_COUNT_CONSUMED                                = false
CHART_LEVEL_ROOT_COMPARISON_EVALUATOR              = UNAUTHORIZED
TRANSITIVE_CLOSURE                                 = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT                                = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                 = UNAUTHORIZED
```

## Explicit non-authority

This artifact does not authorize or infer:

```text
raw stem/branch -> local 墓庫/餘氣 rediscovery
hidden-stem array order -> 餘氣
hidden-stem membership -> root class
十二長生 墓 -> 墓庫
土 餘氣 mapping
Earth boundary -> no root
one peer < 墓庫 as a chart-level fact
two peers < 餘氣 as a chart-level fact
peer-count evaluator
numeric / linear / transitive / global root ranking
ordinary strong/weak classification
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
```

## Regression contract

Tests require:

- all four governed non-Earth 墓庫 positives bind only to `applicable_muku_root`;
- all four governed non-Earth 餘氣 positives bind only to `applicable_yuqi_root`;
- a governed nonmatch carries no operand;
- Earth remains `earth_boundary_unresolved` and carries no operand;
- the adapter consumes one upstream evaluation object only;
- hidden-stem, 十二長生, peer-count, chart-comparison, transitivity, numeric/global ranking, Gyeokguk, and production boundaries remain closed.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed by this artifact.
