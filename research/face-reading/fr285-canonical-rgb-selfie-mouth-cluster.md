# FR285 — Canonical RGB selfie morphology: mouth cluster

Status: implementation

Watchtower-Track: face-research

## Purpose

FR285 continues the product-facing implementation line started by FR284.

No new camera study or depth experiment is introduced. Existing governed mouth geometry is promoted into provider-neutral canonical morphology columns.

## Input chain

```text
ordinary smartphone RGB selfie
  -> governed FR77 full-face geometry
  -> FR79 pose-normalized lips geometry
  -> FR80 / FR82 / FR212 / FR214
  -> FR285 canonical mouth morphology
  -> combined eye + mouth canonical payload
  -> separate traditional interpretation engine
```

## Materialized FR282 mouth columns

### mouth.width_and_relative_size

Two existing continuous observations are preserved as structured sub-axes:

- `neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0`
- `neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0`

The second denominator remains the full canonical 468-point mesh horizontal span. It is not relabeled as anatomical face width.

### mouth.corner_orientation

Source: FR212.

If FR212 cannot derive unique visible horizontal-extrema corner candidates, the canonical product feature remains unavailable with the FR212 reason attached as non-semantic source context.

No fallback corner is invented.

### mouth.outline_angularity

Source: FR214 role-free contour angularity.

The provider contour pair remains unordered; no outer/inner anatomical lip role is introduced.

## Explicitly unavailable FR282 mouth columns

FR285 does not guess missing observables:

- `mouth.visible_lip_fullness`
- `mouth.philtrum_length_width`
- `mouth.visible_lip_color`

These remain explicit unavailable columns until their dedicated governed extractors exist.

## Combined payload

After FR285:

- eye cluster: 5 FR282 columns represented;
- mouth cluster: 6 FR282 columns represented;
- total represented: 11 / 29;
- remaining pending: 18 / 29.

"Represented" includes explicit unavailable columns; actual materialized continuous geometry is:

- 4 eye geometry columns;
- 3 mouth geometry columns.

## Privacy and authority

The combined product payload contains only provider-neutral canonical morphology and quality/context metadata.

It does not expose:

- raw image;
- raw landmarks;
- MediaPipe vertex indices;
- provider run refs;
- canonical asset digests;
- identity embeddings/templates;
- traditional interpretation;
- classification thresholds;
- camera-correction formulas.

## Next implementation cluster

The next highest-readiness existing-source block is:

- cheek/mid-face: FR211 + FR217;
- lower face: FR213 + FR216.

Nose bridge deviation / tip circularity can follow after their governed product binding is checked against the current 2D source boundary.
