# FR158 — Role-Invariant Eye-Pair Neutral Shape Metric Runtime

## Status

Research-only neutral-geometry extension. No anatomical laterality, morphology, identity matching, calibration, threshold, criterion state, traditional binding, structured claim, or narrative authority is issued.

## Problem

FR24 already materializes two 16-point MediaPipe eye closed cycles as a research projection, but its coordinate frame is `canonical_image_normalized_2d`. X and Y are normalized against different image dimensions. Directly treating raw normalized-coordinate width/height, edge orientation, or turning geometry as frame-independent shape would therefore silently inherit image-aspect scaling.

FR158 does not promote that surface into physical eye anthropometry. Instead, each closed cycle is independently mapped to an axis-wise unit box before shape-only measurements are computed. This intentionally removes translation, independent X/Y scale, absolute size, and original bounding-box aspect ratio.

## Source boundary

Input must validate as the existing FR24 `fr24-eye-pair-research-v1` artifact:

- exactly two research-only eye regions,
- exactly 16 points in each closed cycle,
- provider labels remain provenance only,
- pair consumption remains unordered for metric purposes,
- anatomical laterality remains unresolved,
- FR15 production neutral observation is not issued,
- the current provider binding is not promoted to release-exact authority,
- raw source/provider response/embedding persistence remains false.

FR158 consumes no provider-side label or provider-region order in its formulas.

## Unit-box normalization

For each 16-point cycle independently:

1. compute `minX`, `maxX`, `minY`, `maxY`,
2. require finite positive X/Y spans,
3. map every point to:
   - `x' = (x - minX) / (maxX - minX)`
   - `y' = (y - minY) / (maxY - minY)`.

This is a shape-only normalization. It is not pose compensation and must not be described as such.

## Candidate metrics

### 1. Unit-box area-fill mean

`neutral.eye_pair.closed_cycles.unit_box_area_fill_mean@0.1.0`

For each normalized cycle, compute absolute shoelace area. Because each normalized bounding box has unit area, the value is a dimensionless fill ratio. Aggregate by an equal mean over the two cycles.

### 2. Unit-box axis-alignment mean

`neutral.eye_pair.closed_cycles.unit_box_axis_alignment_mean@0.1.0`

For each of the 32 directed edges across the two normalized cycles, compute:

`max(abs(dx), abs(dy)) / hypot(dx, dy)`

and take the mean. No eye-side role is consumed.

### 3. Unit-box mean absolute turning angle

`neutral.eye_pair.closed_cycles.unit_box_mean_absolute_turning_angle@0.1.0`

For every one of the 32 vertices across the two normalized cycles, compute the principal angle between the incoming and outgoing unit directions and take the mean.

## Synthetic verification contract

The FR158 verifier must demonstrate without any source face image:

- deterministic rerun equality,
- invariance to translation plus independent X/Y scale before unit-box normalization,
- invariance when the two synthetic cycle shapes are exchanged between provider topology labels,
- invariance to closed-cycle direction reversal,
- all empirical, privacy, identity, threshold, and traditional-semantic gates remain fail-closed.

These are algorithmic invariance checks only. They do not establish empirical repeatability or construct validity.

## Empirical evaluation boundary

Any real-image evaluation remains ephemeral and must compare candidate metric behavior across repeated captures without converting the result into an identity-match score or same/different-person probability. Source images, full landmark sets, embeddings, identity templates, and subject-derived metric datasets are not persisted by this runtime.

FR158 intentionally issues no numeric acceptance threshold. Small within-capture variation, large between-capture variation, or any apparent group separation is descriptive evidence only until an independently governed empirical protocol establishes otherwise.

## Authority state

The following remain unresolved/false:

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

`eye_pair_neutral_shape_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion`
