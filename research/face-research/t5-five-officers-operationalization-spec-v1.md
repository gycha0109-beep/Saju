# T5 — 神相全編 五官 Operationalization Specification v1

> Status: fail-closed operationalization specification  
> Watchtower-Track: face-research  
> Predecessor: T4 神相全編 五官 methodology reconstruction  
> Issue: #1539

## 1. Purpose

T4 reconstructed what the scan-qualified 五官 passages permit us to call a methodology.

T5 asks the next question:

> What neutral observations and capture conditions would be required to operationalize each source construct without pretending that a convenient modern metric is already the traditional construct?

This phase specifies contracts. It does not implement CV.

## 2. Coverage

T5 emits one abstract operationalization specification for every T4 criterion unit:

- 採聽官: 5
- 保壽官: 5
- 監察官: 5
- 審辨官: 8
- 出納官: 5

Total: **28**.

It also emits five formation-level specifications and shared binding prerequisites.

## 3. Fail-closed statuses

A criterion can remain blocked for different reasons.

| Block class | Meaning |
|---|---|
| observation contract + binding | neutral observable is plausible, but traditional binding/construct validity is absent |
| capture protocol + binding | appearance depends materially on lighting/gaze/exposure/etc. |
| multi-state protocol + binding | one image cannot supply the source relation |
| source-grounded construct definition | figurative language is not yet an executable shape construct |
| historical measure interpretation | source measure semantics must be researched before modern measurement |
| semantic region definition | named traditional region/compound is not yet sufficiently defined |

A blocked criterion is not a failed criterion. It is **not executable**.

## 4. 採聽官

### 色鮮

Requires controlled visible-ear appearance. Raw RGB or skin-tone classification is not an acceptable proxy.

### 高聳於眉

Requires governed ear and brow vertical references. Choosing arbitrary centers would manufacture semantics absent from the source.

### 輪廓完成

Blocked on source-grounded 輪/廓/完成 semantics. A generic contour-completeness score is not authorized.

### 貼肉敦厚

May involve attachment/projection and fullness, but a single frontal 2D image cannot be assumed to prove real depth or tissue thickness.

### 風門寬大

Blocked before measurement because 風門 itself requires a governed traditional-region definition.

## 5. 保壽官

### 寬廣清長

Visible extent and clarity candidates may be observed separately, but the compound is preserved. No independent thresholds are created.

### 雙分入鬢

Requires bilateral brow-tail and temporal-hair region relations. Generic temple boundaries are not automatically 鬢.

### 懸犀 / 新月

Remains figurative-form research. Curvature alone is insufficient.

### 首尾豐盈

Requires governed medial/lateral brow roles and local fullness candidates.

### 高居額中

Requires a methodology-specific relation between brow position and 額中. Forehead height alone is not enough.

## 6. 監察官

This officer has the strongest capture-sensitivity in the current slice.

### 含藏不露

Eye exposure must be observed under controlled gaze/expression. Eye-opening ratio is only a neutral candidate, not the traditional construct.

### 黑白分明

Requires controlled illumination/exposure/white balance. It must not become a medical or race/ethnicity inference.

### 瞳子端定

Requires controlled gaze and visible pupil/iris alignment candidates. It is not a diagnosis and is not reducible to gaze-center offset.

### 光彩射人

Camera specular highlights must be distinguished from any research hypothesis about 光彩.

### 細長極寸

Blocked on historical-measure interpretation. T5 explicitly prohibits:

- 寸 → millimetres;
- 寸 → pixels;
- 寸 → face-width percentage;
- 寸 → fixed aspect ratio.

## 7. 審辨官

### 梁柱端直

Neutral nasal bridge observations may be candidates, but existing FR287/FR297 work does not become 梁柱/端直 authority automatically.

### 印堂平闊

Blocked first on governed 印堂 region identity.

### 山根連印

Requires both 山根 and 印堂 bindings before a connection relation can be operationalized. FR297 is not automatically 山根.

### 年壽高隆

Blocked first on 年壽 region identity. A 2D height value must not be called 3D prominence.

### 準圓庫起

Requires separate 準 and 庫 identities and separate shape/prominence constructs. FR298 does not automatically provide either traditional meaning.

### 懸膽 / 截筒

Both remain source-grounded figurative-form research. One shape metric or template match is insufficient.

### 色鮮黃明

Requires controlled appearance evidence and cannot be extended into health, ethnicity, or other sensitive-attribute inference.

## 8. 出納官

T5 preserves the FR132 boundaries.

### 方大

- 方 is not established by bounding-box aspect ratio.
- 大 is not established by the current full-mesh denominator ratio.
- construct validity remains absent.

### 端厚

- 厚 has a plausible fullness/thickness research direction.
- 端 remains unresolved.
- nearest-set distance is not automatically lip thickness.

### 角弓

Requires a source-grounded compound interpretation. Generic corner curvature is insufficient.

### 開大合小

This is explicitly a controlled multi-state problem:

```text
same subject
+ controlled open state
+ controlled closed state
+ pose/expression consistency
```

A single selfie cannot satisfy this contract.

### 唇紅

Requires controlled color capture. Raw red-channel intensity is not a traditional criterion.

## 9. Formation-level semantics remain non-executable

T5 has five formation specifications, but they deliberately preserve the T4 boundary:

```text
source descriptor list
!= executable AND

或
!= executable OR

source order
!= criterion weight

some descriptors observed
!= partial 官成 score
```

No criterion-state aggregation is authorized.

## 10. Observation-engine vs binding ownership

### face-observation-engine

Owns neutral, tradition-free observable evidence such as:

- visible geometry;
- controlled capture state;
- appearance evidence;
- same-subject multi-state observations.

### face-reading-binding

Owns:

- traditional named-region identity;
- source-local semantic mapping;
- figurative-form interpretation;
- methodology-specific relation binding.

The observation engine must not emit labels such as 山根, 年壽, 準, 庫, 風門 merely because a geometric proxy exists.

## 11. T5 verdict

```text
T4 CRITERIA COVERED
= 28 / 28

ABSTRACT OPERATIONALIZATION SPECS
= COMPLETE

FORMATION-LEVEL SPECS
= 5 / 5

CONCRETE CV FORMULAS
= NOT AUTHORIZED

TRADITIONAL METRIC BINDINGS
= NOT AUTHORIZED

CAPTURE CALIBRATION
= NOT AUTHORIZED

NUMERIC THRESHOLDS
= NOT AUTHORIZED

BOOLEAN 官成 EVALUATOR
= NOT AUTHORIZED

AUTOMATIC 官成 STATE
= NOT AUTHORIZED

OUTCOME CLAIMS
= NOT AUTHORIZED

PRODUCTION
= NOT AUTHORIZED

NEXT
= T6 五官 METHODOLOGY PACK CANDIDATE
```

## 12. T6 handoff

A T6 candidate may pin:

1. T3 scan-checked witness/passages;
2. T4 mapping + formation methodology identities;
3. these 28 T5 abstract operationalization specifications;
4. five formation-level fail-closed specs;
5. binding/capture prerequisites;
6. explicit authorization gates.

It must remain fail-closed until downstream observation and binding contracts exist.
