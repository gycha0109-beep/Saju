# MyeongHa Face Reading — Canonical Face Blender Authoring

This toolchain turns the exact MediaPipe v0.10.35 canonical 468-vertex face mesh into reproducible Blender authoring scenes for MyeongHa face-reading development.

Blender is **offline authoring/inspection only**. It is not an application runtime dependency.

## MESH1 — canonical face bootstrap

The face-reading package pins `@mediapipe/tasks-vision` to `0.10.35`. MediaPipe v0.10.35 also publishes `canonical_face_model.obj` under its face-geometry task data. MESH1 pins that upstream artifact by:

- provider tag: `v0.10.35`
- Git blob SHA: `0e666d1c4e75949d1639c2bcf347a38da4834164`
- byte length: `45,999`
- expected core vertices: `468`
- coordinate unit: centimeter

The downloaded OBJ is kept in `.cache/` rather than committed into the repository.

Fetch and verify it from repository root:

```bash
python tools/face-reading/blender/fetch_mediapipe_canonical_face.py
```

Default output:

```text
.cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj
```

Build the MESH1 inspection scene:

```bash
blender --background \
  --python tools/face-reading/blender/build_myeongha_canonical_face_scene.py \
  -- \
  --obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --output .cache/face-reading/mesh1/myeongha-canonical-face.blend \
  --metadata-out .cache/face-reading/mesh1/scene-metadata.json
```

MESH1 preserves OBJ vertex ordering and marks MediaPipe indices 234 and 454 as inspection-only lateral-face seeds.

## MESH2 — physical surface region authoring

MESH2 converts canonical coordinates into concrete MediaPipe vertex-index masks, creates Blender vertex groups, and renders a front-view inspection preview.

Initial authoring regions:

- forehead
- temple `-X` / `+X`
- zygoma surface `-X` / `+X`
- cheek `-X` / `+X`
- jaw / lower-lateral face `-X` / `+X`
- chin
- central nose surface

The region rules live in:

```text
packages/face-reading/assets/canonical-face/myeongha-physical-regions-v0.1.json
```

They are practical canonical-surface authoring zones. The `-X` / `+X` names intentionally preserve provider-coordinate orientation instead of silently assigning anatomical left/right semantics.

Compile the rules into concrete vertex masks:

```bash
python tools/face-reading/blender/compile_myeongha_face_regions.py \
  --obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --output .cache/face-reading/mesh2/myeongha-physical-regions.json
```

The compiler verifies:

- exact 468-vertex input
- non-empty regions
- unique region ids
- exact bilateral canonical-coordinate mirroring
- 234 membership in `zygoma_negative_x`
- 454 membership in `zygoma_positive_x`
- deterministic concrete MediaPipe index lists

Build the MESH2 Blender scene and preview:

```bash
blender --background \
  --python tools/face-reading/blender/build_myeongha_physical_region_scene.py \
  -- \
  --obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --region-mask .cache/face-reading/mesh2/myeongha-physical-regions.json \
  --output .cache/face-reading/mesh2/myeongha-physical-regions.blend \
  --metadata-out .cache/face-reading/mesh2/myeongha-physical-regions-metadata.json \
  --preview-out .cache/face-reading/mesh2/myeongha-physical-regions-preview.png
```

The Blender scene contains one `MH_REGION_*` vertex group per authored region and assigns inspection materials to mesh polygons by region priority. The preview is a front orthographic workbench render for visual QA.

## Verification

Repository contract checks:

```bash
node scripts/verify-face-reading-canonical-face-poc.mjs
node scripts/verify-face-reading-mesh2-region-authoring.mjs
python -m py_compile \
  tools/face-reading/blender/fetch_mediapipe_canonical_face.py \
  tools/face-reading/blender/build_myeongha_canonical_face_scene.py \
  tools/face-reading/blender/compile_myeongha_face_regions.py \
  tools/face-reading/blender/build_myeongha_physical_region_scene.py
```

Dedicated GitHub Actions jobs fetch the exact pinned MediaPipe OBJ, compile the masks, install Blender 4.x on Ubuntu, generate a real `.blend`, render the preview PNG, validate metadata, and upload the MESH2 authoring artifacts.

## Boundary

MESH2 establishes a practical 3D authoring/inspection layer. Region membership alone does not activate a production metric, classifier threshold, traditional physiognomy interpretation, or Blender runtime dependency. Those later consumers can use the exported index masks without requiring Blender.
