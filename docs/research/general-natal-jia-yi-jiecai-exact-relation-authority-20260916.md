# General Natal — 甲逢乙為劫財 exact relation authority

Date: 2026-09-16  
Issue: #647  
Scope: `jia_day_master_meets_yi_visible_stem_to_jiecai_exact_relation_observation`  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Question

Can the repository reproduce one direct selected-source Ten-God relation without inventing a generalized 劫財 table or collapsing it into 黨眾/強弱?

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干配合性情`

- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- revalidated 2026-09-16

Exact clause:

```text
甲逢乙為劫財
```

The source directly supports only this literal relation in this artifact.

## Canonical representability

The canonical calculation contract exposes exact stem identities:

```text
HeavenlyStem = 갑 | 을 | 병 | 정 | 무 | 기 | 경 | 신 | 임 | 계
```

#521/#522 already admits these raw paths as research substrate:

```text
derivedFacts.dayMaster
pillars.*.stem
```

Therefore the exact selected-source pair is representable as:

```text
dayMaster = 갑
visibleCounterpartStem = 을
```

No Ten-God recomputation is needed. No hidden stem, branch Ten-God, storage order, root class, or strength fact is consumed.

## Governed primitive

Input is deliberately a bounded pair object rather than a chart:

```text
{
  dayMaster: HeavenlyStem,
  visibleCounterpartStem: HeavenlyStem
}
```

Only:

```text
갑 + 을
```

returns:

```text
state = jia_yi_jiecai_relation_observed
sourceRelation = 劫財
sourceText = 甲逢乙為劫財
```

Every other pair returns:

```text
state = outside_selected_source_pair_scope
```

That state is not a negative Ten-God verdict. It means only that the selected direct clause does not govern that pair.

## Upstream boundary

#645/#646 governs visible `比肩 / 비견` support-constituent evidence and explicitly leaves 劫財 unmapped. This artifact pins the exact #646 version/hash but does not alter that boundary.

The new primitive does **not** feed #646 and does not claim that source `劫財` is already a governed `比劫` support constituent.

## Authority verdict

```text
DIRECT_SOURCE_JIA_MEETS_YI_JIECAI                 = OBSERVED
CANONICAL_DAY_MASTER_PATH                          = AVAILABLE_RESEARCH_SUBSTRATE
CANONICAL_VISIBLE_STEM_PATH                        = AVAILABLE_RESEARCH_SUBSTRATE
EXACT_JIA_YI_PAIR_REPRESENTABLE                    = true
JIA_YI_JIECAI_EXACT_PAIR_MATCHER                   = AUTHORIZED_RESEARCH_ONLY

WHOLE_CHART_JIECAI_SCAN                            = UNAUTHORIZED
GENERALIZED_JIECAI_RESOLVER                        = UNAUTHORIZED
CANONICAL_GYEOPJAE_TO_SOURCE_JIECAI_ALIAS          = UNAUTHORIZED
CANONICAL_TEN_GOD_RECOMPUTATION                    = UNAUTHORIZED
JIECAI_TO_BIJIE_SUPPORT_CATEGORY                   = UNAUTHORIZED
BRANCH_TEN_GOD_CONSUMED                            = false
HIDDEN_STEM_CONSUMED                               = false
DANG_ZHONG_COUNTER                                 = UNAUTHORIZED
DANG_ZHONG_BOOLEAN_RESOLVER                        = UNAUTHORIZED
ZHU_GUA_COUNTER                                    = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO_CLASSIFIER                   = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER                  = UNAUTHORIZED
NUMERIC_STRENGTH                                   = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR                        = UNAUTHORIZED
GEJU_CANDIDATE                                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE                           = NOT_EMITTED
PRODUCTION_FACT_EMISSION                           = false
```

## Explicit non-authority

This artifact does not infer or implement:

```text
乙 + 甲 -> 劫財
all same-element opposite-polarity stem pairs -> 劫財
canonical `겁재` == source `劫財` globally
canonical Ten-God recomputation from stems
whole-chart 劫財 discovery/counting
hidden-stem 劫財 discovery
branch Ten-God -> 劫財 counterpart
劫財 -> 比劫 support constituent
one 劫財 -> 黨眾
absence of 甲+乙 -> 助寡
劫財 -> 強
numeric or non-numeric strength
Gyeokguk candidate / establishment
Production / SKU / Commerce
```

## Regression contract

Tests prove:

- exact `갑 + 을` preserves the direct source relation;
- `을 + 갑`, `갑 + 갑`, `병 + 정`, and another nearby pair stay outside selected-source scope;
- the source text and selected section are immutable;
- exact #646 version/hash is pinned;
- canonical day-master and visible-stem substrate are present;
- generalized 劫財, canonical aliasing, chart scan, hidden/branch consumption, `劫財 -> 比劫`, 黨眾/助寡, final 旺衰/強弱, strength scalar, Gyeokguk, Production, SKU, and Commerce remain closed.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior changes here.
