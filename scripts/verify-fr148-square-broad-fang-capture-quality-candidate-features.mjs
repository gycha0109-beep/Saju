import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync('packages/face-reading/src/five-officers-square-broad-fang-capture-quality-candidate-features-fr148.ts', 'utf8');
const test = readFileSync('packages/face-reading/src/five-officers-square-broad-fang-capture-quality-candidate-features-fr148.test.ts', 'utf8');
const note = readFileSync('research/face-reading/fr148-square-broad-fang-capture-quality-candidate-features.md', 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR148 verifier missing ${label}: ${fragment}`);
}
function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR148 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['getSquareBroadFangCaptureConditionGovernanceContractFR147', 'FR147 predecessor contract'],
  ['const REQUEST_KEYS = new Set(', 'request allowlist'],
  ['const CAPTURE_KEYS = new Set(', 'capture allowlist'],
  ['const RGB_KEYS = new Set(', 'RGB allowlist'],
  ['OUTPUT_FEATURE_COUNT = 6', 'six frozen features'],
  ['candidate.capture_quality.rgb_sum_mean_normalized', 'mean candidate'],
  ['candidate.capture_quality.rgb_sum_standard_deviation_normalized', 'dispersion candidate'],
  ['candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized', 'local variation candidate'],
  ['candidate.capture_quality.any_channel_zero_fraction', 'floor occupancy candidate'],
  ['candidate.capture_quality.any_channel_full_scale_fraction', 'ceiling occupancy candidate'],
  ['candidate.capture_quality.intensity_centroid_offset_magnitude_normalized', 'spatial balance candidate'],
  ['syntheticUnitTestsMeanConstructValidity: false', 'unit-test non-promotion'],
  ['empiricalPerturbationValidationPerformed: false', 'empirical validation closed'],
  ['captureQualityMeasurementConstructValidated: false', 'quality construct unresolved'],
  ['exposureMetricValidated: false', 'exposure unresolved'],
  ['sharpnessMetricValidated: false', 'sharpness unresolved'],
  ['lightingMetricValidated: false', 'lighting unresolved'],
  ['occlusionValidityVerified: false', 'occlusion unresolved'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold closed'],
  ['rawImagePersisted: false', 'raw image non-persistence'],
  ['rawProviderResponsePersisted: false', 'provider non-persistence'],
  ['sourceDigestPersisted: false', 'digest non-persistence'],
  ['sourceDigestReturned: false', 'digest non-return'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_capture_quality_candidate_feature_empirical_perturbation_validation_and_independent_multi_session_evidence_before_quality_or_repeatability_thresholds', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['computes six bounded candidate features from aggregate-only input', 'formula test'],
  ['rejects raw image, digest, threshold, and unauthorized fields through strict allowlists', 'allowlist test'],
  ['rejects invalid raster arithmetic, adjacency counts, moments, and duplicate capture refs', 'arithmetic fail-closed test'],
  ['keeps synthetic arithmetic verification separate from empirical construct validity', 'authority test'],
  ['rejects a forged FR148 report at the issued-object boundary', 'issued-object test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['deterministic formula != validated capture-quality construct != quality threshold != empirical repeatability', 'authority separation'],
  ['reuses that **primitive family conceptually**, not its dataset evidence or authority', 'FR-DATA-05 non-reuse'],
  ['Synthetic tests verify formulas only. They are not empirical validation evidence.', 'synthetic evidence boundary'],
  ['must not be retroactively assigned different sessions', 'historical-session non-relabeling'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['captureQualityMeasurementConstructValidated: true', 'construct validation promotion'],
  ['exposureMetricValidated: true', 'exposure promotion'],
  ['sharpnessMetricValidated: true', 'sharpness promotion'],
  ['lightingMetricValidated: true', 'lighting promotion'],
  ['occlusionValidityVerified: true', 'occlusion promotion'],
  ['captureQualityThresholdsDefined: true', 'quality threshold promotion'],
  ['captureQualityValidated: true', 'quality authority promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'provider persistence'],
  ['sourceDigestPersisted: true', 'digest persistence'],
  ['sourceDigestReturned: true', 'digest return'],
]) forbidFragment(runtime, fragment, label);

for (const fragment of ['capture:fr146:real:001:A', 'capture:fr146:real:001:B', 'data:image/jpeg;base64,', 'data:image/png;base64,']) {
  forbidFragment(test, fragment, 'real/private fixture material');
  forbidFragment(note, fragment, 'real/private fixture material');
}

stdout.write('FR148_CAPTURE_QUALITY_CANDIDATE_FEATURES: PASS\n');
