import { describe, expect, it } from 'vitest';
import {
  R072_AUTHORITY,
  R072_DAYUN_NATAL_INTERACTION_VERSION,
  R072_EXECUTION_GAPS,
  R072_INTERACTION_CLASSES,
  R072_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-dayun-natal-interaction.js';

describe('R072 Dayun interaction with natal structure', () => {
  it('preserves five distinct natal-context interaction classes', () => {
    expect(R072_DAYUN_NATAL_INTERACTION_VERSION).toBe('0.1.0-research');
    expect(R072_INTERACTION_CLASSES.map((x) => x.interaction)).toEqual([
      'NATAL_COMPLETION',
      'HIDDEN_TO_EXPOSED',
      'STRUCTURAL_CHANGE',
      'NATAL_BLOCK_OR_RESCUE',
      'MECHANISM_CLASS_SEPARATION',
    ]);
    expect(R072_INTERACTION_CLASSES.every(
      (x) => x.automaticPolarity === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects an independent fixed luck score', () => {
    expect(R072_REJECTED_SHORTCUTS).toContain('DAYUN_ELEMENT_ALONE_IMPLIES_GOOD_OR_BAD');
    expect(R072_REJECTED_SHORTCUTS).toContain('LUCK_ADDS_FIXED_ELEMENT_POINTS');
    expect(R072_REJECTED_SHORTCUTS).toContain('SAME_DAYUN_SAME_RESULT_ACROSS_CHARTS');
  });

  it('does not equate structural completion/change with fixed polarity', () => {
    expect(R072_REJECTED_SHORTCUTS).toContain('PATTERN_COMPLETION_ALWAYS_FAVORABLE');
    expect(R072_REJECTED_SHORTCUTS).toContain('PATTERN_CHANGE_ALWAYS_UNFAVORABLE');
  });

  it('keeps interaction matching and temporal settlement unresolved', () => {
    expect(R072_EXECUTION_GAPS).toContain('LUCK_TO_NATAL_INTERACTION_MATCHING');
    expect(R072_EXECUTION_GAPS).toContain('NATAL_BLOCK_RESCUE_PRECEDENCE');
    expect(R072_EXECUTION_GAPS).toContain('TEMPORAL_EFFECT_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R072_AUTHORITY).toEqual({
      status: 'VERIFIED_NATAL_CONTEXT_INTERACTION_CORPUS',
      interactionClassCount: 5,
      independentLuckScoreAuthorized: false,
      sameLuckSameOutcomeAuthorized: false,
      executableDayunInteractionResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
