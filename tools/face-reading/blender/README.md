# MyeongHa Face Reading — Canonical Face Blender PoC (MESH1)

This toolchain turns the exact MediaPipe v0.10.35 canonical 468-vertex face mesh into a reproducible Blender inspection scene for MyeongHa face-reading development.

It does **not** make Blender a runtime dependency. Blender is an offline authoring/inspection tool only.

## Why this base mesh

The face-reading package pins `@mediapipe/tasks-vision` to `0.10.35`. MediaPipe v0.10.35 also publishes `canonical_face_model.obj` under its face-geometry task data. The upstream BUILD file describes the canonical model as an asset-creation/reference resource, and the canonical model follows the 468-point core face-mesh topology.

MESH1 pins the upstream artifact by:

- provider tag: `v0.10.35`
- Git blob SHA: `0e666d1c4e75949d1639c2bcf347a38da4834164`
- byte length: `45,999`
- expected core vertices: `468`
- coordinate unit: centimeter

The downloaded OBJ is intentionally kept in `.cache/` rather than committed into the repository.

## 1. Fetch and verify the canonical OBJ

From repository root:

```bash
python tools/face-reading/blender/fetch_mediapipe_canonical_face.py
```

The command verifies the exact byte length, Git blob SHA, 468-vertex count, face index range, and the pinned coordinates of inspection seeds 234 and 454 before writing the file.

Default output:

```text
.cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj
```

## 2. Build the Blender scene

Blender 4.x command line:

```bash
blender --background \
  --python tools/face-reading/blender/build_myeongha_canonical_face_scene.py \
  -- \
  --obj .cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj \
  --output .cache/face-reading/mesh1/myeongha-canonical-face.blend \
  --metadata-out .cache/face-reading/mesh1/scene-metadata.json
```

PowerShell uses the same arguments on one line.

The scene contains:

- `MH_MediaPipe_CanonicalFace` preserving OBJ vertex order
- one vertex group for MediaPipe index 234
- one vertex group for MediaPipe index 454
- visible marker objects at the two pinned canonical coordinates
- metric scene scale configured so one Blender unit corresponds to one centimeter

The two seed landmarks are **inspection anchors only**. MESH1 deliberately does not turn them into a final cheekbone region or production metric.

## 3. Verification

Repository-side checks:

```bash
node scripts/verify-face-reading-canonical-face-poc.mjs
python -m py_compile \
  tools/face-reading/blender/fetch_mediapipe_canonical_face.py \
  tools/face-reading/blender/build_myeongha_canonical_face_scene.py
```

The dedicated GitHub Actions workflow goes further. On `ubuntu-latest` it installs the Ubuntu Blender package, fetches and verifies the exact pinned MediaPipe OBJ, runs Blender headlessly, generates a real `.blend` file plus scene metadata, and verifies the generated artifacts. This keeps the Blender API path tested even though Blender remains absent from application runtime dependencies.

## Next step after MESH1

Use the generated scene as the canonical inspection surface and add MyeongHa-owned vertex groups for practical physical regions (zygoma/cheek, forehead, jaw, chin, etc.). Those groups can then be exported as JSON index sets and consumed by the runtime without requiring Blender.
