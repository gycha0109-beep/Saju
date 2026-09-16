import { describe, expect, it } from 'vitest';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import { FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS } from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  FR188_NEXT_FRONTIER,
  FR188_UNRESOLVED_SUPPORT_REQUIREMENTS,
} from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import {
  assertFR189AuthorityBoundary,
  assertFR189CaptureQualityPolicy,
  assertFR189ReviewArtifactRetentionPolicy,
  assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189,
  FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS,
  FR189_CAPTURE_QUALITY_POLICY,
  FR189_CAPTURE_QUALITY_REQUIRED_CHECKS,
  FR189_NEXT_FRONTIER,
  FR189_REVIEW_ARTIFACT_RETENTION_POLICY,
  FR189_VERDICT,
  issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189,
  type EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1,
  type FR189AuthorityBoundaryV1,
  type FR189CaptureQualityPolicyV1,
  type FR189ReviewArtifactRetentionPolicyV1,
} from './eye-pair-xi-chang-capture-quality-review-artifact-retention-fr189.js';

const forged = Object.freeze({}) as unknown as EyePairXiChangCaptureQualityReviewArtifactRetentionFR189V1;

describe('FR189 Xi/Chang capture-quality and review-artifact retention support', () => {
  it('consumes the exact FR188 frontier and resolves only the two support requirements', () => {
    const result = issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189();
    expect(FR188_NEXT_FRONTIER).toBe(
      'define_governed_xi_chang_capture_quality_and_review_artifact_retention_support_before_study_registration_or_evidence_collection',
    );
    expect(result.supportProgression.resolvedFR188SupportRequirements).toBe(FR188_UNRESOLVED_SUPPORT_REQUIREMENTS);
    expect(result.supportProgression.resolvedFR188SupportRequirements).toEqual([
      'xi_chang_capture_quality_policy_not_issued',
      'xi_chang_review_artifact_retention_policy_not_issued',
    ]);
    expect(result.supportProgression.remainingFR188SupportRequirements).toEqual([]);
    expect(result.authorityBoundary.supportAuthorityIssued).toBe(true);
    expect(result.authorityBoundary.studyRegistrationAuthorized).toBe(false);
    expect(result.authorityBoundary.evidenceCollectionAuthorized).toBe(false);
  });

  it('issues Eye-Pair-neutral quality checks without importing Nose-Bridge authority', () => {
    expect(FR189_CAPTURE_QUALITY_POLICY.requiredChecks).toBe(FR189_CAPTURE_QUALITY_REQUIRED_CHECKS);
    expect(FR189_CAPTURE_QUALITY_POLICY.requiredChecks).toContain('bilateral_eye_region_visibility');
    expect(FR189_CAPTURE_QUALITY_POLICY.requiredChecks).toContain('bilateral_eye_landmark_coverage');
    expect(FR189_CAPTURE_QUALITY_POLICY.requiredChecks).not.toContain('nose_bridge_visibility');
    expect(FR189_CAPTURE_QUALITY_POLICY.noseBridgeVisibilityRequired).toBe(false);
    expect(FR189_CAPTURE_QUALITY_POLICY.forbiddenDecisionInputs).toBe(FR189_CAPTURE_QUALITY_FORBIDDEN_DECISION_INPUTS);
    expect(FR189_CAPTURE_QUALITY_POLICY.candidateMetricValuesMayInfluenceAcceptance).toBe(false);
    expect(FR189_CAPTURE_QUALITY_POLICY.traditionalConceptLabelsMayInfluenceAcceptance).toBe(false);
    expect(() => assertFR189CaptureQualityPolicy(FR189_CAPTURE_QUALITY_POLICY)).not.toThrow();
  });

  it('rejects capture-quality leakage, post-hoc metric influence, and execution widening', () => {
    const invalid = [
      { ...FR189_CAPTURE_QUALITY_POLICY, requiredChecks: [...FR189_CAPTURE_QUALITY_REQUIRED_CHECKS, 'nose_bridge_visibility'] },
      { ...FR189_CAPTURE_QUALITY_POLICY, bothEyesRequired: false },
      { ...FR189_CAPTURE_QUALITY_POLICY, qualityDecisionMustPrecedeCandidateMetricObservation: false },
      { ...FR189_CAPTURE_QUALITY_POLICY, candidateMetricValuesMayInfluenceAcceptance: true },
      { ...FR189_CAPTURE_QUALITY_POLICY, traditionalConceptLabelsMayInfluenceAcceptance: true },
      { ...FR189_CAPTURE_QUALITY_POLICY, noseBridgeVisibilityRequired: true },
      { ...FR189_CAPTURE_QUALITY_POLICY, executionAuthorized: true },
    ] as unknown as FR189CaptureQualityPolicyV1[];
    for (const value of invalid) expect(() => assertFR189CaptureQualityPolicy(value)).toThrow(/weakening|leakage|widening/u);
  });

  it('freezes review-artifact privacy and leaves a finite calendar window unresolved before collection', () => {
    const policy = FR189_REVIEW_ARTIFACT_RETENTION_POLICY;
    expect(policy.containsPotentiallyIdentifyingFace).toBe(true);
    expect(policy.deleteTrigger).toBe('labeling_and_audit_complete');
    expect(policy.maxRetentionDays).toBeNull();
    expect(policy.accessScope).toBe('assigned_reviewers_and_auditors');
    expect(policy.participantPolicy).toBe('consented_pseudonymous');
    expect(policy.originalSourceImageDeletedAfterReviewArtifactCreation).toBe(true);
    expect(policy.reviewArtifactMayContainCandidateMetricValues).toBe(false);
    expect(policy.trainingReuseAllowed).toBe(false);
    expect(policy.identityMatchingAllowed).toBe(false);
    expect(policy.faceEmbeddingAllowed).toBe(false);
    expect(policy.identityTemplateAllowed).toBe(false);
    expect(policy.finiteCalendarRetentionWindowRequiredBeforeEvidenceCollection).toBe(true);
    expect(policy.evidenceCollectionAuthorizedWithNullMaximum).toBe(false);
    expect(() => assertFR189ReviewArtifactRetentionPolicy(policy)).not.toThrow();
  });

  it('rejects retention/privacy weakening and collection widening', () => {
    const invalid = [
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, accessScope: 'any_researcher' },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, trainingReuseAllowed: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, identityMatchingAllowed: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, originalSourceImageDeletedAfterReviewArtifactCreation: false },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, reviewArtifactMayContainCandidateMetricValues: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, rawLandmarkRetentionAllowed: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, faceEmbeddingAllowed: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, evidenceCollectionAuthorizedWithNullMaximum: true },
      { ...FR189_REVIEW_ARTIFACT_RETENTION_POLICY, executionAuthorized: true },
    ] as unknown as FR189ReviewArtifactRetentionPolicyV1[];
    for (const value of invalid) expect(() => assertFR189ReviewArtifactRetentionPolicy(value)).toThrow(/weakening|widening/u);
  });

  it('does not convert support issuance into empirical evidence or resolve any fixed blocker', () => {
    const result = issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189();
    expect(result.evidenceProgression.newlySatisfiedMappingEvidenceRequirements).toEqual([]);
    expect(result.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements).toBe(
      FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
    );
    expect(result.blockerAccounting.resolvedExistingFR184Blockers).toEqual([]);
    expect(result.blockerAccounting.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.blockerAccounting.remainingBlockers).toHaveLength(13);
  });

  it('rejects study, semantic, calibration, and Production authority widening', () => {
    const base = issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189().authorityBoundary;
    const invalid = [
      { ...base, commonCalibrationRegistryMutationAuthorized: true },
      { ...base, studyRegistrationAuthorized: true },
      { ...base, studyProtocolIssued: true },
      { ...base, evidenceCollectionAuthorized: true },
      { ...base, reviewArtifactIngestionAuthorized: true },
      { ...base, expertLabelCollectionAuthorized: true },
      { ...base, candidateMetricObservationAuthorized: true },
      { ...base, mappingAuthorized: true },
      { ...base, directionalityAuthorized: true },
      { ...base, stableCriterionIdentityIssued: true },
      { ...base, calibrationProtocolIssued: true },
      { ...base, calibratedDecisionRuleIssued: true },
      { ...base, compoundRuleAuthorized: true },
      { ...base, productionRuleAuthorized: true },
    ] as unknown as FR189AuthorityBoundaryV1[];
    for (const value of invalid) expect(() => assertFR189AuthorityBoundary(value)).toThrow(/widening/u);
  });

  it('issues the governed FR189 artifact and advances only to study registration', () => {
    const result = issueEyePairXiChangCaptureQualityReviewArtifactRetentionFR189();
    expect(result.verdict).toBe(FR189_VERDICT);
    expect(result.nextFrontier).toBe(FR189_NEXT_FRONTIER);
    expect(FR189_NEXT_FRONTIER).toBe(
      'register_governed_xi_chang_mapping_evidence_study_before_any_participant_capture_expert_label_or_metric_evidence_collection',
    );
    expect(result.privacyBoundary.participantDataCollected).toBe(false);
    expect(result.privacyBoundary.reviewArtifactAccepted).toBe(false);
    expect(result.privacyBoundary.metricValuesObserved).toBe(false);
    expect(() => assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangCaptureQualityReviewArtifactRetentionFR189(forged)).toThrow(/not issued/u);
  });
});
