# FR143 — Square-broad 方 neutral candidate metric synthetic verification

## Status

Research verification only. No traditional binding, construct validity, calibration, threshold, criterion state, claim, or narrative authority is issued.

## Predecessor

FR142 implemented three continuous neutral candidate metrics for the refined `方` research track:

- `neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0`
- `neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0`
- `neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0`

FR142 explicitly retained `traditionalCriterionBindingRef=null`, `calibrationRef=null`, and `numericClassificationThreshold=null` for every metric. FR143 does not alter those definitions.

## Goal

Verify numerical behavior that can be established without human semantic review or real-image collection:

1. deterministic repeatability for identical synthetic geometry,
2. translation invariance,
3. uniform positive scale invariance,
4. expected synthetic response to rectilinear versus smooth geometry,
5. expected horizontal-reflection residual response to a controlled asymmetry,
6. rotation invariance of the fourth-harmonic orientation concentration and turning-angle concentration,
7. explicit non-rotation-invariance of the horizontal-reflection residual because it intentionally references the canonical horizontal axis.

## Synthetic fixture panel

The fixture panel contains only generated geometry:

- `synthetic.face.mouth.circle_regular_20`
- `synthetic.face.mouth.ellipse_horizontal_20`
- `synthetic.face.mouth.rectangle_piecewise_20`
- `synthetic.face.mouth.asymmetric_ellipse_20`

Every fixture contains exactly two 20-point closed cycles to satisfy the FR142 neutral kernel surface. The second cycle is a geometrically smaller companion cycle; component order has no semantic role.

All fixtures carry:

```text
sourceClass = synthetic_geometry_only
traditionalLabel = null
humanSemanticLabel = null
empiricalCapture = false
```

They are not examples of `方`, `方口`, `四字口`, `方棱`, or any other traditional class.

## Qualitative synthetic relations

FR143 requires only directional relations that follow from the deliberately constructed geometry; it does not introduce classification cutoffs.

- piecewise rectangle has greater fourth-harmonic orthogonal edge-orientation concentration than the regular circle fixture,
- piecewise rectangle has greater turning-angle concentration than the regular circle fixture,
- controlled asymmetric ellipse has greater horizontal-reflection residual than the symmetric ellipse fixture,
- repeated evaluation of the exact same fixture produces the exact same kernel values,
- the panel must contain multiple distinct three-metric signatures.

These relations verify algorithm behavior. They are not evidence that a human face with similar values is traditionally `方`.

## Transformation verification

Tests verify all three metrics under translation and uniform positive scale using floating-point closeness assertions. No numerical tolerance is persisted as repository authority or product policy.

The fourth-harmonic orientation concentration and turning-angle concentration are also verified under arbitrary global rotation. The horizontal-reflection residual is intentionally not asserted rotation invariant; it is defined against the canonical horizontal axis of the pose-normalized face frame.

## Authority boundary

FR143 explicitly preserves:

```text
syntheticFixtureMeansTraditionalClass = false
syntheticDiscriminationMeansConstructValidity = false
syntheticRepeatabilityMeansEmpiricalCaptureRepeatability = false
metricSeparationMeansTraditionalCriterionBinding = false
syntheticFixtureMayBeUsedAsGroundTruthHumanLabel = false
syntheticFixtureMayBeUsedForCalibration = false
```

Execution remains:

```text
empiricalCaptureRecordsIssued = 0
humanSemanticLabelsIssued = 0
traditionalMetricBindingsIssued = 0
calibrationProtocolsIssued = 0
numericClassificationThresholdsIssued = 0
criterionStatesIssued = 0
structuredClaimsIssued = 0
boundedNarrativesIssued = 0
traditionalSemanticAuthority = false
```

## Next frontier

`square_broad_fang_real_capture_neutral_metric_repeatability_acquisition_extension_without_semantic_labels`

The next useful step is to extend the already governed neutral acquisition mechanics so FR142 values can be captured and summarized across repeated real captures without introducing any human semantic label. Real capture repeatability is a separate empirical question from the synthetic behavior verified here.
