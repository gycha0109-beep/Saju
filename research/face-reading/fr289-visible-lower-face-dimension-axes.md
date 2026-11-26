# FR289 — Visible lower-face dimension axes

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR289 materializes the FR282 column:

```text
chin_lower_face.chin_height_width_center_deviation
```

without introducing a new anatomical landmark authority.

The extractor consumes only already governed, provider-neutral observable morphology:

- FR213 visible lower-face width ratio;
- FR216 canonical visible soft-tissue lower-face contour.

FR54 research traces are not consumed by this product extractor.

## Product-neutral definition

The column is represented as three continuous observable axes:

```text
visible_width_to_face_width_ratio
visible_height_to_width_ratio
inferior_center_deviation_to_width_ratio
```

The canonical coordinate frame is right-handed metric XY, so the minimum Y level is the inferior visible contour level.

If multiple contour points share that inferior level, their mean X coordinate is used only as a geometric visible-envelope center candidate.

No left/right anatomical meaning is assigned.

## Explicit non-authority

FR289 does not issue:

- Menton or Gnathion identity;
- Gonion identity;
- mandibular bone boundary;
- anatomical chin boundary;
- traditional physiognomy meaning;
- classification;
- threshold;
- calibration;
- camera correction;
- physical depth;
- provider landmark indices.

The existing FR282 key name is preserved, but the runtime value remains a bounded visible lower-face morphology description.

## Fail-closed behavior

FR289 returns unavailable when:

- FR213 visible lower-face width is unavailable;
- FR216 visible lower-face contour is unavailable;
- the visible lower-face horizontal span collapses;
- the visible lower-face vertical span collapses.

No fallback dimensions are invented.

## Canonical payload effect

FR288 already closed the structural schema over all 29 FR282 keys.

FR289 changes no schema cardinality:

```text
FR282 feature keys                 = 29
represented payload keys           = 29
structurally missing keys          = 0
canonical extractors materialized  = 14
extractor / authority gaps         = 15
```

Only:

```text
chin_lower_face.chin_height_width_center_deviation
```

moves from an explicit extractor gap to a materialized canonical extractor.

## Next frontier

Continue increasing the materialized-column count without reopening the 29-key schema.

Candidate families remain bounded by their existing authority:

- product-neutral eyebrow boundary/role wiring only after the current component-role blocker is resolved;
- forehead/hairline segmentation;
- visible ear admission and external shape extraction;
- governed visible lip fullness / philtrum geometry;
- RGB relative-3D columns only after provider validation.

Do not substitute research-only anatomical traces, traditional labels, hardware depth, or generic camera-correction research for missing observable authority.
