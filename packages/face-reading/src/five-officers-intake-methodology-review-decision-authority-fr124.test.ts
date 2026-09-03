import { describe, expect, it } from 'vitest';
import {
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  validateMethodologyReviewDecisionRegistryFR124,
  type MethodologyReviewDecisionRegistryFR124V1,
} from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR124 intake methodology review decision authority', () => {
  it('establishes a decision contract while keeping the current registry empty and promotion blocked', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(value);

    expect(value.authorityState).toBe(
      'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record',
    );
    expect(value.currentRegistry).toEqual({
      decisionCount: 0,
      approvedDecisionCount: 0,
      rejectedDecisionCount: 0,
      targetDecisionRef: null,
      targetDecisionConsumed: false,
    });
    expect(value.admission.sourcePrerequisiteSatisfied).toBe(true);
    expect(value.admission.governedDecisionRecordPresent).toBe(false);
    expect(value.admission.governedApprovalPresent).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
  });

  it('does not invent quorum, reviewer-count, or consensus-threshold policy', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    expect(value.contract.configuredQuorum).toBeNull();
    expect(value.contract.configuredReviewerCount).toBeNull();
    expect(value.contract.configuredConsensusThreshold).toBeNull();
  });

  it('validates the empty persisted decision registry without issuing a decision', () => {
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).not.toThrow();
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });

  it('can structurally validate a hypothetical decision record without treating it as issued authority', () => {
    const registry: MethodologyReviewDecisionRegistryFR124V1 = {
      registryId: 'registry.face.methodology_review_decisions.synthetic',
      version: '0.1.0',
      decisions: [{
        decisionId: 'decision.face.methodology_review.synthetic_intake',
        version: '0.1.0',
        decisionScope: 'methodology_review_promotion',
        targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
        proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.3.0',
        sourceRefsSnapshot: ['passage.shenxiang.five_officers.intake.nlc_1925'],
        evidenceRefs: ['evidence.methodology_review.synthetic_only'],
        authorityActorRef: 'authority_actor.synthetic_only',
        outcome: 'approved_for_reviewed_promotion',
      }],
    };
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      registry,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).not.toThrow();

    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    expect(value.authorityBoundary.structurallyValidDecisionRecordMeansIssuedDecision).toBe(false);
    expect(value.currentRegistry.decisionCount).toBe(0);
    expect(value.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(value.execution.methodologyReviewAuthorizationsIssued).toBe(0);
  });

  it('keeps all downstream semantic execution authority closed', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    expect(value.execution.methodologyReviewPromotionsIssued).toBe(0);
    expect(value.execution.reviewedMethodologyDefinitionsIssued).toBe(0);
    expect(value.execution.metricBindingsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
  });
});
