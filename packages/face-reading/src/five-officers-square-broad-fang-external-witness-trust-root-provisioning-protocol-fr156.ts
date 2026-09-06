import {
  FR155_NEXT_FRONTIER,
  getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155,
} from './five-officers-square-broad-fang-witness-trust-evidence-intake-fr155.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR156_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_external_witness_trust_root_provisioning_protocol.fr156' as const;
export const FR156_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol.md' as const;
export const FR156_NEXT_FRONTIER =
  'square_broad_fang_external_governed_trust_root_materialization_and_semantic_verifier_execution_plus_real_prospective_session_acquisition_before_independent_session_admission' as const;

const ISSUED = new WeakSet<object>();

export interface SquareBroadFangExternalWitnessTrustRootRequirementFR156V1 {
  readonly requirementRef: string;
  readonly required: true;
  readonly purpose: string;
  readonly satisfiedByCallerSuppliedReferenceAlone: false;
  readonly satisfiedByCallerSuppliedKeyAlone: false;
  readonly satisfiedByByteDigestMatchAlone: false;
  readonly satisfiedByMathematicalSignatureValidityAlone: false;
  readonly satisfiedBySelfSignedOrSyntheticCredentialAlone: false;
  readonly satisfiedByFR154OrFR155CandidateEvidenceAlone: false;
}

export interface SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1 {
  readonly schemaVersion: 'fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR156_RECORD_ID;
  readonly authorityState:
    'external_witness_trust_root_provisioning_protocol_frozen_no_external_trust_root_materialized_or_semantic_verification_performed';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr155NextFrontier: typeof FR155_NEXT_FRONTIER;
    readonly fr155ExactFR154VerificationCoverageRequired: true;
    readonly fr155TrustEvidenceArtifactBytesRetainedInOutput: false;
    readonly fr155CallerSuppliedIssuerRefMeansTrustedIssuer: false;
    readonly fr155GovernedWitnessTrustRootEstablishedByThisArtifact: false;
    readonly fr155SignerKeyTrustEstablishedByThisArtifact: false;
    readonly fr155WitnessAuthorityTrustBoundByThisArtifact: false;
    readonly fr155IndependentSessionEvidenceAdmittedByThisArtifact: false;
    readonly fr155ProductionWitnessVerificationAlgorithm: null;
    readonly fr155PinnedWitnessTrustRootRef: null;
  };
  readonly prospectiveTrustRoot: {
    readonly protocolFrozenBeforeTrustedRootAdmission: true;
    readonly externalGovernanceAuthorityRequired: true;
    readonly trustRootAuthorityRefRequired: true;
    readonly trustRootArtifactRefRequired: true;
    readonly trustRootArtifactBytesRequiredAtAdmission: true;
    readonly trustRootArtifactDeclaredDigestExactMatchRequired: true;
    readonly trustRootAuthorityIdentityVerificationRequired: true;
    readonly trustRootArtifactSemanticContentVerificationRequired: true;
    readonly trustRootKeyPinningByExternalGovernanceRequired: true;
    readonly trustRootPolicyRefRequired: true;
    readonly trustRootValidityPolicyRefRequired: true;
    readonly trustRootRevocationStatusPolicyRefRequired: true;
    readonly signerChainVerificationPolicyRequired: true;
    readonly semanticTrustEvidenceVerifierRequired: true;
    readonly trustRootArtifactBytesMayRemainEphemeral: true;
    readonly sourceFaceImageRequired: false;
    readonly sourceFaceImageDigestRequired: false;
    readonly exactCaptureTimestampRequired: false;
    readonly geolocationRequired: false;
    readonly deviceIdentifierRequired: false;
  };
  readonly insufficiencyRules: {
    readonly callerSuppliedTrustRootRefMeansGovernedTrustRoot: false;
    readonly callerSuppliedPublicKeyMeansPinnedTrustRoot: false;
    readonly trustRootArtifactByteDigestMatchMeansAuthorityIdentityVerified: false;
    readonly trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false;
    readonly mathematicalSignatureValidityMeansTrustedRootOrWitness: false;
    readonly selfSignedCredentialMeansExternalTrustRoot: false;
    readonly syntheticCredentialMeansExternalTrustRoot: false;
    readonly claimedIssuerRefMeansIssuerIdentityVerified: false;
    readonly opaquePolicyRefMeansPolicyVerified: false;
    readonly fr154MechanicalSignatureMeansTrustedWitness: false;
    readonly fr155CandidateTrustEvidenceMeansSignerTrustEstablished: false;
    readonly fr155CandidateBundleMeansGovernedTrustRootExists: false;
    readonly historicalFR146OrFR147EvidenceEligibleForTrustRootSubstitution: false;
  };
  readonly evidenceRequirements: readonly SquareBroadFangExternalWitnessTrustRootRequirementFR156V1[];
  readonly trustBoundary: {
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly externalTrustRootProvisioned: false;
    readonly governedWitnessTrustRootEstablished: false;
    readonly trustRootAuthorityIdentityVerified: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly trustRootKeyPinnedByExternalGovernance: false;
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
    readonly externalTrustRootProvisioningProtocolFrozen: true;
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
      'blocked_pending_external_governed_trust_root_semantic_verification_and_real_prospective_session_evidence';
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
    readonly trustRootArtifactBytesAcceptedByThisProtocolArtifact: false;
    readonly trustRootArtifactBytesPersisted: false;
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
  readonly researchNoteRef: typeof FR156_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR156_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-156 ${message}`);
}

function requirement(
  requirementRef: string,
  purpose: string,
): SquareBroadFangExternalWitnessTrustRootRequirementFR156V1 {
  return Object.freeze({
    requirementRef,
    required: true as const,
    purpose,
    satisfiedByCallerSuppliedReferenceAlone: false as const,
    satisfiedByCallerSuppliedKeyAlone: false as const,
    satisfiedByByteDigestMatchAlone: false as const,
    satisfiedByMathematicalSignatureValidityAlone: false as const,
    satisfiedBySelfSignedOrSyntheticCredentialAlone: false as const,
    satisfiedByFR154OrFR155CandidateEvidenceAlone: false as const,
  });
}

const EVIDENCE_REQUIREMENTS = Object.freeze([
  requirement(
    'requirement.fr156.external_governance_authority_identity',
    'The trust-root authority must be independently bound to an external governance identity rather than a caller-supplied reference.',
  ),
  requirement(
    'requirement.fr156.trust_root_artifact_byte_identity',
    'The exact trust-root artifact bytes must match a declared canonical artifact identity before semantic admission.',
  ),
  requirement(
    'requirement.fr156.trust_root_artifact_semantic_verification',
    'The trust-root artifact semantic contents must be verified under a governed parser and policy rather than inferred from byte identity.',
  ),
  requirement(
    'requirement.fr156.external_key_pinning',
    'The witness trust-root key must be pinned by external governance rather than accepted from caller-supplied key material.',
  ),
  requirement(
    'requirement.fr156.validity_and_revocation_policy',
    'A governed validity and revocation-status policy must apply before a trust root can authorize witness verification.',
  ),
  requirement(
    'requirement.fr156.signer_chain_and_semantic_trust_evidence_verifier',
    'A governed signer-chain and semantic trust-evidence verifier must bind FR155 candidate evidence to the externally governed root.',
  ),
] as const);

function validatePredecessor(): void {
  const predecessor = getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155();
  if (
    predecessor.nextFrontier !== FR155_NEXT_FRONTIER
    || predecessor.issuedFR154VerificationRequired !== true
    || predecessor.exactFR154VerificationCoverageRequired !== true
    || predecessor.trustEvidenceArtifactBytesRetainedInOutput !== false
    || predecessor.callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer !== false
    || predecessor.trustEvidenceByteMatchMeansSemanticContentVerified !== false
    || predecessor.productionWitnessVerificationAlgorithm !== null
    || predecessor.pinnedWitnessTrustRootRef !== null
    || predecessor.governedWitnessTrustRootEstablishedByThisArtifact !== false
    || predecessor.signerKeyTrustEstablishedByThisArtifact !== false
    || predecessor.witnessAuthorityTrustBoundByThisArtifact !== false
    || predecessor.independentSessionEvidenceAdmittedByThisArtifact !== false
    || predecessor.constructValidationPerformedByThisArtifact !== false
    || predecessor.thresholdDefinitionPerformedByThisArtifact !== false
    || predecessor.repeatabilityInterpretationPerformedByThisArtifact !== false
  ) fail('FR-155 predecessor trust or authority boundary drift.');
}

export function getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156() {
  validatePredecessor();
  return Object.freeze({
    schemaVersion: 'fr156-square-broad-fang-external-witness-trust-root-provisioning-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR156_RECORD_ID,
    predecessorNextFrontier: FR155_NEXT_FRONTIER,
    protocolFrozenBeforeTrustedRootAdmission: true as const,
    externalGovernanceAuthorityRequired: true as const,
    trustRootArtifactBytesRequiredAtAdmission: true as const,
    trustRootAuthorityIdentityVerificationRequired: true as const,
    trustRootArtifactSemanticContentVerificationRequired: true as const,
    trustRootKeyPinningByExternalGovernanceRequired: true as const,
    validityAndRevocationPolicyRequired: true as const,
    signerChainVerificationPolicyRequired: true as const,
    semanticTrustEvidenceVerifierRequired: true as const,
    callerSuppliedTrustRootRefMeansGovernedTrustRoot: false as const,
    callerSuppliedPublicKeyMeansPinnedTrustRoot: false as const,
    byteDigestMatchMeansTrustedRoot: false as const,
    selfSignedOrSyntheticCredentialMeansExternalTrustRoot: false as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    externalTrustRootProvisionedByThisArtifact: false as const,
    semanticTrustEvidenceVerificationPerformedByThisArtifact: false as const,
    independentSessionEvidenceAdmittedByThisArtifact: false as const,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    evidenceRequirements: EVIDENCE_REQUIREMENTS,
    nextFrontier: FR156_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156():
SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1 {
  const contract = getSquareBroadFangExternalWitnessTrustRootProvisioningContractFR156();
  if (
    contract.protocolFrozenBeforeTrustedRootAdmission !== true
    || contract.externalGovernanceAuthorityRequired !== true
    || contract.trustRootAuthorityIdentityVerificationRequired !== true
    || contract.trustRootArtifactSemanticContentVerificationRequired !== true
    || contract.trustRootKeyPinningByExternalGovernanceRequired !== true
    || contract.validityAndRevocationPolicyRequired !== true
    || contract.semanticTrustEvidenceVerifierRequired !== true
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.externalTrustRootProvisionedByThisArtifact !== false
    || contract.independentSessionEvidenceAdmittedByThisArtifact !== false
    || contract.nextFrontier !== FR156_NEXT_FRONTIER
  ) fail('FR-156 contract drift at protocol materialization.');

  const output: SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1 = Object.freeze({
    schemaVersion: 'fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR156_RECORD_ID,
    authorityState:
      'external_witness_trust_root_provisioning_protocol_frozen_no_external_trust_root_materialized_or_semantic_verification_performed' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr155NextFrontier: FR155_NEXT_FRONTIER,
      fr155ExactFR154VerificationCoverageRequired: true as const,
      fr155TrustEvidenceArtifactBytesRetainedInOutput: false as const,
      fr155CallerSuppliedIssuerRefMeansTrustedIssuer: false as const,
      fr155GovernedWitnessTrustRootEstablishedByThisArtifact: false as const,
      fr155SignerKeyTrustEstablishedByThisArtifact: false as const,
      fr155WitnessAuthorityTrustBoundByThisArtifact: false as const,
      fr155IndependentSessionEvidenceAdmittedByThisArtifact: false as const,
      fr155ProductionWitnessVerificationAlgorithm: null,
      fr155PinnedWitnessTrustRootRef: null,
    }),
    prospectiveTrustRoot: Object.freeze({
      protocolFrozenBeforeTrustedRootAdmission: true as const,
      externalGovernanceAuthorityRequired: true as const,
      trustRootAuthorityRefRequired: true as const,
      trustRootArtifactRefRequired: true as const,
      trustRootArtifactBytesRequiredAtAdmission: true as const,
      trustRootArtifactDeclaredDigestExactMatchRequired: true as const,
      trustRootAuthorityIdentityVerificationRequired: true as const,
      trustRootArtifactSemanticContentVerificationRequired: true as const,
      trustRootKeyPinningByExternalGovernanceRequired: true as const,
      trustRootPolicyRefRequired: true as const,
      trustRootValidityPolicyRefRequired: true as const,
      trustRootRevocationStatusPolicyRefRequired: true as const,
      signerChainVerificationPolicyRequired: true as const,
      semanticTrustEvidenceVerifierRequired: true as const,
      trustRootArtifactBytesMayRemainEphemeral: true as const,
      sourceFaceImageRequired: false as const,
      sourceFaceImageDigestRequired: false as const,
      exactCaptureTimestampRequired: false as const,
      geolocationRequired: false as const,
      deviceIdentifierRequired: false as const,
    }),
    insufficiencyRules: Object.freeze({
      callerSuppliedTrustRootRefMeansGovernedTrustRoot: false as const,
      callerSuppliedPublicKeyMeansPinnedTrustRoot: false as const,
      trustRootArtifactByteDigestMatchMeansAuthorityIdentityVerified: false as const,
      trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false as const,
      mathematicalSignatureValidityMeansTrustedRootOrWitness: false as const,
      selfSignedCredentialMeansExternalTrustRoot: false as const,
      syntheticCredentialMeansExternalTrustRoot: false as const,
      claimedIssuerRefMeansIssuerIdentityVerified: false as const,
      opaquePolicyRefMeansPolicyVerified: false as const,
      fr154MechanicalSignatureMeansTrustedWitness: false as const,
      fr155CandidateTrustEvidenceMeansSignerTrustEstablished: false as const,
      fr155CandidateBundleMeansGovernedTrustRootExists: false as const,
      historicalFR146OrFR147EvidenceEligibleForTrustRootSubstitution: false as const,
    }),
    evidenceRequirements: EVIDENCE_REQUIREMENTS,
    trustBoundary: Object.freeze({
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      externalTrustRootProvisioned: false as const,
      governedWitnessTrustRootEstablished: false as const,
      trustRootAuthorityIdentityVerified: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      trustRootKeyPinnedByExternalGovernance: false as const,
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
      externalTrustRootProvisioningProtocolFrozen: true as const,
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
        'blocked_pending_external_governed_trust_root_semantic_verification_and_real_prospective_session_evidence' as const,
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
      trustRootArtifactBytesAcceptedByThisProtocolArtifact: false as const,
      trustRootArtifactBytesPersisted: false as const,
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
    researchNoteRef: FR156_RESEARCH_NOTE_REF,
    nextFrontier: FR156_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156(
  value: SquareBroadFangExternalWitnessTrustRootProvisioningProtocolFR156V1,
): void {
  if (!ISSUED.has(value)) {
    fail('external witness trust-root provisioning protocol was not issued by the active FR-156 boundary.');
  }
}