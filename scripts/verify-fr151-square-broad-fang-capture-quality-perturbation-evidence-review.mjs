import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-perturbation-evidence-review-fr151.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-perturbation-evidence-review-fr151.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr151-square-broad-fang-capture-quality-perturbation-evidence-review.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR151 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR151 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangControlledPerturbationExecutionFR150', 'active FR150 issued-object requirement'],
  ['getSquareBroadFangControlledPerturbationExecutionContractFR150', 'active FR150 contract requirement'],
  ["pre_registered_expectation_observed", 'observed categorical review status'],
  ["pre_registered_expectation_not_observed", 'nonconforming categorical review status'],
  ["no_directional_acceptance_rule", 'negative-control no-rule status'],
  ["candidate_feature_response_only", 'candidate evidence-use boundary'],
  ["negative_control_response_only", 'negative-control evidence-use boundary'],
  ['candidateFeatureNumericValuesReconsumedByThisArtifact: false', 'numeric feature non-reconsumption'],
  ['categoricalTrendObservationsOnly: true', 'categorical-only review'],
  ['postHocNumericCutoffIntroduced: false', 'post-hoc cutoff prohibition'],
  ['empiricalPerturbationEvidenceReviewPerformed: true', 'review materialization'],
  ['empiricalPerturbationValidationPerformed: false', 'perturbation validation non-promotion'],
  ["candidateConstructAdvanceDecision: 'deferred_pending_independent_multi_session_and_construct_validity_evidence'", 'construct advance deferred'],
  ['captureQualityMeasurementConstructValidated: false', 'capture-quality construct unresolved'],
  ['exposureMetricValidated: false', 'exposure unresolved'],
  ['sharpnessMetricValidated: false', 'sharpness unresolved'],
  ['lightingMetricValidated: false', 'lighting unresolved'],
  ['occlusionValidityVerified: false', 'occlusion unresolved'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['independentMultiSessionEvidenceAdmitted: false', 'multi-session evidence absent'],
  ['multiSessionIndependenceVerified: false', 'multi-session independence unresolved'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability numeric threshold closed'],
  ['rawImageConsumed: false', 'raw-image non-consumption'],
  ['rawPixelRasterConsumed: false', 'raw-raster non-consumption'],
  ['rawAggregateConsumed: false', 'raw-aggregate non-consumption'],
  ['candidateFeatureNumericValuesPersisted: false', 'numeric feature non-persistence'],
  ['candidateFeatureNumericValuesReturned: false', 'numeric feature non-return'],
  ['sourceDigestComputed: false', 'digest not computed'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_capture_quality_independent_multi_session_evidence_acquisition_and_candidate_construct_validation_decision_before_thresholds_or_repeatability', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['freezes categorical review without numeric cutoff or construct promotion', 'contract review test'],
  ['reviews two source-backed executions using only pre-registered categorical trend observations', 'categorical review test'],
  ['records a nonconforming pre-registered response without failing or inventing a post-hoc threshold', 'negative empirical result test'],
  ['returns no candidate numeric feature values, raster material, aggregates, or digests', 'privacy test'],
  ['keeps capture quality, multi-session, repeatability, and traditional authority fail-closed', 'authority test'],
  ['fails closed on unauthorized request fields and forged predecessor or review objects', 'issued-object test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['FR151 deliberately reviews only those categorical observations.', 'categorical review explanation'],
  ['FR151 must not fail merely because a pre-registered empirical response did not occur', 'negative result preservation'],
  ['Historical FR146 A/B must not be relabeled as independent sessions.', 'historical session non-relabeling'],
  ['No private source-backed FR150 numeric candidate values are committed to the repository by FR151.', 'private numeric evidence boundary'],
  ['Observed perturbation trend consistency is therefore evidence inventory only.', 'authority separation'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['empiricalPerturbationValidationPerformed: true', 'perturbation validation promotion'],
  ['captureQualityMeasurementConstructValidated: true', 'construct promotion'],
  ['exposureMetricValidated: true', 'exposure promotion'],
  ['sharpnessMetricValidated: true', 'sharpness promotion'],
  ['lightingMetricValidated: true', 'lighting promotion'],
  ['occlusionValidityVerified: true', 'occlusion promotion'],
  ['captureQualityThresholdsDefined: true', 'quality threshold promotion'],
  ['captureQualityValidated: true', 'quality authority promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'session evidence promotion'],
  ['multiSessionIndependenceVerified: true', 'session independence promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImageConsumed: true', 'raw image consumption'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawImageReturned: true', 'raw image return'],
  ['rawPixelRasterConsumed: true', 'raw raster consumption'],
  ['rawPixelRasterPersisted: true', 'raw raster persistence'],
  ['rawPixelRasterReturned: true', 'raw raster return'],
  ['rawAggregateConsumed: true', 'raw aggregate consumption'],
  ['rawAggregatePersisted: true', 'raw aggregate persistence'],
  ['rawAggregateReturned: true', 'raw aggregate return'],
  ['candidateFeatureNumericValuesPersisted: true', 'numeric feature persistence'],
  ['candidateFeatureNumericValuesReturned: true', 'numeric feature return'],
  ['sourceDigestComputed: true', 'digest computation'],
  ['sourceDigestPersisted: true', 'digest persistence'],
  ['sourceDigestReturned: true', 'digest return'],
]) forbidFragment(runtime, fragment, label);

for (const fragment of [
  'capture:fr146:real:001:A',
  'capture:fr146:real:001:B',
  'study-subject:fr146:real:001',
  'data:image/jpeg;base64,',
  'data:image/png;base64,',
]) {
  forbidFragment(test, fragment, 'private/real fixture material');
  forbidFragment(note, fragment, 'private/real fixture material');
}

stdout.write('FR151_CAPTURE_QUALITY_PERTURBATION_EVIDENCE_REVIEW: PASS\n');
