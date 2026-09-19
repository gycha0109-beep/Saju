import { describe, expect, it } from 'vitest';
import {
  R089_AUTHORITY,
  R089_COMPARATOR_CANDIDATES,
  R089_CROSS_ENGINE_AUDIT_VERSION,
  R089_CURRENT_ENGINE,
  R089_DISAGREEMENT_CLASSES,
  R089_REJECTED_SHORTCUTS,
  R089_RESULT_CLASSES,
} from '../src/research/general-natal-cross-engine-audit.js';

describe('R089 cross-engine calculation disagreement audit', () => {
  it('pins the currently integrated engine and adapter versions', () => {
    expect(R089_CROSS_ENGINE_AUDIT_VERSION).toBe('0.1.0-research');
    expect(R089_CURRENT_ENGINE).toEqual({
      engine:'manseryeok',
      engineVersion:'2.0.0',
      adapter:'myeonghwa-manseryeok-adapter',
      adapterVersion:'0.1.0',
      currentTimeZoneScope:'Asia/Seoul',
    });
  });

  it('keeps external engines as comparators only', () => {
    expect(R089_COMPARATOR_CANDIDATES).toHaveLength(3);
    expect(R089_COMPARATOR_CANDIDATES.every((x)=>x.authority === 'COMPARATOR_ONLY')).toBe(true);
  });

  it('separates policy and implementation disagreements', () => {
    expect(R089_DISAGREEMENT_CLASSES).toHaveLength(10);
    expect(R089_RESULT_CLASSES).toContain('POLICY_DIFFERENCE');
    expect(R089_RESULT_CLASSES).toContain('IMPLEMENTATION_DISAGREEMENT');
    expect(R089_RESULT_CLASSES).toContain('UNRESOLVED');
  });

  it('rejects majority-vote truth and automatic Production changes', () => {
    expect(R089_REJECTED_SHORTCUTS).toContain('MAJORITY_VOTE_IS_TRUTH');
    expect(R089_REJECTED_SHORTCUTS).toContain('EXTERNAL_ENGINE_AGREEMENT_AUTO_CHANGES_PRODUCTION');
  });

  it('keeps external replay pending', () => {
    expect(R089_AUTHORITY).toEqual({
      status:'COMPARATOR_MANIFEST_READY_EXTERNAL_REPLAY_PENDING',
      comparatorCandidateCount:3,
      externalReplayPending:true,
      majorityVoteAuthority:false,
      productionCalculationAuthorityChanged:false,
    });
  });
});
