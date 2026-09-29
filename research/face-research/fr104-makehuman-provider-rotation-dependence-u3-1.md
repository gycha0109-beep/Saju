# FR104 U3.1 — Same-fixture provider rotation dependence

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U3 showed:

```text
R0    direct
R90   direct
R180  swapped
R270  provider unavailable

M0    swapped
M90   swapped
M180  provider unavailable
M270  provider unavailable
```

U3.1 removes anatomical ground truth from the comparison path and asks only whether provider-labelled eye geometry is rotation-equivariant relative to provider baselines.

## Families

```text
non-mirrored family baseline = R0
mirrored family baseline     = M0
```

Only cases with the same mirror state are compared.

## Native provider comparison

For each available native case:

1. inverse-rotate provider LEFT/RIGHT centroids into the same-family baseline frame;
2. compute:

```text
sameLabelCost
= d(mapped LEFT, baseline LEFT)
+ d(mapped RIGHT, baseline RIGHT)

crossLabelCost
= d(mapped LEFT, baseline RIGHT)
+ d(mapped RIGHT, baseline LEFT)
```

3. classify only:

```text
provider_same_label_closer
provider_cross_label_closer
equal_or_unresolved
```

Also record:

```text
unorderedPairCost
pairMidpointError
interEyeDistanceAbsoluteDifference
```

No numeric acceptance threshold is authorized.

## Exact rotation-canonicalized control

Every native RGBA case is inverse-rotated without changing mirror state.

Required byte equality:

```text
inverseRotate(R0/R90/R180/R270) == exact R0 RGBA
inverseRotate(M0/M90/M180/M270) == exact M0 RGBA
```

Pinned family baseline SHA-256:

```text
R0
fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364

M0
5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8
```

The canonicalized control is then passed through the exact same FaceLandmarker runtime and must reproduce the exact family baseline provider centroids.

Failure is hard-fail because identical input bytes must not silently produce a different admitted baseline.

## Native transform predecessor control

Before provider interpretation, each regenerated native case must reproduce the exact U3 transformed RGBA SHA.

This prevents U3.1 transform implementation drift from being mistaken for provider behavior.

## Runtime

```text
@mediapipe/tasks-vision 0.10.35
runningMode = IMAGE
numFaces = 1
provider-side rotation hint = unused
```

No provider-side rotation compensation is tested in U3.1.

## Interpretation boundary

Always:

```text
anatomicalGroundTruthUsed = false
anatomicalSideSemanticsUsed = false
detectorStageFailureMayBeClaimed = false
```

A native zero-face result may only be called provider pipeline unavailability / face-landmark availability loss.

## Scientific states

```text
exact_fixture_rotation_dependence_observed
no_rotation_dependence_observed
unresolved
```

`exact_fixture_rotation_dependence_observed` is reached if either:

- an available case is provider-cross-label closer after exact inverse rotation; or
- a native unavailable case recovers exact provider baseline after byte-exact rotation canonicalization.

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

## Authority before admission

```text
providerRotationDependenceInvestigated = false
providerRotationEquivarianceRefutedForExactFixture = false
providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Fail-closed conditions

Examples:

```text
U3_1_CANONICAL_FIXTURE_DRIFT
U3_1_TRANSFORM_INVERSE_MISMATCH
U3_1_FAMILY_CONTROL_RGBA_MISMATCH
U3_1_R0_PROVIDER_BASELINE_DRIFT
U3_1_M0_PROVIDER_BASELINE_DRIFT
U3_1_PROVIDER_OUTPUT_SHAPE_DRIFT
U3_1_RESULT_REPLAY_DRIFT
U3_1_UNAUTHORIZED_ANATOMICAL_DEPENDENCY
U3_1_UNAUTHORIZED_AUTHORITY_PROMOTION
```

Native R180 cross-label or native no-face states are scientific results, not harness errors.

## Admission sequence

Pass 1:

1. run all 8 native cases;
2. inverse-map available provider centroids;
3. run all 8 exact rotation-canonicalized controls;
4. record provider-only scalar evidence and summary.

Pass 2:

1. add fail-closed result intake;
2. add empirical evidence artifact;
3. pin exact native/control scalars and states;
4. rerun headless CI;
5. require exact result replay before merge.

## Next gate

If exact-fixture provider rotation dependence is established, anatomical mapping remains HOLD.

The next decision is whether a separate U3.2 provider-side rotation compensation audit is required before any U4 anatomical mapping review.
