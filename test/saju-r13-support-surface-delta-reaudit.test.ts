import { describe, expect, test } from 'vitest';

import {
  SAJU_R13_BASELINE_BLOCKER_COUNT,
  SAJU_R13_CLOSED_BLOCKER_COUNT,
  SAJU_R13_CLOSED_BLOCKERS,
  SAJU_R13_GENERAL_JIECAI_TO_BIJIE_SUPPORT_CLOSURE,
  SAJU_R13_PARALLEL_RESEARCH_DELTA,
  SAJU_R13_REMAINING_BLOCKER_COUNT,
  SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS,
  SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_AUTHORITY,
  SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DECISION,
} from '../src/research/saju-r13-support-surface-delta-reaudit.js';

describe('SAJU-R13 support-surface delta re-audit', () => {
  test('reduces the R10 blocker set from seven to six by closing only general Jiecai-to-Bijie support', () => {
    expect(SAJU_R13_BASELINE_BLOCKER_COUNT).toBe(7);
    expect(SAJU_R13_CLOSED_BLOCKER_COUNT).toBe(1);
    expect(SAJU_R13_REMAINING_BLOCKER_COUNT).toBe(6);
    expect(SAJU_R13_CLOSED_BLOCKERS).toEqual([
      'generalJiecaiToBijieSupport',
    ]);
    expect(SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_DECISION).toBe(
      'NOT_READY_FOR_AGGREGATION',
    );
  });

  test('proves the R11 semantic authority and R12 engine materialization chain without widening scope', () => {
    expect(
      SAJU_R13_GENERAL_JIECAI_TO_BIJIE_SUPPORT_CLOSURE,
    ).toMatchObject({
      inheritedR10State: 'UNAUTHORIZED',
      closureState: 'CLOSED_SINGLE_FACT_RESEARCH_ONLY',
      canonicalGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly: true,
      canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly: true,
      engineResearchEvidenceAndT2ClaimMaterialized: true,
      singleFactOnly: true,
      wholeChartJiecaiScanAuthorized: false,
      wholeChartJiecaiCountAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      completeBijieCollectionAuthorized: false,
      supportAggregationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
  });

  test('keeps exactly the other six R10 blockers open', () => {
    expect(SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS).toEqual({
      generalBijieSupportCoverage: 'INCOMPLETE',
      wholeChartYinshouSupportCoverage: 'INCOMPLETE',
      tonggenSupportCoverage: 'INCOMPLETE',
      dangZhongCardinalityRule: 'MISSING',
      biYinChongDieThreshold: 'MISSING',
      tonggenBiYinCompositionRule: 'MISSING',
    });
    expect(
      Object.keys(SAJU_R13_REMAINING_SUPPORT_SURFACE_BLOCKERS),
    ).toHaveLength(6);
  });

  test('does not treat parallel R180 Jia-Ji research as support-surface progress', () => {
    expect(SAJU_R13_PARALLEL_RESEARCH_DELTA).toMatchObject({
      r180ResearchOnly: true,
      r180PairLocalInteractionOutcomeEstablished: false,
      r180ExecutableResolverAuthorized: false,
      r180AutomaticEngineAdmissionAuthorized: false,
      r180InterpretationClaimEmissionAuthorized: false,
      r180ProductionAuthorityPromoted: false,
      supportSurfaceAuthorityChangedByR180: false,
    });
  });

  test('keeps aggregation, chart-level classifiers, narrative, and Production fail-closed', () => {
    const authority =
      SAJU_R13_SUPPORT_SURFACE_DELTA_REAUDIT_AUTHORITY;

    expect(authority).toMatchObject({
      supportConstituentSurfaceCompleteForAggregation: false,
      supportConstituentCollectionAuthorized: false,
      supportConstituentCountAuthorized: false,
      wholeChartBijieCollectionAuthorized: false,
      wholeChartYinshouCollectionAuthorized: false,
      exhaustiveTonggenCollectionAuthorized: false,
      dangZhongCounterAuthorized: false,
      dangZhongThresholdAuthorized: false,
      dangZhongBooleanResolverAuthorized: false,
      zhuGuaBooleanResolverAuthorized: false,
      bijieYinshouAggregationAuthorized: false,
      tonggenPlusBiYinAggregationAuthorized: false,
      supportToQiangOrBuRuoAuthorized: false,
      chartLevelQiangRuoClassifierAuthorized: false,
      chartLevelWangShuaiClassifierAuthorized: false,
      numericStrengthAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionFactEmissionAuthorized: false,
      externalHumanDomainReviewRequired: false,
      nextAction:
        'CLOSE_REMAINING_SIX_COVERAGE_CARDINALITY_THRESHOLD_AND_COMPOSITION_BLOCKERS_BEFORE_AGGREGATION',
    });
    expect(authority.definitionHash).toMatch(/^[0-9a-f]{64}$/);
  });
});
