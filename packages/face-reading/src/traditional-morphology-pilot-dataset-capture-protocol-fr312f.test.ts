import { describe, expect, it } from 'vitest';
import {
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL,
} from './traditional-empirical-admission-protocol-design-fr312d.js';
import {
  FR312E_ANNOTATION_LABELS,
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES,
  FR312E_NOT_OBSERVABLE_REASONS,
} from './traditional-morphology-only-annotation-spec-fr312e.js';
import {
  FR312F_ANNOTATION_ASSIGNMENT,
  FR312F_AUTHORITY_BOUNDARY,
  FR312F_CAPTURE_PROTOCOL,
  FR312F_CAPTURE_REJECTION_REASONS,
  FR312F_DATASET_DESIGN,
  FR312F_METRIC_TIMING,
  FR312F_PARTITION_POLICY,
  FR312F_PRIVACY_PREREQUISITES,
  FR312F_SAMPLE_DESIGN,
  FR312F_UNIT_HIERARCHY,
  assertMorphologyPilotDatasetCaptureProtocolFR312F,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';

describe('FR312F morphology pilot dataset and capture protocol', () => {
  it('stays regression-linked to FR312D partitions and FR312E predicates', () => {
    expect(() => assertMorphologyPilotDatasetCaptureProtocolFR312F())
      .not.toThrow();

    expect(FR312F_PARTITION_POLICY.partitions)
      .toEqual(FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.requiredPartitions);

    expect(FR312F_ANNOTATION_ASSIGNMENT.canonicalPredicateIds).toEqual(
      FR312E_CANONICAL_MORPHOLOGY_PREDICATES.map((item) => item.predicateId),
    );
    expect(FR312F_ANNOTATION_ASSIGNMENT.canonicalPredicateIds).toHaveLength(10);
    expect(FR312F_ANNOTATION_ASSIGNMENT.labels)
      .toEqual(FR312E_ANNOTATION_LABELS);
  });

  it('defines the participant to annotation and metric unit hierarchy', () => {
    expect(FR312F_UNIT_HIERARCHY).toEqual({
      participantUnit: 'protocol_local_pseudonymous_participant_ref',
      sessionUnit: 'one_temporally_distinct_session_for_one_participant',
      captureUnit: 'one_fresh_capture_attempt_within_one_session',
      imageUnit: 'one_capture_frame_admitted_by_quality_gate',
      annotationUnit: 'single_image_single_canonical_morphology_predicate',
      metricUnit:
        'single_admitted_image_single_registered_neutral_comparator',
      participantOwnsSessions: true,
      sessionOwnsCaptures: true,
      imageMayOwnManyPredicateAnnotations: true,
      imageMayOwnManyMetricRecords: true,
    });
  });

  it('uses a minimum repeat structure without claiming empirical sufficiency', () => {
    expect(FR312F_CAPTURE_PROTOCOL.captureMode).toBe('single_frontal');
    expect(FR312F_CAPTURE_PROTOCOL.sessionsPerParticipant).toBe(2);
    expect(FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerSessionTarget).toBe(2);
    expect(FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerParticipantTarget).toBe(4);
    expect(FR312F_CAPTURE_PROTOCOL.temporallyDistinctSessionsRequired)
      .toBe(true);
    expect(FR312F_CAPTURE_PROTOCOL.independentRecaptureRequired).toBe(true);

    expect(FR312F_SAMPLE_DESIGN.repeatCaptureStructureRationale).toContain(
      'minimum_repeat_structure_not_empirical_sufficiency',
    );
    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.participantCountAuthorized).toBe(false);
  });

  it('keeps capture admission blind to morphology and metric values', () => {
    expect(FR312F_CAPTURE_PROTOCOL.eligibilityUsesOnlyFR312ECaptureValidity)
      .toBe(true);
    expect(FR312F_CAPTURE_PROTOCOL.eligibilityMayReadMorphologyLabel)
      .toBe(false);
    expect(FR312F_CAPTURE_PROTOCOL.eligibilityMayReadNeutralMetric)
      .toBe(false);
    expect(FR312F_CAPTURE_PROTOCOL.rejectedCaptureRequiresReason).toBe(true);
    expect(FR312F_CAPTURE_PROTOCOL.rejectedCaptureEligibleForPrimaryDataset)
      .toBe(false);
    expect(FR312F_CAPTURE_PROTOCOL.extraAcceptedCaptureCherryPickingAuthorized)
      .toBe(false);
    expect(FR312F_CAPTURE_PROTOCOL.captureStopsAfterAcceptedTargetReached)
      .toBe(true);

    for (const reason of FR312E_NOT_OBSERVABLE_REASONS) {
      expect(FR312F_CAPTURE_REJECTION_REASONS).toContain(reason);
    }
  });

  it('separates independent primary annotations from adjudication', () => {
    expect(FR312F_ANNOTATION_ASSIGNMENT.primaryIndependentAnnotationsPerTask)
      .toBe(2);
    expect(FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorsMustWorkIndependently)
      .toBe(true);
    expect(FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeOtherAnswer)
      .toBe(false);
    expect(FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeNeutralMetric)
      .toBe(false);
    expect(
      FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeComparatorCalculation,
    ).toBe(false);
    expect(
      FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotatorMaySeeTraditionalSemanticTail,
    ).toBe(false);
    expect(FR312F_ANNOTATION_ASSIGNMENT.primaryAnnotationLockedBeforeAdjudication)
      .toBe(true);

    expect(FR312F_ANNOTATION_ASSIGNMENT.disagreementAdjudicationRequired)
      .toBe(true);
    expect(FR312F_ANNOTATION_ASSIGNMENT.adjudicatorMaySeeLockedPrimaryLabels)
      .toBe(true);
    expect(FR312F_ANNOTATION_ASSIGNMENT.adjudicatorMaySeeNeutralMetric)
      .toBe(false);
    expect(FR312F_ANNOTATION_ASSIGNMENT.adjudicatedLabelStoredSeparately)
      .toBe(true);
    expect(FR312F_ANNOTATION_ASSIGNMENT.disagreementHistoryPreserved)
      .toBe(true);
  });

  it('splits only at participant level and seals holdout', () => {
    expect(FR312F_PARTITION_POLICY.splitUnit).toBe('participant');
    expect(FR312F_PARTITION_POLICY.partitions).toEqual([
      'development',
      'calibration',
      'holdout',
    ]);
    expect(FR312F_PARTITION_POLICY.participantLeakageAllowed).toBe(false);
    expect(FR312F_PARTITION_POLICY.sessionLeakageAllowed).toBe(false);
    expect(FR312F_PARTITION_POLICY.captureFamilyLeakageAllowed).toBe(false);
    expect(FR312F_PARTITION_POLICY.imageLeakageAllowed).toBe(false);
    expect(FR312F_PARTITION_POLICY.allParticipantSessionsStayInOnePartition)
      .toBe(true);
    expect(FR312F_PARTITION_POLICY.assignmentFrozenBeforeMetricValuesObserved)
      .toBe(true);
    expect(
      FR312F_PARTITION_POLICY.assignmentFrozenBeforeMorphologyLabelsObserved,
    ).toBe(true);
    expect(FR312F_PARTITION_POLICY.thresholdDiscoveryMayReadHoldout)
      .toBe(false);
    expect(FR312F_PARTITION_POLICY.postHocReassignmentAuthorized).toBe(false);
  });

  it('keeps metric extraction downstream of capture admission and hidden from annotation', () => {
    expect(FR312F_METRIC_TIMING.comparatorKeys).toEqual([
      'mouth.philtrum_length_width',
      'mouth.width_and_relative_size',
      'mouth.corner_orientation',
      'mouth.visible_lip_fullness',
    ]);
    expect(FR312F_METRIC_TIMING.extractionRequiresCaptureAdmission).toBe(true);
    expect(
      FR312F_METRIC_TIMING.extractionBeforeQualityDecisionAuthorized,
    ).toBe(false);
    expect(FR312F_METRIC_TIMING.valuesReleasedToPrimaryAnnotators).toBe(false);
    expect(FR312F_METRIC_TIMING.valuesReleasedToAdjudicator).toBe(false);
    expect(
      FR312F_METRIC_TIMING
        .metricLabelAssociationBeforePrimaryAnnotationLockAuthorized,
    ).toBe(false);
    expect(FR312F_METRIC_TIMING.preferredExtractionTiming)
      .toBe('after_primary_annotation_lock');
  });

  it('does not invent participant count, ratios, quotas, or acceptance cutoffs', () => {
    expect(FR312F_PARTITION_POLICY.participantCount).toBeNull();
    expect(FR312F_PARTITION_POLICY.partitionRatios).toBeNull();
    expect(FR312F_PARTITION_POLICY.assignmentAlgorithm).toBeNull();
    expect(FR312F_PARTITION_POLICY.participantSamplingRuleAuthorized)
      .toBe(false);

    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.partitionRatios).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.demographicQuotaPlan).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.minimumAgreementAcceptanceValue).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.minimumReliabilityAcceptanceValue).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.minimumEquivalenceAcceptanceValue).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.fixedSampleSizeWithoutEvidenceBasisAuthorized)
      .toBe(false);
  });

  it('requires privacy prerequisites before any real participant collection', () => {
    expect(FR312F_PRIVACY_PREREQUISITES.pseudonymousParticipantRefRequired)
      .toBe(true);
    expect(
      FR312F_PRIVACY_PREREQUISITES.directIdentityDataRequiredInMeasurementDataset,
    ).toBe(false);
    expect(FR312F_PRIVACY_PREREQUISITES.identityMatchingAuthorized).toBe(false);
    expect(FR312F_PRIVACY_PREREQUISITES.identityTemplateAuthorized).toBe(false);
    expect(
      FR312F_PRIVACY_PREREQUISITES.finiteReviewImageRetentionRequiredBeforeCollection,
    ).toBe(true);
    expect(FR312F_PRIVACY_PREREQUISITES.finiteReviewImageRetentionIssued)
      .toBe(false);
    expect(FR312F_PRIVACY_PREREQUISITES.maxReviewImageRetentionDays).toBeNull();
    expect(
      FR312F_PRIVACY_PREREQUISITES
        .consentAndWithdrawalProcedureRequiredBeforeCollection,
    ).toBe(true);
    expect(FR312F_PRIVACY_PREREQUISITES.actualParticipantCollectionAuthorized)
      .toBe(false);
  });

  it('keeps execution, threshold, binding, scoring, and product authority closed', () => {
    expect(FR312F_CAPTURE_PROTOCOL.executionAuthorized).toBe(false);
    expect(FR312F_ANNOTATION_ASSIGNMENT.executionAuthorized).toBe(false);
    expect(FR312F_PARTITION_POLICY.executionAuthorized).toBe(false);

    expect(
      FR312F_DATASET_DESIGN.collectionAuthorization
        .participantRecruitmentAuthorized,
    ).toBe(false);
    expect(
      FR312F_DATASET_DESIGN.collectionAuthorization
        .actualImageCollectionAuthorized,
    ).toBe(false);
    expect(
      FR312F_DATASET_DESIGN.collectionAuthorization
        .actualAnnotationCollectionAuthorized,
    ).toBe(false);
    expect(
      FR312F_DATASET_DESIGN.collectionAuthorization
        .actualMetricCollectionAuthorized,
    ).toBe(false);

    for (const [key, value] of Object.entries(FR312F_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
