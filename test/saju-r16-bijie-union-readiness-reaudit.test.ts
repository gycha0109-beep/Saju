import { describe, expect, test } from 'vitest';

import {
  SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY,
  SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DECISION,
  SAJU_R16_MINIMAL_NEXT_PRIMITIVE,
  SAJU_R16_R14_REQUIREMENT_DELTA,
  SAJU_R16_UNION_READINESS_BLOCKERS,
  SAJU_R16_VISIBLE_SURFACE_ASYMMETRY,
} from '../src/research/saju-r16-bijie-union-readiness-reaudit.js';

describe('SAJU-R16 Bijie union readiness re-audit', () => {
  test('closes only the R14 visible-stem canonical Gyeopjae requirement', () => {
    expect(SAJU_R16_R14_REQUIREMENT_DELTA).toMatchObject({
      visibleStemCanonicalGyeopjaeCoverage: {
        inherited: 'MISSING',
        current: 'CLOSED_RESEARCH_ONLY',
        closureEvidence: {
          fixedVisibleStemCoverageAuthorizedResearchOnly: true,
          sourceSlotIdentityPreserved: true,
          visibleStemGyeopjaePresenceAuthorized: true,
          visibleStemGyeopjaeCountAuthorized: false,
        },
      },
      bijianGyeopjaeCollectionUnionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('pins the asymmetric visible surfaces that block direct union', () => {
    expect(SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_DECISION).toBe(
      'UNION_NOT_READY_ASYMMETRIC_VISIBLE_SURFACES',
    );

    expect(SAJU_R16_VISIBLE_SURFACE_ASYMMETRY).toMatchObject({
      bijian: {
        visibleStemExactBijianCountAuthorizedResearchOnly: true,
        visibleBijianSupportConstituentAuthorizedResearchOnly: true,
        exactBijianOnly: true,
        boundedCountSurfaceAvailable: true,
        slotIdentityCollectionSurfaceAvailable: false,
        branchTenGodConsumed: false,
        hiddenStemMembershipConsumed: false,
      },
      gyeopjae: {
        fixedVisibleStemCoverageAuthorizedResearchOnly: true,
        sourceSlotIdentityPreserved: true,
        visibleStemGyeopjaePresenceAuthorized: true,
        visibleStemGyeopjaeCountAuthorized: false,
        slotIdentityCollectionSurfaceAvailable: true,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
      },
    });
  });

  test('adds only the missing Bijian slot-identity surface ahead of union', () => {
    expect(SAJU_R16_UNION_READINESS_BLOCKERS).toEqual({
      visibleBijianSlotIdentityCoverage: 'MISSING',
      bijianGyeopjaeCollectionUnionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });

    expect(SAJU_R16_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId: 'VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      semanticScope:
        'resolved canonical year/month/hour visible-stem Ten-God facts with exact 比肩 slot identity',
      mustPreserveSlotIdentity: true,
      exactBijianOnly: true,
      mustNotReplaceOrReinterpretR7BoundedCount: true,
      mustNotCreateBijianGyeopjaeUnion: true,
      mustNotCreateUnifiedBijieCount: true,
      mustNotInferBranchOrHiddenCoverage: true,
      mustNotCreateSupportAggregation: true,
    });
  });

  test('keeps union, classifiers, narrative, and Production fail-closed', () => {
    expect(SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY).toMatchObject({
      visibleStemCanonicalGyeopjaeCoverageClosedResearchOnly: true,
      visibleBijianSlotIdentityCoverageComplete: false,
      bijianGyeopjaeCollectionUnionAuthorized: false,
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
        'MATERIALIZE_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_WITHOUT_UNION_OR_COUNT_CHANGE',
    });

    expect(
      SAJU_R16_BIJIE_UNION_READINESS_REAUDIT_AUTHORITY.definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
