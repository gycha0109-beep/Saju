import { createHash } from 'node:crypto';
import {
  FR167_NEXT_FRONTIER,
  assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167,
  type EyePairExternalSessionProvenanceTrustRequirementsFR167V1,
} from './eye-pair-external-session-provenance-trust-requirements-fr167.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR168_EYE_PAIR_EXTERNAL_TRUST_ROOT_CANDIDATE_MATERIAL_INTAKE_RECORD_ID =
  'research.face_reading.neutral.eye_pair.external_trust_root_candidate_material_intake.fr168' as const;
export const FR168_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr168-eye-pair-external-trust-root-candidate-material-intake.md' as const;
export const FR168_NEXT_FRONTIER =
  'verify_eye_pair_external_governance_authority_semantic_trust_root_scope_and_key_pinning_before_authority_promotable_session_collection' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const MAX_TRUST_ROOT_ARTIFACT_BYTES = 1024 * 1024;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr167Requirements', 'candidate']);
const CANDIDATE_KEYS = new Set([
  'trustRootCandidateRef',
  'trustRootAuthorityRef',
  'trustRootArtifactRef',
  'trustRootClassClaim',
  'declaredTrustRootArtifactDigest',
  'trustRootArtifactBytes',
  'trustRootPolicyRef',
  'trustRootValidityPolicyRef',
  'trustRootRevocationStatusPolicyRef',
  'signerChainPolicyRef',
  'semanticTrustEvidenceVerifierRef',
  'authorityIdentityEvidenceRef',
  'externalKeyPinningEvidenceRef',
  'eyePairCriterionScopeEvidenceRef',
  'witnessAuthorityScopeEvidenceRef',
  'prospectiveValidityBindingEvidenceRef',
  'captureToWitnessBindingPolicyRef',
]);
const ISSUED = new WeakSet<object>();

export interface EyePairExternalTrustRootCandidateMaterialFR168V1 {
  readonly trustRootCandidateRef: string;
  readonly trustRootAuthorityRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootClassClaim:
    'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified';
  readonly declaredTrustRootArtifactDigest: string;
  readonly trustRootArtifactBytes: Uint8Array;
  readonly trustRootPolicyRef: string;
  readonly trustRootValidityPolicyRef: string;
  readonly trustRootRevocationStatusPolicyRef: string;
  readonly signerChainPolicyRef: string;
  readonly semanticTrustEvidenceVerifierRef: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly eyePairCriterionScopeEvidenceRef: string;
  readonly witnessAuthorityScopeEvidenceRef: string;
  readonly prospectiveValidityBindingEvidenceRef: string;
  readonly captureToWitnessBindingPolicyRef: string;
}

export interface EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1 {
  readonly schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1';
  readonly fr167Requirements: EyePairExternalSessionProvenanceTrustRequirementsFR167V1;
  readonly candidate: EyePairExternalTrustRootCandidateMaterialFR168V1;
}

export interface EyePairExternalTrustRootCandidateMaterialRecordFR168V1 {
  readonly trustRootCandidateRef: string;
  readonly trustRootAuthorityRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootClassClaim:
    'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified';
  readonly trustRootArtifactDigest: string;
  readonly trustRootArtifactBytesVerifiedAtIntake: true;
  readonly trustRootPolicyRef: string;
  readonly trustRootValidityPolicyRef: string;
  readonly trustRootRevocationStatusPolicyRef: string;
  readonly signerChainPolicyRef: string;
  readonly semanticTrustEvidenceVerifierRef: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly eyePairCriterionScopeEvidenceRef: string;
  readonly witnessAuthorityScopeEvidenceRef: string;
  readonly prospectiveValidityBindingEvidenceRef: string;
  readonly captureToWitnessBindingPolicyRef: string;
  readonly trustRootAuthorityIdentityVerified: false;
  readonly trustRootArtifactSemanticContentVerified: false;
  readonly trustRootKeyPinnedByExternalGovernance: false;
  readonly trustRootValidityPolicyVerified: false;
  readonly trustRootRevocationStatusVerified: false;
  readonly signerChainPolicyVerified: false;
  readonly semanticTrustEvidenceVerifierGoverned: false;
  readonly eyePairCriterionScopeVerified: false;
  readonly witnessAuthorityScopeVerified: false;
  readonly prospectiveValidityBindingVerified: false;
  readonly captureToWitnessBindingVerified: false;
  readonly externalTrustRootProvisioned: false;
}

export interface EyePairExternalTrustRootCandidateMaterialIntakeFR168V1 {
  readonly schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR168_EYE_PAIR_EXTERNAL_TRUST_ROOT_CANDIDATE_MATERIAL_INTAKE_RECORD_ID;
  readonly authorityState:
    'eye_pair_candidate_external_trust_root_artifact_byte_identity_verified_no_external_authority_semantics_scope_key_pinning_or_trust';
  readonly predecessor: {
    readonly fr167NextFrontier: typeof FR167_NEXT_FRONTIER;
    readonly issuedFR167RequirementsRequired: true;
    readonly fr167RequirementsFrozen: true;
    readonly fr167ActualTrustRootProvisioned: false;
    readonly fr167ExternalWitnessAuthorityEstablished: false;
    readonly fr167IndependentSessionEvidenceAdmitted: false;
    readonly fr167ExistingSessionsRetrospectivelyPromotable: false;
  };
  readonly candidateMaterial: EyePairExternalTrustRootCandidateMaterialRecordFR168V1;
  readonly candidateMaterialDigest: string;
  readonly intakeBoundary: {
    readonly issuedFR167RequirementsRequired: true;
    readonly candidateMaterialPresent: true;
    readonly trustRootArtifactBytesRequiredAtIntake: true;
    readonly trustRootArtifactDeclaredDigestExactMatchRequired: true;
    readonly trustRootArtifactBytesRetainedInOutput: false;
    readonly trustRootArtifactByteIdentityVerified: true;
    readonly candidateMaterialCoordinateDigestMaterialized: true;
    readonly candidateTrustRootFormatSemanticallyParsed: false;
    readonly candidateKeyFormatSupportEstablished: false;
    readonly candidateScopeCompatibilityVerified: false;
    readonly callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false;
    readonly callerSuppliedAuthorityIdentityEvidenceRefMeansAuthorityIdentityVerified: false;
    readonly trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false;
    readonly trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned: false;
    readonly opaquePolicyRefMeansPolicyVerified: false;
    readonly semanticVerifierRefMeansGovernedVerifier: false;
    readonly externalKeyPinningEvidenceRefMeansKeyPinned: false;
    readonly eyePairScopeEvidenceRefMeansScopeVerified: false;
    readonly witnessAuthorityScopeEvidenceRefMeansScopeVerified: false;
    readonly prospectiveValidityBindingEvidenceRefMeansBindingVerified: false;
    readonly captureToWitnessBindingPolicyRefMeansBindingVerified: false;
  };
  readonly trustBoundary: {
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly actualTrustRootProvisioned: false;
    readonly governedWitnessTrustRootEstablished: false;
    readonly trustRootAuthorityIdentityVerified: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly trustRootKeyPinnedByExternalGovernance: false;
    readonly trustRootValidityPolicyVerified: false;
    readonly trustRootRevocationStatusVerified: false;
    readonly signerChainPolicyVerified: false;
    readonly semanticTrustEvidenceVerifierGoverned: false;
    readonly semanticTrustEvidenceVerificationPerformed: false;
    readonly eyePairCriterionScopeVerified: false;
    readonly witnessAuthorityScopeVerified: false;
    readonly prospectiveValidityBindingVerified: false;
    readonly captureToWitnessBindingVerified: false;
    readonly signerKeyTrustEstablished: false;
    readonly witnessAuthorityTrustBound: false;
    readonly externalWitnessAuthorityEstablished: false;
    readonly actualWitnessCredentialAdmitted: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly prospectiveCollectionBoundary: {
    readonly existingFR163ToFR165SessionsRetrospectivelyPromotable: false;
    readonly newParticipantCaptureRequiredForCandidateMaterialIntake: false;
    readonly authorityPromotableCaptureAllowedAfterCandidateIntakeAlone: false;
    readonly candidateIntakeMayBeCompletedWithoutParticipantMaterial: true;
  };
  readonly authorityBoundary: {
    readonly candidateExternalTrustRootMaterialIntakePerformed: true;
    readonly actualTrustRootProvisioned: false;
    readonly actualWitnessCredentialAdmitted: false;
    readonly externalWitnessAuthorityEstablished: false;
    readonly independentSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityValidated: false;
    readonly inferentialStatisticIssued: false;
    readonly repeatabilityPassFailIssued: false;
    readonly captureSensitivityPassFailIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly traditionalSemanticAuthority: false;
  };
  readonly privacyBoundary: {
    readonly rawImageAccepted: false;
    readonly participantDerivedNumericMetricInputAccepted: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly participantDerivedNumericMetricValuesPersisted: false;
    readonly sourceDigestAccepted: false;
    readonly sourceDigestPersisted: false;
    readonly trustRootArtifactBytesAcceptedAtIntake: true;
    readonly trustRootArtifactBytesPersistedInOutput: false;
    readonly trustRootArtifactDigestPersisted: true;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR168_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR168_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-168 ${message}`);
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const actual = Object.keys(value);
  if (actual.length !== allowed.size || actual.some((key) => !allowed.has(key))) {
    fail(`${label} must contain exactly the declared fields.`);
  }
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference without whitespace.`);
  }
  return value;
}

function canonicalDigest(value: string, label: string): string {
  if (typeof value !== 'string' || !SHA256.test(value)) {
    fail(`${label} must use canonical lowercase sha256:<64-hex> form.`);
  }
  return value;
}

function digestBytes(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function digestText(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function validatePredecessor(
  requirements: EyePairExternalSessionProvenanceTrustRequirementsFR167V1,
): void {
  assertIssuedEyePairExternalSessionProvenanceTrustRequirementsFR167(requirements);
  if (
    requirements.nextFrontier !== FR167_NEXT_FRONTIER
    || requirements.authorityBoundary.requirementsFrozen !== true
    || requirements.authorityBoundary.actualTrustRootProvisioned !== false
    || requirements.authorityBoundary.actualWitnessCredentialAdmitted !== false
    || requirements.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || requirements.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || requirements.authorityBoundary.multiSessionIndependenceVerified !== false
    || requirements.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || requirements.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed !== false
    || requirements.insufficiencyBoundary.candidateTrustRootMaterialIntakeMeansTrustedAuthority !== false
    || requirements.precedentBoundary.squareBroadFangAuthorityInheritedByEyePair !== false
    || requirements.precedentBoundary.crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed !== false
    || requirements.authorityBoundary.identityMatchingPerformed !== false
    || requirements.authorityBoundary.biometricTemplateIssued !== false
    || requirements.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-167 predecessor widened trust, prospective, identity, biometric, or semantic authority.');
}

function validateCandidate(
  candidate: EyePairExternalTrustRootCandidateMaterialFR168V1,
): EyePairExternalTrustRootCandidateMaterialRecordFR168V1 {
  if (typeof candidate !== 'object' || candidate === null) fail('candidate must be an object.');
  exactKeys(candidate, CANDIDATE_KEYS, 'candidate');

  opaqueRef(candidate.trustRootCandidateRef, 'candidate trustRootCandidateRef');
  opaqueRef(candidate.trustRootAuthorityRef, 'candidate trustRootAuthorityRef');
  opaqueRef(candidate.trustRootArtifactRef, 'candidate trustRootArtifactRef');
  opaqueRef(candidate.trustRootPolicyRef, 'candidate trustRootPolicyRef');
  opaqueRef(candidate.trustRootValidityPolicyRef, 'candidate trustRootValidityPolicyRef');
  opaqueRef(candidate.trustRootRevocationStatusPolicyRef, 'candidate trustRootRevocationStatusPolicyRef');
  opaqueRef(candidate.signerChainPolicyRef, 'candidate signerChainPolicyRef');
  opaqueRef(candidate.semanticTrustEvidenceVerifierRef, 'candidate semanticTrustEvidenceVerifierRef');
  opaqueRef(candidate.authorityIdentityEvidenceRef, 'candidate authorityIdentityEvidenceRef');
  opaqueRef(candidate.externalKeyPinningEvidenceRef, 'candidate externalKeyPinningEvidenceRef');
  opaqueRef(candidate.eyePairCriterionScopeEvidenceRef, 'candidate eyePairCriterionScopeEvidenceRef');
  opaqueRef(candidate.witnessAuthorityScopeEvidenceRef, 'candidate witnessAuthorityScopeEvidenceRef');
  opaqueRef(candidate.prospectiveValidityBindingEvidenceRef, 'candidate prospectiveValidityBindingEvidenceRef');
  opaqueRef(candidate.captureToWitnessBindingPolicyRef, 'candidate captureToWitnessBindingPolicyRef');

  if (
    candidate.trustRootClassClaim !==
      'eye_pair_external_governance_trust_root_artifact_candidate_not_semantically_verified'
  ) fail('candidate trustRootClassClaim authority is unsupported.');

  canonicalDigest(candidate.declaredTrustRootArtifactDigest, 'candidate declaredTrustRootArtifactDigest');
  if (!(candidate.trustRootArtifactBytes instanceof Uint8Array)) {
    fail('candidate trustRootArtifactBytes must be Uint8Array evidence bytes.');
  }
  if (
    candidate.trustRootArtifactBytes.byteLength === 0
    || candidate.trustRootArtifactBytes.byteLength > MAX_TRUST_ROOT_ARTIFACT_BYTES
  ) {
    fail(`candidate trustRootArtifactBytes must be between 1 and ${MAX_TRUST_ROOT_ARTIFACT_BYTES} bytes.`);
  }
  const actualDigest = digestBytes(candidate.trustRootArtifactBytes);
  if (actualDigest !== candidate.declaredTrustRootArtifactDigest) {
    fail('candidate trust-root artifact byte digest mismatch.');
  }

  return Object.freeze({
    trustRootCandidateRef: candidate.trustRootCandidateRef,
    trustRootAuthorityRef: candidate.trustRootAuthorityRef,
    trustRootArtifactRef: candidate.trustRootArtifactRef,
    trustRootClassClaim: candidate.trustRootClassClaim,
    trustRootArtifactDigest: actualDigest,
    trustRootArtifactBytesVerifiedAtIntake: true as const,
    trustRootPolicyRef: candidate.trustRootPolicyRef,
    trustRootValidityPolicyRef: candidate.trustRootValidityPolicyRef,
    trustRootRevocationStatusPolicyRef: candidate.trustRootRevocationStatusPolicyRef,
    signerChainPolicyRef: candidate.signerChainPolicyRef,
    semanticTrustEvidenceVerifierRef: candidate.semanticTrustEvidenceVerifierRef,
    authorityIdentityEvidenceRef: candidate.authorityIdentityEvidenceRef,
    externalKeyPinningEvidenceRef: candidate.externalKeyPinningEvidenceRef,
    eyePairCriterionScopeEvidenceRef: candidate.eyePairCriterionScopeEvidenceRef,
    witnessAuthorityScopeEvidenceRef: candidate.witnessAuthorityScopeEvidenceRef,
    prospectiveValidityBindingEvidenceRef: candidate.prospectiveValidityBindingEvidenceRef,
    captureToWitnessBindingPolicyRef: candidate.captureToWitnessBindingPolicyRef,
    trustRootAuthorityIdentityVerified: false as const,
    trustRootArtifactSemanticContentVerified: false as const,
    trustRootKeyPinnedByExternalGovernance: false as const,
    trustRootValidityPolicyVerified: false as const,
    trustRootRevocationStatusVerified: false as const,
    signerChainPolicyVerified: false as const,
    semanticTrustEvidenceVerifierGoverned: false as const,
    eyePairCriterionScopeVerified: false as const,
    witnessAuthorityScopeVerified: false as const,
    prospectiveValidityBindingVerified: false as const,
    captureToWitnessBindingVerified: false as const,
    externalTrustRootProvisioned: false as const,
  });
}

function coordinateDigest(candidate: EyePairExternalTrustRootCandidateMaterialRecordFR168V1): string {
  return digestText([
    candidate.trustRootCandidateRef,
    candidate.trustRootAuthorityRef,
    candidate.trustRootArtifactRef,
    candidate.trustRootClassClaim,
    candidate.trustRootArtifactDigest,
    candidate.trustRootPolicyRef,
    candidate.trustRootValidityPolicyRef,
    candidate.trustRootRevocationStatusPolicyRef,
    candidate.signerChainPolicyRef,
    candidate.semanticTrustEvidenceVerifierRef,
    candidate.authorityIdentityEvidenceRef,
    candidate.externalKeyPinningEvidenceRef,
    candidate.eyePairCriterionScopeEvidenceRef,
    candidate.witnessAuthorityScopeEvidenceRef,
    candidate.prospectiveValidityBindingEvidenceRef,
    candidate.captureToWitnessBindingPolicyRef,
  ].join('|'));
}

export function computeEyePairExternalTrustRootArtifactDigestFR168(bytes: Uint8Array): string {
  if (!(bytes instanceof Uint8Array)) fail('trust-root artifact bytes must be Uint8Array evidence bytes.');
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_TRUST_ROOT_ARTIFACT_BYTES) {
    fail(`trust-root artifact bytes must be between 1 and ${MAX_TRUST_ROOT_ARTIFACT_BYTES} bytes.`);
  }
  return digestBytes(bytes);
}

export function getEyePairExternalTrustRootCandidateMaterialIntakeContractFR168() {
  return Object.freeze({
    issuedFR167RequirementsRequired: true as const,
    candidateMaterialPresentRequired: true as const,
    trustRootArtifactBytesRequiredAtIntake: true as const,
    trustRootArtifactDeclaredDigestExactMatchRequired: true as const,
    trustRootArtifactBytesRetainedInOutput: false as const,
    candidateTrustRootFormatSemanticallyParsedByThisArtifact: false as const,
    candidateKeyFormatSupportEstablishedByThisArtifact: false as const,
    candidateScopeCompatibilityVerifiedByThisArtifact: false as const,
    callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false as const,
    byteDigestMatchMeansSemanticContentVerified: false as const,
    byteDigestMatchMeansExternalTrustRootProvisioned: false as const,
    opaquePolicyRefMeansPolicyVerified: false as const,
    semanticVerifierRefMeansGovernedVerifier: false as const,
    externalKeyPinningEvidenceRefMeansKeyPinned: false as const,
    eyePairScopeEvidenceRefMeansScopeVerified: false as const,
    witnessAuthorityScopeEvidenceRefMeansScopeVerified: false as const,
    prospectiveValidityBindingEvidenceRefMeansBindingVerified: false as const,
    captureToWitnessBindingPolicyRefMeansBindingVerified: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    actualTrustRootProvisionedByThisArtifact: false as const,
    externalWitnessAuthorityEstablishedByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    repeatabilityAuthorityEstablishedByThisArtifact: false as const,
    nextFrontier: FR168_NEXT_FRONTIER,
  });
}

export function materializeEyePairExternalTrustRootCandidateMaterialIntakeFR168(
  request: EyePairExternalTrustRootCandidateMaterialIntakeRequestFR168V1,
): EyePairExternalTrustRootCandidateMaterialIntakeFR168V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr168-eye-pair-external-trust-root-candidate-material-intake-request-v1') {
    fail('unsupported request schema version.');
  }
  validatePredecessor(request.fr167Requirements);
  const candidateMaterial = validateCandidate(request.candidate);

  const result: EyePairExternalTrustRootCandidateMaterialIntakeFR168V1 = Object.freeze({
    schemaVersion: 'fr168-eye-pair-external-trust-root-candidate-material-intake-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR168_EYE_PAIR_EXTERNAL_TRUST_ROOT_CANDIDATE_MATERIAL_INTAKE_RECORD_ID,
    authorityState:
      'eye_pair_candidate_external_trust_root_artifact_byte_identity_verified_no_external_authority_semantics_scope_key_pinning_or_trust' as const,
    predecessor: Object.freeze({
      fr167NextFrontier: FR167_NEXT_FRONTIER,
      issuedFR167RequirementsRequired: true as const,
      fr167RequirementsFrozen: true as const,
      fr167ActualTrustRootProvisioned: false as const,
      fr167ExternalWitnessAuthorityEstablished: false as const,
      fr167IndependentSessionEvidenceAdmitted: false as const,
      fr167ExistingSessionsRetrospectivelyPromotable: false as const,
    }),
    candidateMaterial,
    candidateMaterialDigest: coordinateDigest(candidateMaterial),
    intakeBoundary: Object.freeze({
      issuedFR167RequirementsRequired: true as const,
      candidateMaterialPresent: true as const,
      trustRootArtifactBytesRequiredAtIntake: true as const,
      trustRootArtifactDeclaredDigestExactMatchRequired: true as const,
      trustRootArtifactBytesRetainedInOutput: false as const,
      trustRootArtifactByteIdentityVerified: true as const,
      candidateMaterialCoordinateDigestMaterialized: true as const,
      candidateTrustRootFormatSemanticallyParsed: false as const,
      candidateKeyFormatSupportEstablished: false as const,
      candidateScopeCompatibilityVerified: false as const,
      callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false as const,
      callerSuppliedAuthorityIdentityEvidenceRefMeansAuthorityIdentityVerified: false as const,
      trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false as const,
      trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned: false as const,
      opaquePolicyRefMeansPolicyVerified: false as const,
      semanticVerifierRefMeansGovernedVerifier: false as const,
      externalKeyPinningEvidenceRefMeansKeyPinned: false as const,
      eyePairScopeEvidenceRefMeansScopeVerified: false as const,
      witnessAuthorityScopeEvidenceRefMeansScopeVerified: false as const,
      prospectiveValidityBindingEvidenceRefMeansBindingVerified: false as const,
      captureToWitnessBindingPolicyRefMeansBindingVerified: false as const,
    }),
    trustBoundary: Object.freeze({
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      actualTrustRootProvisioned: false as const,
      governedWitnessTrustRootEstablished: false as const,
      trustRootAuthorityIdentityVerified: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      trustRootKeyPinnedByExternalGovernance: false as const,
      trustRootValidityPolicyVerified: false as const,
      trustRootRevocationStatusVerified: false as const,
      signerChainPolicyVerified: false as const,
      semanticTrustEvidenceVerifierGoverned: false as const,
      semanticTrustEvidenceVerificationPerformed: false as const,
      eyePairCriterionScopeVerified: false as const,
      witnessAuthorityScopeVerified: false as const,
      prospectiveValidityBindingVerified: false as const,
      captureToWitnessBindingVerified: false as const,
      signerKeyTrustEstablished: false as const,
      witnessAuthorityTrustBound: false as const,
      externalWitnessAuthorityEstablished: false as const,
      actualWitnessCredentialAdmitted: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    prospectiveCollectionBoundary: Object.freeze({
      existingFR163ToFR165SessionsRetrospectivelyPromotable: false as const,
      newParticipantCaptureRequiredForCandidateMaterialIntake: false as const,
      authorityPromotableCaptureAllowedAfterCandidateIntakeAlone: false as const,
      candidateIntakeMayBeCompletedWithoutParticipantMaterial: true as const,
    }),
    authorityBoundary: Object.freeze({
      candidateExternalTrustRootMaterialIntakePerformed: true as const,
      actualTrustRootProvisioned: false as const,
      actualWitnessCredentialAdmitted: false as const,
      externalWitnessAuthorityEstablished: false as const,
      independentSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      inferentialStatisticIssued: false as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageAccepted: false as const,
      participantDerivedNumericMetricInputAccepted: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      participantDerivedNumericMetricValuesPersisted: false as const,
      sourceDigestAccepted: false as const,
      sourceDigestPersisted: false as const,
      trustRootArtifactBytesAcceptedAtIntake: true as const,
      trustRootArtifactBytesPersistedInOutput: false as const,
      trustRootArtifactDigestPersisted: true as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR168_RESEARCH_NOTE_REF,
    nextFrontier: FR168_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168(
  result: EyePairExternalTrustRootCandidateMaterialIntakeFR168V1,
): void {
  if (!ISSUED.has(result)) fail('candidate material intake artifact was not issued by the active FR-168 boundary.');
  if (
    result.schemaVersion !== 'fr168-eye-pair-external-trust-root-candidate-material-intake-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR168_EYE_PAIR_EXTERNAL_TRUST_ROOT_CANDIDATE_MATERIAL_INTAKE_RECORD_ID
    || result.authorityState !== 'eye_pair_candidate_external_trust_root_artifact_byte_identity_verified_no_external_authority_semantics_scope_key_pinning_or_trust'
    || result.predecessor.fr167NextFrontier !== FR167_NEXT_FRONTIER
    || result.predecessor.issuedFR167RequirementsRequired !== true
    || result.predecessor.fr167RequirementsFrozen !== true
    || result.predecessor.fr167ActualTrustRootProvisioned !== false
    || result.predecessor.fr167ExternalWitnessAuthorityEstablished !== false
    || result.predecessor.fr167IndependentSessionEvidenceAdmitted !== false
    || result.predecessor.fr167ExistingSessionsRetrospectivelyPromotable !== false
    || result.intakeBoundary.candidateMaterialPresent !== true
    || result.intakeBoundary.trustRootArtifactByteIdentityVerified !== true
    || result.intakeBoundary.candidateMaterialCoordinateDigestMaterialized !== true
    || result.intakeBoundary.candidateTrustRootFormatSemanticallyParsed !== false
    || result.intakeBoundary.candidateKeyFormatSupportEstablished !== false
    || result.intakeBoundary.candidateScopeCompatibilityVerified !== false
    || result.candidateMaterial.externalTrustRootProvisioned !== false
    || result.candidateMaterial.eyePairCriterionScopeVerified !== false
    || result.candidateMaterial.witnessAuthorityScopeVerified !== false
    || result.candidateMaterial.prospectiveValidityBindingVerified !== false
    || result.candidateMaterial.captureToWitnessBindingVerified !== false
    || result.trustBoundary.actualTrustRootProvisioned !== false
    || result.trustBoundary.externalWitnessAuthorityEstablished !== false
    || result.trustBoundary.actualWitnessCredentialAdmitted !== false
    || result.trustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact !== false
    || result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || result.prospectiveCollectionBoundary.newParticipantCaptureRequiredForCandidateMaterialIntake !== false
    || result.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedAfterCandidateIntakeAlone !== false
    || result.prospectiveCollectionBoundary.candidateIntakeMayBeCompletedWithoutParticipantMaterial !== true
    || result.authorityBoundary.candidateExternalTrustRootMaterialIntakePerformed !== true
    || result.authorityBoundary.actualTrustRootProvisioned !== false
    || result.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || result.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || result.authorityBoundary.multiSessionIndependenceVerified !== false
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.biometricTemplateIssued !== false
    || result.authorityBoundary.constructValidity !== 'unresolved'
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || result.privacyBoundary.rawImageAccepted !== false
    || result.privacyBoundary.participantDerivedNumericMetricInputAccepted !== false
    || result.privacyBoundary.trustRootArtifactBytesAcceptedAtIntake !== true
    || result.privacyBoundary.trustRootArtifactBytesPersistedInOutput !== false
    || result.privacyBoundary.trustRootArtifactDigestPersisted !== true
    || result.researchNoteRef !== FR168_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR168_NEXT_FRONTIER
  ) fail('issued candidate material intake boundary drift.');
}
