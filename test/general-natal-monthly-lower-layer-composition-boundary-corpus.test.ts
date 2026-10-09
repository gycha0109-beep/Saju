import { describe, expect, it } from 'vitest';

import {
  R155_AUTHORITY,
  R155_COMPOSITION_CONSTRAINTS,
  R155_CONTEXT_LAYER_ROWS,
  R155_GOVERNANCE_GUARDS,
  R155_MONTHLY_LOWER_LAYER_COMPOSITION_VERSION,
  R155_REJECTED_MONTHLY_SHORTCUTS,
  R155_SUMMARY,
  R155_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-monthly-lower-layer-composition-boundary-corpus.js';

describe('R155 monthly lower-layer composition boundary corpus', () => {
  it('replays all five R075 required context layers plus six composition constraints', () => {
    expect(R155_MONTHLY_LOWER_LAYER_COMPOSITION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R155_CONTEXT_LAYER_ROWS).toHaveLength(5);
    expect(R155_COMPOSITION_CONSTRAINTS).toHaveLength(6);

    expect(R155_CONTEXT_LAYER_ROWS.map((item) => item.layer)).toEqual([
      'NATAL_CONTEXT',
      'DAYUN_CONTEXT',
      'ANNUAL_CONTEXT',
      'MONTHLY_STEM_BRANCH',
      'CROSS_LAYER_INTERACTIONS',
    ]);

    expect(R155_SUMMARY).toEqual({
      contextLayerRowCount: 5,
      compositionConstraintCount: 6,
      totalCorpusRowCount: 11,
      requiredContextLayerCount: 5,
      monthlyLowerLayerRowCount: 1,
      upperContextRowCount: 3,
      crossLayerRelationContextRowCount: 1,
      unresolvedDayunMethodologyPreservedConstraintCount: 3,
      monthOverridesUpperLayersAuthorizedCount: 0,
      relationCountAsSeverityAuthorizedCount: 0,
      eventBridgeAuthorizedCount: 0,
      monthBoundaryCalendarPolicyAuthorizedCount: 0,
      executableCompositionAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 5,
    });
  });

  it('keeps Monthly as a lower layer without converting it to a standalone oracle', () => {
    const monthly = R155_CONTEXT_LAYER_ROWS.find(
      (item) => item.layer === 'MONTHLY_STEM_BRANCH',
    );

    expect(monthly).toMatchObject({
      role: 'LOWER_TEMPORAL_LAYER',
      monthlyLowerTemporalLayerObserved: true,
      monthlyStandaloneOracleAuthorized: false,
      monthlyOverridesUpperContextAuthorized: false,
      permanentNatalMutationAuthorized: false,
      numericLayerWeightAuthorized: false,
      deterministicEventAuthorized: false,
      executable: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('retains Natal, Dayun, Annual, Monthly, and cross-layer contexts without precedence leakage', () => {
    for (const row of R155_CONTEXT_LAYER_ROWS) {
      expect(row.requiredByR075).toBe(true);
      expect(row.monthlyStandaloneOracleAuthorized).toBe(false);
      expect(row.monthlyOverridesUpperContextAuthorized).toBe(false);
      expect(row.permanentNatalMutationAuthorized).toBe(false);
      expect(row.numericLayerWeightAuthorized).toBe(false);
      expect(row.deterministicEventAuthorized).toBe(false);
      expect(row.executable).toBe(false);
    }

    for (const row of R155_COMPOSITION_CONSTRAINTS) {
      expect(row.requiredForFaithfulR075Boundary).toBe(true);
      expect(row.orderDoesNotImplyPrecedence).toBe(true);
      expect(row.monthOverridesUpperLayersAuthorized).toBe(false);
      expect(row.relationCountAsSeverityAuthorized).toBe(false);
      expect(row.eventBridgeAuthorized).toBe(false);
      expect(row.monthBoundaryCalendarPolicyAuthorized).toBe(false);
      expect(row.executableCompositionAuthorized).toBe(false);
      expect(row.interpretationClaimEmissionAuthorized).toBe(false);
      expect(row.productionAuthorityPromoted).toBe(false);
    }
  });

  it('propagates unresolved Dayun methodology into monthly composition', () => {
    const preserving = R155_COMPOSITION_CONSTRAINTS.filter(
      (item) => item.unresolvedDayunMethodologyPreserved,
    );

    expect(preserving.map((item) => item.constraintId)).toEqual([
      'DAYUN_CONTEXT_RETAINED',
      'ANNUAL_CONTEXT_RETAINED',
      'CROSS_LAYER_INTERACTIONS_RETAINED',
    ]);
  });

  it('keeps all upstream governance guards satisfied and non-authoritative', () => {
    expect(R155_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(R155_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R155_GOVERNANCE_GUARDS) {
      expect(guard.executableCompositionAuthorized).toBe(false);
      expect(guard.interpretationClaimEmissionAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds R075/R151/R152/R153/R154 boundaries explicitly', () => {
    expect(R155_UPSTREAM_BINDINGS.r075).toMatchObject({
      monthlyIsLowerTemporalLayer: true,
      monthlyStandaloneOracleAuthorized: false,
      monthlyPermanentNatalMutationAuthorized: false,
      standaloneMonthlyOracleAuthorized: false,
      deterministicMonthlyEventAuthorized: false,
      executableMonthlyResolverAuthorized: false,
    });

    expect(R155_UPSTREAM_BINDINGS.r151).toMatchObject({
      natalBaselineDistinctFromTemporalOverlayObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      permanentNatalMutationAuthorized: false,
      deterministicTemporalEventAuthorized: false,
    });

    expect(R155_UPSTREAM_BINDINGS.r152).toMatchObject({
      methodologyFormulationVarianceObserved: true,
      methodWinnerResolverAuthorized: false,
      numericMethodPriorityAuthorized: false,
      automaticCanonicalMethodSelectionAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
    });

    expect(R155_UPSTREAM_BINDINGS.r153).toMatchObject({
      natalAnnualCompositionRequirementObserved: true,
      dayunAnnualCompositionRequirementObserved: true,
      crossLayerMeetingCombinationCheckObserved: true,
      crossLayerPunishmentClashCheckObserved: true,
      crossLayerPrecedenceResolverAuthorized: false,
      deterministicAnnualEventAuthorized: false,
      executableAnnualCompositionResolverAuthorized: false,
    });

    expect(R155_UPSTREAM_BINDINGS.r154).toMatchObject({
      inputLayerOrderInvariantRepresentationObserved: true,
      evaluationOrderDistinctFromSemanticPrecedenceObserved: true,
      relationCheckOrderInvariantRepresentationObserved: true,
      inputOrderAsSemanticPrecedenceAuthorized: false,
      evaluationOrderAsCausalOrderAuthorized: false,
      relationCountAsSeverityAuthorized: false,
    });
  });

  it('rejects monthly-layer shortcuts explicitly', () => {
    expect(R155_REJECTED_MONTHLY_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'MONTHLY_STANDALONE_ORACLE',
        'MONTH_PILLAR_ALONE_IMPLIES_EVENT',
        'MONTH_OVERRIDES_NATAL',
        'MONTH_OVERRIDES_DAYUN',
        'MONTH_OVERRIDES_ANNUAL',
        'MOST_RECENT_TEMPORAL_LAYER_ALWAYS_WINS',
        'MONTHLY_RELATION_COUNT_AS_SEVERITY',
        'MONTHLY_ARRAY_ORDER_AS_PRECEDENCE',
        'MONTHLY_EVALUATION_ORDER_AS_CAUSAL_ORDER',
        'MONTHLY_LAYER_NUMERIC_WEIGHT',
        'AUTO_SELECT_DAYUN_METHOD_DURING_MONTHLY_COMPOSITION',
        'MONTH_BOUNDARY_CALENDAR_POLICY_INVENTED',
      ]),
    );
  });

  it('keeps R155 research-only and non-authoritative', () => {
    expect(R155_AUTHORITY).toMatchObject({
      researchOnly: true,
      monthlyLowerTemporalLayerObserved: true,
      fiveContextLayerRequirementPreserved: true,
      natalContextRequiredObserved: true,
      dayunContextRequiredObserved: true,
      annualContextRequiredObserved: true,
      monthlyStemBranchRequiredObserved: true,
      crossLayerInteractionContextRequiredObserved: true,
      unresolvedDayunMethodologyPropagationObserved: true,
      temporalOrderInvariantBoundaryPreserved: true,
      standaloneMonthlyOracleAuthorized: false,
      monthOverridesNatalAuthorized: false,
      monthOverridesDayunAuthorized: false,
      monthOverridesAnnualAuthorized: false,
      mostRecentTemporalLayerWinsAuthorized: false,
      fixedCrossLayerPrecedenceAuthorized: false,
      numericMonthlyLayerWeightAuthorized: false,
      relationCountAsSeverityAuthorized: false,
      monthlyPermanentNatalMutationAuthorized: false,
      deterministicMonthlyEventAuthorized: false,
      monthBoundaryCalendarPolicyAuthorized: false,
      executableMonthlyCompositionResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
