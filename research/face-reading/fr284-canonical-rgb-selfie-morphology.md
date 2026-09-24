# FR284 — Canonical RGB selfie morphology: column map and eye cluster

Status: implementation

Watchtower-Track: face-research

## Purpose

FR284 is the first mainline implementation step after FR282.

It does not add another validation research branch. It turns the FR282 feature authority matrix into an actual product-facing morphology contract whose output can later be consumed by the traditional interpretation engine.

Pipeline boundary:

```text
ordinary smartphone RGB selfie
  -> MediaPipe observation
  -> governed canonical metric geometry
  -> canonical morphology extractors
  -> feature quality/context
  -> canonical morphology payload
  -> separate traditional interpretation layer
```

No raw provider landmark index is part of the product morphology output.

## Full FR282 column implementation map

| FR282 column | Current source primitive | State after FR284 | Canonical output | Quality dependency |
| --- | --- | --- | --- | --- |
| forehead.visible_width_shape | FR207 gap | extractor required | segmentation geometry | segmentation + visibility |
| forehead.visible_hairline_boundary | FR207 gap | extractor required | contour geometry | segmentation + visibility |
| forehead.relative_surface_curvature | none | extractor required | relative 3D shape | RGB relative-3D provider validation |
| eyebrow.span_arch_tail_orientation | FR208 + FR39 | source exists / binding missing | continuous axes | canonical geometry |
| eyebrow.visible_hair_density_texture | FR207 gap | extractor required | appearance descriptor | image quality |
| eye.width_height_ratio | FR210 + FR178 | **materialized** | ratio | canonical geometry |
| eye.inter_eye_spacing_ratio | FR210 | **materialized** | ratio | canonical geometry |
| eye.outer_corner_tilt | FR208 + FR210 | **materialized** | degree | canonical geometry + FR283 viewpoint context |
| eye.bilateral_shape_asymmetry | FR215 | **materialized** | continuous axes | canonical geometry |
| eye.eyelid_crease_or_hooded_category | FR206 image-model boundary | extractor required | categorical observation | image quality |
| nose.bridge_centerline_deviation | nose-geometry | source exists / binding missing | ratio | governed contour geometry |
| nose.tip_contour_circularity | nose-geometry | source exists / binding missing | ratio | governed contour geometry |
| nose.alar_width_and_nostril_geometry | FR207 gap | extractor required | composite geometry | segmentation + visibility |
| nose.tip_bridge_relative_projection | FR267/268 research | extractor required | relative 3D shape | RGB relative-3D provider validation |
| mouth.width_and_relative_size | FR80/82 | source exists / binding missing | continuous axes | governed contour geometry |
| mouth.corner_orientation | FR212 | source exists / binding missing | ratio | governed contour geometry |
| mouth.outline_angularity | FR214 | source exists / binding missing | degree | governed contour geometry |
| mouth.visible_lip_fullness | FR207 gap | extractor required | composite geometry | governed contour geometry |
| mouth.philtrum_length_width | none | extractor required | continuous axes | segmentation + visibility |
| mouth.visible_lip_color | FR207 gap | extractor required | appearance descriptor | image quality |
| ear.visible_boundary_height_shape | FR191 + shared face geometry | extractor required | visibility descriptor | visibility gate |
| ear.thickness_attachment_canal_boundary | FR207 unavailable | **deferred unavailable** | unavailable | unavailable |
| cheek_midface.visible_width_ratio | FR211 | source exists / binding missing | ratio | canonical geometry |
| cheek_midface.visible_contour_prominence | FR217 | source exists / binding missing | ratio | canonical geometry |
| cheek_midface.relative_3d_prominence | none | extractor required | relative 3D shape | RGB relative-3D provider validation |
| chin_lower_face.visible_width_ratio | FR213 | source exists / binding missing | ratio | canonical geometry |
| chin_lower_face.visible_contour | FR216 | source exists / binding missing | contour geometry | governed contour geometry |
| chin_lower_face.chin_height_width_center_deviation | FR216 + FR54 | extractor required | continuous axes | governed contour geometry |
| chin_lower_face.relative_projection | none | extractor required | relative 3D shape | RGB relative-3D provider validation |

The machine-readable source of truth is:

`packages/face-reading/src/rgb-selfie-product-column-map-fr284.ts`

Its assertion requires exact one-to-one coverage of all 29 FR282 feature keys.

## First implementation cluster: eye pair

FR284 deliberately starts with the eye cluster because four FR282 eye columns already have governed reusable source geometry.

### eye.width_height_ratio

Canonical source:

`FR210 geometricVerticalToHorizontalRatio`

Product output:

`eye.width_height_ratio`

No provider vertex/index is exposed.

### eye.inter_eye_spacing_ratio

Canonical source:

`FR210 centroidSeparation`

Product output:

`eye.inter_eye_spacing_ratio`

### eye.outer_corner_tilt

Canonical source:

`FR210 outerCornerTilt` derived through FR208/FR209.

FR283 is consumed only as quality context:

- low-angle viewpoint sensitivity is documented;
- no current-capture low-angle classifier is issued;
- no pose acceptance threshold is issued;
- no correction formula is applied.

If the governed corner derivation is unavailable, the canonical feature remains unavailable. No fallback is invented.

### eye.bilateral_shape_asymmetry

Canonical source:

`FR215`

Product output preserves the three existing continuous, pair-swap-invariant axes:

- horizontal span relative difference;
- geometric Y/X ratio absolute difference;
- mean turning-angle absolute difference.

They remain one FR282 feature column with structured continuous components.

### eye.eyelid_crease_or_hooded_category

FR282 requires an image model. FR284 therefore emits this key as explicitly unavailable:

`image_model_extractor_not_materialized`

No unrelated landmark geometry is used to guess it.

## Product-facing privacy/authority boundary

FR284 payload exposes:

- canonical semantic feature keys;
- provider-neutral continuous values;
- source metric references;
- quality/context metadata.

FR284 payload does not expose:

- raw image;
- raw landmarks;
- raw provider landmark indices;
- provider run reference;
- canonical-asset digest;
- identity embedding/template;
- traditional interpretation;
- fortune result;
- new threshold;
- camera correction.

## Next implementation cluster

After FR284, the most implementation-ready clusters are those already marked `source_extractor_exists_binding_missing`:

1. mouth geometry: FR80/82 + FR212 + FR214;
2. cheek/lower-face geometry: FR211 + FR217 + FR213 + FR216;
3. nose existing 2D geometry: bridge deviation + tip circularity.

New image models and relative-3D provider work remain separate gaps and must not block those existing-source bindings.
