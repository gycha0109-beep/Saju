import type {
  FaceCaptureQualityPolicyArtifact,
  FaceReviewArtifactRetentionPolicy,
} from './calibration-protocol.js';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import { FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS } from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
  FR188_CAPTURE_PROTOCOL_REF,
  FR188_NEXT_FRONTIER,
  FR188_SPLIT_POLICY_REF,
  FR188_UNRESOLVED_SUPPORT_REQUIREMENTS,
  FR188_VERDICT,
  issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
} from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR189_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_capture_quality_review_artifact_retention_support.fr189' as const;
export const FR189_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr189-eye-pair-xi-chang-capture-quality-review-artifact-retention.md' as const;
export const FR189_QUALITY_ARTIFACT_ID = 'quality.face.eye_pair.xi_chang.frontal' as const;
export const FR189_QUALITY_ARTIFACT_VERSION = '0.1.0' as const;
export const FR189_QUALITY_POLICY_REF = 'quality.face.eye_pair.xi_chang.frontal@0.1.0' as const;
export const FR189_RETENTION_ARTIFACT_ID = 'retention.face.eye_pair.xi_chang.review_artifact' as const;
export const FR189_RETENTION_ARTIFACT_VERSION = '0.1.0' as const;
export const FR189_RETENTION_POLICY_REF = 'retention.face.eye_pair.xi_chang.review_artifact@0.1.0' as const;
export const FR189_VERDICT =
  'GOVERNED_XI_CHANG_CAPTURE_QUALITY_AND_REVIEW_ARTIFACT_RETENTION_SUPPORT_ISSUED_STUDY_REGISTRATION_AND_EVIDENCE_COLLECTION_NOT_ADMITTED' as const;
export const FR189_NEXT_FRONTIER =
  'register_governed_xi_chang_mapping_evidence_study_before_any_participant_capture_expert_label_or_metric_evidence_collection' as const;

export const FR189_CAPTURE_QUALITY_REQUIRED_CHECKS = Object.freeze([
  'single_face',
  'frontal_pose',
  'sharpness',
  'bilateral_eye_region_visibility',
  'bilateral_eye_landmark_coverage',
  'major_eye_region_occlusion',
] as const);

export const FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS = Object.freeze([
  'xi_candidate_metric_value',
  'chang_candidate_metric_value',
  'xi_expert_label',
  'chang_expert_label',
  'candidate_directionality',
  'mapping_outcome',
  'fortune_output',
] as const);

export interface FR189CaptureQualityPolicyV1 extends FaceCaptureQualityPolicyArtifact {
  readonly artifactId: typeof FR189_QUALITY_ARTIFACT_ID;
  readonly version: typeof FR189_QUALITY_ARTIFACT_VERSION;
  readonly kind: 'capture_quality_policy';
  readonly requiredChecks: typeof FR189_CAPTURE_QUALITY_REQUIRED_CHECKS;
  readonly acceptancePolicyRef: 'acceptance.face.eye_pair.xi_chang.frontal.research_v0';
  readonly status: 'research';
  readonly bothEyesRequired: true;
  readonly qualityDecisionMustPrecedeCandidateMetricObservation: true;
  readonly qualityDecisionMustPrecedeExpertLabeling: true;
  readonly candidateMetricValuesMayInfluenceAcceptance: false;
  readonly traditionalConceptLabelsMayInfluenceAcceptance: false;
  readonly noseBridgeVisibilityRequired: false;
  readonly rejectedCaptureRequiresReason: true;
  readonly forbiddenDecisionInputs: typeof FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS;
  readonly executionAuthorized: false;
}

export const FR189_CAPTURE_QUALITY_POLICY: FR189CaptureQualityPolicyV1 = Object.freeze({
  artifactId: FR189_QUALITY_ARTIFACT_ID,
  version: FR189_QUALITY_ARTIFACT_VERSION,
  kind: 'capture_quality_policy',
  requiredChecks: FR189_CAPTURE_QUALITY_REQUIRED_CHECKS,
  acceptancePolicyRef: 'acceptance.face.eye_pair.xi_chang.frontal.research_v0',
  status: 'research',
  bothEyesRequired: true,
  qualityDecisionMustPrecedeCandidateMetricObservation: true,
  qualityDecisionMustPrecedeExpertLabeling: true,
  candidateMetricValuesMayInfluenceAcceptance: false,
  traditionalConceptLabelsMayInfluenceAcceptance: false,
  noseBridgeVisibilityRequired: false,
  rejectedCaptureRequiresReason: true,
  forbiddenDecisionInputs: FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS,
  executionAuthorized: false,
});

export interface FR189ReviewArtifactRetentionPolicyV1 extends FaceReviewArtifactRetentionPolicy {
  readonly artifactId: typeof FR189_RETENTION_ARTIFACT_ID;
  readonly version: typeof FR189_RETENTION_ARTIFACT_VERSION;
  readonly kind: 'review_artifact_retention_policy';
  readonly containsPotentiallyIdentifyingFace: true;
  readonly deleteTrigger: 'labeling_and_audit_complete';
  readonly maxRetentionDays: null;
  readonly accessScope: 'assigned_reviewers_and_auditors';
  readonly trainingReuseAllowed: false;
  readonly identityMatchingAllowed: false;
  readonly status: 'research';
  readonly participantPolicy: 'consented_pseudonymous';
  readonly purpose: 'blinded_expert_review_only';
  readonly originalSourceImageDeletedAfterReviewArtifactCreation: true;
  readonly reviewArtifactMayContainCandidateMetricValues: false;
  readonly reviewArtifactMayContainCandidateDirectionality: false;
  readonly rawProviderResponseRetentionAllowed: false;
  readonly rawLandmarkRetentionAllowed: false;
  readonly faceEmbeddingAllowed: false;
  readonly identityTemplateAllowed: false;
  readonly finiteCalendarRetentionWindowRequiredBeforeEvidenceCollection: true;
  readonly evidenceCollectionAuthorizedWithNullMaximum: false;
  readonly executionAuthorized: false;
}

export const FR189_REVIEW_ARTIFACT_RETENTION_POLICY: FR189ReviewArtifactRetentionPolicyV1 = Object.freeze({
  artifactId: FR189_RETENTION_ARTIFACT_ID,
  version: FR189_RETENTION_ARTIFACT_VERSION,
  kind: 'review_artifact_retention_policy',
  containsPotentiallyIdentifyingFace: true,
  deleteTrigger: 'labeling_and_audit_complete',
  maxRetentionDays: null,
  accessScope: 'assigned_reviewers_and_auditors',
  trainingReuseAllowed: false,
  identityMatchingAllowed: false,
  status: 'research',
  participantPolicy: 'consented_pseudonymous',
  purpose: 'blinded_expert_review_only',
  originalSourceImageDeletedAfterReviewArtifactCreation: true,
  reviewArtifactMayContainCandidateMetricValues: false,
  reviewArtifactMayContainCandidateDirectionality: false,
  rawProviderResponseRetentionAllowed: false,
  rawLandmarkRetentionAllowed: false,
  faceEmbeddingAllowed: false,
  identityTemplateAllowed: false,
  finiteCalendarRetentionWindowRequiredBeforeEvidenceCollection: true,
  evidenceCollectionAuthorizedWithNullMaximum: false,
  executionAuthorized: false,
});

export interface FR189AuthorityBoundaryV1 {
  readonly captureQualitySupportIssued: true;
  readonly reviewArtifactRetentionSupportIssued: true;
  readonly supportAuthorityIssued: true;
  readonly supportIssuanceCountsAsMappingEvidence: false;
  readonly commonCalibrationRegistryMutationAuthorized: false;
  readonly studyRegistrationAuthorized: false;
  readonly studyProtocolIssued: false;
  readonly evidenceCollectionAuthorized: false;
  readonly reviewArtifactIngestionAuthorized: false;
  readonly expertLabelCollectionAuthorized: false;
  readonly candidateMetricObservationAuthorized: false;
  readonly mappingAuthorized: false;
  readonly directionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly compoundRuleAuthorized: false;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1 {
  readonly schemaVersion: 'fr189-eye-pair-xi-chang-capture-quality-review-artifact-retention-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR189_RECORD_ID;
  readonly authorityState: 'capture_quality_and_review_artifact_retention_support_issued_no_study_registered_no_evidence_collected';
  readonly upstreamAuthority: {
    readonly fr188Verdict: typeof FR188_VERDICT;
    readonly fr188NextFrontier: typeof FR188_NEXT_FRONTIER;
    readonly fr188CaptureProtocolRef: typeof FR188_CAPTURE_PROTOCOL_REF;
    readonly fr188SplitPolicyRef: typeof FR188_SPLIT_POLICY_REF;
  };
  readonly qualityPolicyRef: typeof FR189_QUALITY_POLICY_REF;
  readonly retentionPolicyRef: typeof FR189_RETENTION_POLICY_REF;
  readonly captureQualityPolicy: typeof FR189_CAPTURE_QUALITY_POLICY;
  readonly reviewArtifactRetentionPolicy: typeof FR189_REVIEW_ARTIFACT_RETENTION_POLICY;
  readonly supportProgression: {
    readonly resolvedFR188SupportRequirements: typeof FR188_UNRESOLVED_SUPPORT_REQUIREMENTS;
    readonly remainingFR188SupportRequirements: readonly [];
    readonly supportResolutionDoesNotCountAsEmpiricalEvidence: true;
  };
  readonly evidenceProgression: {
    readonly newlySatisfiedMappingEvidenceRequirements: readonly [];
    readonly remainingUnsatisfiedMappingEvidenceRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
  };
  readonly blockerAccounting: {
    readonly resolvedExistingFR184Blockers: readonly [];
    readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
  };
  readonly authorityBoundary: FR189AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDataCollected: false;
    readonly participantImageAccepted: false;
    readonly reviewArtifactAccepted: false;
    readonly expertLabelsCollected: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesObserved: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
    readonly futureReviewArtifactPotentialIdentifiabilityAcknowledged: true;
  };
  readonly verdict: typeof FR189_VERDICT;
  readonly researchNoteRef: typeof FR189_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR189_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-189 ${message}`);
}

function exactStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFR189CaptureQualityPolicy(value: FR189CaptureQualityPolicyV1): void {
  if (
    value.artifactId !== FR189_QUALITY_ARTIFACT_ID
    || value.version !== FR189_QUALITY_ARTIFACT_VERSION
    || value.kind !== 'capture_quality_policy'
    || !exactStrings(value.requiredChecks, FR189_CAPTURE_QUALITY_REQUIRED_CHECKS)
    || (value.requiredChecks as readonly string[]).includes('nose_bridge_visibility')
    || value.acceptancePolicyRef !== 'acceptance.face.eye_pair.xi_chang.frontal.research_v0'
    || value.status !== 'research'
    || value.bothEyesRequired !== true
    || value.qualityDecisionMustPrecedeCandidateMetricObservation !== true
    || value.qualityDecisionMustPrecedeExpertLabeling !== true
    || value.candidateMetricValuesMayInfluenceAcceptance !== false
    || value.traditionalConceptLabelsMayInfluenceAcceptance !== false
    || value.noseBridgeVisibilityRequired !== false
    || value.rejectedCaptureRequiresReason !== true
    || !exactStrings(value.forbiddenDecisionInputs, FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS)
    || value.executionAuthorized !== false
  ) fail('capture-quality policy weakening, Nose-Bridge leakage, or authority widening detected.');
}

export function assertFR189ReviewArtifactRetentionPolicy(value: FR189ReviewArtifactRetentionPolicyV1): void {
  if (
    value.artifactId !== FR189_RETENTION_ARTIFACT_ID
    || value.version !== FR189_RETENTION_ARTIFACT_VERSION
    || value.kind !== 'review_artifact_retention_policy'
    || value.containsPotentiallyIdentifyingFace !== true
    || value.deleteTrigger !== 'labeling_and_audit_complete'
    || value.maxRetentionDays !== null
    || value.accessScope !== 'assigned_reviewers_and_auditors'
    || value.trainingReuseAllowed !== false
    || value.identityMatchingAllowed !== false
    || value.status !== 'research'
    || value.participantPolicy !== 'consented_pseudonymous'
    || value.purpose !== 'blinded_expert_review_only'
    || value.originalSourceImageDeletedAfterReviewArtifactCreation !== true
    || value.reviewArtifactMayContainCandidateMetricValues !== false
    || value.reviewArtifactMayContainCandidateDirectionality !== false
    || value.rawProviderResponseRetentionAllowed !== false
    || value.rawLandmarkRetentionAllowed !== false
    || value.faceEmbeddingAllowed !== false
    || value.identityTemplateAllowed !== false
    || value.finiteCalendarRetentionWindowRequiredBeforeEvidenceCollection !== true
    || value.evidenceCollectionAuthorizedWithNullMaximum !== false
    || value.executionAuthorized !== false
  ) fail('review-artifact retention/privacy weakening or authority widening detected.');
}

export function assertFR189AuthorityBoundary(value: FR189AuthorityBoundaryV1): void {
  if (
    value.captureQualitySupportIssued !== true
    || value.reviewArtifactRetentionSupportIssued !== true
    || value.supportAuthorityIssued !== true
    || value.supportIssuanceCountsAsMappingEvidence !== false
    || value.commonCalibrationRegistryMutationAuthorized !== false
    || value.studyRegistrationAuthorized !== false
    || value.studyProtocolIssued !== false
    || value.evidenceCollectionAuthorized !== false
    || value.reviewArtifactIngestionAuthorized !== false
    || value.expertLabelCollectionAuthorized !== false
    || value.candidateMetricObservationAuthorized !== false
    || value.mappingAuthorized !== false
    || value.directionalityAuthorized !== false
    || value.stableCriterionIdentityIssued !== false
    || value.thresholdIssued !== false
    || value.percentileIssued !== false
    || value.referencePopulationIssued !== false
    || value.calibrationEvidenceIssued !== false
    || value.calibrationProtocolIssued !== false
    || value.calibratedDecisionRuleIssued !== false
    || value.classifierIssued !== false
    || value.compoundRuleAuthorized !== false
    || value.productionRuleAuthorized !== false
    || value.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstream(): void {
  const fr188 = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188();
  assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(fr188);
  if (
    fr188.verdict !== FR188_VERDICT
    || fr188.nextFrontier !== FR188_NEXT_FRONTIER
    || fr188.captureProtocol.protocolRef !== FR188_CAPTURE_PROTOCOL_REF
    || fr188.splitPolicy.policyRef !== FR188_SPLIT_POLICY_REF
    || !exactStrings(fr188.unresolvedSupportRequirements, FR188_UNRESOLVED_SUPPORT_REQUIREMENTS)
    || fr188.authorityBoundary.supportAuthorityIssued !== false
    || fr188.authorityBoundary.evidenceCollectionAuthorized !== false
    || fr188.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-188 upstream authority drift.');
}

export function issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189(): EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1 {
  validateUpstream();
  assertFR189CaptureQualityPolicy(FR189_CAPTURE_QUALITY_POLICY);
  assertFR189ReviewArtifactRetentionPolicy(FR189_REVIEW_ARTIFACT_RETENTION_POLICY);

  const result: EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1 = Object.freeze({
    schemaVersion: 'fr189-eye-pair-xi-chang-capture-quality-review-artifact-retention-v1',
    artifactVersion: '0.1.0',
    recordId: FR189_RECORD_ID,
    authorityState: 'capture_quality_and_review_artifact_retention_support_issued_no_study_registered_no_evidence_collected',
    upstreamAuthority: Object.freeze({
      fr188Verdict: FR188_VERDICT,
      fr188NextFrontier: FR188_NEXT_FRONTIER,
      fr188CaptureProtocolRef: FR188_CAPTURE_PROTOCOL_REF,
      fr188SplitPolicyRef: FR188_SPLIT_POLICY_REF,
    }),
    qualityPolicyRef: FR189_QUALITY_POLICY_REF,
    retentionPolicyRef: FR189_RETENTION_POLICY_REF,
    captureQualityPolicy: FR189_CAPTURE_QUALITY_POLICY,
    reviewArtifactRetentionPolicy: FR189_REVIEW_ARTIFACT_RETENTION_POLICY,
    supportProgression: Object.freeze({
      resolvedFR188SupportRequirements: FR188_UNRESOLVED_SUPPORT_REQUIREMENTS,
      remainingFR188SupportRequirements: Object.freeze([] as const),
      supportResolutionDoesNotCountAsEmpiricalEvidence: true,
    }),
    evidenceProgression: Object.freeze({
      newlySatisfiedMappingEvidenceRequirements: Object.freeze([] as const),
      remainingUnsatisfiedMappingEvidenceRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
    }),
    blockerAccounting: Object.freeze({
      resolvedExistingFR184Blockers: Object.freeze([] as const),
      remainingBlockers: FR183_REMAINING_BLOCKERS,
    }),
    authorityBoundary: Object.freeze({
      captureQualitySupportIssued: true,
      reviewArtifactRetentionSupportIssued: true,
      supportAuthorityIssued: true,
      supportIssuanceCountsAsMappingEvidence: false,
      commonCalibrationRegistryMutationAuthorized: false,
      studyRegistrationAuthorized: false,
      studyProtocolIssued: false,
      evidenceCollectionAuthorized: false,
      reviewArtifactIngestionAuthorized: false,
      expertLabelCollectionAuthorized: false,
      candidateMetricObservationAuthorized: false,
      mappingAuthorized: false,
      directionalityAuthorized: false,
      stableCriterionIdentityIssued: false,
      thresholdIssued: false,
      percentileIssued: false,
      referencePopulationIssued: false,
      calibrationEvidenceIssued: false,
      calibrationProtocolIssued: false,
      calibratedDecisionRuleIssued: false,
      classifierIssued: false,
      compoundRuleAuthorized: false,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    }),
    privacyBoundary: Object.freeze({
      participantDataCollected: false,
      participantImageAccepted: false,
      reviewArtifactAccepted: false,
      expertLabelsCollected: false,
      rawProviderResponseAccepted: false,
      rawLandmarkSetAccepted: false,
      metricValuesObserved: false,
      metricValuesPersisted: false,
      faceEmbeddingAccepted: false,
      identityTemplateAccepted: false,
      biometricIdentityMatchingPerformed: false,
      futureReviewArtifactPotentialIdentifiabilityAcknowledged: true,
    }),
    verdict: FR189_VERDICT,
    researchNoteRef: FR189_RESEARCH_NOTE_REF,
    nextFrontier: FR189_NEXT_FRONTIER,
  });

  assertFR189AuthorityBoundary(result.authorityBoundary);
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189(
  value: EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by the governed FR-189 issuer.');
  if (value.verdict !== FR189_VERDICT || value.nextFrontier !== FR189_NEXT_FRONTIER) fail('issued artifact drift.');
  if (!exactStrings(value.supportProgression.resolvedFR188SupportRequirements, FR188_UNRESOLVED_SUPPORT_REQUIREMENTS)) {
    fail('resolved support requirement drift.');
  }
  if (value.supportProgression.remainingFR188SupportRequirements.length !== 0) fail('FR-188 support requirements remain unresolved.');
  if (value.evidenceProgression.newlySatisfiedMappingEvidenceRequirements.length !== 0) fail('support authority cannot satisfy empirical mapping evidence.');
  if (value.blockerAccounting.resolvedExistingFR184Blockers.length !== 0) fail('support authority cannot resolve existing mapping blockers.');
  assertFR189CaptureQualityPolicy(value.captureQualityPolicy);
  assertFR189ReviewArtifactRetentionPolicy(value.reviewArtifactRetentionPolicy);
  assertFR189AuthorityBoundary(value.authorityBoundary);
}
