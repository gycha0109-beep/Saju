# FR216 — Canonical visible lower-face contour projection

Issue: #1063  
Stacked on: FR215 / PR #1062

## Decision

FR207 lists `canonical_product_2d_chin_contour_projection` as a missing product primitive.

FR216 closes the observable-geometry portion of that gap as a **visible soft-tissue lower-face contour projection**. It deliberately does not rename the visible contour as a mandibular or anatomical chin boundary.

## Reused authority

FR216 consumes:

- issued FR77 canonical-aligned metric geometry;
- issued FR79 unordered lips geometry from the same provider run and canonical asset;
- the FR211 recorded FACE_OVAL selector;
- the same visible mouth-line rule used by FR213.

## Projection rule

1. Compute the visible mouth line as mean canonical Y of the full unordered FR79 lips contour union.
2. Traverse the recorded FACE_OVAL selector in its pinned contour order.
3. Retain vertices whose canonical Y is at or below the visible mouth line.
4. Require the retained vertices to form one contiguous selector run.
5. Emit the retained points as canonical metric XY without recentering, rescaling, smoothing, or interpolation.

The output contains coordinates only. Provider vertex indices are not exposed.

## Interpretation boundary

The result may be consumed as visible lower-face/chin-region soft-tissue contour geometry.

It does **not** establish:

- mandibular bone boundary;
- Gonion;
- jaw-bone width;
- anatomical chin boundary;
- a traditional 地閣 state.

## Fail closed

Unavailable is returned when:

- fewer than three selector vertices remain;
- retained points contain duplicates;
- retained selector vertices are disconnected.

Forged/unissued FR77 or FR79 artifacts are rejected.

## Authority

No classifier, threshold, calibration, traditional binding, Production activation, or Commerce activation is issued.
