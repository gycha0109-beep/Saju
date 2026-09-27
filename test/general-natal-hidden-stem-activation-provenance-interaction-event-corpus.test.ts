import { describe, expect, it } from 'vitest';

import {
  R146_ACTIVATION_PROVENANCE_CASES,
  R146_AUTHORITY,
  R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
  R146_REJECTED_SHORTCUTS,
  R146_SUMMARY,
  R146_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-hidden-stem-activation-provenance-interaction-event-corpus.js';

describe('R146 hidden-stem activation provenance under interaction events', () => {
  it('pins the deterministic 24-case corpus shape', () => {
    expect(R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R146_SUMMARY).toEqual({
      caseCount: 24,
      r060CaseCount: 4,
      r073CaseCount: 5,
      publicClassicCaseCount: 6,
      i53TopologyCaseCount: 5,
      lowAuthorityControlCount: 4,
      publicClassicDirectCoverageCount: 4,
      publicClassicTargetedGapCount: 2,
      boundedRoleSubstitutionObservedCount: 1,
      temporaryOperativeStateObservedCount: 1,
      evidenceGapCount: 2,
      runtimeActivationFactAuthorizedCount: 0,
      perMemberActivationResolverAuthorizedCount: 0,
      activationPersistenceVerdictAuthorizedCount: 0,
      permanentNatalMutationAuthorizedCount: 0,
      concreteEventAuthorizedCount: 0,
      effectiveForceAuthorizedCount: 0,
      numericActivationWeightAuthorizedCount: 0,
      generalizedRoleReassignmentAuthorizedCount: 0,
      yongXiJiReassignmentAuthorizedCount: 0,
      executableCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('replays all R060 mechanisms without converting interaction to activation', () => {
    const rows = R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.family === 'R060_MECHANISM_REPLAY',
    );
    expect(rows).toHaveLength(4);
    expect(new Set(rows.map((item) => item.upstreamKey)).size).toBe(4);

    const membership = rows.find(
      (item) => item.upstreamKey === 'HIDDEN_MEMBERSHIP',
    );
    expect(membership).toMatchObject({
      provenanceState: 'MEMBERSHIP_ONLY',
      hiddenMembershipState: 'OBSERVED',
      runtimeActivationFactAuthorized: false,
    });

    const manifestation = rows.find(
      (item) => item.upstreamKey === 'STEM_MANIFESTATION_TOU_GAN',
    );
    expect(manifestation).toMatchObject({
      provenanceState: 'MANIFESTATION_DISTINCT_FROM_ACTIVATION',
      manifestationObserved: true,
      runtimeActivationFactAuthorized: false,
    });

    const meeting = rows.find(
      (item) => item.upstreamKey === 'BRANCH_MEETING_CONFIGURATION',
    );
    expect(meeting).toMatchObject({
      provenanceState: 'CONFIGURATION_INTERACTION_ONLY',
      interactionObserved: true,
      perMemberActivationResolverAuthorized: false,
    });

    const clash = rows.find(
      (item) => item.upstreamKey === 'CLASH_MOVEMENT_OR_DISRUPTION',
    );
    expect(clash).toMatchObject({
      provenanceState: 'SOURCE_BOUNDED_INTERACTION',
      interactionObserved: true,
      manifestationObserved: false,
      runtimeActivationFactAuthorized: false,
    });
  });

  it('replays all R073 temporal states while preserving temporary versus permanent boundaries', () => {
    const rows = R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.family === 'R073_TEMPORAL_STATE_REPLAY',
    );
    expect(rows).toHaveLength(5);

    const temporary = rows.find(
      (item) => item.upstreamKey === 'TEMPORARY_OPERATIVE_STATE',
    );
    expect(temporary).toMatchObject({
      provenanceState: 'TEMPORARY_OPERATIVE_STATE_ONLY',
      temporaryOperativeStateObserved: true,
      permanentNatalMutationAuthorized: false,
      concreteEventAuthorized: false,
    });

    const transparency = rows.find(
      (item) => item.upstreamKey === 'ACTIVATED_BY_TRANSPARENCY',
    );
    expect(transparency).toMatchObject({
      provenanceState: 'SOURCE_BOUNDED_ACTIVATION_LANGUAGE',
      manifestationObserved: true,
      sourceActivationLanguageObserved: true,
      boundedRoleSubstitutionObserved: true,
      generalizedRoleReassignmentAuthorized: false,
    });
  });

  it('keeps the public-classic frontier at four direct questions and two targeted gaps', () => {
    const rows = R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.family === 'PUBLIC_CLASSIC_FRONTIER_REPLAY',
    );
    expect(rows).toHaveLength(6);
    expect(
      rows.filter((item) => item.provenanceState === 'EVIDENCE_GAP'),
    ).toHaveLength(2);

    const clash = rows.find(
      (item) =>
        item.upstreamKey === 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION',
    );
    expect(clash).toMatchObject({
      provenanceState: 'SOURCE_BOUNDED_INTERACTION',
      sourceBoundedInteractionObserved: true,
      runtimeActivationFactAuthorized: false,
      effectiveForceAuthorized: false,
      numericActivationWeightAuthorized: false,
    });
  });

  it('replays all I53 contest topology states without activation or persistence verdicts', () => {
    const rows = R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.family === 'I53_CONTEST_TOPOLOGY_REPLAY',
    );
    expect(rows).toHaveLength(5);
    expect(
      rows.every(
        (item) =>
          item.provenanceState === 'TOPOLOGY_ONLY' &&
          item.runtimeActivationFactAuthorized === false &&
          item.activationPersistenceVerdictAuthorized === false &&
          item.effectiveForceAuthorized === false,
      ),
    ).toBe(true);
  });

  it('keeps punishment, harm, break, and generic combination controls below activation authority', () => {
    const rows = R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.family === 'LOW_AUTHORITY_CONTROL',
    );
    expect(rows).toHaveLength(4);
    expect(new Set(rows.map((item) => item.upstreamKey))).toEqual(
      new Set(['COMBINATION_GENERALIZATION', 'PUNISHMENT', 'HARM', 'BREAK']),
    );
    expect(
      rows.every(
        (item) =>
          item.provenanceState === 'LOW_AUTHORITY_BOUNDARY' &&
          item.runtimeActivationFactAuthorized === false &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('rejects activation, permanence, event, force, and role shortcuts', () => {
    expect(R146_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'HIDDEN_MEMBERSHIP_IMPLIES_ACTIVE',
        'CLASH_REVEALS_ALL_HIDDEN_STEMS',
        'CLASH_EQUALS_TOUGAN',
        'MEETING_ACTIVATES_EACH_HIDDEN_STEM',
        'COMBINATION_TOUCH_IMPLIES_ACTIVATED',
        'COMPETING_CLASH_TOUCH_IMPLIES_BROKEN_OR_INACTIVE',
        'PUNISHMENT_REPETITION_INCREASES_HIDDEN_STEM_ACTIVATION',
        'HARM_MEMBERSHIP_ACTIVATES_HIDDEN_STEMS',
        'BREAK_MEMBERSHIP_ACTIVATES_HIDDEN_STEMS',
        'SEASON_OR_PLURALITY_SELECTS_CLASH_HIDDEN_STEM_WINNER',
        'ACTIVATION_IMPLIES_PERMANENT_NATAL_MUTATION',
        'ACTIVATION_IMPLIES_CONCRETE_EVENT',
        'ACTIVATION_IMPLIES_FIXED_POLARITY',
        'ACTIVATION_IMPLIES_YONG_XI_JI_REASSIGNMENT',
        'ACTIVATION_IMPLIES_FIXED_EFFECTIVE_FORCE',
        'HIDDEN_STEM_ARRAY_ORDER_SELECTS_ACTIVATION_PRIORITY',
        'TEMPORARY_LUCK_ACTIVATION_PERSISTS_AFTER_CONTEXT',
      ]),
    );
  });

  it('pins upstream authority boundaries closed', () => {
    expect(R146_UPSTREAM_BINDINGS.r060).toMatchObject({
      mechanismCount: 4,
      hiddenMembershipDistinctFromManifestation: true,
      meetingDistinctFromTouGan: true,
      clashDistinctFromManifestation: true,
      genericInteractionActivationAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R146_UPSTREAM_BINDINGS.r073).toMatchObject({
      stateCount: 5,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R146_UPSTREAM_BINDINGS.gejuHiddenStem).toMatchObject({
      directSourceYinExactTransparencySubstitutionObserved: true,
      directSourceYinRoleGeneralizedBeyondYin: false,
      generalizedMonthOrderHiddenStemSelectionPredicateAuthorized: false,
      candidateDerivationAuthorized: false,
    });
    expect(R146_UPSTREAM_BINDINGS.i53).toMatchObject({
      topologyStateCount: 5,
      directContestTopologyToActivationVerdictAuthorized: false,
      directContestTopologyToPersistenceVerdictAuthorized: false,
      numericSupportWeightingAuthorized: false,
    });
    expect(R146_UPSTREAM_BINDINGS.publicClassic).toMatchObject({
      researchQuestionCount: 6,
      adequacyRequirementCount: 8,
      universalHiddenStemInteractionAuthorized: false,
      arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
      numericSeasonWeightAuthorized: false,
      numericPluralityWeightAuthorized: false,
      numericPositionWeightAuthorized: false,
      damageMagnitudeAuthorized: false,
      productionPromotionAuthorized: false,
    });
    expect(R146_UPSTREAM_BINDINGS.lowAuthority).toMatchObject({
      punishmentProductionAuthorityPromoted: false,
      harmBreakProductionAuthorityPromoted: false,
      punishmentRelationEffectResolverAuthorized: false,
      harmBreakConflictSettlementAuthorized: false,
    });
  });

  it('keeps every runtime and production authority closed', () => {
    expect(
      R146_ACTIVATION_PROVENANCE_CASES.every(
        (item) =>
          item.runtimeActivationFactAuthorized === false &&
          item.perMemberActivationResolverAuthorized === false &&
          item.activationPersistenceVerdictAuthorized === false &&
          item.permanentNatalMutationAuthorized === false &&
          item.concreteEventAuthorized === false &&
          item.effectiveForceAuthorized === false &&
          item.fixedPolarityAuthorized === false &&
          item.numericActivationWeightAuthorized === false &&
          item.generalizedRoleReassignmentAuthorized === false &&
          item.yongXiJiReassignmentAuthorized === false &&
          item.chartRoleFactEmissionAuthorized === false &&
          item.automaticEngineAdmissionAuthorized === false &&
          item.interpretationClaimEmissionAuthorized === false &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R146_AUTHORITY).toMatchObject({
      researchOnly: true,
      r060MechanismsReplayed: true,
      r073TemporalStatesReplayed: true,
      publicClassicFrontierQuestionsReplayed: true,
      i53ContestTopologiesReplayed: true,
      lowAuthorityInteractionControlsReplayed: true,
      hiddenMembershipDistinctFromActivationObserved: true,
      manifestationDistinctFromActivationObserved: true,
      configurationInteractionDistinctFromPerMemberActivationObserved: true,
      sourceBoundedInteractionDistinctFromRuntimeActivationObserved: true,
      temporaryOperativeStateDistinctFromPermanentNatalMutationObserved: true,
      boundedRoleSubstitutionDistinctFromGeneralizedReassignmentObserved: true,
      runtimeActivationFactAuthorized: false,
      perMemberActivationResolverAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
      permanentNatalMutationAuthorized: false,
      concreteEventAuthorized: false,
      effectiveForceAuthorized: false,
      fixedPolarityAuthorized: false,
      numericActivationWeightAuthorized: false,
      generalizedRoleReassignmentAuthorized: false,
      yongXiJiReassignmentAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
