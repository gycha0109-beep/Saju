import { describe, expect, it } from 'vitest';

import {
  R159_AUTHORITY,
  R159_GOVERNANCE_GUARDS,
  R159_R150_POSITIVE_CONTROL,
  R159_REJECTED_SUFFICIENCY_SHORTCUTS,
  R159_SUMMARY,
  R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
  R159_TRIGGER_SUFFICIENCY_ROWS,
  R159_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-temporal-trigger-sufficiency-fail-closed-audit.js';

describe('R159 temporal trigger sufficiency fail-closed audit', () => {
  it('audits six observed trigger classes with zero sufficient outcome contracts', () => {
    expect(R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R159_TRIGGER_SUFFICIENCY_ROWS).toHaveLength(6);
    expect(R159_SUMMARY).toEqual({
      triggerRowCount: 6,
      observedTriggerCount: 6,
      exactMinimalPredicateSetEstablishedCount: 0,
      boundedOutcomeSufficiencyEstablishedCount: 0,
      genericOutcomeSufficiencyEstablishedCount: 0,
      matchingSufficiencyEstablishedCount: 0,
      settlementSufficiencyEstablishedCount: 0,
      automaticOutcomeAuthorizedCount: 0,
      deterministicEventAuthorizedCount: 0,
      executableOutcomeResolverAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 6,
      positiveControlContractCount: 2,
    });
  });

  it('keeps every temporal trigger fail-closed for sufficiency', () => {
    for (const row of R159_TRIGGER_SUFFICIENCY_ROWS) {
      expect(row.triggerObserved).toBe(true);
      expect(row.sufficiencyState).toBe('OBSERVED_TRIGGER_NOT_SUFFICIENT');
      expect(row.exactMinimalPredicateSetEstablished).toBe(false);
      expect(row.boundedOutcomeSufficiencyEstablished).toBe(false);
      expect(row.genericOutcomeSufficiencyEstablished).toBe(false);
      expect(row.matchingSufficiencyEstablished).toBe(false);
      expect(row.settlementSufficiencyEstablished).toBe(false);
      expect(row.automaticOutcomeAuthorized).toBe(false);
      expect(row.fixedPolarityAuthorized).toBe(false);
      expect(row.deterministicEventAuthorized).toBe(false);
      expect(row.executableOutcomeResolverAuthorized).toBe(false);
      expect(row.interpretationClaimEmissionAuthorized).toBe(false);
      expect(row.productionAuthorityPromoted).toBe(false);
      expect(row.blockingGaps.length).toBeGreaterThan(0);
    }
  });

  it('uses R150 only as a bounded positive-control sufficiency standard', () => {
    expect(R159_R150_POSITIVE_CONTROL).toMatchObject({
      sufficiencyState: 'SOURCE_BOUNDED_POSITIVE_CONTROL',
      contractCount: 2,
      exactPredicateContractObserved: true,
      boundedSourceSufficiencyObserved: true,
      boundedEvidenceExecutionAuthorized: true,
      temporalTriggerGeneralizationAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('keeps all upstream governance guards satisfied', () => {
    expect(R159_GOVERNANCE_GUARDS).toHaveLength(6);
    expect(R159_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R159_GOVERNANCE_GUARDS) {
      expect(guard.temporalTriggerSufficiencyAuthorized).toBe(false);
      expect(guard.executableOutcomeResolverAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds unresolved matching, sufficiency, and settlement gaps explicitly', () => {
    expect(R159_UPSTREAM_BINDINGS.r072).toMatchObject({
      completionSufficiencyGap: true,
      changeSufficiencyGap: true,
      temporalEffectSettlementGap: true,
    });
    expect(R159_UPSTREAM_BINDINGS.r073).toMatchObject({
      activationTriggerMatchingGap: true,
      activationImpliesConcreteEvent: false,
    });
    expect(R159_UPSTREAM_BINDINGS.r076).toMatchObject({
      breakTriggerMatchingGap: true,
      rescueTriggerMatchingGap: true,
      counterforcePrecedenceGap: true,
      changeSettlementGap: true,
    });
    expect(R159_UPSTREAM_BINDINGS.r150).toMatchObject({
      boundedSourceSufficiencyObserved: true,
      genericInteractionResolverAuthorized: false,
    });
    expect(R159_UPSTREAM_BINDINGS.r157).toMatchObject({
      triggerClassObservationsPreserved: true,
      triggerPredicateAuthorized: false,
      executableTriggerResolverAuthorized: false,
    });
    expect(R159_UPSTREAM_BINDINGS.r158).toMatchObject({
      coexistenceDistinctFromSettlementObserved: true,
      triggerWinnerAuthorized: false,
      executableTriggerSettlementAuthorized: false,
    });
  });

  it('rejects sufficiency shortcuts', () => {
    expect(R159_REJECTED_SUFFICIENCY_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'OBSERVED_TRIGGER_EQUALS_SUFFICIENT_OUTCOME',
        'DIRECT_QUOTE_EQUALS_EXECUTABLE_SUFFICIENCY',
        'SOURCE_CASE_EQUALS_GENERIC_PREDICATE_CONTRACT',
        'MEETING_OR_CLASH_EQUALS_SUFFICIENT_STRUCTURAL_CHANGE',
        'BREAK_TRIGGER_EQUALS_SUFFICIENT_BREAK_OUTCOME',
        'RESCUE_TRIGGER_EQUALS_SUFFICIENT_RESCUE_OUTCOME',
        'COUNTERFORCE_PRESENCE_EQUALS_SUFFICIENT_BLOCKING_OUTCOME',
        'R150_BOUNDED_CONTRACT_GENERALIZES_TO_TEMPORAL_TRIGGERS',
        'SUFFICIENCY_EQUALS_DETERMINISTIC_EVENT',
      ]),
    );
  });

  it('keeps R159 research-only and non-authoritative', () => {
    expect(R159_AUTHORITY).toMatchObject({
      researchOnly: true,
      observedTriggerClassesAudited: true,
      boundedSufficiencyStandardPositiveControlObserved: true,
      temporalTriggerSufficiencyGapPreserved: true,
      matchingDistinctFromSufficiencyObserved: true,
      coexistenceDistinctFromSufficiencyObserved: true,
      sourceCaseDistinctFromPredicateContractObserved: true,
      exactTemporalTriggerMinimalPredicateSetEstablished: false,
      boundedTemporalTriggerOutcomeSufficiencyEstablished: false,
      genericTemporalTriggerOutcomeSufficiencyEstablished: false,
      automaticActivationOutcomeAuthorized: false,
      automaticStructuralChangeOutcomeAuthorized: false,
      automaticBreakOutcomeAuthorized: false,
      automaticRescueOutcomeAuthorized: false,
      automaticCounterforceOutcomeAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableTemporalTriggerOutcomeResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
