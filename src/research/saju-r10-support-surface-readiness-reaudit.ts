import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY,
} from './general-natal-dang-zhong-support-constituent-completeness-authority-review.js';
import {
  R175_AUTHORITY,
  R175_JIAYI_PRINTED_WITNESS_ACQUISITION_VERSION,
  R175_UPSTREAM_BINDINGS,
} from './general-natal-predicate-candidate-jiayi-printed-witness-acquisition.js';
import {
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY,
} from './shared-natal-bounded-root-presence-structural-claim.js';
import {
  SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY,
} from './shared-natal-bounded-tonggen-structural-claim.js';
import {
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-bounded-tonggen-support-structural-claim.js';
import {
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-exact-jia-yi-bijie-support-structural-claim.js';
import {
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-single-fact-yinshou-support-structural-claim.js';
import {
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-visible-bijian-support-structural-claim.js';

export const SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION =
  'NOT_READY_FOR_AGGREGATION' as const;

export const SAJU_R10_REVIEWED_REFRESH_STAGES = Object.freeze([
  'R2_BOUNDED_ROOT',
  'R5_BOUNDED_TONGGEN',
  'R6_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT',
  'R7_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT',
  'R8_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT',
  'R9_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT',
] as const);

export const SAJU_R10_SUPPORT_SURFACE_BLOCKERS = Object.freeze({
  generalBijieSupportCoverage:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .generalBijieSupportCoverage,
  generalJiecaiToBijieSupport:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .generalJiecaiToBijieSupport,
  wholeChartYinshouSupportCoverage:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .wholeChartYinshouSupportCoverage,
  tonggenSupportCoverage:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .tonggenSupportCoverage,
  dangZhongCardinalityRule:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .dangZhongCardinalityRule,
  biYinChongDieThreshold:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .biYinChongDieThreshold,
  tonggenBiYinCompositionRule:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .tonggenBiYinCompositionRule,
});

export const SAJU_R10_LATEST_RESEARCH_DELTA = Object.freeze({
  latestReviewedResearchVersion:
    R175_JIAYI_PRINTED_WITNESS_ACQUISITION_VERSION,
  r174CompletePhysicalVariantMappingEstablished:
    R175_UPSTREAM_BINDINGS.r174.completePhysicalVariantMappingEstablished,
  r175ResearchOnly: R175_AUTHORITY.researchOnly,
  r175JiaYiPhysicalScanPageBound: R175_AUTHORITY.jiaYiPhysicalScanPageBound,
  r175CompletePhysicalVariantMappingEstablished:
    R175_AUTHORITY.completePhysicalVariantMappingEstablished,
  r175ExecutableResolverAuthorized:
    R175_AUTHORITY.executableResolverAuthorized,
  r175AutomaticEngineAdmissionAuthorized:
    R175_AUTHORITY.automaticEngineAdmissionAuthorized,
  r175InterpretationClaimEmissionAuthorized:
    R175_AUTHORITY.interpretationClaimEmissionAuthorized,
  r175ProductionAuthorityPromoted:
    R175_AUTHORITY.productionAuthorityPromoted,
  supportSurfaceAuthorityChangedByR175: false as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_VERSION,
  decision: SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION,
  reviewedRefreshStages: SAJU_R10_REVIEWED_REFRESH_STAGES,
  inheritedCompletenessDecision:
    GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
      .decision,
  blockers: SAJU_R10_SUPPORT_SURFACE_BLOCKERS,
  r2: Object.freeze({
    positiveObservationOnly:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .positiveObservationOnly,
    canonicalSizhuHasRootSettlementAuthorized:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .canonicalSizhuHasRootSettlementAuthorized,
    observationCountSemanticsAuthorized:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .observationCountSemanticsAuthorized,
    directRootToTonggenSupportConstituentAuthorized:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .directRootToTonggenSupportConstituentAuthorized,
    qiangRuoClassificationAuthorized:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .qiangRuoClassificationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  r5: Object.freeze({
    positiveObservationOnly:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .positiveObservationOnly,
    observationCountSemanticsAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .observationCountSemanticsAuthorized,
    supportConstituentSettlementAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .supportConstituentSettlementAuthorized,
    dangZhongSettlementAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .dangZhongSettlementAuthorized,
    qiangRuoClassificationAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .qiangRuoClassificationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  r6: Object.freeze({
    positiveConstituentObservationOnly:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .positiveConstituentObservationOnly,
    constituentCollectionComplete:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .constituentCollectionComplete,
    constituentCountSemanticsAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .constituentCountSemanticsAuthorized,
    supportAggregationAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .supportAggregationAuthorized,
    qiangRuoClassificationAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .qiangRuoClassificationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  r7: Object.freeze({
    exactBijianOnly:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY.exactBijianOnly,
    jiecaiIncludedAsBijian:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .jiecaiIncludedAsBijian,
    peerCountToDangZhongAuthorized:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .peerCountToDangZhongAuthorized,
    supportAggregationAuthorized:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .supportAggregationAuthorized,
    constituentCollectionComplete:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .constituentCollectionComplete,
    qiangRuoClassificationAuthorized:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .qiangRuoClassificationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  r8: Object.freeze({
    exactJiaYiOnly:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .exactJiaYiOnly,
    wholeChartJiecaiScanAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartJiecaiScanAuthorized,
    generalizedJiecaiResolverAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .generalizedJiecaiResolverAuthorized,
    jiecaiCountAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .jiecaiCountAuthorized,
    bijianJiecaiAggregationAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .bijianJiecaiAggregationAuthorized,
    supportAggregationAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .supportAggregationAuthorized,
    constituentCollectionComplete:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .constituentCollectionComplete,
    productionAuthorityAuthorized:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  r9: Object.freeze({
    callerSuppliedSingleFactBindingRequired:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .callerSuppliedSingleFactBindingRequired,
    internalPillarSelectionAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .internalPillarSelectionAuthorized,
    wholeChartYinScanAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartYinScanAuthorized,
    wholeChartYinCountAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartYinCountAuthorized,
    bijieYinshouAggregationAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .bijieYinshouAggregationAuthorized,
    tonggenYinshouCompositionAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .tonggenYinshouCompositionAuthorized,
    constituentCollectionComplete:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .constituentCollectionComplete,
    supportAggregationAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .supportAggregationAuthorized,
    productionAuthorityAuthorized:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY
        .productionAuthorityAuthorized,
  }),
  latestResearchDelta: SAJU_R10_LATEST_RESEARCH_DELTA,
  supportConstituentSurfaceCompleteForAggregation: false as const,
  supportConstituentCollectionAuthorized: false as const,
  supportConstituentCountAuthorized: false as const,
  dangZhongCounterAuthorized: false as const,
  dangZhongThresholdAuthorized: false as const,
  dangZhongBooleanResolverAuthorized: false as const,
  zhuGuaBooleanResolverAuthorized: false as const,
  tonggenPlusBiYinAggregationAuthorized: false as const,
  supportToQiangOrBuRuoAuthorized: false as const,
  chartLevelQiangRuoClassifierAuthorized: false as const,
  chartLevelWangShuaiClassifierAuthorized: false as const,
  numericStrengthAuthorized: false as const,
  gyeokgukDerivationAuthorized: false as const,
  productionFactEmissionAuthorized: false as const,
  nextAction:
    'CLOSE_COVERAGE_CARDINALITY_THRESHOLD_AND_COMPOSITION_BLOCKERS_BEFORE_AGGREGATION' as const,
  externalHumanDomainReviewRequired: false as const,
});

export const SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R2/R5-R9 now expose multiple bounded positive root, Tonggen, 比肩, exact 甲乙 劫財→比劫, and single-fact 印綬 observations, but these surfaces remain intentionally partial and non-aggregating. The inherited completeness review still reports incomplete 比劫, whole-chart 印綬, and Tonggen coverage plus missing 黨眾 cardinality, 比印重疊 threshold, and generalized 通根比印 composition rules. R175 only binds acquisition candidates and explicitly authorizes no executable resolver, engine admission, interpretation claim, or Production promotion. Therefore collection, count, 黨眾/助寡, 強弱/旺衰, 格局, and Production remain blocked.' as const,
  });
