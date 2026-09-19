import { describe, expect, it } from 'vitest';
import {
  R085_AUTHORITY,
  R085_FALSE_NEGATIVE_PATTERNS,
  R085_FALSE_NEGATIVE_PATTERNS_VERSION,
} from '../src/research/general-natal-false-negative-patterns.js';

describe('R085 false-negative interpretation patterns', () => {
  it('catalogues twelve over-suppression failure families', () => {
    expect(R085_FALSE_NEGATIVE_PATTERNS_VERSION).toBe('0.1.0-research');
    expect(R085_FALSE_NEGATIVE_PATTERNS).toHaveLength(12);
    expect(R085_FALSE_NEGATIVE_PATTERNS.map((x) => x.id)).toEqual(
      Array.from({ length: 12 }, (_, i) => `FN${String(i + 1).padStart(2, '0')}`),
    );
  });

  it('does not convert recovered evidence into automatic truth', () => {
    expect(R085_FALSE_NEGATIVE_PATTERNS.every(
      (x) => x.suppressedEvidenceAutomaticallyTrue === false && x.executableRepair === false,
    )).toBe(true);
  });

  it('preserves plural candidates, source variants, and indeterminate states', () => {
    expect(R085_FALSE_NEGATIVE_PATTERNS).toEqual(expect.arrayContaining([
      expect.objectContaining({ suppressedEvidence: 'COEXISTING_CANDIDATES' }),
      expect.objectContaining({ suppressedEvidence: 'SOURCE_STRATUM_VARIANTS' }),
      expect.objectContaining({ suppressedEvidence: 'INDETERMINATE_CANDIDATE' }),
    ]));
  });

  it('does not change Production behavior', () => {
    expect(R085_AUTHORITY).toEqual({
      status: 'VERIFIED_FALSE_NEGATIVE_DIAGNOSTIC_CORPUS',
      patternCount: 12,
      suppressedEvidenceAutomaticallyTrue: false,
      automaticRepairAuthorized: false,
      productionBehaviorChanged: false,
    });
  });
});
