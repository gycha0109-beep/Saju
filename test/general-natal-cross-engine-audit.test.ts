import { describe, expect, it } from 'vitest';
import {
  R089_AUTHORITY,
  R089_COMPARATOR_CANDIDATES,
  R089_CROSS_ENGINE_AUDIT_VERSION,
  R089_DISAGREEMENT_CLASSES,
  R089_GOVERNED_BASELINE,
  R089_REJECTED_SHORTCUTS,
  R089_REQUIRED_POLICY_AXES,
  R089_RESULT_CLASSES,
} from '../src/research/general-natal-cross-engine-audit.js';

describe('R089 cross-engine calculation disagreement audit', () => {
  it('pins the governed product calculation baseline', () => {
    expect(R089_CROSS_ENGINE_AUDIT_VERSION).toBe('0.2.0-research');
    expect(R089_GOVERNED_BASELINE).toEqual(expect.objectContaining({
      repositoryCommit:'86c043553430ed7fc9f6bd90e2e68953ad24d879',
      calculationPolicyId:'myeonghwa-production-civil-midnight-v1',
      engine:'manseryeok',
      engineVersion:'2.0.0',
      adapterVersion:'0.1.0',
      timeZone:'Asia/Seoul',
      dayBoundary:'midnight',
      trueSolarCorrection:false,
      productionCalculationAuthorityPinned:true,
    }));
  });

  it('snapshots external comparator commits while keeping them comparator-only', () => {
    expect(R089_COMPARATOR_CANDIDATES).toHaveLength(3);
    expect(R089_COMPARATOR_CANDIDATES.every((x)=>x.authority === 'COMPARATOR_ONLY')).toBe(true);
    expect(R089_COMPARATOR_CANDIDATES.every((x)=>/^[0-9a-f]{40}$/.test(x.snapshotCommit))).toBe(true);
  });

  it('requires convention normalization before implementation comparison', () => {
    expect(R089_REQUIRED_POLICY_AXES).toContain('TIMEZONE_CIVIL_TIME_AUTHORITY');
    expect(R089_REQUIRED_POLICY_AXES).toContain('DAY_BOUNDARY');
    expect(R089_REQUIRED_POLICY_AXES).toContain('SOLAR_TERM_BOUNDARY');
    expect(R089_REQUIRED_POLICY_AXES).toContain('TRUE_SOLAR_LONGITUDE_EQUATION_OF_TIME');
  });

  it('separates policy, dataset, and implementation disagreements', () => {
    expect(R089_DISAGREEMENT_CLASSES).toHaveLength(10);
    expect(R089_RESULT_CLASSES).toContain('POLICY_DIFFERENCE');
    expect(R089_RESULT_CLASSES).toContain('DATASET_DIFFERENCE');
    expect(R089_RESULT_CLASSES).toContain('IMPLEMENTATION_DISAGREEMENT');
    expect(R089_RESULT_CLASSES).toContain('UNRESOLVED');
  });

  it('rejects majority-vote truth and automatic Production changes', () => {
    expect(R089_REJECTED_SHORTCUTS).toContain('MAJORITY_VOTE_IS_TRUTH');
    expect(R089_REJECTED_SHORTCUTS).toContain('EXTERNAL_ENGINE_AGREEMENT_AUTO_CHANGES_PRODUCTION');
    expect(R089_REJECTED_SHORTCUTS).toContain('DATASET_DIFFERENCE_IS_AUTOMATIC_ENGINE_BUG');
    expect(R089_REJECTED_SHORTCUTS).toContain('INFER_VERSION_FROM_COMMIT_OR_DATE');
  });

  it('keeps external replay pending despite commit snapshots', () => {
    expect(R089_AUTHORITY).toEqual({
      status:'COMPARATOR_MANIFEST_READY_COMMITS_SNAPSHOTTED_EXTERNAL_REPLAY_PENDING',
      comparatorCandidateCount:3,
      comparatorCommitsSnapshotted:true,
      externalReplayPending:true,
      majorityVoteAuthority:false,
      externalAgreementChangesProduction:false,
      productionCalculationAuthorityChanged:false,
    });
  });
});
