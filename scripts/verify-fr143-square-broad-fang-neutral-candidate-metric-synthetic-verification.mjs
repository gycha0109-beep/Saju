import { readFileSync } from 'node:fs';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.ts';
const notePath = 'research/face-reading/fr143-square-broad-fang-neutral-candidate-metric-synthetic-verification.md';

const runtime = readFileSync(runtimePath, 'utf8');
const note = readFileSync(notePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR143 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR143 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['square_broad_fang_neutral_candidate_metrics_synthetically_verified_for_numeric_behavior_no_construct_validity', 'authority state'],
  ['synthetic.face.mouth.circle_regular_20', 'circle fixture'],
  ['synthetic.face.mouth.ellipse_horizontal_20', 'ellipse fixture'],
  ['synthetic.face.mouth.rectangle_piecewise_20', 'rectangle fixture'],
  ['synthetic.face.mouth.asymmetric_ellipse_20', 'asymmetric fixture'],
  ['traditionalLabel: null', 'null traditional fixture label'],
  ['humanSemanticLabel: null', 'null human fixture label'],
  ['empiricalCapture: false', 'synthetic non-capture boundary'],
  ['syntheticDiscriminationMeansConstructValidity: false', 'construct-validity boundary'],
  ['syntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false', 'capture-repeatability boundary'],
  ['metricSeparationMeansTraditionalCriterionBinding: false', 'binding boundary'],
  ['syntheticFixtureMayBeUsedAsGroundTruthHumanLabel: false', 'ground-truth boundary'],
  ['syntheticFixtureMayBeUsedForCalibration: false', 'calibration boundary'],
  ['numericAcceptanceTolerancePersisted: null', 'no persisted numeric tolerance'],
  ['numericClassificationThresholdsIssued: 0', 'zero threshold issuance'],
  ['traditionalMetricBindingsIssued: 0', 'zero binding issuance'],
  ['criterionStatesIssued: 0', 'zero state issuance'],
  ['traditionalSemanticAuthority: false', 'no semantic authority'],
  ['square_broad_fang_real_capture_neutral_metric_repeatability_acquisition_extension_without_semantic_labels', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['syntheticFixtureMeansTraditionalClass = false', 'note synthetic/traditional boundary'],
  ['syntheticDiscriminationMeansConstructValidity = false', 'note construct-validity boundary'],
  ['syntheticRepeatabilityMeansEmpiricalCaptureRepeatability = false', 'note capture-repeatability boundary'],
  ['numericClassificationThresholdsIssued = 0', 'note zero threshold issuance'],
  ['traditionalSemanticAuthority = false', 'note no semantic authority'],
  ['No numerical tolerance is persisted as repository authority or product policy.', 'note tolerance boundary'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['traditionalSemanticAuthority: true', 'semantic authority promotion'],
  ['traditionalLabel: \'fang\'', 'synthetic Fang label'],
  ['humanSemanticLabel: \'supports_fang_shape_hypothesis\'', 'synthetic human label'],
  ['numericClassificationThresholdsIssued: 1', 'threshold issuance'],
  ['traditionalMetricBindingsIssued: 1', 'traditional binding issuance'],
  ['criterionStatesIssued: 1', 'criterion-state issuance'],
]) forbidFragment(runtime, fragment, label);

console.log('FR143 synthetic metric verification boundary: PASS');
