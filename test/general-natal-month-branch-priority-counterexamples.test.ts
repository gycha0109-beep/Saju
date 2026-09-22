import { describe, expect, it } from 'vitest';
import {
  R012_AUTHORITY,
  R012_COUNTEREXAMPLE_BOUNDARY,
  R012_MONTH_BRANCH_PRIORITY_VERSION,
  R012_PRIORITY_PROPOSITIONS,
  R012_REJECTED_SHORTCUTS,
  R012_YUANHAI_SCAN,
} from '../src/research/general-natal-month-branch-priority-counterexamples.js';

describe('R012 month-branch priority and counterexample review', () => {
  it('pins the direct visual Yuanhai witness locator', () => {
    expect(R012_MONTH_BRANCH_PRIORITY_VERSION).toBe('0.2.0-research');
    expect(R012_YUANHAI_SCAN).toEqual(
      expect.objectContaining({
        fileId: 'NLC416-15jh007754-99036',
        pdfPageCount: 209,
        pdfZeroBasedPageIndex: 56,
        humanPdfPageNumber: 57,
        printedPageMarker: '三九',
        directVisualVerified: true,
      }),
    );
  });

  it('keeps the Ziping priority statement scoped to Tonggen', () => {
    expect(R012_PRIORITY_PROPOSITIONS).toContainEqual(
      expect.objectContaining({
        propositionId: 'month-branch-is-heaviest-within-tonggen',
        scope: '通根之中',
        state: 'SUPPORTED_BOUNDED',
        sourceStratum: 'later_commentary',
      }),
    );
  });

  it('preserves the direct-scan Yuanhai anti-rigidity counterexample boundary', () => {
    expect(R012_PRIORITY_PROPOSITIONS).toContainEqual(
      expect.objectContaining({
        propositionId: 'month-command-is-exclusive-chart-authority',
        state: 'REJECTED_AS_OVERGENERALIZATION',
        sourceStratum: 'republican_print_witness',
      }),
    );
    expect(R012_COUNTEREXAMPLE_BOUNDARY).toEqual(
      expect.objectContaining({
        targetOvergeneralization: 'MONTH_BRANCH_AS_EXCLUSIVE_OR_RIGID_CHART_AUTHORITY',
        result: 'COUNTEREXAMPLE_BOUNDARY_ESTABLISHED',
        directVisualEvidencePinned: true,
        doesNotRefuteScopedTonggenPriority: true,
      }),
    );
  });

  it('does not convert direct visual closure into original-edition or Production authority', () => {
    expect(R012_REJECTED_SHORTCUTS).toContain('REPUBLICAN_SCAN_EQUALS_AUTHORIAL_ORIGINAL');
    expect(R012_REJECTED_SHORTCUTS).toContain(
      'DIRECT_VISUAL_CLOSURE_EQUALS_PRODUCTION_PROMOTION',
    );
  });

  it('does not manufacture multiplier, ordering, strength, Gyeokguk, or Production authority', () => {
    expect(R012_AUTHORITY).toEqual({
      status: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
      monthBranchPriorityWithinTonggen: 'SUPPORTED_BOUNDED',
      monthBranchExclusiveAuthority: false,
      monthBranchNumericMultiplierAuthorized: false,
      universalRootOrderingAuthorized: false,
      strengthClassifierAuthorized: false,
      gyeokgukAuthorityPromoted: false,
      productionAuthorityPromoted: false,
      glyphExactDirectVisualClosureComplete: true,
    });
  });
});
