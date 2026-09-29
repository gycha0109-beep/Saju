# FR104 U3 — Controlled MakeHuman transform diagnostics

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U2 established one bounded fact on the exact SHA-pinned MakeHuman raster:

```text
faceCount = 1
landmarkCount = 478
directCost  = 0.02456967216060714
swappedCost = 0.35972525227214214
relation    = direct_assignment_closer
```

U3 tests whether that bounded provider/anatomical geometric relation behaves predictably under known image transforms.

U3 does not authorize MediaPipe provider LEFT/RIGHT as subject anatomical LEFT/RIGHT.

## Frozen source

Canonical fixture:

```text
1024 x 1024
PNG SHA-256
f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb
```

Independent anatomical projections:

```text
anatomical LEFT  = (0.5909577633614812, 0.5)
anatomical RIGHT = (0.4090422366385188, 0.5)
```

## Transform matrix

Exactly eight cases are pre-registered:

```text
R0    mirror=false rotation=0
R90   mirror=false rotation=90 clockwise
R180  mirror=false rotation=180
R270  mirror=false rotation=270 clockwise

M0    mirror=true  rotation=0
M90   mirror=true  rotation=90 clockwise
M180  mirror=true  rotation=180
M270  mirror=true  rotation=270 clockwise
```

Order is fixed:

```text
horizontal mirror
then
clockwise rotation
```

Rotations preserve reflection parity. Explicit horizontal mirror reverses reflection parity.

## Pixel contract

The canonical PNG is decoded once to 1024×1024 RGBA.

Each transformed image is produced by exact pixel permutation:

```text
interpolation = none
resize = none
crop = none
EXIF transform = none
CSS transform = none
task image rotation = 0
```

Each transformed RGBA buffer receives a SHA-256 fingerprint before inference.

The same exact RGBA bytes are placed into the canvas consumed by FaceLandmarker.

## Independent anatomical transform

Anatomical identity is never re-labelled by screen side.

For normalized `(x,y)`:

```text
H(x,y)    = (1-x, y)
R0(x,y)   = (x,y)
R90(x,y)  = (1-y, x)
R180(x,y) = (1-x, 1-y)
R270(x,y) = (y, 1-x)
```

For mirrored cases:

```text
T = Rk(H(point))
```

The point remains `anatomicalLeftEye` or `anatomicalRightEye` after transform.

## Pre-registered hypothesis

Before U3 provider execution:

```text
orientation_preserving
→ direct_assignment_closer

orientation_reversing
→ swapped_assignment_closer
```

This is a diagnostic hypothesis, not anatomical authority.

No numeric acceptance threshold is introduced.

## R0 baseline control

R0 must exactly reproduce U2 admitted scalars:

```text
provider LEFT
= (0.5904278568923473, 0.512873537838459)

provider RIGHT
= (0.4134050067514181, 0.5108402445912361)

directCost
= 0.02456967216060714

swappedCost
= 0.35972525227214214

relation
= direct_assignment_closer
```

Any mismatch is a harness/runtime baseline drift and hard-fails CI.

## Scientific states

The experiment produces exactly one bounded summary:

```text
transform_consistent_with_parity_conditioned_hypothesis
transform_inconsistent
incomplete_provider_coverage
equal_or_unresolved
```

A scientific mismatch is not a harness failure.

For example, a 90-degree rotation yielding no provider face is recorded as `incomplete_provider_coverage` and CI may still pass.

Hard CI failures are reserved for contract/harness drift such as:

- canonical PNG SHA drift;
- transform definition mismatch;
- transformed ground-truth mismatch;
- invalid RGBA SHA;
- R0 U2 baseline drift;
- privacy/authority promotion;
- browser/runtime failure;
- malformed result schema.

## Provider runtime

Exact U2 runtime is reused:

```text
@mediapipe/tasks-vision = 0.10.35
runningMode = IMAGE
numFaces = 1
model = existing FR26 model reference
WASM = existing FR26 WASM reference
```

## Privacy

Always:

```text
userImageConsumed = false
cameraAccessed = false
rawProviderLandmarksReturned = false
rawProviderLandmarksPersisted = false
transformedRasterPersisted = false
biometricEmbeddingProduced = false
identityTemplateProduced = false
```

## Authority

Before empirical admission:

```text
exactMakeHumanFixtureTransformDiagnosticsExecuted = false
parityConditionedAssignmentPatternObserved = false
providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## CI execution

Existing MESH6J CI:

```text
face:build
→ localhost MESH6J
→ canonical PNG ephemeral materialization
→ ChromeDriver
→ headless Chrome
→ 8 exact pixel transforms
→ exact FaceLandmarker
→ bounded result JSON
→ harness validation
```

Face Reading CI separately verifies the U3 protocol contract.

## Two-pass admission

Pass 1:

1. execute all eight transforms;
2. record transformed RGBA SHA values;
3. record provider eligibility per case;
4. record provider centroids/costs/relation when available;
5. record bounded scientific summary.

Pass 2:

1. add fail-closed result intake;
2. add empirical evidence artifact;
3. pin exact observed scalar evidence;
4. rerun headless CI;
5. require exact empirical reproduction before merge.

## Next gate

Only after U3 admission:

```text
FR104 U4 — Controlled Anatomical Mapping Evidence Review
```

U4 reviews whether U2 + U3 + prior mirror evidence are sufficient for any anatomical mapping rule.

No runtime anatomical laterality activation is authorized by U3 alone.
