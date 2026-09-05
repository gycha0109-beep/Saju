import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-capture-condition-governance-fr147.ts';
const testPath = 'packages/face-reading/src/five-officers-square-broad-fang-capture-condition-governance-fr147.test.ts';
const notePath = 'research/face-reading/fr147-square-broad-fang-capture-condition-governance.md';
const predecessorNotePath = 'research/face-reading/fr146-square-broad-fang-repeated-governed-real-capture-dataset.md';

const runtime = readFileSync(runtimePath, 'utf8');
const test = readFileSync(testPath, 'utf8');
const note = readFileSync(notePath, 'utf8');
const predecessorNote = readFileSync(predecessorNotePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR147 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR147 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146', 'active FR146 issued-lineage dependency'],
  ['getSquareBroadFangRepeatedGovernedRealCaptureContractFR146', 'FR146 predecessor contract'],
  ['const REQUEST_KEYS = new Set(', 'strict request allowlist'],
  ['const CONDITION_KEYS = new Set(', 'strict condition allowlist'],
  ['const PROTOCOL_INTENT_KEYS = new Set(', 'strict protocol-intent allowlist'],
  ['const QUALITY_EVIDENCE_KEYS = new Set(', 'strict quality-evidence allowlist'],
  ['MIN_DISTINCT_SESSION_REFS = 2', 'minimum multi-session reference cardinality'],
  ['study_operator_declared_session_ref_not_independently_verified', 'declared-only session evidence'],
  ['neutral_expression_requested_not_verified', 'neutral expression request-only state'],
  ['natural_head_position_requested_not_verified', 'head-position request-only state'],
  ['full_face_framing_requested_not_verified', 'framing request-only state'],
  ['not_validated_no_threshold_authority', 'capture-quality unresolved state'],
  ['distinctSessionRefsMeanIndependentCaptureSessions: false', 'session ref non-promotion'],
  ['distinctCaptureEventRefsMeanIndependentCaptureEvents: false', 'event ref non-promotion'],
  ['captureQualityMeasurementConstructValidated: false', 'quality construct unresolved'],
  ['captureQualityThresholdsDefined: false', 'quality thresholds closed'],
  ['captureQualityValidated: false', 'capture quality closed'],
  ['multiSessionIndependenceVerified: false', 'session independence unresolved'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['repeatabilityClassificationIssued: false', 'repeatability classification closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold closed'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['criterionState: null', 'criterion state closed'],
  ['structuredClaim: null', 'structured claim closed'],
  ['boundedNarrative: null', 'bounded narrative closed'],
  ['rawImagePersisted: false', 'raw image non-persistence'],
  ['rawProviderResponsePersisted: false', 'raw provider non-persistence'],
  ['sourceDigestPersisted: false', 'digest non-persistence'],
  ['sourceDigestReturned: false', 'digest non-return'],
  ['captureTimestampPersisted: false', 'capture timestamp non-persistence'],
  ['geolocationPersisted: false', 'geolocation non-persistence'],
  ['deviceIdentifierPersisted: false', 'device identifier non-persistence'],
  ['square_broad_fang_capture_quality_measurement_construct_validation_and_independent_multi_session_evidence_acquisition_before_repeatability_interpretation', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['materializes multi-session reference governance while preserving unresolved quality and semantic authority', 'happy-path non-promotion test'],
  ['uses active FR146 issuance by default and rejects a structurally plausible forged predecessor dataset', 'issued-lineage test'],
  ['rejects one-session relabeling before governance materialization', 'single-session rejection test'],
  ['rejects missing, duplicate, and unknown capture-condition coverage', 'coverage test'],
  ['rejects duplicate capture-event refs and any quality-authority promotion', 'event/quality fail-closed test'],
  ['rejects unauthorized request, condition, protocol, and quality fields', 'strict allowlist test'],
  ['rejects forged FR147 governance artifacts at the issued-object boundary', 'FR147 issuance test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['distinct bytes != distinct capture event != independent session != validated capture quality != empirical repeatability', 'authority separation'],
  ['distinct `captureSessionRef` values do **not** prove independent capture sessions', 'session non-promotion note'],
  ['FR147 does not invent blur, exposure, illumination, or occlusion thresholds.', 'threshold non-invention'],
  ['The two historical captures must not be retroactively relabeled as separate sessions merely to satisfy FR147.', 'no retroactive relabeling'],
  ['No real user image or real face-derived measurement value is committed to CI.', 'real-user data CI exclusion'],
  ['empirical repeatability interpretation: not allowed', 'empirical interpretation closed'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['A real two-capture FR146 execution has now completed ephemerally', 'FR146 empirical status synchronization'],
  ['No real user image or face-derived metric value is committed', 'FR146 public-repo privacy sync'],
]) requireFragment(predecessorNote, fragment, label);

for (const [fragment, label] of [
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ["constructValidity: 'established'", 'construct validity promotion'],
  ["traditionalBinding: 'established'", 'traditional binding promotion'],
  ['captureQualityValidated: true', 'capture quality promotion'],
  ['captureQualityMeasurementConstructValidated: true', 'quality construct promotion'],
  ['captureQualityThresholdsDefined: true', 'quality threshold promotion'],
  ['multiSessionIndependenceVerified: true', 'session independence promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'empirical repeatability promotion'],
  ['repeatabilityClassificationIssued: true', 'repeatability classification promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'raw provider persistence'],
  ['sourceDigestPersisted: true', 'source digest persistence'],
  ['sourceDigestReturned: true', 'source digest return'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
  ['captureTimestampPersisted: true', 'capture timestamp persistence'],
  ['geolocationPersisted: true', 'geolocation persistence'],
  ['deviceIdentifierPersisted: true', 'device identifier persistence'],
]) forbidFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['data:image/jpeg;base64,', 'embedded real JPEG data'],
  ['data:image/png;base64,', 'embedded real PNG data'],
  ['capture:fr146:real:001:A', 'real capture ref in repository test/note'],
  ['capture:fr146:real:001:B', 'real capture ref in repository test/note'],
]) {
  forbidFragment(test, fragment, label);
  forbidFragment(note, fragment, label);
}

stdout.write('FR147_CAPTURE_CONDITION_GOVERNANCE: PASS\n');
