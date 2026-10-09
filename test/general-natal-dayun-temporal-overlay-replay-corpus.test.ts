import { describe, expect, it } from 'vitest';

import {
  R151_AUTHORITY,
  R151_GOVERNANCE_GUARDS,
  R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
  R151_R072_REPLAY_ROWS,
  R151_R073_REPLAY_ROWS,
  R151_R076_REPLAY_ROWS,
  R151_REJECTED_TEMPORAL_SHORTCUTS,
  R151_SUMMARY,
  R151_TEMPORAL_REPLAY_ROWS,
  R151_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-dayun-temporal-overlay-replay-corpus.js';

describe('R151 natal-Dayun temporal overlay replay corpus', () => {
  it('pins the deterministic 15-row replay shape', () => {
    expect(R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R151_R072_REPLAY_ROWS).toHaveLength(5);
    expect(R151_R073_REPLAY_ROWS).toHaveLength(5);
    expect(R151_R076_REPLAY_ROWS).toHaveLength(5);
    expect(R151_TEMPORAL_REPLAY_ROWS).toHaveLength(15);

    expect(R151_SUMMARY).toEqual({
      rowCount: 15,
      r072ReplayCount: 5,
      r073ReplayCount: 5,
      r076ReplayCount: 5,
      governanceGuardCount: 4,
      natalBaselineRowCount: 1,
      temporalOverlayObservedCount: 13,
      explicitReturnToBaselineObservedCount: 1,
      contextDependenceObservedCount: 12,
      permanentNatalMutationAuthorizedCount: 0,
      automaticRoleReassignmentAuthorizedCount: 0,
      fixedPolarityAuthorizedCount: 0,
      deterministicEventAuthorizedCount: 0,
      numericTemporalWeightAuthorizedCount: 0,
      genericTemporalTransitionAuthorizedCount: 0,
      executableTemporalResolverAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('preserves the natal baseline separately from Dayun overlays', () => {
    expect(
      R151_TEMPORAL_REPLAY_ROWS.every(
        (item) => item.baselineLayerIdentityPreserved,
      ),
    ).toBe(true);

    const natalLatent = R151_R073_REPLAY_ROWS.find(
      (item) => item.sourceKey === 'NATAL_LATENT',
    );
    expect(natalLatent).toMatchObject({
      temporalStateClass: 'NATAL_BASELINE',
      temporalOverlayObserved: false,
      permanentNatalMutationAuthorized: false,
    });
  });

  it('keeps the temporary operative state explicit and reversible at the represented boundary', () => {
    const temporary = R151_R073_REPLAY_ROWS.find(
      (item) => item.sourceKey === 'TEMPORARY_OPERATIVE_STATE',
    );
    expect(temporary).toMatchObject({
      temporalStateClass: 'TEMPORARY_OPERATIVE_OVERLAY',
      temporalOverlayObserved: true,
      explicitReturnToBaselineObserved: true,
      permanentNatalMutationAuthorized: false,
      deterministicEventAuthorized: false,
    });
  });

  it('replays completion, structural change, and natal block/rescue without global settlement', () => {
    expect(
      R151_R072_REPLAY_ROWS.map((item) => item.temporalStateClass),
    ).toEqual([
      'DAYUN_COMPLETION_OVERLAY',
      'DAYUN_HIDDEN_EXPOSURE_OVERLAY',
      'DAYUN_STRUCTURAL_CHANGE_OVERLAY',
      'DAYUN_NATAL_BLOCK_RESCUE_OVERLAY',
      'MECHANISM_CLASS_BOUNDARY',
    ]);

    expect(
      R151_R072_REPLAY_ROWS.every(
        (item) =>
          item.executableTemporalResolverAuthorized === false &&
          item.fixedPolarityAuthorized === false &&
          item.permanentNatalMutationAuthorized === false,
      ),
    ).toBe(true);
  });

  it('preserves break, rescue, counterforce, and polarity boundaries from R076', () => {
    expect(
      R151_R076_REPLAY_ROWS.map((item) => item.temporalStateClass),
    ).toEqual([
      'BREAK_TRIGGER_OVERLAY',
      'RESCUE_OVERLAY',
      'COUNTERFORCE_OVERLAY',
      'POLARITY_BOUNDARY',
      'POLARITY_BOUNDARY',
    ]);

    expect(
      R151_R076_REPLAY_ROWS.every(
        (item) =>
          item.contextDependenceObserved === true &&
          item.permanentNatalMutationAuthorized === false &&
          item.fixedPolarityAuthorized === false,
      ),
    ).toBe(true);
  });

  it('pins four upstream governance guards', () => {
    expect(R151_GOVERNANCE_GUARDS).toHaveLength(4);
    expect(
      R151_GOVERNANCE_GUARDS.every(
        (item) =>
          item.satisfied === true &&
          item.temporalResolverAuthorized === false &&
          item.permanentNatalMutationAuthorized === false &&
          item.eventPredictionAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('keeps role reassignment separate from temporal interaction', () => {
    expect(R151_UPSTREAM_BINDINGS.r136).toMatchObject({
      natalRoleTemporalInteractionSeparationObserved: true,
      latentActivationDistinctFromRoleReassignmentObserved: true,
      automaticTemporalYongshenReselectionAuthorized: false,
      temporalRoleReassignmentResolverAuthorized: false,
      permanentNatalRoleMutationAuthorized: false,
      temporalEventPredictionAuthorized: false,
    });
  });

  it('pins upstream temporal authority closed', () => {
    expect(R151_UPSTREAM_BINDINGS.r072).toMatchObject({
      interactionClassCount: 5,
      independentLuckScoreAuthorized: false,
      sameLuckSameOutcomeAuthorized: false,
      executableDayunInteractionResolverAuthorized: false,
    });
    expect(R151_UPSTREAM_BINDINGS.r073).toMatchObject({
      stateCount: 5,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
    });
    expect(R151_UPSTREAM_BINDINGS.r076).toMatchObject({
      caseCount: 5,
      globalBreakRecoveryToggleAuthorized: false,
      permanentNatalMutationAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
    });
  });

  it('rejects temporal shortcuts that collapse overlay into natal mutation or event prediction', () => {
    expect(R151_REJECTED_TEMPORAL_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'DAYUN_ELEMENT_ALONE_DETERMINES_OUTCOME',
        'SAME_DAYUN_SAME_RESULT_ACROSS_CHARTS',
        'TEMPORAL_ACTIVATION_EQUALS_PERMANENT_NATAL_MUTATION',
        'TEMPORAL_COMPLETION_EQUALS_PERMANENT_NATAL_COMPLETION',
        'TEMPORAL_STRUCTURAL_CHANGE_EQUALS_PERMANENT_NATAL_REWRITE',
        'PATTERN_BREAK_EQUALS_PERMANENT_NATAL_BREAK',
        'TEMPORAL_RESCUE_EQUALS_PERMANENT_NATAL_REPAIR',
        'ACTIVATION_EQUALS_CONCRETE_EVENT',
        'COMPLETION_EQUALS_FAVORABLE',
        'STRUCTURAL_CHANGE_EQUALS_HARMFUL',
        'EVERY_DAYUN_RESELECTS_YONGSHEN',
        'TEMPORAL_SUPPORT_EQUALS_ROLE_REASSIGNMENT',
        'TEMPORAL_OPPOSITION_EQUALS_ROLE_REASSIGNMENT',
        'LATENT_ACTIVATION_EQUALS_ROLE_REASSIGNMENT',
        'POSITION_CONTEXT_EQUALS_GLOBAL_TEMPORAL_WEIGHT',
        'NUMERIC_TEMPORAL_SCORE',
        'TEMPORAL_OVERLAY_AS_INTERPRETATION_CLAIM_AUTHORITY',
      ]),
    );
  });

  it('keeps generic temporal execution and production authority closed', () => {
    expect(
      R151_TEMPORAL_REPLAY_ROWS.every(
        (item) =>
          item.permanentNatalMutationAuthorized === false &&
          item.automaticRoleReassignmentAuthorized === false &&
          item.fixedPolarityAuthorized === false &&
          item.deterministicEventAuthorized === false &&
          item.numericTemporalWeightAuthorized === false &&
          item.genericTemporalTransitionAuthorized === false &&
          item.executableTemporalResolverAuthorized === false &&
          item.interpretationClaimEmissionAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R151_AUTHORITY).toMatchObject({
      researchOnly: true,
      natalBaselineDistinctFromTemporalOverlayObserved: true,
      dayunMeaningDependsOnNatalContextObserved: true,
      latentStateDistinctFromActivatedStateObserved: true,
      temporaryOperativeStateObserved: true,
      explicitReturnToBaselineObserved: true,
      breakRescueContextDependenceObserved: true,
      temporalStructuralChangeDistinctFromPermanentNatalMutationObserved: true,
      temporalActivationDistinctFromPermanentNatalMutationObserved: true,
      temporalInteractionDistinctFromRoleReassignmentObserved: true,
      completionChangeDistinctFromPolarityObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      permanentNatalMutationAuthorized: false,
      automaticTemporalRoleReassignmentAuthorized: false,
      fixedTemporalPolarityAuthorized: false,
      deterministicTemporalEventAuthorized: false,
      numericTemporalWeightAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
