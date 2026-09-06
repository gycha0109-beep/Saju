import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-witness-signature-mechanical-verification-fr154.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-witness-signature-mechanical-verification-fr154.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr154-square-broad-fang-witness-signature-mechanical-verification.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR154 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR154 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153', 'issued FR153 predecessor'],
  ['getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153', 'FR153 contract predecessor'],
  ["researchSignatureVerificationPrimitive: 'ed25519_node_crypto_v1'", 'research Ed25519 primitive'],
  ['signerPublicKeySpkiDigestSelfConsistencyRequired: true', 'SPKI self consistency'],
  ['detachedSignatureMathematicalVerificationRequired: true', 'detached signature verification'],
  ['allCandidateSessionsCryptographicallyVerified: true', 'complete cryptographic coverage'],
  ['callerSuppliedSignerKeyRefMeansTrustedSigner: false', 'caller key ref not trusted'],
  ['callerSuppliedPublicKeyMeansPinnedTrustRoot: false', 'caller key not trust root'],
  ['mathematicalSignatureValidityMeansTrustedWitnessIdentity: false', 'signature not witness identity'],
  ['mathematicalSignatureValidityMeansWitnessClaimTrue: false', 'signature not claim truth'],
  ['mathematicalSignatureValidityMeansCaptureExecutionVerified: false', 'signature not capture verification'],
  ['mathematicalSignatureValidityMeansSessionSeparationVerified: false', 'signature not session separation'],
  ['mathematicalSignatureValidityMeansCaptureToWitnessBindingVerified: false', 'signature not capture-witness binding'],
  ['mathematicalSignatureValidityMeansIndependentSessionEvidenceAdmitted: false', 'signature not session admission'],
  ['productionWitnessVerificationAlgorithm: null', 'production algorithm unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'trust root unresolved'],
  ['signerKeyTrustEstablished: false', 'signer trust unresolved'],
  ['witnessAuthorityTrustBound: false', 'witness authority trust unresolved'],
  ['externalWitnessIdentityVerified: false', 'witness identity unresolved'],
  ['witnessClassVerified: false', 'witness class unresolved'],
  ['witnessArtifactSemanticContentVerified: false', 'witness semantics unresolved'],
  ['independentSessionEvidenceCanBeAdmittedByThisArtifact: false', 'FR154 non-admission'],
  ['mechanicalWitnessSignatureVerificationPerformed: true', 'mechanical verification authority'],
  ['independentMultiSessionEvidenceAcquired: false', 'session evidence not acquired'],
  ['independentMultiSessionEvidenceAdmitted: false', 'session evidence not admitted'],
  ['multiSessionIndependenceVerified: false', 'session independence unresolved'],
  ['empiricalPerturbationValidationPerformed: false', 'perturbation validation closed'],
  ['captureQualityMeasurementConstructValidated: false', 'construct validation closed'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality validation closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality threshold null'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold null'],
  ['rawImageAcceptedByThisArtifact: false', 'raw image input closed'],
  ['sourceDigestAcceptedByThisArtifact: false', 'source digest input closed'],
  ['signerPublicKeyPemPersisted: false', 'public key PEM not retained'],
  ['detachedSignatureBytesPersisted: false', 'signature bytes not retained'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_governed_witness_trust_evidence_intake_and_trust_root_binding_plus_prospective_source_backed_capture_execution_before_independent_session_admission', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['defines a research Ed25519 mechanical verifier without witness trust or admission authority', 'contract test'],
  ['builds deterministic bounded payloads and mathematically verifies synthetic signatures', 'positive verification test'],
  ['keeps mathematical signature validity distinct from witness identity, trust, claim truth, and session independence', 'trust distinction test'],
  ['preserves empirical, construct, threshold, repeatability, privacy, and semantic authority gates', 'authority test'],
  ['rejects a mismatched declared SPKI digest', 'SPKI mismatch test'],
  ['rejects a detached signature that does not verify over the canonical payload', 'signature mismatch test'],
  ['rejects incomplete coverage, duplicate session coordinates, copied predecessors, and copied outputs', 'coverage and issuance test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['research mechanical signature verification only', 'scope statement'],
  ['This is **mechanical cryptographic verification**, not witness authentication.', 'mechanics not authentication'],
  ['A caller cannot create witness authority merely by generating a keypair and producing a mathematically correct signature.', 'caller authority warning'],
  ['Mechanical signatures produced now over historical references would still not create prospective independent-session provenance.', 'historical non-promotion'],
  ['Passing these tests demonstrates deterministic cryptographic mechanics only.', 'synthetic test boundary'],
  ['The next repo/design frontier is governed witness trust evidence and trust-root binding.', 'trust frontier'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['signerKeyTrustEstablished: true', 'signer trust promotion'],
  ['witnessAuthorityTrustBound: true', 'witness trust promotion'],
  ['externalWitnessIdentityVerified: true', 'witness identity promotion'],
  ['witnessClassVerified: true', 'witness class promotion'],
  ['witnessArtifactSemanticContentVerified: true', 'witness semantics promotion'],
  ['independentMultiSessionEvidenceAcquired: true', 'session evidence acquisition promotion'],
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
  ['rawAggregatePersisted: true', 'raw aggregate persistence'],
  ['sourceDigestPersisted: true', 'source digest persistence'],
  ['sourceDigestReturned: true', 'source digest return'],
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

stdout.write('FR154_WITNESS_SIGNATURE_MECHANICAL_VERIFICATION: PASS\n');
