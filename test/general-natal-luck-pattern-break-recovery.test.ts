import { describe, expect, it } from 'vitest';
import {
  R076_AUTHORITY,
  R076_CASES,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
  R076_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-luck-pattern-break-recovery.js';

describe('R076 luck-cycle pattern break/recovery cases', () => {
  it('preserves break, rescue, blocking, completion, and change cases separately', () => {
    expect(R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION).toBe('0.1.0-research');
    expect(R076_CASES.map((x) => x.mechanism)).toEqual([
      'BREAK_TRIGGER',
      'NATAL_RESCUE',
      'COUNTERFORCE_BLOCKS_CHANGE',
      'COMPLETION_WITH_NATAL_OBSTRUCTION',
      'CHANGE_WITH_NATAL_RESCUE',
    ]);
    expect(R076_CASES.every(
      (x) => x.automaticOutcome === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects a global break/recovery toggle', () => {
    expect(R076_REJECTED_SHORTCUTS).toContain('BAD_LUCK_AUTOMATICALLY_BREAKS_PATTERN');
    expect(R076_REJECTED_SHORTCUTS).toContain('NEXT_GOOD_LUCK_AUTOMATICALLY_RESTORES_PATTERN');
    expect(R076_REJECTED_SHORTCUTS).toContain('PATTERN_BREAK_IS_PERMANENT_NATAL_MUTATION');
  });

  it('does not assign fixed polarity to completion or change', () => {
    expect(R076_REJECTED_SHORTCUTS).toContain('COMPLETION_ALWAYS_GOOD');
    expect(R076_REJECTED_SHORTCUTS).toContain('CHANGE_ALWAYS_BAD');
  });

  it('keeps precedence, duration, and settlement unresolved', () => {
    expect(R076_EXECUTION_GAPS).toContain('COUNTERFORCE_PRECEDENCE');
    expect(R076_EXECUTION_GAPS).toContain('TEMPORAL_DURATION');
    expect(R076_EXECUTION_GAPS).toContain('POLARITY_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R076_AUTHORITY).toEqual({
      status: 'VERIFIED_CONFIGURATION_SPECIFIC_BREAK_RESCUE_CASES',
      caseCount: 5,
      globalBreakRecoveryToggleAuthorized: false,
      permanentNatalMutationAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
