# General Natal Changsheng heavy-root binding with Yin exception

Date: 2026-09-14  
Issue: #549  
Status: research-only semantic bridge  
Production authority: BLOCKED

## Question

Can the already-observed source semantics around `長生` be promoted into one narrow executable research predicate now that #547/#548 governs a complete ten-stem × twelve-branch 十二長生 mapping?

This review is intentionally narrower than the generalized `root_weight_classification` primitive reviewed in #530/#531.

## Upstream authority

### #530/#531 — root-weight semantic review

The reviewed `子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱` passage states:

```text
長生祿旺，根之重者也；墓庫餘氣，根之輕者也
```

and later:

```text
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣
```

#531 therefore already froze both the source-native heavy-root semantic and the explicit Yin-Changsheng exception as observations, while keeping a generalized root-weight classifier unauthorized.

### #547/#548 — governed 十二長生 mapping

#548 now provides a research-only total mapping:

```text
HeavenlyStem × EarthlyBranch -> 十二長生 stage
```

covering all 10 Heavenly Stems and all 12 Earthly Branches. It explicitly did **not** authorize `stage -> root weight`; that bridge is the exact subject of this review.

### Canonical day-master polarity

The canonical calculation contract already exposes `derivedFacts.dayMaster` as a `StemFact`, including:

```text
value   = exact HeavenlyStem
 yinYang = 양 | 음
```

Therefore this review consumes canonical `StemFact.yinYang`; it does not introduce another local stem-polarity table.

## Direct-source authority

Selected semantic source:

```text
子平真詮 / 子平真詮評注 — 論十干得時不旺失時不弱
https://ctext.org/wiki.pl?chapter=974137&if=en
```

The source sequence matters. It first gives the general clause:

```text
長生祿旺，根之重者也
```

and then gives the explicit general exception:

```text
陰長生不作此論
```

followed by the bounded examples:

```text
乙逢午、丁逢酉
```

and the further phrase:

```text
然亦為明根，比得一餘氣
```

The authority admitted here is deliberately asymmetric:

```text
DIRECT_SOURCE_CHANGSHENG_HEAVY_ROOT_SEMANTIC = OBSERVED
DIRECT_SOURCE_YIN_CHANGSHENG_EXCEPTION = OBSERVED
```

The `明根 / 比得一餘氣` phrase is retained as a source observation only. It is not converted into a completed canonical class or an equivalence predicate.

## Canonical representability

The required inputs are now governed:

```text
derivedFacts.dayMaster.value     = AVAILABLE
derivedFacts.dayMaster.yinYang   = AVAILABLE
pillar branch identity           = AVAILABLE
#548 十二長生 lookup              = AVAILABLE_RESEARCH_ONLY
```

No hidden-stem array ordering is consumed by this predicate.

## Narrow executable predicate

The only executable research predicate authorized here is:

```text
stage != 長生
  -> not_applicable

stage == 長生 && canonical dayMaster.yinYang == 양
  -> established

stage == 長生 && canonical dayMaster.yinYang == 음
  -> excluded_by_yin_exception
```

The result name is intentionally `heavyRootByChangshengClause`. It does **not** claim a complete root class.

### Yang anchors

The #548 mapping yields the five Yang-stem Changsheng pairs:

```text
甲亥
丙寅
戊寅
庚巳
壬申
```

For those pairs, the source's `長生 ... 根之重者也` clause is executable as a research-only positive predicate.

### Yin exception anchors

The #548 mapping yields the five Yin-stem Changsheng pairs:

```text
乙午
丁酉
己酉
辛子
癸卯
```

The selected source directly names only `乙午` and `丁酉` as bounded examples, but its preceding sentence is the general class statement `陰長生不作此論`. Applying that general exception to all five governed Yin-stem Changsheng pairs is therefore an **authority-chain derivation**:

```text
generic source exception
+ canonical day-master Yin/Yang
+ governed #548 stage mapping
-> all five Yin Changsheng pairs excluded from this specific heavy-root clause
```

This is not an independent source list and must not be represented as one.

## Decision

```text
CHANGSHENG_ROOT_WEIGHT_BINDING = AUTHORIZED_RESEARCH_ONLY
DIRECT_SOURCE_CHANGSHENG_HEAVY_ROOT_SEMANTIC = OBSERVED
DIRECT_SOURCE_YIN_CHANGSHENG_EXCEPTION = OBSERVED
CANONICAL_DAY_MASTER_STEM = AVAILABLE
CANONICAL_DAY_MASTER_YINYANG = AVAILABLE
CANONICAL_BRANCH_INPUT = AVAILABLE
TWELVE_GROWTH_STAGE_MAPPING = AVAILABLE_RESEARCH_ONLY
YANG_CHANGSHENG_HEAVY_ROOT_PREDICATE = AUTHORIZED_RESEARCH_ONLY
YIN_CHANGSHENG_HEAVY_ROOT_EXCLUSION = AUTHORIZED_RESEARCH_ONLY
ALL_FIVE_YIN_CHANGSHENG_EXCLUSION = AUTHORIZED_BY_SOURCE_PLUS_GOVERNED_MAPPING_CHAIN
YIN_CHANGSHENG_MINGGEN_SEMANTIC = OBSERVED
YIN_CHANGSHENG_MINGGEN_CLASSIFIER = UNAUTHORIZED
YIN_CHANGSHENG_YUQI_EQUIVALENCE = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## Explicit non-authority

This review does not authorize any of the following:

```text
臨官 == 祿
帝旺 == 刃
陰長生 -> light-root class
陰長生 -> no-root
明根 -> complete canonical root class
明根 == 餘氣
complete 餘氣 stem/branch mapping
墓 stage -> 墓庫 root class
長生 result -> numeric strength
長生 result -> ordinary strong/weak classification
長生 result -> generalized root-weight classifier
長生 result -> GEJU_CANDIDATE
長生 result -> GEJU_ESTABLISHMENT_STATE
長生 result -> production fact emission
```

In particular, `excluded_by_yin_exception` means only:

> excluded from the source's **heavy-root-by-長生 clause**.

It does not mean that the pair has no root or has a light root.

## Relationship to #531 blocker set

This review resolves only the `長生` slice of two broader #531 blocker names:

```text
changsheng_lu_wang_ren_term_binding
 yin_stem_growth_exception_generalization
```

It does **not** resolve the `祿`, `旺`, or `刃` term-binding slices, and it does not resolve:

```text
muku_yuqi_complete_stem_branch_mapping
relative_comparison_to_non_numeric_weighting_rule
complete generalized root-weight classification
```

Therefore #531 remains `PARTIALLY_AUTHORIZED` overall.

## Product boundary

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

No production runtime, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce authority is added.

## Next honest frontier

After this bridge is merged and closed, remaining root-weight work must be selected independently. Candidates include a source-governed `祿/旺/刃` binding or a complete `墓庫/餘氣` mapping. Neither may be inferred from #548 stage labels or hidden-stem storage order without its own authority review.
