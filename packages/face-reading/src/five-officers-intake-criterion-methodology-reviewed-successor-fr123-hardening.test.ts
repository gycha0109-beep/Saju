import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
  assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
  type FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1,
} from './five-officers-intake-criterion-methodology-reviewed-successor-fr123.js';

describe('FR123 intake methodology review-promotion admission hardening', () => {
  it('rejects a forged artifact even when visible fields copy the issued result', () => {
    const issued = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    const forged = structuredClone(issued) as FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1;
    expect(() => assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(forged)).toThrow(/FR-123/);
  });

  it('forbids deriving review promotion authority from scan-checked provenance or structural validation', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.authorityBoundary.witnessQualifiedSourceMeansReviewedMethodology).toBe(false);
    expect(value.authorityBoundary.structuralValidatorAcceptanceMeansReviewPromotionAuthority).toBe(false);
    expect(value.authorityBoundary.methodologyReviewPromotionMayBeInferredFromSourceVerification).toBe(false);
    expect(value.promotionAssessment.structuralValidationBoundary.scanCheckedSourceAloneIsSufficientForReviewedPromotion).toBe(false);
    expect(value.promotionAssessment.structuralValidationBoundary.registryStructuralAcceptanceMeansReviewAuthority).toBe(false);
  });

  it('keeps the proposed 0.3.0 ref candidate-only and non-authoritative', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.persistedState.reviewedSuccessorRefCandidate).toBe(
      'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    expect(value.authorityBoundary.proposedVersionMeansDefinitionIssued).toBe(false);
    expect(value.persistedState.reviewedSuccessorDefinitionIssued).toBe(false);
    expect(value.persistedState.reviewedSuccessorPersisted).toBe(false);
    expect(value.execution.methodologyReviewPromotionsIssued).toBe(0);
    expect(value.execution.reviewedMethodologyDefinitionsIssued).toBe(0);
  });

  it('does not let a hypothetical future review promotion collapse downstream semantic gates', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.authorityBoundary.reviewPromotionMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.reviewPromotionMeansNumericThreshold).toBe(false);
    expect(value.authorityBoundary.reviewPromotionMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.reviewPromotionMeansClaim).toBe(false);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
