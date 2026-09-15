# General Natal governed visible Bijian bounded left operand authority

Date: 2026-09-15  
Issue: #613  
Scope: `resolved_visible_bijian_stem_count_to_bounded_comparison_left_operand_binding`  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Selected source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Revalidated on 2026-09-15. The selected passage directly states:

```text
得一比肩，不如得支中一墓庫
得二比肩，不如得一餘氣
得三比肩，不如得一長生祿刃
干多不如根重
```

The three propositions are already preserved by #566/#568 as observation-only bounded comparisons with left operands:

```text
peer_stem_count = 1
peer_stem_count = 2
peer_stem_count = 3
```

This artifact does not execute those comparisons. It only governs how an already-canonical Ten-God fact can satisfy one of those left operands.

## Canonical input

#521/#522 already admits the repository's canonical raw-fact paths for research binding, including:

```text
derivedFacts.tenGods
```

The calculation contract is:

```text
DerivedFacts.tenGods: FactState<TenGodChartFact>

TenGodChartFact = {
  year:  { stem?: FactState<TenGod | '일간'>, ... }
  month: { stem?: FactState<TenGod | '일간'>, ... }
  day:   { stem?: FactState<TenGod | '일간'>, ... }
  hour:  { stem?: FactState<TenGod | '일간'>, ... }
}
```

Known-time calculation resolves the stem Ten-God facts. Unknown-time calculation currently emits:

```text
derivedFacts.tenGods = unavailable('birth-time-unknown')
```

Therefore this adapter consumes only the existing canonical fact. It does not derive Ten-Gods again from raw stems.

## Governed adapter

Input:

```text
FactState<TenGodChartFact>
```

Resolved-only requirements:

```text
outer derivedFacts.tenGods.status = resolved
all year/month/day/hour stem facts exist and are resolved
day.stem.value = 일간
```

Peer-count surface:

```text
count exact '비견' only in year.stem / month.stem / hour.stem
exclude day.stem self marker
ignore branch Ten-Gods
ignore hidden stems
never count '겁재' as '비견'
```

Binding:

```text
0 visible 比肩
→ no_bounded_peer_stem_operand
→ no left operand

1 visible 比肩
→ bounded_peer_stem_count_established
→ { kind: peer_stem_count, count: 1 }
→ one_peer_less_than_one_applicable_muku

2 visible 比肩
→ bounded_peer_stem_count_established
→ { kind: peer_stem_count, count: 2 }
→ two_peers_less_than_one_applicable_yuqi

3 visible 比肩
→ bounded_peer_stem_count_established
→ { kind: peer_stem_count, count: 3 }
→ three_peers_less_than_one_applicable_changsheng_lu_ren_root
```

Fail-closed states:

```text
outer tenGods ambiguous/unavailable
→ ten_god_chart_unresolved
→ no operand

any visible stem Ten-God missing/ambiguous/unavailable
→ visible_stem_facts_not_fully_resolved
→ no operand

day stem not resolved as 일간
→ day_stem_semantic_mismatch
→ no operand
```

No unresolved candidate is selected or synthesized.

## Why visible stems only

The direct selected passage states the three counts as `比肩` and frames the comparison as `干多不如根重`. The repository already represents stem-level Ten-God facts separately from branch-level Ten-God facts. This artifact therefore binds only resolved visible stem Ten-God slots.

It does not use:

```text
branch Ten-God values
hidden-stem membership
hidden-stem storage order
branch hidden-stem occurrence counts
same-element inference
same-yin-yang inference
local Ten-God recomputation
```

## Authority verdict

```text
DIRECT_SOURCE_ONE_BIJIAN_COUNT                     = OBSERVED
DIRECT_SOURCE_TWO_BIJIAN_COUNT                     = OBSERVED
DIRECT_SOURCE_THREE_BIJIAN_COUNT                   = OBSERVED
DIRECT_SOURCE_VISIBLE_STEM_CONTEXT                 = OBSERVED
CANONICAL_DERIVED_FACTS_TEN_GODS                   = AVAILABLE_RESEARCH_SUBSTRATE
VISIBLE_BIJIAN_COUNT_TO_BOUNDED_LEFT_OPERAND       = AUTHORIZED_RESEARCH_ONLY
OUTER_TEN_GOD_FACT_REQUIRES_RESOLVED               = true
VISIBLE_STEM_FACTS_REQUIRE_RESOLVED                 = true
DAY_STEM_SELF_COUNTED_AS_PEER                       = false
JIECAI_COUNTED_AS_BIJIAN                            = false
BRANCH_TEN_GOD_CONSUMED                             = false
HIDDEN_STEM_CONSUMED                                = false
UNRESOLVED_CANDIDATE_SELECTION                      = UNAUTHORIZED
CHART_LEVEL_ROOT_COMPARISON_EVALUATOR               = UNAUTHORIZED
TRANSITIVE_CLOSURE                                  = UNAUTHORIZED
GLOBAL_ROOT_RANKING                                 = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT                                 = UNAUTHORIZED
LINEAR_WEIGHT_SCALE                                 = UNAUTHORIZED
NON_NUMERIC_GENERALIZED_WEIGHTING_RULE              = UNRESOLVED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                  = UNAUTHORIZED
ORDINARY_STRENGTH_CLASSIFICATION                    = UNAUTHORIZED
```

## Explicit non-authority

This artifact does not authorize or infer:

```text
peer count -> comparison result
one peer + applicable 墓庫 -> chart-level less-than result
two peers + applicable 餘氣 -> chart-level less-than result
three peers + 長生/祿/刃 -> chart-level less-than result
bounded examples -> transitive closure
bounded examples -> global ranking
peer counts -> numeric or linear root weights
peer counts -> generalized non-numeric weighting
比肩 + 劫財 conflation
branch Ten-God -> visible peer
hidden-stem order/membership -> peer/root weight
ordinary strong/weak classification
generalized root-weight classifier
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
```

## Regression contract

Tests require:

- exact 1/2/3 visible `비견` counts bind to the three existing #568 left operands;
- zero visible `비견` emits no operand;
- `겁재` is not counted as `비견`;
- branch-level `비견` is ignored;
- the day `일간` marker is excluded from peer count;
- outer ambiguous/unavailable Ten-God facts fail closed;
- missing/unresolved visible stem facts fail closed;
- a non-`일간` day-stem semantic fails closed;
- chart-level comparison, transitivity, ranking, weighting, ordinary strength, Gyeokguk, production, and Commerce boundaries remain closed.

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
