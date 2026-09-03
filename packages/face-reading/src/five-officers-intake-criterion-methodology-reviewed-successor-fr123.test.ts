import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
  assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
} from './five-officers-intake-criterion-methodology-reviewed-successor-fr123.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR123 intake methodology review-promotion admission', () => {
  it('opens only the scan-checked source prerequisite and keeps methodology promotion closed', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(value);

    expect(value.authorityState).toBe(
      'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision',
    );
    expect(value.promotionAssessment.sourceGate).toEqual({
      requiredMinimumVerificationStatus: 'scan_checked',
      currentVerificationStatus: 'scan_checked',
      prerequisiteSatisfied: true,
    });
    expect(value.promotionAssessment.currentMethodologyGate.currentReviewStatus).toBe('research');
    expect(value.promotionAssessment.currentMethodologyGate.open).toBe(false);
    expect(value.promotionAssessment.governedReviewDecision.reviewedPromotionAuthorized).toBe(false);
  });

  it('does not issue or persist the proposed reviewed successor', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.persistedState.reviewedSuccessorRefCandidate).toBe(
      'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    expect(value.persistedState.reviewedSuccessorDefinitionIssued).toBe(false);
    expect(value.persistedState.reviewedSuccessorPersisted).toBe(false);
    expect(value.persistedState.methodologyDefinitionsPersisted).toBe(0);

    const reviewed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    const research = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
    );
    expect(reviewed).toBeUndefined();
    expect(research?.reviewStatus).toBe('research');
    expect(research?.sourceRefs).toEqual(['passage.shenxiang.five_officers.intake.nlc_1925']);
  });

  it('keeps metric, calibration, criterion-state, claim, and narrative authority closed', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.operationalizationsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.calibrationEvidenceIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.deterministicCriterionEvaluatorsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('exposes the governed methodology review decision as the next frontier', () => {
    const value = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
    expect(value.blockers).toContain('intake_methodology_governed_review_decision_not_admitted');
    expect(value.blockers).toContain('intake_methodology_review_promotion_authority_not_established');
    expect(value.nextFrontier).toBe('intake_methodology_review_promotion_criteria_and_decision_authority');
  });
});
