import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING,
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
  bindChangshengHeavyRootToBoundedOperand,
} from '../src/research/general-natal-changsheng-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  evaluateChangshengHeavyRootClause,
} from '../src/research/general-natal-changsheng-root-weight-binding-authority.js';

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

describe('General Natal Yang Changsheng bounded comparison operand authority', () => {
  test('pins the exact upstream bounded Changsheng/Lu/Ren operand', () => {
    expect(GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING).toEqual({
      propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
      operandKind: 'applicable_changsheng_lu_ren_root',
      constituent: 'changsheng',
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
    [STEMS.갑, '해'],
    [STEMS.병, '인'],
    [STEMS.무, '인'],
    [STEMS.경, '사'],
    [STEMS.임, '신'],
  ] as const)('admits all governed Yang Changsheng anchors as the bounded Changsheng constituent', (stem, branch) => {
    const changsheng = evaluateChangshengHeavyRootClause(stem, branch);
    expect(changsheng.heavyRootByChangshengClause).toBe('established');

    const bound = bindChangshengHeavyRootToBoundedOperand(changsheng);
    expect(bound).toEqual({
      stem: stem.value,
      yinYang: '양',
      branch,
      stage: '長生',
      upstreamChangshengState: 'established',
      state: 'applicable_bounded_changsheng_root_operand',
      boundedOperandKind: 'applicable_changsheng_lu_ren_root',
      authority: 'research_only',
    });
  });

  test.each([
    [STEMS.을, '오'],
    [STEMS.정, '유'],
    [STEMS.기, '유'],
    [STEMS.신, '자'],
    [STEMS.계, '묘'],
  ] as const)('preserves every governed Yin Changsheng exception outside the bounded operand', (stem, branch) => {
    const changsheng = evaluateChangshengHeavyRootClause(stem, branch);
    expect(changsheng.heavyRootByChangshengClause).toBe('excluded_by_yin_exception');

    const bound = bindChangshengHeavyRootToBoundedOperand(changsheng);
    expect(bound.state).toBe('excluded_by_yin_changsheng_exception');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test('keeps non-Changsheng results non-applicable', () => {
    const changsheng = evaluateChangshengHeavyRootClause(STEMS.갑, '자');
    expect(changsheng.heavyRootByChangshengClause).toBe('not_applicable');

    const bound = bindChangshengHeavyRootToBoundedOperand(changsheng);
    expect(bound.state).toBe('not_applicable_bounded_changsheng_root_operand');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test('chains the governed upstream evaluator without local stage rediscovery or chart comparison', () => {
    const authority = GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceThreePeersLessThanChangshengLuRenObserved).toBe(true);
    expect(authority.directSourceChangshengHeavyRootSemanticObserved).toBe(true);
    expect(authority.directSourceYinChangshengExceptionObserved).toBe(true);
    expect(authority.upstreamBoundedComparisonOperandAvailableObservationOnly).toBe(true);
    expect(authority.upstreamChangshengEvaluatorAvailableResearchOnly).toBe(true);
    expect(authority.upstreamOperandBindingObserved).toBe(true);
    expect(authority.yangChangshengToBoundedOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.yinChangshengToBoundedOperandAuthorized).toBe(false);
    expect(authority.upstreamChangshengEvaluationConsumed).toBe(true);
    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.localTwelveGrowthRediscoveryAuthorized).toBe(false);
    expect(authority.twelveGrowthStageMappingConsumedDirectly).toBe(false);
    expect(authority.peerStemCountConsumed).toBe(false);
    expect(authority.chartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps the historical Yin exception and all weighting/Gyeokguk/production escalation closed', () => {
    const authority = GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_AUTHORITY;
    expect(
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
        .yinChangshengHeavyRootExclusionAuthorizedResearchOnly,
    ).toBe(true);
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
