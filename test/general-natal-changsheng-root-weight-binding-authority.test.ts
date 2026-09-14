import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DECISION,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  evaluateChangshengHeavyRootClause,
} from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';

describe('General Natal Changsheng root-weight binding authority', () => {
  test('freezes the narrow bridge to research-only authority', () => {
    const authority = GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY;

    expect(authority.decision).toBe(GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DECISION);
    expect(authority.directSourceChangshengHeavyRootSemanticObserved).toBe(true);
    expect(authority.directSourceYinChangshengExceptionObserved).toBe(true);
    expect(authority.canonicalDayMasterStemAvailable).toBe(true);
    expect(authority.canonicalDayMasterYinYangAvailable).toBe(true);
    expect(authority.canonicalBranchInputAvailable).toBe(true);
    expect(authority.twelveGrowthStageMappingAvailableResearchOnly).toBe(true);
    expect(authority.yangChangshengHeavyRootPredicateAuthorizedResearchOnly).toBe(true);
    expect(authority.yinChangshengHeavyRootExclusionAuthorizedResearchOnly).toBe(true);
    expect(GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test.each([
    ['갑', '양', '해'],
    ['병', '양', '인'],
    ['무', '양', '인'],
    ['경', '양', '사'],
    ['임', '양', '신'],
  ] as const)('establishes the source Changsheng heavy-root clause for Yang %s%s', (stem, yinYang, branch) => {
    expect(evaluateChangshengHeavyRootClause({ value: stem, yinYang }, branch)).toEqual({
      stem,
      yinYang,
      branch,
      stage: '長生',
      heavyRootByChangshengClause: 'established',
      authority: 'research_only',
    });
  });

  test.each([
    ['을', '음', '오'],
    ['정', '음', '유'],
    ['기', '음', '유'],
    ['신', '음', '자'],
    ['계', '음', '묘'],
  ] as const)('excludes Yin Changsheng %s%s from the heavy-root-by-Changsheng clause', (stem, yinYang, branch) => {
    expect(evaluateChangshengHeavyRootClause({ value: stem, yinYang }, branch)).toEqual({
      stem,
      yinYang,
      branch,
      stage: '長生',
      heavyRootByChangshengClause: 'excluded_by_yin_exception',
      authority: 'research_only',
    });
  });

  test('returns not_applicable outside Changsheng without assigning another root class', () => {
    expect(evaluateChangshengHeavyRootClause({ value: '갑', yinYang: '양' }, '자')).toEqual({
      stem: '갑',
      yinYang: '양',
      branch: '자',
      stage: '沐浴',
      heavyRootByChangshengClause: 'not_applicable',
      authority: 'research_only',
    });
  });

  test('keeps Minggen, Yuqi, Lu/Ren, strength, candidate, and production semantics fail-closed', () => {
    const authority = GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY;

    expect(authority.directSourceYinChangshengBoundedExamples).toEqual(['乙午', '丁酉']);
    expect(authority.allFiveYinChangshengExclusionAuthorityChainAuthorized).toBe(true);
    expect(authority.yinChangshengMinggenSemanticObserved).toBe(true);
    expect(authority.yinChangshengMinggenClassifierAuthorized).toBe(false);
    expect(authority.yinChangshengYuqiEquivalenceAuthorized).toBe(false);
    expect(authority.luToLinGuanEquivalenceAuthorized).toBe(false);
    expect(authority.renToDiWangEquivalenceAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
