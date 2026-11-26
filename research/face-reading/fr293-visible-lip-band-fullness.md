# FR293 — Visible lip-band fullness axes

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR293 materializes:

```text
mouth.visible_lip_fullness
```

as continuous product-neutral visible lip-band geometry.

## Critical authority separation

FR293 does **not** reinterpret the existing MediaPipe/provider lips contours.

FR84–FR98 remain authoritative that:

- the existing lips contours are an unordered set with no authorized anatomical outer/inner roles;
- contour nesting does not create anatomical roles;
- cross-contour distance or role-free separation does not mean lip thickness;
- the role-free arclength separation metric does not authorize thickness or traditional substantial-lips semantics.

FR293 leaves all of those restrictions unchanged.

## Explicit semantic input

FR293 consumes a separate upstream observation:

- one explicit ordered simple polygon for the visible upper lip band;
- one explicit ordered simple polygon for the visible lower lip band;
- explicit image-visible upper/lower role assignment;
- visibility admission;
- pose-normalized face 2D coordinates;
- canonical asset identity matching the issued FR79 lips geometry.

This is governed semantic geometry only.

FR293 does not claim to implement the raw-RGB segmentation observer that produces these polygons.

## Neutral axes

FR293 issues exactly three scale-invariant axes:

```text
neutral.mouth.visible_upper_lip_band.vertical_span_to_mouth_width_ratio@0.1.0
neutral.mouth.visible_lower_lip_band.vertical_span_to_mouth_width_ratio@0.1.0
neutral.mouth.visible_lip_bands.combined_area_to_mouth_width_squared_ratio@0.1.0
```

The normalization width comes from the governed FR79 visible mouth horizontal envelope through the FR291 mouth-width reference contract.

These axes describe visible 2D band morphology only.

They do not issue:

- a categorical fullness state;
- anatomical lip thickness;
- physical anthropometry;
- millimeter measurements;
- traditional `duan_hou` semantics.

## Geometry invariants

Polygon area is absolute, so winding direction does not matter.

Vertical span and area do not depend on the polygon starting vertex.

Duplicate closure vertices, repeated vertices, and self-intersecting polygons are rejected.

Both visible band polygons must remain inside the FR79 visible mouth horizontal envelope.

## Fail-closed behavior

Unavailable is returned for:

- collapsed visible mouth horizontal span;
- collapsed upper visible-band vertical span;
- collapsed lower visible-band vertical span;
- collapsed upper visible-band polygon area;
- collapsed lower visible-band polygon area.

Cross-capture canonical asset joins and malformed authority input are rejected.

## Canonical payload effect

```text
FR282 feature keys                 = 29
represented payload keys           = 29
structurally missing keys          = 0
canonical extractors materialized  = 18
extractor / authority gaps         = 11
materialized regions               = 6
```

Only `mouth.visible_lip_fullness` moves from
`governed_lip_fullness_extractor_not_materialized` to a canonical materialized extractor.

## Remaining frontier

The remaining 11 gaps now belong to harder classes:

- forehead visible shape segmentation;
- forehead hairline segmentation;
- forehead RGB relative-3D curvature;
- eyebrow visible hair density/texture;
- eyelid crease/hooded visible appearance;
- nose RGB relative-3D tip/bridge projection;
- controlled visible lip color;
- visible-ear admission and shape;
- currently unavailable ear thickness/attachment/canal;
- cheek RGB relative-3D prominence;
- chin/lower-face RGB relative-3D projection.

No remaining partial-gap 2D geometry column may be closed by relabeling existing provider contours or landmarks.

Watchtower-Track: face-engine
