# FR104 Phase D2B-A — Controlled Capture Facing + Exact Frame-to-Consumer Byte Provenance

Watchtower-Track: face-observation-engine

## Scope

This phase advances only the mechanical controlled-capture provenance path required by FR104 Phase D and FR21b.

It does **not** execute or admit deterministic asymmetric front/rear calibration and does not authorize anatomical laterality.

## Baseline

Branch start:

```text
main@2c3c6ec3b7edf5968b81491550cf0c7abc028e94
```

The prior D2A bridge proved exact captured-frame object binding to a profile reference but intentionally left:

```text
captured_frame_to_consumer_bytes_not_independently_verified
```

open.

FR21b still has:

```text
CONTROLLED_CAPTURE_PROFILES_FR21B = []
CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B = []
controlledCaptureContractState = not_implemented
calibrationProtocol = design_only
productionLateralityBindingAllowed = false
```

Those authority facts remain unchanged in D2B-A.

## 1. Existing MESH6H capture path extended, not replaced

No parallel camera/orientation stack is introduced.

`mesh6h-browser-camera-frame-source.ts` now accepts:

```text
cameraFacing = front | rear
```

with the mechanical browser mapping:

```text
front -> facingMode=user
rear  -> facingMode=environment
```

The default remains `front` so existing callers preserve prior behavior.

Camera-facing selection is explicitly not mirror or laterality authority.

## 2. Exact captured-frame issuance identity

MESH6H now records an ephemeral WeakMap relation:

```text
exact Mesh6GCapturedFrameV1 object
    -> exact issuing Mesh6H handle
```

`assertIssuedMesh6HBrowserCameraFrame(handle, frame)` rejects copied or structurally forged frame objects.

No raw image, digest, landmark set, embedding, or identity template is persisted by this relation.

## 3. Exact frame -> consumer byte bridge

New runtime:

```text
neutral-ear-captured-frame-consumer-byte-provenance-fr104.ts
```

The bridge:

1. requires an issued MESH6H handle;
2. requires the exact frame object issued by that handle;
3. invokes the supplied byte materializer on that exact frame image object;
4. creates separate ephemeral byte copies at the Florence and FaceLandmarker consumer boundaries;
5. computes SHA-256 internally for source and each consumer boundary;
6. requires source == Florence == FaceLandmarker before finalization;
7. returns no digest;
8. persists no digest or raw frame bytes;
9. zeroes bridge-owned source bytes after finalization;
10. zeroes each bridge-owned consumer copy after its callback completes.

The issued evidence object is itself WeakMap-bound to the exact handle and frame object so a structurally identical evidence copy cannot substitute for it.

This proves the mechanical byte-origin chain only when the actual consumer invocation is wrapped by the bridge.

## 4. Controlled-capture profile gate

New runtime:

```text
neutral-ear-controlled-capture-runtime-byte-binding-fr104.ts
```

It joins:

```text
exact issued Mesh6H handle
+ exact issued frame
+ exact issued frame-to-consumer-byte evidence
+ FR21b profileRef
```

The D2B implementation identity is pinned to the MESH6H source that introduced front/rear selection and exact frame issuance:

```text
repositoryCommit = aa3109356477d9621a571ac91d250f10b2241955
sourceBlobSha    = 49b7fa4277326ad571a01d5414f586128cf5758b
```

Because FR21b has no admitted verified profile yet, the resulting binding remains blocked by profile admission/verification and reviewed subject-relative mirror calibration.

## 5. Readiness change

Mechanical gate now available:

```text
front/rear camera request selection
exact frame issuance identity
exact frame -> dual consumer byte boundary provenance
```

The old generic blocker:

```text
captured_frame_to_consumer_bytes_binding_not_independently_verified
```

is replaced by the more specific remaining runtime blocker:

```text
runtime_byte_bridge_not_yet_integrated_into_fr104_ear_provider_invocation
```

The empirical blocker is explicit:

```text
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
```

## 6. Still forbidden

D2B-A does not allow:

```text
cameraFacing -> mirror semantics
preview mirror -> saved pixel mirror
MediaPipe provider labels -> anatomical side
image X sign -> anatomical side
GNM X sign -> anatomical side
ordinary file upload -> controlled capture
unreviewed calibration -> verified profile
byte provenance -> anatomical laterality
byte provenance -> traditional interpretation
byte provenance -> production authorization
```

## 7. Authority state after D2B-A

Required state remains:

```text
subjectRelativeMirrorProvenanceAuthorized = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Next gate

D2B-B must use the same MESH6H path to execute deterministic asymmetric calibration for both front and rear cameras and inspect all FR21b stages:

```text
preview
raw_pixels
encoded_pixels
canonical_pixels
```

Actual device/browser evidence must be reviewed before any profile can become `verified`.

After reviewed profiles exist, the exact frame-to-consumer-byte bridge must be wired around the actual FR104 Florence and FaceLandmarker invocation boundary. Ordinary file upload remains fail-closed.
