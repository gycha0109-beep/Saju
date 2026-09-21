import { describe, expect, it } from 'vitest';
import {
  R100_AUTHORITY,
  R100_COVERAGE_MAP_VERSION,
  R100_COVERAGE_STATUS_BY_ID,
  R100_CURRENT_COVERAGE,
  R100_EXPLICIT_BLOCKER_RULES,
  R100_FRONTIER_DESIGN_PRINCIPLES,
  R100_FRONTIER_GROUPS,
  R100_NEXT_100_FRONTIERS,
} from '../src/research/general-natal-coverage-next100.js';

describe('R100 coverage map and next-100 frontiers', () => {
  it('pins an exact 100-item pre-R100-merge master snapshot', () => {
    expect(R100_COVERAGE_MAP_VERSION).toBe('0.2.0-research');
    expect(R100_CURRENT_COVERAGE.snapshotMain).toBe(
      '391401db33777490dac7dacb76696ee066ca8218',
    );
    expect(R100_COVERAGE_STATUS_BY_ID).toHaveLength(100);
    expect(new Set(R100_COVERAGE_STATUS_BY_ID.map((x) => x.id)).size).toBe(100);
    expect(R100_CURRENT_COVERAGE.trackedCount).toBe(100);
  });

  it('reports 88 merged/verified, 10 open, and 2 blocked without overstating completion', () => {
    expect(R100_CURRENT_COVERAGE.mergedOrVerifiedCount).toBe(88);
    expect(R100_CURRENT_COVERAGE.openCount).toBe(10);
    expect(R100_CURRENT_COVERAGE.blockedCount).toBe(2);
    expect(R100_CURRENT_COVERAGE.unresolvedCount).toBe(12);
    expect(
      R100_COVERAGE_STATUS_BY_ID.filter((x) => x.status === 'MERGED_OR_VERIFIED'),
    ).toHaveLength(88);
  });

  it('preserves explicit blocker semantics and keeps R100 open in the pre-merge snapshot', () => {
    const r006 = R100_COVERAGE_STATUS_BY_ID.find((x) => x.id === 'R006');
    const r083 = R100_COVERAGE_STATUS_BY_ID.find((x) => x.id === 'R083');
    const r100 = R100_COVERAGE_STATUS_BY_ID.find((x) => x.id === 'R100');
    expect(r006).toMatchObject({
      status: 'BLOCKED',
      blocker: 'BLOCKED_EXTERNAL_ACQUISITION',
    });
    expect(r083).toMatchObject({
      status: 'BLOCKED',
      blocker: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY',
    });
    expect(r100).toMatchObject({ status: 'OPEN', issueRefs: ['#1054'] });
    expect(R100_EXPLICIT_BLOCKER_RULES).toContain(
      'R083_IS_AUTHORITY_BLOCKED_NOT_EXTERNAL_ACQUISITION_BLOCKED',
    );
  });

  it('preserves issue/workbench references recorded by the master snapshot', () => {
    expect(
      R100_COVERAGE_STATUS_BY_ID.find((x) => x.id === 'R099')?.issueRefs,
    ).toEqual(['#1053', '#1252']);
    expect(
      R100_COVERAGE_STATUS_BY_ID.find((x) => x.id === 'R011')?.issueRefs,
    ).toEqual(['#934']);
  });

  it('defines exactly ten groups and one hundred unique sequential next frontiers', () => {
    expect(R100_FRONTIER_GROUPS).toHaveLength(10);
    expect(R100_NEXT_100_FRONTIERS).toHaveLength(100);
    expect(new Set(R100_NEXT_100_FRONTIERS.map((x) => x.id)).size).toBe(100);
    expect(new Set(R100_NEXT_100_FRONTIERS.map((x) => x.title)).size).toBe(100);
    expect(R100_NEXT_100_FRONTIERS[0]?.id).toBe('R101');
    expect(R100_NEXT_100_FRONTIERS[99]?.id).toBe('R200');
    R100_NEXT_100_FRONTIERS.forEach((frontier, index) => {
      expect(frontier.id).toBe(`R${String(index + 101).padStart(3, '0')}`);
    });
  });

  it('keeps the next frontier century research-only and divergence-preserving', () => {
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'RESEARCH_ONLY_NOT_PRODUCT_OR_COMMERCE_BACKLOG',
    );
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'UNRESOLVED_R001_R100_IDENTITIES_REMAIN_AUTHORITATIVE',
    );
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'NO_HIDDEN_NUMERIC_STRENGTH_SCORE',
    );
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'NO_HIDDEN_NUMERIC_CONFIDENCE_SCORE',
    );
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'PRESERVE_SCHOOL_AND_SOURCE_DIVERGENCE',
    );
    expect(R100_FRONTIER_DESIGN_PRINCIPLES).toContain(
      'COUNTEREXAMPLE_AND_FALSIFICATION_FIRST_CLASS',
    );
  });

  it('publishes candidates without completion, implementation, commerce, or Production authority', () => {
    expect(R100_AUTHORITY).toEqual({
      status: 'COVERAGE_MAP_AND_CANDIDATE_FRONTIERS_PUBLISHED',
      candidateFrontierCount: 100,
      frontierAppearanceImpliesCompletion: false,
      frontierAppearanceImpliesImplementationAuthorization: false,
      unresolvedPriorFrontierAutoClosed: false,
      numericStrengthModelIntroduced: false,
      numericConfidenceModelIntroduced: false,
      schoolDivergenceCollapsed: false,
      productCommerceBacklogCreated: false,
      productionAuthorityPromoted: false,
    });
  });
});
