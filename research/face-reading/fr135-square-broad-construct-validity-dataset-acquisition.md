# FR135 — 方大 Construct-Validity Dataset Acquisition Runtime

Status: research / neutral acquisition runtime implemented / semantic annotation authority absent

## 1. Predecessor

FR134 closed the previous implementation frontier by issuing two role-invariant neutral shape metrics over the unordered FR79 lip contour set:

- `neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0`
- `neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0`

FR134 also published only a schema-level construct-validity dataset design. It explicitly left:

- materialized empirical datasets at zero,
- semantic annotations at zero,
- traditional metric bindings at zero,
- calibration protocols at zero,
- thresholds at zero,
- criterion states at zero.

Its next frontier is exactly:

` square_broad_construct_validity_annotation_governance_and_dataset_acquisition `

FR135 executes the acquisition half of that frontier and freezes the annotation-governance requirements without pretending that an annotation authority already exists.

## 2. What FR135 actually adds

FR135 adds a deterministic research acquisition boundary:

```text
issued FR134 neutral metric runtime
→ neutral capture record
→ repeat-capture series grouping
→ descriptive per-series neutral metric summary
→ neutral acquisition dataset manifest
```

The runtime records only the two new FR134 neutral shape metrics. It does not assign an outer/inner lip role, does not name a contour as an external mouth outline, and does not classify the record as `方`, `大`, or `方大`.

This is intentionally partial candidate-feature coverage. FR80 and FR82 remain separate neutral metrics and are not silently synthesized into this record.

## 3. Capture identity and repeatability

The acquisition key is a study-local tuple:

```text
researchSubjectRef
captureSeriesRef
captureRef
```

`researchSubjectRef` is required to be an opaque study-local reference at the API boundary. This does not prove anonymity and the artifact does not claim that it does.

A `captureSeriesRef` may contain multiple captures for one research subject. FR135 rejects a series that mixes research subjects and rejects duplicate `captureRef` values inside a materialized dataset.

FR135 does not invent:

```text
subject count
captures per subject
train/test split
acceptance threshold
```

Those values remain `null` until a governed study protocol supplies them.

## 4. Descriptive summaries only

FR135 can compute, for each neutral metric in a capture series:

```text
count
min
max
mean
range
```

These are descriptive observations for repeatability and capture-sensitivity research.

They are not:

```text
calibration
classification
acceptance thresholds
construct validity
traditional criterion states
```

No pass/fail cutoff is introduced.

## 5. Annotation governance boundary

FR134 requires independent semantic annotation before construct-validity claims can be made. FR135 freezes the following governance requirements:

```text
independent semantic annotation is required
annotation evidence must not be derived from the candidate metric values
source-grounded construct definition is required
```

But the following remain absent:

```text
annotationAuthorityRef = null
annotationProtocolRef = null
labelSchemaRef = null
reviewerCount = null
quorum = null
consensusThreshold = null
traditionalClassLabelsIssued = 0
```

The existing project-owner methodology governance does not automatically become semantic-annotation authority. Requirements for an annotation process are not themselves an issued annotation authority.

## 6. Construct scope

FR132 required `方大` to be decomposed analytically into `方` and `大`.

The two FR134 runtime metrics are shape candidates, so FR135 marks their active construct scope as:

`fang_shape_candidate_features_only`

This is not a claim that either metric measures traditional `方`. It only prevents the acquisition artifact from silently pretending it already covers the `大` relative-size problem.

The `大` denominator / anatomical-reference problem remains separate. FR82 remains a neutral full-mesh-span ratio and is not an anatomically governed face-width measurement.

## 7. Privacy boundary

This artifact stores no:

```text
raw image
source image bytes/content
face embedding
identity template
```

The product-level raw-image lifecycle remains outside this research record. A study-local subject reference is still potentially linkable research metadata and must not be called anonymized merely because it is opaque.

## 8. Authority boundary

All of the following remain false:

```text
neutral acquisition = construct validity
neutral acquisition = 方
neutral acquisition = 大
neutral acquisition = 方大 criterion
repeatability summary = construct validity
descriptive statistic = calibration
descriptive statistic = threshold
dataset materialization = traditional binding
dataset materialization = criterion state
dataset materialization = structured claim
dataset materialization = narrative
```

There is no LLM judgment path.

## 9. What has not happened

FR135 implements an acquisition runtime; it does not fabricate empirical captures.

At definition time:

```text
empiricalCaptureRecordsBundledAtDefinitionTime = 0
semanticAnnotationsIssued = 0
traditionalMetricBindingsIssued = 0
calibrationProtocolsIssued = 0
thresholdsIssued = 0
criterionStatesIssued = 0
structuredClaimsIssued = 0
boundedNarrativesIssued = 0
traditionalSemanticAuthority = false
```

A dataset object may only be materialized later from genuine capture records issued from genuine FR134 runtimes.

## 10. Next frontier

` square_broad_independent_semantic_annotation_authority_and_protocol_materialization_then_empirical_collection `

The next step is not a threshold. It is to materialize the governed independent semantic-annotation authority/protocol and then collect real repeated captures under that protocol. Construct-validity analysis comes only after both neutral observations and governed independent annotations exist.
