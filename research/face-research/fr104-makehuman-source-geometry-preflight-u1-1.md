# FR104 U1.1 — MakeHuman source-geometry preflight

Issue: #1810

## Purpose

Before implementing a renderer, verify that the pinned MakeHuman source bundle itself yields a deterministic, non-degenerate anatomical eye/head basis using MakeHuman's own runtime semantics.

This phase does not render an image and does not invoke MediaPipe.

## Pinned runtime semantics

The verifier pins and byte-verifies the exact MakeHuman commit and Git blobs for:

- `base.obj`
- `default.mhskel`
- `shared/wavefront.py`
- `shared/skeleton.py`
- `makehuman_hair.inc`

The pinned Wavefront loader appends each OBJ `v` record in source order and installs that array as mesh coordinates.

The pinned skeleton runtime computes mapped joint positions by indexing rest-pose coordinates with the skeleton's vertex-index list and returning the mean.

Therefore the controlled verifier reproduces exactly this bounded source operation:

```text
OBJ v records in source order
  + default.mhskel zero-based joint vertex indices
  -> mean rest-mesh position
```

for:

- `eye.L____head`
- `eye.R____head`
- `head____head`

## Basis checks

The verifier then reproduces the pinned MakeHuman head-basis definitions:

```text
left-right = normalize(r_eye - l_eye)
forward    = normalize(((l_eye + r_eye) / 2) - head)
```

Both vectors must be non-degenerate.

The output is scalar geometry only.

## No authority widening

This preflight establishes only that the independent source bundle is internally usable for a deterministic renderer.

It does not establish:

- rendered fixture digest;
- FaceLandmarker detectability;
- provider LEFT/RIGHT anatomical semantics;
- anatomical ear laterality;
- validated ear observation;
- traditional binding;
- Production.

Watchtower-Track: face-observation-engine
