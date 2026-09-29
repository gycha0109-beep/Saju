# FR104 U3.2 — Exact runtime provider-side rotation compensation audit

Issue: #1810
Watchtower-Track: face-observation-engine

## Purpose

U3.1 established provider rotation dependence on the exact pinned MakeHuman fixture without anatomical ground truth.

Observed:

```text
R180 → provider_cross_label_closer
R270/M180/M270 → provider pipeline unavailable

all exact inverse-pixel controls
→ exact R0/M0 bytes
→ exact R0/M0 provider scalars
```

U3.2 asks whether the exact installed `@mediapipe/tasks-vision@0.10.35` runtime can canonicalize those same native pixels using `ImageProcessingOptions.rotationDegrees`.

## U3.2A — exact installed package audit

Primary authority is the package actually installed by `npm ci`, not an upstream master branch.

The verifier resolves the exact runtime entry used by Node and records:

```text
package.json SHA-256
vision.d.ts SHA-256
resolved runtime entry SHA-256
artifact byte sizes
resolved runtime-entry relative path
```

Required exact contract:

```text
package = @mediapipe/tasks-vision
version = 0.10.35

FaceLandmarker.detect(
  image: ImageSource,
  imageProcessingOptions?: ImageProcessingOptions
)

ImageProcessingOptions.rotationDegrees?: number
```

Behavioral semantics are then tested in the browser runtime.

## Runtime probes

Before the 8-case matrix:

```text
R0: detect(image) == detect(image,{rotationDegrees:0})
M0: detect(image) == detect(image,{rotationDegrees:0})

R90:
rotationDegrees=270
==
rotationDegrees=-90
(exact provider scalar equality required)

rotationDegrees=45
→ must throw
→ no result accepted

R90 direction diagnostic:
correct candidate = 270
opposite control = 90
```

## U3.2B compensation matrix

The U3.1 native pixel bytes are regenerated exactly and must match their admitted SHA-256 values.

No pixel canonicalization occurs in U3.2.

Only:

```text
FaceLandmarker.detect(
  exactNativeCanvas,
  { rotationDegrees: compensationDegrees }
)
```

is changed.

Pre-registered compensation:

| Case | Physical clockwise rotation | rotationDegrees |
| --- | ---: | ---: |
| R0 | 0 | 0 |
| R90 | 90 | 270 |
| R180 | 180 | 180 |
| R270 | 270 | 90 |
| M0 | 0 | 0 |
| M90 | 90 | 270 |
| M180 | 180 | 180 |
| M270 | 270 | 90 |

## Comparison

Compensated provider centroids are compared directly to the same-family provider baseline.

No additional output-coordinate rotation is applied.

```text
sameLabelCost
crossLabelCost
unorderedPairCost
pairMidpointError
interEyeDistanceAbsoluteDifference
exactBaselineProviderScalarsRecovered
```

No numeric acceptance threshold is authorized.

## Pre-registered hypotheses

```text
H1 native unavailable cases recover provider availability
H2 compensated available cases become provider_same_label_closer
H3 R180 cross-label behavior resolves
H4 zero-degree controls reproduce exact R0/M0 provider scalars
```

Hypothesis failure is a scientific result, not a harness failure.

## Scientific states

```text
provider_rotation_compensation_effective_on_exact_fixture
provider_rotation_compensation_partially_effective
provider_rotation_compensation_ineffective
provider_rotation_compensation_introduces_new_instability
provider_rotation_compensation_unresolved
```

## Interpretation boundary

Always:

```text
anatomicalGroundTruthUsed = false
anatomicalSideSemanticsUsed = false
detectorStageFailureMayBeClaimed = false
exactFixtureRuntimeOnly = true
```

## Privacy

```text
userImageConsumed = false
cameraAccessed = false
rawProviderLandmarksReturned = false
rawProviderLandmarksPersisted = false
transformedRasterPersisted = false
biometricEmbeddingProduced = false
identityTemplateProduced = false
```

## Authority before empirical admission

```text
providerRotationCompensationSemanticsAudited = false
providerRotationCompensationEffectiveForExactFixture = false
canonicalProviderOrientationNormalizationAvailable = false
providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Admission sequence

Pass 1:

1. verify exact installed package artifacts;
2. execute zero/signed/invalid/opposite runtime probes;
3. replay exact U3.1 native controls;
4. execute all 8 compensated cases;
5. record bounded scalar result without changing authority.

Pass 2:

1. add exact artifact-audit evidence;
2. add fail-closed compensation result intake;
3. add empirical evidence artifact;
4. pin exact package SHA and result matrix;
5. rerun headless CI for exact reproduction;
6. merge only after all regression workflows pass.

## Next gate

If compensation is effective on the exact fixture, U4 anatomical mapping review may be considered, but anatomical LEFT/RIGHT remains unapproved until that separate review.

If compensation is partial or unstable, U4 remains HOLD and a residual rotation/mirror interaction audit is required.
