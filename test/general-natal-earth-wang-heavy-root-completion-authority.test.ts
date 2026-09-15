import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_EARTH_WANG_BRANCH_LOCATIONS,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  evaluateCompleteWangHeavyRoot,
} from '../src/research/general-natal-earth-wang-heavy-root-completion-authority.js';
import { GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING } from '../src/research/general-natal-wang-heavy-root-authority.js';

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

describe('General Natal Earth Wang heavy-root completion authority', () => {
  test('records the direct-source completion and upstream #561 boundary', () => {
    const authority = GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceWangHeavyRootSemanticObserved).toBe(true);
    expect(authority.directSourceEarthFourSeasonWangObserved).toBe(true);
    expect(authority.directSourceEarthBranchSetObserved).toBe(true);
    expect(authority.directSourceElementLevelNoYinYangSplitObserved).toBe(true);
    expect(authority.earthWangBranchLocationMappingAuthorizedResearchOnly).toBe(true);
    expect(authority.completeFiveElementWangHeavyRootMatcherAuthorizedResearchOnly).toBe(true);
    expect(GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test('pins the exact Earth Wang branch-location set', () => {
    expect(GENERAL_NATAL_EARTH_WANG_BRANCH_LOCATIONS).toEqual(['진', '술', '축', '미']);
  });

  test.each([
    [STEMS.무, '진'],
    [STEMS.무, '술'],
    [STEMS.무, '축'],
    [STEMS.무, '미'],
    [STEMS.기, '진'],
    [STEMS.기, '술'],
    [STEMS.기, '축'],
    [STEMS.기, '미'],
  ] as const)('recognizes both Earth stems across all four Earth-Wang locations', (stem, branch) => {
    expect(evaluateCompleteWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'wang_heavy_root_established',
    );
  });

  test.each([
    [STEMS.무, '자'],
    [STEMS.무, '묘'],
    [STEMS.기, '오'],
    [STEMS.기, '유'],
    [STEMS.무, '해'],
  ] as const)('returns no governed Wang match for Earth outside the four governed locations', (stem, branch) => {
    expect(evaluateCompleteWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
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
  ] as const)('preserves the existing #561 non-Earth Wang mappings', (stem, branch) => {
    expect(evaluateCompleteWangHeavyRoot(stem, branch).heavyRootState).toBe(
      'wang_heavy_root_established',
    );
  });

  test('reuses the exact upstream non-Earth mapping rather than redefining it', () => {
    expect(GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING).toEqual({
      목: '묘',
      화: '오',
      금: '유',
      수: '자',
    });
  });

  test('does not treat the four Earth branches as Wang for non-Earth elements', () => {
    expect(evaluateCompleteWangHeavyRoot(STEMS.갑, '진').heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
    expect(evaluateCompleteWangHeavyRoot(STEMS.병, '술').heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
    expect(evaluateCompleteWangHeavyRoot(STEMS.경, '축').heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
    expect(evaluateCompleteWangHeavyRoot(STEMS.임, '미').heavyRootState).toBe(
      'no_governed_heavy_root_match',
    );
  });

  test('keeps timing, Twelve-Growth, hidden-stem, strength, Gyeokguk, and production escalation closed', () => {
    const authority = GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY;
    expect(authority.earthMonthCommandEighteenDayTimingEvaluatorAuthorized).toBe(false);
    expect(authority.earthWangExactEighteenDaySubperiodConsumed).toBe(false);
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
