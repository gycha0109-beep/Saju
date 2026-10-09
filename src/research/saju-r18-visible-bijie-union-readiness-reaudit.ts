import { createHash } from 'node:crypto';

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
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS,
} from './general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R16_UNION_READINESS_BLOCKERS,
} from './saju-r16-bijie-union-readiness-reaudit.js';

export const SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DECISION =
  'CATEGORY_UNION_READY_SUPPORT_UNION_NOT_READY' as const;

const positionalSlotsMatch =
  JSON.stringify(GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS) ===
  JSON.stringify(GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS);

export const SAJU_R18_R16_BLOCKER_DELTA = Object.freeze({
  visibleBijianSlotIdentityCoverage: Object.freeze({
    inherited: SAJU_R16_UNION_READINESS_BLOCKERS.visibleBijianSlotIdentityCoverage,
    current: 'CLOSED_RESEARCH_ONLY' as const,
    closureEvidence: Object.freeze({
      fixedVisibleStemCoverageAuthorizedResearchOnly:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
          .fixedVisibleStemCoverageAuthorizedResearchOnly,
      sourceSlotIdentityPreserved:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
          .sourceSlotIdentityPreserved,
      exactBijianOnly:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
          .exactBijianOnly,
      visibleStemBijianPresenceAuthorized:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
          .visibleStemBijianPresenceAuthorized,
      r7BoundedCountParityRequired:
        GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
          .r7BoundedCountParityRequired,
    }),
  }),
  bijianGyeopjaeCollectionUnionAuthority:
    SAJU_R16_UNION_READINESS_BLOCKERS.bijianGyeopjaeCollectionUnionAuthority,
  branchHiddenBijieCoverageScopeDecision:
    SAJU_R16_UNION_READINESS_BLOCKERS.branchHiddenBijieCoverageScopeDecision,
});

export const SAJU_R18_POSITIONAL_PARITY = Object.freeze({
  bijianSlots: GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_SLOTS,
  gyeopjaeSlots: GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_SLOTS,
  sameFixedVisibleStemDomain: positionalSlotsMatch,
  daySelfExcludedOnBothSurfaces: true as const,
  canonicalTenGodInputRequiredOnBothSurfaces:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .canonicalTenGodInputRequired &&
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .canonicalTenGodInputRequired,
  allVisibleStemFactsMustResolveOnBothSurfaces:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .allVisibleStemFactsMustResolve &&
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .allVisibleStemFactsMustResolve,
  sourceSlotIdentityPreservedOnBothSurfaces:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .sourceSlotIdentityPreserved &&
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .sourceSlotIdentityPreserved,
  decision: 'READY' as const,
});

export const SAJU_R18_CATEGORY_MEMBERSHIP_READINESS = Object.freeze({
  exactBijianSlotObservationAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .fixedVisibleStemCoverageAuthorizedResearchOnly &&
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
      .exactBijianOnly,
  bijianSourceFamilyObserved:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
      .directSourceBijieDangZhongComponentObserved &&
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
      .directSourceBijieFriendSupportAnalogyObserved,
  exactGyeopjaeToBijieMembershipAvailableResearchOnly:
    GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
      .resolvedGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly,
  fixedGyeopjaeSlotCoverageAvailableResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .fixedVisibleStemCoverageAuthorizedResearchOnly,
  positionalParityReady: positionalSlotsMatch,
  explicitBijianGyeopjaeUnionAuthorityAlreadyExists: false as const,
  decision: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
});

export const SAJU_R18_SUPPORT_UNION_ASYMMETRY = Object.freeze({
  bijian: Object.freeze({
    chartLevelVisibleBijianSupportConstituentAvailableResearchOnly:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly,
    slotIdentityCoverageAvailableResearchOnly:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .fixedVisibleStemCoverageAuthorizedResearchOnly,
    perSlotSupportConstituentAuthorized:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
        .perSlotSupportConstituentAuthorized,
  }),
  gyeopjae: Object.freeze({
    singleFactSupportConstituentAvailableResearchOnly:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly,
    fixedSlotCoverageAvailableResearchOnly:
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .fixedVisibleStemCoverageAuthorizedResearchOnly,
    slotEvaluationCarriesGovernedSupportSurface: true as const,
  }),
  supportSemanticsSymmetricAtSlotLevel: false as const,
  decision: 'NOT_READY' as const,
});

export const SAJU_R18_VISIBLE_BIJIE_UNION_READINESS = Object.freeze({
  positionalDomain: 'READY' as const,
  categoryMembershipUnion: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
  supportConstituentUnion: 'NOT_READY' as const,
  branchHiddenCoverageScope: 'UNRESOLVED' as const,
});

export const SAJU_R18_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId:
    'VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  semanticScope:
    'fixed canonical year/month/hour visible-stem slots classified only as 比肩 member, 겁재 member, or outside the bounded visible 比劫 union scope' as const,
  mustPreserveSlotIdentity: true as const,
  mustPreserveCanonicalMemberKind: true as const,
  mayUseBijianExactSlotObservation: true as const,
  mayUseGyeopjaeCanonicalBijieMembership: true as const,
  mustNotCreateSupportConstituentUnion: true as const,
  mustNotCreateUnifiedBijieCount: true as const,
  mustNotDeclareCompleteBijieCollection: true as const,
  mustNotInferBranchOrHiddenCoverage: true as const,
  mustNotCreateSupportAggregation: true as const,
});

export const SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS = Object.freeze({
  bijianGyeopjaeCollectionUnionAuthority:
    'READY_FOR_EXPLICIT_CATEGORY_AUTHORITY' as const,
  slotLevelSupportSemanticParity: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
});

const auditPayload = Object.freeze({
  version: SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_VERSION,
  decision: SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DECISION,
  r16BlockerDelta: SAJU_R18_R16_BLOCKER_DELTA,
  positionalParity: SAJU_R18_POSITIONAL_PARITY,
  categoryMembershipReadiness: SAJU_R18_CATEGORY_MEMBERSHIP_READINESS,
  supportUnionAsymmetry: SAJU_R18_SUPPORT_UNION_ASYMMETRY,
  unionReadiness: SAJU_R18_VISIBLE_BIJIE_UNION_READINESS,
  remainingVisibleBijieBlockers: SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  minimalNextPrimitive: SAJU_R18_MINIMAL_NEXT_PRIMITIVE,
  visibleBijianSlotIdentityCoverageClosedResearchOnly: true as const,
  visibleBijieCategoryUnionAuthorized: false as const,
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
    'MATERIALIZE_VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION_WITHOUT_SUPPORT_OR_COUNT' as const,
});

export const SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R17 closes the missing visible 比肩 slot-identity surface, so R15 겁재 and R17 比肩 now share the same canonical year/month/hour positional domain. This is sufficient to prepare an explicit research-only category-member union that preserves slot identity and member kind, but it does not itself authorize that union. More importantly, support semantics remain asymmetric: R15 carries governed 겁재 support evaluation at each fixed slot, while R17 deliberately carries only 比肩 slot provenance and leaves support meaning at the existing chart-level R7 surface. Therefore a visible 比劫 category-member union is the next minimal primitive, while support-constituent union, unified count, complete 比劫 collection, branch/hidden coverage, support aggregation, 黨眾/助寡, 強弱/旺衰, 格局, narrative materiality, and Production remain unauthorized.' as const,
  });
