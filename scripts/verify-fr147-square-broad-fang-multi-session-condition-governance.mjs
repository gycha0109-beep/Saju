import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-multi-session-condition-governance-fr147.ts';
const testPath = 'packages/face-reading/src/five-officers-square-broad-fang-multi-session-condition-governance-fr147.test.ts';
const notePath = 'research/face-reading/fr147-square-broad-fang-multi-session-condition-governance.md';

const runtime = readFileSync(runtimePath, 'utf8');
const test = readFileSync(testPath, 'utf8');
const note = readFileSync(notePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR147 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR147 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146', 'FR146 issued-dataset lineage'],
  ['getSquareBroadFangRepeatedGovernedRealCaptureContractFR146', 'FR146 contract reuse'],
  ['MIN_SESSION_COUNT = 2', 'minimum two-session boundary'],
  ['session condition records must cover every FR-146 capture exactly once', 'complete partition requirement'],
  ['captureProtocolRef must remain shared across governed sessions', 'shared protocol requirement'],
  ['neutralExpressionInstructionRef must remain shared across governed sessions', 'shared neutral-expression instruction'],
  ['headPoseInstructionRef must remain shared across governed sessions', 'shared pose instruction'],
  ['conditionReferenceEqualityMeansPhysicalConditionEquality: false', 'physical condition non-promotion'],
  ['conditionDocumentationMeansNeutralExpressionValidity: false', 'neutral-expression non-promotion'],
  ['conditionDocumentationMeansIndependentCaptureEvent: false', 'independent-event non-promotion'],
  ['objectiveCaptureQualityMetricsIssued: 0', 'zero objective quality metrics'],
  ['objectiveCaptureQualityValidated: false', 'capture-quality non-promotion'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability non-promotion'],
  ['repeatabilityClassificationIssued: false', 'repeatability classification closed'],
  ['repeatabilityInterpretationAuthorized: false', 'repeatability interpretation closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold closed'],
  ['rawImagePersisted: false', 'raw image non-persistence'],
  ['rawProviderResponsePersisted: false', 'raw provider non-persistence'],
  ['sourceDigestPersisted: false', 'source digest non-persistence'],
  ['embeddingPersisted: false', 'embedding non-persistence'],
  ['identityTemplatePersisted: false', 'identity template non-persistence'],
  ['deviceSerialNumberRequired: false', 'device serial not required'],
  ['operatorIdentityRequired: false', 'operator identity not required'],
  ['exactCaptureTimestampRequired: false', 'exact timestamp not required'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['criterionState: null', 'criterion state closed'],
  ['structuredClaim: null', 'structured claim closed'],
  ['boundedNarrative: null', 'bounded narrative closed'],
  ['square_broad_fang_objective_capture_quality_metric_admission_and_real_multi_session_acquisition_without_semantic_binding', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['covers every predecessor capture exactly once across two governed sessions', 'successful partition test'],
  ['rejects single-session documentation because multi-session coverage is not met', 'single-session rejection'],
  ['rejects an incomplete capture partition', 'duplicate partition rejection'],
  ['rejects an unknown captureRef', 'unknown capture rejection'],
  ['rejects cross-session protocol or instruction drift', 'cross-session protocol drift rejection'],
  ['rejects a structurally plausible forged FR146 dataset under production dependencies', 'issued-lineage hardening'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['condition reference equality != physical condition equality', 'documentation/physical separation'],
  ['condition documentation != neutral-expression validity != capture quality != empirical repeatability', 'quality/repeatability separation'],
  ['image geometry != construct validity != traditional meaning', 'semantic authority separation'],
  ['only one independently captured real image is currently available', 'real empirical limit'],
  ['must not be duplicated, transcoded, resized, or otherwise transformed', 'anti-fabrication boundary'],
  ['construct validity: unresolved', 'note construct validity unresolved'],
  ['traditional binding: unresolved', 'note traditional binding unresolved'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ["constructValidity: 'established'", 'construct validity promotion'],
  ["traditionalBinding: 'established'", 'traditional binding promotion'],
  ['objectiveCaptureQualityValidated: true', 'quality promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['repeatabilityClassificationIssued: true', 'repeatability classification promotion'],
  ['repeatabilityInterpretationAuthorized: true', 'repeatability interpretation promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'raw provider persistence'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
]) forbidFragment(runtime, fragment, label);

for (const fragment of ['data:image/jpeg;base64,', 'data:image/png;base64,']) {
  forbidFragment(test, fragment, 'embedded real image data');
  forbidFragment(note, fragment, 'embedded real image data');
}

stdout.write('FR147_MULTI_SESSION_CONDITION_GOVERNANCE: PASS\n');
