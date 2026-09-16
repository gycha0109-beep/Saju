import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186,
  FR186_MAPPING_HYPOTHESES,
  FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
  issueEyePairXiChangMappingHypothesisProvenanceFR186,
  type FR186MappingHypothesisV1,
} from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
  FR187_OPERATIONALIZATION_TASKS,
  FR187_PROTOCOL_REF,
  issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
  type FR187OperationalizationTaskV1,
} from './eye-pair-xi-chang-blinded-expert-operationalization-protocol-fr187.js';
import {
  assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
  FR188_CAPTURE_PROTOCOL_REF,
  FR188_SPLIT_POLICY_REF,
  issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
} from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import {
  assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189,
  FR189_NEXT_FRONTIER,
  FR189_QUALITY_POLICY_REF,
  FR189_RETENTION_POLICY_REF,
  FR189_REVIEW_ARTIFACT_RETENTION_POLICY,
  FR189_VERDICT,
  issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189,
} from './eye-pair-xi-chang-capture-quality-review-artifact-retention-fr189.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR190_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_mapping_evidence_study_registration.fr190' as const;
export const FR190_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr190-eye-pair-xi-chang-mapping-evidence-study-registration.md' as const;
export const FR190_REGISTRATION_REF =
  'research.face_reading.xi_chang_mapping_evidence_study_registration.fr190.v1' as const;
export const FR190_VERDICT =
  'GOVERNED_XI_CHANG_MAPPING_EVIDENCE_STUDY_REGISTERED_COLLECTION_AND_EMPIRICAL_EVIDENCE_NOT_ADMITTED' as const;
export const FR190_NEXT_FRONTIER =
  'define_governed_xi_chang_construct_correspondence_and_alternative_metric_confound_preregistration_before_evidence_collection' as const;

export const FR190_PRE_COLLECTION_BLOCKING_REASONS = Object.freeze([
  'finite_calendar_review_artifact_retention_window_not_issued',
  'source_grounded_construct_correspondence_analysis_protocol_not_defined',
  'alternative_metric_and_confound_rejection_plan_not_defined',
  'evidence_collection_authorization_not_issued',
] as const);

export const FR190_STUDY_ARM_IDS = Object.freeze([
  'research.face_reading.xi_mapping_evidence_study_arm.fr190.v1',
  'research.face_reading.chang_mapping_evidence_study_arm.fr190.v1',
] as const);

const XI_HYPOTHESIS = FR186_MAPPING_HYPOTHESES[0]!;
const CHANG_HYPOTHESIS = FR186_MAPPING_HYPOTHESES[1]!;
const XI_TASK = FR187_OPERATIONALIZATION_TASKS[0]!;
const CHANG_TASK = FR187_OPERATIONALIZATION_TASKS[1]!;

export interface FR190StudyArmV1 {
  readonly studyArmId: typeof FR190_STUDY_ARM_IDS[number];
  readonly registrationRef: typeof FR190_REGISTRATION_REF;
  readonly hypothesisId: FR186MappingHypothesisV1['hypothesisId'];
  readonly traditionalConcept: FR186MappingHypothesisV1['traditionalConcept'];
  readonly candidateMetricRef: FR186MappingHypothesisV1['candidateMetricRef'];
  readonly hypothesisMethodologyRef: FR186MappingHypothesisV1['methodologyRef'];
  readonly sourceWorkRef: FR186MappingHypothesisV1['sourceWorkRef'];
  readonly sourceWitnessId: FR186MappingHypothesisV1['sourceWitnessId'];
  readonly sourceClauses: readonly string[];
  readonly exactSourcePage: 146;
  readonly exactSourcePageImageRef: FR186MappingHypothesisV1['exactSourcePageImageRef'];
  readonly exactSourcePageImageSha256: FR186MappingHypothesisV1['exactSourcePageImageSha256'];
  readonly operationalizationTaskId: FR187OperationalizationTaskV1['taskId'];
  readonly operationalizationProtocolRef: typeof FR187_PROTOCOL_REF;
  readonly captureProtocolRef: typeof FR188_CAPTURE_PROTOCOL_REF;
  readonly splitPolicyRef: typeof FR188_SPLIT_POLICY_REF;
  readonly qualityPolicyRef: typeof FR189_QUALITY_POLICY_REF;
  readonly retentionPolicyRef: typeof FR189_RETENTION_POLICY_REF;
  readonly requiredMappingEvidenceRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
  readonly registrationState: 'registered_blocked_pre_collection';
  readonly blockingReasons: typeof FR190_PRE_COLLECTION_BLOCKING_REASONS;
  readonly stableCriterionId: null;
  readonly directionality: null;
  readonly thresholdRef: null;
  readonly percentileRef: null;
  readonly referencePopulationRef: null;
  readonly mappingRelationRef: null;
  readonly empiricalEvidenceIssued: false;
  readonly evidenceCollectionAuthorized: false;
  readonly participantCaptureAuthorized: false;
  readonly reviewArtifactIngestionAuthorized: false;
  readonly expertLabelCollectionAuthorized: false;
  readonly candidateMetricObservationAuthorized: false;
  readonly postHocMutationAuthorized: false;
}

function armFrom(
  studyArmId: FR190StudyArmV1['studyArmId'],
  hypothesis: FR186MappingHypothesisV1,
  task: FR187OperationalizationTaskV1,
): FR190StudyArmV1 {
  return Object.freeze({
    studyArmId,
    registrationRef: FR190_REGISTRATION_REF,
    hypothesisId: hypothesis.hypothesisId,
    traditionalConcept: hypothesis.traditionalConcept,
    candidateMetricRef: hypothesis.candidateMetricRef,
    hypothesisMethodologyRef: hypothesis.methodologyRef,
    sourceWorkRef: hypothesis.sourceWorkRef,
    sourceWitnessId: hypothesis.sourceWitnessId,
    sourceClauses: hypothesis.sourceClauses,
    exactSourcePage: hypothesis.exactSourcePage,
    exactSourcePageImageRef: hypothesis.exactSourcePageImageRef,
    exactSourcePageImageSha256: hypothesis.exactSourcePageImageSha256,
    operationalizationTaskId: task.taskId,
    operationalizationProtocolRef: FR187_PROTOCOL_REF,
    captureProtocolRef: FR188_CAPTURE_PROTOCOL_REF,
    splitPolicyRef: FR188_SPLIT_POLICY_REF,
    qualityPolicyRef: FR189_QUALITY_POLICY_REF,
    retentionPolicyRef: FR189_RETENTION_POLICY_REF,
    requiredMappingEvidenceRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
    registrationState: 'registered_blocked_pre_collection',
    blockingReasons: FR190_PRE_COLLECTION_BLOCKING_REASONS,
    stableCriterionId: null,
    directionality: null,
    thresholdRef: null,
    percentileRef: null,
    referencePopulationRef: null,
    mappingRelationRef: null,
    empiricalEvidenceIssued: false,
    evidenceCollectionAuthorized: false,
    participantCaptureAuthorized: false,
    reviewArtifactIngestionAuthorized: false,
    expertLabelCollectionAuthorized: false,
    candidateMetricObservationAuthorized: false,
    postHocMutationAuthorized: false,
  });
}

export const FR190_STUDY_ARMS: readonly [FR190StudyArmV1, FR190StudyArmV1] = Object.freeze([
  armFrom(FR190_STUDY_ARM_IDS[0], XI_HYPOTHESIS, XI_TASK),
  armFrom(FR190_STUDY_ARM_IDS[1], CHANG_HYPOTHESIS, CHANG_TASK),
]);

export interface FR190AuthorityBoundaryV1 {
  readonly isolatedMappingEvidenceStudyRegistrationIssued: true;
  readonly studyRegistrationIssued: true;
  readonly studyProtocolIssued: true;
  readonly registrationCountsAsEmpiricalEvidence: false;
  readonly commonCalibrationRegistryMutationAuthorized: false;
  readonly commonCalibrationStudyDefinitionIssued: false;
  readonly stableCriterionIdentityIssued: false;
  readonly finiteCalendarRetentionWindowIssued: false;
  readonly constructCorrespondenceProtocolDefined: false;
  readonly alternativeMetricConfoundProtocolDefined: false;
  readonly evidenceCollectionAuthorized: false;
  readonly participantCaptureAuthorized: false;
  readonly reviewArtifactIngestionAuthorized: false;
  readonly expertLabelCollectionAuthorized: false;
  readonly candidateMetricObservationAuthorized: false;
  readonly repeatCaptureStabilityEvidenceIssued: false;
  readonly blindedExpertOperationalizationEvidenceIssued: false;
  readonly constructCorrespondenceEvidenceIssued: false;
  readonly alternativeMetricConfoundEvidenceIssued: false;
  readonly mappingAuthorized: false;
  readonly directionalityAuthorized: false;
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

export interface EyePairXiChangMappingEvidenceStudyRegistrationFR190V1 {
  readonly schemaVersion: 'fr190-eye-pair-xi-chang-mapping-evidence-study-registration-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR190_RECORD_ID;
  readonly authorityState: 'mapping_evidence_study_registered_blocked_pre_collection';
  readonly upstreamAuthority: {
    readonly fr189Verdict: typeof FR189_VERDICT;
    readonly fr189NextFrontier: typeof FR189_NEXT_FRONTIER;
    readonly retentionMaximumDays: null;
    readonly commonCalibrationRegistryStillUnmodified: true;
  };
  readonly registration: {
    readonly registrationRef: typeof FR190_REGISTRATION_REF;
    readonly registrationState: 'registered_blocked_pre_collection';
    readonly studyArms: typeof FR190_STUDY_ARMS;
    readonly blockingReasons: typeof FR190_PRE_COLLECTION_BLOCKING_REASONS;
    readonly frozenBeforeEvidenceCollection: true;
    readonly postHocMutationAuthorized: false;
  };
  readonly evidenceProgression: {
    readonly newlySatisfiedMappingEvidenceRequirements: readonly [];
    readonly remainingUnsatisfiedMappingEvidenceRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
    readonly studyRegistrationCountsAsEvidence: false;
  };
  readonly blockerAccounting: {
    readonly resolvedExistingFR184Blockers: readonly [];
    readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
  };
  readonly authorityBoundary: FR190AuthorityBoundaryV1;
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
  };
  readonly verdict: typeof FR190_VERDICT;
  readonly researchNoteRef: typeof FR190_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR190_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-190 ${message}`);
}

function exactStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFR190StudyArm(actual: FR190StudyArmV1, expected: FR190StudyArmV1): void {
  if (
    actual.studyArmId !== expected.studyArmId
    || actual.registrationRef !== FR190_REGISTRATION_REF
    || actual.hypothesisId !== expected.hypothesisId
    || actual.traditionalConcept !== expected.traditionalConcept
    || actual.candidateMetricRef !== expected.candidateMetricRef
    || actual.hypothesisMethodologyRef !== expected.hypothesisMethodologyRef
    || actual.sourceWorkRef !== expected.sourceWorkRef
    || actual.sourceWitnessId !== expected.sourceWitnessId
    || !exactStrings(actual.sourceClauses, expected.sourceClauses)
    || actual.exactSourcePage !== 146
    || actual.exactSourcePageImageRef !== expected.exactSourcePageImageRef
    || actual.exactSourcePageImageSha256 !== expected.exactSourcePageImageSha256
    || actual.operationalizationTaskId !== expected.operationalizationTaskId
    || actual.operationalizationProtocolRef !== FR187_PROTOCOL_REF
    || actual.captureProtocolRef !== FR188_CAPTURE_PROTOCOL_REF
    || actual.splitPolicyRef !== FR188_SPLIT_POLICY_REF
    || actual.qualityPolicyRef !== FR189_QUALITY_POLICY_REF
    || actual.retentionPolicyRef !== FR189_RETENTION_POLICY_REF
    || actual.requiredMappingEvidenceRequirements !== FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS
    || actual.registrationState !== 'registered_blocked_pre_collection'
    || !exactStrings(actual.blockingReasons, FR190_PRE_COLLECTION_BLOCKING_REASONS)
    || actual.stableCriterionId !== null
    || actual.directionality !== null
    || actual.thresholdRef !== null
    || actual.percentileRef !== null
    || actual.referencePopulationRef !== null
    || actual.mappingRelationRef !== null
    || actual.empiricalEvidenceIssued !== false
    || actual.evidenceCollectionAuthorized !== false
    || actual.participantCaptureAuthorized !== false
    || actual.reviewArtifactIngestionAuthorized !== false
    || actual.expertLabelCollectionAuthorized !== false
    || actual.candidateMetricObservationAuthorized !== false
    || actual.postHocMutationAuthorized !== false
  ) fail('study-arm ref drift, blocker removal, evidence leakage, or authority widening detected.');
}

export function assertFR190AuthorityBoundary(value: FR190AuthorityBoundaryV1): void {
  if (
    value.isolatedMappingEvidenceStudyRegistrationIssued !== true
    || value.studyRegistrationIssued !== true
    || value.studyProtocolIssued !== true
    || value.registrationCountsAsEmpiricalEvidence !== false
    || value.commonCalibrationRegistryMutationAuthorized !== false
    || value.commonCalibrationStudyDefinitionIssued !== false
    || value.stableCriterionIdentityIssued !== false
    || value.finiteCalendarRetentionWindowIssued !== false
    || value.constructCorrespondenceProtocolDefined !== false
    || value.alternativeMetricConfoundProtocolDefined !== false
    || value.evidenceCollectionAuthorized !== false
    || value.participantCaptureAuthorized !== false
    || value.reviewArtifactIngestionAuthorized !== false
    || value.expertLabelCollectionAuthorized !== false
    || value.candidateMetricObservationAuthorized !== false
    || value.repeatCaptureStabilityEvidenceIssued !== false
    || value.blindedExpertOperationalizationEvidenceIssued !== false
    || value.constructCorrespondenceEvidenceIssued !== false
    || value.alternativeMetricConfoundEvidenceIssued !== false
    || value.mappingAuthorized !== false
    || value.directionalityAuthorized !== false
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
  const fr186 = issueEyePairXiChangMappingHypothesisProvenanceFR186();
  assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186(fr186);
  const fr187 = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
  assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187(fr187);
  const fr188 = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188();
  assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(fr188);
  const fr189 = issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189();
  assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189(fr189);

  if (
    fr189.verdict !== FR189_VERDICT
    || fr189.nextFrontier !== FR189_NEXT_FRONTIER
    || fr189.qualityPolicyRef !== FR189_QUALITY_POLICY_REF
    || fr189.retentionPolicyRef !== FR189_RETENTION_POLICY_REF
    || FR189_REVIEW_ARTIFACT_RETENTION_POLICY.maxRetentionDays !== null
    || fr189.authorityBoundary.studyRegistrationAuthorized !== false
    || fr189.authorityBoundary.evidenceCollectionAuthorized !== false
    || fr189.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-189 upstream authority drift.');

  if (
    fr186.hypotheses !== FR186_MAPPING_HYPOTHESES
    || fr187.protocol.protocolRef !== FR187_PROTOCOL_REF
    || fr188.captureProtocol.protocolRef !== FR188_CAPTURE_PROTOCOL_REF
    || fr188.splitPolicy.policyRef !== FR188_SPLIT_POLICY_REF
  ) fail('FR-186/187/188 bound authority drift.');
}

export function issueEyePairXiChangMappingEvidenceStudyRegistrationFR190(): EyePairXiChangMappingEvidenceStudyRegistrationFR190V1 {
  validateUpstream();
  assertFR190StudyArm(FR190_STUDY_ARMS[0], FR190_STUDY_ARMS[0]);
  assertFR190StudyArm(FR190_STUDY_ARMS[1], FR190_STUDY_ARMS[1]);

  const authorityBoundary: FR190AuthorityBoundaryV1 = Object.freeze({
    isolatedMappingEvidenceStudyRegistrationIssued: true,
    studyRegistrationIssued: true,
    studyProtocolIssued: true,
    registrationCountsAsEmpiricalEvidence: false,
    commonCalibrationRegistryMutationAuthorized: false,
    commonCalibrationStudyDefinitionIssued: false,
    stableCriterionIdentityIssued: false,
    finiteCalendarRetentionWindowIssued: false,
    constructCorrespondenceProtocolDefined: false,
    alternativeMetricConfoundProtocolDefined: false,
    evidenceCollectionAuthorized: false,
    participantCaptureAuthorized: false,
    reviewArtifactIngestionAuthorized: false,
    expertLabelCollectionAuthorized: false,
    candidateMetricObservationAuthorized: false,
    repeatCaptureStabilityEvidenceIssued: false,
    blindedExpertOperationalizationEvidenceIssued: false,
    constructCorrespondenceEvidenceIssued: false,
    alternativeMetricConfoundEvidenceIssued: false,
    mappingAuthorized: false,
    directionalityAuthorized: false,
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
  });
  assertFR190AuthorityBoundary(authorityBoundary);

  const result: EyePairXiChangMappingEvidenceStudyRegistrationFR190V1 = Object.freeze({
    schemaVersion: 'fr190-eye-pair-xi-chang-mapping-evidence-study-registration-v1',
    artifactVersion: '0.1.0',
    recordId: FR190_RECORD_ID,
    authorityState: 'mapping_evidence_study_registered_blocked_pre_collection',
    upstreamAuthority: Object.freeze({
      fr189Verdict: FR189_VERDICT,
      fr189NextFrontier: FR189_NEXT_FRONTIER,
      retentionMaximumDays: null,
      commonCalibrationRegistryStillUnmodified: true,
    }),
    registration: Object.freeze({
      registrationRef: FR190_REGISTRATION_REF,
      registrationState: 'registered_blocked_pre_collection',
      studyArms: FR190_STUDY_ARMS,
      blockingReasons: FR190_PRE_COLLECTION_BLOCKING_REASONS,
      frozenBeforeEvidenceCollection: true,
      postHocMutationAuthorized: false,
    }),
    evidenceProgression: Object.freeze({
      newlySatisfiedMappingEvidenceRequirements: Object.freeze([]),
      remainingUnsatisfiedMappingEvidenceRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
      studyRegistrationCountsAsEvidence: false,
    }),
    blockerAccounting: Object.freeze({
      resolvedExistingFR184Blockers: Object.freeze([]),
      remainingBlockers: FR183_REMAINING_BLOCKERS,
    }),
    authorityBoundary,
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
    }),
    verdict: FR190_VERDICT,
    researchNoteRef: FR190_RESEARCH_NOTE_REF,
    nextFrontier: FR190_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangMappingEvidenceStudyRegistrationFR190(
  value: EyePairXiChangMappingEvidenceStudyRegistrationFR190V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by the governed FR190 issuer.');
  if (value.verdict !== FR190_VERDICT || value.nextFrontier !== FR190_NEXT_FRONTIER) fail('issued artifact drift.');
  if (value.registration.studyArms !== FR190_STUDY_ARMS) fail('registered study-arm identity drift.');
  if (value.registration.blockingReasons !== FR190_PRE_COLLECTION_BLOCKING_REASONS) fail('pre-collection blocker identity drift.');
  if (value.registration.frozenBeforeEvidenceCollection !== true || value.registration.postHocMutationAuthorized !== false) {
    fail('study registration mutability widening detected.');
  }
  assertFR190StudyArm(value.registration.studyArms[0], FR190_STUDY_ARMS[0]);
  assertFR190StudyArm(value.registration.studyArms[1], FR190_STUDY_ARMS[1]);
  assertFR190AuthorityBoundary(value.authorityBoundary);
  if (value.evidenceProgression.newlySatisfiedMappingEvidenceRequirements.length !== 0) fail('registration cannot issue empirical evidence.');
  if (value.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements !== FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS) {
    fail('mapping evidence requirement identity drift.');
  }
  if (value.blockerAccounting.resolvedExistingFR184Blockers.length !== 0 || value.blockerAccounting.remainingBlockers !== FR183_REMAINING_BLOCKERS) {
    fail('fixed blocker accounting drift.');
  }
}
