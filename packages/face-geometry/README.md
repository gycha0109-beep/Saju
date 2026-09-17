# Shared Face Geometry

This package is the product-neutral geometry layer shared by downstream consumers such as MyeongHa face-reading and BEJEWELY/Visually Face Lab.

It deliberately separates **geometry** from product interpretation.

## Surface stack

### MediaPipe canonical face

The existing pinned MediaPipe v0.10.35 468-vertex canonical face remains the photo-observation and registration anchor. Its vertex numbering is useful because runtime Face Landmarker output follows the same canonical topology.

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
  -> registration bridge
  -> GNM full-head reference / authoring surface
```

Never interpret a MediaPipe vertex number as a GNM vertex number.

MESH3 only establishes the bridge contract. Landmark fitting is a later step.

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

The first 20 map directly to GNM `*_region` provider groups. The two ears keep the MESH3 deterministic provider derivation:

```text
left_ear  = ears ∩ left
right_ear = ears ∩ right
```

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

Build a Blender inspection scene with one vertex group per shared region and both front and three-quarter full-head previews:

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

MESH4 is still an authoring/reference contract. Provider-region membership is not itself a beauty score, face-reading judgment, recommendation, medical/anatomical diagnosis, or production classifier threshold.

## Commands

```bash
python tools/face-geometry/gnm/fetch_gnm_head.py \
  --output .cache/face-geometry/gnm/v3_0/gnm_head.npz

python tools/face-geometry/gnm/export_gnm_template_head.py \
  --npz .cache/face-geometry/gnm/v3_0/gnm_head.npz \
  --obj-out .cache/face-geometry/mesh3/gnm-head-neutral.obj \
  --regions-out .cache/face-geometry/mesh3/gnm-head-provider-regions.json \
  --metadata-out .cache/face-geometry/mesh3/gnm-head-export-metadata.json
```

Blender MESH3 ear inspection scene:

```bash
blender --background \
  --python tools/face-geometry/gnm/build_gnm_head_scene.py \
  -- \
  --obj .cache/face-geometry/mesh3/gnm-head-neutral.obj \
  --regions .cache/face-geometry/mesh3/gnm-head-provider-regions.json \
  --output .cache/face-geometry/mesh3/gnm-head-ear-regions.blend \
  --metadata-out .cache/face-geometry/mesh3/gnm-head-scene-metadata.json \
  --preview-out .cache/face-geometry/mesh3/gnm-head-ear-preview.png
```

## Downstream use

- **MyeongHa** may map shared physical regions into its traditional interpretation layer.
- **BEJEWELY/Visually Face Lab** may map shared physical regions into face-shape, styling, makeup, or visual archetype features.

Neither downstream meaning belongs in this package.
