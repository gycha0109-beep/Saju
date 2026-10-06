import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY,
} from './general-natal-visible-stem-bijie-category-member-union-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
} from './general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS,
} from './saju-r18-visible-bijie-union-readiness-reaudit.js';

export const SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DECISION =
  'BIJIAN_SLOT_SUPPORT_READY_SUPPORT_UNION_NOT_READY' as const;

export const SAJU_R20_R18_BLOCKER_DELTA = Object.freeze({
  bijianGyeopjaeCollectionUnionAuthority: Object.freeze({
    inherited:
      SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS
        .bijianGyeopjaeCollectionUnionAuthority,
    current: 'CLOSED_RESEARCH_ONLY' as const,
    closureEvidence: Object.freeze({
      categoryUnionAuthorizedResearchOnly:
        GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
          .exactBijianGyeopjaeCategoryUnionAuthorizedResearchOnly,
      sourceSlotIdentityPreserved:
        GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
          .sourceSlotIdentityPreserved,
      canonicalMemberKindPreserved:
        GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
          .canonicalMemberKindPreserved,
      supportObjectsExcluded:
        GENERAL_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY
          .upstreamSupportObjectsConsumedIntoUnion === false,
    }),
  }),
  slotLevelSupportSemanticParity:
    SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS.slotLevelSupportSemanticParity,
  branchHiddenBijieCoverageScopeDecision:
    SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS
      .branchHiddenBijieCoverageScopeDecision,
});

export const SAJU_R20_BIJIAN_SLOT_SUPPORT_READINESS = Object.freeze({
  exactBijianSlotCoverageAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .fixedVisibleStemCoverageAuthorizedResearchOnly,
  exactBijianOnly:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .exactBijianOnly,
  sourceSlotIdentityPreserved:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .sourceSlotIdentityPreserved,
  r7BoundedCountParityGuardAvailable:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .r7BoundedCountParityRequired,
  chartLevelVisibleBijianSupportAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
      .visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly,
  directBijieDangZhongSourceAssociationObserved:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
      .directSourceBijieDangZhongComponentObserved,
  directBijieFriendSupportAnalogyObserved:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
      .directSourceBijieFriendSupportAnalogyObserved,
  perSlotSupportConstituentAlreadyAuthorized:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .perSlotSupportConstituentAuthorized,
  decision: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
});

export const SAJU_R20_GYEOPJAE_SLOT_SUPPORT_STATUS = Object.freeze({
  fixedVisibleStemCoverageAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .fixedVisibleStemCoverageAuthorizedResearchOnly,
  sourceSlotIdentityPreserved:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .sourceSlotIdentityPreserved,
  singleFactSupportConstituentAuthorizedResearchOnly:
    GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
      .canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly,
  slotEvaluationCarriesGovernedSupportSurface: true as const,
  decision: 'AVAILABLE_RESEARCH_ONLY' as const,
});

export const SAJU_R20_SUPPORT_COMPOSITION_READINESS = Object.freeze({
  categoryMembershipParity: 'CLOSED_RESEARCH_ONLY' as const,
  bijianSlotSupportBinding: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
  gyeopjaeSlotSupportSurface: 'AVAILABLE_RESEARCH_ONLY' as const,
  slotLevelSupportSemanticParity: 'NOT_YET_CLOSED' as const,
  visibleBijieSupportConstituentUnion: 'NOT_READY' as const,
  unifiedBijieCount: 'NOT_READY' as const,
  completeBijieCollection: 'NOT_READY' as const,
  branchHiddenCoverageScope: 'UNRESOLVED' as const,
});

export const SAJU_R20_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId: 'VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  semanticScope:
    'exact canonical 比肩 observations on fixed year/month/hour visible-stem slots bound individually to the already-governed 比劫 support category without changing count semantics' as const,
  mustConsumeR17ExactBijianSlotIdentity: true as const,
  mustReuseExistingBijianSupportSourceAuthority: true as const,
  mustPreserveSourceSlotIdentity: true as const,
  mustNotReplaceOrReinterpretR7BoundedCount: true as const,
  mustNotCreateNewBijianCount: true as const,
  mustNotCreateGyeopjaeCount: true as const,
  mustNotCreateVisibleBijieSupportUnion: true as const,
  mustNotCreateUnifiedBijieCount: true as const,
  mustNotDeclareCompleteBijieCollection: true as const,
  mustNotInferBranchOrHiddenCoverage: true as const,
  mustNotSettleDangZhongOrZhuGua: true as const,
  mustNotClassifyQiangRuoOrWangShuai: true as const,
});

export const SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS = Object.freeze({
  bijianSlotSupportConstituentBinding:
    'READY_FOR_EXPLICIT_AUTHORITY' as const,
  visibleBijieSupportConstituentUnion: 'NOT_READY' as const,
  unifiedBijieCountAuthority: 'MISSING' as const,
  completeBijieCollectionAuthority: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_VERSION,
  decision: SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DECISION,
  r18BlockerDelta: SAJU_R20_R18_BLOCKER_DELTA,
  bijianSlotSupportReadiness: SAJU_R20_BIJIAN_SLOT_SUPPORT_READINESS,
  gyeopjaeSlotSupportStatus: SAJU_R20_GYEOPJAE_SLOT_SUPPORT_STATUS,
  supportCompositionReadiness: SAJU_R20_SUPPORT_COMPOSITION_READINESS,
  remainingVisibleBijieBlockers: SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  minimalNextPrimitive: SAJU_R20_MINIMAL_NEXT_PRIMITIVE,
  categoryMembershipParityClosedResearchOnly: true as const,
  bijianPerSlotSupportConstituentAuthorized: false as const,
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
    'MATERIALIZE_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING_WITHOUT_UNION_OR_COUNT_CHANGE' as const,
});

export const SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY = Object.freeze({
  ...auditPayload,
  definitionHash: SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DEFINITION_HASH,
  authorityBoundary:
    'R19 closes only the visible 比肩/겁재 category-member union at research-only authority. Support semantics remain asymmetric because R15 already carries a governed 겁재 support evaluation per fixed slot, while R17 carries exact 比肩 slot identity without per-slot support meaning. The existing visible-比肩 support authority already establishes exact visible 比肩 as a bounded 比劫 support constituent at chart level and is backed by source observations that 比劫 is 黨眾-associated and friend-like mutual support. Therefore an explicit research-only per-slot 比肩 support binding is now ready as the smallest next primitive. It must preserve R17 slot provenance and the existing R7 count only as an upstream guard, without creating a new count, a visible 比劫 support union, complete collection, branch/hidden coverage, 黨眾/助寡 settlement, 強弱/旺衰, 格局, narrative materiality, or Production authority.' as const,
});
