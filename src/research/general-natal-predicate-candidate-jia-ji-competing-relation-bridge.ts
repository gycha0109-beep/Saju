import {
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import type {
  EarthlyBranch,
  HeavenlyStem,
  PillarFact,
} from '../contracts/calculation.js';
import {
  deriveStructuralRelationCandidates,
} from '../calculation/structural-relations.js';
import {
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview,
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
} from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import {
  R176_AUTHORITY,
  R176_JIA_TEN_GOD_TOPOLOGY_VERSION,
} from './general-natal-predicate-candidate-jia-ten-god-topology.js';

export const R177_JIA_JI_COMPETING_RELATION_BRIDGE_VERSION =
  '0.1.0-research' as const;

const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲',
  을: '乙',
  병: '丙',
  정: '丁',
  무: '戊',
  기: '己',
  경: '庚',
  신: '辛',
  임: '壬',
  계: '癸',
};

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子',
  축: '丑',
  인: '寅',
  묘: '卯',
  진: '辰',
  사: '巳',
  오: '午',
  미: '未',
  신: '申',
  유: '酉',
  술: '戌',
  해: '亥',
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem,
      hanja: STEM_HANJA[stem],
      element: getHeavenlyStemElement(stem),
      yinYang: getHeavenlyStemYinYang(stem),
    },
    branch: {
      value: branch,
      hanja: BRANCH_HANJA[branch],
      element: getEarthlyBranchElement(branch),
      yinYang: getEarthlyBranchYinYang(branch),
    },
  };
}

const syntheticRelationCandidates = deriveStructuralRelationCandidates({
  year: pillar('갑', '자'),
  month: pillar('기', '인'),
});

const jiaJiStemCombinationCandidate = syntheticRelationCandidates.find(
  (item) =>
    item.kind === 'stem_five_combination' &&
    item.participants.length === 2 &&
    item.participants.every((participant) => participant.component === 'stem') &&
    item.participants.some((participant) => participant.value === '갑') &&
    item.participants.some((participant) => participant.value === '기'),
);

if (jiaJiStemCombinationCandidate === undefined) {
  throw new Error('R177 expected structural engine to materialize Jia-Ji stem combination');
}

const i233AuthorityReview =
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();

export const R177_JIA_JI_DUAL_RELATION_SURFACE = Object.freeze({
  pair: Object.freeze(['甲', '己'] as const),
  koreanPair: Object.freeze(['갑', '기'] as const),
  r176ElementControlTopologyObserved:
    R176_AUTHORITY.negativeCaseDirectOfficerControlTopologyObserved,
  r176ElementControlSurface: '甲(木)剋己(土)' as const,
  structuralRelationKind: jiaJiStemCombinationCandidate.kind,
  structuralRelationId: jiaJiStemCombinationCandidate.relationId,
  structuralRelationParticipants: jiaJiStemCombinationCandidate.participants,
  structuralRelationSourceIds: jiaJiStemCombinationCandidate.sourceIds,
  structuralMatchOnly:
    jiaJiStemCombinationCandidate.semantics.structuralMatchOnly,
  combinationTransformationEstablished:
    jiaJiStemCombinationCandidate.semantics.transformationEstablished,
  dualRelationSurfaceObserved: true,
  relationSurfaceCount: 2,
});

export const R177_EXISTING_SETTLEMENT_BOUNDARY = Object.freeze({
  authorityGap: i233AuthorityReview.authorityGap,
  authorityGapConfirmed: i233AuthorityReview.authorityGapConfirmed,
  authorityGapClosed: i233AuthorityReview.authorityGapClosed,
  multipleTouchTopologySubstrateAvailable:
    i233AuthorityReview.multipleTouchTopologySubstrateAvailable,
  crossRelationPrecedenceAuthorized:
    i233AuthorityReview.crossRelationPrecedenceAuthorized,
  multiTouchAggregationAuthorized:
    i233AuthorityReview.multiTouchAggregationAuthorized,
  competingRelationSettlementResolved:
    i233AuthorityReview.competingRelationSettlementResolved,
  relationTouchCountMayCreatePrecedence:
    i233AuthorityReview.relationTouchCountMayCreatePrecedence,
  pairOrderMayBeAssumedSignificant:
    i233AuthorityReview.pairOrderMayBeAssumedSignificant,
  modelSynthesisMayCountAsAuthority:
    i233AuthorityReview.modelSynthesisMayCountAsAuthority,
  requirementIds: I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
  requirementCount:
    I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS.length,
});

export const R177_CASE_SPECIFIC_BOUNDARY = Object.freeze({
  sourceCaseReportsControlDirection: true,
  sourceCaseReportMayDescribeThisCase: true,
  sourceCaseReportMayCreateGenericControlOverCombinationPrecedence: false,
  combinationCandidateMayCancelControlByDefault: false,
  combinationCandidateMayDominateControlByDefault: false,
  controlSurfaceMayDominateCombinationByDefault: false,
  coexistenceSettlementEstablished: false,
  precedenceSettlementEstablished: false,
  combinationTransformationEstablished: false,
  exactContextSettlementEstablished: false,
});

export const R177_REQUIRED_FOLLOW_UP = Object.freeze([
  'EXACT_SOURCE_CONTEXT_FOR_JIA_JI_COMBINATION_VERSUS_CONTROL_COEXISTENCE',
  'CONDITIONS_WHERE_JIA_JI_COMBINATION_ACTUALLY_TRANSFORMS',
  'CONDITIONS_WHERE_CONTROL_REMAINS_EFFECTIVE_DESPITE_COMBINATION_SURFACE',
  'CONDITIONS_WHERE_COMBINATION_CHANGES_OR_BLOCKS_CONTROL_EFFECT',
  'FAIL_CLOSED_DISPOSITION_FOR_UNRESOLVED_MULTI_RELATION_CONFLICT',
] as const);

export const R177_REJECTED_SHORTCUTS = Object.freeze([
  'JIA_JI_COMBINATION_CANDIDATE_EQUALS_TRANSFORMATION',
  'JIA_JI_COMBINATION_EQUALS_CONTROL_CANCELLED',
  'WOOD_CONTROLS_EARTH_EQUALS_COMBINATION_IGNORED',
  'SOURCE_CASE_CONTROL_REPORT_EQUALS_GENERIC_KE_OVER_HE_PRECEDENCE',
  'ONE_CASE_EQUALS_CROSS_RELATION_PRECEDENCE',
  'RELATION_COUNT_EQUALS_PRECEDENCE',
  'PAIR_ORDER_EQUALS_PRECEDENCE',
  'MODEL_SYNTHESIS_EQUALS_SETTLEMENT_AUTHORITY',
  'DUAL_RELATION_SURFACE_EQUALS_EXECUTABLE_RESOLVER',
  'DUAL_RELATION_SURFACE_AS_NUMERIC_WEIGHT',
] as const);

export const R177_GOVERNANCE = Object.freeze({
  upstreamR176TopologyPreserved:
    R176_AUTHORITY.topologyConsistentWithSourceRoleContrast,
  upstreamR176SettlementStillClosed:
    !R176_AUTHORITY.settlementEstablished,
  structuralEngineCombinationCandidateMaterialized: true,
  structuralEngineTransformationStillClosed:
    !jiaJiStemCombinationCandidate.semantics.transformationEstablished,
  existingI233AuthorityGapPreserved:
    i233AuthorityReview.authorityGapConfirmed &&
    !i233AuthorityReview.authorityGapClosed,
  existingI233CrossRelationPrecedenceStillClosed:
    !i233AuthorityReview.crossRelationPrecedenceAuthorized,
  existingI233AggregationStillClosed:
    !i233AuthorityReview.multiTouchAggregationAuthorized,
  caseSpecificBridgeDoesNotMutateGlobalSettlementAuthority: true,
});

export const R177_SUMMARY = Object.freeze({
  competingSurfaceCount: R177_JIA_JI_DUAL_RELATION_SURFACE.relationSurfaceCount,
  structuralCandidateCount: syntheticRelationCandidates.length,
  matchedJiaJiCombinationCandidateCount:
    syntheticRelationCandidates.filter(
      (item) =>
        item.kind === 'stem_five_combination' &&
        item.participants.some((participant) => participant.value === '갑') &&
        item.participants.some((participant) => participant.value === '기'),
    ).length,
  genericPrecedenceAuthorizedCount: 0,
  exactSettlementEstablishedCount: 0,
  requiredFollowUpCount: R177_REQUIRED_FOLLOW_UP.length,
});

export const R177_UPSTREAM_BINDINGS = Object.freeze({
  r176: {
    version: R176_JIA_TEN_GOD_TOPOLOGY_VERSION,
    negativeCaseDirectOfficerControlTopologyObserved:
      R176_AUTHORITY.negativeCaseDirectOfficerControlTopologyObserved,
    settlementEstablished: R176_AUTHORITY.settlementEstablished,
  },
  i233: {
    reviewId: i233AuthorityReview.reviewId,
    authorityGap: i233AuthorityReview.authorityGap,
    authorityGapClosed: i233AuthorityReview.authorityGapClosed,
    requirementCount: i233AuthorityReview.requirementCount,
    crossRelationPrecedenceAuthorized:
      i233AuthorityReview.crossRelationPrecedenceAuthorized,
  },
});

export const R177_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIA_JI_DUAL_RELATION_EXISTING_SETTLEMENT_BOUNDARY_BRIDGED' as const,
  researchOnly: true,
  jiaJiElementControlSurfaceObserved: true,
  jiaJiStemCombinationCandidateObserved: true,
  dualRelationSurfaceObserved: true,
  structuralCombinationTransformationEstablished: false,
  caseSpecificControlDirectionReported: true,
  genericControlOverCombinationPrecedenceEstablished: false,
  genericCombinationOverControlPrecedenceEstablished: false,
  coexistenceSettlementEstablished: false,
  exactContextSettlementEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  multiTouchAggregationAuthorized: false,
  competingRelationSettlementResolved: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
