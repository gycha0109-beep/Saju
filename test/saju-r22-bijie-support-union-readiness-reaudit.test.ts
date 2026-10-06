import { describe, expect, test } from 'vitest';

import {
  SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY,
  SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DECISION,
  SAJU_R22_COUNT_AND_COMPLETENESS_BOUNDARY,
  SAJU_R22_MINIMAL_NEXT_PRIMITIVE,
  SAJU_R22_POSITIONAL_PARITY,
  SAJU_R22_R20_BLOCKER_DELTA,
  SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  SAJU_R22_SUPPORT_SEMANTIC_PARITY,
  SAJU_R22_SUPPORT_UNION_READINESS,
} from '../src/research/saju-r22-bijie-support-union-readiness-reaudit.js';

describe('SAJU-R22 visible Bijie support-union readiness re-audit', () => {
  test('closes the R20 Bijian slot-support blocker', () => {
    expect(SAJU_R22_R20_BLOCKER_DELTA).toMatchObject({
      bijianSlotSupportConstituentBinding: {
        inherited: 'READY_FOR_EXPLICIT_AUTHORITY',
        current: 'CLOSED_RESEARCH_ONLY',
        closureEvidence: {
          perSlotSupportConstituentAuthorizedResearchOnly: true,
          exactBijianOnly: true,
          sourceSlotIdentityPreserved: true,
          sourceSupportCategory: '比劫',
          upstreamChartSupportParityRequired: true,
        },
      },
      visibleBijieSupportConstituentUnion: {
        inherited: 'NOT_READY',
        current: 'READY_FOR_EXPLICIT_AUTHORITY',
      },
      unifiedBijieCountAuthority: 'MISSING',
      completeBijieCollectionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('confirms positional parity across Bijian, Gyeopjae, and R19 category union', () => {
    expect(SAJU_R22_POSITIONAL_PARITY).toMatchObject({
      bijianSlots: ['year', 'month', 'hour'],
      gyeopjaeSlots: ['year', 'month', 'hour'],
      categoryUnionSlots: ['year', 'month', 'hour'],
      sameFixedVisibleStemDomain: true,
      supportDomainMatchesCategoryUnionDomain: true,
      sourceSlotIdentityPreservedOnBijian: true,
      sourceSlotIdentityPreservedOnGyeopjae: true,
      canonicalMemberKindPreservedByCategoryUnion: true,
      decision: 'READY',
    });
  });

  test('closes slot-level support semantic parity without opening count semantics', () => {
    expect(SAJU_R22_SUPPORT_SEMANTIC_PARITY).toEqual({
      bijian: {
        perSlotSupportConstituentAuthorizedResearchOnly: true,
        exactCanonicalMemberOnly: true,
        sourceSupportCategory: '比劫',
        newCountAuthorized: false,
      },
      gyeopjae: {
        fixedSlotCoverageAuthorizedResearchOnly: true,
        sourceSlotIdentityPreserved: true,
        singleFactSupportConstituentAuthorizedResearchOnly: true,
        slotEvaluationCarriesGovernedSupportSurface: true,
        visibleStemGyeopjaeCountAuthorized: false,
      },
      commonSupportCategory: '比劫',
      slotLevelSupportSemanticParity: 'CLOSED_RESEARCH_ONLY',
      countSemanticsRemainSeparate: true,
    });
  });

  test('marks support union ready for explicit authority but not already authorized', () => {
    expect(SAJU_R22_SUPPORT_UNION_READINESS).toEqual({
      categoryMemberUnionAvailableResearchOnly: true,
      categoryMemberKindPreserved: true,
      supportObjectsConsumedByCategoryUnion: false,
      positionalParityReady: true,
      slotSupportSemanticParityClosed: true,
      explicitSupportUnionAuthorityAlreadyExists: false,
      decision: 'READY_FOR_EXPLICIT_AUTHORITY',
    });

    expect(
      SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY
        .visibleBijieSupportConstituentUnionAuthorized,
    ).toBe(false);
  });

  test('keeps count, completeness, branch, and hidden coverage blocked', () => {
    expect(SAJU_R22_COUNT_AND_COMPLETENESS_BOUNDARY).toEqual({
      supportCollectionUnionImpliesUnifiedCount: false,
      unifiedBijieCountAuthorized: false,
      newBijianCountAuthorized: false,
      gyeopjaeCountAuthorized: false,
      completeBijieCollectionAuthorized: false,
      branchTenGodCoverageAuthorized: false,
      hiddenStemTenGodCoverageAuthorized: false,
      branchHiddenCoverageScope: 'UNRESOLVED',
      generalBijieSupportCoverageComplete: false,
    });

    expect(SAJU_R22_REMAINING_VISIBLE_BIJIE_BLOCKERS).toEqual({
      visibleBijieSupportConstituentUnion:
        'READY_FOR_EXPLICIT_AUTHORITY',
      unifiedBijieCountAuthority: 'MISSING',
      completeBijieCollectionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('selects visible support union as the only next primitive', () => {
    expect(SAJU_R22_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId:
        'VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      semanticScope:
        'fixed canonical year/month/hour visible-stem slots unified only as support-constituent membership while preserving original 比肩/겁재 member kind and provenance',
      mustReevaluateR21BijianSlotSupportFromCanonicalFacts: true,
      mustReevaluateR15GyeopjaeSlotSupportFromCanonicalFacts: true,
      mustVerifyR19CategoryMemberParity: true,
      mustPreserveSourceSlotIdentity: true,
      mustPreserveCanonicalMemberKind: true,
      mayEmitSupportPresenceOnly: true,
      mustNotCreateUnifiedBijieCount: true,
      mustNotCreateBijianCount: true,
      mustNotCreateGyeopjaeCount: true,
      mustNotDeclareCompleteBijieCollection: true,
      mustNotInferBranchOrHiddenCoverage: true,
      mustNotCreateSupportAggregation: true,
      mustNotSettleDangZhongOrZhuGua: true,
      mustNotClassifyQiangRuoOrWangShuai: true,
    });
  });

  test('pins all downstream authority closed', () => {
    expect(SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_DECISION).toBe(
      'VISIBLE_BIJIE_SUPPORT_UNION_READY_COUNT_NOT_READY',
    );

    expect(
      SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY,
    ).toMatchObject({
      slotLevelSupportSemanticParityClosedResearchOnly: true,
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
        'MATERIALIZE_VISIBLE_STEM_BIJIAN_GYEOPJAE_SUPPORT_CONSTITUENT_UNION_WITHOUT_COUNT_OR_COMPLETENESS',
    });

    expect(
      SAJU_R22_BIJIE_SUPPORT_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
