# General Natal — governed bounded operands → source proposition binding authority

Date: 2026-09-17
Issue: #720
Status: research-only

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact governs exactly one composition primitive:

```text
governed_bounded_operands_to_selected_source_root_comparison_proposition_binding
```

It answers only whether an already-governed bounded left operand and one already-governed bounded right operand correspond to the same immutable selected-source proposition. It does not establish a context-free chart-level root ranking, numeric/non-numeric strength weight, ordinary 強弱, Gyeokguk, or Production fact.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Fresh direct review on 2026-09-17 confirms:

```text
得一比肩，不如得支中一墓庫
得二比肩，不如得一餘氣
得三比肩，不如得一長生祿刃
```

The same surrounding commentary is explicitly context-sensitive. It qualifies 餘氣 by seasonal command and also states `通根之中，尤以月令之支為最重也`. Therefore this artifact binds operands to the exact source proposition only. It does not derive a context-free universal weight scale or global ordering.

## Upstream governed authority

This artifact pins exact version/hash identities for:

```text
#566/#568 bounded source propositions
#613/#618 visible Bijian bounded left operand
#607/#609 Muku/Yuqi bounded right operands
#598/#599 Yang Changsheng bounded right operand
#594/#596 month-command Ren bounded right operand
#602/#604 four governed Yang Lu bounded right operand
```

The upstream contracts already establish only these bounded operand identities:

```text
left:
  peer_stem_count = 1 | 2 | 3

right:
  applicable_muku_root
  applicable_yuqi_root
  applicable_changsheng_lu_ren_root
```

The third right operand may be supplied only through one of the already-governed constituents:

```text
changsheng
lu
ren
```

No raw chart fact is consumed by this adapter.

## Exact composition behavior

Authorized positive bindings:

```text
peer_stem_count=1 + applicable_muku_root
-> bounded_source_proposition_bound
-> one_peer_less_than_one_applicable_muku

peer_stem_count=2 + applicable_yuqi_root
-> bounded_source_proposition_bound
-> two_peers_less_than_one_applicable_yuqi

peer_stem_count=3 + applicable_changsheng_lu_ren_root
-> bounded_source_proposition_bound
-> three_peers_less_than_one_applicable_changsheng_lu_ren_root
```

For the third proposition, the output preserves whether the governed right operand came from `changsheng`, `lu`, or `ren`.

Non-positive upstream states emit no proposition. Positive but non-corresponding operands return only:

```text
bounded_operand_proposition_mismatch
```

A mismatch is not an inverse rule and does not imply any other ordering.

## Meaning of a positive result

A positive result means only:

```text
these governed operands correspond exactly to this immutable selected-source proposition
```

It does **not** mean:

```text
a complete chart-level comparison result has been established
all roots can be globally ranked
numeric weight can be assigned
an inverse relation exists
transitive closure is valid
ordinary 強弱 / 旺衰 is resolved
黨眾 / 助寡 is resolved
```

The output therefore keeps:

```text
chartLevelComparisonResultEstablished = false
inverseComparisonEstablished = false
transitiveRankingEstablished = false
numericWeightAssigned = false
nonNumericGeneralizedWeightAssigned = false
qiangRuoEstablished = false
wangShuaiEstablished = false
```

## Canonical / runtime boundary

The adapter accepts only the existing research-only upstream evaluation objects:

```text
BijianBoundedLeftOperandEvaluation
MukuYuqiBoundedOperandEvaluation
ChangshengBoundedOperandEvaluation
YangrenBoundedRenOperandEvaluation
FourYangLuBoundedOperandEvaluation
```

It does not accept or rediscover:

```text
raw stems or branches
raw Ten-God charts
hidden stems
Twelve-Growth tables
root tables
month-command weighting
```

## Authority verdict

```text
DIRECT_SOURCE_THREE_BOUNDED_COMPARISONS = OBSERVED
UPSTREAM_BOUNDED_LEFT_OPERAND = AVAILABLE_RESEARCH_ONLY
UPSTREAM_MUKU_YUQI_RIGHT_OPERANDS = AVAILABLE_RESEARCH_ONLY
UPSTREAM_CHANGSHENG_RIGHT_OPERAND = AVAILABLE_RESEARCH_ONLY
UPSTREAM_LU_RIGHT_OPERAND = AVAILABLE_RESEARCH_ONLY
UPSTREAM_REN_RIGHT_OPERAND = AVAILABLE_RESEARCH_ONLY
BOUNDED_OPERAND_TO_SOURCE_PROPOSITION_BINDING = AUTHORIZED_RESEARCH_ONLY

RAW_CHART_FACT_CONSUMPTION = false
LOCAL_OPERAND_REDISCOVERY = false
INVERSE_COMPARISON = UNAUTHORIZED
TRANSITIVE_CLOSURE = UNAUTHORIZED
GENERALIZED_GLOBAL_ROOT_RANKING = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
LINEAR_WEIGHT_SCALE = UNAUTHORIZED
GENERALIZED_NON_NUMERIC_WEIGHTING = UNAUTHORIZED
GENERALIZED_CHART_LEVEL_ROOT_COMPARISON_EVALUATOR = UNAUTHORIZED
ORDINARY_STRENGTH_CLASSIFICATION = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI = UNAUTHORIZED
DANG_ZHONG_RESOLVER = UNAUTHORIZED
ZHU_GUA_RESOLVER = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
墓庫 > 1 peer as a numeric weight
餘氣 > 2 peers as a numeric weight
長生 / 祿 / 刃 > 3 peers as a numeric weight
1 peer < 餘氣
2 peers < 墓庫
1 or 2 peers < 長生 / 祿 / 刃
inverse comparisons from mismatch
transitive ordering among 墓庫 / 餘氣 / 長生 / 祿 / 刃
global root ranking
month-position multiplier
context-free Yuqi ranking across all seasonal states
bounded proposition -> 黨眾 / 助寡
bounded proposition -> 強 / 不弱 / final 強弱 / 旺衰
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production / SKU / Commerce
```

## Regression requirements

Tests prove:

- `1 peer + 墓庫` binds only to the first source proposition;
- `2 peers + 餘氣` binds only to the second;
- `3 peers + 長生`, `3 peers + 祿`, and `3 peers + 刃` each bind only to the third;
- mismatched positive operands fail closed without inverse inference;
- unresolved/non-positive left or right states emit no proposition;
- exact upstream versions/hashes are pinned;
- no generalized comparison, transitivity, weight scale, ordinary strength, Gyeokguk, Production, SKU, or Commerce authority is introduced.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```
