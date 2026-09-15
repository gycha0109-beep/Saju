import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_AUTHORITY,
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING,
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
  bindYangrenMonthCommandToBoundedRenOperand,
} from '../src/research/general-natal-yangren-bounded-ren-root-operand-authority.js';
import {
  GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY,
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

describe('General Natal month-command Yangren bounded Ren operand authority', () => {
  test('pins the exact upstream bounded Ren operand observation', () => {
    expect(GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING).toEqual({
      propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
      operandKind: 'applicable_changsheng_lu_ren_root',
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
    [STEMS.갑, '묘'],
    [STEMS.병, '오'],
    [STEMS.무, '오'],
    [STEMS.경, '유'],
    [STEMS.임, '자'],
  ] as const)(
    'admits only an already-established month-command Yangren result as the bounded Ren operand',
    (stem, monthBranch) => {
      const yangren = evaluateYangrenMonthCommand(stem, monthBranch);
      expect(yangren.state).toBe('yangren_month_command_established');

      const bound = bindYangrenMonthCommandToBoundedRenOperand(yangren);
      expect(bound).toEqual({
        dayMaster: stem.value,
        monthBranch,
        upstreamYangrenState: 'yangren_month_command_established',
        state: 'applicable_bounded_ren_root_operand',
        boundedOperandKind: 'applicable_changsheng_lu_ren_root',
        authority: 'research_only',
      });
    },
  );

  test.each([
    [STEMS.갑, '인'],
    [STEMS.병, '사'],
    [STEMS.무, '진'],
    [STEMS.경, '신'],
    [STEMS.임, '해'],
  ] as const)('does not admit nonmatching Yang-stem month pairs', (stem, monthBranch) => {
    const yangren = evaluateYangrenMonthCommand(stem, monthBranch);
    expect(yangren.state).toBe('no_governed_yangren_month_match');

    const bound = bindYangrenMonthCommandToBoundedRenOperand(yangren);
    expect(bound.state).toBe('not_applicable_bounded_ren_root_operand');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test.each([STEMS.을, STEMS.정, STEMS.기, STEMS.신, STEMS.계] as const)(
    'preserves the selected-source Yin-stem exclusion instead of admitting a Ren operand',
    (stem) => {
      const yangren = evaluateYangrenMonthCommand(stem, '묘');
      expect(yangren.state).toBe('excluded_by_selected_source_scope');

      const bound = bindYangrenMonthCommandToBoundedRenOperand(yangren);
      expect(bound.state).toBe('outside_selected_source_yangren_scope');
      expect(bound.boundedOperandKind).toBeNull();
    },
  );

  test('chains upstream authority without rediscovering Yangren or executing the comparison', () => {
    const authority = GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_AUTHORITY;
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceThreePeersLessThanChangshengLuRenObserved).toBe(true);
    expect(authority.directSourceMonthCommandYangrenAsRenTermObserved).toBe(true);
    expect(authority.directSourceNonMonthSameBranchNotRenObserved).toBe(true);
    expect(authority.upstreamBoundedRenOperandAvailableObservationOnly).toBe(true);
    expect(authority.upstreamMonthCommandYangrenMatcherAvailableResearchOnly).toBe(true);
    expect(authority.upstreamOperandBindingObserved).toBe(true);
    expect(authority.monthCommandYangrenToBoundedRenOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.upstreamYangrenEvaluationConsumed).toBe(true);
    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.localYangrenRediscoveryAuthorized).toBe(false);
    expect(authority.peerStemCountConsumed).toBe(false);
    expect(authority.chartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps heavy-root, arbitrary-pillar, weighting, Gyeokguk, and production escalation closed', () => {
    const authority = GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_AUTHORITY;
    expect(GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY.arbitraryPillarYangrenMatcherAuthorized).toBe(
      false,
    );
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartLevelComparisonEvaluatorAuthorized).toBe(
      false,
    );
    expect(authority.arbitraryPillarRenOperandAdmissionAuthorized).toBe(false);
    expect(authority.yangrenToHeavyRootEquivalenceAuthorized).toBe(false);
    expect(authority.renAsWangEquivalenceAuthorized).toBe(false);
    expect(authority.diwangToYangrenEquivalenceAuthorized).toBe(false);
    expect(authority.twelveGrowthStageMappingConsumed).toBe(false);
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
