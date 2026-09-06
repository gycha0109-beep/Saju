import { createHash } from 'node:crypto';
import {
  FR156_NEXT_FRONTIER,
  assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156,
  getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156,
  type SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1,
} from './five-officers-square-broad-fang-external-witness-trust-root-provisioning-protocol-fr156.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR157_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_external_trust_root_material_intake.fr157' as const;
export const FR157_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr157-square-broad-fang-external-trust-root-material-intake.md' as const;
export const FR157_NEXT_FRONTIER =
  'square_broad_fang_external_governance_authority_identity_trust_root_semantic_verification_and_key_pinning_plus_real_prospective_session_acquisition_before_trust_or_independent_session_admission' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const MAX_TRUST_ROOT_ARTIFACT_BYTES = 1024 * 1024;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr156Protocol', 'candidate']);
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
]);
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangExternalTrustRootMaterialCandidateFR157V1 {
  readonly trustRootCandidateRef: string;
  readonly trustRootAuthorityRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootClassClaim:
    'external_governance_trust_root_artifact_candidate_not_semantically_verified';
  readonly declaredTrustRootArtifactDigest: string;
  readonly trustRootArtifactBytes: Uint8Array;
  readonly trustRootPolicyRef: string;
  readonly trustRootValidityPolicyRef: string;
  readonly trustRootRevocationStatusPolicyRef: string;
  readonly signerChainPolicyRef: string;
  readonly semanticTrustEvidenceVerifierRef: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
}

export interface SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1 {
  readonly schemaVersion: 'fr157-square-broad-fang-external-trust-root-material-intake-request-v1';
  readonly fr156Protocol: SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1;
  readonly candidate: SquareBroadFangExternalTrustRootMaterialCandidateFR157V1;
}

export interface SquareBroadFangExternalTrustRootMaterialRecordFR157V1 {
  readonly trustRootCandidateRef: string;
  readonly trustRootAuthorityRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootClassClaim:
    'external_governance_trust_root_artifact_candidate_not_semantically_verified';
  readonly trustRootArtifactDigest: string;
  readonly trustRootArtifactBytesVerifiedAtIntake: true;
  readonly trustRootPolicyRef: string;
  readonly trustRootValidityPolicyRef: string;
  readonly trustRootRevocationStatusPolicyRef: string;
  readonly signerChainPolicyRef: string;
  readonly semanticTrustEvidenceVerifierRef: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly trustRootAuthorityIdentityVerified: false;
  readonly trustRootArtifactSemanticContentVerified: false;
  readonly trustRootKeyPinnedByExternalGovernance: false;
  readonly trustRootValidityPolicyVerified: false;
  readonly trustRootRevocationStatusVerified: false;
  readonly signerChainPolicyVerified: false;
  readonly semanticTrustEvidenceVerifierGoverned: false;
  readonly externalTrustRootProvisioned: false;
}

export interface SquareBroadFangExternalTrustRootMaterialIntakeFR157V1 {
  readonly schemaVersion: 'fr157-square-broad-fang-external-trust-root-material-intake-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR157_RECORD_ID;
  readonly authorityState:
    'candidate_external_trust_root_artifact_byte_identity_verified_no_external_authority_semantics_key_pinning_or_trust';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr156NextFrontier: typeof FR156_NEXT_FRONTIER;
    readonly issuedFR156ProtocolRequired: true;
    readonly fr156ProtocolFrozenBeforeTrustedRootAdmission: true;
    readonly fr156ExternalTrustRootProvisioned: false;
    readonly fr156GovernedWitnessTrustRootEstablished: false;
    readonly fr156TrustRootAuthorityIdentityVerified: false;
    readonly fr156TrustRootArtifactSemanticContentVerified: false;
    readonly fr156TrustRootKeyPinnedByExternalGovernance: false;
    readonly fr156SemanticTrustEvidenceVerificationPerformed: false;
    readonly fr156ProductionWitnessVerificationAlgorithm: null;
    readonly fr156PinnedWitnessTrustRootRef: null;
  };
  readonly candidateMaterial: SquareBroadFangExternalTrustRootMaterialRecordFR157V1;
  readonly candidateMaterialDigest: string;
  readonly intakeBoundary: {
    readonly issuedFR156ProtocolRequired: true;
    readonly trustRootArtifactBytesRequiredAtIntake: true;
    readonly trustRootArtifactDeclaredDigestExactMatchRequired: true;
    readonly trustRootArtifactBytesRetainedInOutput: false;
    readonly trustRootArtifactByteIdentityVerified: true;
    readonly candidateMaterialCoordinateDigestMaterialized: true;
    readonly callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false;
    readonly callerSuppliedAuthorityIdentityEvidenceRefMeansAuthorityIdentityVerified: false;
    readonly trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false;
    readonly trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned: false;
    readonly opaquePolicyRefMeansPolicyVerified: false;
    readonly semanticVerifierRefMeansGovernedVerifier: false;
    readonly externalKeyPinningEvidenceRefMeansKeyPinned: false;
  };
  readonly trustBoundary: {
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly externalTrustRootProvisioned: false;
    readonly governedWitnessTrustRootEstablished: false;
    readonly trustRootAuthorityIdentityVerified: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly trustRootKeyPinnedByExternalGovernance: false;
    readonly trustRootValidityPolicyVerified: false;
    readonly trustRootRevocationStatusVerified: false;
    readonly signerChainPolicyVerified: false;
    readonly semanticTrustEvidenceVerifierGoverned: false;
    readonly semanticTrustEvidenceVerificationPerformed: false;
    readonly trustEvidenceIssuerIdentityVerified: false;
    readonly trustEvidenceIssuerTrusted: false;
    readonly signerToWitnessAuthorityBindingVerified: false;
    readonly signerKeyTrustEstablished: false;
    readonly witnessAuthorityTrustBound: false;
    readonly externalWitnessIdentityVerified: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly authorityBoundary: {
    readonly candidateExternalTrustRootMaterialIntakePerformed: true;
    readonly externalTrustRootMaterializationPerformed: false;
    readonly semanticTrustEvidenceVerificationPerformed: false;
    readonly independentMultiSessionEvidenceAcquired: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly candidateConstructAdvanceDecision:
      'blocked_pending_external_authority_identity_semantic_root_verification_key_pinning_and_real_prospective_session_evidence';
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImageAcceptedByThisArtifact: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawPixelRasterPersisted: false;
    readonly rawAggregatePersisted: false;
    readonly sourceDigestAcceptedByThisArtifact: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly trustRootArtifactBytesAcceptedAtIntake: true;
    readonly trustRootArtifactBytesPersistedInOutput: false;
    readonly trustRootArtifactDigestPersisted: true;
    readonly signerPublicKeyPemAcceptedByThisArtifact: false;
    readonly signerPublicKeyPemPersisted: false;
    readonly detachedSignatureBytesPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR157_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR157_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-157 ${message}`);
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
  protocol: SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1,
): void {
  assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156(protocol);
  const contract = getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156();
  if (
    contract.nextFrontier !== FR156_NEXT_FRONTIER
    || contract.protocolFrozenBeforeTrustedRootAdmission !== true
    || contract.externalGovernanceAuthorityRequired !== true
    || contract.trustRootArtifactBytesRequiredAtAdmission !== true
    || contract.trustRootAuthorityIdentityVerificationRequired !== true
    || contract.trustRootArtifactSemanticContentVerificationRequired !== true
    || contract.trustRootKeyPinningByExternalGovernanceRequired !== true
    || contract.validityAndRevocationPolicyRequired !== true
    || contract.signerChainVerificationPolicyRequired !== true
    || contract.semanticTrustEvidenceVerifierRequired !== true
    || contract.callerSuppliedTrustRootRefMeansGovernedTrustRoot !== false
    || contract.callerSuppliedPublicKeyMeansPinnedTrustRoot !== false
    || contract.byteDigestMatchMeansTrustedRoot !== false
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.externalTrustRootProvisionedByThisArtifact !== false
    || contract.semanticTrustEvidenceVerificationPerformedByThisArtifact !== false
    || contract.independentSessionEvidenceAdmittedByThisArtifact !== false
  ) fail('FR-156 predecessor contract drift.');

  if (
    protocol.nextFrontier !== FR156_NEXT_FRONTIER
    || protocol.prospectiveTrustRoot.protocolFrozenBeforeTrustedRootAdmission !== true
    || protocol.trustBoundary.externalTrustRootProvisioned !== false
    || protocol.trustBoundary.governedWitnessTrustRootEstablished !== false
    || protocol.trustBoundary.trustRootAuthorityIdentityVerified !== false
    || protocol.trustBoundary.trustRootArtifactSemanticContentVerified !== false
    || protocol.trustBoundary.trustRootKeyPinnedByExternalGovernance !== false
    || protocol.trustBoundary.semanticTrustEvidenceVerificationPerformed !== false
    || protocol.trustBoundary.productionWitnessVerificationAlgorithm !== null
    || protocol.trustBoundary.pinnedWitnessTrustRootRef !== null
    || protocol.authorityBoundary.externalTrustRootMaterializationPerformed !== false
    || protocol.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || protocol.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || protocol.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || protocol.privacyBoundary.rawImageAcceptedByThisArtifact !== false
    || protocol.privacyBoundary.sourceDigestAcceptedByThisArtifact !== false
    || protocol.traditionalSemanticAuthority !== false
  ) fail('FR-156 predecessor artifact widened trust, empirical, privacy, or semantic authority.');
}

function validateCandidate(
  candidate: SquareBroadFangExternalTrustRootMaterialCandidateFR157V1,
): SquareBroadFangExternalTrustRootMaterialRecordFR157V1 {
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

  if (
    candidate.trustRootClassClaim !==
      'external_governance_trust_root_artifact_candidate_not_semantically_verified'
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
    trustRootAuthorityIdentityVerified: false as const,
    trustRootArtifactSemanticContentVerified: false as const,
    trustRootKeyPinnedByExternalGovernance: false as const,
    trustRootValidityPolicyVerified: false as const,
    trustRootRevocationStatusVerified: false as const,
    signerChainPolicyVerified: false as const,
    semanticTrustEvidenceVerifierGoverned: false as const,
    externalTrustRootProvisioned: false as const,
  });
}

function candidateCoordinateDigest(record: SquareBroadFangExternalTrustRootMaterialRecordFR157V1): string {
  return digestText(JSON.stringify({
    authorityIdentityEvidenceRef: record.authorityIdentityEvidenceRef,
    externalKeyPinningEvidenceRef: record.externalKeyPinningEvidenceRef,
    semanticTrustEvidenceVerifierRef: record.semanticTrustEvidenceVerifierRef,
    signerChainPolicyRef: record.signerChainPolicyRef,
    trustRootArtifactDigest: record.trustRootArtifactDigest,
    trustRootArtifactRef: record.trustRootArtifactRef,
    trustRootAuthorityRef: record.trustRootAuthorityRef,
    trustRootCandidateRef: record.trustRootCandidateRef,
    trustRootClassClaim: record.trustRootClassClaim,
    trustRootPolicyRef: record.trustRootPolicyRef,
    trustRootRevocationStatusPolicyRef: record.trustRootRevocationStatusPolicyRef,
    trustRootValidityPolicyRef: record.trustRootValidityPolicyRef,
  }));
}

export function computeSquareBroadFangExternalTrustRootArtifactDigestFR157(bytes: Uint8Array): string {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0 || bytes.byteLength > MAX_TRUST_ROOT_ARTIFACT_BYTES) {
    fail(`trust-root artifact bytes must be between 1 and ${MAX_TRUST_ROOT_ARTIFACT_BYTES} bytes.`);
  }
  return digestBytes(bytes);
}

export function getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157() {
  const predecessor = getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156();
  if (predecessor.nextFrontier !== FR156_NEXT_FRONTIER) fail('FR-156 predecessor next frontier drift.');
  return Object.freeze({
    schemaVersion: 'fr157-square-broad-fang-external-trust-root-material-intake-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR157_RECORD_ID,
    predecessorNextFrontier: FR156_NEXT_FRONTIER,
    issuedFR156ProtocolRequired: true as const,
    trustRootArtifactBytesRequiredAtIntake: true as const,
    trustRootArtifactDeclaredDigestExactMatchRequired: true as const,
    trustRootArtifactBytesRetainedInOutput: false as const,
    callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false as const,
    byteDigestMatchMeansSemanticContentVerified: false as const,
    byteDigestMatchMeansExternalTrustRootProvisioned: false as const,
    opaquePolicyRefMeansPolicyVerified: false as const,
    semanticVerifierRefMeansGovernedVerifier: false as const,
    externalKeyPinningEvidenceRefMeansKeyPinned: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    externalTrustRootProvisionedByThisArtifact: false as const,
    semanticTrustEvidenceVerificationPerformedByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    nextFrontier: FR157_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangExternalTrustRootMaterialIntakeFR157(
  request: SquareBroadFangExternalTrustRootMaterialIntakeRequestFR157V1,
): SquareBroadFangExternalTrustRootMaterialIntakeFR157V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr157-square-broad-fang-external-trust-root-material-intake-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  validatePredecessor(request.fr156Protocol);
  const contract = getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157();
  if (
    contract.issuedFR156ProtocolRequired !== true
    || contract.trustRootArtifactDeclaredDigestExactMatchRequired !== true
    || contract.byteDigestMatchMeansSemanticContentVerified !== false
    || contract.externalTrustRootProvisionedByThisArtifact !== false
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.nextFrontier !== FR157_NEXT_FRONTIER
  ) fail('FR-157 contract drift at materialization.');

  const candidateMaterial = validateCandidate(request.candidate);
  const output: SquareBroadFangExternalTrustRootMaterialIntakeFR157V1 = Object.freeze({
    schemaVersion: 'fr157-square-broad-fang-external-trust-root-material-intake-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR157_RECORD_ID,
    authorityState:
      'candidate_external_trust_root_artifact_byte_identity_verified_no_external_authority_semantics_key_pinning_or_trust' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr156NextFrontier: FR156_NEXT_FRONTIER,
      issuedFR156ProtocolRequired: true as const,
      fr156ProtocolFrozenBeforeTrustedRootAdmission: true as const,
      fr156ExternalTrustRootProvisioned: false as const,
      fr156GovernedWitnessTrustRootEstablished: false as const,
      fr156TrustRootAuthorityIdentityVerified: false as const,
      fr156TrustRootArtifactSemanticContentVerified: false as const,
      fr156TrustRootKeyPinnedByExternalGovernance: false as const,
      fr156SemanticTrustEvidenceVerificationPerformed: false as const,
      fr156ProductionWitnessVerificationAlgorithm: null,
      fr156PinnedWitnessTrustRootRef: null,
    }),
    candidateMaterial,
    candidateMaterialDigest: candidateCoordinateDigest(candidateMaterial),
    intakeBoundary: Object.freeze({
      issuedFR156ProtocolRequired: true as const,
      trustRootArtifactBytesRequiredAtIntake: true as const,
      trustRootArtifactDeclaredDigestExactMatchRequired: true as const,
      trustRootArtifactBytesRetainedInOutput: false as const,
      trustRootArtifactByteIdentityVerified: true as const,
      candidateMaterialCoordinateDigestMaterialized: true as const,
      callerSuppliedTrustRootAuthorityRefMeansAuthorityIdentityVerified: false as const,
      callerSuppliedAuthorityIdentityEvidenceRefMeansAuthorityIdentityVerified: false as const,
      trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false as const,
      trustRootArtifactByteDigestMatchMeansExternalTrustRootProvisioned: false as const,
      opaquePolicyRefMeansPolicyVerified: false as const,
      semanticVerifierRefMeansGovernedVerifier: false as const,
      externalKeyPinningEvidenceRefMeansKeyPinned: false as const,
    }),
    trustBoundary: Object.freeze({
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      externalTrustRootProvisioned: false as const,
      governedWitnessTrustRootEstablished: false as const,
      trustRootAuthorityIdentityVerified: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      trustRootKeyPinnedByExternalGovernance: false as const,
      trustRootValidityPolicyVerified: false as const,
      trustRootRevocationStatusVerified: false as const,
      signerChainPolicyVerified: false as const,
      semanticTrustEvidenceVerifierGoverned: false as const,
      semanticTrustEvidenceVerificationPerformed: false as const,
      trustEvidenceIssuerIdentityVerified: false as const,
      trustEvidenceIssuerTrusted: false as const,
      signerToWitnessAuthorityBindingVerified: false as const,
      signerKeyTrustEstablished: false as const,
      witnessAuthorityTrustBound: false as const,
      externalWitnessIdentityVerified: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      candidateExternalTrustRootMaterialIntakePerformed: true as const,
      externalTrustRootMaterializationPerformed: false as const,
      semanticTrustEvidenceVerificationPerformed: false as const,
      independentMultiSessionEvidenceAcquired: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      candidateConstructAdvanceDecision:
        'blocked_pending_external_authority_identity_semantic_root_verification_key_pinning_and_real_prospective_session_evidence' as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImageAcceptedByThisArtifact: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawPixelRasterPersisted: false as const,
      rawAggregatePersisted: false as const,
      sourceDigestAcceptedByThisArtifact: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      trustRootArtifactBytesAcceptedAtIntake: true as const,
      trustRootArtifactBytesPersistedInOutput: false as const,
      trustRootArtifactDigestPersisted: true as const,
      signerPublicKeyPemAcceptedByThisArtifact: false as const,
      signerPublicKeyPemPersisted: false as const,
      detachedSignatureBytesPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR157_RESEARCH_NOTE_REF,
    nextFrontier: FR157_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangExternalTrustRootMaterialIntakeFR157(
  value: SquareBroadFangExternalTrustRootMaterialIntakeFR157V1,
): void {
  if (!ISSUED.has(value)) {
    fail('external trust-root material intake was not issued by the active FR-157 boundary.');
  }
}
