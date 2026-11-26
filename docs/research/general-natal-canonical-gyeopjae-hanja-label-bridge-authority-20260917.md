# General Natal — canonical 겁재 → 劫財 lexical provenance bridge

Date: 2026-09-17  
Issue: #771  
Scope: `canonical_gyeopjae_to_jiecai_label_provenance_bridge`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact opens exactly one lexical/provenance bridge:

```text
already-canonical 겁재
→ pinned manseryeok@2.0.0 TEN_GOD_HANJA
→ 劫財
```

It does not create a generalized 劫財 resolver and does not map canonical 겁재 to 比劫 support.

## Exact calculation provenance

Current `package.json` pins:

```text
manseryeok = 2.0.0
```

Current `src/calculation/manseryeok-adapter.ts` independently pins:

```text
ENGINE_NAME       = manseryeok
ENGINE_VERSION    = 2.0.0
ENGINE_REPOSITORY = https://github.com/yhj1024/manseryeok
```

The exact upstream tag consumed by Saju publishes this vocabulary in:

```text
https://github.com/yhj1024/manseryeok/blob/v2.0.0/src/constants.ts
```

with:

```text
TEN_GOD_HANJA
겁재 -> 劫財
```

The canonical calculation contract already contains `겁재` in `TenGod`, and `derivedFacts.tenGods` is already a governed raw research path. Therefore no Ten-God recomputation is needed or authorized.

## Existing selected-source boundaries remain separate

### #647 / PR #649 — exact 甲/乙 劫財 relation

Existing authority proves only:

```text
甲 day master + visible 乙
→ 甲逢乙為劫財
```

It explicitly keeps a generalized 劫財 resolver and global canonical 겁재 alias unauthorized.

### #653 / PR #654 — 劫財 / 比劫 same-context terminology

The selected source contains one context:

```text
月令偏財生官，劫財重重，喜得甲己相合，官星之情，專向日主，制住比劫，使不能爭財，所謂用官制劫護財也。
```

The existing authority preserves only the same-context terminology relation. It explicitly keeps:

```text
GLOBAL_JIECAI_BIJIE_ALIAS = UNAUTHORIZED
JIECAI_SUBSET_OF_BIJIE_ONTOLOGY = UNAUTHORIZED
CANONICAL_GYEOPJAE_TO_BIJIE = UNAUTHORIZED
```

This lexical bridge does not change that.

### #699 / PR #701 — exact 甲/乙 support constituent

Only the already-governed exact 甲+乙 relation may become one bounded 比劫 support-constituent item. No global canonical `겁재` mapping exists there.

### #766 / PR #767 — support completeness

Current general `比劫` support coverage remains incomplete, and shared collection/count/aggregation is blocked. This lexical bridge does not change that completeness verdict.

## Governed lookup

Input type:

```ts
'겁재'
```

Output:

```text
겁재 -> 劫財
```

An invalid runtime cast fails closed with `RangeError`; no fallback label is synthesized.

The lookup is a vocabulary operation only. It does not inspect a chart, choose a pillar, recompute a Ten-God, or create interpretation semantics.

## Authority verdict

```text
CANONICAL_GYEOPJAE_TO_JIECAI_LABEL = AUTHORIZED_RESEARCH_ONLY
LEXICAL_PROVENANCE_BRIDGE_ONLY = true
EXACT_PINNED_UPSTREAM_VOCABULARY = true

CLASSICAL_SOURCE_GENERAL_JIECAI_RESOLVER = UNAUTHORIZED
GENERALIZED_JIECAI_RESOLVER = UNAUTHORIZED
GLOBAL_JIECAI_BIJIE_ALIAS = UNAUTHORIZED
JIECAI_SUBSET_OF_BIJIE_ONTOLOGY = UNAUTHORIZED
CANONICAL_GYEOPJAE_TO_BIJIE_SUPPORT = UNAUTHORIZED
WHOLE_CHART_JIECAI_SCAN = UNAUTHORIZED
WHOLE_CHART_JIECAI_COUNT = UNAUTHORIZED
BRANCH_TEN_GOD_SCAN = UNAUTHORIZED
HIDDEN_STEM_TEN_GOD_SCAN = UNAUTHORIZED
BIJIAN_PLUS_JIECAI_AGGREGATION = UNAUTHORIZED
DANG_ZHONG_COUNTER = UNAUTHORIZED
DANG_ZHONG_THRESHOLD = UNAUTHORIZED
DANG_ZHONG_BOOLEAN_RESOLVER = UNAUTHORIZED
ZHU_GUA_BOOLEAN_RESOLVER = UNAUTHORIZED
SUPPORT_TO_QIANG_OR_BU_RUO = UNAUTHORIZED
FINAL_QIANG_RUO = UNAUTHORIZED
FINAL_WANG_SHUAI = UNAUTHORIZED
NUMERIC_STRENGTH = UNAUTHORIZED
NON_NUMERIC_STRENGTH_SCALAR = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
canonical 겁재 -> universal classical 劫財 semantics
canonical 겁재 -> 比劫
canonical 겁재 -> 黨眾 support constituent
any chart-wide 겁재 scan or count
branch Ten-God or hidden-stem ingestion
比肩 + 劫財 aggregation
one or more 劫財 -> 黨眾
absence of 劫財 -> 助寡
劫財 -> 強 / 不弱 / final 強弱 / 旺衰
numeric or non-numeric strength
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production / SKU / Commerce
```

## Upstream pins

The implementation hashes the exact current identities of:

```text
#647/#649  Jia/Yi exact 劫財 relation
#653/#654  劫財/比劫 same-context terminology observation
```

alongside the pinned `manseryeok@2.0.0` lexical provenance and the governed `derivedFacts.tenGods` raw path.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior changes.
