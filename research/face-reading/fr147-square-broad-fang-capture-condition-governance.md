# FR147 — Square Broad Fang Capture-Condition Governance

## Purpose

FR147 advances the FR146 next frontier:

`square_broad_fang_capture_quality_and_multi_session_condition_governance_before_repeatability_interpretation`

FR147 does **not** interpret the FR146 descriptive series statistics. It establishes a fail-closed governance layer for study-local capture-event/session bookkeeping and for explicit capture-quality non-authority before any repeatability interpretation is considered.

The bounded lineage is:

`issued FR146 repeated real-capture dataset -> exact capture-condition sidecars -> FR147 governance artifact`

FR147 does not re-run MediaPipe, does not consume image bytes, and does not issue any new neutral geometry values.

## Why this boundary exists

FR146 proved only that at least two byte-distinct source images traversed the governed FR145 -> FR144 -> FR146 path. FR146 explicitly preserved:

- `byteDistinctnessMeansIndependentCaptureEvent: false`
- `byteDistinctnessMeansNeutralExpressionValidity: false`
- `captureQualityValidated: false`
- `empiricalRepeatabilityEstablished: false`
- `numericRepeatabilityAcceptanceThreshold: null`

Therefore a small numerical range across two captures cannot be interpreted as empirical repeatability without additional capture-condition authority.

The governing separation remains:

`distinct bytes != distinct capture event != independent session != validated capture quality != empirical repeatability`

## Issued-lineage requirement

Production FR147 materialization requires an FR146 dataset that was actually issued by the active FR146 process-local boundary. A structurally plausible forged FR146 object is not sufficient.

The predecessor must still preserve zero persistence, unresolved construct/traditional authority, and no repeatability classification or threshold.

## Capture-condition sidecar

FR147 requires exactly one condition sidecar for every FR146 `captureRef`. Each sidecar contains only bounded study-local references and explicit non-authority states:

- `captureRef`
- `captureSessionRef`
- `captureEventRef`
- `sessionEvidence = study_operator_declared_session_ref_not_independently_verified`
- protocol intent that neutral expression, natural head position, and full-face framing were requested but **not verified**
- capture-quality evidence state `not_validated_no_threshold_authority`

Capture-event refs must be unique. At least two distinct session refs are required before FR147 can materialize a multi-session-reference governance artifact.

This requirement is structural bookkeeping only:

- distinct `captureSessionRef` values do **not** prove independent capture sessions;
- distinct `captureEventRef` values do **not** prove independent camera events;
- operator-declared session assignment does **not** validate neutral expression or capture quality.

FR147 intentionally does not require or store timestamps, device identifiers, or geolocation.

## Capture-quality boundary

FR147 does not invent blur, exposure, illumination, or occlusion thresholds.

Every admitted sidecar must preserve:

- `sharpnessMetricValidated: false`
- `exposureMetricValidated: false`
- `lightingMetricValidated: false`
- `occlusionValidityVerified: false`
- `captureQualityThresholdsDefined: false`

Accordingly the issued governance artifact preserves:

- `captureQualityMeasurementConstructValidated: false`
- `captureQualityThresholdsDefined: false`
- `captureQualityValidated: false`
- `multiSessionIndependenceVerified: false`
- `repeatabilityInterpretationAllowed: false`
- `empiricalRepeatabilityEstablished: false`
- `repeatabilityClassificationIssued: false`
- `numericRepeatabilityAcceptanceThreshold: null`

FR-DATA-05 contains threshold-free browser pixel observations for a different governed Menton dataset path. FR147 does not silently import those dataset-specific measurements, digests, or authority into the private ephemeral FR146 Fang path.

## Privacy boundary

FR147 returns no image bytes, provider responses, source digests, full-face geometry, contour coordinates, embeddings, identity templates, capture timestamps, geolocation, or device identifiers.

The following remain false:

- `rawImagePersisted`
- `rawProviderResponsePersisted`
- `sourceDigestPersisted`
- `sourceDigestReturned`
- `embeddingPersisted`
- `identityTemplatePersisted`
- `captureTimestampPersisted`
- `geolocationPersisted`
- `deviceIdentifierPersisted`

## Semantic authority

FR147 does not change the semantic state:

- `construct validity: unresolved`
- `traditional binding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

`capture-condition governance != construct validity != traditional 方 meaning`

## Current empirical status

A real two-capture FR146 execution has now completed ephemerally, with both captures traversing the governed path and producing issued FR144 PASS lineage before FR146 materialization. No real image bytes, source digests, provider payloads, full landmark geometry, embeddings, or identity templates are committed to the repository.

That real FR146 execution did **not** establish independently verified capture-session assignments or validated capture quality. The two historical captures must not be retroactively relabeled as separate sessions merely to satisfy FR147.

Therefore:

- FR146 real repeated-capture dataset materialization: completed;
- FR147 governance implementation: repository-owned contract can be materialized only when exact sidecar coverage and at least two study-local session refs are supplied;
- independent multi-session evidence: not yet established;
- validated capture quality: not yet established;
- empirical repeatability interpretation: not allowed.

## Verification

Tests and the deterministic verifier must prove:

1. active issued FR146 lineage is required by the production dependency;
2. exactly one sidecar is required for each FR146 capture;
3. unknown or duplicate capture refs fail closed;
4. duplicate capture-event refs fail closed;
5. fewer than two distinct session refs fail closed;
6. session refs and event refs are never promoted into independent-session/event proof;
7. capture-quality validation/threshold promotion is rejected;
8. request, sidecar, protocol-intent, and quality-evidence objects use strict allowlists;
9. no raw biometric/media payload or source digest can appear in the FR147 output;
10. repeatability interpretation and traditional semantic authority remain closed.

Repository tests use synthetic metadata and a synthetic structurally bounded FR146 fixture only. No real user image or real face-derived measurement value is committed to CI.

## Next frontier

`square_broad_fang_capture_quality_measurement_construct_validation_and_independent_multi_session_evidence_acquisition_before_repeatability_interpretation`

The next work must acquire independently supportable multi-session capture-event evidence and validate the capture-quality measurement constructs before any empirical repeatability threshold or classification can be proposed.
