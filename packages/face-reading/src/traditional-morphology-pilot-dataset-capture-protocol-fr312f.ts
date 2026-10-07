import {
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL,
} from './traditional-empirical-admission-protocol-design-fr312d.js';
import {
  FR312E_ANNOTATION_CONTRACT,
  FR312E_ANNOTATION_LABELS,
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES,
  FR312E_NOT_OBSERVABLE_REASONS,
  FR312E_RULE_OBSERVATION_CONTRACTS,
  assertMorphologyOnlyAnnotationSpecFR312E,
  type MorphologyAnnotationLabelFR312E,
} from './traditional-morphology-only-annotation-spec-fr312e.js';

export const FR312F_PROTOCOL_ID =
  'fr312f.morphology_pilot_dataset_capture_protocol' as const;

export type MorphologyPilotPartitionFR312F =
  | 'development'
  | 'calibration'
  | 'holdout';

export const FR312F_CAPTURE_REJECTION_REASONS = Object.freeze([
  ...FR312E_NOT_OBSERVABLE_REASONS,
  'multiple_faces',
  'capture_not_fresh',
  'session_or_participant_provenance_missing',
] as const);

export interface MorphologyPilotUnitHierarchyFR312F {
  readonly participantUnit: 'protocol_local_pseudonymous_participant_ref';
  readonly sessionUnit: 'one_temporally_distinct_session_for_one_participant';
  readonly captureUnit: 'one_fresh_capture_attempt_within_one_session';
  readonly imageUnit: 'one_capture_frame_admitted_by_quality_gate';
  readonly annotationUnit:
    'single_image_single_canonical_morphology_predicate';
  readonly metricUnit:
    'single_admitted_image_single_registered_neutral_comparator';
  readonly participantOwnsSessions: true;
  readonly sessionOwnsCaptures: true;
  readonly imageMayOwnManyPredicateAnnotations: true;
  readonly imageMayOwnManyMetricRecords: true;
}

export interface MorphologyPilotCaptureProtocolFR312F {
  readonly captureMode: 'single_frontal';
  readonly sessionsPerParticipant: 2;
  readonly acceptedCapturesPerSessionTarget: 2;
  readonly acceptedCapturesPerParticipantTarget: 4;
  readonly temporallyDistinctSessionsRequired: true;
  readonly numericMinimumSessionSeparationAuthorized: false;
  readonly independentRecaptureRequired: true;
  readonly freshCaptureRequired: true;
  readonly historicalImageReuseAuthorized: false;
  readonly eligibilityUsesOnlyFR312ECaptureValidity: true;
  readonly eligibilityMayReadMorphologyLabel: false;
  readonly eligibilityMayReadNeutralMetric: false;
  readonly rejectedCaptureRequiresReason: true;
  readonly rejectedCaptureEligibleForPrimaryDataset: false;
  readonly extraAcceptedCaptureCherryPickingAuthorized: false;
  readonly captureStopsAfterAcceptedTargetReached: true;
  readonly degreePoseThresholdAuthorized: false;
  readonly pixelQualityThresholdAuthorized: false;
  readonly ratioQualityThresholdAuthorized: false;
  readonly executionAuthorized: false;
}

export interface MorphologyPilotAnnotationAssignmentFR312F {
  readonly canonicalPredicateIds: readonly string[];
  readonly labels: readonly MorphologyAnnotationLabelFR312E[];
  readonly everyAdmittedImageReceivesEveryCanonicalPredicateTask: true;
  readonly primaryIndependentAnnotationsPerTask: 2;
  readonly primaryAnnotatorsMustWorkIndependently: true;
  readonly primaryAnnotatorMaySeeOtherAnswer: false;
  readonly primaryAnnotatorMaySeeNeutralMetric: false;
  readonly primaryAnnotatorMaySeeComparatorCalculation: false;
  readonly primaryAnnotatorMaySeeTraditionalSemanticTail: false;
  readonly primaryAnnotationLockedBeforeAdjudication: true;
  readonly disagreementAdjudicationRequired: true;
  readonly adjudicatorMaySeeLockedPrimaryLabels: true;
  readonly adjudicatorMaySeeNeutralMetric: false;
  readonly adjudicatorMaySeeTraditionalSemanticTail: false;
  readonly adjudicatedLabelStoredSeparately: true;
  readonly disagreementHistoryPreserved: true;
  readonly agreementAcceptanceValueAuthorized: false;
  readonly executionAuthorized: false;
}

export interface MorphologyPilotPartitionPolicyFR312F {
  readonly splitUnit: 'participant';
  readonly partitions: readonly [
    'development',
    'calibration',
    'holdout',
  ];
  readonly participantLeakageAllowed: false;
  readonly sessionLeakageAllowed: false;
  readonly captureFamilyLeakageAllowed: false;
  readonly imageLeakageAllowed: false;
  readonly allParticipantSessionsStayInOnePartition: true;
  readonly assignmentFrozenBeforeMetricValuesObserved: true;
  readonly assignmentFrozenBeforeMorphologyLabelsObserved: true;
  readonly developmentMayInformProtocolRevision: true;
  readonly calibrationReservedForFutureAssociationWork: true;
  readonly holdoutSealedUntilAnalysisPlanIsFrozen: true;
  readonly thresholdDiscoveryMayReadHoldout: false;
  readonly postHocReassignmentAuthorized: false;
  readonly participantCount: null;
  readonly partitionRatios: null;
  readonly assignmentAlgorithm: null;
  readonly participantSamplingRuleAuthorized: false;
  readonly executionAuthorized: false;
}

export interface MorphologyPilotMetricTimingFR312F {
  readonly comparatorKeys: readonly string[];
  readonly extractionRequiresCaptureAdmission: true;
  readonly extractionBeforeQualityDecisionAuthorized: false;
  readonly valuesReleasedToPrimaryAnnotators: false;
  readonly valuesReleasedToAdjudicator: false;
  readonly metricLabelAssociationBeforePrimaryAnnotationLockAuthorized: false;
  readonly preferredExtractionTiming: 'after_primary_annotation_lock';
  readonly metricReliabilityAdjudicationAuthorizedByFR312F: false;
  readonly morphologyEquivalenceAdjudicationAuthorizedByFR312F: false;
  readonly thresholdDiscoveryAuthorizedByFR312F: false;
}

export interface MorphologyPilotPrivacyPrerequisitesFR312F {
  readonly pseudonymousParticipantRefRequired: true;
  readonly directIdentityDataRequiredInMeasurementDataset: false;
  readonly identityMatchingAuthorized: false;
  readonly identityTemplateAuthorized: false;
  readonly finiteReviewImageRetentionRequiredBeforeCollection: true;
  readonly finiteReviewImageRetentionIssued: false;
  readonly maxReviewImageRetentionDays: null;
  readonly unboundedImageRetentionAuthorized: false;
  readonly consentAndWithdrawalProcedureRequiredBeforeCollection: true;
  readonly consentAndWithdrawalProcedureIssued: false;
  readonly actualParticipantCollectionAuthorized: false;
}

export interface MorphologyPilotSampleDesignFR312F {
  readonly repeatCaptureStructureRationale:
    'two_temporally_distinct_sessions_with_two_accepted_captures_each_is_a_minimum_repeat_structure_not_empirical_sufficiency';
  readonly participantCount: null;
  readonly participantCountAuthorized: false;
  readonly partitionRatios: null;
  readonly partitionRatiosAuthorized: false;
  readonly demographicQuotaPlan: null;
  readonly demographicQuotaAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly minimumAgreementAcceptanceValue: null;
  readonly minimumReliabilityAcceptanceValue: null;
  readonly minimumEquivalenceAcceptanceValue: null;
  readonly fixedSampleSizeWithoutEvidenceBasisAuthorized: false;
}

export const FR312F_UNIT_HIERARCHY:
MorphologyPilotUnitHierarchyFR312F = Object.freeze({
  participantUnit: 'protocol_local_pseudonymous_participant_ref',
  sessionUnit: 'one_temporally_distinct_session_for_one_participant',
  captureUnit: 'one_fresh_capture_attempt_within_one_session',
  imageUnit: 'one_capture_frame_admitted_by_quality_gate',
  annotationUnit: 'single_image_single_canonical_morphology_predicate',
  metricUnit: 'single_admitted_image_single_registered_neutral_comparator',
  participantOwnsSessions: true,
  sessionOwnsCaptures: true,
  imageMayOwnManyPredicateAnnotations: true,
  imageMayOwnManyMetricRecords: true,
});

export const FR312F_CAPTURE_PROTOCOL:
MorphologyPilotCaptureProtocolFR312F = Object.freeze({
  captureMode: 'single_frontal',
  sessionsPerParticipant: 2,
  acceptedCapturesPerSessionTarget: 2,
  acceptedCapturesPerParticipantTarget: 4,
  temporallyDistinctSessionsRequired: true,
  numericMinimumSessionSeparationAuthorized: false,
  independentRecaptureRequired: true,
  freshCaptureRequired: true,
  historicalImageReuseAuthorized: false,
  eligibilityUsesOnlyFR312ECaptureValidity: true,
  eligibilityMayReadMorphologyLabel: false,
  eligibilityMayReadNeutralMetric: false,
  rejectedCaptureRequiresReason: true,
  rejectedCaptureEligibleForPrimaryDataset: false,
  extraAcceptedCaptureCherryPickingAuthorized: false,
  captureStopsAfterAcceptedTargetReached: true,
  degreePoseThresholdAuthorized: false,
  pixelQualityThresholdAuthorized: false,
  ratioQualityThresholdAuthorized: false,
  executionAuthorized: false,
});

const PREDICATE_IDS = Object.freeze(
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES.map((item) => item.predicateId),
);

const COMPARATOR_KEYS = Object.freeze([
  ...new Set(
    FR312E_RULE_OBSERVATION_CONTRACTS.flatMap(
      (item) => item.neutralComparatorKeys,
    ),
  ),
]);

export const FR312F_ANNOTATION_ASSIGNMENT:
MorphologyPilotAnnotationAssignmentFR312F = Object.freeze({
  canonicalPredicateIds: PREDICATE_IDS,
  labels: FR312E_ANNOTATION_LABELS,
  everyAdmittedImageReceivesEveryCanonicalPredicateTask: true,
  primaryIndependentAnnotationsPerTask: 2,
  primaryAnnotatorsMustWorkIndependently: true,
  primaryAnnotatorMaySeeOtherAnswer: false,
  primaryAnnotatorMaySeeNeutralMetric: false,
  primaryAnnotatorMaySeeComparatorCalculation: false,
  primaryAnnotatorMaySeeTraditionalSemanticTail: false,
  primaryAnnotationLockedBeforeAdjudication: true,
  disagreementAdjudicationRequired: true,
  adjudicatorMaySeeLockedPrimaryLabels: true,
  adjudicatorMaySeeNeutralMetric: false,
  adjudicatorMaySeeTraditionalSemanticTail: false,
  adjudicatedLabelStoredSeparately: true,
  disagreementHistoryPreserved: true,
  agreementAcceptanceValueAuthorized: false,
  executionAuthorized: false,
});

export const FR312F_PARTITION_POLICY:
MorphologyPilotPartitionPolicyFR312F = Object.freeze({
  splitUnit: 'participant',
  partitions: Object.freeze([
    'development',
    'calibration',
    'holdout',
  ] as const),
  participantLeakageAllowed: false,
  sessionLeakageAllowed: false,
  captureFamilyLeakageAllowed: false,
  imageLeakageAllowed: false,
  allParticipantSessionsStayInOnePartition: true,
  assignmentFrozenBeforeMetricValuesObserved: true,
  assignmentFrozenBeforeMorphologyLabelsObserved: true,
  developmentMayInformProtocolRevision: true,
  calibrationReservedForFutureAssociationWork: true,
  holdoutSealedUntilAnalysisPlanIsFrozen: true,
  thresholdDiscoveryMayReadHoldout: false,
  postHocReassignmentAuthorized: false,
  participantCount: null,
  partitionRatios: null,
  assignmentAlgorithm: null,
  participantSamplingRuleAuthorized: false,
  executionAuthorized: false,
});

export const FR312F_METRIC_TIMING:
MorphologyPilotMetricTimingFR312F = Object.freeze({
  comparatorKeys: COMPARATOR_KEYS,
  extractionRequiresCaptureAdmission: true,
  extractionBeforeQualityDecisionAuthorized: false,
  valuesReleasedToPrimaryAnnotators: false,
  valuesReleasedToAdjudicator: false,
  metricLabelAssociationBeforePrimaryAnnotationLockAuthorized: false,
  preferredExtractionTiming: 'after_primary_annotation_lock',
  metricReliabilityAdjudicationAuthorizedByFR312F: false,
  morphologyEquivalenceAdjudicationAuthorizedByFR312F: false,
  thresholdDiscoveryAuthorizedByFR312F: false,
});

export const FR312F_PRIVACY_PREREQUISITES:
MorphologyPilotPrivacyPrerequisitesFR312F = Object.freeze({
  pseudonymousParticipantRefRequired: true,
  directIdentityDataRequiredInMeasurementDataset: false,
  identityMatchingAuthorized: false,
  identityTemplateAuthorized: false,
  finiteReviewImageRetentionRequiredBeforeCollection: true,
  finiteReviewImageRetentionIssued: false,
  maxReviewImageRetentionDays: null,
  unboundedImageRetentionAuthorized: false,
  consentAndWithdrawalProcedureRequiredBeforeCollection: true,
  consentAndWithdrawalProcedureIssued: false,
  actualParticipantCollectionAuthorized: false,
});

export const FR312F_SAMPLE_DESIGN:
MorphologyPilotSampleDesignFR312F = Object.freeze({
  repeatCaptureStructureRationale:
    'two_temporally_distinct_sessions_with_two_accepted_captures_each_is_a_minimum_repeat_structure_not_empirical_sufficiency',
  participantCount: null,
  participantCountAuthorized: false,
  partitionRatios: null,
  partitionRatiosAuthorized: false,
  demographicQuotaPlan: null,
  demographicQuotaAuthorized: false,
  populationNormAuthorized: false,
  minimumAgreementAcceptanceValue: null,
  minimumReliabilityAcceptanceValue: null,
  minimumEquivalenceAcceptanceValue: null,
  fixedSampleSizeWithoutEvidenceBasisAuthorized: false,
});

export const FR312F_DATASET_DESIGN = Object.freeze({
  protocolId: FR312F_PROTOCOL_ID,
  authorityState:
    'dataset_and_capture_protocol_defined_collection_not_authorized' as const,
  upstream: Object.freeze({
    fr312dCandidateRuleIds: Object.freeze([
      ...FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.candidateRuleIds,
    ]),
    fr312eCanonicalPredicateIds: PREDICATE_IDS,
    fr312eAnnotationLabels: FR312E_ANNOTATION_LABELS,
  }),
  unitHierarchy: FR312F_UNIT_HIERARCHY,
  captureProtocol: FR312F_CAPTURE_PROTOCOL,
  annotationAssignment: FR312F_ANNOTATION_ASSIGNMENT,
  partitionPolicy: FR312F_PARTITION_POLICY,
  metricTiming: FR312F_METRIC_TIMING,
  privacyPrerequisites: FR312F_PRIVACY_PREREQUISITES,
  sampleDesign: FR312F_SAMPLE_DESIGN,
  collectionAuthorization: Object.freeze({
    participantRecruitmentAuthorized: false as const,
    actualImageCollectionAuthorized: false as const,
    actualAnnotationCollectionAuthorized: false as const,
    actualMetricCollectionAuthorized: false as const,
  }),
  nextFrontier:
    'prepare_fr312g_neutral_metric_reliability_study_only_after_collection_prerequisites_are_separately_authorized' as const,
});

export const FR312F_AUTHORITY_BOUNDARY = Object.freeze({
  empiricalExecutionAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  semanticClaimValidationAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  thresholdValueAuthorized: false as const,
  partitionRatioAuthorized: false as const,
  participantCountAuthorized: false as const,
  participantSamplingRuleAuthorized: false as const,
  demographicQuotaAuthorized: false as const,
  minimumAcceptanceValueAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  populationNormAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  prohibitedPersonInferenceAuthorized: false as const,
});

function sameStrings(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);
}

export function assertMorphologyPilotDatasetCaptureProtocolFR312F(): void {
  assertMorphologyOnlyAnnotationSpecFR312E();

  if (
    !sameStrings(
      FR312F_PARTITION_POLICY.partitions,
      FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.requiredPartitions,
    )
  ) {
    throw new Error('fr312f_partition_contract_drift');
  }

  const expectedPredicateIds = FR312E_CANONICAL_MORPHOLOGY_PREDICATES
    .map((item) => item.predicateId);
  if (
    expectedPredicateIds.length !== 10
    || !sameStrings(
      FR312F_ANNOTATION_ASSIGNMENT.canonicalPredicateIds,
      expectedPredicateIds,
    )
  ) {
    throw new Error('fr312f_predicate_coverage_drift');
  }

  if (
    !sameStrings(
      FR312F_ANNOTATION_ASSIGNMENT.labels,
      ['present', 'absent', 'indeterminate', 'not_observable'],
    )
  ) {
    throw new Error('fr312f_annotation_label_drift');
  }

  for (const reason of FR312E_NOT_OBSERVABLE_REASONS) {
    if (!FR312F_CAPTURE_REJECTION_REASONS.includes(reason)) {
      throw new Error('fr312f_missing_capture_reason:' + reason);
    }
  }

  if (
    FR312F_CAPTURE_PROTOCOL.sessionsPerParticipant !== 2
    || FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerSessionTarget !== 2
    || FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerParticipantTarget !== 4
    || FR312F_CAPTURE_PROTOCOL.eligibilityMayReadMorphologyLabel !== false
    || FR312F_CAPTURE_PROTOCOL.eligibilityMayReadNeutralMetric !== false
    || FR312F_CAPTURE_PROTOCOL.extraAcceptedCaptureCherryPickingAuthorized
      !== false
    || FR312F_CAPTURE_PROTOCOL.executionAuthorized !== false
  ) {
    throw new Error('fr312f_capture_protocol_drift');
  }

  if (
    FR312F_ANNOTATION_ASSIGNMENT.primaryIndependentAnnotationsPerTask !== 2
    || FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorsMustWorkIndependently
      !== true
    || FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeOtherAnswer
      !== false
    || FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeNeutralMetric
      !== false
    || FR312F_ANNOTATION_ASSIGNMENT.adjudicatorMaySeeNeutralMetric !== false
    || FR312F_ANNOTATION_ASSIGNMENT.disagreementHistoryPreserved !== true
    || FR312F_ANNOTATION_ASSIGNMENT.executionAuthorized !== false
  ) {
    throw new Error('fr312f_annotation_assignment_drift');
  }

  if (
    FR312F_PARTITION_POLICY.splitUnit !== 'participant'
    || FR312F_PARTITION_POLICY.participantLeakageAllowed !== false
    || FR312F_PARTITION_POLICY.sessionLeakageAllowed !== false
    || FR312F_PARTITION_POLICY.captureFamilyLeakageAllowed !== false
    || FR312F_PARTITION_POLICY.imageLeakageAllowed !== false
    || FR312F_PARTITION_POLICY.thresholdDiscoveryMayReadHoldout !== false
    || FR312F_PARTITION_POLICY.postHocReassignmentAuthorized !== false
    || FR312F_PARTITION_POLICY.participantCount !== null
    || FR312F_PARTITION_POLICY.partitionRatios !== null
    || FR312F_PARTITION_POLICY.participantSamplingRuleAuthorized !== false
  ) {
    throw new Error('fr312f_partition_policy_drift');
  }

  if (
    FR312F_METRIC_TIMING.extractionRequiresCaptureAdmission !== true
    || FR312F_METRIC_TIMING.extractionBeforeQualityDecisionAuthorized !== false
    || FR312F_METRIC_TIMING.valuesReleasedToPrimaryAnnotators !== false
    || FR312F_METRIC_TIMING.valuesReleasedToAdjudicator !== false
    || FR312F_METRIC_TIMING
      .metricLabelAssociationBeforePrimaryAnnotationLockAuthorized !== false
    || FR312F_METRIC_TIMING.thresholdDiscoveryAuthorizedByFR312F !== false
  ) {
    throw new Error('fr312f_metric_timing_drift');
  }

  if (
    FR312F_PRIVACY_PREREQUISITES.finiteReviewImageRetentionIssued !== false
    || FR312F_PRIVACY_PREREQUISITES.maxReviewImageRetentionDays !== null
    || FR312F_PRIVACY_PREREQUISITES.identityMatchingAuthorized !== false
    || FR312F_PRIVACY_PREREQUISITES.identityTemplateAuthorized !== false
    || FR312F_PRIVACY_PREREQUISITES.actualParticipantCollectionAuthorized
      !== false
  ) {
    throw new Error('fr312f_privacy_prerequisite_drift');
  }

  if (
    FR312F_SAMPLE_DESIGN.participantCount !== null
    || FR312F_SAMPLE_DESIGN.participantCountAuthorized !== false
    || FR312F_SAMPLE_DESIGN.partitionRatios !== null
    || FR312F_SAMPLE_DESIGN.partitionRatiosAuthorized !== false
    || FR312F_SAMPLE_DESIGN.demographicQuotaPlan !== null
    || FR312F_SAMPLE_DESIGN.demographicQuotaAuthorized !== false
    || FR312F_SAMPLE_DESIGN.minimumAgreementAcceptanceValue !== null
    || FR312F_SAMPLE_DESIGN.minimumReliabilityAcceptanceValue !== null
    || FR312F_SAMPLE_DESIGN.minimumEquivalenceAcceptanceValue !== null
    || FR312F_SAMPLE_DESIGN.fixedSampleSizeWithoutEvidenceBasisAuthorized
      !== false
  ) {
    throw new Error('fr312f_sample_design_authority_drift');
  }

  if (
    FR312E_ANNOTATION_CONTRACT.empiricalExecutionAuthorized !== false
    || FR312F_DATASET_DESIGN.collectionAuthorization
      .participantRecruitmentAuthorized !== false
    || FR312F_DATASET_DESIGN.collectionAuthorization
      .actualImageCollectionAuthorized !== false
    || FR312F_DATASET_DESIGN.collectionAuthorization
      .actualAnnotationCollectionAuthorized !== false
    || FR312F_DATASET_DESIGN.collectionAuthorization
      .actualMetricCollectionAuthorized !== false
  ) {
    throw new Error('fr312f_collection_authority_widening');
  }

  for (const [key, value] of Object.entries(FR312F_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312f_global_authority_widening:' + key);
    }
  }
}
