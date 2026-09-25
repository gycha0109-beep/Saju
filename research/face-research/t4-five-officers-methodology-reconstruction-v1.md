# T4 — 神相全編 五官 Methodology Reconstruction v1

> Status: source-qualified methodology reconstruction  
> Watchtower-Track: face-research  
> Baseline: T3 scan-checked NLC-1925 五官 mapping + five 官成 passages  
> Issue: #1534

## 1. T4 question

T3 answered:

> What does the controlled witness actually say?

T4 answers a narrower next question:

> What methodological structure can be reconstructed from those scan-qualified statements **without inventing machine semantics that the source does not provide**?

This phase does not implement image measurement.

## 2. Authority input

T4 consumes these scan-qualified source passages:

- 五官說 mapping
- 採聽官
- 保壽官
- 監察官
- 審辨官
- 出納官

The first four criterion passages were promoted in T3. 出納官 already had the FR117 successor path and is reused rather than forked.

## 3. Mapping methodology is separate from 官成 methodology

The mapping:

```text
耳 → 採聽官
眉 → 保壽官
眼 → 監察官
鼻 → 審辨官
口 → 出納官
```

defines a source-local concept relation.

It does **not** mean the corresponding 官 is 成.

Therefore:

```text
feature → officer mapping
!=
officer formation criteria
!=
automatic officer state
!=
traditional outcome claim
```

T4 issues one mapping methodology and four new criterion methodologies. 出納官 reuses:

`method.shenxiang.five_officers.intake_criteria@0.2.0`

## 4. Formation clauses are aggregate source formulas, not Boolean programs

Each passage lists descriptors and ends in wording such as:

- `謂之採聽官成`
- `乃為保壽官成`
- `乃為監察官成`
- `乃為審辨官成`
- `乃為出納官成`

This supports a historical **aggregate formation formula**.

It does not, by itself, answer the implementation questions:

- Are all descriptors strictly mandatory?
- Are some alternatives?
- What happens if one descriptor is missing?
- Do some descriptors have greater weight?
- Can one negative descriptor veto the rest?
- What numeric threshold makes a descriptor satisfied?

T4 therefore records all of those executable semantics as unauthorized.

### The `或` problem

保壽官 and 監察官 contain `或`.

T4 preserves the fact that an alternative marker exists, but does not compile it into a Boolean OR. Its exact scope must be established before execution.

## 5. 採聽官 methodology

Source descriptor set:

```text
色鮮
高聳於眉
輪廓完成
貼肉敦厚
風門寬大
```

Reconstruction:

- `色鮮` → appearance/color construct;
- `高聳於眉` → ear/brow spatial relation;
- `輪廓完成` → unresolved structural compound;
- `貼肉敦厚` → attachment/projection + substantial-form compound;
- `風門寬大` → named-region + broadness compound.

No color threshold, ear/brow coordinate, 風門 geometry, or 官成 evaluator is created.

## 6. 保壽官 methodology

Source descriptor set:

```text
寬廣清長
雙分入鬢
或如懸犀新月之樣
首尾豐盈
高居額中
```

Reconstruction:

- `寬廣清長` remains a compound;
- `雙分入鬢` is a bilateral brow/temporal-hair relation;
- `懸犀新月` is figurative-form language;
- `首尾豐盈` is brow-end morphology;
- `高居額中` is a brow/forehead spatial relation.

The figurative form is not reduced to curvature.

## 7. 監察官 methodology

Source descriptor set:

```text
含藏不露
黑白分明
瞳子端定
光彩射人
或細長極寸
```

Reconstruction deliberately separates morphology from capture-sensitive appearance.

- `含藏不露` → exposure/visibility construct;
- `黑白分明` → appearance/contrast;
- `瞳子端定` → unresolved pupil/alignment construct;
- `光彩射人` → appearance/lustre;
- `細長極寸` → source-local form + historical-measure expression.

### 寸

T4 does not convert `寸` into:

- millimetres;
- pixels;
- normalized face width;
- a percentage;
- a modern fixed threshold.

A source-grounded historical-measure interpretation is required first.

## 8. 審辨官 methodology

Source descriptor set:

```text
梁柱端直
印堂平闊
山根連印
年壽高隆
準圓庫起
形如懸膽
齊如截筒
色鮮黃明
```

This is a mixed methodology:

- stable nose morphology;
- named-region morphology;
- inter-region relation;
- figurative form;
- appearance/color.

Important boundary:

The repository may already have neutral nose observations. They do not become `梁柱`, `山根`, `年壽`, `準`, or `庫` merely because their geometry appears compatible.

```text
neutral nose geometry
!=
traditional named-region authority
```

The same applies to FR297's provider-independent neutral nasal bridge-root reference: it is useful downstream evidence, not automatic `山根` authority.

## 9. 出納官 integration

T4 does not create a second mouth methodology.

It reuses:

`method.shenxiang.five_officers.intake_criteria@0.2.0`

and the FR132 research boundary.

The source formula is:

```text
方大
唇紅端厚
角弓
開大合小
```

FR132 analytically studies:

- 方大
- 端厚
- 角弓
- 開大合小
- 唇紅

That analytical split is useful research structure, but is not silently declared to be the only authoritative segmentation of the classical phrase.

The established blockers remain:

- 方大 != aspect ratio alone;
- 端厚 != thickness alone;
- 角弓 != generic corner curvature;
- 開大合小 requires controlled multiple states;
- 唇紅 requires controlled color capture;
- candidate neutral metrics do not establish construct validity.

## 10. T4 modality separation

| Officer | Static morphology | Spatial relation | Appearance/color | Dynamic | Figurative/historical |
|---|---|---|---|---|---|
| 採聽官 | yes | yes | yes | no | unresolved compounds |
| 保壽官 | yes | yes | possible clarity semantics | no | 懸犀/新月 |
| 監察官 | yes/capture-sensitive | limited | yes | capture-state sensitive | 極寸 |
| 審辨官 | yes | yes | yes | no | 懸膽/截筒 |
| 出納官 | yes | — | 唇紅 | 開大合小 | 角弓 |

This table is a methodology classification, not an implementation-readiness score.

## 11. T5 observation-contract requirements

T4 now provides T5 with semantic requirements, not metric bindings.

Examples:

- governed ear/brow vertical relation;
- governed visible ear structure and 風門 semantics;
- governed brow extent/fullness;
- brow-to-temporal-hair and brow-to-forehead relations;
- controlled eye exposure/appearance;
- source-grounded treatment of `寸`;
- governed traditional binding for 印堂/山根/年壽/準/庫;
- controlled color appearance where the source uses 色;
- controlled multi-state capture for 開大合小.

T5 must remain fail-closed when those requirements cannot be satisfied.

## 12. Explicitly unauthorized

T4 does not authorize:

- MediaPipe/provider landmark IDs;
- RGB coordinate formulas;
- pixel or angle thresholds;
- Boolean AND/OR compilation of source grammar;
- criterion weighting;
- partial-satisfaction scoring;
- negative-veto rules;
- figurative language → one metric conversion;
- `寸` → modern unit conversion;
- uncontrolled RGB → traditional color criterion;
- automatic 官成 state;
- personality/wealth/health/relationship/fate claim;
- Production execution.

## 13. T4 verdict

```text
神相 五官 mapping methodology
= RECONSTRUCTED

採聽官 formation methodology
= RECONSTRUCTED / NON-EXECUTABLE

保壽官 formation methodology
= RECONSTRUCTED / NON-EXECUTABLE

監察官 formation methodology
= RECONSTRUCTED / NON-EXECUTABLE

審辨官 formation methodology
= RECONSTRUCTED / NON-EXECUTABLE

出納官 formation methodology
= EXISTING @0.2.0 REUSED

SOURCE LIST → BOOLEAN PROGRAM
= NOT AUTHORIZED

TRADITIONAL METRIC BINDING
= NOT AUTHORIZED

AUTOMATIC 官成
= NOT AUTHORIZED

PRODUCTION
= NOT AUTHORIZED

NEXT
= T5 五官 OPERATIONALIZATION SPECIFICATION
```
