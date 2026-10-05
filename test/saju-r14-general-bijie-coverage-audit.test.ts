import { describe, expect, test } from 'vitest';

import {
  SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_AUTHORITY,
  SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DECISION,
  SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS,
  SAJU_R14_GENERAL_BIJIE_CURRENT_SURFACE,
  SAJU_R14_MINIMAL_NEXT_PRIMITIVE,
} from '../src/research/saju-r14-general-bijie-coverage-audit.js';

describe('SAJU-R14 general Bijie coverage audit', () => {
  test('keeps general Bijie coverage incomplete despite R11/R12 single-fact Gyeopjae authority', () => {
    expect(SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_DECISION).toBe(
      'INCOMPLETE_MINIMAL_NEXT_PRIMITIVE_IDENTIFIED',
    );

    expect(SAJU_R14_GENERAL_BIJIE_CURRENT_SURFACE).toMatchObject({
      inheritedGeneralBijieSupportCoverage: 'INCOMPLETE',
      visibleBijianCoverage: {
        availableResearchOnly: true,
        visibleStemExactBijianCountAuthorizedResearchOnly: true,
        exactBijianOnly: true,
        jiecaiCountedAsBijian: false,
        branchTenGodConsumed: false,
        hiddenStemMembershipConsumed: false,
      },
      singleFactGyeopjaeCoverage: {
        categoryMemberAuthorizedResearchOnly: true,
        supportConstituentAuthorizedResearchOnly: true,
        singleFactInputOnly: true,
        engineSingleFactEvidenceBindingRequired: true,
        wholeChartJiecaiScanAuthorized: false,
        wholeChartJiecaiCountAuthorized: false,
        branchTenGodScanAuthorized: false,
        hiddenStemTenGodScanAuthorized: false,
      },
    });
  });

  test('decomposes the blocker into visible Gyeopjae coverage, union authority, and branch-hidden scope', () => {
    expect(SAJU_R14_GENERAL_BIJIE_COVERAGE_REQUIREMENTS).toEqual({
      visibleStemCanonicalGyeopjaeCoverage: 'MISSING',
      bijianGyeopjaeCollectionUnionAuthority: 'MISSING',
      branchHiddenBijieCoverageScopeDecision: 'UNRESOLVED',
    });
  });

  test('selects only visible-stem canonical Gyeopjae coverage as the next primitive', () => {
    expect(SAJU_R14_MINIMAL_NEXT_PRIMITIVE).toEqual({
      primitiveId: 'VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE',
      status: 'NEXT_REQUIRED_PRIMITIVE',
      semanticScope:
        'resolved canonical visible-stem Ten-God facts excluding the day self slot',
      mustPreserveSlotIdentity: true,
      canonicalGyeopjaeOnly: true,
      mayReuseR11SingleFactMembershipAndSupportAuthority: true,
      mayReuseR12ExactSnapshotParityBindingPattern: true,
      mustNotInferBranchOrHiddenCoverage: true,
      mustNotCreateBijianGyeopjaeUnion: true,
      mustNotCreateSupportAggregation: true,
    });
  });

  test('keeps collection, aggregation, classifiers, and Production fail-closed', () => {
    const authority = SAJU_R14_GENERAL_BIJIE_COVERAGE_AUDIT_AUTHORITY;

    expect(authority).toMatchObject({
      generalBijieSupportCoverageComplete: false,
      completeBijieCollectionAuthorized: false,
      bijianGyeopjaeCollectionUnionAuthorized: false,
      unifiedBijieCountAuthorized: false,
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
        'MATERIALIZE_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_WITHOUT_UNION_OR_AGGREGATION',
    });

    expect(authority.definitionHash).toMatch(/^[0-9a-f]{64}$/);
  });
});
