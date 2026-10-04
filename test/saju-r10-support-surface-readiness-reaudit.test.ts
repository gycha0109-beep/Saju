import { describe, expect, test } from 'vitest';

import {
  SAJU_R10_LATEST_RESEARCH_DELTA,
  SAJU_R10_REVIEWED_REFRESH_STAGES,
  SAJU_R10_SUPPORT_SURFACE_BLOCKERS,
  SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY,
  SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION,
} from '../src/research/saju-r10-support-surface-readiness-reaudit.js';

describe('SAJU-R10 support-surface readiness re-audit', () => {
  test('re-audits the intended R2 and R5-R9 surfaces without creating aggregation authority', () => {
    expect(SAJU_R10_REVIEWED_REFRESH_STAGES).toEqual([
      'R2_BOUNDED_ROOT',
      'R5_BOUNDED_TONGGEN',
      'R6_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT',
      'R7_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT',
      'R8_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT',
      'R9_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT',
    ]);
    expect(SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_DECISION).toBe(
      'NOT_READY_FOR_AGGREGATION',
    );
    expect(
      SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY
        .supportConstituentSurfaceCompleteForAggregation,
    ).toBe(false);
    expect(
      SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY
        .supportConstituentCollectionAuthorized,
    ).toBe(false);
    expect(
      SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY
        .supportConstituentCountAuthorized,
    ).toBe(false);
  });

  test('inherits every current completeness blocker instead of inferring readiness from more constituents', () => {
    expect(SAJU_R10_SUPPORT_SURFACE_BLOCKERS).toEqual({
      generalBijieSupportCoverage: 'INCOMPLETE',
      generalJiecaiToBijieSupport: 'UNAUTHORIZED',
      wholeChartYinshouSupportCoverage: 'INCOMPLETE',
      tonggenSupportCoverage: 'INCOMPLETE',
      dangZhongCardinalityRule: 'MISSING',
      biYinChongDieThreshold: 'MISSING',
      tonggenBiYinCompositionRule: 'MISSING',
    });
  });

  test('pins each refresh stage to its current bounded non-aggregating authority', () => {
    const authority = SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY;

    expect(authority.r2).toMatchObject({
      positiveObservationOnly: true,
      canonicalSizhuHasRootSettlementAuthorized: false,
      observationCountSemanticsAuthorized: false,
      directRootToTonggenSupportConstituentAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(authority.r5).toMatchObject({
      positiveObservationOnly: true,
      observationCountSemanticsAuthorized: false,
      supportConstituentSettlementAuthorized: false,
      dangZhongSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(authority.r6).toMatchObject({
      positiveConstituentObservationOnly: true,
      constituentCollectionComplete: false,
      constituentCountSemanticsAuthorized: false,
      supportAggregationAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(authority.r7).toMatchObject({
      exactBijianOnly: true,
      jiecaiIncludedAsBijian: false,
      peerCountToDangZhongAuthorized: false,
      supportAggregationAuthorized: false,
      constituentCollectionComplete: false,
      qiangRuoClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(authority.r8).toMatchObject({
      exactJiaYiOnly: true,
      wholeChartJiecaiScanAuthorized: false,
      generalizedJiecaiResolverAuthorized: false,
      jiecaiCountAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      supportAggregationAuthorized: false,
      constituentCollectionComplete: false,
      productionAuthorityAuthorized: false,
    });
    expect(authority.r9).toMatchObject({
      callerSuppliedSingleFactBindingRequired: true,
      internalPillarSelectionAuthorized: false,
      wholeChartYinScanAuthorized: false,
      wholeChartYinCountAuthorized: false,
      bijieYinshouAggregationAuthorized: false,
      tonggenYinshouCompositionAuthorized: false,
      constituentCollectionComplete: false,
      supportAggregationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
  });

  test('does not promote R175 acquisition candidates into support or executable semantic authority', () => {
    expect(SAJU_R10_LATEST_RESEARCH_DELTA).toMatchObject({
      r174CompletePhysicalVariantMappingEstablished: false,
      r175ResearchOnly: true,
      r175JiaYiPhysicalScanPageBound: false,
      r175CompletePhysicalVariantMappingEstablished: false,
      r175ExecutableResolverAuthorized: false,
      r175AutomaticEngineAdmissionAuthorized: false,
      r175InterpretationClaimEmissionAuthorized: false,
      r175ProductionAuthorityPromoted: false,
      supportSurfaceAuthorityChangedByR175: false,
    });
  });

  test('keeps all downstream settlement and Production gates fail-closed', () => {
    const authority = SAJU_R10_SUPPORT_SURFACE_READINESS_REAUDIT_AUTHORITY;

    expect(authority).toMatchObject({
      dangZhongCounterAuthorized: false,
      dangZhongThresholdAuthorized: false,
      dangZhongBooleanResolverAuthorized: false,
      zhuGuaBooleanResolverAuthorized: false,
      tonggenPlusBiYinAggregationAuthorized: false,
      supportToQiangOrBuRuoAuthorized: false,
      chartLevelQiangRuoClassifierAuthorized: false,
      chartLevelWangShuaiClassifierAuthorized: false,
      numericStrengthAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      productionFactEmissionAuthorized: false,
      externalHumanDomainReviewRequired: false,
      nextAction:
        'CLOSE_COVERAGE_CARDINALITY_THRESHOLD_AND_COMPOSITION_BLOCKERS_BEFORE_AGGREGATION',
    });
    expect(authority.definitionHash).toMatch(/^[0-9a-f]{64}$/);
  });
});
