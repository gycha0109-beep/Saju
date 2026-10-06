import { createHash } from 'node:crypto';

import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY,
} from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
} from './general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS,
} from './saju-r22-bijie-support-union-readiness-reaudit.js';

export const SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_VERSION =
  '0.1.0-research' as const;

export const SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DECISION =
  'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_READY_WHOLE_CHART_NOT_READY' as const;

export const SAJU_R24_R23_CLOSURE = Object.freeze({
  visibleStemSupportUnion: 'CLOSED_RESEARCH_ONLY' as const,
  fixedVisibleStemDomainOnly:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .fixedVisibleStemDomainOnly,
  supportConstituentUnionAuthorizedResearchOnly:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .supportConstituentUnionAuthorizedResearchOnly,
  sourceSlotIdentityPreserved:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .sourceSlotIdentityPreserved,
  canonicalMemberKindPreserved:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .canonicalMemberKindPreserved,
  upstreamThreeWayParityRequired:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .upstreamThreeWayParityRequired,
  slots:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.slots,
});

export const SAJU_R24_BOUNDED_COUNT_READINESS = Object.freeze({
  proposedPrimitiveId:
    'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT' as const,
  semanticScope:
    'count only governed R23 supportConstituentObserved=true members across fixed canonical year/month/hour visible-stem slots' as const,
  valueDomain: Object.freeze([0, 1, 2, 3] as const),
  exactFixedDomainAvailable: true as const,
  positiveMembershipPerSlotAvailable: true as const,
  sourceSlotIdentityPreserved: true as const,
  canonicalMemberKindPreservedUpstream: true as const,
  arithmeticOnlyNoNewMembershipInference: true as const,
  boundedVisibleStemCountPatternAlreadyExists:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
      .visibleBijianCountToBoundedLeftOperandAuthorizedResearchOnly,
  existingBoundedCountExcludesDaySelf:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.dayStemSelfExcluded,
  existingBoundedCountExcludesBranch:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.branchTenGodConsumed ===
    false,
  existingBoundedCountExcludesHidden:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY
      .hiddenStemMembershipConsumed === false,
  r15GyeopjaeSlotSurfaceAvailable:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .fixedVisibleStemCoverageAuthorizedResearchOnly,
  r15GyeopjaeCountStillUnauthorized:
    GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
      .visibleStemGyeopjaeCountAuthorized === false,
  r23CountStillUnauthorized:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
      .unifiedBijieCountAuthorized === false,
  decision: 'READY_FOR_EXPLICIT_AUTHORITY' as const,
});

export const SAJU_R24_SCOPE_SEPARATION = Object.freeze({
  boundedVisibleStemSupportMemberCount: Object.freeze({
    scope: 'year_month_hour_visible_stem_support_members_only' as const,
    branchIncluded: false as const,
    hiddenStemIncluded: false as const,
    daySelfIncluded: false as const,
    completeBijieCollectionClaimed: false as const,
    wholeChartBijieCountClaimed: false as const,
    branchHiddenScopeDecisionRequiredBeforePrimitive: false as const,
  }),
  wholeChartBijieCount: Object.freeze({
    status: 'NOT_READY' as const,
    branchHiddenScopeDecisionRequired: true as const,
    completeBijieCollectionRequired: true as const,
  }),
  branchHiddenScope: 'UNRESOLVED' as const,
  branchHiddenScopeBlocksBoundedVisibleOnlyCount: false as const,
  branchHiddenScopeBlocksWholeChartCount: true as const,
});

export const SAJU_R24_INTERPRETATION_BOUNDARY = Object.freeze({
  boundedCountMayRepresentOnlyStructuralCardinality: true as const,
  countToDangZhongAuthorized: false as const,
  countToZhuGuaAuthorized: false as const,
  countToQiangRuoAuthorized: false as const,
  countToWangShuaiAuthorized: false as const,
  countToNumericStrengthAuthorized: false as const,
  countToGyeokgukAuthorized: false as const,
  supportAggregationAuthorized: false as const,
  completeBijieCollectionAuthorized: false as const,
  narrativeMaterialityAuthorized: false as const,
  productionAuthorityAuthorized: false as const,
});

export const SAJU_R24_R22_BLOCKER_DELTA = Object.freeze({
  visibleBijieSupportConstituentUnion: Object.freeze({
    inherited:
      SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS
        .visibleBijieSupportConstituentUnion,
    current: 'CLOSED_RESEARCH_ONLY' as const,
  }),
  unifiedBijieCountAuthority: Object.freeze({
    inherited:
      SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS.unifiedBijieCountAuthority,
    currentWholeChartStatus: 'NOT_READY' as const,
    boundedVisibleStemAlternative:
      'READY_FOR_EXPLICIT_AUTHORITY' as const,
  }),
  completeBijieCollectionAuthority:
    SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS
      .completeBijieCollectionAuthority,
  branchHiddenBijieCoverageScopeDecision:
    SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS
      .branchHiddenBijieCoverageScopeDecision,
});

export const SAJU_R24_MINIMAL_NEXT_PRIMITIVE = Object.freeze({
  primitiveId: 'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT' as const,
  status: 'NEXT_REQUIRED_PRIMITIVE' as const,
  sourceSurface:
    'R23 visible-stem Bijie support constituent union' as const,
  countDomain: Object.freeze([0, 1, 2, 3] as const),
  countRule:
    'sum supportConstituentObserved=true across exactly year/month/hour R23 slots' as const,
  mustRequireResolvedR23Union: true as const,
  mustRequireR23ThreeWayParity: true as const,
  mustPreserveBoundedVisibleStemScopeInNameAndPayload: true as const,
  mustNotRecomputeTenGodMembership: true as const,
  mustNotCreateSeparateBijianCount: true as const,
  mustNotCreateSeparateGyeopjaeCount: true as const,
  mustNotCallResultWholeChartBijieCount: true as const,
  mustNotClaimCompleteBijieCollection: true as const,
  mustNotInspectBranchTenGods: true as const,
  mustNotInspectHiddenStems: true as const,
  mustNotSettleDangZhongOrZhuGua: true as const,
  mustNotClassifyQiangRuoOrWangShuai: true as const,
  mustNotCreateNumericStrength: true as const,
  mustNotCreateGyeokguk: true as const,
});

export const SAJU_R24_REMAINING_BLOCKERS = Object.freeze({
  boundedVisibleStemBijieSupportMemberCount:
    'READY_FOR_EXPLICIT_AUTHORITY' as const,
  wholeChartBijieCountAuthority: 'NOT_READY' as const,
  completeBijieCollectionAuthority: 'MISSING' as const,
  branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED' as const,
  dangZhongSettlementAuthority: 'NOT_READY' as const,
});

const auditPayload = Object.freeze({
  version:
    SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_VERSION,
  decision:
    SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DECISION,
  r23Closure: SAJU_R24_R23_CLOSURE,
  boundedCountReadiness: SAJU_R24_BOUNDED_COUNT_READINESS,
  scopeSeparation: SAJU_R24_SCOPE_SEPARATION,
  interpretationBoundary: SAJU_R24_INTERPRETATION_BOUNDARY,
  r22BlockerDelta: SAJU_R24_R22_BLOCKER_DELTA,
  minimalNextPrimitive: SAJU_R24_MINIMAL_NEXT_PRIMITIVE,
  remainingBlockers: SAJU_R24_REMAINING_BLOCKERS,
  boundedVisibleStemCountAuthorizedAlready: false as const,
  wholeChartBijieCountAuthorized: false as const,
  branchBijieCoverageAuthorized: false as const,
  hiddenStemBijieCoverageAuthorized: false as const,
  dangZhongSettlementAuthorized: false as const,
  qiangRuoClassificationAuthorized: false as const,
  productionAuthorityAuthorized: false as const,
  nextAction:
    'MATERIALIZE_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_WITHOUT_WHOLE_CHART_OR_INTERPRETIVE_SEMANTICS' as const,
});

export const SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DEFINITION_HASH =
  createHash('sha256').update(JSON.stringify(auditPayload)).digest('hex');

export const SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY =
  Object.freeze({
    ...auditPayload,
    definitionHash:
      SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DEFINITION_HASH,
    authorityBoundary:
      'R23 now provides a fully governed, parity-checked support-membership surface over exactly year/month/hour visible-stem slots, so counting positive support members over that already-fixed domain is ready to be authorized as a separate bounded structural cardinality primitive. This is not the previously-missing whole-chart 比劫 count: branch and hidden-stem coverage remain unresolved and therefore still block complete/global 比劫 counting. The proposed bounded count must remain explicitly named as visible-stem support-member count, must not recompute membership, and cannot by itself establish 黨眾/助寡, 強弱/旺衰, numeric strength, 格局, narrative materiality, or Production authority.' as const,
  });
