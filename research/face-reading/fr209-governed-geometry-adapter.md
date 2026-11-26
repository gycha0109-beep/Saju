# FR209 — Governed geometry to FR208 adapter

Issue: #1028  
Stacked on: FR208 / PR #1024

## Goal

Connect FR208 neutral observable primitives to geometry that already exists inside the governed Face Reading pipeline.

FR209 does **not** add a new anatomy campaign. It either reuses an admitted geometry source or returns `unavailable`.

## Available paths

### Eye outer-corner tilt

Source:

- issued FR77 `canonical_aligned_right_handed_metric_3d`;
- existing FR24 two 16-point closed eye-cycle witness.

Derivation:

1. use the two existing closed-cycle vertex sets only as geometry selectors;
2. compute the full 468-landmark mesh X midpoint;
3. for each eye cycle, find unique X extrema;
4. choose the extremum closer to the mesh midpoint as the geometric inner endpoint and the farther extremum as the geometric outer endpoint;
5. require the two cycle centroids to lie on opposite sides of the mesh midpoint;
6. feed only the resulting XY geometry into FR208;
7. expose only the bilateral mean metric from the adapter.

The adapter does not expose provider indices and does not assign anatomical left/right authority. FR208's internal side fields are used only as deterministic canonical-X serialization before the bilateral mean is retained.

### Mouth-corner elevation

Source:

- issued FR79 two-contour unordered pose-normalized lips surface;
- reviewed FR79 projection rule `x2d=x3d;y2d=y3d`;
- canonical metric X-right / Y-up axes retained without recentering or rescaling.

Derivation:

1. union both unordered contour point sets;
2. require unique minimum-X and maximum-X visible extrema;
3. use those extrema as the visible horizontal mouth endpoints;
4. define the neutral visible mouth center as the union bounding-box center;
5. feed those explicit geometric points into FR208;
6. expose only the bilateral mean metric.

No outer/inner lip contour role is assigned.

## Explicitly unavailable paths

### Eyebrow

`neutral_brow_curve_not_authorized`

FR39 still forbids selecting or merging the two provider eyebrow components into a neutral single curve. FR209 therefore does not fabricate FR208 eyebrow inputs.

### Mid-face width

`governed_midface_band_not_authorized`

FR207 marks the mid-face as an operational candidate requiring representative-image validation. FR209 does not revive the FR199-FR205 zygion/calibration path and does not invent a product band.

### Lower-face width

`canonical_lower_face_projection_not_authorized`

FR50 still separates provider-independent lower-face/chin operationalization evidence from a canonical product 2D provider mapping. FR209 does not treat FACE_OVAL or soft-tissue width as mandibular bone geometry.

## Fail-closed behavior

FR209 returns `unavailable` rather than guessing when:

- an eye cycle has ambiguous X extrema;
- the two eye cycles do not lie bilaterally around the full-mesh X midpoint;
- governed FR79 lips geometry is not supplied;
- mouth X extrema are ambiguous;
- a required brow/mid-face/lower-face geometry authority does not exist.

Invalid or forged upstream governed artifacts are rejected rather than converted to `unavailable`.

## Authority boundary

FR209 issues no:

- provider-index-to-anatomy binding;
- anatomical laterality;
- zygion/bizygomatic binding;
- mandibular bone binding;
- threshold;
- classifier;
- traditional interpretation;
- Production activation;
- Commerce activation.

The frozen migrated package index is not modified.
