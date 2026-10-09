import { describe, expect, test } from 'vitest';

import {
  SAJU_R20_BIJIAN_SLOT_SUPPORT_READINESS,
  SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY,
  SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DECISION,
  SAJU_R20_GYEOPJAE_SLOT_SUPPORT_STATUS,
  SAJU_R20_MINIMAL_NEXT_PRIMITIVE,
  SAJU_R20_R18_BLOCKER_DELTA,
  SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS,
  SAJU_R20_SUPPORT_COMPOSITION_READINESS,
} from '../src/research/saju-r20-bijie-support-parity-reaudit.js';

describe('SAJU-R20 visible Bijie support parity re-audit', () => {
  test('closes the R18 category-union blocker at research-only authority', () => {
    expect(SAJU_R20_R18_BLOCKER_DELTA).toMatchObject({
      bijianGyeopjaeCollectionUnionAuthority: {
        inherited: 'READY_FOR_EXPLICIT_CATEGORY_AUTHORITY',
        current: 'CLOSED_RESEARCH_ONLY',
        closureEvidence: {
          categoryUnionAuthorizedResearchOnly: true,
          sourceSlotIdentityPreserved: true,
          canonicalMemberKindPreserved: true,
          supportObjectsExcluded: true,
        },
      },
      slotLevelSupportSemanticParity: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('marks per-slot Bijian support binding ready but not already authorized', () => {
    expect(SAJU_R20_BIJIAN_SLOT_SUPPORT_READINESS).toEqual({
      exactBijianSlotCoverageAvailableResearchOnly: true,
      exactBijianOnly: true,
      sourceSlotIdentityPreserved: true,
      r7BoundedCountParityGuardAvailable: true,
      chartLevelVisibleBijianSupportAvailableResearchOnly: true,
      directBijieDangZhongSourceAssociationObserved: true,
      directBijieFriendSupportAnalogyObserved: true,
      perSlotSupportConstituentAlreadyAuthorized: false,
      decision: 'READY_FOR_EXPLICIT_AUTHORITY',
    });
  });

  test('pins the existing Gyeopjae slot support surface', () => {
    expect(SAJU_R20_GYEOPJAE_SLOT_SUPPORT_STATUS).toEqual({
      fixedVisibleStemCoverageAvailableResearchOnly: true,
      sourceSlotIdentityPreserved: true,
      singleFactSupportConstituentAuthorizedResearchOnly: true,
      slotEvaluationCarriesGovernedSupportSurface: true,
      decision: 'AVAILABLE_RESEARCH_ONLY',
    });
  });

  test('keeps support union and count blocked until Bijian slot support exists', () => {
    expect(SAJU_R20_SUPPORT_COMPOSITION_READINESS).toEqual({
      categoryMembershipParity: 'CLOSED_RESEARCH_ONLY',
      bijianSlotSupportBinding: 'READY_FOR_EXPLICIT_AUTHORITY',
      gyeopjaeSlotSupportSurface: 'AVAILABLE_RESEARCH_ONLY',
      slotLevelSupportSemanticParity: 'NOT_YET_CLOSED',
      visibleBijieSupportConstituentUnion: 'NOT_READY',
      unifiedBijieCount: 'NOT_READY',
      completeBijieCollection: 'NOT_READY',
      branchHiddenCoverageScope: 'UNRESOLVED',
    });

    expect(SAJU_R20_REMAINING_VISIBLE_BIJIE_BLOCKERS).toEqual({
      bijianSlotSupportConstituentBinding:
        'READY_FOR_EXPLICIT_AUTHORITY',
      visibleBijieSupportConstituentUnion: 'NOT_READY',
      unifiedBijieCountAuthority: 'MISSING',
      completeBijieCollectionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('selects per-slot Bijian support binding as the only next primitive', () => {
    expect(SAJU_R20_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId: 'VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      semanticScope:
        'exact canonical 比肩 observations on fixed year/month/hour visible-stem slots bound individually to the already-governed 比劫 support category without changing count semantics',
      mustConsumeR17ExactBijianSlotIdentity: true,
      mustReuseExistingBijianSupportSourceAuthority: true,
      mustPreserveSourceSlotIdentity: true,
      mustNotReplaceOrReinterpretR7BoundedCount: true,
      mustNotCreateNewBijianCount: true,
      mustNotCreateGyeopjaeCount: true,
      mustNotCreateVisibleBijieSupportUnion: true,
      mustNotCreateUnifiedBijieCount: true,
      mustNotDeclareCompleteBijieCollection: true,
      mustNotInferBranchOrHiddenCoverage: true,
      mustNotSettleDangZhongOrZhuGua: true,
      mustNotClassifyQiangRuoOrWangShuai: true,
    });
  });

  test('pins every downstream authority closed', () => {
    expect(SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_DECISION).toBe(
      'BIJIAN_SLOT_SUPPORT_READY_SUPPORT_UNION_NOT_READY',
    );

    expect(SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY).toMatchObject({
      categoryMembershipParityClosedResearchOnly: true,
      bijianPerSlotSupportConstituentAuthorized: false,
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
        'MATERIALIZE_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_BINDING_WITHOUT_UNION_OR_COUNT_CHANGE',
    });

    expect(
      SAJU_R20_BIJIE_SUPPORT_PARITY_REAUDIT_AUTHORITY.definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
