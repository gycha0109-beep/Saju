import { describe, expect, it } from 'vitest';

import {
  R147_AUTHORITY,
  R147_DIRECTED_PUNISHMENT_ROWS,
  R147_DIRECTIONALITY_REGISTRY,
  R147_HARM_DIRECTIONAL_ASYMMETRY_ROW,
  R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION,
  R147_R059_ACTOR_TARGET_ROWS,
  R147_REJECTED_DIRECTIONALITY_COLLAPSES,
  R147_SUMMARY,
  R147_SYMMETRIC_PAIR_CONTROL_ROWS,
  R147_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-interaction-directionality-counterexample-registry.js';

describe('R147 interaction directionality counterexample registry', () => {
  it('pins the deterministic 32-row registry shape', () => {
    expect(R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R147_SUMMARY).toEqual({
      registryRowCount: 32,
      directedPunishmentRowCount: 8,
      directedPunishmentReverseExplicitCount: 2,
      directedPunishmentReverseAbsentCount: 6,
      sourceBoundedActorTargetRowCount: 6,
      directionalAsymmetryObservationRowCount: 1,
      symmetricPairControlCount: 17,
      stemCombinationControlCount: 5,
      clashControlCount: 6,
      harmControlCount: 6,
      reverseInferenceAuthorizedCount: 0,
      pairStorageOrderSemanticCount: 0,
      symmetricIdentityImpliesSymmetricEffectAuthorizedCount: 0,
      directionalIdentityImpliesHarmAuthorizedCount: 0,
      directionalIdentityImpliesSeverityAuthorizedCount: 0,
      generalizedDirectionalEffectAuthorizedCount: 0,
      globalPrecedenceAuthorizedCount: 0,
      numericWeightAuthorizedCount: 0,
      executableCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('preserves all eight R056 directed punishment edges', () => {
    expect(R147_DIRECTED_PUNISHMENT_ROWS).toHaveLength(8);
    expect(
      R147_DIRECTED_PUNISHMENT_ROWS.every(
        (item) =>
          item.registryClass === 'DIRECTED_RELATION_IDENTITY' &&
          item.pairIdentitySymmetric === false &&
          item.sourceDirectionObserved === true &&
          item.actorTargetDirectionPreserved === true &&
          item.reverseInferenceAuthorized === false,
      ),
    ).toBe(true);
  });

  it('distinguishes separately explicit reverse edges from inferred reverse edges', () => {
    const explicitReverse = R147_DIRECTED_PUNISHMENT_ROWS.filter(
      (item) => item.reverseRelationExplicit,
    );
    const absentReverse = R147_DIRECTED_PUNISHMENT_ROWS.filter(
      (item) => !item.reverseRelationExplicit,
    );

    expect(explicitReverse).toHaveLength(2);
    expect(absentReverse).toHaveLength(6);
    expect(
      explicitReverse.every((item) => item.reverseInferenceAuthorized === false),
    ).toBe(true);
    expect(
      absentReverse.every((item) => item.reverseInferenceAuthorized === false),
    ).toBe(true);
  });

  it('preserves R059 actor→target direction without reversal or global precedence', () => {
    expect(R147_R059_ACTOR_TARGET_ROWS).toHaveLength(6);
    expect(
      R147_R059_ACTOR_TARGET_ROWS.every(
        (item) =>
          item.registryClass === 'SOURCE_BOUNDED_ACTOR_TARGET' &&
          item.sourceDirectionObserved === true &&
          item.actorTargetDirectionPreserved === true &&
          item.reverseInferenceAuthorized === false &&
          item.globalPrecedenceAuthorized === false &&
          item.executable === false,
      ),
    ).toBe(true);
  });

  it('keeps the R057 酉戌 structural pair symmetric while preserving directional asymmetry as a separate observation', () => {
    expect(R147_HARM_DIRECTIONAL_ASYMMETRY_ROW).toMatchObject({
      registryClass: 'DIRECTIONAL_EFFECT_ASYMMETRY_OBSERVATION',
      relationFamily: 'HARM',
      pairIdentitySymmetric: true,
      sourceDirectionObserved: true,
      generalizedDirectionalEffectAuthorized: false,
      symmetricIdentityImpliesSymmetricEffectAuthorized: false,
      executable: false,
    });

    const pairControl = R147_SYMMETRIC_PAIR_CONTROL_ROWS.find(
      (item) => item.identityLabel === '酉↔戌',
    );
    expect(pairControl).toMatchObject({
      registryClass: 'SYMMETRIC_PAIR_IDENTITY_CONTROL',
      pairIdentitySymmetric: true,
      sourceDirectionObserved: false,
      generalizedDirectionalEffectAuthorized: false,
    });
  });

  it('pins 17 symmetric identity controls without creating direction from storage order', () => {
    expect(R147_SYMMETRIC_PAIR_CONTROL_ROWS).toHaveLength(17);
    expect(
      R147_SYMMETRIC_PAIR_CONTROL_ROWS.every(
        (item) =>
          item.pairIdentitySymmetric === true &&
          item.pairStorageOrderSemantic === false &&
          item.reverseInferenceAuthorized === false &&
          item.symmetricIdentityImpliesSymmetricEffectAuthorized === false,
      ),
    ).toBe(true);
  });

  it('rejects directionality collapses and order-derived direction', () => {
    expect(R147_REJECTED_DIRECTIONALITY_COLLAPSES).toEqual(
      expect.arrayContaining([
        'DIRECTED_PUNISHMENT_AS_UNORDERED_PAIR',
        'MISSING_REVERSE_EDGE_AS_IMPLICIT_REVERSE',
        'EXPLICIT_REVERSE_EDGE_AS_DERIVED_REVERSE',
        'R059_ACTOR_TARGET_REVERSAL',
        'R059_ACTOR_DIRECTION_AS_GLOBAL_PRECEDENCE',
        'PAIR_STORAGE_LEFT_RIGHT_AS_INTERACTION_DIRECTION',
        'SYMMETRIC_PAIR_IDENTITY_IMPLIES_SYMMETRIC_EFFECT',
        'DIRECTIONAL_ASYMMETRY_OBSERVATION_AS_UNIVERSAL_DIRECTIONAL_EFFECT',
        'DIRECTIONAL_RELATION_IMPLIES_HARM',
        'DIRECTIONAL_RELATION_IMPLIES_SEVERITY',
        'ARRAY_ORDER_CREATES_ACTOR_TARGET_DIRECTION',
        'FIRST_ENUMERATED_RELATION_CREATES_PRECEDENCE',
        'DIRECTION_AS_NUMERIC_WEIGHT',
        'DIRECTION_AS_EXECUTABLE_SETTLEMENT',
      ]),
    );
  });

  it('pins upstream authority boundaries closed', () => {
    expect(R147_UPSTREAM_BINDINGS.r051).toMatchObject({
      pairFamilyCount: 5,
      effectiveCombinationResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R147_UPSTREAM_BINDINGS.r055).toMatchObject({
      structuralPairCount: 6,
      pairPresenceImpliesEffectiveClash: false,
      numericClashStrengthAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R147_UPSTREAM_BINDINGS.r056).toMatchObject({
      directedNonSelfRelationCount: 8,
      structuralPresenceImpliesHarm: false,
      numericSeverityAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R147_UPSTREAM_BINDINGS.r057).toMatchObject({
      structuralPairCount: 6,
      universalDirectionalEffectAuthorized: false,
      pairPresenceImpliesHarmfulPolarity: false,
      numericWeightAuthorized: false,
    });
    expect(R147_UPSTREAM_BINDINGS.r059).toMatchObject({
      directCaseCount: 6,
      universalPrecedenceAuthorized: false,
      totalOrderAuthorized: false,
      executableConflictResolverAuthorized: false,
    });
    expect(R147_UPSTREAM_BINDINGS.r141).toMatchObject({
      orderVariantCount: 60,
      inputEnumerationOrderInvariantRepresentationObserved: true,
      sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
      globalRelationPrecedenceAuthorized: false,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
      numericRelationWeightAuthorized: false,
    });
  });

  it('keeps directionality below effect, precedence, and production authority', () => {
    expect(R147_DIRECTIONALITY_REGISTRY).toHaveLength(32);
    expect(
      R147_DIRECTIONALITY_REGISTRY.every(
        (item) =>
          item.reverseInferenceAuthorized === false &&
          item.pairStorageOrderSemantic === false &&
          item.symmetricIdentityImpliesSymmetricEffectAuthorized === false &&
          item.directionalIdentityImpliesHarmAuthorized === false &&
          item.directionalIdentityImpliesSeverityAuthorized === false &&
          item.generalizedDirectionalEffectAuthorized === false &&
          item.globalPrecedenceAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R147_AUTHORITY).toMatchObject({
      researchOnly: true,
      allR056DirectedRelationsRegistered: true,
      allR059DirectActorTargetCasesRegistered: true,
      r057DirectionalAsymmetryObservationRegistered: true,
      symmetricPairControlsRegistered: true,
      directedIdentityDistinctFromUndirectedPairObserved: true,
      explicitReverseDistinctFromInferredReverseObserved: true,
      sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
      structuralPairSymmetryDistinctFromEffectSymmetryObserved: true,
      pairStorageOrderDistinctFromDirectionObserved: true,
      inputEnumerationOrderDistinctFromDirectionObserved: true,
      reverseInferenceAuthorized: false,
      pairStorageOrderSemantic: false,
      symmetricIdentityImpliesSymmetricEffectAuthorized: false,
      universalDirectionalEffectAuthorized: false,
      directionalIdentityImpliesHarmAuthorized: false,
      directionalIdentityImpliesSeverityAuthorized: false,
      globalPrecedenceAuthorized: false,
      numericDirectionWeightAuthorized: false,
      executableDirectionResolverAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
