import { describe, expect, it } from 'vitest';
import {
  R100_AUTHORITY,
  R100_COVERAGE_MAP_VERSION,
  R100_CURRENT_COVERAGE,
  R100_FRONTIER_GROUPS,
  R100_NEXT_100_FRONTIERS,
} from '../src/research/general-natal-coverage-next100.js';

describe('R100 coverage map and next-100 frontiers', () => {
  it('pins the current 100-item master snapshot without overstating completion', () => {
    expect(R100_COVERAGE_MAP_VERSION).toBe('0.1.0-research');
    expect(R100_CURRENT_COVERAGE.trackedCount).toBe(100);
    expect(R100_CURRENT_COVERAGE.mergedOrVerifiedCount + R100_CURRENT_COVERAGE.openOrBlockedCount).toBe(100);
  });

  it('defines exactly ten groups and one hundred unique next frontiers', () => {
    expect(R100_FRONTIER_GROUPS).toHaveLength(10);
    expect(R100_NEXT_100_FRONTIERS).toHaveLength(100);
    expect(new Set(R100_NEXT_100_FRONTIERS.map((x)=>x.id)).size).toBe(100);
    expect(R100_NEXT_100_FRONTIERS[0]?.id).toBe('R101');
    expect(R100_NEXT_100_FRONTIERS[99]?.id).toBe('R200');
  });

  it('keeps frontiers as candidates rather than completion or implementation authority', () => {
    expect(R100_AUTHORITY).toEqual({
      status:'COVERAGE_MAP_AND_CANDIDATE_FRONTIERS_PUBLISHED',
      candidateFrontierCount:100,
      frontierAppearanceImpliesCompletion:false,
      frontierAppearanceImpliesImplementationAuthorization:false,
      numericConfidenceModelIntroduced:false,
      productionAuthorityPromoted:false,
    });
  });
});
