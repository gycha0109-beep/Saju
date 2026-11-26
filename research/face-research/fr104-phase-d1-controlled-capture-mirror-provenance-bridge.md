# FR104 Phase D1 — controlled-capture mirror provenance bridge

Issue: #1810

Watchtower-Track: face-observation-engine

## Purpose

This step materializes the missing FR104 boundary between the already-admitted
U5B-D cross-source reflection-parity mapping and FR21b controlled-capture
authority.

It does **not** authorize anatomical laterality.

The bridge exists so runtime laterality cannot be unlocked by passing a
`profileRef`, a preview appearance, or an ordinary uploaded image without
evidence that the exact consumer frame came from an admitted controlled-capture
implementation.

## Fresh repository facts

Current reusable camera ingress already exists:

- `packages/face-reading/src/mesh6h-browser-camera-frame-source.ts`
  - explicit operator-triggered browser capture;
  - front-facing `getUserMedia(... facingMode: 'user')`;
  - raw image/video/provider/landmark persistence remains false;
  - calibration and production authority remain false.
- `tools/face-geometry/capture/mesh6j-operator-capture.html`
  - the front-camera preview is displayed with CSS `transform: scaleX(-1)`.

The CSS preview transform is presentation only. It is not promoted to saved
pixel, canonical pixel, or subject-anatomical authority.

FR21b already defines the static evidence shape required for a verified
controlled-capture profile:

- deterministic asymmetric calibration target;
- known anatomical marker side;
- front/rear camera facing;
- preview/raw/encoded/canonical stage observations;
- saved-pixel mirror policy;
- canonicalization transform;
- final anatomical laterality assertion;
- reviewed calibration evidence before profile verification.

Current FR21b registries remain empty and its authority remains
`not_implemented / design_only / blocked`.

## D1 bridge

New runtime surface:

`neutral-ear-controlled-capture-mirror-provenance-fr104.ts`

The bridge consumes:

1. capture source kind;
2. the existing FR104 frame-transform parity evidence;
3. the existing independently-computed Florence/FaceLandmarker same-pixel
   evidence;
4. canonical FR21b profile/calibration registries when a profile ref is
   supplied.

It emits an ephemeral issued provenance object.

The object is bound by runtime object identity to the exact transform-parity and
pixel-identity evidence objects that the later mapping request consumes.

This prevents a structurally copied provenance object or provenance generated
for a different frame-evidence pair from being silently reused.

## Deliberate fail-closed state

D1 does not invent a per-capture attestation.

Even if a verified FR21b static profile is admitted later, the current D1 bridge
still requires a separate exact runtime frame -> verified profile implementation
binding before it can report subject-relative mirror provenance as verified.

Therefore current output remains:

```text
subjectRelativeMirrorProvenanceVerified = false
subjectRelativeSourcePixelMirrorPolicy = unknown
```

with an explicit blocker:

```text
exact_runtime_frame_to_profile_binding_not_implemented
```

Ordinary file upload additionally receives:

```text
ordinary_file_upload_is_not_controlled_capture
```

An unknown profile ref receives:

```text
controlled_capture_profile_not_admitted
```

## Mapping integration

The existing FR104 anatomical mapping skeleton now requires an issued D1
provenance object bound to the exact transform/pixel evidence in the same
request.

The mapping no longer adds the subject-relative capture blocker merely as an
unconditional placeholder; it adds it because the issued bridge result remains
unverified.

Current runtime result intentionally remains:

```text
anatomicalSide = unknown
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Privacy

D1 returns or persists none of:

- raw frame bytes;
- raw provider landmarks;
- transformed raster;
- private image digest;
- biometric embedding;
- identity template.

The existing ephemeral dual-consumer SHA-256 check retains neither digest nor
raw frame bytes after finalization.

## What D1 closes

- explicit FR104 contract for consuming controlled-capture mirror provenance;
- explicit ordinary-upload rejection at that bridge;
- exact object-identity binding between the bridge result and the downstream
  transform/pixel evidence;
- explicit separation of static FR21b profile admission from exact per-capture
  runtime binding.

## What D1 does not close

- no FR21b calibration execution;
- no verified FR21b profile admission;
- no exact runtime frame -> verified profile implementation binding;
- no front/rear production-ready controlled capture authority;
- no anatomical-side runtime mapping;
- no traditional binding;
- no Production authorization.

## Next gate

```text
execute_and_admit_fr21b_deterministic_asymmetric_controlled_capture_calibration
then
implement_exact_runtime_frame_to_verified_profile_binding
```

Ordinary file upload remains fail-closed throughout.
