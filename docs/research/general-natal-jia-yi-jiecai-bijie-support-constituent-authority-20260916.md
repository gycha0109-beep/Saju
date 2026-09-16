# General Natal — exact 甲/乙 劫財 → 比劫 support-constituent authority

Date: 2026-09-16  
Issue: #699  
Status: research-only authority

## Decision

```text
UPSTREAM_JIA_YI_JIECAI_EXACT_RELATION = AVAILABLE_RESEARCH_ONLY
DIRECT_SOURCE_JIA_YI_BIJIE_CATEGORY = OBSERVED
EXACT_JIA_YI_JIECAI_TO_BIJIE_SUPPORT_CONSTITUENT = AUTHORIZED_RESEARCH_ONLY
```

The admitted bridge is exactly:

```text
JiaYiJiecaiExactRelationEvaluation
  state = jia_yi_jiecai_relation_observed
  dayMaster = 갑
  visibleCounterpartStem = 을
  sourceRelation = 劫財
  exactRelationObserved = true
  authority = research_only

→ jia_yi_jiecai_bijie_support_constituent_observed
  sourceRelation = 劫財
  sourceSupportCategory = 比劫
  supportConstituentObserved = true
  dangZhongEstablished = false
  zhuGuaEstablished = false
  qiangRuoEstablished = false
```

No raw chart facts are consumed by this bridge.

## Selected direct source

Selected corpus/page:

`子平真詮 / 子平真詮評註`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Freshly re-verified on 2026-09-16, the selected page contains separately anchored statements:

```text
甲逢乙為劫財
```

and:

```text
甲以甲乙為比劫，庚辛為官煞，比劫有分奪財星之嫌
```

The already-governed #642/#644 context observation on the same selected corpus also preserves:

```text
比劫印綬通根扶助為黨眾
```

The first statement identifies the exact 甲-day-master / 乙-counterpart relation as 劫財. The second directly places 甲 and 乙 under 比劫 for 甲. The third names 比劫 among source-associated 黨眾 support components.

This supports one exact-pair research bridge. It does not authorize a general 劫財 ontology or canonical 겁재 mapping.

## Governed upstream only

This bridge consumes only the #647/#649 evaluator:

```text
GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION
GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH
```

That upstream authority already limits executable matching to:

```text
dayMaster = 갑
visibleCounterpartStem = 을
```

Every other pair is outside selected-source scope rather than a negative Ten-God verdict.

The 黨眾 component semantics are pinned through #642/#644:

```text
GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION
GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH
```

The #653/#654 same-example `劫財重重` / `比劫` terminology observation remains observation-only and is not used to manufacture a global alias here.

## Fail-closed state

```text
outside_selected_source_pair_scope
→ outside_selected_source_pair_scope_no_constituent
→ NOT not-劫財
→ NOT not-比劫
→ NOT 黨眾=false
→ NOT 助寡=true
→ NOT no-other-support
```

No other stem pair is normalized or inferred.

## Explicit non-authority

The following remain unauthorized:

```text
all source 劫財 -> 比劫
劫財 subset-of 比劫 global ontology
canonical 겁재 -> source 劫財
canonical 겁재 -> 比劫
乙 day master + 甲 -> same result
same-element opposite-polarity -> 劫財 / 比劫
whole-chart 劫財 scan
hidden stem / branch Ten-God consumption
劫財 count
比肩 + 劫財 count
one constituent -> 黨眾
multiple constituents -> 黨眾
absence -> 助寡
通根 + 比印 composition
constituent -> 強
constituent -> 不弱
constituent -> final 強弱 / 旺衰
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
SKU / Commerce activation
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

This artifact is research-only and does not modify ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior.
