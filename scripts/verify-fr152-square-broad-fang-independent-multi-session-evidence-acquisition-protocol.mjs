import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR152 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR152 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['getSquareBroadFangCaptureConditionGovernanceContractFR147', 'FR147 governance predecessor'],
  ['getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151', 'FR151 review predecessor'],
  ["sessionAssignmentAuthority !== 'study_operator_declared_not_independently_verified'", 'operator-declared FR147 boundary'],
  ['minimumQualifyingSessionCount: 2', 'two-session minimum'],
  ['protocolFrozenBeforeQualifyingCaptureExecution: true', 'prospective protocol freeze'],
  ['eachQualifyingSessionRequiresNewCaptureEvent: true', 'new capture-event requirement'],
  ['eachQualifyingSessionRequiresExternalOrOperatorIndependentWitness: true', 'independent witness requirement'],
  ['witnessArtifactByteVerificationRequired: true', 'witness byte verification'],
  ['witnessAuthorityTrustBindingRequired: true', 'witness trust binding'],
  ['captureToWitnessBindingRequired: true', 'capture-to-witness binding'],
  ['sessionSeparationMustBeVerifiedByAdmissionBoundary: true', 'session separation verification'],
  ['distinctStudyLocalSessionRefsMeanIndependentSessions: false', 'opaque session refs insufficient'],
  ['byteDistinctnessMeansIndependentCaptureEvents: false', 'byte distinctness insufficient'],
  ['uploadTimeMeansCaptureTime: false', 'upload time insufficient'],
  ['separateChatAttachmentsMeanSeparateCaptureSessions: false', 'chat attachment separation insufficient'],
  ['historicalFR146CapturesAutoEligibleForIndependentSessionAdmission: false', 'historical auto-admission forbidden'],
  ['retrospectiveSessionRelabelingAllowed: false', 'retrospective relabeling forbidden'],
  ['studyOperatorSelfAttestationAloneAccepted: false', 'self-attestation insufficient'],
  ['suppliedWitnessPublicKeyMeansPinnedTrustRoot: false', 'caller key insufficient'],
  ['mathematicalSignatureValidityAloneMeansTrustedWitnessIdentity: false', 'signature validity insufficient'],
  ['productionWitnessVerificationAlgorithm: null', 'witness algorithm unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'trust root unresolved'],
  ['independentSessionEvidenceCanBeAdmittedByThisArtifact: false', 'FR152 non-admission'],
  ['acquisitionProtocolFrozen: true', 'protocol frozen authority'],
  ['independentMultiSessionEvidenceAcquired: false', 'session evidence not acquired'],
  ['independentMultiSessionEvidenceAdmitted: false', 'session evidence not admitted'],
  ['multiSessionIndependenceVerified: false', 'session independence unresolved'],
  ['captureQualityMeasurementConstructValidated: false', 'construct unresolved'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability numeric threshold closed'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_prospective_independent_multi_session_capture_execution_and_external_witness_verification_before_candidate_construct_validation_decision', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['freezes a prospective two-session minimum without admitting historical session refs', 'prospective minimum test'],
  ['requires external or operator-independent witness evidence and explicit capture binding', 'witness requirement test'],
  ['enumerates insufficient evidence so opaque refs, bytes, metadata, uploads, and self-attestation cannot promote independence', 'insufficiency test'],
  ['keeps witness trust unresolved until a governed verifier and pinned trust binding exist', 'trust boundary test'],
  ['preserves privacy and all capture-quality, construct, repeatability, and semantic authority gates', 'authority/privacy test'],
  ['rejects a copied protocol object at the issued-object boundary', 'issued-object test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['Historical FR146 A/B must not be retroactively relabeled as independent sessions.', 'historical session non-relabeling'],
  ['A caller-supplied witness ref is not a trusted witness.', 'witness trust caution'],
  ['FR152 cannot admit independent session evidence by itself.', 'non-admission boundary'],
  ['Synthetic tests can prove that the protocol object and fail-closed boundaries behave deterministically.', 'synthetic test boundary'],
  ['That next frontier requires real prospective acquisition.', 'real acquisition blocker'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['independentMultiSessionEvidenceAcquired: true', 'session acquisition promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'session admission promotion'],
  ['multiSessionIndependenceVerified: true', 'session independence promotion'],
  ['empiricalPerturbationValidationPerformed: true', 'perturbation validation promotion'],
  ['captureQualityMeasurementConstructValidated: true', 'construct promotion'],
  ['captureQualityThresholdsDefined: true', 'threshold promotion'],
  ['captureQualityValidated: true', 'quality promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'provider persistence'],
  ['rawPixelRasterPersisted: true', 'raw raster persistence'],
  ['sourceDigestPersisted: true', 'digest persistence'],
  ['sourceDigestReturned: true', 'digest return'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity-template persistence'],
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

stdout.write('FR152_INDEPENDENT_MULTI_SESSION_EVIDENCE_ACQUISITION_PROTOCOL: PASS\n');
