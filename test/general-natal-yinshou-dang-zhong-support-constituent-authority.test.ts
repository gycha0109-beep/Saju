import { describe, expect, it } from 'vitest';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import type { TenGod } from '../src/contracts/calculation.js';
import {
  admitResolvedCanonicalYinToYinshouCategory,
} from '../src/research/general-natal-canonical-yin-yinshou-category-member-authority.js';
import * as authorityModule from '../src/research/general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  bindGovernedYinshouMemberToDangZhongSupportConstituent,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
} from '../src/research/general-natal-yinshou-dang-zhong-support-constituent-authority.js';

describe('General Natal 印綬 -> 黨眾 support-constituent authority', () => {
  it('admits governed resolved 정인 membership only as 印綬 support-constituent evidence', () => {
    const upstream = admitResolvedCanonicalYinToYinshouCategory(resolved('정인'));

    expect(bindGovernedYinshouMemberToDangZhongSupportConstituent(upstream)).toEqual({
      state: 'yinshou_support_constituent_observed',
      upstreamState: 'yinshou_source_category_member_observed',
      canonicalConstituent: '정인',
      sourceMemberLabel: '正印',
      sourceSupportCategory: '印綬',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  it('admits governed resolved 편인 membership only as 印綬 support-constituent evidence', () => {
    const upstream = admitResolvedCanonicalYinToYinshouCategory(resolved('편인'));

    expect(bindGovernedYinshouMemberToDangZhongSupportConstituent(upstream)).toEqual({
      state: 'yinshou_support_constituent_observed',
      upstreamState: 'yinshou_source_category_member_observed',
      canonicalConstituent: '편인',
      sourceMemberLabel: '偏印',
      sourceSupportCategory: '印綬',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  it('keeps resolved non-Yin upstream states fail-closed without negative 黨眾/助寡 claims', () => {
    const upstream = admitResolvedCanonicalYinToYinshouCategory(resolved('비견'));

    expect(bindGovernedYinshouMemberToDangZhongSupportConstituent(upstream)).toEqual({
      state: 'no_yinshou_support_constituent_evidence',
      upstreamState: 'resolved_outside_authorized_yin_label_scope',
      canonicalConstituent: null,
      sourceMemberLabel: null,
      sourceSupportCategory: null,
      supportConstituentObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  it('keeps ambiguous upstream membership fail-closed', () => {
    const upstream = admitResolvedCanonicalYinToYinshouCategory(
      ambiguous<TenGod>(
        [
          { candidateId: 'candidate-jeongin', value: '정인', reasonRefs: ['scenario-a'] },
          { candidateId: 'candidate-pyeonin', value: '편인', reasonRefs: ['scenario-b'] },
        ],
        ['canonical-ten-god-ambiguous'],
      ),
    );

    const evaluation = bindGovernedYinshouMemberToDangZhongSupportConstituent(upstream);
    expect(evaluation.state).toBe('no_yinshou_support_constituent_evidence');
    expect(evaluation.upstreamState).toBe('canonical_ten_god_ambiguous');
    expect(evaluation.supportConstituentObserved).toBe(false);
    expect(evaluation.dangZhongEstablished).toBe(false);
    expect(evaluation.zhuGuaEstablished).toBe(false);
    expect(evaluation.qiangRuoEstablished).toBe(false);
  });

  it('keeps unavailable upstream membership fail-closed', () => {
    const upstream = admitResolvedCanonicalYinToYinshouCategory(
      unavailable('ten-god-not-resolved'),
    );

    const evaluation = bindGovernedYinshouMemberToDangZhongSupportConstituent(upstream);
    expect(evaluation.state).toBe('no_yinshou_support_constituent_evidence');
    expect(evaluation.upstreamState).toBe('canonical_ten_god_unavailable');
    expect(evaluation.supportConstituentObserved).toBe(false);
    expect(evaluation.dangZhongEstablished).toBe(false);
    expect(evaluation.zhuGuaEstablished).toBe(false);
    expect(evaluation.qiangRuoEstablished).toBe(false);
  });

  it('pins the exact upstream authorities and direct source component text', () => {
    const authority = GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(authority.sourceComponentText).toBe('比劫印綬通根扶助為黨眾');
    expect(authority.upstreamYinshouMemberVersion).toBe('0.1.0-research');
    expect(authority.upstreamYinshouMemberDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.upstreamContextObservationVersion).toBe('0.1.0-research');
    expect(authority.upstreamContextObservationDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.directSourceYinshouDangZhongAssociationObserved).toBe(true);
    expect(authority.upstreamSingleFactYinshouMemberAvailableResearchOnly).toBe(true);
    expect(authority.upstreamSingleFactInputOnly).toBe(true);
    expect(authority.yinshouMemberToDangZhongSupportConstituentAuthorizedResearchOnly).toBe(true);
  });

  it('does not consume raw facts or authorize scan/count/composition/resolution escalation', () => {
    const authority = GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.rawFactStateConsumed).toBe(false);
    expect(authority.chartFactsConsumed).toBe(false);
    expect(authority.wholeChartYinScanAuthorized).toBe(false);
    expect(authority.yinshouCountAuthorized).toBe(false);
    expect(authority.bijieYinshouAggregationAuthorized).toBe(false);
    expect(authority.tonggenSupportCompositionAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.localConstituentToFinalQiangAuthorized).toBe(false);
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

  it('exports only one evaluator function, preventing hidden chart scanners or counters', () => {
    const functionExports = Object.entries(authorityModule).filter(
      ([, value]) => typeof value === 'function',
    );

    expect(functionExports).toHaveLength(1);
    expect(functionExports[0]?.[0]).toBe(
      'bindGovernedYinshouMemberToDangZhongSupportConstituent',
    );
  });
});
