import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-perturbation-protocol-fr149.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-capture-quality-perturbation-protocol-fr149.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr149-square-broad-fang-capture-quality-controlled-perturbation-protocol.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR149 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR149 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['getSquareBroadFangCaptureQualityCandidateFeatureContractFR148', 'FR148 predecessor contract'],
  ['requiredPerturbationFamilyCount: 5', 'five required perturbation families'],
  ['minimumDistinctNonBaselineStrengthsPerFamily: 2', 'minimum perturbation strengths'],
  ['protocolFrozenBeforeEmpiricalExecution: true', 'protocol pre-registration'],
  ['perturbation.capture_quality.global_intensity_darkening', 'darkening family'],
  ['perturbation.capture_quality.global_intensity_brightening', 'brightening family'],
  ['perturbation.capture_quality.gaussian_blur', 'blur family'],
  ['perturbation.capture_quality.spatial_illumination_gradient', 'spatial illumination family'],
  ['perturbation.capture_quality.opaque_region_mask_negative_control', 'occlusion negative control'],
  ["validationStatus: 'hypothesis_only_unvalidated'", 'unvalidated hypothesis state'],
  ['numericAcceptanceThreshold: null', 'no per-hypothesis threshold'],
  ['syntheticFixturesAloneSufficientForConstructValidity: false', 'synthetic non-promotion'],
  ['independentMultiSessionEvidenceRequiredBeforeRepeatabilityInterpretation: true', 'independent session requirement'],
  ['historicalSessionRelabelingAllowed: false', 'historical relabeling prohibition'],
  ['empiricalPerturbationExecutionPerformed: false', 'execution not performed'],
  ['empiricalPerturbationValidationPerformed: false', 'empirical validation not performed'],
  ['captureQualityMeasurementConstructValidated: false', 'construct validity closed'],
  ['exposureMetricValidated: false', 'exposure validity closed'],
  ['sharpnessMetricValidated: false', 'sharpness validity closed'],
  ['lightingMetricValidated: false', 'lighting validity closed'],
  ['occlusionValidityVerified: false', 'occlusion validity closed'],
  ['captureQualityThresholdsDefined: false', 'quality thresholds closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability closed'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability numeric threshold closed'],
  ['rawImagePersisted: false', 'raw-image non-persistence'],
  ['rawProviderResponsePersisted: false', 'provider non-persistence'],
  ['sourceDigestPersisted: false', 'digest non-persistence'],
  ['sourceDigestReturned: false', 'digest non-return'],
  ['rawPixelRasterPersisted: false', 'raw raster non-persistence'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_capture_quality_controlled_perturbation_execution_and_independent_multi_session_evidence_collection_before_construct_validation_or_thresholds', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['freezes five pre-registered perturbation families before empirical execution', 'protocol family test'],
  ['pre-registers directional hypotheses without converting them into thresholds', 'directional hypothesis test'],
  ['keeps empirical execution and capture-quality construct validation closed', 'construct authority test'],
  ['requires independent multi-session evidence without treating distinct refs as proof', 'multi-session authority test'],
  ['preserves privacy and semantic authority boundaries', 'privacy and semantic authority test'],
  ['rejects a forged FR149 protocol at the issued-object boundary', 'issued-object test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['formula correctness != construct validity != threshold validity != empirical repeatability', 'authority separation'],
  ['The protocol itself is not empirical evidence.', 'protocol evidence boundary'],
  ['same decoded source-raster lineage', 'same-source perturbation lineage'],
  ['negative-control/conflation probe', 'negative-control boundary'],
  ['distinct `sessionRef` strings alone do not prove independence', 'session-ref non-proof'],
  ['must not be retroactively assigned different sessions', 'historical-session non-relabeling'],
  ['The next stage is execution, not another conceptual promotion', 'execution frontier'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['empiricalPerturbationExecutionPerformed: true', 'false empirical execution promotion'],
  ['empiricalPerturbationValidationPerformed: true', 'false perturbation validation promotion'],
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
  ['rawImagePersisted: true', 'raw-image persistence'],
  ['rawProviderResponsePersisted: true', 'provider persistence'],
  ['sourceDigestPersisted: true', 'digest persistence'],
  ['sourceDigestReturned: true', 'digest return'],
  ['rawPixelRasterPersisted: true', 'raw raster persistence'],
]) forbidFragment(runtime, fragment, label);

for (const fragment of [
  'capture:fr146:real:001:A',
  'capture:fr146:real:001:B',
  'data:image/jpeg;base64,',
  'data:image/png;base64,',
]) {
  forbidFragment(test, fragment, 'real/private fixture material');
  forbidFragment(note, fragment, 'real/private fixture material');
}

stdout.write('FR149_CAPTURE_QUALITY_CONTROLLED_PERTURBATION_PROTOCOL: PASS\n');
