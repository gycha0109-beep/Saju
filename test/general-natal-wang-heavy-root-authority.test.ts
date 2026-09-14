import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING,
  GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH,
  evaluateWangHeavyRoot,
} from '../src/research/general-natal-wang-heavy-root-authority.js';

const STEMS = Object.freeze({
  갑: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
  을: { value: '을', hanja: '乙', element: '목', yinYang: '음' },
  병: { value: '병', hanja: '丙', element: '화', yinYang: '양' },
  정: { value: '정', hanja: '丁', element: '화', yinYang: '음' },
  무: { value: '무', hanja: '戊', element: '토', yinYang: '양' },
  기: { value: '기', hanja: '己', element: '토', yinYang: '음' },
  경: { value: '경', hanja: '庚', element: '금', yinYang: '양' },
  신: { value: '신', hanja: '辛', element: '금', yinYang: '음' },
  임: { value: '임', hanja: '壬', element: '수', yinYang: '양' },
  계: { value: '계', hanja: '癸', element: '수', yinYang: '음' },
} as const satisfies Readonly<Record<string, StemFact>>);

describe('General Natal Wang heavy-root authority', () => {
  test('records the direct source and canonical-input authority boundary', () => {
    const authority = GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceWangHeavyRootSemanticObserved).toBe(true);
    expect(authority.directSourceFourElementWangMappingObserved).toBe(true);
    expect(authority.directSourceFourCardinalWangScopeObserved).toBe(true);
    expect(authority.directSourceElementLevelNoYinYangSplitObserved).toBe(true);
    expect(authority.directSourceEarthJiwangMultiSeasonBoundaryObserved).toBe(true);
    expect(authority.canonicalInputUsesStemFactElement).toBe(true);
    expect(authority.canonicalInputUsesEarthlyBranch).toBe(true);
    expect(GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test.each([
    [STEMS.갑, '묘'],
    [STEMS.을, '묘'],
    [STEMS.병, '오'],
    [STEMS.정, '오'],
    [STEMS.경, '유'],
    [STEMS.신, '유'],
    [STEMS.임, '자'],
    [STEMS.계, '자'],
  ] as const)('uses the same element-level Wang mapping regardless of stem polarity', (stem, branch) => {
    expect(evaluateWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'wang_heavy_root_established',
    );
  });

  test('pins the four governed non-Earth mappings', () => {
    expect(GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING).toEqual({
      목: '묘',
      화: '오',
      금: '유',
      수: '자',
    });
  });

  test.each([
    [STEMS.무, '진'],
    [STEMS.무, '술'],
    [STEMS.기, '축'],
    [STEMS.기, '미'],
    [STEMS.무, '자'],
  ] as const)('fails closed for Earth rather than inventing one fixed Wang branch', (stem, branch) => {
    expect(evaluateWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'earth_boundary_unresolved',
    );
  });

  test.each([
    [STEMS.갑, '자'],
    [STEMS.병, '유'],
    [STEMS.경, '오'],
    [STEMS.임, '묘'],
  ] as const)('returns no governed heavy-root match for nonmatching non-Earth pairs', (stem, branch) => {
    expect(evaluateWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
  });

  test('keeps Twelve-Growth, hidden-stem, strength, Gyeokguk, and production escalation closed', () => {
    const authority = GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY;
    expect(authority.earthWangBranchMappingResolved).toBe(false);
    expect(authority.nonEarthWangHeavyRootMatcherAuthorizedResearchOnly).toBe(true);
    expect(authority.completeFiveElementWangMappingAuthorized).toBe(false);
    expect(authority.twelveGrowthStageMappingConsumedByMatcher).toBe(false);
    expect(authority.twelveGrowthDiwangToWangEquivalenceAuthorized).toBe(false);
    expect(authority.diwangToYangrenEquivalenceAuthorized).toBe(false);
    expect(authority.hiddenStemDataConsumedByMatcher).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
