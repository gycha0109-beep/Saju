import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-external-trust-root-material-intake-fr157.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-external-trust-root-material-intake-fr157.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr157-square-broad-fang-external-trust-root-material-intake.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR157 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR157 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156', 'issued FR156 predecessor'],
  ['getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156', 'FR156 contract predecessor'],
  ['trustRootArtifactDeclaredDigestExactMatchRequired: true', 'exact byte identity'],
  ['trustRootArtifactBytesRetainedInOutput: false', 'artifact bytes not retained'],
  ['callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false', 'authority ref not identity'],
  ['trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false', 'byte identity not semantics'],
  ['trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned: false', 'byte identity not root provisioning'],
  ['opaquePolicyRefMeansPolicyVerified: false', 'opaque policy refs not verified'],
  ['semanticVerifierRefMeansGovernedVerifier: false', 'verifier ref not governed verifier'],
  ['externalKeyPinningEvidenceRefMeansKeyPinned: false', 'pinning ref not key pin'],
  ['candidateExternalTrustRootMaterialIntakePerformed: true', 'candidate intake authority'],
  ['externalTrustRootMaterializationPerformed: false', 'external root materialization closed'],
  ['externalTrustRootProvisioned: false', 'external root provisioning closed'],
  ['governedWitnessTrustRootEstablished: false', 'governed root closed'],
  ['trustRootAuthorityIdentityVerified: false', 'authority identity unresolved'],
  ['trustRootArtifactSemanticContentVerified: false', 'root semantics unresolved'],
  ['trustRootKeyPinnedByExternalGovernance: false', 'external key pinning unresolved'],
  ['semanticTrustEvidenceVerificationPerformed: false', 'semantic trust verification unresolved'],
  ['productionWitnessVerificationAlgorithm: null', 'production algorithm unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'pinned root unresolved'],
  ['signerKeyTrustEstablished: false', 'signer trust unresolved'],
  ['witnessAuthorityTrustBound: false', 'witness trust unresolved'],
  ['externalWitnessIdentityVerified: false', 'external witness identity unresolved'],
  ['independentMultiSessionEvidenceAcquired: false', 'session evidence not acquired'],
  ['independentMultiSessionEvidenceAdmitted: false', 'session evidence not admitted'],
  ['multiSessionIndependenceVerified: false', 'session independence unresolved'],
  ['captureQualityMeasurementConstructValidated: false', 'construct validation closed'],
  ['captureQualityThresholdsDefined: false', 'quality thresholds closed'],
  ['captureQualityValidated: false', 'quality validation closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality threshold null'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold null'],
  ['rawImageAcceptedByThisArtifact: false', 'raw image closed'],
  ['sourceDigestAcceptedByThisArtifact: false', 'source digest closed'],
  ['trustRootArtifactBytesPersistedInOutput: false', 'trust-root bytes not persisted'],
  ['signerPublicKeyPemAcceptedByThisArtifact: false', 'signer PEM input closed'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_external_governance_authority_identity_trust_root_semantic_verification_and_key_pinning_plus_real_prospective_session_acquisition_before_trust_or_independent_session_admission', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['defines candidate material intake without external trust-root or independent-session authority', 'contract test'],
  ['verifies synthetic candidate artifact byte identity while retaining only bounded coordinates and digests', 'positive intake test'],
  ['keeps byte identity and opaque references distinct from authority identity, semantic verification, key pinning, and trust', 'trust distinction test'],
  ['preserves empirical, construct, threshold, repeatability, privacy, and traditional-semantic authority gates', 'authority test'],
  ['rejects a mismatched declared artifact digest', 'digest mismatch test'],
  ['rejects copied predecessors, unknown request fields, and copied outputs', 'issuance and schema test'],
  ['rejects empty, oversized, or malformed candidate material', 'bounded input test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['Candidate external trust-root material byte intake only.', 'scope statement'],
  ['Matching bytes to a declared digest answers only a mechanical question', 'byte identity boundary'],
  ['Synthetic fixtures do not provision a trust root', 'synthetic non-authority'],
  ['external governance authority identity verification, semantic trust-root verification, and externally governed key pinning', 'next governance frontier'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['externalTrustRootMaterializationPerformed: true', 'external root materialization promotion'],
  ['externalTrustRootProvisioned: true', 'external root provisioning promotion'],
  ['governedWitnessTrustRootEstablished: true', 'governed root promotion'],
  ['trustRootAuthorityIdentityVerified: true', 'authority identity promotion'],
  ['trustRootArtifactSemanticContentVerified: true', 'semantic root promotion'],
  ['trustRootKeyPinnedByExternalGovernance: true', 'key pinning promotion'],
  ['semanticTrustEvidenceVerificationPerformed: true', 'semantic verifier promotion'],
  ['signerKeyTrustEstablished: true', 'signer trust promotion'],
  ['witnessAuthorityTrustBound: true', 'witness trust promotion'],
  ['externalWitnessIdentityVerified: true', 'witness identity promotion'],
  ['independentMultiSessionEvidenceAcquired: true', 'session acquisition promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'session admission promotion'],
  ['multiSessionIndependenceVerified: true', 'session independence promotion'],
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
  ['signerPublicKeyPemPersisted: true', 'signer PEM persistence'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
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

stdout.write('FR157_EXTERNAL_TRUST_ROOT_MATERIAL_INTAKE: PASS\n');
