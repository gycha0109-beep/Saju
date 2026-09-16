# General Natal — Governed Muku/Yuqi → bounded Tonggen observation authority

Issue: #691

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact governs one narrow bridge only:

```text
already-governed #558 MukuYuqiLightRootEvaluation
→ positive non-Earth 墓庫 / 餘氣 state
→ bounded source-side 通根 observation
```

It does not authorize a generalized root-to-通根 classifier, 黨眾 resolver, ordinary strength classifier, Gyeokguk derivation, or Production fact.

## Selected source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Freshly reviewed on 2026-09-16.

Relevant source boundaries:

```text
比劫印綬通根扶助為黨眾
墓庫餘氣，根之輕者也
若乙逢戌、丁逢丑，非其本庫餘氣，自不作通根論
壬逢辰、丙坐戌之類，不以為水火通根身庫
```

The passage supports a bounded relation between the source's own 墓庫/餘氣 locations and 通根. It does not license treating every root category, root weight, or growth-stage name as synonymous with 通根.

## Upstream governed substrate

#557/#558 already governs exactly these non-Earth mappings:

| element | 墓庫 | 餘氣 |
| --- | --- | --- |
| 木 | 未 | 辰 |
| 火 | 戌 | 未 |
| 金 | 丑 | 戌 |
| 水 | 辰 | 丑 |

The upstream evaluator exposes:

```text
muku_light_root_established
yuqi_light_root_established
no_governed_light_root_match
earth_boundary_unresolved
```

This bridge consumes that evaluation directly. It does not read raw stem/branch facts and does not redo the mapping.

## Canonical representability verdict

```text
UPSTREAM_MUKU_YUQI_EVALUATION = AVAILABLE_RESEARCH_ONLY
RAW_STEM_BRANCH_REDISCOVERY_REQUIRED = false
HIDDEN_STEM_CONSUMPTION_REQUIRED = false
TWELVE_GROWTH_CONSUMPTION_REQUIRED = false

GOVERNED_NON_EARTH_MUKU_TO_BOUNDED_TONGGEN = AUTHORIZED_RESEARCH_ONLY
GOVERNED_NON_EARTH_YUQI_TO_BOUNDED_TONGGEN = AUTHORIZED_RESEARCH_ONLY
EARTH_TONGGEN = UNRESOLVED
GENERAL_ROOT_TO_TONGGEN_EQUIVALENCE = UNAUTHORIZED
ROOT_WEIGHT_TO_TONGGEN_EQUIVALENCE = UNAUTHORIZED
TWELVE_GROWTH_STAGE_TO_TONGGEN = UNAUTHORIZED
```

## State transition

```text
muku_light_root_established
  -> bounded_tonggen_observed
  -> sourceRootKind = 墓庫

yuqi_light_root_established
  -> bounded_tonggen_observed
  -> sourceRootKind = 餘氣

no_governed_light_root_match
  -> no_bounded_tonggen_evidence

earth_boundary_unresolved
  -> unresolved_outside_governed_tonggen_scope
```

`no_bounded_tonggen_evidence` means only that this bridge has no positive bounded evidence. It is not `通根=false` for the whole chart and is not a negative 黨眾/助寡 verdict.

## Explicit non-authority

The following remain false / unauthorized:

```text
any root -> 通根
root-heavy -> 通根
root-light -> 通根 as a generic shortcut
長生 -> 通根
祿 -> 通根
旺 -> 通根
十二長生 stage -> 通根
hidden-stem membership/order -> 通根
same-element branch -> 通根
Earth 通根 completion
bounded 通根 -> 黨眾 constituent
通根 count / threshold / boolean resolver
absence of bounded 通根 -> 助寡
通根 -> 強
通根 -> 不弱
通根 + 比印 -> final 強弱
numeric or non-numeric strength scalar
generalized root-weight classification
ordinary strength classification
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production fact emission
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

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
