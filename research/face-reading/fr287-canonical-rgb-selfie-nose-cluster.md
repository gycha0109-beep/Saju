# FR287 — Canonical RGB selfie morphology: nose cluster

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR287 continues the direct product-facing canonical morphology line after FR286.

FR282 marks two nose columns as `reusable_now` using the existing neutral nose geometry implementation in `nose-geometry.ts`. FR287 promotes those two continuous neutral observations into the canonical morphology payload.

No traditional nose interpretation is introduced.

## Materialized FR282 columns

### nose.bridge_centerline_deviation

Source metric:

`neutral.nose.bridge.centerline_rms_deviation@0.1.0`

The value remains a pose-normalized 2D continuous ratio.

FR287 does not call the existing calibrated bridge-straightness classifier and does not emit any traditional criterion.

### nose.tip_contour_circularity

Source metric:

`neutral.nose.tip.contour_circularity@0.1.0`

The value remains 2D visible contour circularity only.

It is explicitly not treated as nose-tip fullness or projection.

## Explicit gaps retained

- `nose.alar_width_and_nostril_geometry`
- `nose.tip_bridge_relative_projection`

The first needs a dedicated visible alar/nostril boundary extractor.

The second requires the separate RGB relative-3D provider path. No depth value is inferred from 2D circularity.

## Nose input boundary

FR287 accepts an already-governed semantic neutral nose input bundle:

- ordered bridge centerline points;
- ordered tip contour points;
- pose-normalized 2D coordinates;
- same observation/extractor/model contract across bridge and tip;
- no provider-specific index exposure;
- no traditional binding.

FR287 does not authorize a new provider-index-to-nose-semantic mapping. The product payload only receives the resulting canonical continuous morphology values.

## Payload coverage after FR287

Represented FR282 columns:

- eye pair: 5
- mouth/lips: 6
- cheek/mid-face: 3
- chin/lower-face: 4
- nose: 4

Total represented: **22 / 29**

Actually materialized continuous/contour geometry columns: **13**.

Remaining pending: **7 / 29**.

## Remaining FR282 columns

The remaining seven are:

- forehead.visible_width_shape
- forehead.visible_hairline_boundary
- forehead.relative_surface_curvature
- eyebrow.span_arch_tail_orientation
- eyebrow.visible_hair_density_texture
- ear.visible_boundary_height_shape
- ear.thickness_attachment_canal_boundary

The eye eyelid/hooded column is already represented in the FR284 eye cluster as an explicit unavailable product feature, so it is not part of the remaining seven.

The next engine step should bind the remaining non-depth geometry/visibility clusters without inventing semantics or restarting general camera research.
