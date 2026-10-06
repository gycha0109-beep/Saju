import { describe, expect, test } from 'vitest';

import {
  SAJU_R24_BOUNDED_COUNT_READINESS,
  SAJU_R24_INTERPRETATION_BOUNDARY,
  SAJU_R24_MINIMAL_NEXT_PRIMITIVE,
  SAJU_R24_R22_BLOCKER_DELTA,
  SAJU_R24_R23_CLOSURE,
  SAJU_R24_REMAINING_BLOCKERS,
  SAJU_R24_SCOPE_SEPARATION,
  SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY,
  SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DECISION,
} from '../src/research/saju-r24-visible-bijie-support-member-count-readiness-reaudit.js';

describe('SAJU-R24 visible-stem Bijie support-member count readiness re-audit', () => {
  test('records R23 support-union closure', () => {
    expect(SAJU_R24_R23_CLOSURE).toMatchObject({
      visibleStemSupportUnion: 'CLOSED_RESEARCH_ONLY',
      fixedVisibleStemDomainOnly: true,
      supportConstituentUnionAuthorizedResearchOnly: true,
      sourceSlotIdentityPreserved: true,
      canonicalMemberKindPreserved: true,
      upstreamThreeWayParityRequired: true,
      slots: ['year', 'month', 'hour'],
    });
  });

  test('marks only the bounded visible-stem support-member count ready', () => {
    expect(SAJU_R24_BOUNDED_COUNT_READINESS).toMatchObject({
      proposedPrimitiveId: 'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT',
      valueDomain: [0, 1, 2, 3],
      exactFixedDomainAvailable: true,
      positiveMembershipPerSlotAvailable: true,
      arithmeticOnlyNoNewMembershipInference: true,
      boundedVisibleStemCountPatternAlreadyExists: true,
      existingBoundedCountExcludesDaySelf: true,
      existingBoundedCountExcludesBranch: true,
      existingBoundedCountExcludesHidden: true,
      r15GyeopjaeSlotSurfaceAvailable: true,
      r15GyeopjaeCountStillUnauthorized: true,
      r23CountStillUnauthorized: true,
      decision: 'READY_FOR_EXPLICIT_AUTHORITY',
    });
  });

  test('separates bounded visible-only count from whole-chart count', () => {
    expect(SAJU_R24_SCOPE_SEPARATION).toEqual({
      boundedVisibleStemSupportMemberCount: {
        scope: 'year_month_hour_visible_stem_support_members_only',
        branchIncluded: false,
        hiddenStemIncluded: false,
        daySelfIncluded: false,
        completeBijieCollectionClaimed: false,
        wholeChartBijieCountClaimed: false,
        branchHiddenScopeDecisionRequiredBeforePrimitive: false,
      },
      wholeChartBijieCount: {
        status: 'NOT_READY',
        branchHiddenScopeDecisionRequired: true,
        completeBijieCollectionRequired: true,
      },
      branchHiddenScope: 'UNRESOLVED',
      branchHiddenScopeBlocksBoundedVisibleOnlyCount: false,
      branchHiddenScopeBlocksWholeChartCount: true,
    });
  });

  test('keeps every interpretive promotion closed', () => {
    expect(SAJU_R24_INTERPRETATION_BOUNDARY).toEqual({
      boundedCountMayRepresentOnlyStructuralCardinality: true,
      countToDangZhongAuthorized: false,
      countToZhuGuaAuthorized: false,
      countToQiangRuoAuthorized: false,
      countToWangShuaiAuthorized: false,
      countToNumericStrengthAuthorized: false,
      countToGyeokgukAuthorized: false,
      supportAggregationAuthorized: false,
      completeBijieCollectionAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
    });
  });

  test('updates old blockers without pretending whole-chart count is ready', () => {
    expect(SAJU_R24_R22_BLOCKER_DELTA).toEqual({
      visibleBijieSupportConstituentUnion: {
        inherited: 'READY_FOR_EXPLICIT_AUTHORITY',
        current: 'CLOSED_RESEARCH_ONLY',
      },
      unifiedBijieCountAuthority: {
        inherited: 'MISSING',
        currentWholeChartStatus: 'NOT_READY',
        boundedVisibleStemAlternative: 'READY_FOR_EXPLICIT_AUTHORITY',
      },
      completeBijieCollectionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });

    expect(SAJU_R24_REMAINING_BLOCKERS).toEqual({
      boundedVisibleStemBijieSupportMemberCount:
        'READY_FOR_EXPLICIT_AUTHORITY',
      wholeChartBijieCountAuthority: 'NOT_READY',
      completeBijieCollectionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
      dangZhongSettlementAuthority: 'NOT_READY',
    });
  });

  test('selects one bounded count primitive as the next step', () => {
    expect(SAJU_R24_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId: 'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      sourceSurface: 'R23 visible-stem Bijie support constituent union',
      countDomain: [0, 1, 2, 3],
      countRule:
        'sum supportConstituentObserved=true across exactly year/month/hour R23 slots',
      mustRequireResolvedR23Union: true,
      mustRequireR23ThreeWayParity: true,
      mustPreserveBoundedVisibleStemScopeInNameAndPayload: true,
      mustNotRecomputeTenGodMembership: true,
      mustNotCreateSeparateBijianCount: true,
      mustNotCreateSeparateGyeopjaeCount: true,
      mustNotCallResultWholeChartBijieCount: true,
      mustNotClaimCompleteBijieCollection: true,
      mustNotInspectBranchTenGods: true,
      mustNotInspectHiddenStems: true,
      mustNotSettleDangZhongOrZhuGua: true,
      mustNotClassifyQiangRuoOrWangShuai: true,
      mustNotCreateNumericStrength: true,
      mustNotCreateGyeokguk: true,
    });
  });

  test('pins the final R24 decision and authority boundary', () => {
    expect(
      SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_DECISION,
    ).toBe(
      'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_READY_WHOLE_CHART_NOT_READY',
    );

    expect(
      SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY,
    ).toMatchObject({
      boundedVisibleStemCountAuthorizedAlready: false,
      wholeChartBijieCountAuthorized: false,
      branchBijieCoverageAuthorized: false,
      hiddenStemBijieCoverageAuthorized: false,
      dangZhongSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
      nextAction:
        'MATERIALIZE_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_WITHOUT_WHOLE_CHART_OR_INTERPRETIVE_SEMANTICS',
    });

    expect(
      SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY
        .definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
