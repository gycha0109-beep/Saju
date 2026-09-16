import { describe, expect, it } from 'vitest';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR186_MAPPING_HYPOTHESES,
  FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
} from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  FR187_OPERATIONALIZATION_TASKS,
  FR187_PROTOCOL_REF,
} from './eye-pair-xi-chang-blinded-expert-operationalization-protocol-fr187.js';
import {
  FR188_CAPTURE_PROTOCOL_REF,
  FR188_SPLIT_POLICY_REF,
} from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import {
  FR189_NEXT_FRONTIER,
  FR189_QUALITY_POLICY_REF,
  FR189_RETENTION_POLICY_REF,
  FR189_REVIEW_ARTIFACT_RETENTION_POLICY,
} from './eye-pair-xi-chang-capture-quality-review-artifact-retention-fr189.js';
import {
  assertFR190AuthorityBoundary,
  assertFR190StudyArm,
  assertIssuedEyePairXiChangMappingEvidenceStudyRegistrationFR190,
  FR190_NEXT_FRONTIER,
  FR190_PRE_COLLECTION_BLOCKING_REASONS,
  FR190_STUDY_ARMS,
  FR190_VERDICT,
  issueEyePairXiChangMappingEvidenceStudyRegistrationFR190,
  type EyePairXiChangMappingEvidenceStudyRegistrationFR190V1,
  type FR190AuthorityBoundaryV1,
  type FR190StudyArmV1,
} from './eye-pair-xi-chang-mapping-evidence-study-registration-fr190.js';

const forged = Object.freeze({}) as unknown as EyePairXiChangMappingEvidenceStudyRegistrationFR190V1;

describe('FR190 Xi/Chang mapping-evidence study registration', () => {
  it('consumes the exact FR189 frontier and registers only a blocked research study', () => {
    const result = issueEyePairXiChangMappingEvidenceStudyRegistrationFR190();
    expect(FR189_NEXT_FRONTIER).toBe(
      'register_governed_xi_chang_mapping_evidence_study_before_any_participant_capture_expert_label_or_metric_evidence_collection',
    );
    expect(result.registration.registrationState).toBe('registered_blocked_pre_collection');
    expect(result.registration.frozenBeforeEvidenceCollection).toBe(true);
    expect(result.registration.postHocMutationAuthorized).toBe(false);
    expect(result.authorityBoundary.studyRegistrationIssued).toBe(true);
    expect(result.authorityBoundary.evidenceCollectionAuthorized).toBe(false);
    expect(result.authorityBoundary.commonCalibrationRegistryMutationAuthorized).toBe(false);
    expect(result.authorityBoundary.commonCalibrationStudyDefinitionIssued).toBe(false);
  });

  it('binds exactly Xi/細 and Chang/長 to their frozen hypotheses, metrics, and reviewer tasks', () => {
    expect(FR190_STUDY_ARMS).toHaveLength(2);
    const [xi, chang] = FR190_STUDY_ARMS;

    expect(xi.hypothesisId).toBe(FR186_MAPPING_HYPOTHESES[0]!.hypothesisId);
    expect(xi.traditionalConcept).toBe('細');
    expect(xi.candidateMetricRef).toBe(FR186_MAPPING_HYPOTHESES[0]!.candidateMetricRef);
    expect(xi.operationalizationTaskId).toBe(FR187_OPERATIONALIZATION_TASKS[0]!.taskId);

    expect(chang.hypothesisId).toBe(FR186_MAPPING_HYPOTHESES[1]!.hypothesisId);
    expect(chang.traditionalConcept).toBe('長');
    expect(chang.candidateMetricRef).toBe(FR186_MAPPING_HYPOTHESES[1]!.candidateMetricRef);
    expect(chang.operationalizationTaskId).toBe(FR187_OPERATIONALIZATION_TASKS[1]!.taskId);

    for (const arm of FR190_STUDY_ARMS) {
      expect(arm.operationalizationProtocolRef).toBe(FR187_PROTOCOL_REF);
      expect(arm.captureProtocolRef).toBe(FR188_CAPTURE_PROTOCOL_REF);
      expect(arm.splitPolicyRef).toBe(FR188_SPLIT_POLICY_REF);
      expect(arm.qualityPolicyRef).toBe(FR189_QUALITY_POLICY_REF);
      expect(arm.retentionPolicyRef).toBe(FR189_RETENTION_POLICY_REF);
      expect(arm.stableCriterionId).toBeNull();
      expect(arm.directionality).toBeNull();
      expect(arm.empiricalEvidenceIssued).toBe(false);
      expect(arm.evidenceCollectionAuthorized).toBe(false);
    }
  });

  it('preserves exact pre-collection blockers and does not invent a retention duration', () => {
    const result = issueEyePairXiChangMappingEvidenceStudyRegistrationFR190();
    expect(result.registration.blockingReasons).toBe(FR190_PRE_COLLECTION_BLOCKING_REASONS);
    expect(result.registration.blockingReasons).toEqual([
      'finite_calendar_review_artifact_retention_window_not_issued',
      'source_grounded_construct_correspondence_analysis_protocol_not_defined',
      'alternative_metric_and_confound_rejection_plan_not_defined',
      'evidence_collection_authorization_not_issued',
    ]);
    expect(FR189_REVIEW_ARTIFACT_RETENTION_POLICY.maxRetentionDays).toBeNull();
    expect(result.upstreamAuthority.retentionMaximumDays).toBeNull();
    expect(result.authorityBoundary.finiteCalendarRetentionWindowIssued).toBe(false);
  });

  it('rejects study-arm swapping, ref drift, blocker removal, and evidence leakage', () => {
    const [xi, chang] = FR190_STUDY_ARMS;
    const invalid = [
      { ...xi, candidateMetricRef: chang.candidateMetricRef },
      { ...xi, hypothesisId: chang.hypothesisId },
      { ...xi, operationalizationTaskId: chang.operationalizationTaskId },
      { ...xi, captureProtocolRef: 'forged.capture@1' },
      { ...xi, blockingReasons: FR190_PRE_COLLECTION_BLOCKING_REASONS.slice(1) },
      { ...xi, stableCriterionId: 'criterion.forged' },
      { ...xi, empiricalEvidenceIssued: true },
      { ...xi, evidenceCollectionAuthorized: true },
      { ...xi, participantCaptureAuthorized: true },
      { ...xi, postHocMutationAuthorized: true },
    ] as unknown as FR190StudyArmV1[];

    for (const value of invalid) {
      expect(() => assertFR190StudyArm(value, xi)).toThrow(/drift|blocker|leakage|widening/u);
    }
  });

  it('keeps all empirical mapping requirements and all 13 fixed blockers unresolved', () => {
    const result = issueEyePairXiChangMappingEvidenceStudyRegistrationFR190();
    expect(result.evidenceProgression.newlySatisfiedMappingEvidenceRequirements).toEqual([]);
    expect(result.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements).toBe(
      FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
    );
    expect(result.evidenceProgression.studyRegistrationCountsAsEvidence).toBe(false);
    expect(result.blockerAccounting.resolvedExistingFR184Blockers).toEqual([]);
    expect(result.blockerAccounting.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.blockerAccounting.remainingBlockers).toHaveLength(13);
  });

  it('rejects collection, stable-criterion, common-registry, semantic, calibration, and Production widening', () => {
    const base = issueEyePairXiChangMappingEvidenceStudyRegistrationFR190().authorityBoundary;
    const invalid = [
      { ...base, registrationCountsAsEmpiricalEvidence: true },
      { ...base, commonCalibrationRegistryMutationAuthorized: true },
      { ...base, commonCalibrationStudyDefinitionIssued: true },
      { ...base, stableCriterionIdentityIssued: true },
      { ...base, finiteCalendarRetentionWindowIssued: true },
      { ...base, constructCorrespondenceProtocolDefined: true },
      { ...base, alternativeMetricConfoundProtocolDefined: true },
      { ...base, evidenceCollectionAuthorized: true },
      { ...base, participantCaptureAuthorized: true },
      { ...base, reviewArtifactIngestionAuthorized: true },
      { ...base, expertLabelCollectionAuthorized: true },
      { ...base, candidateMetricObservationAuthorized: true },
      { ...base, repeatCaptureStabilityEvidenceIssued: true },
      { ...base, blindedExpertOperationalizationEvidenceIssued: true },
      { ...base, mappingAuthorized: true },
      { ...base, directionalityAuthorized: true },
      { ...base, calibrationProtocolIssued: true },
      { ...base, calibratedDecisionRuleIssued: true },
      { ...base, compoundRuleAuthorized: true },
      { ...base, productionRuleAuthorized: true },
    ] as unknown as FR190AuthorityBoundaryV1[];

    for (const value of invalid) expect(() => assertFR190AuthorityBoundary(value)).toThrow(/widening/u);
  });

  it('issues the governed FR190 artifact and advances only to pre-collection construct/confound preregistration', () => {
    const result = issueEyePairXiChangMappingEvidenceStudyRegistrationFR190();
    expect(result.verdict).toBe(FR190_VERDICT);
    expect(result.nextFrontier).toBe(FR190_NEXT_FRONTIER);
    expect(FR190_NEXT_FRONTIER).toBe(
      'define_governed_xi_chang_construct_correspondence_and_alternative_metric_confound_preregistration_before_evidence_collection',
    );
    expect(result.privacyBoundary.participantDataCollected).toBe(false);
    expect(result.privacyBoundary.reviewArtifactAccepted).toBe(false);
    expect(result.privacyBoundary.expertLabelsCollected).toBe(false);
    expect(result.privacyBoundary.metricValuesObserved).toBe(false);
    expect(() => assertIssuedEyePairXiChangMappingEvidenceStudyRegistrationFR190(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangMappingEvidenceStudyRegistrationFR190(forged)).toThrow(/not issued/u);
  });
});
