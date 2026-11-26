# General Natal — explicit 甲乙 Wood bounded root-presence authority

Date: 2026-09-17  
Issue: #751  
Scope: `selected_source_jia_yi_wood_explicit_bounded_root_presence_set`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact governs one source-native positive-root surface for the exact `甲乙木` branch set named by the selected source. It does not settle canonical `四柱有根`, does not create a complete Lu/Changsheng/root classifier, and does not resolve any existing Yin-Lu or Yin-Changsheng ambiguity.

## Fresh implementation base

```text
1ff57cd4177e88d78c513f85bc26c90f55b49cdb
```

## Selected source

```text
子平真詮 / 子平真詮評註
論陰陽生死
https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm
```

Fresh review on 2026-09-17 confirms:

```text
天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。
如甲乙木見寅卯，固為身旺，而見亥辰未，亦為有根也。
```

The second sentence is important because it directly groups the two Wood stems `甲乙` and directly names the bounded branch set:

```text
寅
卯
亥
辰
未
```

The artifact therefore does not need to infer a missing Yin-stem Lu or Changsheng class in order to preserve positive root evidence from the source statement itself.

## Why the new primitive is class-neutral

The existing bounded root-presence surface already supplies class-specific positives such as:

```text
旺
non-Earth 墓庫
non-Earth 餘氣
Yang 長生
four governed non-Earth Yang 祿
```

For 甲, the five selected-source Wood branches are already reachable through those existing class-specific authorities:

```text
甲 + 寅 -> governed Yang 祿
甲 + 卯 -> 旺
甲 + 亥 -> governed Yang 長生
甲 + 辰 -> 餘氣
甲 + 未 -> 墓庫
```

For 乙, the existing class-specific surface reaches:

```text
乙 + 卯 -> 旺
乙 + 辰 -> 餘氣
乙 + 未 -> 墓庫
```

while deliberately leaving these class identities unauthorized:

```text
乙 + 寅 -> 乙祿
乙 + 亥 -> 乙長生
```

The selected source nevertheless directly says `甲乙木見寅卯` and `見亥辰未 ... 有根`. Therefore this artifact may safely admit `乙+寅` and `乙+亥` as source-native positive root presence while refusing to assign either disputed root-class label.

## Bounded source dispositions

The selected sentence itself distinguishes two phrase groups:

```text
寅 / 卯      -> source_describes_shen_wang
亥 / 辰 / 未 -> source_describes_you_gen
```

These are provenance labels for the selected source wording only.

They do not mean:

```text
source_describes_shen_wang -> final chart 旺
source_describes_you_gen    -> canonical 四柱有根=true
```

## Canonical input boundary

The executable research evaluator consumes only:

```text
Pick<StemFact, 'value' | 'yinYang' | 'element'>
Readonly<Partial<Record<PillarSlot, EarthlyBranch>>>
```

The source-native positive test itself requires only:

```text
dayMaster.value in {甲,乙}
branch in {寅,卯,亥,辰,未}
explicit PillarSlot provenance
```

It does not consume:

```text
hidden-stem order
foreign Twelve-Growth mapping
local Lu rediscovery
local Changsheng rediscovery
month-command timing resolver
source-strata precedence
arbitrary precomputed root evaluations without pillar provenance
```

Partial pillar maps remain valid because the surface is positive-only. Missing pillars never become negative evidence.

## Output observation

A source-native Wood-set positive preserves:

```text
pillarSlot
branch
sourceRootKind = selected_source_explicit_wood_root_presence
sourceStemScope = 甲乙木
sourceDisposition = source_describes_shen_wang | source_describes_you_gen
authority = research_only
```

The aggregate reuses the existing #739 bounded root-presence evaluation first, then adds this independent source-native observation where applicable.

## Exact upstream pins

The artifact pins exact version/hash identities for:

```text
#739 current bounded four-pillar positive root-presence surface
#741 Yin 長生 source-strata conflict
#560 selected-source Lu/Linguan and Yin-Lu ambiguity boundary
#748 bounded root-presence completeness review
```

No upstream artifact is modified or widened.

The following boundaries remain unchanged:

```text
Yin 長生 source-strata resolution = UNRESOLVED
Yin Lu interpretation             = AMBIGUOUS
canonical 四柱有根 resolver        = UNAUTHORIZED
negative root absence semantics   = UNAUTHORIZED
```

## Required authority verdict

```text
DIRECT_SOURCE_JIA_YI_WOOD_ROOT_SET = OBSERVED
DIRECT_SOURCE_JIA_YI_YIN_MAO_SHEN_WANG = OBSERVED
DIRECT_SOURCE_JIA_YI_HAI_CHEN_WEI_YOU_GEN = OBSERVED
CANONICAL_DAY_MASTER_STEM = AVAILABLE
CANONICAL_PILLAR_SLOT_PROVENANCE = AVAILABLE
EXPLICIT_JIA_YI_WOOD_ROOT_PRESENCE_SET = AUTHORIZED_RESEARCH_ONLY
JIA_YI_WOOD_SET_TO_BOUNDED_SIZHU_POSITIVE_EVIDENCE = AUTHORIZED_RESEARCH_ONLY

YI_YIN_POSITIVE_ROOT_WITHOUT_LU_CLASS = AUTHORIZED_RESEARCH_ONLY
YI_HAI_POSITIVE_ROOT_WITHOUT_CHANGSHENG_CLASS = AUTHORIZED_RESEARCH_ONLY
YI_YIN_TO_LU = UNAUTHORIZED
YI_HAI_TO_CHANGSHENG = UNAUTHORIZED
YIN_LU_AMBIGUITY_RESOLUTION = UNAUTHORIZED
YIN_CHANGSHENG_SOURCE_STRATA_RESOLUTION = UNAUTHORIZED
FOREIGN_TWELVE_GROWTH_MAPPING_CONSUMED = false
HIDDEN_STEM_ORDER_CONSUMED = false
CANONICAL_SIZHU_HAS_ROOT_RESOLVER = UNAUTHORIZED
ROOT_EVIDENCE_TO_SIZHU_HAS_ROOT_SETTLEMENT = UNAUTHORIZED
NO_BOUNDED_EVIDENCE_TO_SIZHU_NO_ROOT = UNAUTHORIZED
ROOT_POSITION_WEIGHT = UNAUTHORIZED
ROOT_COUNT_TO_STRENGTH = UNAUTHORIZED
FINAL_QIANG_RUO = UNAUTHORIZED
FINAL_WANG_SHUAI = UNAUTHORIZED
PRODUCTION_FACT_EMISSION = false
```

## Explicit non-authority

Do not infer or implement:

```text
乙+寅 == 乙祿
乙+亥 == 乙長生
same-element Yin stem inherits Yang Lu class
same-element Yin stem inherits Yang Changsheng class
寅/卯 source 身旺 phrase -> final chart 旺
亥/辰/未 source 有根 phrase -> canonical 四柱有根=true
one positive pillar -> complete 四柱有根 settlement
zero Wood-set positives -> 四柱無根
missing pillar -> negative root evidence
Wood-set mapping -> 火/土/金/水 by analogy
Wood-set mapping -> complete 10-stem × 12-branch root classifier
root observation count -> strength
pillar position -> numeric/non-numeric root weight
root evidence -> 黨眾 / 助寡 / 強 / 不弱
root evidence -> final 強弱 / 旺衰
GEJU_CANDIDATE / GEJU_ESTABLISHMENT_STATE
Production / SKU / Commerce
```

## Test boundary

Tests cover:

```text
all ten 甲/乙 × {寅,卯,亥,辰,未} source positives
exact source-disposition split
乙+寅 positive without 祿 assignment
乙+亥 positive without 長生 assignment
representative other 乙 branch remains non-negative/no-evidence
non-甲乙 stems add no Wood-set observation
partial-pillar provenance
exact upstream version/hash pins
Yin-Lu and Yin-Changsheng unresolved state preservation
single intended evaluator export only
all settlement/weighting/strength/Gyeokguk/Production escalations false
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