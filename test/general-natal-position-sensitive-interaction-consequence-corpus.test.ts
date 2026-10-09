import { describe, expect, it } from 'vitest';

import {
  R149_AUTHORITY,
  R149_POSITION_BOUNDARY_CONTROLS,
  R149_POSITION_CONSEQUENCE_ROWS,
  R149_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_VERSION,
  R149_POSITION_VARIANT_GROUPS,
  R149_REJECTED_POSITION_SHORTCUTS,
  R149_SUMMARY,
  R149_THREE_COMBINATION_POSITION_ROWS,
  R149_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-position-sensitive-interaction-consequence-corpus.js';

describe('R149 position-sensitive interaction consequence corpus', () => {
  it('pins the deterministic 20-row corpus shape', () => {
    expect(R149_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R149_SUMMARY).toEqual({
      rowCount: 20,
      threeCombinationPositionRowCount: 16,
      positionBoundaryControlCount: 4,
      threeCombinationFamilyCount: 4,
      placementClassCount: 4,
      deterministicSourceBoundedBreakCount: 4,
      contextualUnresolvedCount: 8,
      noDirectSettlementCount: 4,
      positionDistanceMaterialityOnlyCount: 1,
      palacePositionContextOnlyCount: 1,
      positionAndNatureBoundaryCount: 1,
      temporalPositionModulationOnlyCount: 1,
      generalizedPositionResolverAuthorizedCount: 0,
      rawDistanceStrengthScoreAuthorizedCount: 0,
      palacePositionUniversalEffectAuthorizedCount: 0,
      pillarPositionSeverityLadderAuthorizedCount: 0,
      positionImpliesPolarityAuthorizedCount: 0,
      positionImpliesRootDestructionAuthorizedCount: 0,
      positionImpliesMechanismForceAuthorizedCount: 0,
      positionImpliesEventAuthorizedCount: 0,
      numericWeightAuthorizedCount: 0,
      globalPrecedenceAuthorizedCount: 0,
      executableGenericSettlementAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('replays four placement classes for all four three-combination families', () => {
    expect(R149_THREE_COMBINATION_POSITION_ROWS).toHaveLength(16);
    expect(R149_POSITION_VARIANT_GROUPS).toHaveLength(4);

    for (const group of R149_POSITION_VARIANT_GROUPS) {
      expect(group).toMatchObject({
        placementClassCount: 4,
        consequenceStateCount: 3,
        deterministicBreakCount: 1,
        contextualUnresolvedCount: 2,
        noDirectSettlementCount: 1,
        sameStructureDifferentPositionDifferentConsequenceObserved: true,
        numericPositionOrderingAuthorized: false,
        generalizedConsequenceResolverAuthorized: false,
      });
      expect(group.rowIds).toHaveLength(4);
    }
  });

  it('keeps embedded+tight as the only deterministic placement class', () => {
    const deterministic = R149_THREE_COMBINATION_POSITION_ROWS.filter(
      (item) => item.deterministicConsequenceAuthorized,
    );
    expect(deterministic).toHaveLength(4);
    expect(
      deterministic.every(
        (item) =>
          item.placementClass ===
            'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT' &&
          item.embeddedWithinBureauSpan === true &&
          item.tightToClashedParticipant === true &&
          item.consequenceState === 'DETERMINISTIC_SOURCE_BOUNDED_BREAK',
      ),
    ).toBe(true);
  });

  it('preserves contextual and no-direct-settlement placements without manufacturing a winner', () => {
    expect(
      R149_THREE_COMBINATION_POSITION_ROWS.filter(
        (item) =>
          item.consequenceState ===
          'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
      ),
    ).toHaveLength(8);
    expect(
      R149_THREE_COMBINATION_POSITION_ROWS.filter(
        (item) => item.consequenceState === 'NO_DIRECT_SETTLEMENT',
      ),
    ).toHaveLength(4);
    expect(
      R149_THREE_COMBINATION_POSITION_ROWS.every(
        (item) =>
          item.globalPrecedenceAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.executableGenericSettlementAuthorized === false,
      ),
    ).toBe(true);
  });

  it('pins four position boundary controls without generalizing them into effect resolvers', () => {
    expect(R149_POSITION_BOUNDARY_CONTROLS).toHaveLength(4);
    expect(
      R149_POSITION_BOUNDARY_CONTROLS.map((item) => item.consequenceState),
    ).toEqual([
      'POSITION_DISTANCE_MATERIALITY_ONLY',
      'PALACE_POSITION_CONTEXT_ONLY',
      'POSITION_AND_NATURE_BOUNDARY',
      'TEMPORAL_POSITION_MODULATION_ONLY',
    ]);
    expect(
      R149_POSITION_BOUNDARY_CONTROLS.every(
        (item) =>
          item.positionMaterialityObserved === true &&
          item.deterministicConsequenceAuthorized === false &&
          item.generalizedPositionResolverAuthorized === false,
      ),
    ).toBe(true);
  });

  it('keeps R073 temporal position modulation cross-domain', () => {
    const r073 = R149_POSITION_BOUNDARY_CONTROLS.find(
      (item) => item.provenance === 'R073_TEMPORAL_POSITION_CONTROL',
    );
    expect(r073).toMatchObject({
      crossDomainControl: true,
      consequenceState: 'TEMPORAL_POSITION_MODULATION_ONLY',
      positionImpliesEventAuthorized: false,
      executableGenericSettlementAuthorized: false,
    });
  });

  it('pins upstream position and settlement boundaries closed', () => {
    expect(R149_UPSTREAM_BINDINGS.r055).toMatchObject({
      positionDistanceSourceMaterialityVerified: true,
      positionDistanceGeneralizedResolverAuthorized: false,
      numericClashStrengthAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.r057).toMatchObject({
      palacePositionContextAxisObserved: true,
      pairPresenceImpliesFixedEffect: false,
      numericWeightAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.r059).toMatchObject({
      positionalEffectGapObserved: true,
      c6BoundedResult: 'MAY_BE_INEFFECTIVE',
      universalPrecedenceAuthorized: false,
      executableConflictResolverAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.r073).toMatchObject({
      positionContextModulatedStateObserved: true,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.r143).toMatchObject({
      placementSensitiveThreeCombinationBoundaryObserved: true,
      genericPostInteractionBureauStateEmissionAuthorized: false,
      executableGenericSettlementAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.r148).toMatchObject({
      placementSensitivePrecedenceObserved: true,
      globalInteractionPrecedenceAuthorized: false,
      executablePrecedenceResolverAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.i46).toMatchObject({
      placementClassificationAuthorized: true,
      tightEmbeddedClashBreakVerdictAuthorized: true,
      embeddedNonTightDeterministicDamageVerdictAuthorized: false,
      outsideTightDeterministicDamageVerdictAuthorized: false,
      outsideNonTightDeterministicSettlementAuthorized: false,
      clashForceWeightingAuthorized: false,
      genericPostInteractionBureauStateEmissionAuthorized: false,
    });
    expect(R149_UPSTREAM_BINDINGS.i47).toMatchObject({
      placementClassificationAvailableByContract: true,
      genericPostInteractionBureauStateEmissionAuthorized: false,
      numericScoringAuthorized: false,
    });
  });

  it('rejects position-to-strength, polarity, event, and generic-settlement shortcuts', () => {
    expect(R149_REJECTED_POSITION_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'RAW_PILLAR_DISTANCE_AS_INTERACTION_STRENGTH',
        'ADJACENT_ALWAYS_STRONGER_THAN_NONADJACENT',
        'EMBEDDED_ALWAYS_BREAKS_STRUCTURE',
        'OUTSIDE_ALWAYS_PRESERVES_STRUCTURE',
        'PALACE_POSITION_AS_UNIVERSAL_EFFECT_TABLE',
        'YEAR_MONTH_DAY_HOUR_AS_GLOBAL_SEVERITY_LADDER',
        'R073_YEAR_DAY_HOUR_MODULATION_AS_INTERACTION_STRENGTH',
        'POSITION_ALONE_AS_RELATION_EFFECTIVENESS',
        'POSITION_ALONE_AS_HARMFUL_POLARITY',
        'POSITION_ALONE_AS_FAVORABLE_POLARITY',
        'POSITION_AS_ROOT_DESTRUCTION',
        'POSITION_AS_EFFECTIVE_MECHANISM_FORCE',
        'POSITION_AS_EVENT_PREDICTION',
        'I46_PLACEMENT_RESULT_AS_OTHER_RELATION_FAMILY_RULE',
        'POSITION_CLASS_AS_GLOBAL_PRECEDENCE',
        'POSITION_CLASS_AS_NUMERIC_WEIGHT',
        'MULTIPLE_CLASH_DISTANCE_AGGREGATION',
        'NO_DIRECT_SETTLEMENT_AS_INTACT',
        'CONTEXTUAL_UNRESOLVED_AS_DAMAGED',
        'CONTEXTUAL_UNRESOLVED_AS_INTACT',
      ]),
    );
  });

  it('keeps all non-bounded consequence and production authority closed', () => {
    expect(R149_POSITION_CONSEQUENCE_ROWS).toHaveLength(20);
    expect(
      R149_POSITION_CONSEQUENCE_ROWS.every(
        (item) =>
          item.generalizedPositionResolverAuthorized === false &&
          item.rawDistanceStrengthScoreAuthorized === false &&
          item.palacePositionUniversalEffectAuthorized === false &&
          item.pillarPositionSeverityLadderAuthorized === false &&
          item.positionImpliesPolarityAuthorized === false &&
          item.positionImpliesRootDestructionAuthorized === false &&
          item.positionImpliesMechanismForceAuthorized === false &&
          item.positionImpliesEventAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.globalPrecedenceAuthorized === false &&
          item.executableGenericSettlementAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R149_AUTHORITY).toMatchObject({
      researchOnly: true,
      sameStructureDifferentPositionDifferentConsequenceObserved: true,
      bureauSpanEmbeddednessMaterialityObserved: true,
      tightAdjacencyMaterialityObserved: true,
      positionDistanceMaterialityObserved: true,
      palacePositionContextMaterialityObserved: true,
      positionAndNatureJointMaterialityObserved: true,
      temporalPositionModulationKeptCrossDomain: true,
      tightEmbeddedBreakOnlyDeterministicPlacementObserved: true,
      contextualPlacementsRemainUnresolvedObserved: true,
      noDirectSettlementDistinctFromIntactnessObserved: true,
      positionConsequenceDistinctFromPrecedenceObserved: true,
      generalizedPositionResolverAuthorized: false,
      rawDistanceStrengthScoreAuthorized: false,
      palacePositionUniversalEffectAuthorized: false,
      pillarPositionSeverityLadderAuthorized: false,
      positionImpliesPolarityAuthorized: false,
      positionImpliesRootDestructionAuthorized: false,
      positionImpliesMechanismForceAuthorized: false,
      positionImpliesEventAuthorized: false,
      numericPositionWeightAuthorized: false,
      globalPositionPrecedenceAuthorized: false,
      executableGenericSettlementAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
