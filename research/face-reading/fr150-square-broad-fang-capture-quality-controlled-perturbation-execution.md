# FR150 — Square Broad Fang Capture-Quality Controlled Perturbation Execution

## Purpose

FR149 froze the perturbation families and required pre-registration before any source-backed observation. FR150 freezes the exact execution implementations and strength schedules, executes only ephemeral decoded rasters, routes every variant through the frozen FR148 aggregate formulas, and returns bounded candidate-feature observations only.

The bounded lineage is:

`authorized ephemeral decoded raster -> FR150 pinned single-factor transform -> integer raster aggregates -> frozen FR148 candidate formulas -> bounded feature-response observations`

FR150 does not validate a capture-quality construct, define a quality threshold, classify a capture, prove independent sessions, establish repeatability, or issue traditional-semantic authority.

## Exact schedules pinned before observation

Each FR149 family has exactly three ordered variants: baseline plus two non-baseline strengths.

1. Global-intensity darkening
   - implementation: `fr150.linear_channel_scale_toward_black_round_half_up.v1`
   - strengths: `0`, `0.25`, `0.5` fraction toward black
   - per channel: `round(channel * (1 - strength))`

2. Global-intensity brightening
   - implementation: `fr150.linear_channel_scale_toward_white_round_half_up.v1`
   - strengths: `0`, `0.25`, `0.5` fraction toward white
   - per channel: `round(channel + (255 - channel) * strength)`

3. Gaussian-blur probe
   - implementation: `fr150.separable_equivalent_binomial_2d_clamp_edge_round_half_up.v1`
   - strengths: baseline `0`, binomial order `1`, binomial order `2`
   - order 1 kernel: `[1,2,1] x [1,2,1]`, divisor `16`
   - order 2 kernel: `[1,4,6,4,1] x [1,4,6,4,1]`, divisor `256`
   - raster edges use coordinate clamping; RGB output rounds once after the full 2D weighted sum.

4. Spatial-illumination-gradient probe
   - implementation: `fr150.horizontal_linear_gain_gradient_round_half_up.v1`
   - strengths: `0`, `0.25`, `0.5` horizontal gain half-range
   - horizontal gain varies linearly from `1-strength` at the left edge to `1+strength` at the right edge.

5. Opaque-region-mask negative control
   - implementation: `fr150.centered_black_rectangle_side_fraction.v1`
   - strengths: baseline `0`, centered black rectangle side fractions `0.25` and `0.5`
   - mask width/height are rounded from raster width/height and centered deterministically.

These schedules are repository-owned and fixed before any real/source-backed result is inspected. They are not selected after seeing feature responses.

## Input and privacy boundary

FR150 accepts only an in-memory fully opaque RGBA raster with a bounded opaque source reference and the explicit assertion `authorized_source_backed_ephemeral_raster`.

The assertion records operator/runtime provenance but is not independently verified by FR150. The artifact computes no source digest.

Raw image bytes, RGBA arrays, transformed rasters, integer aggregate arrays, source digests, provider payloads, embeddings, and identity templates are not returned or persisted by the issued artifact. The public repository test uses synthetic pixels only.

## Frozen FR148 formula reuse

For every source, family, and strength, FR150 computes only the integer aggregates required by FR148 and then invokes the active FR148 materializer. This prevents a second copy of the candidate-feature formulas from drifting during empirical execution.

Each emitted variant therefore contains the six FR148 candidate values with:

- `classificationApplied: false`
- `calibrationApplied: false`
- `thresholdApplied: false`
- `qualityConstructValidated: false`

## Trend observation is not construct validation

FR150 may state whether an exact pre-registered primary feature sequence followed the FR149 directional ordering. For the spatial-gradient family it may state only whether the primary magnitude changed. The opaque-mask family has no directional acceptance rule.

These are bounded feature-response observations only:

`observed transform sensitivity != capture-quality construct validity != threshold validity`

No numeric acceptance threshold is introduced after observation.

## Independent multi-session track remains open

Perturbation variants are deterministic descendants of one source raster and never count as repeated independent captures. Historical FR146 A/B must not be relabeled as independent sessions.

FR150 therefore keeps:

- `independentMultiSessionEvidenceAdmitted: false`
- `repeatabilityInterpretationAllowed: false`
- `empiricalRepeatabilityEstablished: false`
- `numericRepeatabilityAcceptanceThreshold: null`

A later evidence track must acquire independently supportable capture-session provenance before repeatability interpretation can advance.

## Authority boundary

FR150 advances only controlled execution readiness/materialization:

- `empiricalPerturbationExecutionPerformed: true` only for a successfully issued execution object;
- `featureResponseTrendObservationMaterialized: true`;
- `empiricalPerturbationValidationPerformed: false`;
- `captureQualityMeasurementConstructValidated: false`;
- `exposureMetricValidated: false`;
- `sharpnessMetricValidated: false`;
- `lightingMetricValidated: false`;
- `occlusionValidityVerified: false`;
- `captureQualityThresholdsDefined: false`;
- `captureQualityValidated: false`;
- `numericCaptureQualityThreshold: null`;
- `repeatabilityInterpretationAllowed: false`;
- `empiricalRepeatabilityEstablished: false`;
- `numericRepeatabilityAcceptanceThreshold: null`.

Traditional-semantic authority remains unchanged:

- `constructValidity: unresolved`
- `traditionalBinding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

## Current empirical status

The repository-owned runtime and schedules are frozen first. Real/source-backed execution evidence must be generated only after that freeze and must remain outside public fixtures if it derives from private user imagery.

At this note revision, no private source-backed FR150 candidate values are committed to the repository.

## Verification requirements

Deterministic verification must prove that:

1. exactly five FR149 families are preserved in order;
2. every family has baseline plus exactly two non-baseline strengths;
3. transform implementation refs and strength schedules are repository-frozen;
4. source rasters are ephemeral, fully opaque, strictly allowlisted, and source-backed by explicit assertion;
5. every variant uses the active frozen FR148 formulas;
6. outputs contain feature values and perturbation metadata but no raw raster/aggregate/digest/provider material;
7. trend observation cannot open construct validity or thresholds;
8. independent multi-session evidence remains absent;
9. repeatability and traditional-semantic authority remain closed;
10. forged execution objects fail the process-local issued-object assertion.

## Next frontier

`square_broad_fang_capture_quality_perturbation_evidence_review_and_independent_multi_session_evidence_acquisition_before_construct_validation_or_thresholds`

After source-backed execution, review the pre-registered feature-response evidence without inventing post-hoc cutoffs, and separately acquire independently supportable multi-session provenance. Only then can a later stage decide whether any candidate construct should advance.