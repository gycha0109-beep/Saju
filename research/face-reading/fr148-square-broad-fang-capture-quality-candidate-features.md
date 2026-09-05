# FR148 — Square Broad Fang Capture-Quality Candidate Features

## Purpose

FR147 closed one governance gap but deliberately left capture-quality measurement constructs unvalidated and repeatability interpretation forbidden. FR148 freezes a small set of **threshold-free, aggregate-only image-quality candidate features** before empirical validation.

The bounded sequence is:

`ephemeral browser raster -> threshold-free integer aggregates -> FR148 candidate features -> future controlled empirical validation`

FR148 does not consume or persist image bytes, provider responses, source digests, full landmarks, embeddings, identity templates, capture timestamps, device identifiers, or geolocation.

## Why an intermediate candidate-feature stage is required

The current frontier is not solved by inventing a blur threshold or by observing that two real FR142 values are numerically close. Before a quality gate can exist, the project must freeze candidate measurements and then test whether they actually respond to controlled degradation in the way the intended quality construct predicts.

Therefore:

`deterministic formula != validated capture-quality construct != quality threshold != empirical repeatability`

FR148 intentionally advances only the first term.

## Relation to FR-DATA-05

FR-DATA-05 already demonstrated a threshold-free browser integer primitive family for a different governed Menton dataset path: RGB intensity sums/squares, adjacent intensity differences, and spatial intensity moments. It also explicitly kept sharpness, exposure, lighting, occlusion, quality thresholds, and capture-quality authority false.

FR148 reuses that **primitive family conceptually**, not its dataset evidence or authority. No Menton asset digest, pixel raster, capture value, quality conclusion, or dataset-specific validation is imported into the Fang path.

## Frozen candidate definitions

All output values are ratios bounded to `[0,1]`.

1. `candidate.capture_quality.rgb_sum_mean_normalized`
   - `mean(R+G+B) / 765`
   - hypothesis only: global intensity location candidate;
   - not an exposure-adequacy metric.

2. `candidate.capture_quality.rgb_sum_standard_deviation_normalized`
   - standard deviation of per-pixel `R+G+B`, divided by `765`;
   - hypothesis only: global intensity-dispersion candidate;
   - not a validated contrast, exposure, or lighting metric.

3. `candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized`
   - RMS adjacent-pixel difference over horizontal and vertical `R+G+B` neighbors, divided by `765`;
   - hypothesis only: local high-frequency variation candidate;
   - not a validated sharpness metric and not an anti-blur threshold.

4. `candidate.capture_quality.any_channel_zero_fraction`
   - fraction of pixels where at least one RGB channel is zero;
   - hypothesis only: channel-floor occupancy candidate;
   - not proof of underexposure.

5. `candidate.capture_quality.any_channel_full_scale_fraction`
   - fraction of pixels where at least one RGB channel is 255;
   - hypothesis only: channel-ceiling occupancy candidate;
   - not proof of overexposure.

6. `candidate.capture_quality.intensity_centroid_offset_magnitude_normalized`
   - normalized distance of the `R+G+B` intensity centroid from raster center;
   - hypothesis only: spatial intensity-balance candidate;
   - not proof of adequate lighting or facial illumination symmetry.

No classifier, calibration function, threshold, pass/fail state, or quality label is attached to any feature.

## Input boundary

FR148 accepts only bounded opaque `captureRef` plus integer aggregate statistics:

- raster width / height / pixel count;
- RGB-sum min, max, sum, and sum-of-squares;
- any-channel-zero/full-scale pixel counts;
- horizontal / vertical adjacent squared-difference sums and exact pair counts;
- spatial intensity moments.

Strict allowlists reject extra fields such as image content, source digests, thresholds, provider payloads, or hidden quality labels.

The runtime validates exact raster arithmetic and mathematical maxima before issuing candidate values.

## Authority boundary

FR148 preserves:

- `syntheticUnitTestsMeanConstructValidity: false`
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

Traditional-semantic authority is unchanged:

- `constructValidity: unresolved`
- `traditionalBinding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

## Current real-capture boundary

The previously completed FR146 A/B real run may later be used ephemerally to obtain threshold-free candidate feature observations if the original images are available in an authorized execution context. Those values must not be committed as public repository fixtures.

Even if FR148 candidate values are produced for those two historical captures, they still do not supply independently verified multi-session provenance and therefore cannot unlock repeatability interpretation.

The historical captures must not be retroactively assigned different sessions merely to satisfy FR147/FR148 downstream gates.

## Verification

Deterministic tests must prove:

1. exactly six candidate feature definitions are frozen;
2. all values remain within `[0,1]`;
3. aggregate-only input arithmetic is validated;
4. invalid raster dimensions, adjacency counts, moments, duplicate refs, or unauthorized fields fail closed;
5. raw image / digest / provider payload fields cannot enter the request contract;
6. deterministic synthetic arithmetic tests do not promote construct validity;
7. no threshold, quality pass/fail state, repeatability interpretation, or traditional semantic authority is issued;
8. forged output objects fail the process-local issued-object assertion.

Synthetic tests verify formulas only. They are not empirical validation evidence.

## Next frontier

`square_broad_fang_capture_quality_candidate_feature_empirical_perturbation_validation_and_independent_multi_session_evidence_before_quality_or_repeatability_thresholds`

The next empirical work requires a controlled perturbation protocol with independently known quality manipulations, plus independently supportable multi-session capture evidence. Only after those two evidence tracks exist can the project assess whether any FR148 feature is a valid capture-quality construct and whether repeatability interpretation should remain blocked or advance.