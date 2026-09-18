# MESH6G — Prospective Operator Capture Session Coordinator

MESH6G is the first orchestration layer that can consume operator- or application-supplied prospective image frames after MESH6E/MESH6F.

It connects capture execution to the already-reviewed evidence path without adding any capture-quality threshold, pose acceptance rule, calibration decision, or production morphology authority.

## Runtime flow

```text
MESH6E prospective manifest input
  -> operator/application AsyncIterable image frames
  -> shared MediaPipe FaceLandmarker runtime
  -> FR77 governed metric geometry per frame
  -> issued MESH6A observation frames
  -> MESH6F prospective acquisition record
  -> MESH6F descriptive dataset
  -> MESH6G session artifact
```

MESH6G does not accept a prebuilt external MESH6D artifact. It preserves the MESH6F admission design: MESH6F constructs MESH6D internally from active-issued MESH6A frames and the explicit MESH5.1 weighted adapter.

## Frame source boundary

Each sweep supplies an `AsyncIterable<Mesh6GCapturedFrameV1>`.

A frame contains only the in-memory execution inputs required by FR77:

```text
image
timestampMs
frameWidth
frameHeight
providerRunRef
```

The coordinator consumes frames in iteration order. It never silently sorts timestamps and rejects a non-strict timestamp sequence.

MESH6G does not define:

```text
automatic best-frame selection
pose-based frame filtering
capture-quality filtering
minimum production frame count
minimum production sweep count
acceptable pose range
capture-quality threshold
confidence threshold
```

## Shared MediaPipe runtime

FR77 normally owns a runtime instance per call and closes it in `finally`.

For a real multi-frame capture session, MESH6G creates one underlying FR26-compatible MediaPipe runtime and gives FR77 a borrowed runtime factory:

```text
session creates shared runtime once
FR77 create() -> borrowed wrapper
borrowed detect() -> shared runtime detect()
borrowed close() -> no-op
session finally -> shared runtime close() once
```

This keeps FR77's existing lifecycle contract intact while avoiding model/runtime reconstruction for every frame.

## Prospective admission

For each sweep MESH6G calls the active MESH6E manifest admission boundary.

Required attestations remain:

```text
postPreregistrationFreshCaptureAttested = true
sameParticipantSeriesAttested = true
usedForCandidateSelection = false
developmentCaptureReuse = false
identityMatchingPerformed = false
```

These attestations are eligibility statements. They do not independently prove fresh physical capture, participant identity, or exact camera-event provenance.

The in-process manifest/frame linkage used when MESH6G calls MESH6F is also an execution attestation, not independent physical-capture proof.

## Persistence and output boundary

MESH6G's returned session artifact contains the descriptive MESH6F dataset plus bounded execution metadata.

It does not include:

```text
raw image
raw video
raw provider response
raw landmark set
derived full-face metric geometry
MESH6A frame arrays
face embedding
identity template
```

The caller may retain its own input source outside MESH6G. That external retention is outside this coordinator's authority and is not claimed to be prevented by the contract.

## Descriptive evidence only

MESH6G preserves MESH6F's exact thirteen-field preregistration and descriptive aggregation.

A successful session still does not establish:

```text
empirical repeatability
capture-quality validity
pose acceptance
frontal / three-quarter / profile classification
confidence
population norm
numeric morphology repeatability threshold
numeric capture-quality threshold
numeric pose threshold
calibration
production morphology admission
identity matching
anatomical measurement
beauty interpretation
traditional physiognomy interpretation
```

Observed ranges remain descriptive values only.

## Verification

The dedicated MESH6G verifier uses release-exact MediaPipe repository fixtures plus a regenerated MESH5.1 weighted adapter.

It verifies:

- one underlying runtime creation for the whole session;
- one underlying runtime close on success;
- one underlying runtime close on failure;
- per-frame borrowed FR77 closes do not close the shared runtime;
- one detection per consumed frame;
- strict iteration/timestamp order with no silent sorting;
- empty sweeps fail closed;
- invalid MESH6E admission fails before frame detection;
- two identical verifier sweeps produce zero descriptive range;
- no raw capture or full geometry fields appear in the returned artifact;
- all MESH6E/MESH6F/MESH6G authority boundaries remain fail-closed.

Repository fixtures verify software mechanics only. They do not count as empirical post-preregistration participant captures.

## Next frontier

Use MESH6G from an actual operator/browser capture surface and collect inspectable post-preregistration repeated sweep datasets.

Only after real captured evidence exists may a separate later review consider whether any numerical calibration proposal is justified. MESH6G pre-authorizes no threshold or production admission.
