import { describe, expect, it } from 'vitest';
import {
  R023_AUTHORITY,
  R023_EXECUTION_GAPS,
  R023_OFFICER_PATTERN_PROPOSITIONS,
  R023_OFFICER_PATTERN_VERSION,
} from '../src/research/general-natal-officer-pattern-conditions.js';

describe('R023 Officer-pattern condition matrix', () => {
  it('separates success, failure, contamination, and rescue', () => {
    expect(R023_OFFICER_PATTERN_VERSION).toBe('0.1.0-research');
    expect(new Set(R023_OFFICER_PATTERN_PROPOSITIONS.map((p) => p.role))).toEqual(
      new Set(['SUCCESS', 'FAILURE', 'CONTAMINATION', 'RESCUE']),
    );
  });

  it('keeps unresolved operands fail-closed', () => {
    expect(R023_OFFICER_PATTERN_PROPOSITIONS.every((p) => p.executable === false)).toBe(true);
    expect(R023_EXECUTION_GAPS).toContain('BODY_STRENGTH');
    expect(R023_EXECUTION_GAPS).toContain('OFFICER_RELATIVE_WEIGHT');
    expect(R023_EXECUTION_GAPS).toContain('RESCUE_PRECEDENCE');
  });

  it('does not promote source propositions into establishment authority', () => {
    expect(R023_AUTHORITY).toEqual({
      status: 'research',
      propositionFamiliesVerified: true,
      executableOfficerPatternResolverAuthorized: false,
      successBooleanAuthorized: false,
      failureBooleanAuthorized: false,
      rescueResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
