# FR149 — Square Broad Fang Capture-Quality Controlled Perturbation Protocol

## Purpose

FR148 froze six threshold-free candidate features but intentionally left their intended capture-quality constructs unvalidated. FR149 freezes the **pre-empirical protocol** that must be used before any candidate can be reviewed for capture-quality construct validity.

The bounded sequence is now:

`ephemeral/source-backed raster -> FR148 frozen candidate formulas -> FR149 pre-registered controlled perturbation protocol -> future perturbation execution evidence -> later construct-validity review`

A separate evidence track remains required for independently supportable multi-session provenance before repeatability interpretation can advance.

FR149 does **not** execute perturbations, validate a feature, define a quality threshold, classify a capture, establish repeatability, or issue traditional-semantic authority.

## Why the protocol must be frozen before execution

The repository already distinguishes deterministic arithmetic from empirical evidence:

`formula correctness != construct validity != threshold validity != empirical repeatability`

Once empirical observations are visible, changing perturbation families, selecting only favorable feature responses, or inventing a numerical cutoff would create post-hoc evidence leakage. FR149 therefore pre-registers the manipulations and feature hypotheses before the empirical run.

The protocol itself is not empirical evidence. It only fixes what later evidence must contain.

## Required perturbation families

Every admitted future execution must include all five families against each admitted baseline source raster. Each family requires a baseline plus at least two distinct non-baseline strengths. The strength schedule and transformation implementation must be pinned before execution.

### 1. Global-intensity darkening

Ref: `perturbation.capture_quality.global_intensity_darkening`

Purpose: probe the low-side response of global intensity candidates under a controlled single-factor darkening manipulation.

Pre-registered hypotheses:

- `candidate.capture_quality.rgb_sum_mean_normalized`: primary, non-increasing with perturbation strength;
- `candidate.capture_quality.any_channel_zero_fraction`: diagnostic, non-decreasing with strength;
- `candidate.capture_quality.any_channel_full_scale_fraction`: diagnostic, non-increasing with strength.

These are feature-response hypotheses, not evidence that the features measure exposure adequacy.

### 2. Global-intensity brightening

Ref: `perturbation.capture_quality.global_intensity_brightening`

Purpose: probe the high-side response of global intensity candidates under a controlled single-factor brightening manipulation.

Pre-registered hypotheses:

- `candidate.capture_quality.rgb_sum_mean_normalized`: primary, non-decreasing with perturbation strength;
- `candidate.capture_quality.any_channel_full_scale_fraction`: diagnostic, non-decreasing with strength;
- `candidate.capture_quality.any_channel_zero_fraction`: diagnostic, non-increasing with strength.

Again, response to a brightness transform is not by itself validation of an exposure-quality construct.

### 3. Gaussian blur

Ref: `perturbation.capture_quality.gaussian_blur`

Purpose: probe local high-frequency attenuation.

Pre-registered hypotheses:

- `candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized`: primary, non-increasing with blur strength;
- `candidate.capture_quality.rgb_sum_standard_deviation_normalized`: diagnostic only, no directional acceptance rule.

A decreasing adjacent-difference statistic under blur would support only the intended sensitivity hypothesis. It would not automatically establish a sharpness metric or an anti-blur threshold.

### 4. Spatial illumination gradient

Ref: `perturbation.capture_quality.spatial_illumination_gradient`

Purpose: probe sensitivity to controlled spatial imbalance in intensity.

Pre-registered hypotheses:

- `candidate.capture_quality.intensity_centroid_offset_magnitude_normalized`: primary, magnitude change expected but direction not fixed;
- global mean and dispersion candidates: diagnostic only, no directional acceptance rule.

The intensity-centroid feature remains only a candidate for spatial intensity balance. It is not facial-lighting adequacy or illumination-symmetry authority.

### 5. Opaque-region mask negative control

Ref: `perturbation.capture_quality.opaque_region_mask_negative_control`

Purpose: test whether the six existing candidates are easily confounded by synthetic occlusion-like masking.

All six candidate features are diagnostic only for this family and have no directional acceptance rule.

This family is explicitly a **negative-control/conflation probe**. FR149 does not claim that any FR148 feature is an occlusion detector and keeps `occlusionValidityVerified: false`.

## Execution invariants

Future execution evidence must preserve all of the following:

1. baseline and perturbed variants originate from the same decoded source-raster lineage;
2. only one perturbation family is manipulated at a time;
3. transformation implementation is pinned before observation;
4. the strength schedule is pre-registered before observation;
5. each family has a baseline plus at least two distinct non-baseline strengths;
6. all candidate values are computed with the frozen FR148 formulas;
7. the evidence preserves perturbation-strength order;
8. observed trends are reviewed without inventing a post-hoc pass/fail threshold;
9. raw image bytes, raw pixel rasters, source digests, provider payloads, embeddings, and identity templates are not committed as evidence artifacts;
10. traditional interpretations are not attached to the perturbation dataset.

Synthetic arithmetic fixtures alone are insufficient. The later run must use real or otherwise source-backed raster execution where the applied manipulation is independently known from the execution protocol.

## What may be recorded

The future empirical evidence may record bounded opaque references, perturbation-family refs, pre-registered perturbation strength/order metadata, frozen FR148 candidate values, and aggregate descriptive results required for construct review.

It must not record raw image bytes, raw raster arrays, provider responses, source digests, embeddings, identity templates, or private capture material in public fixtures.

## Multi-session evidence remains a separate track

Perturbing one raster produces multiple manipulated variants of the **same source lineage**. Those variants are not repeated independent captures and must never be counted as multi-session evidence.

Repeatability interpretation requires an independent provenance track with at least two distinct session references plus separately supportable evidence that those session references represent genuinely independent capture sessions.

Important boundaries:

- distinct `sessionRef` strings alone do not prove independence;
- an independence claim requires an independently supportable evidence reference;
- historical FR146 A/B captures must not be retroactively assigned different sessions merely to satisfy the requirement;
- capture timestamps, device identifiers, and geolocation are not required by this protocol and should not be introduced simply to create authority;
- the currently known historical FR146 pair does not prove independent sessions.

Therefore, even a successful future perturbation run cannot by itself unlock repeatability interpretation.

## Authority boundary

FR149 advances only protocol readiness:

- `controlledPerturbationProtocolFrozen: true`
- `empiricalPerturbationExecutionPerformed: false`
- `empiricalPerturbationValidationPerformed: false`
- `captureQualityMeasurementConstructValidated: false`
- `exposureMetricValidated: false`
- `sharpnessMetricValidated: false`
- `lightingMetricValidated: false`
- `occlusionValidityVerified: false`
- `captureQualityThresholdsDefined: false`
- `captureQualityValidated: false`
- `repeatabilityInterpretationAllowed: false`
- `empiricalRepeatabilityEstablished: false`
- `numericCaptureQualityThreshold: null`
- `numericRepeatabilityAcceptanceThreshold: null`

Traditional-semantic authority remains unchanged:

- `constructValidity: unresolved`
- `traditionalBinding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

## Verification requirements

Deterministic verification must prove that:

1. exactly five perturbation families are frozen;
2. every family requires a baseline plus at least two non-baseline strengths;
3. strength schedules and transformation implementations are pre-registered;
4. all feature hypotheses remain `hypothesis_only_unvalidated` with `numericAcceptanceThreshold: null`;
5. the occlusion family is diagnostic negative control only;
6. synthetic fixtures cannot be promoted into empirical validation;
7. independent multi-session evidence remains separately required;
8. distinct session refs alone do not prove independence;
9. historical capture relabeling remains forbidden;
10. privacy, threshold, repeatability, and traditional-semantic boundaries remain closed;
11. forged protocol objects fail the process-local issued-object assertion.

## Next frontier

`square_broad_fang_capture_quality_controlled_perturbation_execution_and_independent_multi_session_evidence_collection_before_construct_validation_or_thresholds`

The next stage is execution, not another conceptual promotion: run the frozen perturbation design against authorized source-backed rasters, capture only bounded aggregate evidence, and separately acquire independently supportable multi-session provenance. Construct validation and any threshold proposal remain downstream decisions that require reviewing those evidence tracks rather than assuming success in advance.
