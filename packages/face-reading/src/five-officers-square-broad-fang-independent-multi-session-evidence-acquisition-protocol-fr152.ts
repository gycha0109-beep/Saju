import {
  FR147_NEXT_FRONTIER,
  getSquareBroadFangCaptureConditionGovernanceContractFR147,
} from './five-officers-square-broad-fang-capture-condition-governance-fr147.js';
import {
  FR151_NEXT_FRONTIER,
  getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151,
} from './five-officers-square-broad-fang-capture-quality-perturbation-evidence-review-fr151.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR152_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_independent_multi_session_evidence_acquisition_protocol.fr152' as const;
export const FR152_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol.md' as const;
export const FR152_NEXT_FRONTIER =
  'square_broad_fang_prospective_independent_multi_session_capture_execution_and_external_witness_verification_before_candidate_construct_validation_decision' as const;

const ISSUED = new WeakSet<object>();

export interface SquareBroadFangIndependentMultiSessionEvidenceRequirementFR152V1 {
  readonly requirementRef: string;
  readonly required: true;
  readonly purpose: string;
  readonly satisfiedByHistoricalFR146OrFR147Evidence: false;
  readonly satisfiedByDistinctOpaqueRefsAlone: false;
  readonly satisfiedByByteDistinctnessAlone: false;
  readonly satisfiedByUploadOrAttachmentSeparationAlone: false;
  readonly satisfiedByOperatorSelfAttestationAlone: false;
}

export interface SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1 {
  readonly schemaVersion: 'fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR152_RECORD_ID;
  readonly authorityState: 'independent_multi_session_evidence_acquisition_protocol_frozen_no_session_evidence_admitted';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly predecessor: {
    readonly fr147NextFrontier: typeof FR147_NEXT_FRONTIER;
    readonly fr147SessionAssignmentAuthority: 'study_operator_declared_not_independently_verified';
    readonly fr147MultiSessionIndependenceVerified: false;
    readonly fr151NextFrontier: typeof FR151_NEXT_FRONTIER;
    readonly fr151ConstructValidationPerformed: false;
    readonly fr151IndependentMultiSessionEvidenceAdmitted: false;
  };
  readonly prospectiveAcquisition: {
    readonly protocolFrozenBeforeQualifyingCaptureExecution: true;
    readonly minimumQualifyingSessionCount: 2;
    readonly eachQualifyingSessionRequiresNewCaptureEvent: true;
    readonly eachQualifyingSessionRequiresDistinctSessionRef: true;
    readonly eachQualifyingSessionRequiresDistinctCaptureEventRef: true;
    readonly eachQualifyingSessionRequiresExternalOrOperatorIndependentWitness: true;
    readonly eachQualifyingSessionRequiresWitnessArtifactRef: true;
    readonly eachQualifyingSessionRequiresWitnessAuthorityRef: true;
    readonly eachQualifyingSessionRequiresWitnessVerificationReport: true;
    readonly witnessArtifactByteVerificationRequired: true;
    readonly witnessAuthorityTrustBindingRequired: true;
    readonly captureToWitnessBindingRequired: true;
    readonly sessionSeparationClaimRequired: true;
    readonly sessionSeparationMustBeVerifiedByAdmissionBoundary: true;
    readonly sourceImageMayRemainEphemeral: true;
    readonly sourceDigestRequired: false;
    readonly rawImagePersistenceRequired: false;
    readonly exactCaptureTimestampPersistenceRequired: false;
    readonly geolocationPersistenceRequired: false;
    readonly deviceIdentifierPersistenceRequired: false;
  };
  readonly insufficiencyRules: {
    readonly distinctStudyLocalSessionRefsMeanIndependentSessions: false;
    readonly distinctCaptureEventRefsMeanIndependentCaptureEvents: false;
    readonly byteDistinctnessMeansIndependentCaptureEvents: false;
    readonly fileMetadataTimestampMeansTrustedCaptureTimestamp: false;
    readonly uploadTimeMeansCaptureTime: false;
    readonly separateChatAttachmentsMeanSeparateCaptureSessions: false;
    readonly perturbationVariantsMeanIndependentCaptures: false;
    readonly historicalFR146CapturesAutoEligibleForIndependentSessionAdmission: false;
    readonly retrospectiveSessionRelabelingAllowed: false;
  };
  readonly witnessTrustBoundary: {
    readonly acceptableWitnessClass: 'external_or_operator_independent';
    readonly studyOperatorSelfAttestationAloneAccepted: false;
    readonly suppliedWitnessRefMeansTrustedWitness: false;
    readonly suppliedWitnessPublicKeyMeansPinnedTrustRoot: false;
    readonly mathematicalSignatureValidityAloneMeansTrustedWitnessIdentity: false;
    readonly productionWitnessVerificationAlgorithm: null;
    readonly pinnedWitnessTrustRootRef: null;
    readonly witnessTrustRootDefinedByThisArtifact: false;
    readonly witnessArtifactSemanticContentVerifiedByThisArtifact: false;
    readonly independentSessionEvidenceCanBeAdmittedByThisArtifact: false;
  };
  readonly evidenceRequirements: readonly SquareBroadFangIndependentMultiSessionEvidenceRequirementFR152V1[];
  readonly authorityBoundary: {
    readonly acquisitionProtocolFrozen: true;
    readonly prospectiveIndependentSessionEvidenceRequired: true;
    readonly independentMultiSessionEvidenceAcquired: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly candidateConstructAdvanceDecision: 'blocked_pending_prospective_independent_session_evidence_and_trusted_witness_verification';
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawPixelRasterPersisted: false;
    readonly rawAggregatePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
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
  readonly researchNoteRef: typeof FR152_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR152_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-152 ${message}`);
}

function requirement(
  requirementRef: string,
  purpose: string,
): SquareBroadFangIndependentMultiSessionEvidenceRequirementFR152V1 {
  return Object.freeze({
    requirementRef,
    required: true as const,
    purpose,
    satisfiedByHistoricalFR146OrFR147Evidence: false as const,
    satisfiedByDistinctOpaqueRefsAlone: false as const,
    satisfiedByByteDistinctnessAlone: false as const,
    satisfiedByUploadOrAttachmentSeparationAlone: false as const,
    satisfiedByOperatorSelfAttestationAlone: false as const,
  });
}

const EVIDENCE_REQUIREMENTS = Object.freeze([
  requirement(
    'requirement.fr152.prospective_capture_event',
    'Each qualifying session must contain a new source-backed capture event executed after the FR152 protocol freeze.',
  ),
  requirement(
    'requirement.fr152.external_or_operator_independent_session_witness',
    'Each qualifying session must have a witness artifact from an external or operator-independent witness authority.',
  ),
  requirement(
    'requirement.fr152.witness_artifact_byte_verification',
    'Witness artifact bytes must be verified against the evidence record before admission.',
  ),
  requirement(
    'requirement.fr152.witness_authority_trust_binding',
    'The witness identity must be bound to a pinned or otherwise governed trust authority rather than a caller-supplied reference alone.',
  ),
  requirement(
    'requirement.fr152.capture_to_witness_binding',
    'The qualifying capture event must be bound to its witness evidence without persisting raw face media or a source digest.',
  ),
  requirement(
    'requirement.fr152.verified_session_separation',
    'At least two qualifying session records must have independently supportable session separation before multi-session admission.',
  ),
] as const);

function validatePredecessors(): void {
  const fr147 = getSquareBroadFangCaptureConditionGovernanceContractFR147();
  if (
    fr147.nextFrontier !== FR147_NEXT_FRONTIER
    || fr147.admission.sessionEvidence !== 'study_operator_declared_session_ref_not_independently_verified'
    || fr147.admission.distinctSessionRefsMeanIndependentCaptureSessions !== false
    || fr147.admission.distinctCaptureEventRefsMeanIndependentCaptureEvents !== false
  ) fail('FR-147 predecessor session-evidence boundary drift.');

  const fr151 = getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151();
  if (
    fr151.nextFrontier !== FR151_NEXT_FRONTIER
    || fr151.reviewBoundary.constructValidationPerformedByThisArtifact !== false
    || fr151.reviewBoundary.independentMultiSessionEvidenceAdmitted !== false
    || fr151.reviewBoundary.captureQualityThresholdsDefined !== false
    || fr151.reviewBoundary.repeatabilityThresholdsDefined !== false
    || fr151.reviewBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-151 predecessor authority boundary drift.');
}

export function getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152() {
  validatePredecessors();
  return Object.freeze({
    schemaVersion: 'fr152-square-broad-fang-independent-multi-session-evidence-acquisition-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR152_RECORD_ID,
    minimumQualifyingSessionCount: 2 as const,
    prospectiveOnly: true as const,
    historicalFR146OrFR147AutoAdmissionAllowed: false as const,
    retrospectiveSessionRelabelingAllowed: false as const,
    operatorDeclaredSessionRefsSufficient: false as const,
    independentWitnessRequired: true as const,
    witnessTrustBindingRequired: true as const,
    productionWitnessVerificationAlgorithm: null,
    pinnedWitnessTrustRootRef: null,
    evidenceRequirements: EVIDENCE_REQUIREMENTS,
    constructValidationPerformedByThisArtifact: false as const,
    thresholdDefinitionPerformedByThisArtifact: false as const,
    repeatabilityInterpretationPerformedByThisArtifact: false as const,
    nextFrontier: FR152_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152():
SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1 {
  const contract = getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152();
  if (
    contract.minimumQualifyingSessionCount !== 2
    || contract.prospectiveOnly !== true
    || contract.independentWitnessRequired !== true
    || contract.witnessTrustBindingRequired !== true
    || contract.productionWitnessVerificationAlgorithm !== null
    || contract.pinnedWitnessTrustRootRef !== null
    || contract.nextFrontier !== FR152_NEXT_FRONTIER
  ) fail('FR-152 contract drift at protocol materialization.');

  const output: SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1 = Object.freeze({
    schemaVersion: 'fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR152_RECORD_ID,
    authorityState: 'independent_multi_session_evidence_acquisition_protocol_frozen_no_session_evidence_admitted' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    predecessor: Object.freeze({
      fr147NextFrontier: FR147_NEXT_FRONTIER,
      fr147SessionAssignmentAuthority: 'study_operator_declared_not_independently_verified' as const,
      fr147MultiSessionIndependenceVerified: false as const,
      fr151NextFrontier: FR151_NEXT_FRONTIER,
      fr151ConstructValidationPerformed: false as const,
      fr151IndependentMultiSessionEvidenceAdmitted: false as const,
    }),
    prospectiveAcquisition: Object.freeze({
      protocolFrozenBeforeQualifyingCaptureExecution: true as const,
      minimumQualifyingSessionCount: 2 as const,
      eachQualifyingSessionRequiresNewCaptureEvent: true as const,
      eachQualifyingSessionRequiresDistinctSessionRef: true as const,
      eachQualifyingSessionRequiresDistinctCaptureEventRef: true as const,
      eachQualifyingSessionRequiresExternalOrOperatorIndependentWitness: true as const,
      eachQualifyingSessionRequiresWitnessArtifactRef: true as const,
      eachQualifyingSessionRequiresWitnessAuthorityRef: true as const,
      eachQualifyingSessionRequiresWitnessVerificationReport: true as const,
      witnessArtifactByteVerificationRequired: true as const,
      witnessAuthorityTrustBindingRequired: true as const,
      captureToWitnessBindingRequired: true as const,
      sessionSeparationClaimRequired: true as const,
      sessionSeparationMustBeVerifiedByAdmissionBoundary: true as const,
      sourceImageMayRemainEphemeral: true as const,
      sourceDigestRequired: false as const,
      rawImagePersistenceRequired: false as const,
      exactCaptureTimestampPersistenceRequired: false as const,
      geolocationPersistenceRequired: false as const,
      deviceIdentifierPersistenceRequired: false as const,
    }),
    insufficiencyRules: Object.freeze({
      distinctStudyLocalSessionRefsMeanIndependentSessions: false as const,
      distinctCaptureEventRefsMeanIndependentCaptureEvents: false as const,
      byteDistinctnessMeansIndependentCaptureEvents: false as const,
      fileMetadataTimestampMeansTrustedCaptureTimestamp: false as const,
      uploadTimeMeansCaptureTime: false as const,
      separateChatAttachmentsMeanSeparateCaptureSessions: false as const,
      perturbationVariantsMeanIndependentCaptures: false as const,
      historicalFR146CapturesAutoEligibleForIndependentSessionAdmission: false as const,
      retrospectiveSessionRelabelingAllowed: false as const,
    }),
    witnessTrustBoundary: Object.freeze({
      acceptableWitnessClass: 'external_or_operator_independent' as const,
      studyOperatorSelfAttestationAloneAccepted: false as const,
      suppliedWitnessRefMeansTrustedWitness: false as const,
      suppliedWitnessPublicKeyMeansPinnedTrustRoot: false as const,
      mathematicalSignatureValidityAloneMeansTrustedWitnessIdentity: false as const,
      productionWitnessVerificationAlgorithm: null,
      pinnedWitnessTrustRootRef: null,
      witnessTrustRootDefinedByThisArtifact: false as const,
      witnessArtifactSemanticContentVerifiedByThisArtifact: false as const,
      independentSessionEvidenceCanBeAdmittedByThisArtifact: false as const,
    }),
    evidenceRequirements: EVIDENCE_REQUIREMENTS,
    authorityBoundary: Object.freeze({
      acquisitionProtocolFrozen: true as const,
      prospectiveIndependentSessionEvidenceRequired: true as const,
      independentMultiSessionEvidenceAcquired: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      candidateConstructAdvanceDecision: 'blocked_pending_prospective_independent_session_evidence_and_trusted_witness_verification' as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawPixelRasterPersisted: false as const,
      rawAggregatePersisted: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
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
    researchNoteRef: FR152_RESEARCH_NOTE_REF,
    nextFrontier: FR152_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(
  value: SquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152V1,
): void {
  if (!ISSUED.has(value)) fail('independent multi-session acquisition protocol was not issued by the active FR-152 boundary.');
}
