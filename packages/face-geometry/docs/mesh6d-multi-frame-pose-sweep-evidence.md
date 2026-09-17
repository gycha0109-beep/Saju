# MESH6D — Multi-frame Pose-sweep Morphology Evidence

MESH6D adds a capture-ready evidence contract above MESH6A, MESH6B, and MESH6C. It accepts an ordered sequence of **issued** MESH6A observation frames and records threshold-free temporal, orientation, and morphology-repeatability evidence.

It does not define whether a capture is good enough for production.

## Input contract

```text
ordered issued MESH6A frames + finite timestampMs
+ one explicit MESH5.1 weighted adapter
```

Rules:

- the sequence must be non-empty;
- timestamps must be finite and strictly increasing;
- input order is authoritative and is never silently sorted;
- every frame must pass the MESH6A issued-object boundary;
- canonical asset digest, MediaPipe release commit, geometry metadata blob, coordinate frame, and unit must match frame 0;
- `providerRunRef` may differ per frame because it identifies the individual provider run;
- the weighted adapter records its MESH5.1 schema plus explicit GNM source asset and MediaPipe target asset identity.

No production minimum frame count is defined.

## Pose transform semantics

MESH6D consumes the transform already inherited by MESH6A from FR76/FR77. It does not re-run pose normalization.

FR76 constructs the transform as:

```text
canonical metric face
→ positive uniform scale * proper rotation + translation
→ runtime metric face
```

FR76 then serializes that affine transform in packed column-major order. MESH6D therefore reconstructs the 3×3 linear block from packed indices:

```text
[0,4,8]
[1,5,9]
[2,6,10]
```

The positive uniform scale is removed from the determinant (`scale = cbrt(det(linear))`) before orientation is read.

The canonical `+Z` axis is transformed by the recovered rotation. Its runtime direction is `forwardAxisRuntime`.

Signed raw orientation evidence is defined as:

```text
lateralOrientationRadians = atan2(forward.x, forward.z)
verticalOrientationRadians = atan2(forward.y, hypot(forward.x, forward.z))
```

Therefore positive lateral evidence means the transformed canonical forward axis has a `+X` component; positive vertical evidence means it has a `+Y` component. These are coordinate-frame observations, not frontal/profile classifications.

Relative rotation from frame 0 uses:

```text
R_rel = R_frame * transpose(R_first)
angle = acos(clamp((trace(R_rel) - 1) / 2, -1, 1))
```

Translation does not participate in any orientation computation.

## Morphology evidence

Each frame is evaluated through `buildMesh6BZygomaticRawMorphology()` with the same explicit weighted adapter. The resulting kernels are aggregated through MESH6C `summarizeMesh6CZygomaticRepeatability()`.

The existing five raw observables remain unchanged:

```text
zygomaticSpanRatio
zygomaticTemporalFlareRatio
zygomaticCheekLateralReliefRatio
bilateralZygomaticAsymmetryRatio
zygomaticRelativeDepthRatio
```

MESH6D does not convert their temporal variation into confidence or acceptance.

## Output evidence

The report records:

- sequence frame count, start/end timestamps, and duration;
- per-frame provider run reference;
- per-frame raw pose evidence;
- per-frame MESH6B morphology;
- signed lateral/vertical orientation min/max/span;
- relative rotation min/max/span from frame 0;
- MESH6C morphology repeatability summary;
- unresolved expression, occlusion, illumination, motion-blur, and real-world repeatability factors.

## Verification

Dedicated CI verifies:

- identical issued frames at multiple timestamps produce zero pose sweep and zero morphology variation;
- translation-only changes to the affine transform do not change orientation evidence;
- known positive/negative lateral rotations produce the expected signed lateral angle;
- known positive/negative vertical rotations produce the expected signed vertical angle;
- known rotations produce the expected relative-rotation magnitude;
- NaN, Infinity, duplicate, and descending timestamps fail closed;
- incompatible canonical source provenance fails closed;
- forbidden classification/admission fields are not emitted.

Floating-point comparison tolerance in the verifier is a numerical test tolerance only. It is not a capture-quality threshold.

## Authority boundary

MESH6D keeps all of the following unavailable:

```text
frontal / three-quarter / profile classification
minimum production frame count
acceptable pose range
capture pass/fail
confidence score
production morphology admission
expression-neutrality verdict
occlusion-validity verdict
anatomical measurement claim
beauty interpretation
traditional physiognomy interpretation
```

The next calibration stage must use real repeated capture evidence before any acceptable range or production admission policy is proposed.
