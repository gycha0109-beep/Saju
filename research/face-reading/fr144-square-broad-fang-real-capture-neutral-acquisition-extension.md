# FR144 — Square-broad 方 real-capture neutral acquisition extension

## Status

Neutral acquisition runtime extension only. No empirical capture rows or datasets are bundled in the repository by this phase.

## Why this phase exists

FR142 implemented three role-invariant neutral candidate metrics for the refined `方` research track. FR143 verified deterministic and transformation behavior only on synthetic geometry. Neither phase established real-capture repeatability, construct validity, traditional binding, calibration, or thresholds.

FR135 already established the reusable neutral acquisition mechanics:

```text
researchSubjectRef
captureSeriesRef
captureRef
→ issued neutral capture record
→ same-subject series grouping
→ descriptive count/min/max/mean/range
→ dataset manifest
```

FR144 reuses those identity and grouping invariants without modifying FR135 and extends them to the three FR142 metric values.

## Input authority

A FR144 neutral capture record can be issued only from an artifact issued by the active FR142 runtime. The standalone FR142 synthetic kernel is not accepted as capture input.

This distinction prevents synthetic geometry from being relabeled as empirical capture data.

Required metric refs:

- `neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0`
- `neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0`
- `neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0`

All remain continuous neutral ratios with no traditional binding or calibration.

## Capture identity and grouping

FR144 reuses the FR135 identity shape:

```text
researchSubjectRef
captureSeriesRef
captureRef
```

The dataset materializer preserves these invariants:

- `captureRef` must be unique across the dataset,
- one `captureSeriesRef` cannot mix multiple `researchSubjectRef` values,
- series are summarized descriptively,
- no required subject count is invented,
- no required captures-per-subject count is invented,
- no split ratio is invented,
- no numeric repeatability acceptance threshold is invented.

## Descriptive summaries

For each of the three FR142 metrics, each capture series may emit only:

```text
count
min
max
mean
range
```

The summary explicitly carries:

```text
classificationApplied = false
calibrationApplied = false
acceptanceThresholdApplied = false
```

A descriptive range or mean is not a repeatability pass/fail rule.

## Semantic boundary

Neutral metric acquisition does not require semantic annotation. FR144 therefore does not invent a reviewer, annotation authority, label schema, quorum, consensus policy, or semantic label.

A future dataset may be joined to separately governed human annotations, but this extension itself emits none.

```text
humanSemanticLabelsIssued = 0
traditionalMetricBindingsIssued = 0
calibrationProtocolsIssued = 0
thresholdsIssued = 0
criterionStatesIssued = 0
structuredClaimsIssued = 0
boundedNarrativesIssued = 0
traditionalSemanticAuthority = false
```

## Synthetic versus empirical evidence

FR143 established only algorithm-level synthetic behavior.

```text
synthetic repeatability != empirical capture repeatability
synthetic discrimination != construct validity
neutral acquisition capability != empirical repeatability established
```

FR144 records this distinction directly in both the contract and capture provenance boundary.

## Privacy boundary

This artifact stores no:

- raw image,
- source image content,
- raw provider response,
- face embedding,
- identity template.

`researchSubjectRef` must be a study-local opaque reference, but FR144 does not claim that the reference is anonymous.

## Definition-time materialization

```text
empiricalCaptureRecordsBundledAtDefinitionTime = 0
empiricalDatasetsBundledAtDefinitionTime = 0
```

No fake real-capture dataset is created to exercise the runtime. Successful record issuance requires an actually issued FR142 runtime artifact originating through the governed face geometry pipeline.

## Next frontier

`square_broad_fang_governed_real_capture_dataset_materialization_for_descriptive_repeatability_observation_without_semantic_labels`

The next substantive question is whether governed real capture inputs exist and can be materialized through this extension. If they do not exist, repository code cannot manufacture empirical evidence.
