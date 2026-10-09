# FR104 Phase D2A — exact Mesh6H runtime frame/profile object binding

Issue: #1810

Watchtower-Track: face-observation-engine

## Purpose

D2A advances the Phase D controlled-capture path without inventing calibration
or anatomical authority.

The exact existing Mesh6H browser-camera frame object is now bound in-process to:

1. the issued Mesh6H front-camera handle;
2. a controlled-capture profile ref;
3. the exact FR104 frame-transform parity evidence object;
4. the exact FR104 dual-consumer pixel-identity evidence object.

This is a **mechanical runtime binding only**.

It does not prove that the downstream consumer bytes were independently derived
from the exact captured frame object.

## Reused capture implementation

D2A does not create another camera stack.

It pins the already-existing Mesh6H capture source:

- repository: `gycha0109-beep/Saju`
- reviewed implementation commit:
  `0032700ae853be54e2797a7acdce9ab63db796c7`
- source:
  `packages/face-reading/src/mesh6h-browser-camera-frame-source.ts`
- source blob:
  `0dccf5dee0b69bae24e2b79f1d4e69ca81646396`
- facing: front / `getUserMedia(... facingMode: 'user')`

The existing Mesh6H authority boundary still says that camera permission,
explicit trigger, synthetic fixtures, and runtime execution do not establish
calibration, identity, anatomy, or Production authority.

## Runtime object binding

New module:

`neutral-ear-controlled-capture-runtime-frame-binding-fr104.ts`

A D2A session accepts only an issued Mesh6H handle.

Its bound frame source wraps the existing
`handle.createSweepFrameSource(...)` iterator and does not copy, persist, or
replace the captured image.

For each yielded exact frame object, D2A issues an ephemeral frame receipt bound
by object identity to:

- the exact frame object;
- the exact issued Mesh6H handle;
- one stable profile ref.

The evidence-binding step then binds that issued frame receipt to the exact
FR104 transform-parity and dual-consumer pixel-identity evidence objects.

Structurally copied or evidence-swapped binding objects are rejected.

## Canonical FR21b profile state

D2A reads only the canonical FR21b registries.

Current state remains:

- no admitted profile;
- no reviewed calibration evidence;
- no verified front/rear profile.

Therefore the current binding reports:

```text
exactFrameToVerifiedProfileBindingVerified = false
```

A future profile may only satisfy this mechanical gate if its pinned
implementation identity matches the reviewed Mesh6H source identity and its
camera facing is front.

This still does not establish subject-relative mirror provenance.

## Remaining byte gap

The important remaining gap is explicit:

```text
captured_frame_to_consumer_bytes_not_independently_verified
```

The dual-consumer SHA-256 evidence proves that Florence and FaceLandmarker saw
the same bytes.

It does **not** yet prove that those bytes were independently derived from the
exact D2A-bound Mesh6H frame object.

D2A therefore keeps:

```text
consumerFrameEvidenceBoundToProfileImplementation = false
subjectRelativeMirrorProvenanceVerified = false
subjectRelativeSourcePixelMirrorPolicy = unknown
anatomicalSide = unknown
```

## D1 bridge integration

The D1 controlled-capture mirror-provenance bridge now accepts an optional D2A
binding on the controlled-capture path.

- missing binding -> explicit fail-closed blocker;
- unverified profile binding -> explicit blocker;
- exact frame-object binding with consumer-byte gap -> explicit blocker;
- ordinary file upload remains a separate rejected path.

No path can gain subject-relative mirror authority from a profile ref alone.

## Why calibration is still required

The existing FR21b contract requires deterministic asymmetric observations for:

- preview;
- raw pixels;
- encoded pixels;
- canonical pixels;

and requires both front and rear camera facings before the controlled-capture
authority can advance.

Current Mesh6H provides only the existing front-camera live frame surface.

No rear-camera implementation or four-stage calibration execution has been
admitted yet.

## Authority boundary

Still false:

- controlled capture profile verification;
- captured-frame -> consumer-byte independent binding;
- subject-relative mirror provenance;
- anatomical laterality;
- validated external-ear observation;
- traditional binding;
- Production authorization.

## Next gate

```text
FR104_PHASE_D2B_FR21B_FRONT_REAR_ASYMMETRIC_CALIBRATION_EXECUTION
+
EXACT_CAPTURED_FRAME_OBJECT_TO_CONSUMER_BYTES_BINDING
```

The next implementation must extend the existing capture path only. It must not
introduce a parallel orientation/mirror stack, and ordinary file upload must
remain fail-closed.
