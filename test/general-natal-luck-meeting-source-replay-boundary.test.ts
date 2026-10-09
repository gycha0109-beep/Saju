import { describe, expect, it } from 'vitest';

import {
  R161_AUTHORITY,
  R161_EXACT_SOURCE_REPLAY_CONTRACT,
  R161_GOVERNANCE_GUARDS,
  R161_NATAL_LUCK_MEETING_SOURCE_FIXTURE,
  R161_NATAL_LUCK_MEETING_SOURCE_REPLAY_VERSION,
  R161_REMOVAL_VARIANTS,
  R161_REJECTED_SHORTCUTS,
  R161_REPLAY_PREDICATES,
  R161_SUMMARY,
  R161_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-luck-meeting-source-replay-boundary.js';

describe('R161 natal-luck meeting source-replay boundary', () => {
  it('binds the direct meeting source fixture without deriving a matcher', () => {
    expect(R161_NATAL_LUCK_MEETING_SOURCE_REPLAY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R161_NATAL_LUCK_MEETING_SOURCE_FIXTURE).toMatchObject({
      sourceRepresentation: '命與運二支會局，亦作清論',
      provenanceKind: 'DIRECT_QUOTE',
      natalBranchParticipantAsserted: true,
      luckBranchParticipantAsserted: true,
      meetingConfigurationAsserted: true,
      meetingConfigurationDerivedByR161: false,
      meetingMatcherAuthorized: false,
      perMemberActivationAuthorized: false,
      runtimeActivationFactAuthorized: false,
      eventAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('decomposes five replay gates with no meeting or activation sufficiency', () => {
    expect(R161_REPLAY_PREDICATES.map((item) => item.predicateId)).toEqual([
      'DIRECT_NATAL_LUCK_MEETING_SOURCE_PHRASE_BOUND',
      'NATAL_BRANCH_PARTICIPANT_ASSERTED',
      'LUCK_BRANCH_PARTICIPANT_ASSERTED',
      'MEETING_CONFIGURATION_ASSERTED_AS_SOURCE_FIXTURE',
      'SOURCE_BOUNDED_QING_OBSERVATION_BOUND',
    ]);
    expect(R161_SUMMARY).toEqual({
      replayPredicateCount: 5,
      removalVariantCount: 5,
      removalBlocksExactSourceReplayCount: 5,
      branchMeetingMatcherEstablishedPredicateCount: 0,
      semanticNecessityEstablishedPredicateCount: 0,
      activationSufficiencyEstablishedPredicateCount: 0,
      runtimeActivationAuthorizedPredicateCount: 0,
      governanceGuardCount: 6,
    });
  });

  it('fails closed for source replay when any gate is removed', () => {
    expect(R161_REMOVAL_VARIANTS).toHaveLength(5);
    for (const variant of R161_REMOVAL_VARIANTS) {
      expect(variant.retainedPredicateIds).toHaveLength(4);
      expect(variant.exactSourceReplayEligible).toBe(false);
      expect(variant.sourceObservationNegated).toBe(false);
      expect(variant.semanticOppositeEstablished).toBe(false);
      expect(variant.branchMeetingMatcherEstablished).toBe(false);
      expect(variant.activationSufficiencyEstablished).toBe(false);
      expect(variant.runtimeActivationFactAuthorized).toBe(false);
    }
  });

  it('keeps full source replay observational rather than executable', () => {
    expect(R161_EXACT_SOURCE_REPLAY_CONTRACT).toMatchObject({
      exactSourceReplayEligible: true,
      sourceBoundedInteractionObserved: true,
      sourceActivationLanguageObserved: true,
      branchMeetingMatcherEstablished: false,
      meetingSufficiencyEstablished: false,
      semanticNecessityEstablished: false,
      temporalActivationSufficiencyEstablished: false,
      perMemberActivationAuthorized: false,
      runtimeActivationFactAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
      effectiveForceAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('keeps all governance guards satisfied', () => {
    expect(R161_GOVERNANCE_GUARDS).toHaveLength(6);
    expect(R161_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);
  });

  it('preserves upstream authority gaps', () => {
    expect(R161_UPSTREAM_BINDINGS.r060).toMatchObject({
      meetingDistinctFromTouGan: true,
      genericInteractionActivationAuthorized: false,
    });
    expect(R161_UPSTREAM_BINDINGS.r073).toMatchObject({
      sourceRepresentation: '命與運二支會局，亦作清論',
      activationImpliesConcreteEvent: false,
    });
    expect(R161_UPSTREAM_BINDINGS.r146).toMatchObject({
      sourceBoundedInteractionObserved: true,
      sourceActivationLanguageObserved: true,
      runtimeActivationFactAuthorized: false,
    });
    expect(R161_UPSTREAM_BINDINGS.r157).toMatchObject({
      natalLuckMeetingActivationClassObserved: true,
      triggerPredicateAuthorized: false,
    });
    expect(R161_UPSTREAM_BINDINGS.r159).toMatchObject({
      temporalTriggerSufficiencyGapPreserved: true,
      exactTemporalTriggerMinimalPredicateSetEstablished: false,
    });
    expect(R161_UPSTREAM_BINDINGS.r160).toMatchObject({
      sourceReplayDistinctFromSemanticNecessityObserved: true,
      sourceReplayDistinctFromActivationSufficiencyObserved: true,
    });
  });

  it('rejects meeting-replay shortcuts', () => {
    expect(R161_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'NATAL_BRANCH_PLUS_LUCK_BRANCH_EQUALS_MEETING',
        'MEETING_ASSERTION_EQUALS_MEETING_MATCHER',
        'MEETING_SOURCE_REPLAY_EQUALS_TEMPORAL_ACTIVATION_SUFFICIENCY',
        'MEETING_ACTIVATES_EACH_HIDDEN_STEM',
        'QING_LANGUAGE_EQUALS_FIXED_FAVORABLE_POLARITY',
        'QING_LANGUAGE_EQUALS_DETERMINISTIC_EVENT',
      ]),
    );
  });

  it('keeps R161 research-only and non-authoritative', () => {
    expect(R161_AUTHORITY).toMatchObject({
      researchOnly: true,
      directMeetingSourceFixtureBound: true,
      exactSourceReplayPredicateSetEstablished: true,
      exactSourceReplayGateRemovalAuditEstablished: true,
      sourceReplayDistinctFromMeetingMatchingObserved: true,
      sourceReplayDistinctFromSemanticNecessityObserved: true,
      sourceReplayDistinctFromActivationSufficiencyObserved: true,
      branchMeetingMatcherEstablished: false,
      meetingSufficiencyEstablished: false,
      semanticPredicateNecessityEstablished: false,
      exactTemporalActivationSufficiencyEstablished: false,
      perMemberActivationResolverAuthorized: false,
      runtimeActivationFactAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
      effectiveForceAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
