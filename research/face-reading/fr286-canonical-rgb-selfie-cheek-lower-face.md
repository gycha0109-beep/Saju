# FR286 — Canonical RGB selfie morphology: cheek and lower-face cluster

Status: implementation

Watchtower-Track: face-research

## Purpose

FR286 continues the direct product implementation line.

It binds already-governed cheek/mid-face and lower-face observations into the provider-neutral canonical RGB selfie morphology payload. It does not create a new camera, calibration, depth, or validation research line.

## Materialized FR282 columns

- `cheek_midface.visible_width_ratio` from FR211
- `cheek_midface.visible_contour_prominence` from FR217
- `chin_lower_face.visible_width_ratio` from FR213
- `chin_lower_face.visible_contour` from FR216

The first three are continuous ratio observations.

The FR216 contour is exposed only as an ephemeral provider-neutral canonical 2D contour:

- no provider landmark indices;
- no anatomical mandibular-bone claim;
- no persistence authority;
- no physical anthropometry claim.

## Explicit gaps retained

- `cheek_midface.relative_3d_prominence`
- `chin_lower_face.chin_height_width_center_deviation`
- `chin_lower_face.relative_projection`

No relative-3D value is invented from 2D contour geometry, and FR216 is not relabeled as a mandibular bone boundary.

## Unavailable propagation

FR211, FR217, FR213 and FR216 can all fail closed on insufficient visible geometry.

FR286 preserves those unavailable states and their source reasons. It does not synthesize fallback widths, prominence, or contour points.

## Payload coverage after FR286

Represented FR282 columns:

- eye pair: 5
- mouth/lips: 6
- cheek/mid-face: 3
- chin/lower-face: 4

Total represented: **18 / 29**

Remaining pending: **11 / 29**

Actually materialized existing-source geometry columns: **11**.

## Next cluster

After FR286, the remaining existing-source binding candidates are:

- nose.bridge_centerline_deviation
- nose.tip_contour_circularity
- eyebrow.span_arch_tail_orientation

The other remaining columns require dedicated segmentation, appearance, relative-3D, visibility, or new neutral-geometry extractors.
