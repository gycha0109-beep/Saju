import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_MAPPING,
  evaluateFourYangLuHeavyRoot,
} from '../src/research/general-natal-four-yang-lu-heavy-root-authority.js';
import { GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY } from '../src/research/general-natal-root-term-binding-authority.js';

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

describe('General Natal four non-Earth Yang-stem Lu heavy-root authority', () => {
  test('pins exactly four governed Yang-stem Lu mappings', () => {
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_MAPPING).toEqual({
      갑: '인',
      병: '사',
      경: '신',
      임: '해',
    });
  });

  test.each([
    [STEMS.갑, '인'],
    [STEMS.병, '사'],
    [STEMS.경, '신'],
    [STEMS.임, '해'],
  ] as const)('establishes only the governed four Yang-stem Lu heavy roots', (stem, branch) => {
    expect(evaluateFourYangLuHeavyRoot(stem, branch).heavyRootState).toBe(
      'lu_heavy_root_established',
    );
  });

  test.each([
    [STEMS.갑, '묘'],
    [STEMS.병, '오'],
    [STEMS.경, '유'],
    [STEMS.임, '자'],
  ] as const)('returns no governed Lu match for wrong branches of governed stems', (stem, branch) => {
    expect(evaluateFourYangLuHeavyRoot(stem, branch).heavyRootState).toBe(
      'no_governed_lu_match',
    );
  });

  test.each([
    STEMS.을,
    STEMS.정,
    STEMS.기,
    STEMS.신,
    STEMS.계,
    STEMS.무,
  ] as const)('keeps Yin stems and both Earth stems outside this governed scope', (stem) => {
    expect(evaluateFourYangLuHeavyRoot(stem, '인').heavyRootState).toBe(
      'outside_governed_yang_non_earth_scope',
    );
  });

  test('preserves the selected-source Yin-Lu ambiguity instead of overriding it', () => {
    expect(GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation).toBe(
      'AMBIGUOUS',
    );
    expect(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.sourceInternalYinLuInterpretation,
    ).toBe('AMBIGUOUS');
    expect(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.sourceInternalYinLuAmbiguityPreserved,
    ).toBe(true);
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.yinStemLuMatcherAuthorized).toBe(
      false,
    );
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.earthStemLuMatcherAuthorized).toBe(
      false,
    );
  });

  test('chains only governed selected-source observations and keeps foreign-stage composition closed', () => {
    const authority = GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceLuHeavyRootSemanticObserved).toBe(true);
    expect(authority.selectedSourceLuLinguanTermBindingObserved).toBe(true);
    expect(authority.selectedSourceNonEarthLuLocationRegistryAvailableObservationOnly).toBe(true);
    expect(authority.directSourceJiaYinLuObserved).toBe(true);
    expect(authority.directSourceFireWaterLuObserved).toBe(true);
    expect(authority.directSourceMetalWoodAnalogyObserved).toBe(true);
    expect(authority.fourNonEarthYangStemLuMatcherAuthorizedResearchOnly).toBe(true);
    expect(authority.foreignTwelveGrowthMappingConsumedAsLuInput).toBe(false);
    expect(authority.mingliTanyuanLinguanStageAsLuInputAuthorized).toBe(false);
    expect(authority.hiddenStemDataConsumedByMatcher).toBe(false);
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps weight, strength, Gyeokguk, production, and Commerce escalation closed', () => {
    const authority = GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY;
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
