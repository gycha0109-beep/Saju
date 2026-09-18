# MESH6H — Browser Camera Frame-Source Adapter

MESH6H is the browser-side live-camera adapter for MESH6G.

Its purpose is narrow: turn explicit operator capture triggers into an `AsyncIterable<Mesh6GCapturedFrameV1>` without adding any hidden frame selection, pose judgement, capture-quality judgement, identity logic, persistence, threshold, calibration, or production authority.

## Runtime flow

```text
navigator.mediaDevices.getUserMedia
  -> caller-supplied video element
  -> explicit operator trigger
  -> createImageBitmap(video)
  -> one Mesh6GCapturedFrameV1
  -> MESH6G
  -> MESH6F descriptive dataset
```

MESH6H does not run MESH6G itself. It supplies the exact frame-source shape MESH6G consumes.

## Camera admission

The default browser environment requests:

```text
audio = false
video.facingMode = user
```

No resolution, frame-rate, pose, quality, or device ranking is treated as evidence authority.

A custom injectable environment may be supplied for testing or host integration, but it must expose:

```text
getUserMedia()
createImageBitmap()
```

The supplied video sink must expose:

```text
srcObject
videoWidth
videoHeight
readyState
play()
pause()
```

## Explicit trigger boundary

MESH6H never captures autonomously.

Each frame requires an explicit trigger containing:

```text
timestampMs
providerRunRef
```

Triggers are consumed in caller order.

Timestamps must be strictly increasing. MESH6H rejects non-increasing timestamps rather than sorting, repairing, deduplicating, or replacing them.

The adapter does not define:

```text
automatic best-frame selection
automatic capture cadence
pose-based frame filtering
capture-quality filtering
minimum production frame count
minimum production sweep count
acceptable pose range
confidence score
```

## In-memory image lifecycle

One image bitmap is created per accepted trigger.

The bitmap stays alive only while the consumer is processing the yielded frame.

```text
capture bitmap
  -> yield to MESH6G
  -> consumer advances or terminates
  -> bitmap.close()
```

Early iterator termination also closes the currently yielded bitmap.

No bitmap is created for a rejected trigger.

## MediaStream lifecycle

`getUserMedia` is invoked once when a camera handle opens.

The acquired stream is attached to the caller-supplied video element and `play()` is invoked.

Closing the MESH6H handle:

```text
stops every acquired track
pauses the video
detaches srcObject
```

Close is idempotent.

If video setup fails after stream acquisition, the same cleanup runs before the failure propagates.

## Readiness

An explicit trigger is accepted only when the live video source has:

```text
videoWidth > 0
videoHeight > 0
readyState >= 2
```

This is a mechanical availability check only.

It is not a capture-quality threshold and does not establish frontal pose, expression neutrality, occlusion validity, morphology repeatability, or production readiness.

## Privacy boundary

MESH6H does not persist:

```text
raw image
raw video
raw provider response
raw landmark set
derived metric geometry
face embedding
identity template
```

The caller-supplied video element remains an external live object. MESH6H does not include that object as returned metadata.

## Authority boundary

Opening a camera does not prove that a frame is a valid fresh prospective capture.

An explicit operator trigger also does not independently prove physical freshness or participant identity.

MESH6H issues no:

```text
same-participant identity proof
pose acceptance
capture-quality acceptance
classification
calibration
numeric threshold
confidence score
production morphology admission
anatomical measurement
beauty interpretation
traditional physiognomy interpretation
```

Freshness and same-participant eligibility remain the explicit MESH6E attestation boundary.

## Verification

The dedicated verifier uses an injected synthetic browser environment.

It verifies:

- `getUserMedia` once per opened handle;
- one bitmap per explicit accepted trigger;
- trigger order and values remain unchanged;
- yielded bitmap remains live until consumer advance;
- bitmap closes exactly once after advance or early termination;
- non-increasing timestamps fail closed before a new bitmap is created;
- unready video dimensions/state fail closed;
- all stream tracks stop exactly once on normal close;
- all stream tracks stop exactly once when video setup fails;
- close is idempotent;
- copied/forged handles are rejected by the active issuance boundary;
- no automatic selection/filtering or calibration authority is introduced.

The synthetic browser fixture proves mechanics only. It is not empirical fresh participant capture evidence.

## Next frontier

Bind MESH6H and MESH6G to a manual operator capture page or application surface and run actual post-preregistration repeated capture sessions.

No numeric calibration proposal is justified until actual inspectable prospective capture datasets exist.
