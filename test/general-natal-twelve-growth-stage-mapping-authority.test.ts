import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY,
  GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DECISION,
  GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH,
  TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH,
  TWELVE_GROWTH_STAGE_EARTHLY_BRANCHES,
  TWELVE_GROWTH_STAGE_HEAVENLY_STEMS,
  TWELVE_GROWTH_STAGE_VALUES,
  getTwelveGrowthStage,
} from '../src/research/general-natal-twelve-growth-stage-mapping-authority.js';

describe('General Natal twelve-growth-stage mapping authority', () => {
  test('freezes the review to research-only mapping authority', () => {
    const authority = GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY;

    expect(authority.decision).toBe(GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DECISION);
    expect(authority.directSourceTwelveGrowthStageSystemObserved).toBe(true);
    expect(authority.directSourceTenStemTwelveBranchMappingObserved).toBe(true);
    expect(authority.directSourceYangForwardYinReverseObserved).toBe(true);
    expect(authority.canonicalHeavenlyStemInputAvailable).toBe(true);
    expect(authority.canonicalEarthlyBranchInputAvailable).toBe(true);
    expect(authority.sourceMappingExhaustive).toBe(true);
    expect(authority.executableTwelveGrowthStageMappingAuthorizedResearchOnly).toBe(true);
    expect(GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('covers every canonical stem and branch exactly once', () => {
    expect(TWELVE_GROWTH_STAGE_HEAVENLY_STEMS).toHaveLength(10);
    expect(TWELVE_GROWTH_STAGE_EARTHLY_BRANCHES).toHaveLength(12);
    expect(TWELVE_GROWTH_STAGE_VALUES).toHaveLength(12);

    expect(Object.keys(TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH).sort()).toEqual(
      [...TWELVE_GROWTH_STAGE_HEAVENLY_STEMS].sort(),
    );

    for (const stem of TWELVE_GROWTH_STAGE_HEAVENLY_STEMS) {
      const row = TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH[stem];
      expect(Object.keys(row).sort()).toEqual([...TWELVE_GROWTH_STAGE_EARTHLY_BRANCHES].sort());
      expect(new Set(Object.values(row))).toEqual(new Set(TWELVE_GROWTH_STAGE_VALUES));
    }
  });

  test('matches all ten selected-source Chang Sheng anchors', () => {
    expect(getTwelveGrowthStage('갑', '해')).toBe('長生');
    expect(getTwelveGrowthStage('을', '오')).toBe('長生');
    expect(getTwelveGrowthStage('병', '인')).toBe('長生');
    expect(getTwelveGrowthStage('정', '유')).toBe('長生');
    expect(getTwelveGrowthStage('무', '인')).toBe('長生');
    expect(getTwelveGrowthStage('기', '유')).toBe('長生');
    expect(getTwelveGrowthStage('경', '사')).toBe('長生');
    expect(getTwelveGrowthStage('신', '자')).toBe('長生');
    expect(getTwelveGrowthStage('임', '신')).toBe('長生');
    expect(getTwelveGrowthStage('계', '묘')).toBe('長生');
  });

  test('preserves selected-source yang-forward and yin-reverse examples', () => {
    expect(getTwelveGrowthStage('갑', '자')).toBe('沐浴');
    expect(getTwelveGrowthStage('갑', '축')).toBe('冠帶');
    expect(getTwelveGrowthStage('갑', '인')).toBe('臨官');
    expect(getTwelveGrowthStage('갑', '묘')).toBe('帝旺');

    expect(getTwelveGrowthStage('을', '사')).toBe('沐浴');
    expect(getTwelveGrowthStage('을', '진')).toBe('冠帶');
    expect(getTwelveGrowthStage('을', '묘')).toBe('臨官');
    expect(getTwelveGrowthStage('을', '인')).toBe('帝旺');

    expect(getTwelveGrowthStage('임', '해')).toBe('臨官');
    expect(getTwelveGrowthStage('임', '자')).toBe('帝旺');
    expect(getTwelveGrowthStage('계', '자')).toBe('臨官');
    expect(getTwelveGrowthStage('계', '해')).toBe('帝旺');
  });

  test('does not promote the mapping into root-weight or strength semantics', () => {
    const authority = GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY;

    expect(authority.luToLinGuanEquivalenceAuthorized).toBe(false);
    expect(authority.renToDiWangEquivalenceAuthorized).toBe(false);
    expect(authority.stageToRootWeightBindingAuthorized).toBe(false);
    expect(authority.tombToMuKuRootBindingAuthorized).toBe(false);
    expect(authority.hiddenStemToYuQiBindingAuthorized).toBe(false);
    expect(authority.yinChangShengToHeavyRootBindingAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.rootWeightClassifierAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
