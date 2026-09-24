# FR292 — Visible eyebrow pair geometry

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR292 materializes the FR282 product column:

```text
eyebrow.span_arch_tail_orientation
```

without converting MediaPipe eyebrow provider components into semantic brow roles.

## Existing authority

FR208 already defines product-neutral observable metrics from an explicit visible eyebrow curve:

```text
neutral.eyebrow.span_to_face_width_ratio@0.1.0
neutral.eyebrow.arch_amplitude_to_span_ratio@0.1.0
neutral.eyebrow.lateral_endpoint_tilt_degrees@0.1.0
```

FR39 and FR42 remain fail-closed:

- each published provider eyebrow topology contains two disconnected open-path components;
- no component may be selected as the neutral brow curve;
- component order has no anatomical meaning;
- no component merge or pointwise correspondence is authorized;
- the single-fixture image-upper signal does not authorize provider-component role mapping.

FR292 does not alter any of those findings.

## Product boundary

FR292 accepts only an explicit governed visible semantic input:

- two unordered visible eyebrow curves;
- each curve supplies explicit visible medial and lateral endpoints;
- each curve supplies an ordered visible curve from the explicit medial endpoint to the explicit lateral endpoint;
- one unordered visible face-width reference pair;
- canonical aligned right-handed metric XY;
- a same-capture canonical-asset attestation against the FR77 full-face geometry.

This contract is intentionally downstream of whatever reviewed observer supplies the semantic visible curve.

FR292 does **not** create or claim a raw-RGB eyebrow detector.

## Pair aggregation

Each explicit visible curve is evaluated through FR208.

The two per-curve results are aggregated without assigning left/right pair order.

FR292 issues exactly three pair axes:

```text
neutral.eyebrow.visible_pair.mean_span_to_face_width_ratio@0.1.0
neutral.eyebrow.visible_pair.mean_arch_amplitude_to_span_ratio@0.1.0
neutral.eyebrow.visible_pair.mean_lateral_endpoint_tilt_degrees@0.1.0
```

The pair aggregation is arithmetic mean only.

Swapping the two brow curves does not change the output.

Swapping the visible face-width pair does not change the output.

## Explicit non-authority

FR292 does not issue:

- provider eyebrow component selection;
- provider component merging;
- cross-component point correspondence;
- provider component role mapping;
- anatomical eyebrow boundary authority;
- provider landmark indices;
- raw landmarks;
- traditional eyebrow semantics;
- Three-Divisions claims;
- F1/F6 production claims;
- thresholds;
- classifiers;
- calibration;
- raw-RGB detection authority.

## Fail-closed behavior

FR292 returns unavailable when:

- the visible face horizontal width collapses;
- either explicit visible brow horizontal span collapses.

Malformed semantic visible curves are rejected by the FR208 boundary.

Visible brow points outside the supplied visible-face horizontal envelope are rejected.

## Canonical payload effect

FR292 preserves the closed FR282 schema:

```text
FR282 feature keys                 = 29
represented payload keys           = 29
structurally missing keys          = 0
canonical extractors materialized  = 17
extractor / authority gaps         = 12
materialized regions               = 6
```

`eyebrow` becomes a materialized region for the first time.

Only:

```text
eyebrow.span_arch_tail_orientation
```

moves from `eyebrow_boundary_role_wiring_not_materialized` to a materialized canonical extractor.

## Remaining frontier

After FR292, the remaining 12 FR282 gaps are concentrated in harder classes:

- forehead segmentation and hairline image modeling;
- eyebrow visible hair density/texture appearance modeling;
- eyelid crease/hooded visible-category image modeling;
- RGB relative-3D nose projection validation;
- governed visible upper/lower lip fullness-role authority;
- controlled visible lip color modeling;
- ear visibility admission and visible-ear image modeling;
- currently unavailable ear thickness/attachment/canal authority;
- RGB relative-3D cheek prominence validation;
- RGB relative-3D chin/lower-face projection validation.

The unresolved FR39/FR42 provider-component role question remains unresolved and must not be backfilled from FR292.

Watchtower-Track: face-engine
