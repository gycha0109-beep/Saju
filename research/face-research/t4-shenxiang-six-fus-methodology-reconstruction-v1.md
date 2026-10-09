# T4 — 神相全編 六府 Context-Specific Methodology Reconstruction v1

> Status: transmission-qualified methodology reconstruction / fail-closed  
> Watchtower-Track: face-research  
> Baseline: T3 神相全編 六府 source-witness extraction  
> Issue: #1568

## 1. Reconstruction result

T4 reconstructs **two methodologies**, not one.

```text
method.shenxiang.six_fus.ten_observations.gujin_1725@0.1.0
method.shenxiang.six_fus.volume_two_treatise.gujin_1725@0.1.0
```

Both are grounded in the scan-checked 1725 `古今圖書集成` transmission admitted by T3.

They share the broad term family `六府`, but T3 did not establish exact region identity or semantic equivalence.

T4 therefore keeps them separate all the way through methodology identity.

## 2. Context A — 十觀 / 六取五官六府

Source:

`passage.shenxiang.gujin_631.six_fus.ten_observations`

### Pair structure

| Pair role | Source label | Source-local region vocabulary |
|---|---|---|
| upper | 天府 | 天庭 / 日角 / 月角 |
| middle | 人府 | 兩顴 |
| lower | 地府 | 地角 / 邊腮 |

These are **traditional semantic region terms**, not modern coordinate definitions.

### Formation semantics

T4 preserves source-local supporting and countervailing wording.

- 天府 supporting: `方員明淨，不宜露骨`
- 天府 countervailing: `欹削低塌、偏尖`
- 人府 supporting: `方正插鬢，不粗不露，齊揖方拱`
- 人府 countervailing: `粗露高低，尖員綳鼓`
- 地府 supporting: `喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大`
- 地府 countervailing: `高低粗露尖削，耳後見重腮`

T4 does not infer that each comma-separated phrase is an independent Boolean condition.

It also does not infer a scoring rule, threshold, weighting, or partial-satisfaction policy.

## 3. Context B — 卷二 / 六府論

Source:

`passage.shenxiang.gujin_632.six_fus.treatise`

This context has two related but distinct source structures.

### Paired-bone identity

```text
upper  = 兩輔骨
middle = 兩顴骨
lower  = 兩頤骨
```

### Traditional spans from the quoted 靈臺祕訣 wording

```text
上二府 = 輔角 → 天倉
中二府 = 命門 → 虎耳
下二府 = 肩骨 → 地閣
```

T4 records both structures.

It does **not** assume that the paired-bone nouns and quoted span endpoints are interchangeable machine coordinates.

### Aggregate formation semantics

The source states:

- `充實相輔`
- countervailing `支離孤露`
- `六府充直，無缺陷瘢痕`

These are preserved as compound traditional constructs.

No single fullness, convexity, symmetry, scar-detection, or contour metric is authorized as their substitute.

## 4. Intra-work relation

T4 freezes the following relation:

```text
same work title                    = yes
same admitted compilation witness = yes
same 六府 term family              = yes

exact region identity              = not established
exact semantic equivalence         = not established
one universal methodology          = not authorized
one universal region map           = not authorized
cross-context metric reuse         = not authorized
```

This prevents a later binding layer from cherry-picking the most convenient coordinates from both passages.

## 5. Observation contract boundary

T4 defines **semantic requirements only**.

### Context A requires

- governed identity for the 天府/人府/地府 source-local regions;
- neutral observations capable of representing relevant form, exposure, surface, and spatial relations;
- binding logic that does not silently import Context B.

### Context B requires

- governed identity for 兩輔骨/兩顴骨/兩頤骨;
- source-grounded semantics for 輔角/天倉/命門/虎耳/肩骨/地閣;
- neutral observations for compound constructs such as 充實相輔 and 支離孤露.

All are:

`required_unbound`

T4 does not select:

- MediaPipe landmarks;
- pixel coordinates;
- camera angles;
- 2D/3D formulas;
- thresholds.

## 6. Historical outcome language remains non-executable

The passages contain traditional result language including:

- 初年 / 中年;
- ten-year expressions;
- 富盛 / 凶敗;
- 財旺 / 財祿;
- land/wealth imagery.

T4 records their existence but does not create an age map or wealth/fate claim.

```text
universalAgeMapAuthorized       = false
wealthOrFateClaimAuthorized     = false
claimTemplateAuthorized         = false
productionNarrativeAuthorized  = false
```

## 7. NLC-1925 boundary

This reconstruction is explicitly:

`gujin_1725_scan_checked_compilation_transmission`

It does not pretend that the exact NLC-1925 target pages have been adjudicated.

NLC-1925 remains a separate witness gate.

A later NLC page promotion may strengthen or complicate the source picture, but it must not retroactively erase the context split established here.

## 8. What T4 authorizes

T4 authorizes the next research phase to specify fail-closed operationalization requirements **per context**.

It does not authorize executable region maps.

```text
T4 METHODOLOGIES
= 2 CONTEXT-SPECIFIC DEFINITIONS

SOURCE AUTHORITY
= GUJIN 1725 SCAN-CHECKED COMPILATION TRANSMISSION

UNIVERSAL 神相 六府 METHODOLOGY
= NO

UNIVERSAL REGION MAP
= NO

NUMERIC THRESHOLDS
= NO

EXECUTABLE 成/不成 BOOLEAN
= NO

AGE / WEALTH / FATE CLAIMS
= NO

PRODUCTION
= NO

NEXT
= T5 CONTEXT-SPECIFIC OPERATIONALIZATION SPECIFICATION
```
