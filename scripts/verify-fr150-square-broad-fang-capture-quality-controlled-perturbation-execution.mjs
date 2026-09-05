import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-controlled-perturbation-execution-fr150.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-controlled-perturbation-execution-fr150.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr150-square-broad-fang-capture-quality-controlled-perturbation-execution.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR150 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR150 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149', 'active FR149 predecessor issuance'],
  ['materializeSquareBroadFangCaptureQualityCandidateFeaturesFR148', 'active FR148 formula reuse'],
  ['FR150_PERTURBATION_SCHEDULES', 'frozen execution schedules'],
  ['fraction_toward_black', 'darkening strengths'],
  ['fraction_toward_white', 'brightening strengths'],
  ['binomial_kernel_order', 'blur strengths'],
  ['horizontal_gain_half_range_fraction', 'gradient strengths'],
  ['center_mask_side_fraction', 'mask strengths'],
  ['fr150.linear_channel_scale_toward_black_round_half_up.v1', 'dark transform pin'],
  ['fr150.linear_channel_scale_toward_white_round_half_up.v1', 'bright transform pin'],
  ['fr150.separable_equivalent_binomial_2d_clamp_edge_round_half_up.v1', 'blur transform pin'],
  ['fr150.horizontal_linear_gain_gradient_round_half_up.v1', 'gradient transform pin'],
  ['fr150.centered_black_rectangle_side_fraction.v1', 'mask transform pin'],
  ["sourceBackingState: 'authorized_source_backed_ephemeral_raster'", 'source-backed assertion'],
  ['sourceBackingIndependentlyVerifiedByThisArtifact: false', 'source-backing non-promotion'],
  ['empiricalPerturbationExecutionPerformed: true', 'execution performed only in issued FR150 output'],
  ['featureResponseTrendObservationMaterialized: true', 'trend observation materialized'],
  ['empiricalPerturbationValidationPerformed: false', 'construct validation deferred'],
  ['captureQualityMeasurementConstructValidated: false', 'capture-quality construct unresolved'],
  ['exposureMetricValidated: false', 'exposure unresolved'],
  ['sharpnessMetricValidated: false', 'sharpness unresolved'],
  ['lightingMetricValidated: false', 'lighting unresolved'],
  ['occlusionValidityVerified: false', 'occlusion unresolved'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['independentMultiSessionEvidenceAdmitted: false', 'multi-session evidence absent'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold closed'],
  ['rawImagePersisted: false', 'raw-image non-persistence'],
  ['rawImageReturned: false', 'raw-image non-return'],
  ['rawPixelRasterPersisted: false', 'raw-raster non-persistence'],
  ['rawPixelRasterReturned: false', 'raw-raster non-return'],
  ['rawAggregatePersisted: false', 'raw-aggregate non-persistence'],
  ['rawAggregateReturned: false', 'raw-aggregate non-return'],
  ['sourceDigestComputed: false', 'digest not computed'],
  ['sourceDigestPersisted: false', 'digest non-persistence'],
  ['sourceDigestReturned: false', 'digest non-return'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_capture_quality_perturbation_evidence_review_and_independent_multi_session_evidence_acquisition_before_construct_validation_or_thresholds', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['pins exact transform implementations and strength schedules before observation', 'schedule pinning test'],
  ['executes all five families and emits only frozen FR148 candidate features', 'execution test'],
  ['observes the pre-registered directional ordering for deterministic intensity probes', 'trend observation test'],
  ['keeps raw rasters, aggregates, digests, provider payloads, and semantic authority out of output', 'privacy test'],
  ['fails closed on unauthorized fields, duplicate refs, invalid alpha, and malformed raster length', 'fail-closed input test'],
  ['rejects a forged FR150 execution at the issued-object boundary', 'issued-object test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['These schedules are repository-owned and fixed before any real/source-backed result is inspected.', 'pre-observation freeze'],
  ['observed transform sensitivity != capture-quality construct validity != threshold validity', 'authority separation'],
  ['Historical FR146 A/B must not be relabeled as independent sessions.', 'historical session non-relabeling'],
  ['no private source-backed FR150 candidate values are committed to the repository', 'private evidence boundary'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['captureQualityMeasurementConstructValidated: true', 'construct promotion'],
  ['exposureMetricValidated: true', 'exposure promotion'],
  ['sharpnessMetricValidated: true', 'sharpness promotion'],
  ['lightingMetricValidated: true', 'lighting promotion'],
  ['occlusionValidityVerified: true', 'occlusion promotion'],
  ['captureQualityThresholdsDefined: true', 'quality threshold promotion'],
  ['captureQualityValidated: true', 'quality authority promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'session evidence promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawImageReturned: true', 'raw image return'],
  ['rawPixelRasterPersisted: true', 'raw raster persistence'],
  ['rawPixelRasterReturned: true', 'raw raster return'],
  ['rawAggregatePersisted: true', 'raw aggregate persistence'],
  ['rawAggregateReturned: true', 'raw aggregate return'],
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

stdout.write('FR150_CAPTURE_QUALITY_CONTROLLED_PERTURBATION_EXECUTION: PASS\n');
