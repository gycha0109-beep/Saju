import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-witness-trust-evidence-intake-fr155.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-witness-trust-evidence-intake-fr155.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr155-square-broad-fang-witness-trust-evidence-intake.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR155 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR155 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154', 'issued FR154 predecessor'],
  ['getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154', 'FR154 contract predecessor'],
  ['exactFR154VerificationCoverageRequired: true', 'exact FR154 coverage'],
  ['exactSignerCoordinateMatchRequired: true', 'exact signer coordinate matching'],
  ['trustEvidenceArtifactBytesRequiredAtIntake: true', 'trust evidence bytes required'],
  ['trustEvidenceArtifactDeclaredDigestExactMatchRequired: true', 'trust evidence digest match'],
  ['trustEvidenceArtifactBytesRetainedInOutput: false', 'trust evidence bytes not retained'],
  ['trustEvidenceByteIdentityVerifiedForEveryEntry: true', 'candidate byte identity verified'],
  ['candidateTrustEvidenceBundleMaterialized: true', 'bounded candidate bundle materialized'],
  ['callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer: false', 'caller issuer ref not trusted'],
  ['trustEvidenceByteDigestMatchMeansSemanticContentVerified: false', 'byte match not semantic verification'],
  ['trustEvidenceByteDigestMatchMeansSignerTrustEstablished: false', 'byte match not signer trust'],
  ['exactFR154SignerCoordinateMatchMeansSignerTrustEstablished: false', 'coordinate match not signer trust'],
  ['bindingClaimRefMeansBindingVerified: false', 'claim ref not binding verification'],
  ['trustEvidenceIssuerIdentityVerified: false', 'issuer identity unresolved'],
  ['trustEvidenceIssuerTrusted: false', 'issuer trust unresolved'],
  ['trustEvidenceSemanticContentVerified: false', 'semantic trust evidence unresolved'],
  ['signerToWitnessAuthorityBindingVerified: false', 'signer witness binding unresolved'],
  ['signerKeyTrustEstablished: false', 'signer trust unresolved'],
  ['witnessAuthorityTrustBound: false', 'witness authority trust unresolved'],
  ['externalWitnessIdentityVerified: false', 'external witness identity unresolved'],
  ['productionWitnessVerificationAlgorithm: null', 'production witness verifier unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'trust root unresolved'],
  ['governedWitnessTrustRootEstablished: false', 'governed trust root unresolved'],
  ['independentSessionEvidenceCanBeAdmittedByThisArtifact: false', 'FR155 non-admission'],
  ['candidateWitnessTrustEvidenceIntakePerformed: true', 'candidate trust intake performed'],
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
  ['trustEvidenceArtifactBytesPersistedInOutput: false', 'trust evidence bytes not persisted'],
  ['trustEvidenceArtifactDigestPersisted: true', 'bounded trust artifact digest retained'],
  ['signerPublicKeyPemPersisted: false', 'public key PEM not retained'],
  ['detachedSignatureBytesPersisted: false', 'detached signature bytes not retained'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_external_witness_trust_root_provisioning_and_semantic_trust_evidence_verification_plus_prospective_capture_execution_before_independent_session_admission', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['defines candidate trust-evidence intake without trust-root or independent-session admission authority', 'contract test'],
  ['verifies candidate trust-evidence byte identities and binds them to exact FR154 signer coordinates', 'positive intake test'],
  ['keeps candidate trust evidence distinct from issuer identity, signer trust, witness trust, and semantic verification', 'trust distinction test'],
  ['preserves empirical, construct, threshold, repeatability, privacy, and semantic authority gates', 'authority test'],
  ['rejects trust-evidence byte digest mismatches and signer/witness coordinate mismatches', 'negative byte and coordinate test'],
  ['rejects incomplete coverage, duplicate evidence refs, copied predecessors, and copied outputs', 'coverage and issuance test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['candidate witness trust-evidence intake', 'scope statement'],
  ['Byte identity is not semantic authentication. Coordinate consistency is not trust. A claim reference is not a verified claim.', 'trust caution'],
  ['FR155 does not retroactively promote historical captures into independent sessions.', 'historical non-promotion'],
  ['Synthetic tests can demonstrate deterministic byte-identity checks', 'synthetic test boundary'],
  ['Advancing beyond candidate trust-evidence intake requires external governed trust-root material and semantic verification rules', 'external trust frontier'],
  ['genuinely new source-backed prospective captures executed under the frozen FR152 acquisition protocol are still required', 'prospective capture blocker'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['trustEvidenceIssuerIdentityVerified: true', 'issuer identity promotion'],
  ['trustEvidenceIssuerTrusted: true', 'issuer trust promotion'],
  ['trustEvidenceSemanticContentVerified: true', 'semantic verification promotion'],
  ['signerToWitnessAuthorityBindingVerified: true', 'signer-witness binding promotion'],
  ['signerKeyTrustEstablished: true', 'signer trust promotion'],
  ['witnessAuthorityTrustBound: true', 'witness authority trust promotion'],
  ['externalWitnessIdentityVerified: true', 'witness identity promotion'],
  ['governedWitnessTrustRootEstablished: true', 'trust root promotion'],
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
  ['trustEvidenceArtifactBytesPersistedInOutput: true', 'trust evidence byte persistence'],
  ['signerPublicKeyPemPersisted: true', 'public key PEM persistence'],
  ['detachedSignatureBytesPersisted: true', 'signature byte persistence'],
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

stdout.write('FR155_WITNESS_TRUST_EVIDENCE_INTAKE: PASS\n');