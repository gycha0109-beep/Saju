import { describe, expect, it } from 'vitest';
import {
  R098_AUTHORITY,
  R098_CANDIDATE_IDENTITY_FIELDS,
  R098_CHECKLIST_STATES,
  R098_CROSS_CONTRACT_EVIDENCE_RULES,
  R098_GATE_APPLICABILITY,
  R098_GATE_STATUSES,
  R098_PROMOTION_CHECKLIST_VERSION,
  R098_PROMOTION_ELIGIBILITY_RULES,
  R098_REJECTED_IMPLICIT_PROMOTION,
  R098_REQUIRED_GATE_RECORD_FIELDS,
  R098_REQUIRED_GATES,
} from '../src/research/general-natal-promotion-checklist.js';

describe('R098 research-to-governed promotion checklist', () => {
  it('requires fifteen explicit fail-closed gates', () => {
    expect(R098_PROMOTION_CHECKLIST_VERSION).toBe('0.2.0-research');
    expect(R098_REQUIRED_GATES).toHaveLength(15);
    expect(R098_REQUIRED_GATES).toContain('PASSAGE_PROPOSITION_BINDING_COMPLETE');
    expect(R098_REQUIRED_GATES).toContain('COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED');
    expect(R098_REQUIRED_GATES).toContain(
      'EXPLICIT_GOVERNANCE_AUTHORITY_DECISION_RECORDED',
    );
  });

  it('makes every gate status and applicability explicit', () => {
    expect(R098_GATE_STATUSES).toEqual([
      'SATISFIED',
      'PENDING',
      'BLOCKED',
      'NOT_APPLICABLE_WITH_JUSTIFICATION',
    ]);
    expect(R098_GATE_APPLICABILITY).toEqual(['REQUIRED', 'CONDITIONAL']);
    expect(R098_REQUIRED_GATE_RECORD_FIELDS).toContain('EVIDENCE_REFS');
    expect(R098_REQUIRED_GATE_RECORD_FIELDS).toContain(
      'NOT_APPLICABLE_POLICY_REF_AND_JUSTIFICATION_IF_NOT_APPLICABLE',
    );
  });

  it('binds checklist results to an exact candidate hash and version', () => {
    expect(R098_CANDIDATE_IDENTITY_FIELDS).toEqual([
      'CLAIM_ID',
      'CONTENT_HASH',
      'VERSION',
      'METHODOLOGY_SOURCE_SCOPE_REF',
      'INTENDED_LIFECYCLE_TARGET',
    ]);
    expect(R098_PROMOTION_ELIGIBILITY_RULES).toContain(
      'CANDIDATE_HASH_OR_VERSION_CHANGE_REQUIRES_GATE_REEVALUATION',
    );
    expect(R098_AUTHORITY.candidateHashChangeRequiresReevaluation).toBe(true);
  });

  it('references prior evidence contracts without treating their labels as automatic gate pass', () => {
    expect(R098_CROSS_CONTRACT_EVIDENCE_RULES).toContain(
      'R093_PROVENANCE_MAY_EVIDENCE_GATE_4',
    );
    expect(R098_CROSS_CONTRACT_EVIDENCE_RULES).toContain(
      'R094_COUNTEREXAMPLES_MAY_EVIDENCE_GATE_6',
    );
    expect(R098_CROSS_CONTRACT_EVIDENCE_RULES).toContain(
      'R096_STATE_LABEL_DOES_NOT_REPLACE_GATE_EVIDENCE',
    );
  });

  it('keeps readiness states distinct from confidence and actual promotion', () => {
    expect(R098_CHECKLIST_STATES).toEqual([
      'BLOCKED',
      'RESEARCH_READY',
      'REVIEW_READY',
      'SHADOW_READY',
      'PROMOTION_ELIGIBLE',
    ]);
    expect(R098_AUTHORITY.checklistStateIsConfidenceScore).toBe(false);
    expect(R098_AUTHORITY.promotionEligibleAutoPromotes).toBe(false);
  });

  it('fails closed for conditional and not-applicable gates', () => {
    expect(R098_PROMOTION_ELIGIBILITY_RULES).toContain(
      'ALL_REQUIRED_GATES_MUST_BE_SATISFIED_OR_GOVERNED_NOT_APPLICABLE',
    );
    expect(R098_PROMOTION_ELIGIBILITY_RULES).toContain(
      'NOT_APPLICABLE_REQUIRES_POLICY_REF_AND_JUSTIFICATION',
    );
    expect(R098_AUTHORITY.conditionalGateSilentSkipAuthorized).toBe(false);
    expect(R098_AUTHORITY.notApplicableRequiresPolicyAndJustification).toBe(true);
  });

  it('rejects merge, tests, votes, shadow success, and demand as implicit promotion', () => {
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('MERGE_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('TEST_PASS_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('EXPERT_VOTE_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('SHADOW_PASS_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('PRODUCT_DEMAND_IMPLIES_PROMOTION');
  });

  it('requires lifecycle mutation to remain a separate authority action', () => {
    expect(R098_PROMOTION_ELIGIBILITY_RULES).toContain(
      'PROMOTION_ELIGIBLE_DOES_NOT_MUTATE_LIFECYCLE',
    );
    expect(R098_AUTHORITY).toEqual({
      status: 'FAIL_CLOSED_PROMOTION_CHECKLIST_DEFINED',
      requiredGateCount: 15,
      conditionalGateSilentSkipAuthorized: false,
      notApplicableRequiresPolicyAndJustification: true,
      promotionEligibleRequiresExactCandidateDecision: true,
      promotionEligibleAutoPromotes: false,
      checklistStateIsConfidenceScore: false,
      candidateHashChangeRequiresReevaluation: true,
      lifecycleMutationRequiresSeparateAuthorityAction: true,
      productionAuthorityPromoted: false,
    });
  });
});
