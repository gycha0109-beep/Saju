import { describe, expect, it } from 'vitest';
import {
  R057_AUTHORITY,
  R057_CONTEXT_AXES,
  R057_DIRECT_MODIFIERS,
  R057_EXECUTION_GAPS,
  R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
  R057_LIUHAI_PAIRS,
  R057_WEIGHT_BOUNDARY,
} from '../src/research/general-natal-liuhai-evidence-weight.js';

describe('R057 Liu-Hai meaning and evidentiary weight', () => {
  it('preserves exactly six structural pairs', () => {
    expect(R057_LIUHAI_EVIDENCE_WEIGHT_VERSION).toBe('0.1.0-research');
    expect(R057_LIUHAI_PAIRS).toEqual([
      ['子', '未'],
      ['丑', '午'],
      ['寅', '巳'],
      ['卯', '辰'],
      ['申', '亥'],
      ['酉', '戌'],
    ]);
  });

  it('records direct contextual modifiers without executing them', () => {
    expect(R057_DIRECT_MODIFIERS).toHaveLength(5);
    expect(R057_DIRECT_MODIFIERS.every((x) => x.executable === false)).toBe(true);
    expect(R057_DIRECT_MODIFIERS).toEqual(expect.arrayContaining([
      expect.objectContaining({ pair: ['丑', '午'], modifier: 'TRUE_GHOST_PRESENT' }),
      expect.objectContaining({ pair: ['申', '亥'], modifier: 'NAYIN_MUTUAL_CONTROL' }),
      expect.objectContaining({ pair: ['酉', '戌'], modifier: 'DIRECTIONAL_ASYMMETRY_OBSERVED' }),
    ]));
  });

  it('keeps source-observed context axes explicit', () => {
    expect(R057_CONTEXT_AXES).toEqual(expect.arrayContaining([
      'SHENGWANG_VS_SIJUE',
      'GUI_GE_VS_JIAN_GE',
      'YANGREN',
      'JIESHA',
      'GUANFU',
      'PALACE_POSITION',
    ]));
  });

  it('does not turn bounded relative wording into a universal severity scale', () => {
    expect(R057_WEIGHT_BOUNDARY).toEqual({
      sourceContext: 'SANMING_TONGHUI_VOLUME_11_YUN_SHENSHA_DISCUSSION',
      boundedRelativePhraseObserved: true,
      phraseIncludesLiuHaiAsLight: true,
      universalNumericSeverityAuthorized: false,
      universalCrossRelationRankingAuthorized: false,
      sourceOrderAsPrecedenceAuthorized: false,
    });
  });

  it('keeps effect, directionality, and precedence unresolved', () => {
    expect(R057_EXECUTION_GAPS).toContain('LIUHAI_CONTEXT_EFFECT');
    expect(R057_EXECUTION_GAPS).toContain('LIUHAI_DIRECTIONAL_EFFECT');
    expect(R057_EXECUTION_GAPS).toContain('CROSS_RELATION_PRECEDENCE');
    expect(R057_AUTHORITY).toEqual({
      status: 'VERIFIED_STRUCTURAL_PAIRS_AND_CONTEXT_VARIANCE',
      structuralPairCount: 6,
      pairPresenceImpliesFixedEffect: false,
      pairPresenceImpliesHarmfulPolarity: false,
      universalDirectionalEffectAuthorized: false,
      numericWeightAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
