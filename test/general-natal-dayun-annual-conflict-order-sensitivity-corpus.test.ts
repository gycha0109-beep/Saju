import { describe, expect, it } from 'vitest';

import {
  R154_AUTHORITY,
  R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
  R154_GOVERNANCE_GUARDS,
  R154_ORDER_VARIANTS,
  R154_REJECTED_ORDERING_SHORTCUTS,
  R154_STRESS_CASES,
  R154_SUMMARY,
  R154_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-dayun-annual-conflict-order-sensitivity-corpus.js';

describe('R154 Dayun–annual conflict/order sensitivity corpus', () => {
  it('pins seven stress axes and all six permutations for each case', () => {
    expect(R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R154_STRESS_CASES).toHaveLength(7);
    expect(R154_ORDER_VARIANTS).toHaveLength(42);
    expect(new Set(R154_STRESS_CASES.map((item) => item.axis)).size).toBe(7);

    expect(R154_SUMMARY).toEqual({
      stressCaseCount: 7,
      orderVariantCount: 42,
      variantsPerCase: 6,
      unresolvedDayunMethodCaseCount: 3,
      sameSemanticInputSetCaseCount: 7,
      semanticWinnerEmissionCount: 0,
      semanticPrecedenceEmissionCount: 0,
      causalOrderInferenceCount: 0,
      dayunMethodSelectionCount: 0,
      eventPredictionCount: 0,
      relationSeverityEmissionCount: 0,
      firstMatchAppliedCount: 0,
      lastAppliedWinsAppliedCount: 0,
      sequentialMutationAppliedCount: 0,
      numericTemporalLayerWeightAppliedCount: 0,
      executableCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 5,
    });
  });

  it('preserves the same semantic input identity across every evaluation order', () => {
    for (const stress of R154_STRESS_CASES) {
      const variants = R154_ORDER_VARIANTS.filter(
        (item) => item.caseId === stress.caseId,
      );

      expect(variants).toHaveLength(6);
      expect(
        new Set(variants.map((item) => item.evaluationOrder.join('|'))).size,
      ).toBe(6);
      expect(
        new Set(variants.map((item) => item.canonicalOperationSetKey)).size,
      ).toBe(1);
      expect(
        new Set(variants.map((item) => item.canonicalSourceRefSetKey)).size,
      ).toBe(1);
      expect(
        variants.every(
          (item) =>
            item.unresolvedDayunMethodologyPreserved ===
            stress.unresolvedDayunMethodologyExpected,
        ),
      ).toBe(true);
    }
  });

  it('does not leak input or evaluation order into precedence, causality, severity, or events', () => {
    for (const item of R154_ORDER_VARIANTS) {
      expect(item.semanticWinner).toBeNull();
      expect(item.semanticPrecedenceRelation).toBeNull();
      expect(item.causalOrderInference).toBeNull();
      expect(item.eventPrediction).toBeNull();
      expect(item.relationSeverity).toBeNull();
      expect(item.firstMatchApplied).toBe(false);
      expect(item.lastAppliedWinsApplied).toBe(false);
      expect(item.sequentialMutationApplied).toBe(false);
      expect(item.numericTemporalLayerWeightApplied).toBe(false);
      expect(item.executable).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('propagates unresolved Dayun methodology without selecting a hidden winner', () => {
    const unresolvedCaseIds = R154_STRESS_CASES.filter(
      (item) => item.unresolvedDayunMethodologyExpected,
    ).map((item) => item.caseId);

    expect(unresolvedCaseIds).toEqual([
      'R154-C02',
      'R154-C04',
      'R154-C06',
    ]);

    for (const item of R154_ORDER_VARIANTS.filter((variant) =>
      unresolvedCaseIds.includes(variant.caseId),
    )) {
      expect(item.unresolvedDayunMethodologyPreserved).toBe(true);
      expect(item.dayunMethodSelection).toBeNull();
    }
  });

  it('keeps all upstream governance guards closed to executable settlement', () => {
    expect(R154_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(R154_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R154_GOVERNANCE_GUARDS) {
      expect(guard.semanticPrecedenceAuthorized).toBe(false);
      expect(guard.executableSettlementAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds the R141/R148/R151/R152/R153 boundaries explicitly', () => {
    expect(R154_UPSTREAM_BINDINGS.r141).toMatchObject({
      inputEnumerationOrderInvariantRepresentationObserved: true,
      globalRelationPrecedenceAuthorized: false,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
    });

    expect(R154_UPSTREAM_BINDINGS.r148).toMatchObject({
      sourceOrMethodScopeDivergenceObserved: true,
      directionalityDistinctFromPrecedenceObserved: true,
      globalInteractionPrecedenceAuthorized: false,
      totalRelationOrderAuthorized: false,
      executablePrecedenceResolverAuthorized: false,
    });

    expect(R154_UPSTREAM_BINDINGS.r151).toMatchObject({
      natalBaselineDistinctFromTemporalOverlayObserved: true,
      dayunMeaningDependsOnNatalContextObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      deterministicTemporalEventAuthorized: false,
      numericTemporalWeightAuthorized: false,
    });

    expect(R154_UPSTREAM_BINDINGS.r152).toMatchObject({
      methodologyFormulationVarianceObserved: true,
      methodWinnerResolverAuthorized: false,
      fiveYearStemBranchAssignmentAuthorized: false,
      automaticCanonicalMethodSelectionAuthorized: false,
      executableDayunWeightingResolverAuthorized: false,
    });

    expect(R154_UPSTREAM_BINDINGS.r153).toMatchObject({
      natalAnnualCompositionRequirementObserved: true,
      dayunAnnualCompositionRequirementObserved: true,
      crossLayerMeetingCombinationCheckObserved: true,
      crossLayerPunishmentClashCheckObserved: true,
      unresolvedDayunMethodologyPropagatedObserved: true,
      crossLayerPrecedenceResolverAuthorized: false,
      deterministicAnnualEventAuthorized: false,
      executableAnnualCompositionResolverAuthorized: false,
    });
  });

  it('rejects temporal ordering shortcuts explicitly', () => {
    expect(R154_REJECTED_ORDERING_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'LATER_TEMPORAL_LAYER_AUTOMATICALLY_WINS',
        'ANNUAL_ALWAYS_OVERRIDES_DAYUN',
        'DAYUN_ALWAYS_OVERRIDES_ANNUAL',
        'INPUT_ARRAY_ORDER_AS_TEMPORAL_PRECEDENCE',
        'EVALUATION_ORDER_AS_CAUSAL_ORDER',
        'FIRST_MATCHING_RELATION_WINS',
        'LAST_APPLIED_RELATION_WINS',
        'SEQUENTIAL_MUTATION_CREATES_AUTHORITY',
        'NUMERIC_TEMPORAL_LAYER_WEIGHT',
        'RELATION_COUNT_AS_SEVERITY',
        'RELATION_CHECK_ORDER_AS_SEMANTIC_PRIORITY',
      ]),
    );
  });

  it('keeps R154 research-only and non-authoritative', () => {
    expect(R154_AUTHORITY).toMatchObject({
      researchOnly: true,
      inputLayerOrderInvariantRepresentationObserved: true,
      evaluationOrderDistinctFromSemanticPrecedenceObserved: true,
      sameRelationSetOrderInvariantRepresentationObserved: true,
      annualDayunRelationCoexistenceObserved: true,
      annualNatalRelationCoexistenceObserved: true,
      unresolvedDayunMethodologyPropagationObserved: true,
      relationCheckOrderInvariantRepresentationObserved: true,
      laterTemporalLayerWinsAuthorized: false,
      annualAlwaysOverridesDayunAuthorized: false,
      dayunAlwaysOverridesAnnualAuthorized: false,
      inputOrderAsSemanticPrecedenceAuthorized: false,
      evaluationOrderAsCausalOrderAuthorized: false,
      firstMatchWinsAuthorized: false,
      lastAppliedWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      numericTemporalLayerWeightAuthorized: false,
      relationCountAsSeverityAuthorized: false,
      dayunMethodWinnerResolverAuthorized: false,
      deterministicTemporalEventAuthorized: false,
      executableTemporalSettlementAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
