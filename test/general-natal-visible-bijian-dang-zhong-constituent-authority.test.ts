import { describe, expect, test } from 'vitest';
import * as constituentModule from '../src/research/general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  type BijianBoundedLeftOperandEvaluation,
  type BoundedBijianPeerCount,
} from '../src/research/general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS,
  bindGovernedVisibleBijianToDangZhongSupportConstituent,
} from '../src/research/general-natal-visible-bijian-dang-zhong-constituent-authority.js';

function positiveEvaluation(count: BoundedBijianPeerCount): BijianBoundedLeftOperandEvaluation {
  const propositionId =
    count === 1
      ? GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.one.propositionId
      : count === 2
        ? GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.two.propositionId
        : GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.three.propositionId;

  return {
    state: 'bounded_peer_stem_count_established',
    peerStemCount: count,
    boundedOperand: { kind: 'peer_stem_count', count },
    propositionId,
    authority: 'research_only',
  };
}

describe('General Natal governed visible Bijian -> Dang-Zhong support constituent authority', () => {
  test('pins exact upstream visible-Bijian and context-observation authority identities', () => {
    const authority = GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY;
    expect(authority.upstreamVisibleBijianVersion).toBe(
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
    );
    expect(authority.upstreamVisibleBijianDefinitionHash).toBe(
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
    );
    expect(authority.upstreamContextObservationVersion).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    );
    expect(authority.upstreamContextObservationDefinitionHash).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    );
    expect(authority.upstreamExactBijianOnly).toBe(true);
    expect(GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.jiecaiCountedAsBijian).toBe(false);
    expect(GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test.each([1, 2, 3] as const)(
    'admits governed visible Bijian count %s only as support-constituent evidence',
    (count) => {
      const result = bindGovernedVisibleBijianToDangZhongSupportConstituent(
        positiveEvaluation(count),
      );
      expect(result.state).toBe('visible_bijian_support_constituent_observed');
      expect(result.canonicalConstituent).toBe('비견');
      expect(result.sourceSupportCategory).toBe('比劫');
      expect(result.visibleBijianCount).toBe(count);
      expect(result.supportConstituentObserved).toBe(true);
      expect(result.dangZhongEstablished).toBe(false);
      expect(result.zhuGuaEstablished).toBe(false);
      expect(result.qiangRuoEstablished).toBe(false);
    },
  );

  test('zero bounded visible Bijian is not a negative Dang-Zhong or Zhu-Gua verdict', () => {
    const upstream: BijianBoundedLeftOperandEvaluation = {
      state: 'no_bounded_peer_stem_operand',
      peerStemCount: 0,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    };
    const result = bindGovernedVisibleBijianToDangZhongSupportConstituent(upstream);
    expect(result.state).toBe('no_visible_bijian_support_constituent');
    expect(result.supportConstituentObserved).toBe(false);
    expect(result.visibleBijianCount).toBe(0);
    expect(result.dangZhongEstablished).toBe(false);
    expect(result.zhuGuaEstablished).toBe(false);
    expect(result.qiangRuoEstablished).toBe(false);
  });

  test.each([
    'ten_god_chart_unresolved',
    'visible_stem_facts_not_fully_resolved',
    'day_stem_semantic_mismatch',
  ] as const)('propagates upstream fail-closed state %s without constituent evidence', (state) => {
    const upstream: BijianBoundedLeftOperandEvaluation = {
      state,
      peerStemCount: null,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    };
    const result = bindGovernedVisibleBijianToDangZhongSupportConstituent(upstream);
    expect(result.state).toBe('upstream_bijian_evaluation_unresolved');
    expect(result.supportConstituentObserved).toBe(false);
    expect(result.canonicalConstituent).toBeNull();
    expect(result.sourceSupportCategory).toBeNull();
    expect(result.visibleBijianCount).toBeNull();
    expect(result.dangZhongEstablished).toBe(false);
  });

  test('preserves only the two direct selected-source support observations', () => {
    expect(GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS).toHaveLength(2);
    expect(GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS[0]?.sourceText).toBe(
      '比劫印綬通根扶助為黨眾',
    );
    expect(GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS[1]?.sourceText).toBe(
      '蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重',
    );
  });

  test('exports no raw Ten-God resolver and keeps every wider semantic bridge closed', () => {
    const authority = GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY;
    expect('bindTenGodsToDangZhong' in constituentModule).toBe(false);
    expect('resolveDangZhong' in constituentModule).toBe(false);
    expect('countDangZhong' in constituentModule).toBe(false);
    expect(authority.chartFactsConsumed).toBe(false);
    expect(authority.rawTenGodRecomputationAuthorized).toBe(false);
    expect(authority.jiecaiComponentBindingAuthorizedByThisReview).toBe(false);
    expect(authority.yinshouComponentBindingAuthorizedByThisReview).toBe(false);
    expect(authority.tonggenComponentBindingAuthorizedByThisReview).toBe(false);
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
});
