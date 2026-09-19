import { describe, expect, it } from 'vitest';
import {
  R090_ADJUDICATION_RULES,
  R090_AUTHORITY,
  R090_EXPERT_BLIND_REVIEW_VERSION,
  R090_RESPONSE_STATES,
  R090_REVIEWER_METADATA,
  R090_REVIEW_STAGES,
} from '../src/research/general-natal-expert-blind-review.js';

describe('R090 human-expert blind-review protocol', () => {
  it('locks blind judgment before source-grounding review', () => {
    expect(R090_EXPERT_BLIND_REVIEW_VERSION).toBe('0.1.0-research');
    expect(R090_REVIEW_STAGES[0]?.id).toBe('STAGE_A_BLIND_STRUCTURAL');
    expect(R090_REVIEW_STAGES[1]).toEqual(expect.objectContaining({
      id:'STAGE_B_SOURCE_GROUNDING',
      requiresStageALocked:true,
    }));
  });

  it('preserves supported, rejected, indeterminate, and out-of-scope responses', () => {
    expect(R090_RESPONSE_STATES).toEqual([
      'SUPPORTED','REJECTED','INDETERMINATE','OUT_OF_SCOPE',
    ]);
  });

  it('records school metadata without turning it into voting weight', () => {
    expect(R090_REVIEWER_METADATA).toContain('LINEAGE_OR_SCHOOL');
    expect(R090_AUTHORITY.reviewerMetadataAsVotingWeight).toBe(false);
  });

  it('preserves disagreement and rejects majority-vote truth', () => {
    expect(R090_ADJUDICATION_RULES).toContain('PRESERVE_DISAGREEMENT');
    expect(R090_ADJUDICATION_RULES).toContain('PRESERVE_ABSTENTION');
    expect(R090_ADJUDICATION_RULES).toContain('NO_MAJORITY_VOTE_TRUTH');
  });

  it('keeps execution and Production promotion pending', () => {
    expect(R090_AUTHORITY).toEqual({
      status:'BLIND_REVIEW_PROTOCOL_READY_EXECUTION_PENDING',
      reviewerExecutionPending:true,
      reviewerMetadataAsVotingWeight:false,
      majorityVoteAuthority:false,
      productionAuthorityPromoted:false,
    });
  });
});
