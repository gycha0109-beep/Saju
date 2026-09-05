# FR147 — Square Broad Fang Multi-Session Condition Governance

## Purpose

FR147 advances the FR146 next frontier:

`square_broad_fang_capture_quality_and_multi_session_condition_governance_before_repeatability_interpretation`

The artifact governs **capture-condition documentation across at least two sessions** while keeping objective capture-quality validation and repeatability interpretation closed.

The boundary is:

`issued FR146 repeated-capture dataset -> exact capture/session partition -> opaque procedure/condition references -> bounded FR147 governance record`

FR147 does not consume image bytes and does not rerun the face provider. It operates only on an issued FR146 dataset and bounded acquisition-condition references.

## Session governance

Every FR146 `captureRef` must be assigned to exactly one FR147 `sessionRef`. At least two distinct sessions are required.

Each session documents opaque references for:

- capture protocol;
- neutral-expression instruction;
- head-pose instruction;
- camera configuration;
- illumination condition;
- background condition;
- capture-distance condition;
- operator procedure.

The capture protocol, neutral-expression instruction, and head-pose instruction must remain the same references across all governed sessions. Session setup references may differ and are preserved so later empirical work can stratify or diagnose condition sensitivity.

Reference equality is only documentation linkage. It is not a physical measurement.

`condition reference equality != physical condition equality`

Likewise:

`condition documentation != neutral-expression validity != capture quality != empirical repeatability`

## Predecessor authority

Production execution requires an object issued by `runSquareBroadFangRepeatedGovernedRealCaptureFR146` and validates it with `assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146`.

FR147 preserves the predecessor facts that:

- capture quality was not validated by FR146;
- repeated capture did not establish empirical repeatability;
- no numeric repeatability acceptance threshold exists;
- construct validity remains unresolved;
- traditional binding remains unresolved.

## Quality boundary

FR147 is **condition-governance**, not an objective image-quality engine.

It issues:

- `objectiveCaptureQualityMetricsIssued: 0`
- `objectiveCaptureQualityValidated: false`
- `empiricalRepeatabilityEstablished: false`
- `repeatabilityClassificationIssued: false`
- `repeatabilityInterpretationAuthorized: false`
- `numericRepeatabilityAcceptanceThreshold: null`

A documented camera/lighting/background condition does not prove blur, occlusion, exposure, pose, or neutral-expression quality.

## Privacy boundary

FR147 requires no raw image, provider response, source digest, embedding, or identity template. It also deliberately does not require:

- device serial number;
- operator identity;
- exact capture timestamp.

The session/capture/procedure/condition identifiers are bounded opaque references. The artifact must not widen them into real-world identity claims.

## Semantic authority

The semantic state remains exactly:

- `construct validity: unresolved`
- `traditional binding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

The governing separation remains:

`image geometry != construct validity != traditional meaning`

No FR147 condition record may classify a mouth as traditional `方` or issue a traditional interpretation.

## Verification

The test/verifier boundary proves:

1. at least two sessions are required;
2. every predecessor capture is covered exactly once;
3. duplicate/unknown capture assignments fail closed;
4. shared capture protocol and shared neutral/head-pose instruction references cannot drift across sessions;
5. production dependencies reject a structurally plausible but non-issued FR146 dataset;
6. no objective quality metric, quality PASS, repeatability classification, or threshold is emitted;
7. privacy and semantic authority remain closed;
8. no real user image fixture is committed or uploaded to CI.

## Current empirical status

FR147 can be implemented and verified with synthetic bounded fixtures, but the real empirical series is still blocked by the same external-data fact as FR146: only one independently captured real image is currently available.

The previously measured real image must not be duplicated, transcoded, resized, or otherwise transformed and then presented as a second independent capture. A true real multi-session run requires at least one additional independently captured source image, with its own governed session documentation.

## Next frontier

`square_broad_fang_objective_capture_quality_metric_admission_and_real_multi_session_acquisition_without_semantic_binding`

The next engineering/research step is to admit objective, neutral image-quality measurements separately from the session documentation layer, then acquire a real multi-session series. Those measurements still must not be promoted into construct validity or traditional meaning.
