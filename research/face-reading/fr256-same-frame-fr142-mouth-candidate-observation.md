# FR256 — Same-frame FR142 mouth candidate observation extension

Watchtower-Track: `face-research`

## Purpose

FE041H requires empirical repeat-capture / capture-quality evidence before the three FR142 mouth-contour candidate metrics can be considered for product-neutral canonicalization.

That evidence must be produced by the existing `face-research` capture/validation lane rather than by a duplicate FE-side capture system.

FR256 therefore reuses the existing FR250 governed challenge-first live-camera protocol while keeping FR242 frozen to the FR237 eye primary metric.

## Exact candidate metrics

FR256 observes exactly:

- `neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0`
- `neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0`
- `neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0`

No traditional `方` meaning is attached.

## Same-frame execution design

The FR256 prepared binding replaces only the FR250 primary-metric preparer.

One provider run produces the release-exact 468-point FR76 metric geometry.

From that same ephemeral geometry:

1. the existing FR237 eye primary metric is computed after the FR242 quality gate;
2. the release-exact MediaPipe lips topology is resolved into two unordered 20-point closed cycles;
3. canonical metric XY is used as the same pose-normalized 2D contour surface already governed by the FR78/FR79 path;
4. the exact public FR142 neutral kernel computes the three candidate ratios;
5. sanitized mouth observations are published only when FR242 actually invokes the primary metric extractor after quality acceptance.

A quality-rejected capture therefore emits no FR256 mouth observation.

## Privacy and persistence

FR256 retains no:

- raw JPEG;
- raw image digest;
- provider response;
- raw landmark set;
- full metric geometry;
- face embedding;
- identity template.

Only the three sanitized neutral ratio values plus bounded capture provenance are retained by the FR256 wrapper coordinator.

## Compatibility

FR256 does not mutate:

- FR242 contract;
- FR246 contract;
- FR250 capture protocol;
- historical FR251 export schema.

Instead, it wraps FR250 with an alternate same-frame metric preparer and exposes a separate sanitized FR256 observation list.

This avoids reinterpreting the already-completed first FR251 phone dry run.

## Relationship to FR255

FR255 remains the longitudinal observation-bundle lane.

FR256 does not create a second longitudinal repeatability system.

The intended sequence is:

```
FR250 / FR251 governed capture mechanics
        ↓
FR256 same-frame FR142 candidate observations
        ↓
temporally separated real executions
        ↓
FR255-compatible longitudinal descriptive review / successor governed bundle
        ↓
face-research evidence artifact
        ↓
FE041H evidence intake
```

## Authority boundary

FR256 does not issue:

- repeatability PASS/FAIL;
- acceptable-error threshold;
- empirical sufficiency;
- capture-quality construct validation;
- calibration;
- classifier;
- traditional `方` mapping;
- FE035B registry admission;
- FE041H canonicalization authorization;
- Production authority;
- Commerce authority.

The three values remain descriptive neutral research observations.

## Next frontier

`wire_fr256_into_a_separate_operator_surface_then_collect_temporally_separated_real_repeat_capture_observations_for_fr142_candidates`
