import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS,
} from './saju-r13-support-surface-delta-reaudit.js';
import {
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
} from './shared-natal-single-fact-gyeopjae-bijie-support-structural-claim.js';

export const SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DECISION =
  'INCOMPLETE_MINIMAL_NEXT_PRIMITIVE_IDENTIFIED' as const;

export const SAJU_R14_GENERAL_BIJIE_CURRENT_SURFACE = Object.freeze({
  inheritedGeneralBijieSupportCoverage:
    SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS.generalBijieSupportCoverage,
  visibleBijianCoverage: Object.freeze({
    availableResearchOnly:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly,
    visibleStemExactBijianCountAuthorizedResearchOnly:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .visibleBijianCountToBoundedLeftOperandAuthorizedResearchOnly,
    exactBijianOnly:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.exactBijianOnly,
    jiecaiCountedAsBijian:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .jiecaiCountedAsBijian,
    branchTenGodConsumed:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.branchTenGodConsumed,
    hiddenStemMembershipConsumed:
      GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
        .hiddenStemMembershipConsumed,
  }),
  singleFactGyeopjaeCoverage: Object.freeze({
    categoryMemberAuthorizedResearchOnly:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .resolvedGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly,
    supportConstituentAuthorizedResearchOnly:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly,
    singleFactInputOnly:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .singleFactInputOnly,
    engineSingleFactEvidenceBindingRequired:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .exactR12EvidenceBindingRequired,
    wholeChartJiecaiScanAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartJiecaiScanAuthorized,
    wholeChartJiecaiCountAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .wholeChartJiecaiCountAuthorized,
    branchTenGodScanAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .branchTenGodScanAuthorized,
    hiddenStemTenGodScanAuthorized:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY
        .hiddenStemTenGodScanAuthorized,
  }),
});

export const SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS = Object.freeze({
  visibleStemCanonicalGyeopjaeCoverage: 'MISSING' as const,
  bijianGyeopjaeCollectionUnionAuthority: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
});

export const SAJU_R14_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId: 'VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  semanticScope:
    'resolved canonical visible-stem Ten-God facts excluding the day self slot' as const,
  mustPreserveSlotIdentity: true as const,
  canonicalGyeopjaeOnly: true as const,
  mayReuseR11SingleFactMembershipAndSupportAuthority: true as const,
  mayReuseR12ExactSnapshotParityBindingPattern: true as const,
  mustNotInferBranchOrHiddenCoverage: true as const,
  mustNotCreateBijianGyeopjaeUnion: true as const,
  mustNotCreateSupportAggregation: true as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_VERSION,
  decision: SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DECISION,
  currentSurface: SAJU_R14_GENERAL_BIJIE_CURRENT_SURFACE,
  requirements: SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS,
  minimalNextPrimitive: SAJU_R14_MINIMAL_NEXT_PRIMITIVE,
  generalBijieSupportCoverageComplete: false as const,
  completeBijieCollectionAuthorized: false as const,
  bijianGyeopjaeCollectionUnionAuthorized: false as const,
  unifiedBijieCountAuthorized: false as const,
  branchBijieCoverageAuthorized: false as const,
  hiddenStemBijieCoverageAuthorized: false as const,
  supportAggregationAuthorized: false as const,
  dangZhongCounterAuthorized: false as const,
  dangZhongThresholdAuthorized: false as const,
  dangZhongBooleanResolverAuthorized: false as const,
  zhuGuaBooleanResolverAuthorized: false as const,
  qiangRuoClassificationAuthorized: false as const,
  wangShuaiClassificationAuthorized: false as const,
  numericStrengthAuthorized: false as const,
  gyeokgukDerivationAuthorized: false as const,
  narrativeMaterialityAuthorized: false as const,
  productionAuthorityAuthorized: false as const,
  externalHumanDomainReviewRequired: false as const,
  nextAction:
    'MATERIALIZE_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_WITHOUT_UNION_OR_AGGREGATION' as const,
});

export const SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash: SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R7 already provides a bounded whole-visible-stem exact 比肩 count over year/month/hour canonical Ten-God facts, while R11/R12 provide only a caller-selected single canonical 겁재 -> 劫財 -> 比劫 support path. This asymmetry means general 比劫 support coverage remains incomplete. The smallest next semantic primitive is visible-stem canonical 겁재 coverage over the same non-day visible-stem scope. Even after that primitive exists, complete 比劫 collection still requires a separate explicit 比肩+겁재 collection/union authority, and branch/hidden-stem inclusion remains a distinct unresolved coverage-scope question. No count aggregation, 黨眾/助寡 settlement, 強弱/旺衰, 格局, narrative materiality, or Production authority is created by this audit.' as const,
  });
