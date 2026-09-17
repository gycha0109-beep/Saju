# Shared Face Geometry

This package is the product-neutral geometry layer shared by downstream consumers such as MyeongHa face-reading and BEJEWELY/Visually Face Lab.

It deliberately separates **geometry** from product interpretation.

## Surface stack

### MediaPipe canonical face

The pinned MediaPipe v0.10.35 468-vertex canonical face is the runtime photo-observation topology and a stable reference surface for projected face-region masks.

### Google GNM Head v3

MESH3 adds Google GNM Head v3 as a full-head authoring/reference surface. GNM provides a high-resolution parametric head, including ears and cranium, under Apache-2.0.

Pinned upstream:

- repository: `google/GNM`
- commit: `fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690`
- asset: `gnm/shape/data/versions/v3_0/gnm_head.npz`
- Git blob SHA: `ae49903ad7d50ce1d64e464a0407441f2781873c`
- byte length: `53,305,389`

The NPZ is fetched into cache/CI and is not committed to this repository.

## Important topology rule

MediaPipe 468 and GNM Head are **not the same topology**.

```text
photo
  -> MediaPipe 468 observations
  -> shared MediaPipe region adapter

GNM Head v3
  -> provider regions
  -> offline canonical projection
  -> shared MediaPipe region adapter
```

Never interpret a MediaPipe vertex number as a GNM vertex number. MESH5 creates an offline correspondence candidate and records projection diagnostics; it does not create vertex identity.

## Ear surface

GNM v3 provider data exposes an aggregate `ears` vertex group together with provider `left` and `right` side groups. MESH3 deterministically derives the two ear surfaces without hand-authored boundaries:

```text
left_ear  = ears ∩ left
right_ear = ears ∩ right
```

CI requires the two derived sets to be non-empty, non-overlapping, and to cover the complete provider `ears` set.

The ear masks are physical/provider geometry. They do not carry physiognomy, beauty, styling, or recommendation meaning.

## MESH4 — shared provider-region ontology

GNM v3 already ships named surface groups for many regions that both MyeongHa and Face Lab need. MESH4 promotes those provider masks into one normalized, product-neutral catalog rather than redrawing the same regions independently in each product.

The shared catalog contains 22 regions:

```text
forehead
left / middle / right brow
left / right temple
left / right orbital
left / right zygomatic
nose
left / right parotid
left / right infraorbital
left / right cheek
upper / lower lip
chin
left / right ear
```

The first 20 map directly to GNM `*_region` provider groups. The two ears keep the MESH3 deterministic provider derivation.

Catalog:

```text
packages/face-geometry/assets/regions/gnm-provider-region-ontology-v1.json
```

Compile exact vertex masks from the pinned GNM NPZ:

```bash
python tools/face-geometry/gnm/export_gnm_region_ontology.py \
  --npz .cache/face-geometry/gnm/v3_0/gnm_head.npz \
  --output .cache/face-geometry/mesh4/gnm-provider-region-ontology.json
```

Build the MESH4 Blender inspection surface:

```bash
blender --background \
  --python tools/face-geometry/gnm/build_gnm_region_ontology_scene.py \
  -- \
  --obj .cache/face-geometry/mesh3/gnm-head-neutral.obj \
  --regions .cache/face-geometry/mesh4/gnm-provider-region-ontology.json \
  --output .cache/face-geometry/mesh4/gnm-region-ontology.blend \
  --metadata-out .cache/face-geometry/mesh4/gnm-region-ontology-scene-metadata.json \
  --front-preview-out .cache/face-geometry/mesh4/gnm-region-ontology-front.png \
  --three-quarter-preview-out .cache/face-geometry/mesh4/gnm-region-ontology-three-quarter.png
```

MESH4 is an authoring/reference contract. Provider-region membership is not itself a beauty score, face-reading judgment, recommendation, medical/anatomical diagnosis, or production classifier threshold.

## MESH5 — MediaPipe 468 shared region adapter

GNM stays the richer authoring surface, but production photo pipelines already observe MediaPipe 468. MESH5 therefore projects the shared GNM facial-region ontology onto the pinned MediaPipe canonical mesh **offline** and exports an adapter that downstream runtime code can consume without loading GNM or Blender.

```text
pinned GNM provider regions
  -> robust canonical-axis affine normalization
  -> nearest GNM face-region surface candidate
  -> MediaPipe 468 region adapter
  -> runtime Face Landmarker vertices
```

The projection is deliberately an **authoring candidate**, not an anatomical ground truth or subject-specific 3D fit. Every MediaPipe vertex retains its nearest GNM source vertex and projection distance so correspondence quality remains inspectable.

### Side naming

MESH5 does not encode provider `left/right` as anatomical left/right. Bilateral source groups are converted to canonical-axis adapter names such as:

```text
zygomatic_negative_x
zygomatic_positive_x
cheek_negative_x
cheek_positive_x
```

The source GNM region id remains in provenance. `semanticSideAssignmentEncoded` stays `false`.

### Ear boundary

The core MediaPipe 468 canonical face does not model the external ear pinna. Therefore MESH5 explicitly emits:

```text
left_ear  -> unsupported_on_mediapipe468
right_ear -> unsupported_on_mediapipe468
```

with empty MediaPipe index sets. Ear coverage must use a different observation surface later; it must not be fabricated from lateral face vertices.

Projection policy:

```text
packages/face-geometry/assets/bridge/gnm-to-mediapipe468-region-projection-v1.json
```

Create the adapter:

```bash
python tools/face-geometry/gnm/project_gnm_regions_to_mediapipe468.py \
  --mediapipe-obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --gnm-npz .cache/face-geometry/gnm/v3_0/gnm_head.npz \
  --source-regions .cache/face-geometry/mesh4/gnm-provider-region-ontology.json \
  --output .cache/face-geometry/mesh5/mediapipe468-region-adapter.json
```

Build a MediaPipe-topology visual QA scene:

```bash
blender --background \
  --python tools/face-geometry/gnm/build_mediapipe468_projected_region_scene.py \
  -- \
  --obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --adapter .cache/face-geometry/mesh5/mediapipe468-region-adapter.json \
  --output .cache/face-geometry/mesh5/mediapipe468-region-adapter.blend \
  --metadata-out .cache/face-geometry/mesh5/mediapipe468-region-adapter-scene-metadata.json \
  --front-preview-out .cache/face-geometry/mesh5/mediapipe468-region-adapter-front.png \
  --three-quarter-preview-out .cache/face-geometry/mesh5/mediapipe468-region-adapter-three-quarter.png
```

No production projection-distance threshold is declared in MESH5. The adapter is for offline geometry authoring and QA until its correspondence quality is accepted for specific visual morphology metrics.

## Base asset commands

```bash
python tools/face-geometry/gnm/fetch_gnm_head.py \
  --output .cache/face-geometry/gnm/v3_0/gnm_head.npz

python tools/face-geometry/gnm/export_gnm_template_head.py \
  --npz .cache/face-geometry/gnm/v3_0/gnm_head.npz \
  --obj-out .cache/face-geometry/mesh3/gnm-head-neutral.obj \
  --regions-out .cache/face-geometry/mesh3/gnm-head-provider-regions.json \
  --metadata-out .cache/face-geometry/mesh3/gnm-head-export-metadata.json
```

## Downstream use

- **MyeongHa** may map shared physical regions into its traditional interpretation layer.
- **BEJEWELY/Visually Face Lab** may map shared physical regions into face-shape, styling, makeup, or visual archetype features.

Neither downstream meaning belongs in this package.
