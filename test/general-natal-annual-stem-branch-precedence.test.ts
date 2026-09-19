import { describe, expect, it } from 'vitest';
import {
  R074_ANNUAL_STEM_BRANCH_PRECEDENCE_VERSION,
  R074_AUTHORITY,
  R074_EXECUTION_GAPS,
  R074_PROPOSITIONS,
  R074_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-annual-stem-branch-precedence.js';

describe('R074 annual stem/branch precedence traditions', () => {
  it('preserves stem emphasis without discarding the branch', () => {
    expect(R074_ANNUAL_STEM_BRANCH_PRECEDENCE_VERSION).toBe('0.1.0-research');
    expect(R074_PROPOSITIONS.map((x) => x.proposition)).toEqual([
      'ANNUAL_STEM_EMPHASIS',
      'ANNUAL_BRANCH_REMAINS_OPERATIVE',
      'STEM_BRANCH_ROOT_SUPPORT_MODULATES_EFFECT',
      'ANNUAL_STATE_COMPOSES_WITH_DAYUN_AND_NATAL',
    ]);
    expect(R074_PROPOSITIONS.every(
      (x) => x.numericWeightAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects stem-only and invented numeric precedence', () => {
    expect(R074_REJECTED_SHORTCUTS).toContain('ANNUAL_STEM_ONLY');
    expect(R074_REJECTED_SHORTCUTS).toContain('ANNUAL_BRANCH_IGNORED');
    expect(R074_REJECTED_SHORTCUTS).toContain('ANNUAL_STEM_70_BRANCH_30');
  });

  it('requires composition with natal and Dayun before any event bridge', () => {
    expect(R074_EXECUTION_GAPS).toContain('DAYUN_ANNUAL_COMPOSITION');
    expect(R074_EXECUTION_GAPS).toContain('NATAL_ANNUAL_COMPOSITION');
    expect(R074_EXECUTION_GAPS).toContain('EVENT_BRIDGE');
  });

  it('keeps the frontier research-only', () => {
    expect(R074_AUTHORITY).toEqual({
      status: 'VERIFIED_STEM_EMPHASIS_WITH_BRANCH_PARTICIPATION',
      propositionCount: 4,
      annualStemOnlyAuthorized: false,
      universalNumericWeightAuthorized: false,
      executableAnnualPrecedenceResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
