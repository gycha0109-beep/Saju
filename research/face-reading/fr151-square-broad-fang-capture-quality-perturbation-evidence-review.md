# FR151 — Square Broad Fang Capture-Quality Perturbation Evidence Review

## Purpose

FR150 materializes source-backed controlled perturbation executions and records only bounded candidate-feature response observations. FR151 reviews those already-issued FR150 categorical trend observations without re-consuming rasters or numeric candidate-feature values.

The bounded lineage is:

`active process-local FR150 issued execution -> pre-registered categorical trend observation -> FR151 categorical evidence review`

FR151 does not validate a capture-quality construct, define a quality threshold, classify a capture, prove independent sessions, establish repeatability, or issue traditional-semantic authority.

## Why the review is categorical

FR149 pre-registered the manipulation families and expected trend direction where a directional hypothesis existed. FR150 then computed numeric candidate features but exposed a bounded `primaryTrendObservation` for each source/family execution.

FR151 deliberately reviews only those categorical observations. It does not inspect FR150 `featureValues`, does not fit a new cutoff after seeing responses, and does not transform any source raster again.

This keeps the review question narrow:

> Did the already pre-registered response pattern occur on the reviewed source execution?

That question is not equivalent to:

> Is this feature a validated capture-quality construct?

## Review statuses

Every FR150 family execution is mapped to exactly one FR151 status:

1. `pre_registered_expectation_observed`
   - the FR150 categorical observation matched the FR149 pre-registered directional or magnitude-change expectation;
2. `pre_registered_expectation_not_observed`
   - the FR150 categorical observation did not match the pre-registered expectation;
3. `no_directional_acceptance_rule`
   - the FR149 negative-control family intentionally had no directional acceptance rule.

A nonconforming observation is retained as evidence. FR151 must not fail merely because a pre-registered empirical response did not occur, and it must not invent a post-hoc numeric threshold to convert that result into a pass.

## Negative control boundary

The opaque-region-mask family remains a negative-control response only. Its presence cannot become an occlusion validity claim because FR149 intentionally assigned it no directional acceptance rule.

FR151 therefore records the negative control separately from candidate-feature expectation counts.

## Source-backed execution provenance remains bounded

FR151 requires the actual active process-local FR150 execution object. A copied or reconstructed JSON-shaped object is rejected by the FR150 issued-object boundary.

However, FR151 does not independently verify FR150's source-backing assertion. It also does not independently verify that two opaque source references correspond to different acquisition sessions.

Historical FR146 A/B must not be relabeled as independent sessions.

Perturbation descendants of one raster also never count as independent repeated captures.

## Privacy boundary

FR151 consumes no raw image, RGBA raster, transformed raster, aggregate, provider payload, source digest, embedding, or identity template.

It also does not re-consume or return the numeric FR148 candidate-feature values carried inside FR150. The issued FR151 artifact contains only opaque source references, perturbation identifiers, pre-registered expectation metadata, categorical trend observations, and categorical review statuses.

No private source-backed FR150 numeric candidate values are committed to the repository by FR151.

## Authority boundary

FR151 may advance only the fact that categorical perturbation evidence review was performed:

- `empiricalPerturbationEvidenceReviewPerformed: true` for a successfully issued FR151 review;
- `empiricalPerturbationValidationPerformed: false`;
- `candidateConstructAdvanceDecision: deferred_pending_independent_multi_session_and_construct_validity_evidence`;
- `captureQualityMeasurementConstructValidated: false`;
- `exposureMetricValidated: false`;
- `sharpnessMetricValidated: false`;
- `lightingMetricValidated: false`;
- `occlusionValidityVerified: false`;
- `captureQualityThresholdsDefined: false`;
- `captureQualityValidated: false`;
- `independentMultiSessionEvidenceAdmitted: false`;
- `multiSessionIndependenceVerified: false`;
- `repeatabilityInterpretationAllowed: false`;
- `empiricalRepeatabilityEstablished: false`;
- `numericCaptureQualityThreshold: null`;
- `numericRepeatabilityAcceptanceThreshold: null`.

Traditional-semantic authority remains unchanged:

- `constructValidity: unresolved`
- `traditionalBinding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

Observed perturbation trend consistency is therefore evidence inventory only. It is not construct validation and is not a quality threshold.

## Current empirical status

The repository-owned FR151 review boundary is deterministic and may be executed against an active private/source-backed FR150 object ephemerally. Public tests use synthetic rasters only.

A private/source-backed categorical review result may be reported outside the repository without publishing the underlying numeric candidate values. Such a result still does not provide independently supportable multi-session provenance.

## Verification requirements

Deterministic verification must prove that:

1. FR151 requires an active process-local issued FR150 execution;
2. all five FR150 families per source remain present and ordered;
3. FR151 consumes categorical `primaryTrendObservation` rather than numeric candidate-feature values;
4. a matching pre-registered response is recorded categorically;
5. a nonmatching pre-registered response is retained without post-hoc cutoff invention;
6. the no-rule opaque-mask family remains a negative control only;
7. raw raster, aggregate, digest, provider, and candidate numeric values are neither consumed nor returned by FR151;
8. independent multi-session evidence remains absent;
9. construct validity, thresholds, repeatability, and traditional-semantic authority remain closed;
10. forged FR150 and FR151 objects fail their process-local issued-object assertions.

## Next frontier

`square_broad_fang_capture_quality_independent_multi_session_evidence_acquisition_and_candidate_construct_validation_decision_before_thresholds_or_repeatability`

The next evidence-bearing step must separately acquire independently supportable multi-session capture provenance. Only after that provenance exists should a later stage decide whether any candidate feature deserves construct-validity advancement. Numeric quality or repeatability thresholds remain out of scope until such authority exists.
