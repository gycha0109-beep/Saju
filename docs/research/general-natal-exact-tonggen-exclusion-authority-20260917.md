# General Natal — exact Yi-Xu / Ding-Chou selected-source Tonggen exclusions

Date: 2026-09-17  
Issue: #718  
Scope: `selected_source_exact_yi_xu_ding_chou_muku_yuqi_tonggen_exclusion`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact governs exactly two selected-source stem/branch exclusion pairs and nothing broader.

## Fresh implementation base

```text
fc6b387b7974267612bcf30a12df76e197bfff5b
```

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-17 confirms:

```text
若乙逢戌、丁逢丑，非其本庫餘氣，自不作通根論。
```

The governed selected-source exclusions are therefore limited to:

```text
乙 + 戌
丁 + 丑
```

The exact source reason is preserved:

```text
sourceBoundary    = 非其本庫餘氣
sourceDisposition = 自不作通根論
```

## Why this is not a generic negative resolver

#557/#558 operates at the element level:

```text
木: 墓庫=未, 餘氣=辰
火: 墓庫=戌, 餘氣=未
金: 墓庫=丑, 餘氣=戌
水: 墓庫=辰, 餘氣=丑
```

Its nonmatching output is deliberately only:

```text
no_governed_light_root_match
```

#691/#692 turns only positive 墓庫/餘氣 states into bounded Tonggen evidence. Its nonmatching output is deliberately only:

```text
no_bounded_tonggen_evidence
```

Neither upstream state is a global `不通根` verdict.

The selected commentary, however, directly names two exact stem-level exclusions. Exact stem identity matters: `木 + 戌` alone cannot distinguish 甲 from 乙, and `火 + 丑` alone cannot distinguish 丙 from 丁. Therefore this artifact consumes a bounded exact canonical stem/branch pair instead of promoting upstream absence states.

## Canonical representability

Current canonical contracts expose:

```text
HeavenlyStem = 갑 | 을 | 병 | 정 | 무 | 기 | 경 | 신 | 임 | 계
EarthlyBranch = 자 | 축 | 인 | 묘 | 진 | 사 | 오 | 미 | 신 | 유 | 술 | 해
```

Thus the two direct pairs are exactly representable:

```text
을 + 술
정 + 축
```

No whole-chart scan is required or authorized.

## Bounded executable behavior

Input:

```text
{ stem: HeavenlyStem, branch: EarthlyBranch }
```

Authorized outputs:

```text
을 + 술
-> selected_source_tonggen_exclusion_observed

정 + 축
-> selected_source_tonggen_exclusion_observed
```

Every other pair returns:

```text
outside_selected_source_pair_scope
```

That state is not a negative Tonggen verdict.

For the two positive exact pairs, the result still explicitly records:

```text
globalNotTonggenEstablished = false
rootlessnessEstablished     = false
zhuGuaEstablished           = false
qiangRuoEstablished         = false
```

## Upstream authority pins

The implementation pins exact version/hash identity for:

```text
#557/#558 — Muku/Yuqi light-root matcher
#691/#692 — bounded Muku/Yuqi Tonggen observation bridge
```

These authorities remain unchanged and are not widened.

## Explicit non-authority

The following remain unauthorized:

```text
木 + 戌 generally -> not Tonggen
火 + 丑 generally -> not Tonggen
甲 + 戌 -> same exclusion
丙 + 丑 -> same exclusion
all #558 nonmatches -> not Tonggen
all #692 no-evidence states -> not Tonggen
exact pair -> no root anywhere
exact pair -> 助寡
exact pair -> 弱
exact pair -> final 強弱
exact pair -> final 旺衰
exact pair -> numeric strength
exact pair -> non-numeric strength scalar
whole-chart rootlessness scan
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
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
