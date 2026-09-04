# FR132 — Five-Officers Intake Criterion Semantic Operationalization Research

Status: research-only
Date: 2026-09-04
Promotion decision: deferred

## Governed direct source

The current witness-qualified source remains:

- passage: `passage.shenxiang.five_officers.intake.nlc_1925`
- witness: `witness.shenxiang_quanbian.nlc_1925`
- verification: `scan_checked`
- text: `口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。`

This line directly establishes the five intake concepts currently represented by the engine, but it does not provide machine thresholds, numeric definitions, or a complete modern measurement mapping.

## Contextual research comparanda

The following materials are used only to narrow semantic hypotheses. They are not promoted into governed source authority by FR132.

1. Chinese Text Project, `神相全編`, Five Officers context (`chapter=905153`): the adjacent `五官總論` explains the mouth ideal with `大而有收拾` and describes `弓` with an upward orientation and no exposed teeth. This is useful context for `大`, `角弓`, and the containment aspect of mouth form.
2. Wikisource, `欽定古今圖書集成/博物彙編/藝術典/第634卷`, `相口` / `論脣`: the compiled mouth material separately uses `方闊有稜`, `形如角弓`, `橫闊而厚`, `口色欲紅`, and `口脣欲厚`. It supports treating shape, bow-form, thickness/fullness, and redness as distinct constructs rather than one scalar.
3. Chinese Text Project, `柳莊相法` (`chapter=90958`): the Five Officers mouth line preserves `角弓開大合小` and adds lip/teeth/four-direction relations. It is a cross-tradition comparandum only; it does not silently replace the `神相全編` methodology.

## Criterion-by-criterion research conclusion

### `方大`

- Preserve the compound source concept, but decompose it analytically into `方` and `大` for construct-validation work.
- `方` is not established by the current bounding-box aspect ratio. Contextual evidence points toward outline regularity / squareness / defined edges or corners, for which a dedicated governed feature is still missing.
- `大` is not established by raw mouth width alone. Contextual `大而有收拾` indicates that largeness and containment belong together in the source context.
- FR80 aspect ratio and FR82 mouth-span/full-mesh-span ratio remain neutral candidate observations only.
- No traditional binding, threshold, or criterion state is authorized.

### `端厚`

- Do not collapse the whole compound into "lip thickness".
- `厚` has repeated contextual support as a thickness/fullness property.
- The exact operational meaning contributed by `端` is not yet established strongly enough for machine use; it must remain unresolved rather than being silently converted into thickness.
- FR97/FR98 role-free whole-contour separation is explicitly not lip thickness and cannot satisfy `端厚`.
- A future construct needs governed lip-boundary roles, capture normalization, and a decision on whether the target is visible vermilion fullness, geometric height, or another source-grounded feature.

### `角弓`

- Do not reduce this to generic mouth-corner curvature.
- Same-work contextual material associates `弓` with an upward mouth form and non-exposure of teeth, while other mouth text separately uses `形如角弓`.
- A future observation model therefore needs at least corner orientation/elevation, bow-like contour geometry, teeth-visibility handling, and a neutral-expression capture gate.
- Because smiling can reproduce part of this geometry, single-frame morphology classification remains unauthorized.

### `開大合小`

- Treat this as a relation between opening and closing states, not as a property that can be read safely from one neutral frame.
- The source gives no numeric aperture ratio or timing rule.
- A future operationalization requires controlled multi-state capture of the same subject and an explicitly governed definition of what `開大` and `合小` mean geometrically.
- No single-frame shortcut is authorized.

### `唇紅`

- The construct is an appearance/color criterion, independently corroborated by contextual mouth/lip material that prefers red coloration.
- Camera RGB values are not the traditional construct. Illumination, white balance, exposure, cosmetics, skin/lip segmentation, and device processing are confounders.
- Any future image feature requires color-calibrated capture and a governed appearance protocol before calibration or threshold work.

## Resulting research boundary

FR132 improves semantic decomposition and identifies what each future measurement would actually need to represent. It deliberately does **not**:

- approve `method.shenxiang.five_officers.intake_criteria@0.2.0 -> @0.3.0`;
- change `reviewStatus` from `research`;
- bind FR80, FR82, FR97, or FR98 to a traditional criterion;
- define a numeric threshold;
- issue a criterion state, physiognomy claim, or narrative.

The next useful work is criterion-specific construct validation, beginning with `方大`: define a neutral geometric observation for `方` that measures outline regularity/rectilinearity rather than reusing aspect ratio, and define an anatomically governed relative-size reference for `大`, before any calibration dataset or threshold is considered.
