import { describe, expect, test } from 'vitest';
import * as bindingModule from '../src/research/general-natal-bounded-root-comparison-proposition-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DECISION,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
  bindGovernedOperandsToBoundedRootComparisonProposition,
} from '../src/research/general-natal-bounded-root-comparison-proposition-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  type BijianBoundedLeftOperandEvaluation,
} from '../src/research/general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
  type MukuYuqiBoundedOperandEvaluation,
} from '../src/research/general-natal-muku-yuqi-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
  type ChangshengBoundedOperandEvaluation,
} from '../src/research/general-natal-changsheng-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION,
  type YangrenBoundedRenOperandEvaluation,
} from '../src/research/general-natal-yangren-bounded-ren-root-operand-authority.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION,
  type FourYangLuBoundedOperandEvaluation,
} from '../src/research/general-natal-four-yang-lu-bounded-root-operand-authority.js';

function left(count: 1 | 2 | 3): BijianBoundedLeftOperandEvaluation {
  const propositionId =
    count === 1
      ? 'one_peer_less_than_one_applicable_muku'
      : count === 2
        ? 'two_peers_less_than_one_applicable_yuqi'
        : 'three_peers_less_than_one_applicable_changsheng_lu_ren_root';

  return Object.freeze({
    state: 'bounded_peer_stem_count_established',
    peerStemCount: count,
    boundedOperand: Object.freeze({ kind: 'peer_stem_count', count }),
    propositionId,
    authority: 'research_only',
  });
}

const noLeft: BijianBoundedLeftOperandEvaluation = Object.freeze({
  state: 'no_bounded_peer_stem_operand',
  peerStemCount: 0,
  boundedOperand: null,
  propositionId: null,
  authority: 'research_only',
});

const muku: MukuYuqiBoundedOperandEvaluation = Object.freeze({
  element: '목',
  branch: '미',
  upstreamLightRootState: 'muku_light_root_established',
  state: 'applicable_bounded_muku_root_operand',
  boundedOperandKind: 'applicable_muku_root',
  authority: 'research_only',
});

const yuqi: MukuYuqiBoundedOperandEvaluation = Object.freeze({
  element: '목',
  branch: '진',
  upstreamLightRootState: 'yuqi_light_root_established',
  state: 'applicable_bounded_yuqi_root_operand',
  boundedOperandKind: 'applicable_yuqi_root',
  authority: 'research_only',
});

const noLightRoot: MukuYuqiBoundedOperandEvaluation = Object.freeze({
  element: '목',
  branch: '인',
  upstreamLightRootState: 'no_governed_light_root_match',
  state: 'not_applicable_bounded_light_root_operand',
  boundedOperandKind: null,
  authority: 'research_only',
});

const changsheng: ChangshengBoundedOperandEvaluation = Object.freeze({
  stem: '갑',
  yinYang: '양',
  branch: '해',
  stage: '長生',
  upstreamChangshengState: 'established',
  state: 'applicable_bounded_changsheng_root_operand',
  boundedOperandKind: 'applicable_changsheng_lu_ren_root',
  authority: 'research_only',
});

const yinChangshengExcluded: ChangshengBoundedOperandEvaluation = Object.freeze({
  stem: '을',
  yinYang: '음',
  branch: '오',
  stage: '長生',
  upstreamChangshengState: 'excluded_by_yin_exception',
  state: 'excluded_by_yin_changsheng_exception',
  boundedOperandKind: null,
  authority: 'research_only',
});

const lu: FourYangLuBoundedOperandEvaluation = Object.freeze({
  stem: '갑',
  branch: '인',
  upstreamLuHeavyRootState: 'lu_heavy_root_established',
  state: 'applicable_bounded_lu_root_operand',
  boundedOperandKind: 'applicable_changsheng_lu_ren_root',
  authority: 'research_only',
});

const ren: YangrenBoundedRenOperandEvaluation = Object.freeze({
  dayMaster: '갑',
  monthBranch: '묘',
  upstreamYangrenState: 'yangren_month_command_established',
  state: 'applicable_bounded_ren_root_operand',
  boundedOperandKind: 'applicable_changsheng_lu_ren_root',
  authority: 'research_only',
});

describe('bounded root-comparison source proposition binding', () => {
  test('authorizes only the research-only operand-to-proposition composition primitive', () => {
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(Object.values(bindingModule).filter((value) => typeof value === 'function')).toEqual([
      bindGovernedOperandsToBoundedRootComparisonProposition,
    ]);
  });

  test('binds one peer plus governed Muku to the exact first source proposition', () => {
    expect(bindGovernedOperandsToBoundedRootComparisonProposition(left(1), muku)).toMatchObject({
      state: 'bounded_source_proposition_bound',
      propositionId: 'one_peer_less_than_one_applicable_muku',
      sourceText: '得一比肩，不如得支中一墓庫',
      sourceRelation: 'source_stated_less_than',
      leftPeerStemCount: 1,
      rightOperandKind: 'applicable_muku_root',
      rightConstituent: 'muku',
      sourcePropositionBound: true,
      chartLevelComparisonResultEstablished: false,
    });
  });

  test('binds two peers plus governed Yuqi to the exact second source proposition', () => {
    expect(bindGovernedOperandsToBoundedRootComparisonProposition(left(2), yuqi)).toMatchObject({
      state: 'bounded_source_proposition_bound',
      propositionId: 'two_peers_less_than_one_applicable_yuqi',
      sourceText: '得二比肩，不如得一餘氣',
      leftPeerStemCount: 2,
      rightOperandKind: 'applicable_yuqi_root',
      rightConstituent: 'yuqi',
      sourcePropositionBound: true,
    });
  });

  test('binds all three governed third-right routes only to the exact third proposition', () => {
    for (const [right, constituent] of [
      [changsheng, 'changsheng'],
      [lu, 'lu'],
      [ren, 'ren'],
    ] as const) {
      expect(bindGovernedOperandsToBoundedRootComparisonProposition(left(3), right)).toMatchObject({
        state: 'bounded_source_proposition_bound',
        propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
        sourceText: '得三比肩，不如得一長生祿刃',
        leftPeerStemCount: 3,
        rightOperandKind: 'applicable_changsheng_lu_ren_root',
        rightConstituent: constituent,
        sourcePropositionBound: true,
      });
    }
  });

  test('keeps positive but non-corresponding operands as mismatch without inverse inference', () => {
    for (const [leftOperand, rightOperand] of [
      [left(1), yuqi],
      [left(2), muku],
      [left(1), changsheng],
      [left(2), lu],
      [left(1), ren],
    ] as const) {
      const result = bindGovernedOperandsToBoundedRootComparisonProposition(
        leftOperand,
        rightOperand,
      );
      expect(result.state).toBe('bounded_operand_proposition_mismatch');
      expect(result.sourcePropositionBound).toBe(false);
      expect(result.propositionId).toBeNull();
      expect(result.inverseComparisonEstablished).toBe(false);
      expect(result.transitiveRankingEstablished).toBe(false);
    }
  });

  test('fails closed for non-positive left and right operand states', () => {
    expect(bindGovernedOperandsToBoundedRootComparisonProposition(noLeft, muku)).toMatchObject({
      state: 'left_operand_not_established',
      sourcePropositionBound: false,
    });
    expect(bindGovernedOperandsToBoundedRootComparisonProposition(left(1), noLightRoot)).toMatchObject({
      state: 'right_operand_not_established',
      sourcePropositionBound: false,
    });
    expect(
      bindGovernedOperandsToBoundedRootComparisonProposition(left(3), yinChangshengExcluded),
    ).toMatchObject({
      state: 'right_operand_not_established',
      sourcePropositionBound: false,
    });
  });

  test('pins every governed upstream operand authority version and definition hash', () => {
    const upstream = GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_AUTHORITY.upstream;
    expect(upstream.boundedComparisonVersion).toBe(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION);
    expect(upstream.boundedComparisonDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
    );
    expect(upstream.bijianLeftOperandVersion).toBe(
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
    );
    expect(upstream.bijianLeftOperandDefinitionHash).toBe(
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
    );
    expect(upstream.mukuYuqiRightOperandVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
    );
    expect(upstream.mukuYuqiRightOperandDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
    );
    expect(upstream.changshengRightOperandVersion).toBe(
      GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
    );
    expect(upstream.changshengRightOperandDefinitionHash).toBe(
      GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
    );
    expect(upstream.renRightOperandVersion).toBe(GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION);
    expect(upstream.renRightOperandDefinitionHash).toBe(
      GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
    );
    expect(upstream.luRightOperandVersion).toBe(GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION);
    expect(upstream.luRightOperandDefinitionHash).toBe(
      GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
    );
  });

  test('keeps generalized comparison, ranking, strength, Gyeokguk, and Production fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_AUTHORITY;
    expect(authority.boundedOperandToSourcePropositionBindingAuthorizedResearchOnly).toBe(true);
    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.localOperandRediscoveryAuthorized).toBe(false);
    expect(authority.inverseComparisonAuthorized).toBe(false);
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.linearWeightScaleAuthorized).toBe(false);
    expect(authority.generalizedNonNumericWeightingAuthorized).toBe(false);
    expect(authority.generalizedChartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.dangZhongResolverAuthorized).toBe(false);
    expect(authority.zhuGuaResolverAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);

    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
    ).toContain('bounded_proposition_binding_to_transitive_closure');
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
    ).toContain('bounded_proposition_binding_to_numeric_root_weight');
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
    ).toContain('bounded_proposition_binding_to_production_fact');
  });
});
