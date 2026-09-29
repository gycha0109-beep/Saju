# FR104 U2 — Pinned MakeHuman raster × exact FaceLandmarker preflight

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

FR104 U1.2 established a deterministic non-user MakeHuman raster and an independent anatomical-eye projection from the exact same camera transform.

U2 asks one bounded empirical question:

> Can the exact pinned `@mediapipe/tasks-vision@0.10.35` FaceLandmarker IMAGE runtime detect exactly one 478-landmark face on that exact raster, and if so how do its provider-labelled eye centroids geometrically align with the independent MakeHuman anatomical eye projections?

U2 does not authorize provider LEFT/RIGHT as anatomical LEFT/RIGHT.

## Frozen input

U1.2 canonical fixture:

```text
1024 x 1024 RGB8 PNG
SHA-256
f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb
```

Independent anatomical projections:

```text
MakeHuman anatomical left eye
= (0.5909577633614812, 0.5)

MakeHuman anatomical right eye
= (0.4090422366385188, 0.5)
```

These coordinates were derived before provider execution and do not consume MediaPipe landmarks, provider labels, Florence prompt labels, or image-space X sign as semantic authority.

## Ephemeral materialization

The canonical PNG remains uncommitted.

For U2 only, the U1.2 verifier may be invoked with:

```text
--write-render=<ephemeral cache path>
```

The verifier first repeats the full U1.2 source/determinism/digest checks and only then writes the already-verified PNG bytes to the local research cache.

The resulting state is:

```text
ephemeral cache materialization = allowed
repository fixture persistence   = false
user image                       = none
```

Normal U1.2 CI execution without the argument still persists no render bytes.

## Provider runtime

Exact existing FR26 / FR104 browser runtime is reused:

```text
package      = @mediapipe/tasks-vision
version      = 0.10.35
runningMode  = IMAGE
numFaces     = 1
blendshapes  = false
matrices     = false
model        = existing FR26 pinned model reference
WASM root    = existing FR26 pinned WASM reference
```

No new provider runtime, model, or semantic adapter is introduced.

## Browser surface

Local route:

```text
/fr104-makehuman-preflight/
```

Input:

```text
/fr104-makehuman-preflight/fixture.png
```

Before inference, the browser independently checks:

1. SHA-256 equals the pinned U1.2 digest;
2. decoded dimensions are exactly 1024 × 1024.

No upload and no camera access are available.

## Provider eligibility

Provider execution is bounded as:

```text
faceCount != 1
→ provider_cannot_detect_face

faceCount == 1
but landmarkCount != 478
→ unavailable

faceCount == 1
and landmarkCount == 478
→ candidate scalar evidence
```

A no-face result is not repaired by silently changing the U1.2 render.

Any render change after observing provider behavior is a new documented experiment/revision.

## Scalar reduction

On one valid 478-landmark face, raw landmarks are reduced in-memory to the centroids of the exact existing FR24 provider eye topology sets:

```text
P_L = centroid(FACE_LANDMARKS_LEFT_EYE)
P_R = centroid(FACE_LANDMARKS_RIGHT_EYE)
```

Each centroid retains only normalized `x,y`.

Raw landmark arrays are not returned or persisted.

## Independent anatomical comparison

Let:

```text
A_L = independent MakeHuman anatomical-left projection
A_R = independent MakeHuman anatomical-right projection
```

Then:

```text
direct =
distance(P_L, A_L)
+
distance(P_R, A_R)

swapped =
distance(P_L, A_R)
+
distance(P_R, A_L)
```

Descriptive relation:

```text
direct_assignment_closer
swapped_assignment_closer
equal_or_unresolved
```

No numeric acceptance threshold is introduced.

Even a strong direct/swapped difference on this fixture does not establish global provider anatomical semantics.

## CI execution

The existing MESH6J localhost server is reused.

GitHub hosted Ubuntu runners expose Google Chrome and a matching ChromeDriver. U2 therefore uses a bounded Node-built-in WebDriver client instead of adding Playwright/Puppeteer.

CI path:

```text
face:build
→ MESH6J localhost server
→ ephemeral U1.2 PNG materialization
→ ChromeDriver
→ headless Chrome
→ /fr104-makehuman-preflight/?autorun=1
→ exact FaceLandmarker 0.10.35
→ bounded JSON
→ CI validation
```

The CI runner treats a governed `provider_cannot_detect_face` or unexpected-landmark `unavailable` result as an empirical result, not as a harness crash.

Browser/runtime/digest errors remain hard CI failures.

## Privacy

Always:

```text
userImageConsumed = false
cameraAccessed = false
rawProviderLandmarksReturned = false
rawProviderLandmarksPersisted = false
biometricEmbeddingProduced = false
identityTemplateProduced = false
```

## Authority before empirical admission

The protocol remains:

```text
providerPreflightExecuted = false
providerFaceDetectabilityVerified = false
providerLabelMappedToAnatomicalSide = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

The browser result may truthfully record that an execution occurred. That execution evidence is not automatically an admitted semantic authority.

## Empirical result

First headless CI execution:

```text
MESH6J workflow run = 36504801172
fixture SHA-256     = f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb
face count          = 1
landmark count      = 478

provider LEFT eye centroid
= (0.5904278568923473, 0.512873537838459)

provider RIGHT eye centroid
= (0.4134050067514181, 0.5108402445912361)

independent anatomical LEFT eye
= (0.5909577633614812, 0.5)

independent anatomical RIGHT eye
= (0.4090422366385188, 0.5)

direct cost  = 0.02456967216060714
swapped cost = 0.35972525227214214
relation     = direct_assignment_closer
```

The exact fixture therefore passed the provider eligibility preflight.

A separate fail-closed intake now admits only:

```text
providerFaceDetectabilityVerifiedForExactPinnedFixture = true
exactFixtureDirectAssignmentRelationObserved = true
```

Still false:

```text
providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

The committed empirical centroids, costs, and relation are now rechecked against every subsequent headless CI execution. Any scalar drift fails CI instead of silently replacing the admitted result.

## Next gate

Use the exact same SHA-pinned MakeHuman fixture for controlled transform diagnostics:

1. original vs explicit horizontal mirror;
2. rotations 0 / 90 / 180 / 270;
3. preserve anatomical identity while transforming image coordinates;
4. compare provider-labelled eye centroids against transformed independent anatomical projections;
5. keep any anatomical mapping admission closed until the transform behavior is reviewed.

No yaw sweep is admitted before the mirror/rotation diagnostics are stable.
