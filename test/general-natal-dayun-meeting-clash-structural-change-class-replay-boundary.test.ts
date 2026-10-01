import { describe, expect, it } from 'vitest';

import {
  R162_AUTHORITY,
  R162_CLASS_FIXTURE,
  R162_CLASS_REPLAY_CONTRACT,
  R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION,
  R162_GOVERNANCE_GUARDS,
  R162_RELATION_VARIANTS,
  R162_REMOVAL_VARIANTS,
  R162_REJECTED_SHORTCUTS,
  R162_REPLAY_PREDICATES,
  R162_SUMMARY,
  R162_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-dayun-meeting-clash-structural-change-class-replay-boundary.js';

describe('R162 Dayun meeting/clash structural-change class replay boundary', () => {
  it('binds the R072 paraphrased class without upgrading source authority', () => {
    expect(
      R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION,
    ).toBe('0.1.0-research');
    expect(R162_CLASS_FIXTURE).toMatchObject({
      upstreamKey: 'LUCK-MEETING-CLASH-STRUCTURAL-CHANGE',
      provenanceKind: 'PARAPHRASED_SOURCE_CLASS',
      paraphrasedSourceClassBound: true,
      directQuoteAuthorityEstablished: false,
      interactionMatchingDerivedByR162: false,
      changeSufficiencyDerivedByR162: false,
      automaticStructuralChangeAuthorized: false,
      permanentNatalMutationAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('preserves separate meeting and clash replay variants', () => {
    expect(R162_RELATION_VARIANTS).toEqual([
      expect.objectContaining({
        relationMode: 'MEETING_ASSERTED',
        relationAssertionObserved: true,
        relationDerivedByR162: false,
        classReplayEligible: true,
        structuralChangeOutcomeEstablished: false,
      }),
      expect.objectContaining({
        relationMode: 'CLASH_ASSERTED',
        relationAssertionObserved: true,
        relationDerivedByR162: false,
        classReplayEligible: true,
        structuralChangeOutcomeEstablished: false,
      }),
    ]);
  });

  it('decomposes five class-replay gates without matching or change sufficiency', () => {
    expect(R162_REPLAY_PREDICATES).toHaveLength(5);
    expect(R162_SUMMARY).toEqual({
      relationVariantCount: 2,
      replayPredicateCount: 5,
      removalVariantCount: 10,
      directQuoteAuthorityEstablishedPredicateCount: 0,
      interactionMatcherEstablishedPredicateCount: 0,
      changeSufficiencyEstablishedPredicateCount: 0,
      structuralChangeOutcomeEstablishedVariantCount: 0,
      governanceGuardCount: 4,
    });

    for (const item of R162_REPLAY_PREDICATES) {
      expect(item.requiredForClassReplay).toBe(true);
      expect(item.removalBlocksClassReplay).toBe(true);
      expect(item.directQuoteAuthorityEstablished).toBe(false);
      expect(item.interactionMatcherEstablished).toBe(false);
      expect(item.semanticNecessityEstablished).toBe(false);
      expect(item.changeSufficiencyEstablished).toBe(false);
      expect(item.automaticStructuralChangeAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('fails closed across both relation modes when any replay gate is removed', () => {
    expect(R162_REMOVAL_VARIANTS).toHaveLength(10);
    for (const variant of R162_REMOVAL_VARIANTS) {
      expect(variant.retainedPredicateIds).toHaveLength(4);
      expect(variant.classReplayEligible).toBe(false);
      expect(variant.directQuoteAuthorityEstablished).toBe(false);
      expect(variant.interactionMatcherEstablished).toBe(false);
      expect(variant.semanticOppositeEstablished).toBe(false);
      expect(variant.changeSufficiencyEstablished).toBe(false);
      expect(variant.structuralChangeOutcomeEstablished).toBe(false);
      expect(variant.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps the full class replay non-executable', () => {
    expect(R162_CLASS_REPLAY_CONTRACT).toMatchObject({
      relationVariantCount: 2,
      paraphrasedSourceClassReplayEstablished: true,
      directQuoteAuthorityEstablished: false,
      interactionMatcherEstablished: false,
      relationSufficiencyEstablished: false,
      changeSufficiencyEstablished: false,
      settledStructuralMutationAuthorized: false,
      permanentNatalMutationAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableStructuralChangeResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('keeps upstream gaps explicit', () => {
    expect(R162_GOVERNANCE_GUARDS).toHaveLength(4);
    expect(R162_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    expect(R162_UPSTREAM_BINDINGS.r072).toMatchObject({
      provenanceKind: 'PARAPHRASED_SOURCE_CLASS',
      natalPatternStateGap: true,
      interactionMatchingGap: true,
      changeSufficiencyGap: true,
    });
    expect(R162_UPSTREAM_BINDINGS.r157).toMatchObject({
      triggerSignalObserved: true,
      triggerPredicateAuthorized: false,
      automaticStructuralChangeAuthorized: false,
    });
    expect(R162_UPSTREAM_BINDINGS.r159).toMatchObject({
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      boundedOutcomeSufficiencyEstablished: false,
    });
    expect(R162_UPSTREAM_BINDINGS.r161).toMatchObject({
      sourceReplayDistinctFromMeetingMatchingObserved: true,
      branchMeetingMatcherEstablished: false,
    });
  });

  it('rejects class-replay shortcuts', () => {
    expect(R162_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'PARAPHRASED_SOURCE_CLASS_EQUALS_DIRECT_QUOTE',
        'MEETING_ASSERTION_EQUALS_INTERACTION_MATCH',
        'CLASH_ASSERTION_EQUALS_INTERACTION_MATCH',
        'ASSERTED_RELATION_EQUALS_CHANGE_SUFFICIENCY',
        'MEETING_ALWAYS_CHANGES_PATTERN',
        'CLASH_ALWAYS_CHANGES_PATTERN',
        'STRUCTURAL_CHANGE_LANGUAGE_EQUALS_SETTLED_PATTERN_MUTATION',
        'STRUCTURAL_CHANGE_EQUALS_DETERMINISTIC_EVENT',
      ]),
    );
  });

  it('keeps R162 research-only and non-authoritative', () => {
    expect(R162_AUTHORITY).toMatchObject({
      researchOnly: true,
      paraphrasedStructuralChangeClassBound: true,
      meetingReplayVariantEstablished: true,
      clashReplayVariantEstablished: true,
      replayPredicateSetEstablished: true,
      replayRemovalAuditEstablished: true,
      paraphraseDistinctFromDirectQuoteObserved: true,
      relationAssertionDistinctFromInteractionMatchingObserved: true,
      interactionMatchingDistinctFromChangeSufficiencyObserved: true,
      classReplayDistinctFromSettledMutationObserved: true,
      directQuoteAuthorityEstablished: false,
      interactionMatcherEstablished: false,
      relationSufficiencyEstablished: false,
      changeSufficiencyEstablished: false,
      automaticStructuralChangeAuthorized: false,
      settledStructuralMutationAuthorized: false,
      permanentNatalMutationAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableStructuralChangeResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
