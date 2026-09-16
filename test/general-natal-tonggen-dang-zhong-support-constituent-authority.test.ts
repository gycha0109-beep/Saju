import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  evaluateMukuYuqiLightRoot,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  bindGovernedMukuYuqiRootToBoundedTonggen,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';
import * as authorityModule from '../src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import {
  bindGovernedBoundedTonggenToDangZhongSupportConstituent,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
} from '../src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.js';

const STEMS = Object.freeze({
  갑: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
  을: { value: '을', hanja: '乙', element: '목', yinYang: '음' },
  무: { value: '무', hanja: '戊', element: '토', yinYang: '양' },
} as const satisfies Readonly<Record<string, StemFact>>);

describe('General Natal bounded 通根 -> 黨眾 support-constituent authority', () => {
  test.each([
    [STEMS.갑, '미', '墓庫'],
    [STEMS.을, '진', '餘氣'],
  ] as const)(
    'admits a governed positive %s/%s Tonggen only as support-constituent evidence',
    (stem, branch, sourceRootKind) => {
      const root = evaluateMukuYuqiLightRoot(stem, branch);
      const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);
      const result = bindGovernedBoundedTonggenToDangZhongSupportConstituent(tonggen);

      expect(tonggen.state).toBe('bounded_tonggen_observed');
      expect(result).toEqual({
        state: 'tonggen_support_constituent_observed',
        upstreamState: 'bounded_tonggen_observed',
        sourceRootKind,
        sourceConstituent: '通根',
        sourceSupportPhrase: '通根扶助',
        supportConstituentObserved: true,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      });
    },
  );

  test('treats no bounded Tonggen evidence as absence of this constituent evidence only', () => {
    const root = evaluateMukuYuqiLightRoot(STEMS.갑, '자');
    const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);
    const result = bindGovernedBoundedTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('no_bounded_tonggen_evidence');
    expect(result).toEqual({
      state: 'no_bounded_tonggen_support_constituent_evidence',
      upstreamState: 'no_bounded_tonggen_evidence',
      sourceRootKind: null,
      sourceConstituent: null,
      sourceSupportPhrase: null,
      supportConstituentObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  test('preserves unresolved Earth Tonggen instead of inventing support evidence', () => {
    const root = evaluateMukuYuqiLightRoot(STEMS.무, '진');
    const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);
    const result = bindGovernedBoundedTonggenToDangZhongSupportConstituent(tonggen);

    expect(tonggen.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.state).toBe('unresolved_outside_governed_tonggen_scope');
    expect(result.supportConstituentObserved).toBe(false);
    expect(result.sourceConstituent).toBeNull();
    expect(result.sourceSupportPhrase).toBeNull();
    expect(result.dangZhongEstablished).toBe(false);
    expect(result.zhuGuaEstablished).toBe(false);
    expect(result.qiangRuoEstablished).toBe(false);
  });

  test('pins the exact upstream authorities and direct source language', () => {
    const authority = GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(authority.sourceComponentText).toBe('比劫印綬通根扶助為黨眾');
    expect(authority.sourceOutOfSeasonText).toBe(
      '若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也',
    );
    expect(authority.upstreamBoundedTonggenVersion).toBe('0.1.0-research');
    expect(authority.upstreamBoundedTonggenDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.upstreamContextObservationVersion).toBe('0.1.0-research');
    expect(authority.upstreamContextObservationDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.directSourceTonggenDangZhongAssociationObserved).toBe(true);
    expect(authority.directSourceOutOfSeasonTonggenBiYinPartyContextObserved).toBe(true);
    expect(authority.upstreamBoundedTonggenAvailableResearchOnly).toBe(true);
    expect(authority.boundedTonggenToDangZhongSupportConstituentAuthorizedResearchOnly).toBe(true);
  });

  test('keeps every aggregation, resolver, strength, Gyeokguk, and Production escalation closed', () => {
    const authority = GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.rawRootRediscoveryAuthorized).toBe(false);
    expect(authority.hiddenStemConsumptionAuthorized).toBe(false);
    expect(authority.twelveGrowthConsumptionAuthorized).toBe(false);
    expect(authority.earthTonggenCompletionAuthorized).toBe(false);
    expect(authority.genericRootToSupportConstituentAuthorized).toBe(false);
    expect(authority.changshengLuWangToSupportConstituentAuthorized).toBe(false);
    expect(authority.tonggenCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.tonggenBijianYinshouAggregationAuthorized).toBe(false);
    expect(authority.tonggenToQiangAuthorized).toBe(false);
    expect(authority.tonggenToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  test('exports only one evaluator function, preventing hidden root scanners or counters', () => {
    const functionExports = Object.entries(authorityModule).filter(
      ([, value]) => typeof value === 'function',
    );

    expect(functionExports).toHaveLength(1);
    expect(functionExports[0]?.[0]).toBe(
      'bindGovernedBoundedTonggenToDangZhongSupportConstituent',
    );
  });
});
