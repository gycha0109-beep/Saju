import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
} from './general-natal-visible-stem-bijian-slot-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS,
} from './general-natal-visible-stem-bijie-category-member-union-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS,
} from './saju-r20-bijie-support-parity-reaudit.js';

export const SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DECISION =
  'VISIBLE_BIJIE_SUPPORT_UNION_READY_COUNT_NOT_READY' as const;

const bijianGyeopjaeSupportSlotsMatch =
  JSON.stringify(
    GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
  ) ===
  JSON.stringify(
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
  );

const supportAndCategorySlotsMatch =
  JSON.stringify(
    GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
  ) ===
  JSON.stringify(
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS,
  );

export const SAJU_R22_R20_BLOCKER_DELTA = Object.freeze({
  bijianSlotSupportConstituentBinding: Object.freeze({
    inherited:
      SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS
        .bijianSlotSupportConstituentBinding,
    current: 'CLOSED_RESEARCH_ONLY' as const,
    closureEvidence: Object.freeze({
      perSlotSupportConstituentAuthorizedResearchOnly:
        GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
          .perSlotSupportConstituentAuthorizedResearchOnly,
      exactBijianOnly:
        GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
          .exactBijianOnly,
      sourceSlotIdentityPreserved:
        GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
          .sourceSlotIdentityPreserved,
      sourceSupportCategory:
        GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
          .sourceSupportCategory,
      upstreamChartSupportParityRequired:
        GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
          .upstreamChartSupportParityRequired,
    }),
  }),
  visibleBijieSupportConstituentUnion: Object.freeze({
    inherited:
      SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS
        .visibleBijieSupportConstituentUnion,
    current: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
  }),
  unifiedBijieCountAuthority:
    SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS.unifiedBijieCountAuthority,
  completeBijieCollectionAuthority:
    SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS.completeBijieCollectionAuthority,
  branchHiddenBijieCoverageScopeDecision:
    SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS
      .branchHiddenBijieCoverageScopeDecision,
});

export const SAJU_R22_POSITIONAL_PARITY = Object.freeze({
  bijianSlots:
    GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_SLOTS,
  gyeopjaeSlots:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
  categoryUnionSlots:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SLOTS,
  sameFixedVisibleStemDomain: bijianGyeopjaeSupportSlotsMatch,
  supportDomainMatchesCategoryUnionDomain: supportAndCategorySlotsMatch,
  sourceSlotIdentityPreservedOnBijian:
    GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
      .sourceSlotIdentityPreserved,
  sourceSlotIdentityPreservedOnGyeopjae:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .sourceSlotIdentityPreserved,
  canonicalMemberKindPreservedByCategoryUnion:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
      .canonicalMemberKindPreserved,
  decision: 'READY' as const,
});

export const SAJU_R22_SUPPORT_SEMANTIC_PARITY = Object.freeze({
  bijian: Object.freeze({
    perSlotSupportConstituentAuthorizedResearchOnly:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .perSlotSupportConstituentAuthorizedResearchOnly,
    exactCanonicalMemberOnly:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .exactBijianOnly,
    sourceSupportCategory:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .sourceSupportCategory,
    newCountAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_AUTHORITY
        .newBijianCountAuthorized,
  }),
  gyeopjae: Object.freeze({
    fixedSlotCoverageAuthorizedResearchOnly:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .fixedVisibleStemCoverageAuthorizedResearchOnly,
    sourceSlotIdentityPreserved:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .sourceSlotIdentityPreserved,
    singleFactSupportConstituentAuthorizedResearchOnly:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly,
    slotEvaluationCarriesGovernedSupportSurface: true as const,
    visibleStemGyeopjaeCountAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .visibleStemGyeopjaeCountAuthorized,
  }),
  commonSupportCategory: '比劫' as const,
  slotLevelSupportSemanticParity: 'CLOSED_RESEARCH_ONLY' as const,
  countSemanticsRemainSeparate: true as const,
});

export const SAJU_R22_SUPPORT_UNION_READINESS = Object.freeze({
  categoryMemberUnionAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
      .exactBijianGyeopjaeCategoryUnionAuthorizedResearchOnly,
  categoryMemberKindPreserved:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
      .canonicalMemberKindPreserved,
  supportObjectsConsumedByCategoryUnion:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
      .upstreamSupportObjectsConsumedIntoUnion,
  positionalParityReady:
    bijianGyeopjaeSupportSlotsMatch && supportAndCategorySlotsMatch,
  slotSupportSemanticParityClosed: true as const,
  explicitSupportUnionAuthorityAlreadyExists: false as const,
  decision: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
});

export const SAJU_R22_COUNT_AND_COMPLETENESS_BOUNDARY = Object.freeze({
  supportCollectionUnionImpliesUnifiedCount: false as const,
  unifiedBijieCountAuthorized: false as const,
  newBijianCountAuthorized: false as const,
  gyeopjaeCountAuthorized: false as const,
  completeBijieCollectionAuthorized: false as const,
  branchTenGodCoverageAuthorized: false as const,
  hiddenStemTenGodCoverageAuthorized: false as const,
  branchHiddenCoverageScope: 'UNRESOLVED' as const,
  generalBijieSupportCoverageComplete: false as const,
});

export const SAJU_R22_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId:
    'VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  semanticScope:
    'fixed canonical year/month/hour visible-stem slots unified only as support-constituent membership while preserving original 比肩/겁재 member kind and provenance' as const,
  mustReevaluateR21BijianSlotSupportFromCanonicalFacts: true as const,
  mustReevaluateR15GyeopjaeSlotSupportFromCanonicalFacts: true as const,
  mustVerifyR19CategoryMemberParity: true as const,
  mustPreserveSourceSlotIdentity: true as const,
  mustPreserveCanonicalMemberKind: true as const,
  mayEmitSupportPresenceOnly: true as const,
  mustNotCreateUnifiedBijieCount: true as const,
  mustNotCreateBijianCount: true as const,
  mustNotCreateGyeopjaeCount: true as const,
  mustNotDeclareCompleteBijieCollection: true as const,
  mustNotInferBranchOrHiddenCoverage: true as const,
  mustNotCreateSupportAggregation: true as const,
  mustNotSettleDangZhongOrZhuGua: true as const,
  mustNotClassifyQiangRuoOrWangShuai: true as const,
});

export const SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS = Object.freeze({
  visibleBijieSupportConstituentUnion:
    'READY_FOR_EXPLICIT_AUTHORITY' as const,
  unifiedBijieCountAuthority: 'MISSING' as const,
  completeBijieCollectionAuthority: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_VERSION,
  decision: SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DECISION,
  r20BlockerDelta: SAJU_R22_R20_BLOCKER_DELTA,
  positionalParity: SAJU_R22_POSITIONAL_PARITY,
  supportSemanticParity: SAJU_R22_SUPPORT_SEMANTIC_PARITY,
  supportUnionReadiness: SAJU_R22_SUPPORT_UNION_READINESS,
  countAndCompletenessBoundary: SAJU_R22_COUNT_AND_COMPLETENESS_BOUNDARY,
  remainingVisibleBijieBlockers: SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  minimalNextPrimitive: SAJU_R22_MINIMAL_NEXT_PRIMITIVE,
  slotLevelSupportSemanticParityClosedResearchOnly: true as const,
  visibleBijieSupportConstituentUnionAuthorized: false as const,
  unifiedBijieCountAuthorized: false as const,
  completeBijieCollectionAuthorized: false as const,
  generalBijieSupportCoverageComplete: false as const,
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
    'MATERIALIZE_VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION_WITHOUT_COUNT_OR_COMPLETENESS' as const,
});

export const SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R21 closes the missing per-slot 比肩 support binding, so R21 比肩 and R15 겁재 now share the same canonical year/month/hour visible-stem domain, preserve slot provenance, and converge on the governed 比劫 support category. R19 separately provides the category-member union with original 比肩/겁재 member kind preserved. These surfaces are sufficient to prepare one explicit research-only visible 比劫 support-constituent union that re-evaluates both support authorities against the same canonical facts and verifies R19 category parity. This readiness does not authorize the union itself, any unified count, complete 比劫 collection, branch/hidden coverage, support aggregation, 黨眾/助寡 settlement, 強弱/旺衰, 格局, narrative materiality, or Production authority.' as const,
  });
