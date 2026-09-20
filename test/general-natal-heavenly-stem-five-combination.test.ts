import { describe, expect, it } from 'vitest';
import {
  R051_AUTHORITY,
  R051_EXECUTION_GAPS,
  R051_FIVE_COMBINATION_FAMILIES,
  R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
  R051_REJECTED_SHORTCUTS,
  R051_STAGE_MODEL,
} from '../src/research/general-natal-heavenly-stem-five-combination.js';

describe('R051 Heavenly-Stem Five-Combination prerequisites', () => {
  it('preserves exactly five named pair/product families', () => {
    expect(R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION).toBe('0.1.0-research');
    expect(R051_FIVE_COMBINATION_FAMILIES).toEqual([
      expect.objectContaining({ left: '甲', right: '己', declaredTransformationFamily: '土' }),
      expect.objectContaining({ left: '乙', right: '庚', declaredTransformationFamily: '金' }),
      expect.objectContaining({ left: '丙', right: '辛', declaredTransformationFamily: '水' }),
      expect.objectContaining({ left: '丁', right: '壬', declaredTransformationFamily: '木' }),
      expect.objectContaining({ left: '戊', right: '癸', declaredTransformationFamily: '火' }),
    ]);
    expect(R051_FIVE_COMBINATION_FAMILIES.every((x) => x.pairIdentityVerified)).toBe(true);
  });

  it('separates pair identity, effective combination, and transformation', () => {
    expect(R051_STAGE_MODEL.map((x) => x.stage)).toEqual([
      'PAIR_IDENTITY',
      'EFFECTIVE_COMBINATION',
      'TRANSFORMATION',
    ]);
    expect(R051_FIVE_COMBINATION_FAMILIES.every(
      (x) => x.effectiveCombinationAuthorized === false && x.transformationAuthorized === false,
    )).toBe(true);
  });

  it('keeps transformation prerequisites fail-closed', () => {
    expect(R051_EXECUTION_GAPS).toContain('INTERVENING_STEM_EFFECT');
    expect(R051_EXECUTION_GAPS).toContain('BRANCH_SUPPORT_FOR_TRANSFORMATION');
    expect(R051_EXECUTION_GAPS).toContain('SEASONAL_TRANSFORMATION_SUPPORT');
    expect(R051_EXECUTION_GAPS).toContain('WHOLE_CHART_HUACQI_CLASSIFICATION');
  });

  it('rejects presence-only transformation shortcuts', () => {
    expect(R051_REJECTED_SHORTCUTS).toContain('PAIR_PRESENT_IMPLIES_EFFECTIVE_COMBINATION');
    expect(R051_REJECTED_SHORTCUTS).toContain('PAIR_PRESENT_IMPLIES_TRANSFORMED_ELEMENT');
    expect(R051_REJECTED_SHORTCUTS).toContain('TRANSFORMED_PAIR_IMPLIES_WHOLE_CHART_TRANSFORMATION');
  });

  it('does not promote executable or Production authority', () => {
    expect(R051_AUTHORITY).toEqual({
      status: 'VERIFIED_PAIR_FAMILIES_ONLY',
      pairFamilyCount: 5,
      effectiveCombinationResolverAuthorized: false,
      transformationResolverAuthorized: false,
      wholeChartHuacqiResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
