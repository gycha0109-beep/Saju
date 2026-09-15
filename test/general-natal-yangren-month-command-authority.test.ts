import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING,
  GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY,
  GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH,
  evaluateYangrenMonthCommand,
} from '../src/research/general-natal-yangren-month-command-authority.js';

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

describe('General Natal five-Yang month-command Yangren authority', () => {
  test('pins the selected-source five-Yang month-command mapping', () => {
    expect(GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING).toEqual({
      갑: '묘',
      병: '오',
      무: '오',
      경: '유',
      임: '자',
    });
  });

  test.each([
    [STEMS.갑, '묘'],
    [STEMS.병, '오'],
    [STEMS.무, '오'],
    [STEMS.경, '유'],
    [STEMS.임, '자'],
  ] as const)('establishes Yangren only for the governed Yang stem and month branch', (stem, monthBranch) => {
    const result = evaluateYangrenMonthCommand(stem, monthBranch);
    expect(result.state).toBe('yangren_month_command_established');
    expect(result.monthBranch).toBe(monthBranch);
    expect(result.governedYangrenMonthBranch).toBe(monthBranch);
    expect(result.authority).toBe('research_only');
  });

  test.each([
    [STEMS.을, '묘'],
    [STEMS.정, '오'],
    [STEMS.기, '오'],
    [STEMS.신, '유'],
    [STEMS.계, '자'],
  ] as const)('keeps all Yin stems excluded from selected-source Yangren scope', (stem, monthBranch) => {
    const result = evaluateYangrenMonthCommand(stem, monthBranch);
    expect(result.state).toBe('excluded_by_selected_source_scope');
    expect(result.governedYangrenMonthBranch).toBeNull();
  });

  test.each([
    [STEMS.갑, '인'],
    [STEMS.병, '사'],
    [STEMS.무, '미'],
    [STEMS.경, '신'],
    [STEMS.임, '해'],
  ] as const)('fails closed for nonmatching Yang-stem month branches', (stem, monthBranch) => {
    const result = evaluateYangrenMonthCommand(stem, monthBranch);
    expect(result.state).toBe('no_governed_yangren_month_match');
    expect(result.governedYangrenMonthBranch).not.toBe(monthBranch);
  });

  test('records direct-source and canonical month-command authority', () => {
    const authority = GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceFiveYangScopeObserved).toBe(true);
    expect(authority.directSourceMonthCommandBoundaryObserved).toBe(true);
    expect(authority.directSourceJiaMaoYangrenObserved).toBe(true);
    expect(authority.directSourceBingWuYangrenObserved).toBe(true);
    expect(authority.directSourceWuWuYangrenObserved).toBe(true);
    expect(authority.directSourceGengYouYangrenObserved).toBe(true);
    expect(authority.directSourceRenZiYangrenObserved).toBe(true);
    expect(authority.canonicalDayMasterAvailable).toBe(true);
    expect(authority.canonicalMonthBranchAvailable).toBe(true);
    expect(authority.fiveYangMonthCommandYangrenMatcherAuthorizedResearchOnly).toBe(true);
    expect(authority.yinStemYangrenExclusionAuthorizedResearchOnly).toBe(true);
    expect(GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps the matcher month-command-only and every escalation closed', () => {
    const authority = GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY;
    expect(authority.monthBranchInputOnly).toBe(true);
    expect(authority.arbitraryPillarYangrenMatcherAuthorized).toBe(false);
    expect(authority.sameBranchInYearDayHourAsYangrenAuthorized).toBe(false);
    expect(authority.twelveGrowthStageMappingConsumed).toBe(false);
    expect(authority.diwangToYangrenEquivalenceAuthorized).toBe(false);
    expect(authority.yangrenToHeavyRootEquivalenceAuthorized).toBe(false);
    expect(authority.hiddenStemDataConsumed).toBe(false);
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
