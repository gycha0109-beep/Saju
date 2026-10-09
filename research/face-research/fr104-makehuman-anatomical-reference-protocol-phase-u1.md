# FR104 Phase U1 — MakeHuman controlled anatomical-reference protocol skeleton

Issue: #1810

## Scope

U0 selected MakeHuman as the strongest **preflight** candidate, not as an admitted anatomical reference.

U1 pins the inputs and fail-closed render contract needed for the first deterministic preflight.

No raster fixture is generated in this phase.

## Pinned source bundle

Repository:

- `makehumancommunity/makehuman`
- commit `a8bc2d54ff0ac92e78ff71431b1023eda42bf482`

Pinned inputs:

- base mesh `base.obj`
- high-poly eye object and MHCLO proxy
- default skeleton
- head-orientation witness
- CC0 asset-license witness

The source software license and the bundled graphical-asset license are not conflated. The controlled fixture uses the bundled graphical assets whose direct MakeHuman license witness identifies them as CC0.

## Independent anatomical anchors

Ground truth must originate from MakeHuman, not MediaPipe:

```text
anatomical left eye  <- eye.L
anatomical right eye <- eye.R

head left-right vector
  = normalize(r_eye - l_eye)
```

The forward and parietal/up basis must also be derived from the pinned MakeHuman orientation witness.

Provider landmarks, provider LEFT/RIGHT labels, Florence prompt labels, and image-space X sign are prohibited from creating the anatomical ground truth.

## Deterministic render target

The first preflight is constrained to:

```text
1024 x 1024 PNG
EXIF none
yaw   0
pitch 0
roll  0
no post-render crop
no post-render resize
no post-render rotation
no post-render mirror
```

The initial projection candidate is orthographic to minimize camera-perspective degrees of freedom.

However, the protocol remains non-executable until the following are made exact:

- MakeHuman base/eye asset assembly;
- face framing rule;
- lighting rule;
- material rule;
- background rule;
- independent eye-anchor projection using the exact render camera matrix.

## Provider preflight

The rendered fixture must then be tested with the exact reviewed provider:

```text
@mediapipe/tasks-vision@0.10.35
runningMode = IMAGE
numFaces = 1
expected landmarks = 478
```

Admission requires:

1. rendered fixture SHA-256 pinned;
2. exactly one provider face;
3. 478 provider landmarks;
4. anatomical eye projections derived only from MakeHuman anchors;
5. no raw provider landmark persistence required for the admitted summary.

## State

Current protocol state:

```text
protocol_skeleton_only
render not implemented
fixture digest not pinned
provider preflight not executed
anatomical reference not admitted
```

The next implementation step is the deterministic MakeHuman assembly/render/projection runner.

Watchtower-Track: face-observation-engine
