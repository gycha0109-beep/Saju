# General Natal — governed visible 比肩 to 黨眾 support-constituent authority

Date: 2026-09-16  
Issue: #645  
Scope: `governed_visible_bijian_to_dang_zhong_support_constituent_binding`  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## Question

Can an already-governed canonical visible `比肩 / 비견` result be admitted as bounded support-constituent evidence for the selected source's `比劫 ... 為黨眾` statement without inventing a 黨眾 counter or final 強弱 classifier?

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Fresh review on 2026-09-16 confirms the same passage directly states:

```text
比劫印綬通根扶助為黨眾

得一比肩，不如得支中一墓庫
得二比肩，不如得一餘氣
得三比肩，不如得一長生祿刃

蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重
```

The selected passage therefore directly identifies `比劫` as a 黨眾-associated support category, describes it as friend-like support, and separately treats one, two, and three visible `比肩` in the same strength/root discussion.

This is enough to preserve an already-governed positive visible-Bijian result as **support-constituent evidence**. It is not enough to establish a chart-level `黨眾` state.

## Upstream authority

### #613 / #618 — visible 比肩 bounded-left-operand binding

This authority already performs the canonical binding:

```text
resolved derivedFacts.tenGods
→ visible year/month/hour stem facts
→ exact 비견 only
→ count 0 | 1 | 2 | 3
```

Positive counts 1/2/3 bind to the existing observation-only bounded root-comparison left operands.

Important upstream prohibitions remain authoritative:

```text
겁재 is not counted as 비견
branch Ten-Gods are not consumed
hidden stems are not consumed
unresolved Ten-God candidates are not selected
ordinary strong/weak classification is unauthorized
```

This artifact does not repeat or widen that calculation.

### #642 / #644 — 黨眾 / 助寡 context observations

This authority records:

```text
比劫 / 印綬 / 通根扶助 are source-associated with 黨眾
```

but explicitly keeps the following unresolved or unauthorized:

```text
黨眾 cardinality
助寡 cardinality
thresholds
boolean resolvers
positional normalization
重疊 threshold
通根比印 composition
final 強弱
strength scalars
```

This artifact preserves that boundary.

## Canonical representability

The repository canonical contract contains `TenGod` labels including:

```text
비견
겁재
편인
정인
```

and #521/#522 admits `derivedFacts.tenGods` only as governed raw research substrate.

However this bridge does **not** consume raw Ten-God facts. #613/#618 has already narrowed canonical facts to exact visible `비견` evidence. Therefore the bridge consumes only:

```text
BijianBoundedLeftOperandEvaluation
```

and records:

```text
CHART_FACTS_CONSUMED_BY_THIS_BRIDGE = false
RAW_TEN_GOD_RECOMPUTATION = false
UPSTREAM_EXACT_BIJIAN_ONLY = true
```

No new canonical mapping is attempted for `겁재`, `印綬`, or `通根`.

## Governed bridge

Positive upstream state:

```text
bounded_peer_stem_count_established
+ peerStemCount 1 | 2 | 3
+ internally consistent peer_stem_count operand
→ visible_bijian_support_constituent_observed
→ canonicalConstituent = 비견
→ sourceSupportCategory = 比劫
→ preserve visibleBijianCount
```

Every positive output also fixes:

```text
dangZhongEstablished = false
zhuGuaEstablished = false
qiangRuoEstablished = false
```

The count is provenance for the bounded visible-Bijian evidence. It is **not** a 黨眾 threshold or score.

Zero upstream state:

```text
no_bounded_peer_stem_operand
+ peerStemCount = 0
→ no_visible_bijian_support_constituent
```

This means only that the governed visible-Bijian constituent is absent from this bounded bridge. It does not mean:

```text
黨眾 = false
助寡 = true
other 比劫 support = absent
印綬 support = absent
通根 support = absent
```

Unresolved upstream states produce no constituent evidence.

## Authority verdict

```text
DIRECT_SOURCE_BIJIE_DANG_ZHONG_COMPONENT = OBSERVED
DIRECT_SOURCE_BIJIE_FRIEND_SUPPORT_ANALOGY = OBSERVED
UPSTREAM_VISIBLE_BIJIAN_BINDING = AVAILABLE_RESEARCH_ONLY
VISIBLE_BIJIAN_TO_DANG_ZHONG_SUPPORT_CONSTITUENT = AUTHORIZED_RESEARCH_ONLY

JIECAI_COMPONENT_BINDING = UNAUTHORIZED_BY_THIS_REVIEW
YINSHOU_COMPONENT_BINDING = UNAUTHORIZED_BY_THIS_REVIEW
TONGGEN_COMPONENT_BINDING = UNAUTHORIZED_BY_THIS_REVIEW
DANG_ZHONG_COUNTER = UNAUTHORIZED
DANG_ZHONG_THRESHOLD = UNAUTHORIZED
DANG_ZHONG_BOOLEAN_RESOLVER = UNAUTHORIZED
ZHU_GUA_COUNTER = UNAUTHORIZED
ZHU_GUA_BOOLEAN_RESOLVER = UNAUTHORIZED
LOCAL_CONSTITUENT_TO_FINAL_QIANG = UNAUTHORIZED
CHART_LEVEL_QIANG_RUO_CLASSIFIER = UNAUTHORIZED
CHART_LEVEL_WANG_SHUAI_CLASSIFIER = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
visible 비견 count >= 1 -> 黨眾
visible 비견 count == 0 -> 助寡
visible 비견 count -> support score
비견 + 겁재 aggregation
겁재 -> 比劫 constituent from this artifact
편인/정인 -> 印綬
branch Ten-God -> support constituent
hidden stem -> support constituent
root class -> 黨眾
support constituent count -> 強/弱
numeric / non-numeric strength scalar
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
