import { describe, expect, it } from 'vitest';
import {
  R022_AUTHORITY,
  R022_EXECUTION_GAPS,
  R022_WEALTH_PATTERN_PROPOSITIONS,
  R022_WEALTH_PATTERN_VERSION,
} from '../src/research/general-natal-wealth-pattern-conditions.js';

describe('R022 Wealth-pattern condition matrix', () => {
  it('preserves success, failure, contamination, and rescue as separate roles', () => {
    expect(R022_WEALTH_PATTERN_VERSION).toBe('0.1.0-research');
    const roles = new Set(R022_WEALTH_PATTERN_PROPOSITIONS.map((p) => p.role));
    expect(roles).toEqual(new Set(['SUCCESS', 'FAILURE', 'CONTAMINATION', 'RESCUE']));
  });

  it('keeps every source proposition non-executable until operands are governed', () => {
    expect(R022_WEALTH_PATTERN_PROPOSITIONS.every((p) => p.executable === false)).toBe(true);
    expect(R022_EXECUTION_GAPS).toContain('WEALTH_PATTERN_CANDIDATE_SELECTION');
    expect(R022_EXECUTION_GAPS).toContain('BODY_STRENGTH');
    expect(R022_EXECUTION_GAPS).toContain('RESCUE_PRECEDENCE');
  });

  it('does not promote proposition verification into a pattern resolver', () => {
    expect(R022_AUTHORITY).toEqual({
      status: 'research',
      propositionFamiliesVerified: true,
      executableWealthPatternResolverAuthorized: false,
      successBooleanAuthorized: false,
      failureBooleanAuthorized: false,
      rescueResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
