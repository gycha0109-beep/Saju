# FR218 — Observable Morphology Validation Layer

> Repository: `gycha0109-beep/Saju`  
> Track: Face Reading validation / research  
> Issue: #1067  
> Stack base: FR217 / PR #1066  
> FR217 head used for this work: `87e55480f6774af83cf713a58f9bf11e2a8ed53c`  
> Fresh repository main observed before starting FR218: `9be5b75a3a2c96888e62e3eb89c72382bb8f36c4`  
> Status: research validation contract only  
> Merge boundary: no merge without explicit approval

## 1. Problem

FR206 through FR217 intentionally produce neutral, continuous, observable measurements while keeping all of the following false:

```text
classification
threshold
calibration
traditional binding
Production
Commerce
```

That closes the measurement side of the pipeline, but not the next question:

> Does a continuous neutral measurement correspond to the morphology that blinded humans actually perceive?

The existing Face Reading calibration framework already has strong safeguards such as repeat capture, reviewer blinding, participant-level selection/holdout separation, abstention, and threshold-selection evidence separation.

However its primary study contract is already coupled to:

```text
methodologyRef
criterionId
traditionalSourceRefs
```

That is too late in the pipeline for the current frontier.

FR218 therefore adds a separate observable-morphology validation layer between neutral measurement and traditional criterion operationalization.

## 2. Layer boundary

```text
A. Capture eligibility
↓
B. Continuous neutral measurement
↓
C. Observable morphology validation        ← FR218
↓
D. Traditional criterion operationalization
↓
E. Traditional Face Reading claim
```

FR218 owns only layer C.

It does not decide whether a traditional source term such as `目長`, `方`, or any named physiognomy class applies.

## 3. Initial bounded construct

The first construct is deliberately small:

```text
observable.eye_pair.outer_corner_orientation@0.1.0
```

Candidate measurement:

```text
neutral.eye.outer_corner_tilt.mean_degrees@0.1.0
```

The metric comes from the FR210/FR208 neutral geometry path.

The metric is only a candidate measurement. It is not a label and does not define a morphology class by itself.

## 4. Human-observable vocabulary

Reviewer question:

> 이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?

Ordinal response vocabulary:

```text
확실히 내려감
약간 내려감
거의 수평
약간 올라감
확실히 올라감
판단 불가
```

The executable keys are:

```text
clearly_downturned
slightly_downturned
approximately_horizontal
slightly_upturned
clearly_upturned
not_assessable
```

This vocabulary describes visible morphology only.

It does not expose traditional terminology or fortune semantics to the reviewer.

## 5. Near-boundary correction

FR218 does **not** identify a near-boundary region before human labels exist.

That would invert the required study order.

Correct sequence:

```text
continuous candidate measurements
→ deterministic metric-space coverage sampling
→ blinded human ordinal labels
→ empirical label transition distribution
→ later uncertainty / transition-zone estimation
→ later threshold or classifier review
```

Before human evidence exists, FR218 only chooses candidates to cover the measured metric space.

The resulting selection explicitly records:

```text
nearBoundaryPreassigned = false
humanLabelsUsedForSelection = false
thresholdIssued = false
transitionZoneIssued = false
classifierIssued = false
```

## 6. Blind review projection

The review surface must not expose:

```text
metric value
metric-space bin
candidate threshold
traditional label
fortune output
peer labels
```

The review item contains only:

```text
review artifact reference
observable construct prompt
ordinal response vocabulary
```

The actual UI/storage implementation for reviewer collection is outside FR218.

## 7. Capture eligibility boundary

FR218 does not own or invent an automatic capture-quality gate.

The current Eye-Pair capture research lineage explicitly does not authorize an automatic numeric capture-quality pass/fail threshold. Therefore FR218 must not convert a caller boolean into capture-quality authority.

Each candidate must carry:

```text
captureEligibilityRef
captureEligibilitySource = external_governed_research_manifest
```

FR218 records the upstream admission reference but does not re-evaluate capture quality:

```text
captureEligibilityReevaluatedByFR218 = false
```

This preserves the layer boundary:

```text
A. capture eligibility authority
→ admitted research-manifest record

B/C. neutral metric + observable morphology validation
→ FR218
```

Synthetic tests use protocol-local fixture refs only to verify contract mechanics. They do not constitute real capture eligibility evidence.

## 8. Selection / holdout and identity leakage

FR218 reuses the existing calibration partition vocabulary:

```text
selection
holdout
```

The candidate-pool validator rejects:

```text
same participant in both partitions
same capture family in both partitions
one capture family assigned to multiple participants
duplicate sample identity
```

Threshold selection remains out of scope.

The holdout partition must not be used merely to tune an eventual threshold.

## 9. Reviewer disagreement

FR218 preserves raw reviewer labels and returns descriptive per-label counts.

It does not automatically collapse disagreement into one morphology truth.

For each review item it preserves:

```text
label counts
not-assessable count
number of distinct assessable ordinal labels
annotation count
```

and explicitly records:

```text
reviewerDisagreementPreserved = true
consensusCollapsed = false
```

A later study may define an agreement or latent-label model, but that requires separate authority.

## 10. Repeat capture

The current FR218 code does not manufacture repeat-capture evidence.

Existing Face Reading calibration infrastructure already separates:

```text
repeat_capture_stability
blinded_expert_operationalization
threshold_selection_result
```

FR218 requires real repeat-capture evidence before the later classifier/threshold layer can claim validated stability.

Synthetic fixtures are algorithm tests only.

## 11. Human evidence gate

Current repository execution evidence for this new observable construct does not contain the required blinded human annotations or repeat-capture validation.

Therefore the current FR218 evidence state is:

```text
HUMAN_EVIDENCE_REQUIRED
```

Synthetic tests cannot satisfy this gate.

Even when evidence references are later supplied, FR218 only reports:

```text
EVIDENCE_REFERENCES_PRESENT_REQUIRES_NEXT_STAGE_REVIEW
```

It still does not issue:

```text
threshold
classifier
transition zone
traditional binding
```

## 12. Authority boundary

FR218 must remain:

```text
observable morphology only
anatomy claim = false
threshold = false
classifier = false
transition zone = false
traditional binding = false
Production = false
Commerce = false
```

Forbidden shortcuts:

```text
metric sign → upturned/downturned truth
metric quantile → near-boundary truth
synthetic fixture → human evidence
majority label → automatic traditional criterion
observable label → traditional physiognomy claim
missing label → negative evidence
```

## 13. Current completion condition

FR218 is complete as an executable research contract when:

1. the observable construct and ordinal vocabulary are encoded;
2. FR210 candidate measurement admission is fail-closed;
3. selection/holdout leakage is rejected;
4. metric-space coverage sampling is deterministic;
5. reviewer projection is blind to metric/traditional information;
6. reviewer disagreement is preserved;
7. synthetic fixtures cannot satisfy the human evidence gate;
8. dedicated tests and CI pass.

Empirical morphology validation is **not** complete at that point.

It remains:

```text
HUMAN_EVIDENCE_REQUIRED
```
