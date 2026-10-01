import { describe, expect, it } from 'vitest';

import {
  R157_AUTHORITY,
  R157_GOVERNANCE_GUARDS,
  R157_REJECTED_TRIGGER_SHORTCUTS,
  R157_SUMMARY,
  R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
  R157_TRIGGER_ROWS,
  R157_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-temporal-trigger-matching-provenance-boundary-corpus.js';

describe('R157 temporal trigger-matching provenance boundary corpus', () => {
  it('pins six observed trigger classes plus one negative control', () => {
    expect(R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R157_TRIGGER_ROWS).toHaveLength(7);
    expect(R157_SUMMARY).toEqual({
      rowCount: 7,
      observedTriggerSignalCount: 6,
      configurationSpecificObservedCount: 6,
      negativeControlCount: 1,
      triggerPredicateAuthorizedCount: 0,
      perMemberActivationAuthorizedCount: 0,
      genericInteractionActivationAuthorizedCount: 0,
      automaticStructuralChangeAuthorizedCount: 0,
      automaticBreakAuthorizedCount: 0,
      automaticRescueAuthorizedCount: 0,
      automaticCounterforceAuthorizedCount: 0,
      fixedPolarityAuthorizedCount: 0,
      deterministicEventAuthorizedCount: 0,
      numericTriggerScoreAuthorizedCount: 0,
      executableTriggerResolverAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 6,
    });
  });

  it('preserves trigger classes without emitting executable predicates', () => {
    expect(R157_TRIGGER_ROWS.map((item) => item.triggerClass)).toEqual([
      'TRANSPARENCY_ACTIVATION',
      'NATAL_LUCK_MEETING_ACTIVATION',
      'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      'BREAK_TRIGGER',
      'NATAL_RESCUE_TRIGGER',
      'COUNTERFORCE_TRIGGER',
      'GENERIC_INTERACTION_ACTIVATION_CONTROL',
    ]);

    for (const item of R157_TRIGGER_ROWS) {
      expect(item.matchingGapPreserved).toBe(true);
      expect(item.durationBoundaryPreserved).toBe(true);
      expect(item.triggerPredicateAuthorized).toBe(false);
      expect(item.perMemberActivationAuthorized).toBe(false);
      expect(item.genericInteractionActivationAuthorized).toBe(false);
      expect(item.fixedPolarityAuthorized).toBe(false);
      expect(item.deterministicEventAuthorized).toBe(false);
      expect(item.numericTriggerScoreAuthorized).toBe(false);
      expect(item.executableTriggerResolverAuthorized).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps break, rescue, counterforce, and structural-change settlement closed', () => {
    const structural = R157_TRIGGER_ROWS.find(
      (item) =>
        item.triggerClass === 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
    );
    const breakTrigger = R157_TRIGGER_ROWS.find(
      (item) => item.triggerClass === 'BREAK_TRIGGER',
    );
    const rescue = R157_TRIGGER_ROWS.find(
      (item) => item.triggerClass === 'NATAL_RESCUE_TRIGGER',
    );
    const counterforce = R157_TRIGGER_ROWS.find(
      (item) => item.triggerClass === 'COUNTERFORCE_TRIGGER',
    );

    expect(structural?.automaticStructuralChangeAuthorized).toBe(false);
    expect(breakTrigger?.automaticBreakAuthorized).toBe(false);
    expect(rescue?.automaticRescueAuthorized).toBe(false);
    expect(counterforce?.automaticCounterforceAuthorized).toBe(false);
  });

  it('keeps the generic interaction negative control closed', () => {
    const control = R157_TRIGGER_ROWS.find(
      (item) => item.triggerClass === 'GENERIC_INTERACTION_ACTIVATION_CONTROL',
    );

    expect(control).toMatchObject({
      triggerSignalObserved: false,
      configurationSpecificObserved: false,
      triggerPredicateAuthorized: false,
      perMemberActivationAuthorized: false,
      genericInteractionActivationAuthorized: false,
      executableTriggerResolverAuthorized: false,
    });
  });

  it('keeps all upstream governance guards satisfied', () => {
    expect(R157_GOVERNANCE_GUARDS).toHaveLength(6);
    expect(R157_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R157_GOVERNANCE_GUARDS) {
      expect(guard.triggerPredicateAuthorized).toBe(false);
      expect(guard.executableTriggerResolverAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds trigger-matching and provenance gaps explicitly', () => {
    expect(R157_UPSTREAM_BINDINGS.r060).toMatchObject({
      genericInteractionActivationAuthorized: false,
      executableResolverAuthorized: false,
      hiddenStemRoleSelectionGap: true,
      interactionEventSettlementGap: true,
    });

    expect(R157_UPSTREAM_BINDINGS.r072).toMatchObject({
      luckToNatalInteractionMatchingGap: true,
      changeSufficiencyGap: true,
      executableDayunInteractionResolverAuthorized: false,
    });

    expect(R157_UPSTREAM_BINDINGS.r073).toMatchObject({
      activationTriggerMatchingGap: true,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
    });

    expect(R157_UPSTREAM_BINDINGS.r076).toMatchObject({
      breakTriggerMatchingGap: true,
      rescueTriggerMatchingGap: true,
      counterforcePrecedenceGap: true,
      changeSettlementGap: true,
      globalBreakRecoveryToggleAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
    });

    expect(R157_UPSTREAM_BINDINGS.r146).toMatchObject({
      sourceBoundedInteractionDistinctFromRuntimeActivationObserved: true,
      runtimeActivationFactAuthorized: false,
      perMemberActivationResolverAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
      concreteEventAuthorized: false,
      effectiveForceAuthorized: false,
      fixedPolarityAuthorized: false,
    });

    expect(R157_UPSTREAM_BINDINGS.r156).toMatchObject({
      genericActivationDurationGapPreserved: true,
      breakRescueDurationGapPreserved: true,
      monthlyCalendarBoundaryGapPreserved: true,
      universalFiveYearDurationAuthorized: false,
      executableTimingResolverAuthorized: false,
    });
  });

  it('rejects trigger shortcuts explicitly', () => {
    expect(R157_REJECTED_TRIGGER_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'TRANSPARENCY_ALWAYS_ACTIVATES_EVERY_HIDDEN_MEMBER',
        'NATAL_LUCK_MEETING_ALWAYS_ACTIVATES_EVERY_HIDDEN_MEMBER',
        'ANY_MEETING_OR_CLASH_CAUSES_STRUCTURAL_CHANGE',
        'ONE_RESCUE_SYMBOL_ALWAYS_RESCUES',
        'COUNTERFORCE_PRESENCE_ALWAYS_BLOCKS_CHANGE',
        'INTERACTION_PRESENCE_EQUALS_RUNTIME_ACTIVATION',
        'TRIGGER_CLASS_EQUALS_EXECUTABLE_PREDICATE',
        'TRIGGER_MATCH_EQUALS_FIXED_POLARITY',
        'TRIGGER_MATCH_EQUALS_CONCRETE_EVENT',
        'TRIGGER_SCORE_AS_NUMERIC_WEIGHT',
        'TRIGGER_MATCHING_INHERITS_R073_FIVE_YEAR_DURATION',
      ]),
    );
  });

  it('keeps R157 research-only and non-authoritative', () => {
    expect(R157_AUTHORITY).toMatchObject({
      researchOnly: true,
      triggerClassObservationsPreserved: true,
      transparencyActivationClassObserved: true,
      natalLuckMeetingActivationClassObserved: true,
      dayunMeetingClashStructuralChangeClassObserved: true,
      breakTriggerClassObserved: true,
      natalRescueTriggerClassObserved: true,
      counterforceTriggerClassObserved: true,
      genericInteractionActivationNegativeControlPreserved: true,
      matchingGapsPreserved: true,
      triggerMatchingDistinctFromDurationObserved: true,
      triggerMatchingDistinctFromRuntimeActivationObserved: true,
      triggerPredicateAuthorized: false,
      perMemberActivationResolverAuthorized: false,
      genericInteractionActivationAuthorized: false,
      automaticStructuralChangeAuthorized: false,
      automaticBreakAuthorized: false,
      automaticRescueAuthorized: false,
      automaticCounterforceAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      numericTriggerScoreAuthorized: false,
      executableTriggerResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
