# General Natal — governed 旺 / Yang 長生 / four-Yang 祿 to bounded 通根 authority

Date: 2026-09-17  
Issue: #754  
Scope: `governed_wang_yang_changsheng_four_yang_lu_root_to_bounded_tonggen_observation`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact adds one narrow semantic bridge from three already-governed positive root evaluations to bounded `通根` observation. It does not rediscover root classes from raw chart facts and does not create a generalized root-to-Tonggen classifier.

## Fresh implementation base

```text
f3be5fd32b2e221384c16f36d6195ed0d268bc85
```

## Selected direct source

```text
子平真詮 / 子平真詮評註
論陰陽生死
https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm
```

Fresh direct review on 2026-09-17 confirms the commentary states:

```text
天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。
```

and later in the same discussion:

```text
月令休囚，而年日時支中，得生祿旺餘氣墓，皆為通根也。
```

The immediately preceding wording explicitly names `長生`, so the later `生` token is bounded in this artifact only to the already-governed Yang `長生` primitive. No Yin-Changsheng doctrine is resolved here.

## Existing Tonggen boundary

#691/#692 already governs only:

```text
non-Earth 墓庫 established -> bounded_tonggen_observed
non-Earth 餘氣 established -> bounded_tonggen_observed
```

and explicitly leaves:

```text
長生 -> 通根 = false
祿 -> 通根    = false
旺 -> 通根    = false
```

under that older, narrower source chain.

The newly revalidated selected-source statement directly supplies the missing class-to-Tonggen language. This artifact therefore opens only the missing governed positive routes while preserving #692 unchanged as the separate 墓庫/餘氣 bridge.

## Governed upstream inputs

The adapter accepts only already-governed evaluation objects:

```text
#576 CompleteWangHeavyRootEvaluation
#551 ChangshengHeavyRootClauseEvaluation
#590 FourYangLuHeavyRootEvaluation
```

Tagged input:

```text
{ rootKind: 旺,   evaluation: CompleteWangHeavyRootEvaluation }
{ rootKind: 長生, evaluation: ChangshengHeavyRootClauseEvaluation }
{ rootKind: 祿,   evaluation: FourYangLuHeavyRootEvaluation }
```

No raw stem, branch, hidden-stem set, Twelve-Growth table, or local root matcher is accepted by this adapter.

## Authorized positive routes

```text
wang_heavy_root_established
-> bounded_tonggen_observed
-> sourceRootKind = 旺

heavyRootByChangshengClause = established
-> bounded_tonggen_observed
-> sourceRootKind = 長生

lu_heavy_root_established
-> bounded_tonggen_observed
-> sourceRootKind = 祿
```

This includes the complete governed five-element 旺 surface from #576, including Earth 旺 at `辰戌丑未`. That does **not** complete Earth 餘氣 or Earth 祿.

The four governed Yang Lu routes remain exactly:

```text
甲 + 寅
丙 + 巳
庚 + 申
壬 + 亥
```

No Yin-Lu branch is introduced.

## Fail-closed states

For governed mismatches:

```text
旺 no_governed_heavy_root_match
長生 not_applicable
祿 no_governed_lu_match
```

the result is only:

```text
no_bounded_tonggen_evidence
```

which is not a global `不通根` verdict.

For unresolved upstream scope:

```text
長生 excluded_by_yin_exception
祿 outside_governed_yang_non_earth_scope
```

the result is:

```text
unresolved_outside_governed_tonggen_scope
```

This preserves the existing Yin-Changsheng and Yin/Earth-Lu boundaries.

## 乙 positive root observations remain separate

#751/#753 newly authorizes source-native positive root presence for the exact `甲乙木` branch set. In particular:

```text
乙 + 寅 -> positive root presence without 乙祿 assignment
乙 + 亥 -> positive root presence without 乙長生 assignment
```

Those class-neutral observations are **not consumed** by this Tonggen adapter. This issue cannot turn them into Tonggen by inventing the missing Lu/Changsheng class.

## Required authority verdict

```text
DIRECT_SOURCE_ROOT_CLASSES_IN_TONGGEN_CONTEXT = OBSERVED
DIRECT_SOURCE_SHENG_LU_WANG_YUQI_MU_ALL_TONGGEN = OBSERVED

UPSTREAM_COMPLETE_WANG = AVAILABLE_RESEARCH_ONLY
UPSTREAM_YANG_CHANGSHENG = AVAILABLE_RESEARCH_ONLY
UPSTREAM_FOUR_YANG_LU = AVAILABLE_RESEARCH_ONLY
UPSTREAM_MUKU_YUQI_TONGGEN = AVAILABLE_RESEARCH_ONLY

WANG_TO_BOUNDED_TONGGEN = AUTHORIZED_RESEARCH_ONLY
GOVERNED_YANG_CHANGSHENG_TO_BOUNDED_TONGGEN = AUTHORIZED_RESEARCH_ONLY
GOVERNED_FOUR_YANG_LU_TO_BOUNDED_TONGGEN = AUTHORIZED_RESEARCH_ONLY
EXISTING_MUKU_YUQI_TONGGEN_BRIDGE = PRESERVED_SEPARATELY

GENERAL_ROOT_TO_TONGGEN = UNAUTHORIZED
YIN_CHANGSHENG_TO_TONGGEN = UNAUTHORIZED
YIN_LU_TO_TONGGEN = UNAUTHORIZED
EARTH_LU_TO_TONGGEN = UNAUTHORIZED
EARTH_YUQI_MAPPING = UNRESOLVED
CLASS_NEUTRAL_JIA_YI_WOOD_ROOT_TO_TONGGEN = UNAUTHORIZED
NO_BOUNDED_EVIDENCE_TO_GLOBAL_NOT_TONGGEN = UNAUTHORIZED
TONGGEN_TO_SIZHU_HAS_ROOT_SETTLEMENT = UNAUTHORIZED
TONGGEN_COUNT = UNAUTHORIZED
DANG_ZHONG_COUNTER = UNAUTHORIZED
FINAL_QIANG_RUO = UNAUTHORIZED
FINAL_WANG_SHUAI = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
any arbitrary root -> 通根
乙+寅 -> 乙祿 -> 通根
乙+亥 -> 乙長生 -> 通根
#753 class-neutral Wood observation -> 通根
Yin 長生 source-strata resolution
Yin Lu ambiguity resolution
Earth Lu attachment selection
Earth 餘氣 completion
upstream mismatch -> 不通根
no bounded Tonggen evidence -> global 不通根
one Tonggen observation -> canonical 四柱有根=true
Tonggen count / threshold
Tonggen -> 黨眾
Tonggen absence -> 助寡
Tonggen -> 強 / 不弱
Tonggen -> final 強弱 / 旺衰
Tonggen -> numeric/non-numeric strength
GEJU_CANDIDATE / GEJU_ESTABLISHMENT_STATE
Production / SKU / Commerce
```

## Exact upstream pins

This artifact pins exact version/hash identities for:

```text
#576 Earth-Wang completion / complete five-element 旺 matcher
#551 Yang 長生 heavy-root binding with Yin exception
#590 four-Yang 祿 heavy-root matcher
#692 existing 墓庫/餘氣 bounded Tonggen bridge
```

No upstream artifact is modified.

## Tests

Regression coverage proves:

```text
non-Earth 旺 -> bounded Tonggen
Earth 旺 -> bounded Tonggen without Earth 餘氣 completion
Yang 長生 -> bounded Tonggen
Yin 長生 exception -> unresolved, not negative
all four governed Yang 祿 -> bounded Tonggen
Yin 祿 outside scope -> unresolved
representative upstream mismatches -> no bounded evidence, never global negative
exact upstream version/hash pins
only one intended adapter export
all settlement/counter/strength/Gyeokguk/Production escalation remains false
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