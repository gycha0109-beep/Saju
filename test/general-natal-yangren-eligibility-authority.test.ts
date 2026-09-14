import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY,
  GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH,
  evaluateYangrenEligibility,
} from '../src/research/general-natal-yangren-eligibility-authority.js';

describe('General Natal Yangren eligibility authority', () => {
  test('authorizes only the selected-source eligibility boundary', () => {
    const authority = GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceYangOnlyYangrenScopeObserved).toBe(true);
    expect(authority.directSourceYinStemReclassificationAsJieObserved).toBe(true);
    expect(authority.canonicalDayMasterYinYangAvailable).toBe(true);
    expect(authority.yangrenEligibilityPredicateAuthorizedResearchOnly).toBe(true);
    expect(authority.yinStemYangrenExclusionAuthorizedResearchOnly).toBe(true);
    expect(GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test.each([
    ['갑', '양'],
    ['병', '양'],
    ['무', '양'],
    ['경', '양'],
    ['임', '양'],
  ] as const)('keeps Yang stem %s eligible only', (stem, yinYang) => {
    expect(evaluateYangrenEligibility({ value: stem, yinYang })).toEqual({
      stem,
      yinYang,
      yangrenEligibility: 'eligible_for_yangren_classification',
      authority: 'research_only',
    });
  });

  test.each([
    ['을', '음'],
    ['정', '음'],
    ['기', '음'],
    ['신', '음'],
    ['계', '음'],
  ] as const)('excludes Yin stem %s from Yangren scope', (stem, yinYang) => {
    expect(evaluateYangrenEligibility({ value: stem, yinYang })).toEqual({
      stem,
      yinYang,
      yangrenEligibility: 'excluded_by_selected_source_scope',
      authority: 'research_only',
    });
  });

  test('keeps all branch and production escalation unauthorized', () => {
    const authority = GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY;
    expect(authority.crossSourceConventionMergeAuthorized).toBe(false);
    expect(authority.completeYangrenBranchMatcherAuthorized).toBe(false);
    expect(authority.completeLuBranchMappingAuthorized).toBe(false);
    expect(authority.completeRenBranchMappingAuthorized).toBe(false);
    expect(authority.renToDiWangEquivalenceAuthorized).toBe(false);
    expect(authority.luToLinGuanEquivalenceAuthorized).toBe(false);
    expect(authority.tenStemYangrenMappingAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
