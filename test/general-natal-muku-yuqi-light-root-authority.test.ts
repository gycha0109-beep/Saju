import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  evaluateMukuYuqiLightRoot,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';

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

describe('General Natal Muku/Yuqi light-root authority', () => {
  test('records the bounded source authority and canonical-input boundary', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceMukuYuqiLightRootSemanticObserved).toBe(true);
    expect(authority.directSourceFourElementMukuMappingObserved).toBe(true);
    expect(authority.directSourceFourElementYuqiMappingObserved).toBe(true);
    expect(authority.directSourceElementLevelNoYinYangSplitObserved).toBe(true);
    expect(authority.directSourceEarthMukuNonApplicabilityObserved).toBe(true);
    expect(authority.canonicalInputUsesStemFactElement).toBe(true);
    expect(authority.canonicalInputUsesEarthlyBranch).toBe(true);
    expect(authority.hiddenStemMembershipConsumedByMatcher).toBe(false);
    expect(authority.hiddenStemArrayOrderConsumedByMatcher).toBe(false);
    expect(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test.each([
    [STEMS.갑, '미', 'muku_light_root_established'],
    [STEMS.갑, '진', 'yuqi_light_root_established'],
    [STEMS.병, '술', 'muku_light_root_established'],
    [STEMS.병, '미', 'yuqi_light_root_established'],
    [STEMS.경, '축', 'muku_light_root_established'],
    [STEMS.경, '술', 'yuqi_light_root_established'],
    [STEMS.임, '진', 'muku_light_root_established'],
    [STEMS.임, '축', 'yuqi_light_root_established'],
  ] as const)('matches %s / %s only inside the governed four-element map', (stem, branch, expected) => {
    expect(evaluateMukuYuqiLightRoot(stem, branch).lightRootState).toBe(expected);
  });

  test.each([
    [STEMS.갑, STEMS.을, GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING.목],
    [STEMS.병, STEMS.정, GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING.화],
    [STEMS.경, STEMS.신, GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING.금],
    [STEMS.임, STEMS.계, GENERAL_NATAL_MUKU_YUQI_FOUR_ELEMENT_MAPPING.수],
  ] as const)('does not split same-element mappings by stem polarity', (yangStem, yinStem, mapping) => {
    expect(evaluateMukuYuqiLightRoot(yangStem, mapping.muku).lightRootState).toBe(
      'muku_light_root_established',
    );
    expect(evaluateMukuYuqiLightRoot(yinStem, mapping.muku).lightRootState).toBe(
      'muku_light_root_established',
    );
    expect(evaluateMukuYuqiLightRoot(yangStem, mapping.yuqi).lightRootState).toBe(
      'yuqi_light_root_established',
    );
    expect(evaluateMukuYuqiLightRoot(yinStem, mapping.yuqi).lightRootState).toBe(
      'yuqi_light_root_established',
    );
  });

  test.each([
    [STEMS.무, '진'],
    [STEMS.무, '술'],
    [STEMS.기, '축'],
    [STEMS.기, '미'],
  ] as const)('fails closed for Earth regardless of branch (%s / %s)', (stem, branch) => {
    expect(evaluateMukuYuqiLightRoot(stem, branch).lightRootState).toBe(
      'earth_boundary_unresolved',
    );
  });

  test.each([
    [STEMS.갑, '자'],
    [STEMS.병, '자'],
    [STEMS.경, '자'],
    [STEMS.임, '인'],
  ] as const)('returns no governed light-root match outside the direct map', (stem, branch) => {
    expect(evaluateMukuYuqiLightRoot(stem, branch).lightRootState).toBe(
      'no_governed_light_root_match',
    );
  });

  test('keeps Earth Yuqi, 十二長生 墓, root-weight escalation, and production fail-closed', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY;
    expect(authority.earthYuqiMappingResolved).toBe(false);
    expect(authority.completeFiveElementMukuYuqiMappingAuthorized).toBe(false);
    expect(authority.twelveGrowthMuToMukuEquivalenceAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(authority.unauthorizedDerivations).toContain('hidden_stem_array_order_as_yuqi');
    expect(authority.unauthorizedDerivations).toContain('hidden_stem_membership_as_complete_root_class');
    expect(authority.unauthorizedDerivations).toContain('twelve_growth_mu_to_muku_equivalence');
    expect(authority.unauthorizedDerivations).toContain('earth_yuqi_mapping_invention');
  });
});
