import { describe, expect, it } from 'vitest';
import {
  R012_AUTHORITY,
  R012_COUNTEREXAMPLE_BOUNDARY,
  R012_MONTH_BRANCH_PRIORITY_VERSION,
  R012_PRIORITY_PROPOSITIONS,
} from '../src/research/general-natal-month-branch-priority-counterexamples.js';

describe('R012 month-branch priority and counterexample workbench', () => {
  it('keeps the Ziping priority statement scoped to Tonggen', () => {
    expect(R012_MONTH_BRANCH_PRIORITY_VERSION).toBe('0.1.0-research');
    expect(R012_PRIORITY_PROPOSITIONS).toContainEqual(
      expect.objectContaining({
        propositionId: 'month-branch-is-heaviest-within-tonggen',
        scope: '通根之中',
        state: 'SUPPORTED_BOUNDED',
        sourceStratum: 'later_commentary',
      }),
    );
  });

  it('preserves the Yuanhai anti-rigidity passage as a counterexample boundary', () => {
    expect(R012_PRIORITY_PROPOSITIONS).toContainEqual(
      expect.objectContaining({
        propositionId: 'month-command-is-exclusive-chart-authority',
        state: 'REJECTED_AS_OVERGENERALIZATION',
      }),
    );
    expect(R012_COUNTEREXAMPLE_BOUNDARY).toEqual(
      expect.objectContaining({
        targetOvergeneralization: 'MONTH_BRANCH_AS_EXCLUSIVE_OR_RIGID_CHART_AUTHORITY',
        result: 'COUNTEREXAMPLE_BOUNDARY_ESTABLISHED',
        doesNotRefuteScopedTonggenPriority: true,
      }),
    );
  });

  it('does not manufacture a multiplier, universal ordering, strength, or production authority', () => {
    expect(R012_AUTHORITY).toEqual(
      expect.objectContaining({
        status: 'research',
        monthBranchPriorityWithinTonggen: 'SUPPORTED_BOUNDED',
        monthBranchExclusiveAuthority: false,
        monthBranchNumericMultiplierAuthorized: false,
        universalRootOrderingAuthorized: false,
        strengthClassifierAuthorized: false,
        productionAuthorityPromoted: false,
        glyphExactDirectVisualClosureComplete: false,
      }),
    );
  });
});
