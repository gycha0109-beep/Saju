import { describe, expect, it } from 'vitest';
import {
  R055_AUTHORITY,
  R055_CONTEXT_AXES,
  R055_EXECUTION_GAPS,
  R055_QUALITATIVE_CATEGORY_BOUNDARY,
  R055_SIX_CLASH_CONTEXT_VERSION,
  R055_SIX_CLASH_PAIRS,
} from '../src/research/general-natal-six-clash-context.js';

describe('R055 Six-Clash contextual boundary', () => {
  it('preserves exactly six structural opposite-branch pairs', () => {
    expect(R055_SIX_CLASH_CONTEXT_VERSION).toBe('0.1.0-research');
    expect(R055_SIX_CLASH_PAIRS).toEqual([
      ['子', '午'],
      ['丑', '未'],
      ['寅', '申'],
      ['卯', '酉'],
      ['辰', '戌'],
      ['巳', '亥'],
    ]);
  });

  it('records every verified contextual axis without authorizing a resolver or numeric weight', () => {
    expect(R055_CONTEXT_AXES.map((x) => x.axis)).toEqual([
      'POSITION_DISTANCE',
      'COMPETING_COMBINATION_OR_MEETING',
      'USEFUL_OR_ADVERSE_ROLE_CONTEXT',
      'BRANCH_CATEGORY',
      'MULTIPLICITY_AND_REACTIVATION',
    ]);
    expect(R055_CONTEXT_AXES.every(
      (x) => x.sourceMaterialityVerified === true &&
        x.generalizedResolverAuthorized === false &&
        x.numericWeightAuthorized === false,
    )).toBe(true);
  });

  it('keeps branch-category distinctions qualitative', () => {
    expect(R055_QUALITATIVE_CATEGORY_BOUNDARY).toHaveLength(3);
    expect(R055_QUALITATIVE_CATEGORY_BOUNDARY.every((x) => x.fixedWeightAuthorized === false)).toBe(true);
  });

  it('keeps activation and settlement predicates unresolved', () => {
    expect(R055_EXECUTION_GAPS).toContain('POSITIONAL_PROXIMITY_CLASSIFIER');
    expect(R055_EXECUTION_GAPS).toContain('MULTIPLICITY_ACTIVATION_RULE');
    expect(R055_EXECUTION_GAPS).toContain('CROSS_RELATION_PRECEDENCE');
  });

  it('does not promote presence-only, polarity, score, or Production authority', () => {
    expect(R055_AUTHORITY).toEqual({
      status: 'VERIFIED_CONTEXT_AXES_ONLY',
      structuralPairCount: 6,
      pairPresenceImpliesEffectiveClash: false,
      clashImpliesHarmful: false,
      numericClashStrengthAuthorized: false,
      universalMultiplicityRuleAuthorized: false,
      universalCrossRelationPrecedenceAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
