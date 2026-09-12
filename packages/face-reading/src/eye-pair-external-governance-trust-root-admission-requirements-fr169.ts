import {
  FR168_NEXT_FRONTIER,
  assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168,
  type EyePairExternalTrustRootCandidateMaterialIntakeFR168V1,
} from './eye-pair-external-trust-root-candidate-material-intake-fr168.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR169_EYE_PAIR_EXTERNAL_GOVERNANCE_TRUST_ROOT_ADMISSION_REQUIREMENTS_RECORD_ID =
  'research.face_reading.neutral.eye_pair.external_governance_trust_root_admission_requirements.fr169' as const;
export const FR169_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr169-eye-pair-external-governance-trust-root-admission-requirements.md' as const;
export const FR169_NEXT_FRONTIER =
  'provision_independently_governed_eye_pair_trust_root_and_verifier_then_execute_fr169_checks_before_authority_promotable_session_collection' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1 {
  readonly schemaVersion: 'fr169-eye-pair-external-governance-trust-root-admission-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR169_EYE_PAIR_EXTERNAL_GOVERNANCE_TRUST_ROOT_ADMISSION_REQUIREMENTS_RECORD_ID;
  readonly authorityState:
    'eye_pair_external_governance_trust_root_admission_requirements_frozen_no_external_authority_provisioned';
  readonly predecessor: {
    readonly fr168NextFrontier: typeof FR168_NEXT_FRONTIER;
    readonly issuedFR168CandidateIntakeRequired: true;
    readonly fr168CandidateMaterialDigest: string;
    readonly fr168TrustRootCandidateRef: string;
    readonly fr168TrustRootAuthorityRef: string;
    readonly fr168TrustRootArtifactRef: string;
    readonly fr168TrustRootArtifactDigest: string;
    readonly fr168CandidateMaterialIntakePerformed: true;
    readonly fr168TrustRootArtifactByteIdentityVerified: true;
    readonly fr168ActualTrustRootProvisioned: false;
    readonly fr168ExternalWitnessAuthorityEstablished: false;
    readonly fr168IndependentSessionEvidenceAdmitted: false;
  };
  readonly requirementsBoundary: {
    readonly independentlyProvisionedExternalGovernanceVerifierRequired: true;
    readonly externalGovernanceAuthorityIdentityVerificationRequired: true;
    readonly exactFR168CandidateMaterialDigestBindingRequired: true;
    readonly semanticTrustRootParsingAndVerificationRequired: true;
    readonly supportedTrustRootKeyFormatPolicyRequired: true;
    readonly externallyGovernedKeyPinningRequired: true;
    readonly trustRootValidityPolicyVerificationRequired: true;
    readonly trustRootRevocationStatusVerificationRequired: true;
    readonly signerChainPolicyVerificationRequired: true;
    readonly governedSemanticTrustEvidenceVerifierRequired: true;
    readonly eyePairCriterionScopeVerificationRequired: true;
    readonly witnessAuthorityScopeVerificationRequired: true;
    readonly prospectiveValidityBindingVerificationRequired: true;
    readonly captureToWitnessBindingVerificationRequired: true;
    readonly allAdmissionChecksMustSucceedBeforeProvisioning: true;
  };
  readonly insufficiencyBoundary: {
    readonly callerSuppliedAuthorityRefSufficient: false;
    readonly callerSuppliedAuthorityEvidenceRefSufficient: false;
    readonly callerSuppliedPolicyRefSufficient: false;
    readonly callerSuppliedVerifierRefSufficient: false;
    readonly callerSuppliedKeySufficient: false;
    readonly callerSuppliedKeyPinningEvidenceRefSufficient: false;
    readonly digestEqualityAloneSufficient: false;
    readonly mathematicalSignatureValidityAloneSufficient: false;
    readonly selfSignedMaterialSufficient: false;
    readonly projectGeneratedRootSufficient: false;
    readonly syntheticRootOrCredentialSufficient: false;
    readonly fr168CandidateIntakeAloneSufficient: false;
  };
  readonly availabilityBoundary: {
    readonly independentlyGovernedVerifierProvisionedByThisArtifact: false;
    readonly authoritativeExternalRootAnchorProvisionedByThisArtifact: false;
    readonly actualExternalGovernanceVerificationPerformed: false;
    readonly admissionExecutionSucceeded: false;
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly requirementsMayBeFrozenWithoutParticipantMaterial: true;
    readonly admissionCanSucceedWithoutExternalProvisioning: false;
  };
  readonly trustBoundary: {
    readonly trustRootAuthorityIdentityVerified: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly trustRootKeyFormatSupported: false;
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
    readonly actualTrustRootProvisioned: false;
    readonly governedWitnessTrustRootEstablished: false;
    readonly signerKeyTrustEstablished: false;
    readonly witnessAuthorityTrustBound: false;
    readonly externalWitnessAuthorityEstablished: false;
    readonly actualWitnessCredentialAdmitted: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly prospectiveCollectionBoundary: {
    readonly existingFR163ToFR165SessionsRetrospectivelyPromotable: false;
    readonly newParticipantCaptureRequiredToFreezeAdmissionRequirements: false;
    readonly authorityPromotableCaptureAllowedBeforeExternalProvisioningAndSuccessfulAdmission: false;
    readonly descriptiveCaptureMayContinueWithoutCreatingIndependentSessionAuthority: true;
  };
  readonly authorityBoundary: {
    readonly candidateExternalTrustRootMaterialIntakePerformed: true;
    readonly externalGovernanceAdmissionRequirementsFrozen: true;
    readonly actualExternalGovernanceVerificationPerformed: false;
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
    readonly trustRootArtifactBytesAcceptedByThisArtifact: false;
    readonly trustRootArtifactBytesPersisted: false;
    readonly trustRootArtifactDigestPersisted: true;
    readonly candidateCoordinateDigestPersisted: true;
    readonly sourceDigestAccepted: false;
    readonly sourceDigestPersisted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR169_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR169_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-169 ${message}`);
}

function validatePredecessor(
  intake: EyePairExternalTrustRootCandidateMaterialIntakeFR168V1,
): void {
  assertIssuedEyePairExternalTrustRootCandidateMaterialIntakeFR168(intake);
  if (
    intake.nextFrontier !== FR168_NEXT_FRONTIER
    || intake.intakeBoundary.trustRootArtifactByteIdentityVerified !== true
    || intake.intakeBoundary.candidateMaterialCoordinateDigestMaterialized !== true
    || intake.candidateMaterial.trustRootArtifactBytesVerifiedAtIntake !== true
    || intake.candidateMaterial.trustRootAuthorityIdentityVerified !== false
    || intake.candidateMaterial.trustRootArtifactSemanticContentVerified !== false
    || intake.candidateMaterial.trustRootKeyPinnedByExternalGovernance !== false
    || intake.candidateMaterial.eyePairCriterionScopeVerified !== false
    || intake.candidateMaterial.witnessAuthorityScopeVerified !== false
    || intake.candidateMaterial.prospectiveValidityBindingVerified !== false
    || intake.candidateMaterial.captureToWitnessBindingVerified !== false
    || intake.candidateMaterial.externalTrustRootProvisioned !== false
    || intake.trustBoundary.actualTrustRootProvisioned !== false
    || intake.trustBoundary.externalWitnessAuthorityEstablished !== false
    || intake.trustBoundary.actualWitnessCredentialAdmitted !== false
    || intake.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || intake.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedAfterCandidateIntakeAlone !== false
    || intake.authorityBoundary.independentSessionEvidenceAdmitted !== false
    || intake.authorityBoundary.multiSessionIndependenceVerified !== false
    || intake.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || intake.authorityBoundary.identityMatchingPerformed !== false
    || intake.authorityBoundary.biometricTemplateIssued !== false
    || intake.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-168 predecessor widened governance, trust, session, biometric, or semantic authority.');
}

export function getEyePairExternalGovernanceTrustRootAdmissionRequirementsContractFR169() {
  return Object.freeze({
    issuedFR168CandidateIntakeRequired: true as const,
    exactFR168CandidateMaterialDigestBindingRequired: true as const,
    independentlyProvisionedExternalGovernanceVerifierRequired: true as const,
    externalGovernanceAuthorityIdentityVerificationRequired: true as const,
    semanticTrustRootParsingAndVerificationRequired: true as const,
    supportedTrustRootKeyFormatPolicyRequired: true as const,
    externallyGovernedKeyPinningRequired: true as const,
    validityAndRevocationVerificationRequired: true as const,
    signerChainPolicyVerificationRequired: true as const,
    governedSemanticTrustEvidenceVerifierRequired: true as const,
    eyePairAndWitnessScopeVerificationRequired: true as const,
    prospectiveValidityAndCaptureBindingVerificationRequired: true as const,
    callerOrProjectGeneratedAuthoritySufficient: false as const,
    syntheticAuthoritySufficient: false as const,
    actualExternalGovernanceVerificationPerformedByThisArtifact: false as const,
    actualTrustRootProvisionedByThisArtifact: false as const,
    authorityPromotableCaptureAllowedByThisArtifact: false as const,
    nextFrontier: FR169_NEXT_FRONTIER,
  });
}

export function issueEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(
  intake: EyePairExternalTrustRootCandidateMaterialIntakeFR168V1,
): EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1 {
  validatePredecessor(intake);

  const result: EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1 = Object.freeze({
    schemaVersion: 'fr169-eye-pair-external-governance-trust-root-admission-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR169_EYE_PAIR_EXTERNAL_GOVERNANCE_TRUST_ROOT_ADMISSION_REQUIREMENTS_RECORD_ID,
    authorityState:
      'eye_pair_external_governance_trust_root_admission_requirements_frozen_no_external_authority_provisioned' as const,
    predecessor: Object.freeze({
      fr168NextFrontier: FR168_NEXT_FRONTIER,
      issuedFR168CandidateIntakeRequired: true as const,
      fr168CandidateMaterialDigest: intake.candidateMaterialDigest,
      fr168TrustRootCandidateRef: intake.candidateMaterial.trustRootCandidateRef,
      fr168TrustRootAuthorityRef: intake.candidateMaterial.trustRootAuthorityRef,
      fr168TrustRootArtifactRef: intake.candidateMaterial.trustRootArtifactRef,
      fr168TrustRootArtifactDigest: intake.candidateMaterial.trustRootArtifactDigest,
      fr168CandidateMaterialIntakePerformed: true as const,
      fr168TrustRootArtifactByteIdentityVerified: true as const,
      fr168ActualTrustRootProvisioned: false as const,
      fr168ExternalWitnessAuthorityEstablished: false as const,
      fr168IndependentSessionEvidenceAdmitted: false as const,
    }),
    requirementsBoundary: Object.freeze({
      independentlyProvisionedExternalGovernanceVerifierRequired: true as const,
      externalGovernanceAuthorityIdentityVerificationRequired: true as const,
      exactFR168CandidateMaterialDigestBindingRequired: true as const,
      semanticTrustRootParsingAndVerificationRequired: true as const,
      supportedTrustRootKeyFormatPolicyRequired: true as const,
      externallyGovernedKeyPinningRequired: true as const,
      trustRootValidityPolicyVerificationRequired: true as const,
      trustRootRevocationStatusVerificationRequired: true as const,
      signerChainPolicyVerificationRequired: true as const,
      governedSemanticTrustEvidenceVerifierRequired: true as const,
      eyePairCriterionScopeVerificationRequired: true as const,
      witnessAuthorityScopeVerificationRequired: true as const,
      prospectiveValidityBindingVerificationRequired: true as const,
      captureToWitnessBindingVerificationRequired: true as const,
      allAdmissionChecksMustSucceedBeforeProvisioning: true as const,
    }),
    insufficiencyBoundary: Object.freeze({
      callerSuppliedAuthorityRefSufficient: false as const,
      callerSuppliedAuthorityEvidenceRefSufficient: false as const,
      callerSuppliedPolicyRefSufficient: false as const,
      callerSuppliedVerifierRefSufficient: false as const,
      callerSuppliedKeySufficient: false as const,
      callerSuppliedKeyPinningEvidenceRefSufficient: false as const,
      digestEqualityAloneSufficient: false as const,
      mathematicalSignatureValidityAloneSufficient: false as const,
      selfSignedMaterialSufficient: false as const,
      projectGeneratedRootSufficient: false as const,
      syntheticRootOrCredentialSufficient: false as const,
      fr168CandidateIntakeAloneSufficient: false as const,
    }),
    availabilityBoundary: Object.freeze({
      independentlyGovernedVerifierProvisionedByThisArtifact: false as const,
      authoritativeExternalRootAnchorProvisionedByThisArtifact: false as const,
      actualExternalGovernanceVerificationPerformed: false as const,
      admissionExecutionSucceeded: false as const,
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      requirementsMayBeFrozenWithoutParticipantMaterial: true as const,
      admissionCanSucceedWithoutExternalProvisioning: false as const,
    }),
    trustBoundary: Object.freeze({
      trustRootAuthorityIdentityVerified: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      trustRootKeyFormatSupported: false as const,
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
      actualTrustRootProvisioned: false as const,
      governedWitnessTrustRootEstablished: false as const,
      signerKeyTrustEstablished: false as const,
      witnessAuthorityTrustBound: false as const,
      externalWitnessAuthorityEstablished: false as const,
      actualWitnessCredentialAdmitted: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    prospectiveCollectionBoundary: Object.freeze({
      existingFR163ToFR165SessionsRetrospectivelyPromotable: false as const,
      newParticipantCaptureRequiredToFreezeAdmissionRequirements: false as const,
      authorityPromotableCaptureAllowedBeforeExternalProvisioningAndSuccessfulAdmission: false as const,
      descriptiveCaptureMayContinueWithoutCreatingIndependentSessionAuthority: true as const,
    }),
    authorityBoundary: Object.freeze({
      candidateExternalTrustRootMaterialIntakePerformed: true as const,
      externalGovernanceAdmissionRequirementsFrozen: true as const,
      actualExternalGovernanceVerificationPerformed: false as const,
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
      trustRootArtifactBytesAcceptedByThisArtifact: false as const,
      trustRootArtifactBytesPersisted: false as const,
      trustRootArtifactDigestPersisted: true as const,
      candidateCoordinateDigestPersisted: true as const,
      sourceDigestAccepted: false as const,
      sourceDigestPersisted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR169_RESEARCH_NOTE_REF,
    nextFrontier: FR169_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairExternalGovernanceTrustRootAdmissionRequirementsFR169(
  result: EyePairExternalGovernanceTrustRootAdmissionRequirementsFR169V1,
): void {
  if (!ISSUED.has(result)) fail('admission requirements artifact was not issued by the active FR-169 boundary.');
  if (
    result.schemaVersion !== 'fr169-eye-pair-external-governance-trust-root-admission-requirements-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR169_EYE_PAIR_EXTERNAL_GOVERNANCE_TRUST_ROOT_ADMISSION_REQUIREMENTS_RECORD_ID
    || result.authorityState !== 'eye_pair_external_governance_trust_root_admission_requirements_frozen_no_external_authority_provisioned'
    || result.predecessor.fr168NextFrontier !== FR168_NEXT_FRONTIER
    || result.predecessor.issuedFR168CandidateIntakeRequired !== true
    || result.predecessor.fr168CandidateMaterialIntakePerformed !== true
    || result.predecessor.fr168TrustRootArtifactByteIdentityVerified !== true
    || result.predecessor.fr168ActualTrustRootProvisioned !== false
    || result.predecessor.fr168ExternalWitnessAuthorityEstablished !== false
    || result.predecessor.fr168IndependentSessionEvidenceAdmitted !== false
    || Object.values(result.requirementsBoundary).some((value) => value !== true)
    || Object.values(result.insufficiencyBoundary).some((value) => value !== false)
    || result.availabilityBoundary.independentlyGovernedVerifierProvisionedByThisArtifact !== false
    || result.availabilityBoundary.authoritativeExternalRootAnchorProvisionedByThisArtifact !== false
    || result.availabilityBoundary.actualExternalGovernanceVerificationPerformed !== false
    || result.availabilityBoundary.admissionExecutionSucceeded !== false
    || result.availabilityBoundary.productionWitnessVerificationAlgorithm !== null
    || result.availabilityBoundary.pinnedWitnessTrustRootRef !== null
    || result.availabilityBoundary.requirementsMayBeFrozenWithoutParticipantMaterial !== true
    || result.availabilityBoundary.admissionCanSucceedWithoutExternalProvisioning !== false
    || Object.values(result.trustBoundary).some((value) => value !== false)
    || result.prospectiveCollectionBoundary.existingFR163ToFR165SessionsRetrospectivelyPromotable !== false
    || result.prospectiveCollectionBoundary.newParticipantCaptureRequiredToFreezeAdmissionRequirements !== false
    || result.prospectiveCollectionBoundary.authorityPromotableCaptureAllowedBeforeExternalProvisioningAndSuccessfulAdmission !== false
    || result.prospectiveCollectionBoundary.descriptiveCaptureMayContinueWithoutCreatingIndependentSessionAuthority !== true
    || result.authorityBoundary.candidateExternalTrustRootMaterialIntakePerformed !== true
    || result.authorityBoundary.externalGovernanceAdmissionRequirementsFrozen !== true
    || result.authorityBoundary.actualExternalGovernanceVerificationPerformed !== false
    || result.authorityBoundary.actualTrustRootProvisioned !== false
    || result.authorityBoundary.externalWitnessAuthorityEstablished !== false
    || result.authorityBoundary.actualWitnessCredentialAdmitted !== false
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
    || result.privacyBoundary.trustRootArtifactBytesAcceptedByThisArtifact !== false
    || result.privacyBoundary.trustRootArtifactBytesPersisted !== false
    || result.privacyBoundary.trustRootArtifactDigestPersisted !== true
    || result.privacyBoundary.candidateCoordinateDigestPersisted !== true
    || result.privacyBoundary.sourceDigestAccepted !== false
    || result.privacyBoundary.sourceDigestPersisted !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
    || result.researchNoteRef !== FR169_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR169_NEXT_FRONTIER
  ) fail('issued external governance trust-root admission requirements boundary drift.');
}
