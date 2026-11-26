# General Natal — 劫財 / 比劫 same-context terminology observation authority

Date: 2026-09-16  
Issue: #653  
Scope: `jiecai_bijie_same_context_terminology_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact preserves one direct selected-source terminology observation and nothing more.

It does **not** authorize a global alias, ontology, canonical Ten-God mapping, chart matcher, support-constituent bridge, counter, 黨眾/助寡 resolver, ordinary 強弱 classifier, Gyeokguk derivation, or Production fact.

## Fresh implementation base

Issue #653 was created while `main` was:

```text
c0793f55167184e5af0cadfadf483a608591c2db
```

Before implementation branch creation, unrelated face-reading PR #652 merged. The implementation branch therefore correctly starts from the newer fresh main:

```text
a29b6da50f95446393ea8c61634b77fa5b3b525c
```

No stale PR existed at that point.

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十干合而不合
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-16 confirms the concrete example sentence:

```text
月令偏財生官，劫財重重，喜得甲己相合，官星之情，專向日主，制住比劫，使不能爭財，所謂用官制劫護財也。
```

The important source behavior is deliberately narrow:

```text
lead wording:  劫財重重
later wording: 制住比劫
same sentence: true
same example:  true
```

This directly supports the statement that the source uses `劫財` and later `比劫` in a connected terminology context within this example.

It does not, by itself, prove that the two terms are globally synonymous or that a formal ontology should encode `劫財` as a subset of `比劫`.

## Upstream authority

### #647 / #649

The immediately preceding authority governs only:

```text
甲逢乙為劫財
```

as one exact research-only stem-pair observation.

It explicitly leaves unauthorized:

```text
generalized 劫財 resolver
canonical 겁재 <-> source 劫財 global alias
劫財 -> 比劫 support-category mapping
whole-chart 劫財 scan
```

This artifact does not widen that boundary.

### #642 / #644

The earlier Dang-Zhong context artifact records:

```text
比劫印綬通根扶助為黨眾
```

as source observation only.

It does not define internal `比劫` membership, cardinality, threshold, or a chart-level 黨眾 resolver.

This artifact pins both upstream definition hashes so later work cannot silently reinterpret either side.

## Canonical-input representability

No chart-level canonical input is needed for an observation-only terminology registry.

```text
CANONICAL_INPUT_REQUIRED = false
CHART_FACTS_CONSUMED = false
TEN_GOD_FACTS_CONSUMED = false
STEM_FACTS_CONSUMED = false
BRANCH_FACTS_CONSUMED = false
HIDDEN_STEM_FACTS_CONSUMED = false
CANONICAL_REPRESENTABILITY = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

Fact availability is intentionally irrelevant here because no executable mapping is admitted.

## Governed observation

Exactly one immutable observation is recorded:

```text
sourceContextLeadTerm = 劫財重重
sourceContextLaterTerm = 比劫
sameSentence = true
sameExample = true
contextualTerminologyRelationObserved = true
```

The registry also records three explicit negatives:

```text
globalAliasAuthorized = false
subsetOntologyAuthorized = false
executableMappingAuthorized = false
```

## Explicit non-authority

The following remain unauthorized:

```text
劫財 == 比劫 globally
劫財 subset-of 比劫 as executable ontology
canonical 겁재 -> source 比劫
canonical 겁재 -> 黨眾 support constituent
比肩 + 劫財 count
劫財 count -> 黨眾
absence of 劫財 -> 助寡
劫財 -> 強
source-context terminology -> ordinary strength
numeric or non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

There is also no exported function that accepts chart facts, Ten-God values, stems, branches, hidden stems, or counts.

## Why this is useful

The direct source now gives two separately governed facts:

```text
#647/#649: 甲逢乙為劫財
#653:     one concrete 劫財重重 context is later referred to with 比劫 wording
```

Together they strengthen the research trail without collapsing the unresolved semantic step:

```text
canonical 겁재 fact
   ?
source 劫財
   ?
source 比劫 category
   ?
黨眾 support constituent
```

The question marks remain real authority gaps. This artifact removes only uncertainty about what the selected source literally says in one connected example.

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
