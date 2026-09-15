# General Natal — four governed Yang Lu bounded operand authority

Date: 2026-09-15  
Issue: #602  
Status: research-only authority  
Production authority: BLOCKED

## Question

Can an already-governed #590 Lu heavy-root evaluation for the four non-Earth Yang stems satisfy only the `祿` constituent of #566/#568's observation-only `applicable_changsheng_lu_ren_root` operand without widening Lu matching or executing a chart-level root comparison?

## Fresh baseline and duplicate audit

Issue creation baseline:

```text
main = 54a5a5b46ca6589573c92bc8a6377b60973277de
```

Fresh issue, PR, branch, and code searches found no dedicated authority for:

```text
Lu bounded operand
bounded_lu_root_operand
#590 FourYangLuHeavyRootEvaluation -> #566 Lu constituent
```

Historical #594/#596 covers only the `刃` constituent. #598/#599 covers only the `長生` constituent.

## Selected direct source

Selected semantic source:

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
https://ctext.org/wiki.pl?chapter=974137&if=en
```

Directly revalidated on 2026-09-15.

Relevant source statements:

```text
長生祿旺，根之重者也
得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類
```

The source therefore places `祿` directly inside both the heavy-root sentence and the bounded comparison operand. This artifact does not derive Lu locations from those sentences. Location and stem matching remain the responsibility of the already-governed #579/#590 authority.

## Upstream executable authority

#590 governs exactly:

```text
甲 / 갑 + 寅 / 인 -> lu_heavy_root_established
丙 / 병 + 巳 / 사 -> lu_heavy_root_established
庚 / 경 + 申 / 신 -> lu_heavy_root_established
壬 / 임 + 亥 / 해 -> lu_heavy_root_established
```

For those four stems with other branches:

```text
no_governed_lu_match
```

For Yin stems and Earth stems:

```text
outside_governed_yang_non_earth_scope
```

#590 also preserves:

```text
SOURCE_INTERNAL_YIN_LU_INTERPRETATION = AMBIGUOUS
YIN_STEM_LU_MATCHER = UNAUTHORIZED
EARTH_STEM_LU_MATCHER = UNAUTHORIZED
FOREIGN_TWELVE_GROWTH_MAPPING_CONSUMED_AS_LU_INPUT = false
HIDDEN_STEM_DATA_CONSUMED = false
```

This artifact consumes that evaluation. It does not repeat its matcher.

## Upstream bounded observation

#566/#568 stores exactly the source proposition:

```text
3 peer stems
source_stated_less_than
1 applicable_changsheng_lu_ren_root
```

That registry is observation-only. It does not accept chart facts and does not export a chart-level evaluator.

The new binding identifies only:

```text
propositionId = three_peers_less_than_one_applicable_changsheng_lu_ren_root
operandKind   = applicable_changsheng_lu_ren_root
constituent   = lu
```

## Adapter contract

Input:

```text
FourYangLuHeavyRootEvaluation
```

No raw stem, branch, hidden-stem array, Twelve-Growth stage, peer count, ordinary strength, or Gyeokguk state is accepted by the adapter.

Output states:

```text
lu_heavy_root_established
  -> applicable_bounded_lu_root_operand
     boundedOperandKind = applicable_changsheng_lu_ren_root

no_governed_lu_match
  -> not_applicable_bounded_lu_root_operand
     boundedOperandKind = null

outside_governed_yang_non_earth_scope
  -> outside_governed_lu_scope
     boundedOperandKind = null
```

The final state does not assert that excluded stems have no Lu. It means only that this bounded bridge has no selected-source authority to admit them.

## Verdict

```text
DIRECT_SOURCE_THREE_PEERS_LESS_THAN_CHANGSHENG_LU_REN = OBSERVED
DIRECT_SOURCE_LU_HEAVY_ROOT_SEMANTIC = OBSERVED
UPSTREAM_FOUR_YANG_LU_EVALUATOR = AVAILABLE_RESEARCH_ONLY
UPSTREAM_BOUNDED_COMPARISON_OPERAND = AVAILABLE_OBSERVATION_ONLY
FOUR_GOVERNED_YANG_LU_TO_BOUNDED_OPERAND = AUTHORIZED_RESEARCH_ONLY
YIN_STEM_LU_TO_BOUNDED_OPERAND = UNAUTHORIZED
EARTH_STEM_LU_TO_BOUNDED_OPERAND = UNAUTHORIZED
SOURCE_INTERNAL_YIN_LU_INTERPRETATION = AMBIGUOUS
LOCAL_LU_REDISCOVERY = UNAUTHORIZED
FOREIGN_TWELVE_GROWTH_MAPPING_CONSUMED = false
HIDDEN_STEM_CONSUMED = false
PEER_COUNT_CONSUMED = false
CHART_LEVEL_ROOT_COMPARISON_EVALUATOR = UNAUTHORIZED
TRANSITIVE_CLOSURE = UNAUTHORIZED
GENERALIZED_GLOBAL_ROOT_RANKING = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
LINEAR_WEIGHT_SCALE = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## Why this does not widen Lu authority

This adapter receives only the result of #590. Therefore it cannot decide a new Lu location and cannot turn a non-governed stem into a Lu match.

In particular, it does not authorize:

```text
乙 / 丁 / 己 / 辛 / 癸 Lu branches
戊 or 己 Earth Lu branch
Earth 附火 / 附水 attachment selection
same-element Yin inheritance from a governed Yang Lu branch
```

The #559 Yin-Lu ambiguity remains intact.

## Cross-tradition boundary

#548 `命理探源` Twelve-Growth mapping is not consumed here. `臨官` cells from that table cannot be converted into selected-source Lu input through this adapter.

The bridge also consumes no hidden-stem order. Hidden-stem storage position remains neither Lu authority nor root-weight authority.

## Comparison boundary

Admission to the right operand is not execution of the comparison.

This artifact does not accept the source's left-side peer count and cannot emit:

```text
three peers < this Lu root
```

as a chart fact. It only says that a #590-positive Lu result is eligible for the `祿` constituent of the already-stored observation operand.

No transitive closure, global ranking, numeric score, multiplier, linear scale, percentage, or ordinary strong/weak threshold follows.

## Tests

Regression coverage proves:

- `갑+인`, `병+사`, `경+신`, `임+해` are admitted only after #590 establishes Lu heavy root;
- representative mismatches remain non-applicable;
- all five Yin stems and Earth Yang `무` remain outside governed Lu scope;
- source-internal Yin-Lu ambiguity remains `AMBIGUOUS`;
- no raw chart facts, #548 mapping, hidden stems, or peer counts are consumed by the adapter;
- chart-level comparison, transitivity, global ranking, numeric weighting, ordinary strength, generalized root-weight classification, Gyeokguk candidate/establishment, and production emission remain unauthorized.

## Explicit non-authority

```text
Yin-stem Lu matcher
Earth-stem Lu matcher
Earth Lu attachment selector
raw stem/branch -> Lu rediscovery in this adapter
#548 臨官 -> selected-source Lu
hidden-stem order -> Lu/root class
three peers < Lu as chart result
peer-count evaluator
transitive or global root ranking
numeric / linear root weighting
ordinary strong/weak classification
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
```

## Product / Commerce invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior changes.

## Change surface

Exactly three new research-only files:

```text
src/research/general-natal-four-yang-lu-bounded-root-operand-authority.ts
test/general-natal-four-yang-lu-bounded-root-operand-authority.test.ts
docs/research/general-natal-four-yang-lu-bounded-root-operand-authority-20260915.md
```
