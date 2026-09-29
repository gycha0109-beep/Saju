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

## Empirical result

First successful governed execution:

```text
exact package
@mediapipe/tasks-vision 0.10.35

package.json
size = 1084
sha256 = 5c96247445e57a2d087758114b116fed7d46eb401342aee19b1acc56d36fe707

vision.d.ts
size = 116918
sha256 = 3825dba564fc06720dc0934b72a22711ac6b7491ae8662e573ac205699ea016b

vision_bundle.mjs
size = 136993
sha256 = 55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe
```

Exact installed declaration evidence:

```text
FaceLandmarker.detect accepts ImageProcessingOptions = true
ImageProcessingOptions declared = true
rotationDegrees property = true
clockwise text observed = true
multiple-of-90 text observed = true
```

Behavioral probes:

```text
R0 undefined vs rotationDegrees=0 = exact provider equality
M0 undefined vs rotationDegrees=0 = exact provider equality

R90 rotationDegrees=270
vs
R90 rotationDegrees=-90

throws = false
exact provider equality = false

canonical representation retained:
0 / 90 / 180 / 270

rotationDegrees=45
throws = true
result produced = false
```

Compensation matrix:

| Case | Native | Compensated | Relation to family baseline |
| --- | --- | --- | --- |
| R0 | available | available | same-label |
| R90 | available | available | same-label |
| R180 | available | available | **cross-label** |
| R270 | unavailable | **available** | cross-label |
| M0 | available | available | same-label |
| M90 | available | available | **cross-label** |
| M180 | unavailable | **available** | cross-label |
| M270 | unavailable | **available** | cross-label |

Availability recovery:

```text
R270
M180
M270
```

R180 was not resolved:

```text
sameLabelCost  = 0.3562492451686251
crossLabelCost = 0.05188939610706061
relation       = provider_cross_label_closer
```

Therefore:

```text
state = provider_rotation_compensation_partially_effective

providerRotationCompensationSemanticsAudited = true
providerAvailabilityRecoveryObserved = true
providerCoordinateCanonicalizationEstablished = false
providerRotationCompensationEffectiveForExactFixture = false
canonicalProviderOrientationNormalizationAvailable = false

anatomicalMappingReviewOutcome = hold
```

Full empirical result replay anchor:

```text
SHA-256
9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c
```

Every subsequent headless execution must reproduce this exact serialized result digest.

## Interpretation

`rotationDegrees` is effective for provider pipeline availability on the previously unavailable cardinal rotations, but the observed output provider coordinates are not established as a canonical R0/M0 coordinate frame.

In particular:

- R180 remains provider-cross-label closer;
- R270 becomes available but is cross-label closer;
- M90 changes to cross-label under compensation;
- M180/M270 recover availability but are cross-label closer.

Therefore provider-side compensation cannot yet be used as an anatomical laterality normalization rule.

No detector-stage failure claim is made.

## Next gate

U4 remains HOLD.

Next bounded research:

```text
FR104 U3.2.1
Compensated Output Coordinate Frame Semantics Audit
```

The next step must determine whether `rotationDegrees` canonicalizes inference orientation while returning landmark coordinates in the original input image frame, another rotated frame, or a provider-specific convention.

No anatomical LEFT/RIGHT mapping review is authorized until that output-coordinate contract is resolved.
