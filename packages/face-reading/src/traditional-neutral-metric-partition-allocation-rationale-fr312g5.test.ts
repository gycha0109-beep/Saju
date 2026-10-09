import { describe, expect, it } from 'vitest';
import { FR312F_PARTITION_POLICY, FR312F_SAMPLE_DESIGN } from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import { FR312G_STUDY_DESIGN } from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G3_CONSENT_WITHDRAWAL_PROTOCOL,
} from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';
import { FR312G4_PLANNING_CONTRACT } from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';
import {
  FR312G5_AUTHORITY_BOUNDARY,
  FR312G5_BLOCKER_ACCOUNTING,
  FR312G5_FUTURE_ALLOCATOR_PREREQUISITES,
  FR312G5_PARTITION_ALLOCATION_RATIONALE,
  FR312G5_PARTITION_PURPOSES,
  assertPartitionAllocationRationaleFR312G5,
  reviewSyntheticPartitionLineageFR312G5,
  type SyntheticPartitionLineageRowFR312G5,
} from './traditional-neutral-metric-partition-allocation-rationale-fr312g5.js';

const baseFixture: SyntheticPartitionLineageRowFR312G5 = {
  participantRef: 'synthetic-participant-a',
  sessionRef: 'synthetic-session-a1',
  captureFamilyRef: 'synthetic-capture-a1',
  imageRef: 'synthetic-image-a1',
  partition: 'development',
  assignmentFrozenBeforeMeasurementAndLabels: true,
  participantWithdrawn: false,
};

describe('FR312G5 partition allocation rationale', () => {
  it('pins to FR312F, FR312G, FR312G3 and FR312G4 without granting collection', () => {
    expect(() => assertPartitionAllocationRationaleFR312G5()).not.toThrow();
    const r = FR312G5_PARTITION_ALLOCATION_RATIONALE;
    expect(r.studyProtocolId).toBe(FR312G_STUDY_DESIGN.protocolId);
    expect(r.consentProtocolId).toBe(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId);
    expect(r.participantCountRationaleId).toBe(FR312G4_PLANNING_CONTRACT.rationaleId);
    expect(r.splitUnit).toBe(FR312F_PARTITION_POLICY.splitUnit);
    expect(r.partitions).toEqual(['development', 'calibration', 'holdout']);
    expect(r.partitions).toEqual(FR312F_PARTITION_POLICY.partitions);
    expect(r.participantRecruitmentAuthorized).toBe(false);
    expect(r.actualCollectionAuthorized).toBe(false);
  });

  it('reserves calibration and holdout, with FR312G reliability still not executable', () => {
    expect(FR312G5_PARTITION_PURPOSES.development.currentResearchPurpose)
      .toBe('neutral_metric_repeatability_missingness_capture_sensitivity');
    expect(FR312G5_PARTITION_PURPOSES.calibration.currentAccessAuthorized).toBe(false);
    expect(FR312G5_PARTITION_PURPOSES.calibration.fr312gReliabilityReadAuthorized).toBe(false);
    expect(FR312G5_PARTITION_PURPOSES.holdout.currentAccessAuthorized).toBe(false);
    expect(FR312G5_PARTITION_PURPOSES.holdout.analysisPlanFreezeAndNewAdmissionRequired).toBe(true);
    expect(FR312G5_PARTITION_PURPOSES.holdout.exploratoryThresholdSearchAuthorized).toBe(false);
    expect(FR312G_STUDY_DESIGN.repeatability.executionPartition).toBe('development');
    expect(FR312G5_PARTITION_ALLOCATION_RATIONALE.fr312gExecutionAuthorized).toBe(false);
  });

  it('preserves participant lineage and pre-observation freeze', () => {
    const { lineage, freezePolicy } = FR312G5_PARTITION_ALLOCATION_RATIONALE;
    expect(lineage.oneAssignmentPerParticipant).toBe(true);
    expect(lineage.sessionInheritsParticipantPartition).toBe(true);
    expect(lineage.captureFamilyInheritsParticipantPartition).toBe(true);
    expect(lineage.imageInheritsParticipantPartition).toBe(true);
    expect(lineage.annotationAndMetricInheritParticipantPartition).toBe(true);
    expect(lineage.snapshotsCachesExportsDerivativesPreservePartitionProvenance).toBe(true);
    expect(lineage.biometricIdentityMatchingForGroupingAllowed).toBe(false);
    expect(lineage.faceEmbeddingForGroupingAllowed).toBe(false);
    expect(freezePolicy.beforeNeutralMetricValuesObserved).toBe(true);
    expect(freezePolicy.beforeMorphologyAnnotationsObserved).toBe(true);
    expect(freezePolicy.beforeTraditionalSemanticTailObserved).toBe(true);
    expect(freezePolicy.postHocReassignmentAllowed).toBe(false);
    expect(freezePolicy.metricOrLabelAwareAllocationAllowed).toBe(false);
    expect(freezePolicy.outcomeAwareReplacementAllowed).toBe(false);
  });

  it('recognizes valid hypothetical single-partition lineage', () => {
    const secondCapture = {
      ...baseFixture,
      imageRef: 'synthetic-image-a2',
      captureFamilyRef: 'synthetic-capture-a2',
    };
    expect(reviewSyntheticPartitionLineageFR312G5([baseFixture, secondCapture]))
      .toEqual([]);
  });

  it('flags cross-partition membership for the same participant', () => {
    expect(reviewSyntheticPartitionLineageFR312G5([
      baseFixture,
      {
        ...baseFixture,
        partition: 'holdout',
        sessionRef: 'synthetic-session-a2',
        captureFamilyRef: 'synthetic-capture-a2',
        imageRef: 'synthetic-image-a2',
      },
    ])).toContain('participant_cross_partition_leakage');
  });

  it('flags any session, capture family or image assigned to another participant', () => {
    expect(reviewSyntheticPartitionLineageFR312G5([
      baseFixture,
      {
        ...baseFixture,
        participantRef: 'synthetic-participant-b',
        partition: 'calibration',
      },
    ])).toContain('lineage_cross_participant_reuse');
  });

  it('rejects unfrozen, withdrawn and missing-provenance synthetic rows', () => {
    expect(reviewSyntheticPartitionLineageFR312G5([
      { ...baseFixture, assignmentFrozenBeforeMeasurementAndLabels: false },
      { ...baseFixture, participantWithdrawn: true },
      { ...baseFixture, sessionRef: '' },
    ])).toEqual(expect.arrayContaining([
      'assignment_not_frozen_before_observation',
      'withdrawn_participant_lineage_retained',
      'missing_non_biometric_lineage',
    ]));
  });

  it('honors FR312G3 withdrawal deletion and prevents population top-ups by reassignment', () => {
    const w = FR312G5_PARTITION_ALLOCATION_RATIONALE.withdrawalPolicy;
    expect(w.participantLinkedPartitionAssignmentDeleted)
      .toBe(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.withdrawalProtocol
        .participantPartitionAssignmentDeletionRequired);
    expect(w.participantStudyLinkageRetired)
      .toBe(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.withdrawalProtocol
        .participantStudyLinkageRetirementRequired);
    expect(w.futureAnalysisEligibilityAfterWithdrawal).toBe(false);
    expect(w.assignWithdrawnParticipantElsewhereAllowed).toBe(false);
    expect(w.recoverLinkageFromAggregateAllowed).toBe(false);
    expect(w.deletionEvidenceContainsReconstructiveImageData).toBe(false);
    expect(w.replenishMissingCountByPostHocReassignmentAllowed).toBe(false);
    expect(w.shortageRequiresProspectiveReplanAndSeparateSignoff).toBe(true);
  });

  it('does not issue numeric counts, ratios, algorithm, seed or runtime artifacts', () => {
    const r = FR312G5_PARTITION_ALLOCATION_RATIONALE;
    expect(FR312G5_FUTURE_ALLOCATOR_PREREQUISITES).toHaveLength(9);
    expect(FR312G4_PLANNING_CONTRACT.participantCountAuthorized).toBe(false);
    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.partitionRatios).toBeNull();
    expect(r.approvedParticipantCount).toBeNull();
    expect(r.approvedDevelopmentEffectiveParticipantCount).toBeNull();
    expect(r.approvedPartitionRatios).toBeNull();
    expect(r.approvedPartitionCounts).toBeNull();
    expect(r.allocationAlgorithm).toBeNull();
    expect(r.allocationSeed).toBeNull();
    expect(r.approvedSamplingQuota).toBeNull();
    expect(r.allocatorVersion).toBeNull();
    expect(r.allocationManifest).toBeNull();
    expect(r.allocationAuditLog).toBeNull();
    expect(r.numericAllocationAuthorized).toBe(false);
    expect(r.partitionAssignmentRuntimeIssued).toBe(false);
  });

  it('preserves unresolved gates and authority boundary', () => {
    const defined = new Set([
      'retentionPrivacyPolicyIssued',
      'consentWithdrawalProtocolIssued',
      'participantCountSizingMethodDefined',
      'partitionAllocationMethodDefined',
    ]);
    for (const [key, value] of Object.entries(FR312G5_BLOCKER_ACCOUNTING)) {
      expect(value, key).toBe(defined.has(key));
    }
    for (const [key, value] of Object.entries(FR312G5_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
    expect(FR312G5_PARTITION_ALLOCATION_RATIONALE.fr312hEntryAuthorized).toBe(false);
  });
});
