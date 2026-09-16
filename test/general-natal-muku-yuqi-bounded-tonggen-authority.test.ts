import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  evaluateMukuYuqiLightRoot,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS,
  bindGovernedMukuYuqiRootToBoundedTonggen,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';

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

describe('General Natal Muku/Yuqi bounded Tonggen authority', () => {
  test('pins the direct-source and upstream authority boundary', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY;

    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.upstreamMukuYuqiEvaluationAvailableResearchOnly).toBe(true);
    expect(authority.rawStemBranchRediscoveryRequired).toBe(false);
    expect(authority.hiddenStemConsumptionRequired).toBe(false);
    expect(authority.twelveGrowthConsumptionRequired).toBe(false);
    expect(authority.directSourceOwnMukuYuqiTonggenBoundaryObserved).toBe(true);
    expect(authority.directSourceMukuPositiveTonggenExamplesObserved).toBe(true);
    expect(GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS).toHaveLength(4);
    expect(GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test.each([
    [STEMS.갑, '미', '墓庫'],
    [STEMS.을, '진', '餘氣'],
    [STEMS.병, '술', '墓庫'],
    [STEMS.정, '미', '餘氣'],
    [STEMS.경, '축', '墓庫'],
    [STEMS.신, '술', '餘氣'],
    [STEMS.임, '진', '墓庫'],
    [STEMS.계, '축', '餘氣'],
  ] as const)(
    'admits only a governed positive Muku/Yuqi evaluation as bounded Tonggen (%s / %s)',
    (stem, branch, sourceRootKind) => {
      const upstream = evaluateMukuYuqiLightRoot(stem, branch);
      const result = bindGovernedMukuYuqiRootToBoundedTonggen(upstream);

      expect(result.state).toBe('bounded_tonggen_observed');
      expect(result.tonggenObserved).toBe(true);
      expect(result.sourceRootKind).toBe(sourceRootKind);
      expect(result.element).toBe(stem.element);
      expect(result.branch).toBe(branch);
      expect(result.dangZhongEstablished).toBe(false);
      expect(result.zhuGuaEstablished).toBe(false);
      expect(result.qiangRuoEstablished).toBe(false);
      expect(result.authority).toBe('research_only');
    },
  );

  test('a governed nonmatch is absence of this bounded evidence only', () => {
    const upstream = evaluateMukuYuqiLightRoot(STEMS.갑, '자');
    const result = bindGovernedMukuYuqiRootToBoundedTonggen(upstream);

    expect(upstream.lightRootState).toBe('no_governed_light_root_match');
    expect(result.state).toBe('no_bounded_tonggen_evidence');
    expect(result.tonggenObserved).toBe(false);
    expect(result.sourceRootKind).toBeNull();
    expect(result.dangZhongEstablished).toBe(false);
    expect(result.zhuGuaEstablished).toBe(false);
    expect(result.qiangRuoEstablished).toBe(false);
  });

  test.each([
    [STEMS.무, '진'],
    [STEMS.기, '미'],
  ] as const)('preserves the Earth boundary instead of inventing Tonggen (%s / %s)', (stem, branch) => {
    const upstream = evaluateMukuYuqiLightRoot(stem, branch);
    const result = bindGovernedMukuYuqiRootToBoundedTonggen(upstream);

    expect(upstream.lightRootState).toBe('earth_boundary_unresolved');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.tonggenObserved).toBe(false);
    expect(result.sourceRootKind).toBeNull();
  });

  test('keeps generalized root, stage, hidden-stem, Dang-Zhong, strength, and Production escalation closed', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY;

    expect(authority.earthTonggenResolved).toBe(false);
    expect(authority.generalizedRootToTonggenEquivalenceAuthorized).toBe(false);
    expect(authority.genericLightRootToTonggenShortcutAuthorized).toBe(false);
    expect(authority.heavyRootToTonggenEquivalenceAuthorized).toBe(false);
    expect(authority.changshengToTonggenAuthorized).toBe(false);
    expect(authority.luToTonggenAuthorized).toBe(false);
    expect(authority.wangToTonggenAuthorized).toBe(false);
    expect(authority.twelveGrowthStageToTonggenAuthorized).toBe(false);
    expect(authority.hiddenStemMembershipToTonggenAuthorized).toBe(false);
    expect(authority.hiddenStemArrayOrderToTonggenAuthorized).toBe(false);
    expect(authority.sameElementBranchToTonggenAuthorized).toBe(false);
    expect(authority.tonggenToDangZhongSupportConstituentAuthorized).toBe(false);
    expect(authority.tonggenCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.tonggenToQiangAuthorized).toBe(false);
    expect(authority.tonggenToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  test('exposes a one-upstream-evaluation adapter rather than a raw chart matcher', () => {
    expect(bindGovernedMukuYuqiRootToBoundedTonggen).toHaveLength(1);
    expect(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.unauthorizedDerivations,
    ).toContain('same_element_branch_to_tonggen');
    expect(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.unauthorizedDerivations,
    ).toContain('tonggen_bi_yin_to_final_qiang_ruo');
  });
});
