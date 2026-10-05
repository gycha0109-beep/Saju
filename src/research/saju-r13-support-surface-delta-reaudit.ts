import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  R180_AUTHORITY,
  R180_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_VERSION,
} from './general-natal-predicate-candidate-jia-ji-repository-evidence-coverage-audit.js';
import {
  SAJU_R10_SUPPORT_SURFACE_BLOCKERS,
  SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION,
} from './saju-r10-support-surface-readiness-reaudit.js';
import {
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-single-fact-gyeopjae-bijie-support-structural-claim.js';

export const SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DECISION =
  'NOT_READY_FOR_AGGREGATION' as const;

export const SAJU_R13_BASELINE_BLOCKER_COUNT = 7 as const;
export const SAJU_R13_CLOSED_BLOCKER_COUNT = 1 as const;
export const SAJU_R13_REMAINING_BLOCKER_COUNT = 6 as const;

export const SAJU_R13_CLOSED_BLOCKERS = Object.freeze([
  'generalJiecaiToBijieSupport',
] as const);

export const SAJU_R13_GENERAL_JIECAI_TO_BIJIE_SUPPORT_CLOSURE =
  Object.freeze({
    inheritedR10State:
      SAJU_R10_SUPPORT_SURFACE_BLOCKERS.generalJiecaiToBijieSupport,
    closureState: 'CLOSED_SINGLE_FACT_RESEARCH_ONLY' as const,
    canonicalGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .resolvedGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly,
    canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly,
    engineResearchEvidenceAndT2ClaimMaterialized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .exactR12EvidenceBindingRequired &&
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .runtimeScope === 'isolated_research_pack_only',
    singleFactOnly:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .singleFactInputOnly,
    wholeChartJiecaiScanAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartJiecaiScanAuthorized,
    wholeChartJiecaiCountAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartJiecaiCountAuthorized,
    bijianJiecaiAggregationAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .bijianJiecaiAggregationAuthorized,
    completeBijieCollectionAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .completeBijieCollectionAuthorized,
    supportAggregationAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .supportAggregationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  });

export const SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS = Object.freeze({
  generalBijieSupportCoverage:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.generalBijieSupportCoverage,
  wholeChartYinshouSupportCoverage:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.wholeChartYinshouSupportCoverage,
  tonggenSupportCoverage:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.tonggenSupportCoverage,
  dangZhongCardinalityRule:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.dangZhongCardinalityRule,
  biYinChongDieThreshold:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.biYinChongDieThreshold,
  tonggenBiYinCompositionRule:
    SAJU_R10_SUPPORT_SURFACE_BLOCKERS.tonggenBiYinCompositionRule,
});

export const SAJU_R13_PARALLEL_RESEARCH_DELTA = Object.freeze({
  latestReviewedParallelResearchVersion:
    R180_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_VERSION,
  r180ResearchOnly: R180_AUTHORITY.researchOnly,
  r180PairLocalInteractionOutcomeEstablished:
    R180_AUTHORITY.pairLocalInteractionOutcomeEstablished,
  r180ExecutableResolverAuthorized:
    R180_AUTHORITY.executableResolverAuthorized,
  r180AutomaticEngineAdmissionAuthorized:
    R180_AUTHORITY.automaticEngineAdmissionAuthorized,
  r180InterpretationClaimEmissionAuthorized:
    R180_AUTHORITY.interpretationClaimEmissionAuthorized,
  r180ProductionAuthorityPromoted:
    R180_AUTHORITY.productionAuthorityPromoted,
  supportSurfaceAuthorityChangedByR180: false as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_VERSION,
  decision: SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DECISION,
  inheritedR10Decision: SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION,
  baselineBlockerCount: SAJU_R13_BASELINE_BLOCKER_COUNT,
  closedBlockerCount: SAJU_R13_CLOSED_BLOCKER_COUNT,
  remainingBlockerCount: SAJU_R13_REMAINING_BLOCKER_COUNT,
  closedBlockers: SAJU_R13_CLOSED_BLOCKERS,
  generalJiecaiToBijieSupportClosure:
    SAJU_R13_GENERAL_JIECAI_TO_BIJIE_SUPPORT_CLOSURE,
  remainingBlockers: SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS,
  parallelResearchDelta: SAJU_R13_PARALLEL_RESEARCH_DELTA,
  supportConstituentSurfaceCompleteForAggregation: false as const,
  supportConstituentCollectionAuthorized: false as const,
  supportConstituentCountAuthorized: false as const,
  wholeChartBijieCollectionAuthorized: false as const,
  wholeChartYinshouCollectionAuthorized: false as const,
  exhaustiveTonggenCollectionAuthorized: false as const,
  dangZhongCounterAuthorized: false as const,
  dangZhongThresholdAuthorized: false as const,
  dangZhongBooleanResolverAuthorized: false as const,
  zhuGuaBooleanResolverAuthorized: false as const,
  bijieYinshouAggregationAuthorized: false as const,
  tonggenPlusBiYinAggregationAuthorized: false as const,
  supportToQiangOrBuRuoAuthorized: false as const,
  chartLevelQiangRuoClassifierAuthorized: false as const,
  chartLevelWangShuaiClassifierAuthorized: false as const,
  numericStrengthAuthorized: false as const,
  gyeokgukDerivationAuthorized: false as const,
  narrativeMaterialityAuthorized: false as const,
  productionFactEmissionAuthorized: false as const,
  externalHumanDomainReviewRequired: false as const,
  nextAction:
    'CLOSE_REMAINING_SIX_COVERAGE_CARDINALITY_THRESHOLD_AND_COMPOSITION_BLOCKERS_BEFORE_AGGREGATION' as const,
});

export const SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R11 closes only the previously unauthorized semantic mapping from one already-resolved canonical 겁재 fact through 劫財 into the 比劫 support family, and R12 materializes that same bounded authority as snapshot-bound ResearchEvidence and an isolated research-only T2 claim. This closes the R10 generalJiecaiToBijieSupport blocker at the single-fact semantic/engine surface, but does not authorize whole-chart 劫財 scanning or counting, 比肩+劫財 aggregation, complete 比劫 collection, whole-chart 印綬 coverage, exhaustive 通根 coverage, 黨眾 cardinality or threshold settlement, 通根+比印 composition, 強弱/旺衰, 格局, narrative materiality, or Production. R180 concerns the separate 甲己 competing-relation research line and changes no support-surface authority.' as const,
  });
