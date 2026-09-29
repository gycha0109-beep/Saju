# FR104 U1.2 — Deterministic MakeHuman render + ground-truth projection preflight

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U1.1 established that the pinned MakeHuman source bundle yields independent, non-degenerate anatomical eye/head geometry.

U1.2 makes that source geometry executable as a deterministic non-user raster fixture while preserving an independent anatomical-eye projection from the exact same camera transform.

This phase does **not** execute MediaPipe and does not admit anatomical provider semantics.

## Renderer feasibility audit

Repository baseline at implementation start:

- `main = ca32942f53d771eb669a4aeb2ec6e57ea8507970`
- Node runtime: 24.x
- no existing Blender dependency
- no existing Three.js / WebGL renderer dependency
- `@mediapipe/tasks-vision@0.10.35` exists only in the face-reading workspace
- Face Reading CI is headless Ubuntu + Node

Decision:

```text
bounded CPU software rasterizer
dependency surface = Node built-ins only
```

Reason:

1. deterministic output is the primary requirement;
2. no GPU/driver state is required;
3. the exact MakeHuman source geometry can be consumed directly;
4. raster and anatomical projection can share one explicit camera contract;
5. the implementation adds no heavyweight production dependency.

## Exact asset assembly

The runner byte-verifies the pinned MakeHuman Git blobs before use.

Base surface:

```text
makehuman/data/3dobjs/base.obj
group = body
```

Only the source-defined `g body` faces are rasterized. Helper/joint geometry is not used as visible facial surface.

High-poly eyes:

```text
high-poly.mhclo
+
base rest-pose vertices
+
high-poly.obj topology
```

The runner reproduces the exact bounded `shared/proxy.py` semantics:

```text
mapped proxy vertex
=
base[ref0] * weight0
+ base[ref1] * weight1
+ base[ref2] * weight2
+ source scale matrix * offset
```

The per-axis source scale is:

```text
abs(base[v1][axis] - base[v2][axis]) / denominator
```

No MakeHuman GUI/runtime execution is required.

## Canonical camera

Independent anchors:

- anatomical left eye: `eye.L____head`
- anatomical right eye: `eye.R____head`
- head: `head____head`

Source basis:

```text
LR      = normalize(r_eye - l_eye)
forward = normalize(eyeMidpoint - head)
up      = normalize(cross(LR, forward))
```

The sign of `up` is not chosen from screen appearance. It follows the pinned MakeHuman orientation witness describing `HeadPaVector` as perpendicular to forward/LR and pointing upward through the back of the cranium.

Screen-right is `normalize(l_eye - r_eye)`, so a non-mirrored frontal render preserves anatomical identity without treating screen side as semantic authority.

## Framing policy

The first canonical fixture is fixed before any provider execution:

```text
1024 x 1024
orthographic
center = MakeHuman eye midpoint
full square span = 3 * MakeHuman_Units
MakeHuman_Units = distance(eye midpoint, head)
yaw/pitch/roll = 0
no EXIF
no crop
no resize
no post-render rotation
no horizontal mirror
```

The factor `3` is a versioned render-only framing constant. It is not a plausibility threshold, anatomical classification threshold, or provider-derived calibration value. It must not be silently retuned after observing FaceLandmarker output.

## Material / lighting / background

The first fixture deliberately uses a symmetric, texture-free render policy:

- body RGB: `[198,151,127]`
- both eyes RGB: `[220,220,220]`
- background RGB: `[32,32,32]`
- flat symmetric camera-frontal Lambert term
- ambient: `0.35`
- diffuse: `0.65`
- facing term: `abs(dot(triangleNormal, MakeHumanForward))`

No eye marker, provider topology dot, L/R label, side-specific color, arrow, or detector-targeted annotation is allowed.

## Deterministic raster contract

The runner uses:

- CPU triangle rasterization;
- depth buffer;
- fixed pixel-center barycentric coverage;
- RGB8 PNG;
- PNG filter type 0;
- deterministic zlib stored blocks;
- no metadata chunks.

One execution renders the scene twice.

Required:

```text
renderA bytes == renderB bytes
SHA256(renderA) == SHA256(renderB)
```

No generated raster bytes are committed or persisted by the verifier.

## Anatomical ground-truth projection

Both anatomical eye points use the exact same camera basis and projection used by the rasterizer.

The runner computes projection two ways:

1. direct basis projection;
2. explicit view-matrix + orthographic-projection-matrix projection.

The two paths must agree within `1e-12` normalized-image distance.

Ground truth remains explicitly:

```text
providerLandmarkDerived = false
providerLabelDerived = false
florencePromptSideDerived = false
imageSpaceXSignDefinesAnatomicalSide = false
```

## Negative / fail-closed checks

The U1.2 runner fails on:

- pinned source blob drift;
- invalid source geometry;
- invalid proxy assembly;
- degenerate camera axes;
- unresolved projection;
- anatomical eye projection outside the canonical frame;
- direct/matrix projection disagreement;
- repeated raster byte/SHA disagreement;
- pinned digest mismatch once the empirical digest is frozen.

`--self-test` independently covers:

- zero-axis rejection;
- out-of-frame ground-truth rejection;
- deterministic PNG byte encoding;
- direct vs matrix projection consistency;
- no provider input requirement.

## Two-pass digest admission

The first CI execution produced the canonical deterministic raster SHA-256:

```text
f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb
```

Observed bounded geometry:

```text
base vertices             = 19158
body triangles            = 26756
high-poly eye vertices    = 1064
high-poly eye triangles   = 2040
orthographic span         = 3.3834385172483907
anatomical left eye image = (0.5909577633614812, 0.5)
anatomical right eye image= (0.4090422366385188, 0.5)
direct/matrix max error   = 0
```

The runner now pins that exact digest in `EXPECTED_RENDER_SHA256`. A subsequent CI execution must reproduce the same PNG bytes and the same digest; otherwise the preflight fails with `RENDER_DIGEST_DRIFT`.

## Authority boundary

U1.2 keeps all downstream authority closed:

```text
anatomicalReferenceAdmitted = false
providerFaceDetectabilityVerified = false
providerLabelMappedToAnatomicalSide = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

A deterministic MakeHuman raster is not yet a controlled anatomical mapping certificate.

## Next gate

After the render digest is pinned:

```text
exact @mediapipe/tasks-vision@0.10.35
runningMode = IMAGE
numFaces = 1
→ exactly one face
→ exactly 478 landmarks
```

Only then may U2 compare provider eye centroids with the independently projected MakeHuman anatomical eye points.

A single fixture still cannot establish global provider LEFT/RIGHT anatomical semantics.
