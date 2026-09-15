import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_AUTHORITY,
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING,
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
  bindFourYangLuHeavyRootToBoundedOperand,
} from '../src/research/general-natal-four-yang-lu-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY,
  evaluateFourYangLuHeavyRoot,
} from '../src/research/general-natal-four-yang-lu-heavy-root-authority.js';

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

describe('General Natal four governed Yang Lu bounded comparison operand authority', () => {
  test('pins the exact upstream bounded Changsheng/Lu/Ren operand as the Lu constituent', () => {
    expect(GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING).toEqual({
      propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
      operandKind: 'applicable_changsheng_lu_ren_root',
      constituent: 'lu',
      observedInUpstreamRegistry: true,
    });
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
        (proposition) =>
          proposition.id === 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' &&
          proposition.right.kind === 'applicable_changsheng_lu_ren_root',
      ),
    ).toBe(true);
  });

  test.each([
    [STEMS.갑, '인'],
    [STEMS.병, '사'],
    [STEMS.경, '신'],
    [STEMS.임, '해'],
  ] as const)('admits every governed non-Earth Yang Lu match as the bounded Lu constituent', (stem, branch) => {
    const lu = evaluateFourYangLuHeavyRoot(stem, branch);
    expect(lu.heavyRootState).toBe('lu_heavy_root_established');

    const bound = bindFourYangLuHeavyRootToBoundedOperand(lu);
    expect(bound).toEqual({
      stem: stem.value,
      branch,
      upstreamLuHeavyRootState: 'lu_heavy_root_established',
      state: 'applicable_bounded_lu_root_operand',
      boundedOperandKind: 'applicable_changsheng_lu_ren_root',
      authority: 'research_only',
    });
  });

  test.each([
    [STEMS.갑, '묘'],
    [STEMS.병, '오'],
    [STEMS.경, '유'],
    [STEMS.임, '자'],
  ] as const)('keeps governed Yang-stem Lu mismatches non-applicable', (stem, branch) => {
    const lu = evaluateFourYangLuHeavyRoot(stem, branch);
    expect(lu.heavyRootState).toBe('no_governed_lu_match');

    const bound = bindFourYangLuHeavyRootToBoundedOperand(lu);
    expect(bound.state).toBe('not_applicable_bounded_lu_root_operand');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test.each([
    [STEMS.을, '인'],
    [STEMS.정, '사'],
    [STEMS.무, '사'],
    [STEMS.기, '해'],
    [STEMS.신, '신'],
    [STEMS.계, '해'],
  ] as const)('keeps all Yin stems and Earth Yang outside the governed Lu scope', (stem, branch) => {
    const lu = evaluateFourYangLuHeavyRoot(stem, branch);
    expect(lu.heavyRootState).toBe('outside_governed_yang_non_earth_scope');

    const bound = bindFourYangLuHeavyRootToBoundedOperand(lu);
    expect(bound.state).toBe('outside_governed_lu_scope');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test('chains only the governed upstream Lu evaluation without local Lu rediscovery or chart comparison', () => {
    const authority = GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceThreePeersLessThanChangshengLuRenObserved).toBe(true);
    expect(authority.directSourceLuHeavyRootSemanticObserved).toBe(true);
    expect(authority.upstreamBoundedComparisonOperandAvailableObservationOnly).toBe(true);
    expect(authority.upstreamFourYangLuEvaluatorAvailableResearchOnly).toBe(true);
    expect(authority.upstreamOperandBindingObserved).toBe(true);
    expect(authority.fourGovernedYangLuToBoundedOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.yinStemLuToBoundedOperandAuthorized).toBe(false);
    expect(authority.earthStemLuToBoundedOperandAuthorized).toBe(false);
    expect(authority.sourceInternalYinLuInterpretation).toBe('AMBIGUOUS');
    expect(authority.sourceInternalYinLuAmbiguityPreserved).toBe(true);
    expect(authority.upstreamLuEvaluationConsumed).toBe(true);
    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.localLuRediscoveryAuthorized).toBe(false);
    expect(authority.foreignTwelveGrowthMappingConsumed).toBe(false);
    expect(authority.hiddenStemDataConsumed).toBe(false);
    expect(authority.peerStemCountConsumed).toBe(false);
    expect(authority.chartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps upstream Yin/Earth and all weighting/Gyeokguk/production escalation closed', () => {
    const authority = GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_AUTHORITY;
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.yinStemLuMatcherAuthorized).toBe(false);
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.earthStemLuMatcherAuthorized).toBe(false);
    expect(
      GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.foreignTwelveGrowthMappingConsumedAsLuInput,
    ).toBe(false);
    expect(GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.hiddenStemDataConsumedByMatcher).toBe(
      false,
    );
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartLevelComparisonEvaluatorAuthorized).toBe(
      false,
    );
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.linearWeightScaleAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
