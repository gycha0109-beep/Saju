import { describe, expect, it } from 'vitest';

import {
  R158_AUTHORITY,
  R158_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_VERSION,
  R158_GOVERNANCE_GUARDS,
  R158_ORDER_VARIANTS,
  R158_REJECTED_SETTLEMENT_SHORTCUTS,
  R158_SUMMARY,
  R158_TRIGGER_SET_CASES,
  R158_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-competing-temporal-trigger-coexistence-boundary-corpus.js';

describe('R158 competing temporal trigger coexistence boundary corpus', () => {
  it('pins six trigger sets and all sixteen order variants', () => {
    expect(R158_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R158_TRIGGER_SET_CASES).toHaveLength(6);
    expect(R158_ORDER_VARIANTS).toHaveLength(16);
    expect(R158_SUMMARY).toEqual({
      triggerSetCaseCount: 6,
      orderVariantCount: 16,
      twoTriggerCaseCount: 5,
      threeTriggerCaseCount: 1,
      sameSemanticInputSetVariantCount: 16,
      triggerWinnerAuthorizedCount: 0,
      triggerPrecedenceAuthorizedCount: 0,
      firstMatchWinsAuthorizedCount: 0,
      lastMatchWinsAuthorizedCount: 0,
      sequentialMutationAuthorizedCount: 0,
      triggerCountAsSeverityAuthorizedCount: 0,
      numericTriggerWeightAuthorizedCount: 0,
      executableTriggerSettlementAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 4,
    });
  });

  it('preserves canonical trigger-set identity across every permutation', () => {
    for (const item of R158_TRIGGER_SET_CASES) {
      const variants = R158_ORDER_VARIANTS.filter(
        (variant) => variant.caseId === item.caseId,
      );
      const expectedVariantCount =
        item.triggerClasses.length === 3 ? 6 : 2;

      expect(variants).toHaveLength(expectedVariantCount);
      expect(
        new Set(variants.map((variant) => variant.canonicalTriggerSetKey)),
      ).toEqual(new Set([item.canonicalTriggerSetKey]));

      for (const variant of variants) {
        expect(variant.sameSemanticInputSet).toBe(true);
        expect(variant.orderDoesNotImplyPrecedence).toBe(true);
        expect(variant.firstMatchWinsApplied).toBe(false);
        expect(variant.lastMatchWinsApplied).toBe(false);
        expect(variant.sequentialMutationApplied).toBe(false);
        expect(variant.semanticWinner).toBeNull();
        expect(variant.semanticPrecedenceRelation).toBeNull();
        expect(variant.causalOrderInference).toBeNull();
        expect(variant.eventPrediction).toBeNull();
        expect(variant.relationSeverity).toBeNull();
        expect(variant.executable).toBe(false);
      }
    }
  });

  it('keeps every competing trigger set non-authoritative', () => {
    for (const item of R158_TRIGGER_SET_CASES) {
      expect(item.coexistenceObserved).toBe(true);
      expect(item.matchingGapsPreserved).toBe(true);
      expect(item.settlementGapPreserved).toBe(true);
      expect(item.sourceBoundedRelationAnalogyOnly).toBe(true);
      expect(item.triggerWinnerAuthorized).toBe(false);
      expect(item.triggerPrecedenceAuthorized).toBe(false);
      expect(item.firstMatchWinsAuthorized).toBe(false);
      expect(item.lastMatchWinsAuthorized).toBe(false);
      expect(item.sequentialMutationAuthorized).toBe(false);
      expect(item.triggerCountAsSeverityAuthorized).toBe(false);
      expect(item.numericTriggerWeightAuthorized).toBe(false);
      expect(item.automaticBreakRescueSettlementAuthorized).toBe(false);
      expect(item.automaticCounterforceSettlementAuthorized).toBe(false);
      expect(item.fixedPolarityAuthorized).toBe(false);
      expect(item.deterministicEventAuthorized).toBe(false);
      expect(item.executableTriggerSettlementAuthorized).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('retains break/rescue/counterforce coexistence without a winner', () => {
    const threeWay = R158_TRIGGER_SET_CASES.find(
      (item) => item.triggerSetId === 'BREAK_RESCUE_COUNTERFORCE',
    );

    expect(threeWay).toMatchObject({
      triggerClasses: [
        'BREAK_TRIGGER',
        'NATAL_RESCUE_TRIGGER',
        'COUNTERFORCE_TRIGGER',
      ],
      coexistenceObserved: true,
      triggerWinnerAuthorized: false,
      triggerPrecedenceAuthorized: false,
      triggerCountAsSeverityAuthorized: false,
      numericTriggerWeightAuthorized: false,
      executableTriggerSettlementAuthorized: false,
    });
  });

  it('keeps all upstream governance guards satisfied', () => {
    expect(R158_GOVERNANCE_GUARDS).toHaveLength(4);
    expect(R158_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R158_GOVERNANCE_GUARDS) {
      expect(guard.triggerSettlementAuthorized).toBe(false);
      expect(guard.semanticPrecedenceAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds coexistence and order-sensitivity boundaries explicitly', () => {
    expect(R158_UPSTREAM_BINDINGS.r076).toMatchObject({
      breakTriggerMatchingGap: true,
      rescueTriggerMatchingGap: true,
      counterforcePrecedenceGap: true,
      changeSettlementGap: true,
      globalBreakRecoveryToggleAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
    });

    expect(R158_UPSTREAM_BINDINGS.r143).toMatchObject({
      structuralCoexistenceDistinctFromSettlementObserved: true,
      totalRelationPrecedenceAuthorized: false,
      multipleClashAggregationAuthorized: false,
      executableGenericSettlementAuthorized: false,
    });

    expect(R158_UPSTREAM_BINDINGS.r154).toMatchObject({
      inputLayerOrderInvariantRepresentationObserved: true,
      evaluationOrderDistinctFromSemanticPrecedenceObserved: true,
      firstMatchWinsAuthorized: false,
      lastAppliedWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      numericTemporalLayerWeightAuthorized: false,
      relationCountAsSeverityAuthorized: false,
    });

    expect(R158_UPSTREAM_BINDINGS.r157).toMatchObject({
      triggerClassObservationsPreserved: true,
      matchingGapsPreserved: true,
      triggerPredicateAuthorized: false,
      executableTriggerResolverAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
    });
  });

  it('rejects generic trigger settlement shortcuts', () => {
    expect(R158_REJECTED_SETTLEMENT_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'FIRST_TRIGGER_WINS',
        'LAST_TRIGGER_WINS',
        'TRIGGER_ARRAY_ORDER_AS_PRECEDENCE',
        'BREAK_ALWAYS_OVERRIDES_RESCUE',
        'RESCUE_ALWAYS_OVERRIDES_BREAK',
        'COUNTERFORCE_ALWAYS_OVERRIDES_BREAK',
        'MORE_TRIGGERS_MEANS_STRONGER_EFFECT',
        'TRIGGER_COUNT_AS_SEVERITY',
        'NUMERIC_TRIGGER_WEIGHT',
        'SEQUENTIAL_TRIGGER_MUTATION_CREATES_AUTHORITY',
        'COEXISTENCE_EQUALS_DETERMINISTIC_EVENT',
      ]),
    );
  });

  it('keeps R158 research-only and non-authoritative', () => {
    expect(R158_AUTHORITY).toMatchObject({
      researchOnly: true,
      competingTriggerCoexistenceObserved: true,
      orderInvariantTriggerSetRepresentationObserved: true,
      coexistenceDistinctFromSettlementObserved: true,
      triggerEnumerationOrderDistinctFromSemanticPrecedenceObserved: true,
      breakRescueCoexistenceObserved: true,
      breakCounterforceCoexistenceObserved: true,
      rescueCounterforceCoexistenceObserved: true,
      threeWayTriggerCoexistenceObserved: true,
      triggerWinnerAuthorized: false,
      triggerPrecedenceAuthorized: false,
      firstMatchWinsAuthorized: false,
      lastMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      triggerCountAsSeverityAuthorized: false,
      numericTriggerWeightAuthorized: false,
      automaticBreakRescueSettlementAuthorized: false,
      automaticCounterforceSettlementAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableTriggerSettlementAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
