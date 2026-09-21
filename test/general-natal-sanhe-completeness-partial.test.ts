import { describe, expect, it } from 'vitest';
import {
  R053_AUTHORITY,
  R053_BOUNDED_COMPLETION_EXAMPLES,
  R053_COMPLETE_FAMILIES,
  R053_EXECUTION_GAPS,
  R053_PARTIAL_SUBSETS,
  R053_SANHE_COMPLETENESS_VERSION,
} from '../src/research/general-natal-sanhe-completeness-partial.js';

describe('R053 Sanhe completeness / partial boundary', () => {
  it('preserves exactly four complete family identities', () => {
    expect(R053_SANHE_COMPLETENESS_VERSION).toBe('0.1.0-research');
    expect(R053_COMPLETE_FAMILIES).toEqual([
      expect.objectContaining({ members: ['申', '子', '辰'], declaredFamily: '水' }),
      expect.objectContaining({ members: ['寅', '午', '戌'], declaredFamily: '火' }),
      expect.objectContaining({ members: ['亥', '卯', '未'], declaredFamily: '木' }),
      expect.objectContaining({ members: ['巳', '酉', '丑'], declaredFamily: '金' }),
    ]);
    expect(R053_COMPLETE_FAMILIES.every((x) => x.automaticTransformationAuthorized === false)).toBe(true);
  });

  it('inventories all 12 two-of-three subsets without assigning a disputed taxonomy', () => {
    expect(R053_PARTIAL_SUBSETS).toHaveLength(12);
    expect(new Set(R053_PARTIAL_SUBSETS.map((x) => `${x.parentFamilyId}:${[...x.members].sort().join('-')}`)).size).toBe(12);
    expect(R053_PARTIAL_SUBSETS.every(
      (x) => x.taxonomy === 'UNRESOLVED' && x.effect === 'UNRESOLVED' && x.executable === false,
    )).toBe(true);
  });

  it('keeps concrete completion examples bounded to full three-member contexts', () => {
    expect(R053_BOUNDED_COMPLETION_EXAMPLES).toEqual([
      expect.objectContaining({
        existingMonthBranch: '亥',
        arrivingBranches: ['卯', '未'],
        completedFamilyId: 'HAI-MAO-WEI',
        generalizedPartialRuleAuthorized: false,
      }),
      expect.objectContaining({
        existingMonthBranch: '申',
        arrivingBranches: ['子', '辰'],
        completedFamilyId: 'SHEN-ZI-CHEN',
        generalizedPartialRuleAuthorized: false,
      }),
    ]);
  });

  it('keeps partial and transformation semantics fail-closed', () => {
    expect(R053_EXECUTION_GAPS).toContain('PARTIAL_PAIR_TAXONOMY');
    expect(R053_EXECUTION_GAPS).toContain('TIME_LAYER_COMPLETION_SEMANTICS');
    expect(R053_EXECUTION_GAPS).toContain('TRANSFORMATION_SUFFICIENCY');
    expect(R053_AUTHORITY).toEqual({
      status: 'COMPLETE_FAMILIES_VERIFIED_PARTIAL_RULE_INCONCLUSIVE',
      completeFamilyCount: 4,
      partialSubsetInventoryCount: 12,
      genericHalfCombinationTaxonomyAuthorized: false,
      twoOfThreeImpliesCompleteSanhe: false,
      completeSetImpliesTransformation: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
