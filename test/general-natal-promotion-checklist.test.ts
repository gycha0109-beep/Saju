import { describe, expect, it } from 'vitest';
import {
  R098_AUTHORITY,
  R098_CHECKLIST_STATES,
  R098_PROMOTION_CHECKLIST_VERSION,
  R098_REJECTED_IMPLICIT_PROMOTION,
  R098_REQUIRED_GATES,
} from '../src/research/general-natal-promotion-checklist.js';

describe('R098 research-to-governed promotion checklist', () => {
  it('requires fifteen explicit fail-closed gates', () => {
    expect(R098_PROMOTION_CHECKLIST_VERSION).toBe('0.1.0-research');
    expect(R098_REQUIRED_GATES).toHaveLength(15);
    expect(R098_REQUIRED_GATES).toContain('PASSAGE_PROPOSITION_BINDING_COMPLETE');
    expect(R098_REQUIRED_GATES).toContain('COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED');
    expect(R098_REQUIRED_GATES).toContain('EXPLICIT_GOVERNANCE_AUTHORITY_DECISION_RECORDED');
  });

  it('keeps promotion eligibility distinct from actual promotion', () => {
    expect(R098_CHECKLIST_STATES).toEqual([
      'BLOCKED','RESEARCH_READY','REVIEW_READY','SHADOW_READY','PROMOTION_ELIGIBLE',
    ]);
    expect(R098_AUTHORITY.promotionEligibleAutoPromotes).toBe(false);
  });

  it('rejects merge, test, source-count, vote, and demand as implicit promotion', () => {
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('MERGE_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('TEST_PASS_IMPLIES_PROMOTION');
    expect(R098_REJECTED_IMPLICIT_PROMOTION).toContain('EXPERT_VOTE_IMPLIES_PROMOTION');
  });

  it('requires a separate lifecycle authority action', () => {
    expect(R098_AUTHORITY).toEqual({
      status:'FAIL_CLOSED_PROMOTION_CHECKLIST_DEFINED',
      requiredGateCount:15,
      promotionEligibleAutoPromotes:false,
      lifecycleMutationRequiresSeparateAuthorityAction:true,
      productionAuthorityPromoted:false,
    });
  });
});
