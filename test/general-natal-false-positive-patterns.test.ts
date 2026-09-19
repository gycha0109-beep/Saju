import { describe, expect, it } from 'vitest';
import {
  R084_AUTHORITY,
  R084_FALSE_POSITIVE_PATTERNS,
  R084_FALSE_POSITIVE_PATTERNS_VERSION,
} from '../src/research/general-natal-false-positive-patterns.js';

describe('R084 false-positive interpretation patterns', () => {
  it('catalogues twelve unsupported-positive failure families', () => {
    expect(R084_FALSE_POSITIVE_PATTERNS_VERSION).toBe('0.1.0-research');
    expect(R084_FALSE_POSITIVE_PATTERNS).toHaveLength(12);
    expect(R084_FALSE_POSITIVE_PATTERNS.map((x) => x.id)).toEqual(
      Array.from({ length: 12 }, (_, i) => `FP${String(i + 1).padStart(2, '0')}`),
    );
  });

  it('holds every Production assertion pending missing evidence', () => {
    expect(R084_FALSE_POSITIVE_PATTERNS.every(
      (x) => x.productionAssertion === 'HOLD' && x.executableRepair === false,
    )).toBe(true);
  });

  it('preserves critical false-positive boundaries', () => {
    expect(R084_FALSE_POSITIVE_PATTERNS).toEqual(expect.arrayContaining([
      expect.objectContaining({ trigger: 'SOURCE_WORKED_EXAMPLE', unsupportedLeap: 'ENGINE_GROUND_TRUTH' }),
      expect.objectContaining({ trigger: 'RETROSPECTIVE_ALIGNMENT', unsupportedLeap: 'PREDICTIVE_ACCURACY' }),
      expect.objectContaining({ trigger: 'ORDINARY_PATTERN_BROKEN', unsupportedLeap: 'AUTO_ENTER_FOLLOW_PATTERN' }),
    ]));
  });

  it('does not change Production behavior or invent scores', () => {
    expect(R084_AUTHORITY).toEqual({
      status: 'VERIFIED_FALSE_POSITIVE_DIAGNOSTIC_CORPUS',
      patternCount: 12,
      numericFalsePositiveProbabilityAuthorized: false,
      automaticRepairAuthorized: false,
      productionBehaviorChanged: false,
    });
  });
});
