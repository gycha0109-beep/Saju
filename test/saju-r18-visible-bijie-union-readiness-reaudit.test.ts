import { describe, expect, test } from 'vitest';

import {
  SAJU_R18_CATEGORY_MEMBERSHIP_READINESS,
  SAJU_R18_MINIMAL_NEXT_PRIMITIVE,
  SAJU_R18_POSITIONAL_PARITY,
  SAJU_R18_R16_BLOCKER_DELTA,
  SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  SAJU_R18_SUPPORT_UNION_ASYMMETRY,
  SAJU_R18_VISIBLE_BIJIE_UNION_READINESS,
  SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY,
  SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DECISION,
} from '../src/research/saju-r18-visible-bijie-union-readiness-reaudit.js';

describe('SAJU-R18 visible Bijie union readiness re-audit', () => {
  test('closes the R16 visible Bijian slot-identity blocker only', () => {
    expect(SAJU_R18_R16_BLOCKER_DELTA).toMatchObject({
      visibleBijianSlotIdentityCoverage: {
        inherited: 'MISSING',
        current: 'CLOSED_RESEARCH_ONLY',
        closureEvidence: {
          fixedVisibleStemCoverageAuthorizedResearchOnly: true,
          sourceSlotIdentityPreserved: true,
          exactBijianOnly: true,
          visibleStemBijianPresenceAuthorized: true,
          r7BoundedCountParityRequired: true,
        },
      },
      bijianGyeopjaeCollectionUnionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('proves fixed positional parity between R17 Bijian and R15 Gyeopjae', () => {
    expect(SAJU_R18_POSITIONAL_PARITY).toEqual({
      bijianSlots: ['year', 'month', 'hour'],
      gyeopjaeSlots: ['year', 'month', 'hour'],
      sameFixedVisibleStemDomain: true,
      daySelfExcludedOnBothSurfaces: true,
      canonicalTenGodInputRequiredOnBothSurfaces: true,
      allVisibleStemFactsMustResolveOnBothSurfaces: true,
      sourceSlotIdentityPreservedOnBothSurfaces: true,
      decision: 'READY',
    });
  });

  test('marks category-member union ready for explicit authority but not already authorized', () => {
    expect(SAJU_R18_CATEGORY_MEMBERSHIP_READINESS).toMatchObject({
      exactBijianSlotObservationAvailableResearchOnly: true,
      bijianSourceFamilyObserved: true,
      exactGyeopjaeToBijieMembershipAvailableResearchOnly: true,
      fixedGyeopjaeSlotCoverageAvailableResearchOnly: true,
      positionalParityReady: true,
      explicitBijianGyeopjaeUnionAuthorityAlreadyExists: false,
      decision: 'READY_FOR_EXPLICIT_AUTHORITY',
    });

    expect(SAJU_R18_VISIBLE_BIJIE_UNION_READINESS).toEqual({
      positionalDomain: 'READY',
      categoryMembershipUnion: 'READY_FOR_EXPLICIT_AUTHORITY',
      supportConstituentUnion: 'NOT_READY',
      branchHiddenCoverageScope: 'UNRESOLVED',
    });
  });

  test('pins the remaining slot-level support asymmetry', () => {
    expect(SAJU_R18_SUPPORT_UNION_ASYMMETRY).toMatchObject({
      bijian: {
        chartLevelVisibleBijianSupportConstituentAvailableResearchOnly: true,
        slotIdentityCoverageAvailableResearchOnly: true,
        perSlotSupportConstituentAuthorized: false,
      },
      gyeopjae: {
        singleFactSupportConstituentAvailableResearchOnly: true,
        fixedSlotCoverageAvailableResearchOnly: true,
        slotEvaluationCarriesGovernedSupportSurface: true,
      },
      supportSemanticsSymmetricAtSlotLevel: false,
      decision: 'NOT_READY',
    });

    expect(SAJU_R18_REMAINING_VISIBLE_BIJIE_BLOCKERS).toEqual({
      bijianGyeopjaeCollectionUnionAuthority:
        'READY_FOR_EXPLICIT_CATEGORY_AUTHORITY',
      slotLevelSupportSemanticParity: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('selects category-member union as the only next primitive', () => {
    expect(SAJU_R18_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId:
        'VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      semanticScope:
        'fixed canonical year/month/hour visible-stem slots classified only as 比肩 member, 겁재 member, or outside the bounded visible 比劫 union scope',
      mustPreserveSlotIdentity: true,
      mustPreserveCanonicalMemberKind: true,
      mayUseBijianExactSlotObservation: true,
      mayUseGyeopjaeCanonicalBijieMembership: true,
      mustNotCreateSupportConstituentUnion: true,
      mustNotCreateUnifiedBijieCount: true,
      mustNotDeclareCompleteBijieCollection: true,
      mustNotInferBranchOrHiddenCoverage: true,
      mustNotCreateSupportAggregation: true,
    });
  });

  test('keeps all downstream authority fail-closed', () => {
    expect(SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_DECISION).toBe(
      'CATEGORY_UNION_READY_SUPPORT_UNION_NOT_READY',
    );

    expect(
      SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY,
    ).toMatchObject({
      visibleBijianSlotIdentityCoverageClosedResearchOnly: true,
      visibleBijieCategoryUnionAuthorized: false,
      visibleBijieSupportConstituentUnionAuthorized: false,
      unifiedBijieCountAuthorized: false,
      completeBijieCollectionAuthorized: false,
      generalBijieSupportCoverageComplete: false,
      branchBijieCoverageAuthorized: false,
      hiddenStemBijieCoverageAuthorized: false,
      supportAggregationAuthorized: false,
      dangZhongCounterAuthorized: false,
      dangZhongThresholdAuthorized: false,
      dangZhongBooleanResolverAuthorized: false,
      zhuGuaBooleanResolverAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      numericStrengthAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      nextAction:
        'MATERIALIZE_VISIBLE_STEM_BIJIAN_GYEOPJAE_CATEGORY_MEMBER_UNION_WITHOUT_SUPPORT_OR_COUNT',
    });

    expect(
      SAJU_R18_VISIBLE_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
