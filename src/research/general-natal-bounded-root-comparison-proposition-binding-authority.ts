import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION,
} from './general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  type BijianBoundedLeftOperandEvaluation,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
  type MukuYuqiBoundedOperandEvaluation,
} from './general-natal-muku-yuqi-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
  type ChangshengBoundedOperandEvaluation,
} from './general-natal-changsheng-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION,
  type YangrenBoundedRenOperandEvaluation,
} from './general-natal-yangren-bounded-ren-root-operand-authority.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION,
  type FourYangLuBoundedOperandEvaluation,
} from './general-natal-four-yang-lu-bounded-root-operand-authority.js';

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_SCOPE =
  'governed_bounded_operands_to_selected_source_root_comparison_proposition_binding' as const;
export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
} as const);

export type BoundedRootComparisonProposition =
  (typeof GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS)[number];
export type BoundedRootComparisonPropositionId = BoundedRootComparisonProposition['id'];
export type BoundedRootComparisonRightOperandKind = BoundedRootComparisonProposition['right']['kind'];
export type BoundedRootComparisonRightConstituent = 'muku' | 'yuqi' | 'changsheng' | 'lu' | 'ren';

export type GovernedBoundedRightOperandEvaluation =
  | MukuYuqiBoundedOperandEvaluation
  | ChangshengBoundedOperandEvaluation
  | YangrenBoundedRenOperandEvaluation
  | FourYangLuBoundedOperandEvaluation;

interface RightOperandDescriptor {
  readonly propositionId: BoundedRootComparisonPropositionId;
  readonly operandKind: BoundedRootComparisonRightOperandKind;
  readonly constituent: BoundedRootComparisonRightConstituent;
}

function resolvePositiveRightOperand(
  right: GovernedBoundedRightOperandEvaluation,
): RightOperandDescriptor | null {
  switch (right.state) {
    case 'applicable_bounded_muku_root_operand':
      return right.boundedOperandKind === 'applicable_muku_root'
        ? Object.freeze({
            propositionId: 'one_peer_less_than_one_applicable_muku',
            operandKind: 'applicable_muku_root',
            constituent: 'muku',
          })
        : null;
    case 'applicable_bounded_yuqi_root_operand':
      return right.boundedOperandKind === 'applicable_yuqi_root'
        ? Object.freeze({
            propositionId: 'two_peers_less_than_one_applicable_yuqi',
            operandKind: 'applicable_yuqi_root',
            constituent: 'yuqi',
          })
        : null;
    case 'applicable_bounded_changsheng_root_operand':
      return right.boundedOperandKind === 'applicable_changsheng_lu_ren_root'
        ? Object.freeze({
            propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
            operandKind: 'applicable_changsheng_lu_ren_root',
            constituent: 'changsheng',
          })
        : null;
    case 'applicable_bounded_lu_root_operand':
      return right.boundedOperandKind === 'applicable_changsheng_lu_ren_root'
        ? Object.freeze({
            propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
            operandKind: 'applicable_changsheng_lu_ren_root',
            constituent: 'lu',
          })
        : null;
    case 'applicable_bounded_ren_root_operand':
      return right.boundedOperandKind === 'applicable_changsheng_lu_ren_root'
        ? Object.freeze({
            propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
            operandKind: 'applicable_changsheng_lu_ren_root',
            constituent: 'ren',
          })
        : null;
    default:
      return null;
  }
}

export type BoundedRootComparisonPropositionBindingState =
  | 'bounded_source_proposition_bound'
  | 'left_operand_not_established'
  | 'right_operand_not_established'
  | 'bounded_operand_proposition_mismatch';

export interface BoundedRootComparisonPropositionBindingEvaluation {
  readonly state: BoundedRootComparisonPropositionBindingState;
  readonly propositionId: BoundedRootComparisonPropositionId | null;
  readonly sourceText: BoundedRootComparisonProposition['sourceText'] | null;
  readonly sourceRelation: BoundedRootComparisonProposition['relation'] | null;
  readonly leftPeerStemCount: 1 | 2 | 3 | null;
  readonly rightOperandKind: BoundedRootComparisonRightOperandKind | null;
  readonly rightConstituent: BoundedRootComparisonRightConstituent | null;
  readonly sourcePropositionBound: boolean;
  readonly chartLevelComparisonResultEstablished: false;
  readonly inverseComparisonEstablished: false;
  readonly transitiveRankingEstablished: false;
  readonly numericWeightAssigned: false;
  readonly nonNumericGeneralizedWeightAssigned: false;
  readonly qiangRuoEstablished: false;
  readonly wangShuaiEstablished: false;
  readonly authority: 'research_only';
}

function nonPositiveResult(
  state: Exclude<
    BoundedRootComparisonPropositionBindingState,
    'bounded_source_proposition_bound'
  >,
  leftPeerStemCount: 1 | 2 | 3 | null,
  right: RightOperandDescriptor | null,
): BoundedRootComparisonPropositionBindingEvaluation {
  return Object.freeze({
    state,
    propositionId: null,
    sourceText: null,
    sourceRelation: null,
    leftPeerStemCount,
    rightOperandKind: right?.operandKind ?? null,
    rightConstituent: right?.constituent ?? null,
    sourcePropositionBound: false,
    chartLevelComparisonResultEstablished: false,
    inverseComparisonEstablished: false,
    transitiveRankingEstablished: false,
    numericWeightAssigned: false,
    nonNumericGeneralizedWeightAssigned: false,
    qiangRuoEstablished: false,
    wangShuaiEstablished: false,
    authority: 'research_only',
  });
}

export function bindGovernedOperandsToBoundedRootComparisonProposition(
  left: BijianBoundedLeftOperandEvaluation,
  right: GovernedBoundedRightOperandEvaluation,
): BoundedRootComparisonPropositionBindingEvaluation {
  if (
    left.state !== 'bounded_peer_stem_count_established' ||
    left.boundedOperand === null ||
    left.propositionId === null ||
    left.peerStemCount === null ||
    left.peerStemCount === 0
  ) {
    return nonPositiveResult('left_operand_not_established', null, null);
  }

  const rightDescriptor = resolvePositiveRightOperand(right);
  if (rightDescriptor === null) {
    return nonPositiveResult('right_operand_not_established', left.peerStemCount, null);
  }

  if (left.propositionId !== rightDescriptor.propositionId) {
    return nonPositiveResult(
      'bounded_operand_proposition_mismatch',
      left.peerStemCount,
      rightDescriptor,
    );
  }

  const proposition = GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.find(
    (candidate) => candidate.id === left.propositionId,
  );

  if (
    proposition === undefined ||
    proposition.left.kind !== left.boundedOperand.kind ||
    proposition.left.count !== left.boundedOperand.count ||
    proposition.right.kind !== rightDescriptor.operandKind
  ) {
    return nonPositiveResult(
      'bounded_operand_proposition_mismatch',
      left.peerStemCount,
      rightDescriptor,
    );
  }

  return Object.freeze({
    state: 'bounded_source_proposition_bound',
    propositionId: proposition.id,
    sourceText: proposition.sourceText,
    sourceRelation: proposition.relation,
    leftPeerStemCount: left.peerStemCount,
    rightOperandKind: rightDescriptor.operandKind,
    rightConstituent: rightDescriptor.constituent,
    sourcePropositionBound: true,
    chartLevelComparisonResultEstablished: false,
    inverseComparisonEstablished: false,
    transitiveRankingEstablished: false,
    numericWeightAssigned: false,
    nonNumericGeneralizedWeightAssigned: false,
    qiangRuoEstablished: false,
    wangShuaiEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'bounded_proposition_binding_to_chart_level_comparison_result',
    'bounded_proposition_binding_to_inverse_comparison',
    'bounded_proposition_binding_to_transitive_closure',
    'bounded_proposition_binding_to_global_root_ranking',
    'bounded_proposition_binding_to_numeric_root_weight',
    'bounded_proposition_binding_to_linear_weight_scale',
    'bounded_proposition_binding_to_generalized_non_numeric_weighting',
    'bounded_proposition_binding_to_context_free_yuqi_ranking',
    'bounded_proposition_binding_to_month_position_multiplier',
    'bounded_proposition_binding_to_dang_zhong_or_zhu_gua',
    'bounded_proposition_binding_to_qiang_or_bu_ruo',
    'bounded_proposition_binding_to_final_qiang_ruo',
    'bounded_proposition_binding_to_final_wang_shuai',
    'bounded_proposition_binding_to_geju_candidate',
    'bounded_proposition_binding_to_geju_establishment',
    'bounded_proposition_binding_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  boundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION,
  boundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  bijianLeftOperandVersion: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  bijianLeftOperandDefinitionHash: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  mukuYuqiRightOperandVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
  mukuYuqiRightOperandDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
  changshengRightOperandVersion: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
  changshengRightOperandDefinitionHash: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
  renRightOperandVersion: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION,
  renRightOperandDefinitionHash: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
  luRightOperandVersion: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION,
  luRightOperandDefinitionHash: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
});

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_VERSION,
        scope: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_SCOPE,
        decision: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DECISION,
        source: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_SOURCE,
        propositions: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
        upstream,
        rawChartFactsConsumed: false,
        localOperandRediscoveryAuthorized: false,
        generalizedChartLevelRootComparisonEvaluatorAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_VERSION,
  definitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DEFINITION_HASH,
  decision: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_DECISION,
  upstream,
  directSourceThreeBoundedComparisonsObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  boundedOperandToSourcePropositionBindingAuthorizedResearchOnly: true,
  acceptedRightOperandConstituents: Object.freeze([
    'muku',
    'yuqi',
    'changsheng',
    'lu',
    'ren',
  ] as const),
  rawChartFactsConsumed: false,
  localOperandRediscoveryAuthorized: false,
  inverseComparisonAuthorized: false,
  transitiveClosureAuthorized: false,
  generalizedGlobalRootRankingAuthorized: false,
  numericRootWeightAuthorized: false,
  linearWeightScaleAuthorized: false,
  generalizedNonNumericWeightingAuthorized: false,
  generalizedChartLevelRootComparisonEvaluatorAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  dangZhongResolverAuthorized: false,
  zhuGuaResolverAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITION_BINDING_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only composition of already-governed bounded operands into exactly one immutable #568 selected-source proposition. A positive result records proposition binding only; it does not establish a context-free chart comparison result, inverse or transitive ordering, numeric/non-numeric weight scale, global root ranking, ordinary 旺衰/強弱, 黨眾/助寡, Gyeokguk, or production fact.',
});
