# FR245 — Real Dry-Run Provider Readiness Gate

Status: dependency gate implemented; real FR243 execution remains blocked  
Contract: `FR245-REAL-DRY-RUN-PROVIDER-READINESS-GATE-v1`  
Tracking: #1296  
Watchtower-Track: `face-research`

## Purpose

FR244 closed the browser camera-to-ephemeral-JPEG transport gap.

That does not mean the first real FR243 dry run is ready. FR242 still accepts two callbacks: one for six capture-quality booleans and one for the frozen primary metric. Synthetic tests can supply those callbacks, but doing the same thing during a real participant run would falsely convert test fixtures into execution evidence.

FR245 freezes the remaining blockers before any real participant action is requested.

## What is ready

The browser transport is now mechanically ready:

`MESH6H issued camera -> explicit trigger -> in-memory frame -> FR244 JPEG -> FR243/FR242`.

FR244 preserves:

- one explicit trigger per capture;
- caller camera ownership;
- JPEG envelope and 32 MiB validation;
- source JPEG zeroization;
- no raw-image persistence;
- no empirical or product authority promotion.

## Six FR237 quality checks

FR237 requires all six checks before the primary metric is inspected.

### Mechanically observable, but not quality-validated

Two checks have lower-level mechanics that can be observed without inventing a threshold:

1. `single_face`
   - the existing MediaPipe geometry path already fails closed unless exactly one face is returned;
   - this does not by itself validate the overall capture-quality construct.

2. `bilateral_eye_landmark_coverage`
   - the repository has the pinned two-eye topology witness and governed geometry surfaces;
   - mechanical landmark presence does not by itself validate eye-region capture quality.

FR245 therefore marks both as `mechanically_observable_not_quality_validated`, not as passed quality rules.

### Operationalization still unresolved

The following four checks do not currently have a governed acceptance rule that FR245 can truthfully reuse:

- frontal pose;
- sharpness;
- bilateral eye-region visibility;
- major eye-region occlusion absent.

FR162 provides capture guidance such as requesting a frontal neutral pose, but explicitly states that the guidance is not a numeric acceptance threshold and may not automatically reject a capture.

FR148 provides threshold-free candidate image-quality features, but explicitly states that candidate feature values do not establish sharpness or occlusion validity and that capture-quality thresholds are not defined.

Therefore FR245 does not invent cutoffs.

## Primary metric

FR237 freezes exactly:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

The formula surface exists through FR208/FR209.

However, the current provider geometry path is not directly compatible with the FR242 dry-run privacy contract:

- FR77 requires a `canonicalAssetDigest` and carries it in the governed geometry candidate;
- FR242 currently records `rawImageDigestComputed=false`.

Reusing FR77 directly on the FR244 JPEG would therefore require silently changing one of those contracts or computing an image digest while claiming none was computed.

FR245 rejects that shortcut.

The next provider binding must either:

- issue an explicitly reviewed privacy-compatible same-frame provider path that does not require a raw-image digest; or
- deliberately revise the FR242/FR239 privacy contract to permit an ephemeral digest, with the change reviewed as an authority/privacy decision.

No such decision is made in FR245.

## Execution gate

A real FR243 execution remains blocked while:

- any required quality operationalization is unresolved;
- the capture-quality construct remains unvalidated;
- the FR77/FR242 raw-image-digest contract mismatch remains unresolved;
- no privacy-compatible same-frame provider metric binding is issued.

Actual participant action and live-camera input are still required after those software/governance blockers are closed.

## CI meaning

Shared CI verifies only that the readiness gate tracks the current predecessor boundaries and fails closed.

CI does not establish:

- real participant presence;
- capture freshness;
- same-participant identity;
- capture quality;
- empirical repeatability;
- interpretation validity;
- traditional face-reading validity.

## Next frontier

`issue_governed_quality_operationalizations_and_privacy_compatible_same_frame_provider_binding_before_real_fr243_execution`
