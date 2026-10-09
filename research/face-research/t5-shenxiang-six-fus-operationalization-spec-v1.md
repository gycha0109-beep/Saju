# T5 — 神相全編 六府 Context-Specific Operationalization Specification v1

> Status: abstract operationalization / all traditional bindings fail-closed  
> Watchtower-Track: face-research  
> Baseline: T4 神相全編 六府 context-specific methodology reconstruction  
> Issue: #1577

## 1. Purpose

T4 established that the admitted 1725 `古今圖書集成` transmission contains two 六府 methodologies that must not be collapsed.

T5 now answers a narrower question:

> What must a future observation/binding system provide before either methodology can become executable?

T5 does **not** implement computer vision.

It specifies the contracts that a later observation engine and binding layer would have to satisfy.

## 2. Inventory

T5 creates three layers.

```text
region / span operationalization specs = 9
descriptor operationalization specs    = 9
formation / aggregate specs            = 4
```

All remain blocked.

No traditional metric binding is admitted.

## 3. Context A — 十觀 六府

Methodology:

`method.shenxiang.six_fus.ten_observations.gujin_1725@0.1.0`

### 3.1 Region contracts

Three region identities remain methodology-specific:

- 天府 ← 天庭 / 日角 / 月角
- 人府 ← 兩顴
- 地府 ← 地角 / 邊腮

The arrow here means only **source-local association**.

It does not mean:

```text
traditional term = modern anatomical region
traditional term = provider landmark set
traditional term = fixed rectangle/polygon
```

### 3.2 Descriptor contracts

T5 preserves six T4 units:

| Formation target | Polarity | Source expression |
|---|---|---|
| 天府 | supporting | 方員明淨，不宜露骨 |
| 天府 | countervailing | 欹削低塌、偏尖 |
| 人府 | supporting | 方正插鬢，不粗不露，齊揖方拱 |
| 人府 | countervailing | 粗露高低，尖員綳鼓 |
| 地府 | supporting | 喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大 |
| 地府 | countervailing | 高低粗露尖削，耳後見重腮 |

For research planning, each compound may expose **analytical observation facets** such as form, surface appearance, bilateral relation, or visible prominence.

That analytical split is explicitly **not source grammar**.

For example:

```text
方員明淨，不宜露骨
!=
(roundness threshold)
AND (brightness threshold)
AND (bone-exposure threshold)
```

## 4. Context B — 卷二 六府論

Methodology:

`method.shenxiang.six_fus.volume_two_treatise.gujin_1725@0.1.0`

### 4.1 Region identity contracts

- 上二府 ↔ 兩輔骨
- 中二府 ↔ 兩顴骨
- 下二府 ↔ 兩頤骨

These identities remain source-local.

They are not modern bone labels.

### 4.2 Span contracts

Three source spans are separately specified:

- 上二府: 輔角 → 天倉
- 中二府: 命門 → 虎耳
- 下二府: 肩骨 → 地閣

Each endpoint remains unbound.

Therefore T5 forbids substituting:

- temple width;
- cheek width;
- jaw width;
- arbitrary provider landmark pairs.

### 4.3 Aggregate construct contracts

Three T4 units are preserved:

- supporting: `充實相輔`
- countervailing: `不欲支離孤露`
- supporting: `六府充直，無缺陷瘢痕`

These are not reduced to one score.

In particular:

- global symmetry is not automatically `相輔`;
- 3D volume is not automatically `充實`;
- segmentation gaps are not automatically `支離`;
- a medical scar or skin-condition classifier is not authorized for `瘢痕`.

Only neutral visible surface evidence could become a future candidate, and only after source-construct review.

## 5. Four blocked formation/evaluation contracts

T5 creates fail-closed aggregate specifications for:

1. 天府;
2. 人府;
3. 地府;
4. 卷二 六府 general evaluation.

All four remain non-executable.

The source has positive and negative wording, but T5 does not infer:

```text
supporting descriptors = Boolean requirements
counter-descriptors     = automatic veto
number of matches       = score
partial match           = partial 成
```

No such grammar has been established.

## 6. Cross-context firewall

The most important T5 rule remains the T3/T4 discovery:

```text
Context A 天府/人府/地府
!=
Context B 上二府/中二府/下二府
```

Even where neutral observations might later be reusable, traditional bindings remain methodology-scoped.

Examples explicitly blocked:

- Context A 人府 → Context B 中二府 by name similarity;
- Context A 地府 → Context B 下二府 because both are lower-face concepts;
- 兩顴 → 兩顴骨 as automatic semantic identity;
- a metric admitted for one context → automatic reuse in the other.

## 7. Binding prerequisites

T5 records five blocker groups.

### A. Context A regions

Needs source-grounded identities for:

`天府 / 天庭 / 日角 / 月角 / 人府 / 兩顴 / 地府 / 地角 / 邊腮 / 地閣 / 鬢`

### B. Context B regions and spans

Needs source-grounded identities for:

`兩輔骨 / 兩顴骨 / 兩頤骨 / 輔角 / 天倉 / 命門 / 虎耳 / 肩骨 / 地閣`

### C. Form constructs

Compound terms such as:

`方員 / 欹削 / 低塌 / 偏尖 / 方正 / 齊揖方拱 / 尖員綳鼓 / 重腮`

need construct definitions before metric design.

### D. Surface/capture semantics

`明淨 / 昏 / 慘 / 粗 / 露`

cannot be inferred from uncontrolled RGB values.

### E. 卷二 aggregate constructs

`充實相輔 / 支離孤露 / 充直 / 無缺陷瘢痕`

need their own source-grounded construct-validity work.

## 8. Historical outcome firewall

Nothing in T5 changes the historical-outcome boundary.

No operationalization is created for:

- 初年 / 中年;
- ten-year fortune periods;
- 富盛 / 凶敗;
- 財旺 / 財祿;
- land/wealth imagery.

They remain historical source content only.

## 9. NLC-1925 remains separate

This T5 inherits only the scan-qualified Gujin-1725 compilation transmission authority from T3/T4.

It does not promote NLC-1925.

If exact NLC pages are later adjudicated, that is a witness-strengthening/source-comparison task, not permission to overwrite these context-specific contracts.

## 10. Authorization summary

```text
METHODOLOGIES                         = 2
REGION/SPAN SPECS                     = 9
DESCRIPTOR SPECS                      = 9
FORMATION/AGGREGATE SPECS             = 4

UNIVERSAL 六府 REGION MAP             = NO
CROSS-CONTEXT METRIC REUSE            = NO
MODERN ANATOMICAL ALIASES             = NO
CONCRETE COORDINATES                  = NO
EXECUTABLE METRIC FORMULAS            = NO
NUMERIC THRESHOLDS                    = NO
BOOLEAN 成/不成 EVALUATOR             = NO
COUNTER-DESCRIPTOR AUTO-VETO          = NO
PARTIAL SCORE                         = NO
AUTOMATIC FORMATION STATE             = NO
AGE / WEALTH / FATE CLAIMS            = NO
PRODUCTION                            = NO

NEXT
= T6 CONTEXT-SPECIFIC METHODOLOGY PACK CANDIDATE
```
