import { describe, expect, it } from 'vitest';
import {
  R071_AUTHORITY,
  R071_DAYUN_STEM_BRANCH_WEIGHTING_VERSION,
  R071_EXECUTION_GAPS,
  R071_REJECTED_WEIGHTING_SHORTCUTS,
  R071_TRADITION_PROPOSITIONS,
} from '../src/research/general-natal-dayun-stem-branch-weighting.js';

describe('R071 Dayun stem-vs-branch weighting traditions', () => {
  it('preserves four direct source propositions without numeric weights', () => {
    expect(R071_DAYUN_STEM_BRANCH_WEIGHTING_VERSION).toBe('0.1.0-research');
    expect(R071_TRADITION_PROPOSITIONS.map((x) => x.proposition)).toEqual([
      'DAYUN_BRANCH_EMPHASIS',
      'STEM_PERIOD_WITH_BRANCH_PARTICIPATION',
      'BRANCH_PERIOD_STEM_DISCARD_IN_ONE_FORMULATION',
      'TEN_YEAR_UPPER_LOWER_FIVE_YEAR_SPLIT',
    ]);
    expect(R071_TRADITION_PROPOSITIONS.every(
      (x) => x.numericWeightAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('does not silently map the five-year split to stem-only then branch-only', () => {
    expect(R071_REJECTED_WEIGHTING_SHORTCUTS).toContain(
      'FIRST_FIVE_STEM_ONLY_SECOND_FIVE_BRANCH_ONLY_WITHOUT_DIRECT_MAPPING',
    );
    expect(R071_AUTHORITY.fiveYearStemBranchAssignmentAuthorized).toBe(false);
  });

  it('rejects invented numeric weighting', () => {
    expect(R071_REJECTED_WEIGHTING_SHORTCUTS).toContain('STEM_50_BRANCH_50');
    expect(R071_REJECTED_WEIGHTING_SHORTCUTS).toContain('STEM_30_BRANCH_70');
    expect(R071_REJECTED_WEIGHTING_SHORTCUTS).toContain('HIDDEN_NUMERIC_WEIGHT');
  });

  it('keeps tradition selection and conflict precedence unresolved', () => {
    expect(R071_EXECUTION_GAPS).toContain('TRADITION_SELECTION');
    expect(R071_EXECUTION_GAPS).toContain('STEM_BRANCH_CONFLICT_PRECEDENCE');
    expect(R071_EXECUTION_GAPS).toContain('SCHOOL_PROVENANCE_RECONCILIATION');
  });

  it('keeps the frontier research-only', () => {
    expect(R071_AUTHORITY).toEqual({
      status: 'VERIFIED_TRADITION_VARIANCE_NO_NUMERIC_WEIGHT',
      propositionCount: 4,
      universalNumericWeightAuthorized: false,
      fiveYearStemBranchAssignmentAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
