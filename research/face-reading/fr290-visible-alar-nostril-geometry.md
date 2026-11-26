# FR290 — Visible alar and nostril geometry

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR290 materializes the FR282 product column:

```text
nose.alar_width_and_nostril_geometry
```

without assigning provider indices, anatomical laterality, hidden boundaries, skeletal width, traditional physiognomy semantics, or classification thresholds.

## Governed input boundary

The extractor consumes only explicit visible semantic geometry:

- one unordered visible alar boundary pair;
- two unordered visible nostril contours;
- the existing FR287 visible nose-tip contour as a scale reference;
- a matching governed pose-normalized 2D observation/extractor/model provenance attestation.

The two nostril contours have no left/right meaning.

The alar pair has no first/second semantic meaning.

Provider landmark indices and raw landmarks are not exposed.

## Neutral axes

FR290 issues exactly three scale-invariant continuous axes:

```text
neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0
neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0
neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0
```

Definitions:

1. visible alar horizontal span divided by the horizontal span of the governed FR287 tip contour;
2. arithmetic mean of the two unordered nostril bounding-box width/height ratios;
3. absolute nostril contour-area difference divided by their mean area.

The third axis is role-free and therefore unchanged when the two nostril contours are swapped.

## Explicit non-authority

FR290 does not issue:

- provider-index-to-alar or provider-index-to-nostril semantics;
- anatomical left/right nostril roles;
- hidden nostril boundary completion;
- skeletal nasal width;
- physical anthropometric claims;
- traditional nose states;
- calibration;
- thresholds;
- classifier outputs;
- RGB depth or relative-3D projection.

## Fail-closed behavior

The extractor returns unavailable when observable geometry collapses:

- visible alar horizontal span;
- tip-contour horizontal span;
- nostril horizontal span;
- nostril vertical span;
- nostril contour area.

Malformed semantic contours, repeated closure vertices, self-intersections, non-finite coordinates, or mismatched observation/extractor/model provenance are rejected rather than repaired.

## Canonical payload effect

FR290 preserves the closed FR282 schema:

```text
FR282 feature keys                 = 29
represented payload keys           = 29
structurally missing keys          = 0
canonical extractors materialized  = 15
extractor / authority gaps         = 14
```

Only:

```text
nose.alar_width_and_nostril_geometry
```

moves from the FR287/FR289 explicit extractor gap to a materialized canonical extractor.

`nose.tip_bridge_relative_projection` remains unavailable pending provider-neutral RGB relative-3D validation.

## Remaining frontier

The remaining 14 columns must retain their existing blocker classes.

Do not use this FR290 geometry to bypass:

- eyebrow provider-component role authority;
- upper/lower lip-role authority;
- philtrum neutral-axis definition;
- appearance/segmentation model requirements;
- ear visibility admission;
- RGB relative-3D provider validation;
- currently unavailable ear internal-structure authority.

Watchtower-Track: face-engine
