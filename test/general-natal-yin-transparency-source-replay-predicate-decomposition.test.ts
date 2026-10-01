import { describe, expect, it } from 'vitest';

import {
  R160_AUTHORITY,
  R160_EXACT_SOURCE_REPLAY_CONTRACT,
  R160_EXACT_YIN_SOURCE_FIXTURE,
  R160_GOVERNANCE_GUARDS,
  R160_REMOVAL_VARIANTS,
  R160_REJECTED_SHORTCUTS,
  R160_REPLAY_PREDICATES,
  R160_SUMMARY,
  R160_UPSTREAM_BINDINGS,
  R160_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_VERSION,
} from '../src/research/general-natal-yin-transparency-source-replay-predicate-decomposition.js';

describe('R160 exact Yin transparency source-replay predicate decomposition', () => {
  it('binds the exact Yin transparency-substitution fixture without runtime authority', () => {
    expect(R160_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R160_EXACT_YIN_SOURCE_FIXTURE).toMatchObject({
      monthBranch: '寅',
      sourcePrimaryStem: '甲',
      sourcePrimaryRole: '本主',
      sourcePrimaryTransparent: false,
      sourceSubstituteStem: '丙',
      sourceSubstituteTransparent: true,
      sourceScopeExactYinOnly: true,
      runtimeActivationFactAuthorized: false,
      perMemberActivationResolverAuthorized: false,
      generalizedMonthBranchSelectorAuthorized: false,
      establishmentFactEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('decomposes five source-replay gates and does not call them semantic sufficiency', () => {
    expect(R160_REPLAY_PREDICATES.map((item) => item.predicateId)).toEqual([
      'EXACT_YIN_MONTH_CONTEXT',
      'YIN_PRIMARY_JIA_ROLE_BOUND',
      'PRIMARY_JIA_NOT_TRANSPARENT',
      'BING_TRANSPARENT',
      'DIRECT_YIN_SUBSTITUTION_EVIDENCE_BOUND',
    ]);
    expect(R160_SUMMARY).toEqual({
      replayPredicateCount: 5,
      removalVariantCount: 5,
      removalBlocksExactSourceReplayCount: 5,
      semanticNecessityEstablishedPredicateCount: 0,
      activationSufficiencyEstablishedPredicateCount: 0,
      runtimeActivationAuthorizedPredicateCount: 0,
      governanceGuardCount: 6,
    });

    for (const predicate of R160_REPLAY_PREDICATES) {
      expect(predicate.requiredForExactSourceReplay).toBe(true);
      expect(predicate.removalBlocksExactSourceReplay).toBe(true);
      expect(predicate.semanticNecessityEstablished).toBe(false);
      expect(predicate.activationSufficiencyEstablished).toBe(false);
      expect(predicate.generalizedSelectionPredicateAuthorized).toBe(false);
      expect(predicate.runtimeActivationFactAuthorized).toBe(false);
      expect(predicate.productionAuthorityPromoted).toBe(false);
    }
  });

  it('fails closed when any one exact-source replay gate is removed', () => {
    expect(R160_REMOVAL_VARIANTS).toHaveLength(5);
    expect(
      new Set(R160_REMOVAL_VARIANTS.map((item) => item.removedPredicateId)).size,
    ).toBe(5);

    for (const variant of R160_REMOVAL_VARIANTS) {
      expect(variant.retainedPredicateIds).toHaveLength(4);
      expect(variant.exactSourceReplayEligible).toBe(false);
      expect(variant.sourceObservationNegated).toBe(false);
      expect(variant.semanticOppositeEstablished).toBe(false);
      expect(variant.activationSufficiencyEstablished).toBe(false);
      expect(variant.runtimeActivationFactAuthorized).toBe(false);
      expect(variant.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps the full replay contract observational rather than executable', () => {
    expect(R160_EXACT_SOURCE_REPLAY_CONTRACT).toMatchObject({
      exactSourceReplayEligible: true,
      boundedRoleSubstitutionObservationPreserved: true,
      sourceActivationLanguageObserved: true,
      semanticNecessityEstablished: false,
      temporalActivationSufficiencyEstablished: false,
      generalizedTransparencyPredicateEstablished: false,
      generalizedSelectionPredicateAuthorized: false,
      runtimeActivationFactAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
      effectiveForceAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R160_EXACT_SOURCE_REPLAY_CONTRACT.requiredPredicateIds).toHaveLength(5);
  });

  it('keeps all upstream governance guards satisfied', () => {
    expect(R160_GOVERNANCE_GUARDS).toHaveLength(6);
    expect(R160_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R160_GOVERNANCE_GUARDS) {
      expect(guard.generalizedTransparencyActivationAuthorized).toBe(false);
      expect(guard.executableActivationResolverAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds exact source observation while preserving upstream gaps', () => {
    expect(R160_UPSTREAM_BINDINGS.gejuHiddenStem).toMatchObject({
      directSourceYinExactPrimaryRoleObserved: true,
      directSourceYinExactTransparencySubstitutionObserved: true,
      transparencySelectionPredicateAuthorized: false,
      generalizedMonthOrderHiddenStemSelectionPredicateAuthorized: false,
    });
    expect(R160_UPSTREAM_BINDINGS.r060).toMatchObject({
      hiddenMembershipDistinctFromManifestation: true,
      genericInteractionActivationAuthorized: false,
    });
    expect(R160_UPSTREAM_BINDINGS.r073.activationImpliesConcreteEvent).toBe(
      false,
    );
    expect(R160_UPSTREAM_BINDINGS.r146).toMatchObject({
      boundedRoleSubstitutionObserved: true,
      runtimeActivationFactAuthorized: false,
    });
    expect(R160_UPSTREAM_BINDINGS.r157).toMatchObject({
      transparencyActivationClassObserved: true,
      triggerPredicateAuthorized: false,
    });
    expect(R160_UPSTREAM_BINDINGS.r159).toMatchObject({
      temporalTriggerSufficiencyGapPreserved: true,
      exactTemporalTriggerMinimalPredicateSetEstablished: false,
    });
  });

  it('rejects replay-to-semantics shortcuts', () => {
    expect(R160_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'EXACT_SOURCE_REPLAY_GATES_EQUAL_SEMANTIC_NECESSITY',
        'EXACT_SOURCE_REPLAY_ELIGIBLE_EQUALS_RUNTIME_ACTIVATION',
        'YIN_CASE_GENERALIZES_TO_ALL_MONTH_BRANCHES',
        'JIA_NON_TRANSPARENCY_AND_BING_TRANSPARENCY_IS_UNIVERSAL_SELECTOR',
        'SOURCE_REPLAY_COMPLETENESS_EQUALS_TEMPORAL_TRIGGER_SUFFICIENCY',
        'REMOVAL_FROM_REPLAY_PROVES_OPPOSITE_ASTROLOGICAL_OUTCOME',
        'TRANSPARENCY_IMPLIES_DETERMINISTIC_EVENT',
      ]),
    );
  });

  it('keeps R160 research-only and non-authoritative', () => {
    expect(R160_AUTHORITY).toMatchObject({
      researchOnly: true,
      exactYinSourceFixtureBound: true,
      exactYinSourceReplayPredicateSetEstablished: true,
      exactSourceReplayGateRemovalAuditEstablished: true,
      boundedRoleSubstitutionObservationPreserved: true,
      sourceReplayDistinctFromSemanticNecessityObserved: true,
      sourceReplayDistinctFromActivationSufficiencyObserved: true,
      sourceReplayDistinctFromRuntimeActivationObserved: true,
      semanticPredicateNecessityEstablished: false,
      exactTemporalActivationSufficiencyEstablished: false,
      generalizedTransparencyActivationPredicateEstablished: false,
      generalizedMonthBranchSelectorAuthorized: false,
      runtimeActivationFactAuthorized: false,
      perMemberActivationResolverAuthorized: false,
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
