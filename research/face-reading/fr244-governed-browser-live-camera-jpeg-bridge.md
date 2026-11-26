# FR244 — Governed Browser Live-Camera JPEG Bridge

Status: browser camera-to-JPEG transport bridge implemented; real participant dry run not yet executed  
Contract: `FR244-GOVERNED-BROWSER-LIVE-CAMERA-JPEG-BRIDGE-v1`  
Tracking: #1289  
Watchtower-Track: `face-research`

## Purpose

FR243 can record a governed one-person dry-run capture after operator attestation, but it receives JPEG bytes rather than owning a browser camera.

The repository already has MESH6H as the governed browser camera frame source. FR244 closes only the transport gap between that issued browser camera handle and FR243.

It does not create another `getUserMedia` authority.

## Exact predecessor boundary

FR244 requires an active MESH6H browser camera handle issued by the existing MESH6H runtime.

Copied or reconstructed camera-handle objects are rejected.

For each invocation FR244 also consumes the active FR243/FR242/FR241 execution objects supplied to FR243. Their exact provenance remains enforced by FR243 and its predecessors.

## One explicit trigger, one frame

Each FR244 invocation consumes exactly one explicit MESH6H operator trigger.

FR244 does not:

- synthesize capture triggers;
- reorder trigger timestamps;
- select a preferred frame;
- apply automatic pose filtering;
- fall back to gallery upload.

The frame metadata returned by MESH6H must preserve the supplied trigger timestamp and provider-run reference and expose positive live dimensions.

## Browser JPEG encoding

The yielded in-memory frame is encoded as `image/jpeg`.

The default browser encoder uses an in-memory `OffscreenCanvas`. A bounded explicit encoder may be injected for host integration and synthetic mechanics tests.

Before FR243 receives the payload, FR244 rejects:

- empty output;
- output larger than 32 MiB;
- payloads without JPEG SOI/EOI markers.

The encoded JPEG byte array exists only for the immediate FR243 call and is zeroized in `finally`.

The MESH6H frame iterator is also terminated in `finally`, which releases the yielded bitmap through MESH6H's existing lifecycle.

FR244 does not close the camera itself. Camera ownership remains with the caller so the same governed camera session can perform later explicit captures.

## Returned artifact

FR244 returns only:

- sanitized frame mechanics metadata;
- sanitized transport metadata;
- the FR243 execution record;
- explicit verification and authority boundaries.

It does not return or persist:

- JPEG bytes;
- raw video;
- raw provider response;
- raw landmark sets;
- image digests;
- review images;
- face embeddings;
- identity templates.

This preserves the architecture-level raw-image ephemeral-delete invariant.

## Evidence boundary

An issued MESH6H handle shows that the governed browser camera adapter was used mechanically. It does not independently prove capture freshness or participant identity.

Synthetic browser fixtures remain permitted for CI mechanics only.

They do not establish:

- a real participant;
- independently verified freshness;
- same-participant identity;
- validated capture quality;
- validated primary-metric extraction;
- empirical repeatability;
- interpretation validity;
- traditional face-reading validity;
- Production authority;
- Commerce authority.

## Remaining real-execution blocker

FR244 closes the camera-frame-to-ephemeral-JPEG transport gap only.

The first real FR243 dry run still requires actual participant action and live-camera capture. In addition, the six preregistered quality checks and the frozen primary metric must be executed through real governed evaluators rather than synthetic test callbacks before the run can be treated as a genuine provider-backed dry-run execution.

FR244 does not silently promote synthetic quality or metric callbacks into real evidence.

## CI meaning

Shared repository CI only. No FR244-specific workflow is added.

Synthetic tests prove:

- active issued MESH6H provenance is required;
- one explicit trigger produces one bridge capture;
- JPEG envelope validation occurs before FR243;
- source JPEG bytes are zeroized after processing;
- yielded bitmap lifecycle is released;
- FR244 does not take camera ownership;
- no empirical or Production authority is promoted.

## Next frontier

`bind_fr244_live_jpeg_to_real_quality_and_primary_metric_execution_without_synthetic_evaluator_promotion`
