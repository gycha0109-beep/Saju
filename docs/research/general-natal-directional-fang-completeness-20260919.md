# R054 — directional 方 / modern 三會 completeness

Date: 2026-09-19  
Issue: #986  
Status: REN TIEQIAO STRATUM VERIFIED

## Direct source

滴天髓闡微 — 方局  
https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE

Selected stratum: 任鐵樵 commentary.

## Complete directional families

The commentary names:

| Members | Direction / family |
|---|---|
| 寅 卯 辰 | 東方 / 木 |
| 巳 午 未 | 南方 / 火 |
| 申 酉 戌 | 西方 / 金 |
| 亥 子 丑 | 北方 / 水 |

It then states the completeness boundary:

```text
凡三字全為成方
若只二字，則竟不取
```

Therefore, **within this selected source stratum**:

```text
three named members -> source-supported 成方 identity
only two members -> not promoted to 成方
```

## Terminology boundary

子平真詮 uses `三會` for `申子辰`-type combinations, while later/common terminology normally calls those 三合 and reserves 三會 for the directional sets above.

R054 therefore stores the source stratum explicitly and does not treat historical `三會` tokens as a universal ontology key.

## Partial-meeting result

For 任鐵樵's directional 方 rule, a two-member subset is not a completed 方.

This does **not** prove that every later school rejects the term 半會. Later terminology must be governed separately if adopted.

All 12 two-of-three directional subsets are therefore recorded as:

```text
REN_TIEQIAO_COMPLETE_FANG = false
CROSS_SCHOOL_HALF_MEETING_STATUS = UNRESOLVED
```

## Rejected shortcuts

```text
TWO_OF_THREE -> COMPLETE_FANG
COMPLETE_FANG -> AUTOMATIC_TRANSFORMATION
COMPLETE_FANG -> FAVORABLE
COMPLETE_FANG -> NUMERIC_STRENGTH
HISTORICAL_TOKEN_SANHUI -> MODERN_SANHUI_ONTOLOGY
```

No executable resolver and no Production / SKU / Commerce authority.
