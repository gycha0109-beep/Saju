# General Natal — ten-stem twelve-growth-stage mapping authority

Date: 2026-09-14  
Issue: #547  
Status: research-only canonical mapping substrate  
Production authority: BLOCKED

## Question

Can the repository independently govern a complete mapping:

```text
HeavenlyStem × EarthlyBranch -> 十二長生 stage
```

without silently promoting that table into root-weight, ordinary-strength, or Gyeokguk establishment semantics?

## Why this review exists

Merged #530/#531 reviewed `root_weight_classification` and recorded a specific missing authority:

```text
complete_stem_branch_root_class_mapping
```

That review also forbids:

```text
ungoverned Twelve-Growth table -> canonical classifier
```

The present review does not solve the root classifier. It governs only the underlying Twelve-Growth lookup table as an independent source-semantic substrate.

## Duplicate audit

Repository searches found no dedicated issue, PR, calculation module, or research artifact that governs:

```text
十二長生
十干寄生十二宮
臨官
帝旺
growthStage
```

#530/#531 references the missing table only as a blocker.

## Selected direct source

Primary selected mapping source:

```text
命理探源
卷三強弱 / 天干生旺死絕
https://ctext.org/wiki.pl?chapter=827425&if=gb
```

The source directly enumerates the twelve labels:

```text
長生 沐浴 冠帶 臨官 帝旺 衰 病 死 墓 絕 胎 養
```

It directly gives separate five-yang-stem and five-yin-stem tables and states the ordering principle:

```text
陽乾順行，陰乾逆行
```

Together those tables cover all ten Heavenly Stems across all twelve Earthly Branches.

The implementation treats that selected table as the mapping authority. It does not derive missing cells from unrelated repository facts.

## Cross-reference boundary

Cross-reference:

```text
三命通會
卷二 / 五行寄生十二宮
https://zh.wikisource.org/zh-hant/三命通會/卷二
```

That text independently preserves the Twelve-Palace stage system and its cyclic framing. It is used only to corroborate the system surface.

It is **not** used to:

- replace the selected `命理探源` ten-stem table;
- merge a different school rule into the mapping;
- authorize root weight or strength semantics.

## Canonical input representability

`src/contracts/calculation.ts` already exhaustively defines:

```text
HeavenlyStem = 갑 | 을 | 병 | 정 | 무 | 기 | 경 | 신 | 임 | 계
EarthlyBranch = 자 | 축 | 인 | 묘 | 진 | 사 | 오 | 미 | 신 | 유 | 술 | 해
```

Therefore the selected 10 × 12 source table is fully representable with existing canonical input types. No production snapshot schema change is necessary.

## Mapping decision

```text
DIRECT_SOURCE_TWELVE_GROWTH_STAGE_SYSTEM = OBSERVED
DIRECT_SOURCE_TEN_STEM_TWELVE_BRANCH_MAPPING = OBSERVED
DIRECT_SOURCE_YANG_FORWARD_YIN_REVERSE = OBSERVED
CANONICAL_HEAVENLY_STEM_INPUT = AVAILABLE
CANONICAL_EARTHLY_BRANCH_INPUT = AVAILABLE
SOURCE_MAPPING_EXHAUSTIVE = true
EXECUTABLE_TWELVE_GROWTH_STAGE_MAPPING = AUTHORIZED_RESEARCH_ONLY
```

The research module exposes a total lookup:

```text
getTwelveGrowthStage(stem, branch)
```

Tests require all ten stem rows, all twelve branch cells per row, and every Twelve-Growth stage exactly once per stem row.

## Explicit non-authority

This review does **not** authorize any of the following bridges:

```text
臨官 == 祿
帝旺 == 刃
十二長生 stage -> heavy/light root class
墓 -> 墓庫 root class
hidden-stem membership -> 餘氣
陰長生 -> heavy root
stage -> numeric strength
stage -> ordinary strong/weak classification
stage -> GEJU_CANDIDATE
stage -> GEJU_ESTABLISHMENT_STATE
```

Those are separate semantic questions.

This distinction is mandatory because #531 directly preserves the `子平真詮` caveat:

```text
陰長生不作此論
```

A valid Twelve-Growth lookup for a Yin stem therefore must not be converted automatically into the heavy-root meaning used elsewhere in the root-weight source body.

## Effect on #531 blocker

This review removes only the narrower statement:

```text
there is no governed complete Twelve-Growth stage table
```

It does **not** establish:

```text
complete_stem_branch_root_class_mapping = AVAILABLE
```

because the following semantic bridges still require separate authority:

```text
changsheng_lu_wang_ren_term_binding
muku_yuqi_complete_stem_branch_mapping
yin_stem_growth_exception_generalization
relative_comparison_to_non_numeric_weighting_rule
```

Therefore:

```text
ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE = PARTIALLY_AUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

remains unchanged.

## Product / Commerce invariant

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

No production runtime, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce authority is added.

## Change surface

Exactly three research files:

```text
src/research/general-natal-twelve-growth-stage-mapping-authority.ts
test/general-natal-twelve-growth-stage-mapping-authority.test.ts
docs/research/general-natal-twelve-growth-stage-mapping-authority-20260914.md
```
