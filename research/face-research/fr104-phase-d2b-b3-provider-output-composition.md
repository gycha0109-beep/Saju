# FR104 Phase D2B-B3 — Same-Runtime Provider Output Composition

Watchtower-Track: face-observation-engine

## Scope

This phase composes the outputs of the already-governed FR104 live provider path:

```text
exact Mesh6H frame
-> exact materialized RGBA origin
-> Florence live transport
-> FaceLandmarker runtime
```

into the existing FR104 descriptive candidate orchestration.

It does not authorize:

- Florence candidate acceptance as an external ear;
- anatomical left/right;
- traditional physiognomy binding;
- production use.

## Starting state

At the start of this continuation:

```text
main@b26b76e4aac05d382aa87c5b08574e60b2f29e8e
```

Predecessor:

- PR #2062
- merge SHA `eeb99828a22c68be94644da5d73191d4fdc597a0`

B2 already established the live Florence transport and one-time opaque candidate handle.

The B3 branch already contained the initial mechanical extraction work for:

- shared MediaPipe ephemeral screen-geometry extraction;
- FR257 reuse of that extractor;
- a FaceLandmarker same-run opaque geometry handle;
- FR104 same-frame orchestration accepting only minimal screen geometry.

This phase completes and hardens that path.

## 1. Shared MediaPipe screen geometry extraction

New shared module:

```text
packages/face-reading/src/mediapipe-ephemeral-screen-geometry-extractor.ts
```

The extractor preserves the existing FR257 provider contract:

```text
exactly one face
478 provider landmarks
first 468 geometry landmarks
blendshapes disabled
provider transformation matrices disabled
finite x/y/z
x/y within [0,1]
```

FR257 now reuses this module rather than maintaining a second copy of the same provider-result validation logic.

No new CV stack is introduced.

## 2. Same-run FaceLandmarker geometry handle

New module:

```text
packages/face-reading/src/neutral-ear-face-landmarker-geometry-handle-fr104.ts
```

The FaceLandmarker byte adapter can expose its validated first-468 screen geometry to an internal observer during the exact provider invocation.

The observer copies that geometry into ephemeral handle-owned memory.

Public handle:

```text
NeutralEarFaceLandmarkerGeometryHandleFR104V1
```

contains only:

- providerRunRef;
- frame width/height;
- landmark count;
- no raw landmark payload.

The underlying geometry:

- can be consumed once;
- is cleared after consumption;
- has an explicit pre-composition discard path;
- is not persisted.

No second FaceLandmarker invocation is introduced.

## 3. Exact invocation-summary binding

String equality is not sufficient for same-run provenance.

Both provider handles are therefore bound by object identity to the exact invocation summary objects returned during B1 execution.

### Florence

```text
exact Florence invocation summary object
<-> exact Florence candidate-set handle
```

### FaceLandmarker

```text
exact FaceLandmarker invocation summary object
<-> exact FaceLandmarker geometry handle
```

The bindings use WeakMap state.

Structurally copied summaries are rejected.

This prevents mixing a handle from another invocation that happens to reuse the same providerRunRef and dimensions.

## 4. FR104 minimal same-frame geometry contract

The old FR104 face-envelope adapter accepted the full FR257 ephemeral geometry observation even though it only consumed:

- providerRunRef;
- screen landmarks;
- frame width;
- frame height.

B3 narrows the FR104 contract to:

```text
NeutralEarSameFrameScreenGeometryFR104V1
```

Existing FR257 observations remain structurally compatible.

No metric landmarks or pose matrix are fabricated for B3.

## 5. Independent same-pixel binding

B1 already proves that both providers receive bytes from the same exact materialized RGBA origin.

B3 carries that fact into FR104 orchestration:

```text
sharedDecodedPixelFrame.independentlyVerified = true
```

The face-envelope binding can now distinguish:

```text
caller_attested_ephemeral_not_independently_verified
```

from:

```text
exact_runtime_byte_origin_independently_verified
```

For the B3 live path, the second state is used.

## 6. Orientation boundary

The composed provider instance establishes:

```text
same RGBA origin = verified
additional Florence mirror = none
additional Florence rotation = none
additional FaceLandmarker mirror = none
additional FaceLandmarker rotation = none
```

Therefore provider-to-provider transform parity is mechanically resolved.

The live RGBA consumer frame does not require EXIF interpretation:

```text
exifOrientation.state = absent_or_not_required
```

This does not establish subject-relative front-camera mirror semantics.

That remains:

```text
frontCameraMirror.state = unknown
```

## 7. Provider output composer

New module:

```text
packages/face-reading/src/neutral-ear-provider-output-composition-fr104.ts
```

Required inputs:

```text
exact issued B1 runtime result
exact Mesh6H handle
exact Mesh6H frame
exact Florence byte adapter
exact FaceLandmarker byte adapter
exact invocation-bound Florence candidate handle
exact invocation-bound FaceLandmarker geometry handle
```

Before composition it verifies:

1. exact B1 runtime result identity;
2. exact runtime handle/frame/adapter identity;
3. Florence summary-to-handle identity;
4. FaceLandmarker summary-to-handle identity;
5. providerRunRef equality;
6. frame dimension equality;
7. same materialized RGBA origin;
8. no additional provider mirror/rotation.

## 8. Candidate preservation

All Florence candidates are preserved.

Example:

```text
left prompt:
  candidate 1
  candidate 2

right prompt:
  candidate 1
```

becomes three descriptive FR104 bundles.

B3 does not:

- choose a winning candidate;
- collapse duplicate-looking candidates;
- apply IoU thresholds;
- apply geometry plausibility thresholds;
- treat left/right prompt provenance as anatomy.

Each result retains:

```text
promptProvenance = left_prompt | right_prompt
promptSideConsumedAsAnatomicalSide = false
```

## 9. Existing FR104 descriptive orchestration reused

Each ephemeral candidate is passed through the existing:

```text
orchestrateNeutralEarCandidateFR104
```

path.

That produces only descriptive evidence such as:

- shape ratios;
- face-relative centroid offsets;
- candidate size relative to face envelope;
- image-space horizontal sign.

It does not produce:

- ear acceptance;
- plausibility classification;
- anatomical side;
- traditional meaning.

## 10. Privacy

The B3 result does not return:

- raw frame;
- raw frame bytes;
- raw Florence response;
- raw Florence polygon points;
- raw FaceLandmarker response;
- raw screen landmarks;
- metric landmarks;
- pose matrix;
- image digest;
- embedding;
- identity template.

Candidate geometry and screen geometry are cleared after one-time composition.

## 11. Readiness transition

Cleared mechanically for the composed live runtime instance:

```text
runtime_instance_same_pixel_bytes_must_be_independently_verified
runtime_instance_transform_parity_must_be_resolved
provider_outputs_not_yet_composed_into_fr104_candidate_orchestration
```

Still active:

```text
subject_relative_source_pixel_mirror_provenance_not_verified
verified_controlled_capture_profile_not_available
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
ordinary_file_upload_cannot_claim_controlled_capture_attestation
runtime_anatomical_side_mapping_not_admitted
```

## 12. Authority remains closed

Even after successful B3 composition:

```text
descriptiveProviderOutputCompositionCompleted = true

validatedExternalEarObservationAuthorized = false
anatomicalLateralityAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

The live provider path is now mechanically composable, not semantically authorized.

## CI coverage

B3 adds explicit tests for:

- exact FaceLandmarker invocation-summary binding;
- one-time geometry-handle consumption;
- geometry clearing;
- pending-geometry discard;
- exact Florence invocation-summary binding;
- exact B1 runtime-result identity;
- all-candidate preservation;
- no candidate selection threshold;
- independently verified same-pixel composition;
- front-camera mirror remaining unresolved;
- anatomical/traditional/production authority remaining false.

## Exit conditions

### A — same-run geometry

The exact FaceLandmarker execution used by B1 supplies the FR104 face geometry without a second provider execution.

### B — exact provider binding

Both opaque handles are bound to the exact invocation summary objects contained in the exact B1 runtime result.

### C — descriptive composition

Every Florence candidate is converted to a sanitized FR104 descriptive bundle using the same-run face geometry.

### D — no semantic promotion

No candidate is accepted as an ear and no anatomical side is assigned.

## Next gate

The next gate is FR21b controlled-capture calibration:

```text
front camera
rear camera
x
preview
raw_pixels
encoded_pixels
canonical_pixels
```

with a deterministic asymmetric anatomical marker.

Only reviewed empirical calibration evidence may admit verified controlled-capture profiles.

Ordinary file upload remains fail-closed.
