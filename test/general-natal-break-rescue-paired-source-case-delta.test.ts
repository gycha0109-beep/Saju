import { describe, expect, it } from 'vitest';

import {
  R163_AUTHORITY,
  R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION,
  R163_GOVERNANCE_GUARDS,
  R163_PAIRED_CASES,
  R163_PAIRED_TEXTUAL_DELTA,
  R163_REJECTED_SHORTCUTS,
  R163_REMOVAL_VARIANTS,
  R163_REPLAY_GATES,
  R163_SUMMARY,
  R163_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-break-rescue-paired-source-case-delta.js';

describe('R163 break/rescue paired source-case textual delta', () => {
  it('binds the two R076 cases with the shared Ding/Chen/Ren/Wu context', () => {
    expect(R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R163_PAIRED_CASES).toHaveLength(2);
    for (const item of R163_PAIRED_CASES) {
      expect(item.provenanceKind).toBe('PARAPHRASED_SOURCE_CASE');
      expect(item.dingDayContextObserved).toBe(true);
      expect(item.chenMonthContextObserved).toBe(true);
      expect(item.renOfficerTransparencyContextObserved).toBe(true);
      expect(item.wuLuckContextObserved).toBe(true);
      expect(item.natalJiaAbsenceEstablished).toBe(false);
      expect(item.triggerMatchingEstablished).toBe(false);
      expect(item.outcomeSufficiencyEstablished).toBe(false);
      expect(item.settlementEstablished).toBe(false);
      expect(item.automaticOutcomeAuthorized).toBe(false);
    }
  });

  it('records a textual Jia mention delta without inferring absence in the break case', () => {
    expect(R163_PAIRED_TEXTUAL_DELTA).toMatchObject({
      breakCaseJiaMentionState: 'NOT_STATED_IN_RETAINED_BREAK_CASE',
      rescueCaseJiaMentionState:
        'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE',
      rescueCaseJiaPresenceExplicitlyObserved: true,
      breakCaseJiaAbsenceEstablished: false,
      actualChartDifferenceFullyEstablished: false,
      semanticMinimalityEstablished: false,
      rescueSufficiencyEstablished: false,
      rescuePrecedenceEstablished: false,
      changeSettlementEstablished: false,
      automaticRescueAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('decomposes six paired replay gates', () => {
    expect(R163_REPLAY_GATES.map((item) => item.gateId)).toEqual([
      'R076_PAIRED_CASES_BOUND',
      'DING_DAY_CONTEXT_PRESERVED',
      'CHEN_MONTH_CONTEXT_PRESERVED',
      'REN_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED',
      'WU_LUCK_CONTEXT_PRESERVED',
      'NATAL_JIA_TEXTUAL_DELTA_PRESERVED',
    ]);
    expect(R163_SUMMARY).toEqual({
      pairedCaseCount: 2,
      replayGateCount: 6,
      removalVariantCount: 6,
      explicitRescueJiaMentionCount: 1,
      establishedBreakJiaAbsenceCount: 0,
      triggerMatchingEstablishedCount: 0,
      outcomeSufficiencyEstablishedCount: 0,
      governanceGuardCount: 4,
    });
  });

  it('fails closed when any paired-text replay gate is removed', () => {
    expect(R163_REMOVAL_VARIANTS).toHaveLength(6);
    for (const variant of R163_REMOVAL_VARIANTS) {
      expect(variant.retainedGateIds).toHaveLength(5);
      expect(variant.pairedTextReplayEligible).toBe(false);
      expect(variant.textualDeltaNegated).toBe(false);
      expect(variant.semanticOppositeEstablished).toBe(false);
      expect(variant.jiaAbsenceEstablishedInBreakCase).toBe(false);
      expect(variant.rescueSufficiencyEstablished).toBe(false);
      expect(variant.triggerMatchingEstablished).toBe(false);
      expect(variant.settlementEstablished).toBe(false);
    }
  });

  it('keeps upstream guards closed', () => {
    expect(R163_GOVERNANCE_GUARDS).toHaveLength(4);
    expect(R163_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);
    expect(R163_UPSTREAM_BINDINGS.r076).toMatchObject({
      breakProvenanceKind: 'PARAPHRASED_SOURCE_CASE',
      rescueProvenanceKind: 'PARAPHRASED_SOURCE_CASE',
      breakTriggerMatchingGap: true,
      rescueTriggerMatchingGap: true,
      changeSettlementGap: true,
    });
    expect(R163_UPSTREAM_BINDINGS.r157).toMatchObject({
      breakConfigurationSpecificObserved: true,
      rescueConfigurationSpecificObserved: true,
      triggerPredicateAuthorized: false,
    });
    expect(R163_UPSTREAM_BINDINGS.r159).toMatchObject({
      breakBoundedOutcomeSufficiencyEstablished: false,
      rescueBoundedOutcomeSufficiencyEstablished: false,
    });
  });

  it('rejects omission-to-absence and one-symbol-rescue shortcuts', () => {
    expect(R163_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'BREAK_CASE_OMISSION_OF_JIA_EQUALS_JIA_ABSENCE',
        'NATAL_JIA_TEXTUAL_DELTA_EQUALS_SEMANTIC_MINIMALITY',
        'NATAL_JIA_PRESENCE_ALWAYS_RESCUES',
        'ONE_RESCUE_SYMBOL_ALWAYS_WINS',
        'PAIRED_CASE_DELTA_EQUALS_CHANGE_SETTLEMENT',
      ]),
    );
  });

  it('keeps R163 research-only and non-authoritative', () => {
    expect(R163_AUTHORITY).toMatchObject({
      researchOnly: true,
      pairedBreakRescueCasesBound: true,
      sharedDingChenRenWuContextObserved: true,
      rescueCaseNatalJiaMentionObserved: true,
      breakCaseNatalJiaOmissionObserved: true,
      breakCaseNatalJiaAbsenceEstablished: false,
      actualChartDifferenceFullyEstablished: false,
      pairedTextualDeltaEstablished: true,
      pairedTextualDeltaDistinctFromSemanticMinimalityObserved: true,
      pairedTextualDeltaDistinctFromRescueSufficiencyObserved: true,
      semanticMinimalityEstablished: false,
      breakTriggerMatchingEstablished: false,
      rescueTriggerMatchingEstablished: false,
      rescueSufficiencyEstablished: false,
      rescuePrecedenceEstablished: false,
      changeSettlementEstablished: false,
      automaticBreakAuthorized: false,
      automaticRescueAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
