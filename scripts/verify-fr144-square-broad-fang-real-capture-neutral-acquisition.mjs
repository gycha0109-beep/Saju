import { readFileSync } from 'node:fs';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-real-capture-acquisition-fr144.ts';
const notePath = 'research/face-reading/fr144-square-broad-fang-real-capture-neutral-acquisition-extension.md';

const runtime = readFileSync(runtimePath, 'utf8');
const note = readFileSync(notePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR144 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR144 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['runtimeInputAuthority: \'issued_fr142_only\'', 'issued FR142 input authority'],
  ['reusesFR135IdentityAndSeriesGroupingInvariantsWithoutMutatingFR135: true', 'FR135 invariant reuse'],
  ['historicalFR135ArtifactMutated: false', 'historical FR135 immutability'],
  ['subjectCount: null', 'no subject count invention'],
  ['captureCountPerSubject: null', 'no capture count invention'],
  ['splitRatios: null', 'no split invention'],
  ['numericRepeatabilityAcceptanceThresholds: null', 'no repeatability cutoff'],
  ['empiricalCaptureRecordsBundledAtDefinitionTime: 0', 'zero bundled captures'],
  ['empiricalDatasetsBundledAtDefinitionTime: 0', 'zero bundled datasets'],
  ['semanticAnnotationRequiredToAcquireNeutralMetrics: false', 'neutral acquisition semantic independence'],
  ['rawImageStoredByThisArtifact: false', 'raw image boundary'],
  ['rawProviderResponseStoredByThisArtifact: false', 'raw provider boundary'],
  ['faceEmbeddingStoredByThisArtifact: false', 'embedding boundary'],
  ['identityTemplateStoredByThisArtifact: false', 'identity-template boundary'],
  ['neutralAcquisitionMeansEmpiricalRepeatabilityEstablished: false', 'empirical-repeatability boundary'],
  ['neutralAcquisitionMeansConstructValidity: false', 'construct-validity boundary'],
  ['neutralAcquisitionMeansTraditionalFang: false', 'traditional Fang boundary'],
  ['syntheticVerificationMeansRealCaptureEvidence: false', 'synthetic/real evidence boundary'],
  ['humanSemanticLabelsIssued: 0', 'zero human labels'],
  ['traditionalMetricBindingsIssued: 0', 'zero bindings'],
  ['calibrationProtocolsIssued: 0', 'zero calibration'],
  ['thresholdsIssued: 0', 'zero thresholds'],
  ['criterionStatesIssued: 0', 'zero states'],
  ['traditionalSemanticAuthority: false', 'no traditional semantic authority'],
  ['square_broad_fang_governed_real_capture_dataset_materialization_for_descriptive_repeatability_observation_without_semantic_labels', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['synthetic repeatability != empirical capture repeatability', 'note synthetic/empirical distinction'],
  ['neutral acquisition capability != empirical repeatability established', 'note acquisition/evidence distinction'],
  ['empiricalCaptureRecordsBundledAtDefinitionTime = 0', 'note zero capture materialization'],
  ['empiricalDatasetsBundledAtDefinitionTime = 0', 'note zero dataset materialization'],
  ['No fake real-capture dataset is created', 'note no fake empirical data'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['runtimeInputAuthority: \'synthetic_kernel_allowed\'', 'synthetic capture input'],
  ['numericRepeatabilityAcceptanceThresholds: 0.', 'invented numeric threshold'],
  ['traditionalMetricBindingsIssued: 1', 'traditional binding issuance'],
  ['calibrationProtocolsIssued: 1', 'calibration issuance'],
  ['thresholdsIssued: 1', 'threshold issuance'],
  ['criterionStatesIssued: 1', 'criterion-state issuance'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
]) forbidFragment(runtime, fragment, label);
