# FR158 — Role-Invariant Eye-Pair Neutral Shape Metric Runtime

## Status

Research-only neutral-geometry extension over issued FR77 canonical-aligned metric 3D geometry. No anatomical laterality, morphology, identity matching, calibration, threshold, criterion state, traditional binding, structured claim, or narrative authority is issued.

## Why FR77 metric 3D is the source

FR24 exposes two 16-point eye closed cycles in image-normalized 2D, but X and Y are normalized by different frame dimensions and FR77 explicitly blocks an unreviewed metric-XYZ-to-2D projection shortcut. FR158 therefore does **not** invent a new 2D projection and does not treat image-normalized eye geometry as physical eye shape.

Instead FR158:

1. consumes an actually issued FR77 `canonical_aligned_right_handed_metric_3d` artifact,
2. uses the pinned FR24 eye topology vertex sets only to select two 16-point cycles from the first 468 metric landmarks,
3. performs every candidate computation directly in canonical metric 3D,
4. aggregates the two cycles without assigning anatomical left/right roles.

The FR24 eye topology witness remains research provenance and is not promoted to release-exact provider authority by FR158.

## Candidate metrics

### 1. Mean cycle X-span / full-mesh X-span

`neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

For each 16-point cycle, compute `max(x)-min(x)` in FR77 metric 3D. Average the two cycle spans and divide by the X span of all 468 metric landmarks.

This is a relative canonical-geometry scale candidate. It is not physical soft-tissue anthropometry.

### 2. Mean 3D cycle perimeter / full-mesh X-span

`neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0`

For each cycle, sum Euclidean 3D distances over its 16 closed-cycle edges. Average the two perimeters and divide by full-mesh X span.

### 3. 3D cycle-centroid separation / full-mesh X-span

`neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0`

Compute the 3D centroid of each 16-point cycle, then divide their Euclidean 3D separation by full-mesh X span. This is not an anatomical inner-canthus or interpupillary-distance claim.

### 4. Mean 3D closed-cycle absolute turning angle

`neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0`

For all 32 vertices, compute the principal angle between incoming and outgoing 3D unit directions and take the mean.

## Role-invariance boundary

- Provider topology symbols select pinned vertex sets only.
- Provider topology symbols are not consumed as anatomical side labels.
- The formulas use symmetric aggregation over the two cycles.
- No anatomical laterality is resolved.
- No provider label is converted into a semantic role.

## Projection boundary

FR158 does **not**:

- drop FR77 Z to create a new 2D surface,
- claim a reviewed 2D projection,
- claim a pose-normalized 2D eye surface,
- bypass the FR77 `metric_xyz_to_pose_normalized_2d_without_reviewed_projection` prohibition.

All four candidates are defined directly in FR77 canonical-aligned metric 3D.

## Development-set boundary

The candidate family was explored during the current development session. Any already-seen development captures are therefore unsuitable as prospective validation evidence. Their behavior may be used only to decide what should be tested next.

FR158 explicitly records:

- `candidateSelectionState: exploratory_feature_definition_not_validation`
- `currentDevelopmentCapturesCanEstablishValidation: false`
- `prospectiveFreshCaptureEvaluationRequired: true`

A fresh prospective capture set is required before making a repeatability or construct-validity claim.

## Verification contract

The verifier must use an issued FR77 geometry artifact and independently recompute the four formulas from the FR77 metric landmarks plus the pinned FR24 eye topology vertex sets. It must also verify that:

- FR77 exact geometry metadata remains verified,
- the two topology sets remain 16 points each and within the 468-landmark surface,
- no 2D projection is introduced,
- empirical validation remains false,
- no identity matching, embedding, biometric template, calibration, threshold, morphology, or traditional semantics are issued.

Algorithm agreement on a deterministic fixture is implementation verification only, not empirical repeatability.

## Privacy

FR158 does not persist source images, provider responses, raw landmark sets, derived full-face metric geometry, embeddings, identity templates, or metric values. Real-image development execution remains ephemeral.

## Authority state

```yaml
captureQualityValidated: false
empiricalRepeatabilityEstablished: false
captureQualityMeasurementConstructValidated: false
numericCaptureQualityThreshold: null
numericRepeatabilityAcceptanceThreshold: null
constructValidity: unresolved
traditionalBinding: unresolved
traditionalSemanticAuthority: false
```

## Next frontier

`prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion`
