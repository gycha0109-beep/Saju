# FR104 Phase D2B-B-A — Controlled Capture Calibration Candidate Session

Watchtower-Track: face-observation-engine

## Scope

This phase adds an executable **candidate-evidence session** for FR21b deterministic asymmetric controlled-capture calibration.

It does not execute a real camera calibration by itself, does not classify the asymmetric marker automatically, does not create encoded/canonical image artifacts, and does not review or admit a controlled-capture profile.

Baseline:

```text
main@ce2b2cf3229247e8c9b6c4b37fb5ad1576fde583
```

## Why this is separate from MESH6J normal capture

The existing MESH6J surface intentionally has no raw-image upload endpoint, canvas export, MediaRecorder, persistent browser storage, or calibration authority.

The Saju repository also does not carry the Sharp 0.35.3 canonicalization implementation pinned by FR19. FR19's inspected canonicalization source remains the external K_beauty implementation:

```text
gycha0109-beep/K_beauty
commit 81c3b4139efdffc785439da005557dc38a6b4873
lib/image-upload-boundary-core.js
blob 2215b9c08f61971521ae9ff9eab9cb7c5f392f98
sharp 0.35.3
```

D2B-B-A therefore does not introduce a second orientation/canonicalization stack and does not pretend that a newly added Saju image transform is FR19.

## Runtime

New module:

```text
packages/face-reading/src/neutral-ear-controlled-capture-calibration-candidate-fr104.ts
```

The session starts only from:

```text
exact issued Mesh6H handle
+ exact Mesh6GCapturedFrameV1 object issued by that handle
+ deterministic asymmetric marker anatomical side
+ stable FR21b candidate refs
```

Copied or forged frame objects are rejected through the existing Mesh6H issuance boundary.

## Required stage observations

The candidate cannot finalize until all four FR21b stages are supplied exactly once:

```text
preview
raw_pixels
encoded_pixels
canonical_pixels
```

Each stage requires:

```text
markerImageSide
artifactEvidenceRef
stage-specific origin attestation
```

The permitted origin declarations are intentionally different by stage:

```text
preview
  -> same_live_camera_session_operator_observation

raw_pixels
  -> exact_issued_mesh6h_frame_operator_observation

encoded_pixels
  -> encoded_artifact_claimed_from_exact_mesh6h_frame

canonical_pixels
  -> fr19_canonical_artifact_claimed_from_encoded_stage
```

The wording is deliberate.

The runtime can prove exact **frame-object issuance** for the raw stage. It does not independently inspect or hash the stage artifact bytes in this candidate session.

For encoded and canonical stages, lineage is still an operator/reviewer claim until separate artifact-provenance verification exists.

## Candidate output

Finalization produces a valid:

```text
ControlledCaptureCalibrationEvidenceFR21BV1
reviewState = research_candidate
```

plus FR104-only provenance and review hints.

The candidate includes derived hints for:

```text
preview mirror policy candidate
saved-pixel mirror policy candidate
final anatomical laterality assertion candidate
```

but:

```text
hintsAreAuthority = false
```

These values are review aids only. They cannot authorize mirror provenance, anatomical laterality, traditional interpretation, or production.

## Explicit blockers

Every candidate keeps:

```text
encoded_stage_origin_not_independently_verified
canonical_stage_origin_not_independently_verified
calibration_candidate_not_human_reviewed
verified_controlled_capture_profile_not_admitted
```

until a later phase supplies real device/browser evidence, independently inspects the encoded/canonical lineage, and performs human review.

## Privacy

The candidate session:

```text
does not persist the raw frame
does not persist raw frame bytes
does not persist artifact bytes
does not compute an image digest
does not create an embedding
does not create an identity template
```

Artifact references are metadata references only.

## Readiness change

The FR104 readiness surface may now report the mechanical candidate session as implemented:

```text
controlledCaptureCalibrationCandidateSession = true
calibrationCandidateSessionState =
  implemented_unreviewed_external_artifact_lineage_required
```

This does not clear:

```text
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
verified_controlled_capture_profile_not_available
subject_relative_source_pixel_mirror_provenance_not_verified
```

and adds the explicit artifact-lineage blocker:

```text
fr21b_encoded_and_canonical_stage_artifact_lineage_not_independently_verified
```

## Authority after D2B-B-A

Required state remains:

```text
reviewedCalibrationEvidence = false
verifiedControlledCaptureProfile = false
subjectRelativeMirrorProvenanceAuthorized = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Next gate

A real operator/device run must execute the candidate session for both front and rear cameras using a deterministic asymmetric marker.

The resulting four-stage evidence must then be inspected against actual encoded artifact provenance and the exact FR19 canonicalization output lineage.

Only after that review may a separate change add reviewed calibration evidence and verified controlled-capture profiles.

Ordinary file upload remains fail-closed and may not substitute for controlled capture.
