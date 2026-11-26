# FR141 — Square-broad 方 source-lineage and construct refinement

Status: research refinement only; no traditional metric binding, calibration, threshold, criterion state, claim, narrative, or human collection authorization.

## 1. Authoritative baseline remains unchanged

The current governed source remains:

- criterion: `criterion.intake.square_broad`
- source concept: `方大`
- active construct scope: `fang_shape_candidate_features_only`
- authoritative source ref: `passage.shenxiang.five_officers.intake.nlc_1925`
- reviewed methodology: `method.shenxiang.five_officers.intake_criteria@0.3.0`

The governed passage contains `口須要方大...` but does not itself provide a machine-operational definition of `方`.

FR141 does **not** append new source refs to the Face Authority Registry and does not rewrite the reviewed methodology source snapshot. External material below is research evidence used to refine hypotheses and record lineage conflict only.

## 2. External research evidence inspected for FR141

Inspection date: 2026-09-05.

### E1 — 神相全編 `相口篇`: 四字口 and 方口 are separate named entries

Research URL:
`https://www.shidianguji.com/zh/book/SDZJ0174/chapter/1k2ktflb8mz9l`

The page preserves separate headings and verses for `四字口` and `方口`. Relevant morphology language includes:

- 四字口: `口角光明唇兩齊，兩頭略仰...`
- 方口: `方口齊唇不露牙...`

Research implication: the named-type taxonomy in this transmission does not justify a blanket equivalence `方口 == 四字口`.

### E2 — 欽定古今圖書集成, 藝術典卷634: the index preserves separate entries

Research URL:
`https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8F%A4%E4%BB%8A%E5%9C%96%E6%9B%B8%E9%9B%86%E6%88%90/%E5%8D%9A%E7%89%A9%E5%BD%99%E7%B7%A8/%E8%97%9D%E8%A1%93%E5%85%B8/%E7%AC%AC634%E5%8D%B7`

The `神相全編四` mouth index lists `四字口` and `方口` separately.

Research implication: separation of the named types is not limited to one modern transcription.

### E3 — 公篤相法, 上篇卷七: later commentary explicitly equates and geometrizes

Research URL:
`https://ctext.org/wiki.pl?chapter=439588&if=gb`

The text states:

- `方口者。即古之四字口也。上下四角有方棱。`
- immediately after that, a separate type `二．闊大` is described.

Research implications:

1. This is useful later commentary for a `four-corner / 方棱` visual hypothesis.
2. It conflicts with the separate `四字口` / `方口` taxonomy preserved in E1/E2.
3. The subsequent separate `闊大` section supports keeping `方` and `大/闊大` analytically separate during research.
4. `上下四角有方棱` is not promoted to the primary definition of the governed NLC target passage.

### E4 — 麻衣相法 textual transmission: 方, 四字, 齊, and corner language coexist

Research URLs:

- `https://www.tianyashuku.com/yijing/9620/813364.html`
- `https://www.tianyashuku.com/yijing/9620/813367.html`

The web transcription includes phrases such as `四字口方`, `水星得地口唇方`, `口方四字...`, while the named mouth-type section also describes `四字口` and `口方` separately.

Research implication: these phrases are useful for lineage analysis but do not resolve the taxonomy conflict by themselves.

### E5 — 1925 NLC 麻衣相法 scan: visual-source candidate only at FR141

File page:
`https://commons.wikimedia.org/wiki/File:NLC416-12jh002690-44091_%E9%BA%BB%E8%A1%A3%E7%9B%B8%E6%B3%95_%E7%AC%AC1%E5%8D%B7.pdf`

Direct PDF:
`https://upload.wikimedia.org/wikipedia/commons/a/a0/NLC416-12jh002690-44091_%E9%BA%BB%E8%A1%A3%E7%9B%B8%E6%B3%95_%E7%AC%AC1%E5%8D%B7.pdf`

Wikimedia identifies this as a 153-page scan of `麻衣相法 第1卷` associated with the NLC record and a 1925 edition. FR141 records the file as a visual-source candidate. **Exact mouth-illustration page locators are not admitted by FR141**, so the scan is not used here as a ground-truth visual label source.

### E6 — modern web mouth-shape illustrations

Modern internet diagrams that draw `四字口`, `方口`, `虎口`, etc. can help discover visual hypotheses but have uncertain editorial lineage and inconsistent taxonomy.

FR141 rule:

`modern Internet illustration != ground-truth label != traditional authority`

## 3. Source-lineage conflict

The research evidence supports recording the following conflict rather than silently reconciling it:

```text
Lineage / transmission A
神相全編 + 古今圖書集成 index
→ 四字口 and 方口 are separate named entries

Later commentary B
公篤相法
→ 方口 = 古之四字口
→ 上下四角有方棱
```

Therefore FR141 does not issue any of these equivalences:

```text
方 == 四字口
方 == 方口
方 == four sharp corners
方 == bounding-box square aspect ratio
```

The later `方棱` statement is retained as a **supporting research hypothesis**, not as an authority override.

## 4. Construct refinement

FR141 keeps the FR132 analytical split:

```text
方大
├─ 方: form / organization hypothesis track
└─ 大 / 闊大: breadth / relative-size hypothesis track
```

For `方`, the next neutral candidate family should test three distinct hypotheses rather than collapse them into one score:

1. `structural_regularity_and_alignment`
   - upper/lower contour correspondence
   - left/right organizational balance where derivable without semantic corner assignment
   - contour organization / regularity

2. `rectilinear_segment_persistence`
   - persistence of locally near-linear contour segments
   - distinct from literal width:height squareness

3. `localized_corner_distinctness_supporting_later_commentary`
   - localized concentration of direction change
   - motivated by later `上下四角有方棱`
   - must not presuppose that a provider contour vertex is a traditional named corner

These remain neutral geometry hypotheses. None is `方` until construct validity and later binding governance are satisfied.

## 5. Existing metric reclassification

FR141 does not delete or mutate FR80/FR82/FR134. It changes only their research role for the `方` track:

| Existing metric | FR141 role |
| --- | --- |
| `neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0` | deprioritized for `方`; possible size/shape context only |
| `neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0` | supporting neutral shape candidate, not a direct `方` proxy |
| `neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0` | supporting local direction-change candidate, not a named-corner metric |
| `neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0` | route toward `大/闊大` research, not a direct `方` proxy |

Important: FR82 still uses full-mesh horizontal span rather than an authorized anatomical face-width denominator. Routing it toward `大` research does not make it a validated `大` metric.

## 6. Human-review track

The project currently has no concrete independent human reviewer available for this criterion.

FR141 therefore records:

```text
reviewerActorAssignmentDeferred = true
humanSemanticCollectionAuthorized = false
empiricalSemanticEvidenceAcquisitionAuthorized = false
```

This is not abandonment of `方`. The measurable frontier is moved first to better source-grounded neutral candidate metric design. Human construct validation may be reopened later when an actual governed reviewer path exists.

No reviewer count, quorum, consensus threshold, adjudication rule, or qualification requirement is invented here.

## 7. Production boundary

FR141 issues no traditional semantic execution:

```text
newNeutralMetricDefinitionsIssued = 0
traditionalMetricBindingsIssued = 0
calibrationProtocolsIssued = 0
thresholdsIssued = 0
criterionStatesIssued = 0
structuredClaimsIssued = 0
boundedNarrativesIssued = 0
traditionalSemanticAuthority = false
```

Production remains fail-closed for `criterion.intake.square_broad`; FR141 does not alter the existing unsupported-method behavior.

## 8. Next frontier

`square_broad_fang_source_grounded_neutral_candidate_metric_design_and_runtime_without_traditional_binding`

The next implementation should design neutral metrics for upper/lower contour correspondence, rectilinear-segment persistence, and localized corner distinctness while preserving role-free geometry and without claiming that any candidate equals traditional `方`.
