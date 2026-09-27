import { describe, expect, it } from 'vitest';

import {
  R143_AUTHORITY,
  R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
  R143_COEXISTENCE_ROWS,
  R143_REJECTED_COLLAPSES,
  R143_SUMMARY,
  R143_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-branch-combination-clash-coexistence-corpus.js';

describe('R143 branch combination-and-clash coexistence corpus', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R143_SUMMARY).toEqual({
      rowCount: 40,
      sixCombinationFamilyCount: 6,
      sixCombinationRowCount: 18,
      sixSingleClashRowCount: 12,
      sixDualClashRowCount: 6,
      threeCombinationFamilyCount: 4,
      threeCombinationRowCount: 16,
      i46DirectBreakCount: 4,
      i46ContextualUnresolvedCount: 8,
      i46NoDirectSettlementCount: 4,
      r059ReplayCount: 6,
      r059ResolveReplayCount: 4,
      r059ReactivateReplayCount: 1,
      r059MayBeIneffectiveReplayCount: 1,
      structuralCoexistenceUnresolvedCount: 18,
      sourceBoundedSettlementObservedCount: 22,
      genericPrecedenceAuthorizedCount: 0,
      multipleClashAggregationAuthorizedCount: 0,
      numericWeightAuthorizedCount: 0,
      transformedElementEmissionAuthorizedCount: 0,
      executableGenericSettlementAuthorizedCount: 0,
    });
  });

  it('covers all six 六合 families with left, right, and dual clash coexistence', () => {
    const rows = R143_COEXISTENCE_ROWS.filter(
      (item) => item.combinationKind === 'BRANCH_SIX_COMBINATION',
    );
    expect(rows).toHaveLength(18);
    expect(new Set(rows.map((item) => item.combinationIdentity)).size).toBe(6);

    for (const identity of new Set(rows.map((item) => item.combinationIdentity))) {
      const familyRows = rows.filter((item) => item.combinationIdentity === identity);
      expect(familyRows).toHaveLength(3);
      expect(new Set(familyRows.map((item) => item.topology)).size).toBe(3);
      expect(
        familyRows.every(
          (item) => item.result === 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
        ),
      ).toBe(true);
    }
  });

  it('does not aggregate two simultaneous clashes into a stronger settlement', () => {
    const dual = R143_COEXISTENCE_ROWS.filter(
      (item) => item.topology === 'SIX_COMBINATION_DUAL_MEMBER_CLASH',
    );
    expect(dual).toHaveLength(6);
    expect(dual.every((item) => item.clashCount === 2)).toBe(true);
    expect(
      dual.every(
        (item) =>
          item.multipleClashAggregationAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.result === 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
      ),
    ).toBe(true);
  });

  it('replays every I46 placement boundary across all four 三合 families', () => {
    const rows = R143_COEXISTENCE_ROWS.filter(
      (item) => item.combinationKind === 'BRANCH_THREE_COMBINATION',
    );
    expect(rows).toHaveLength(16);
    expect(new Set(rows.map((item) => item.combinationIdentity)).size).toBe(4);

    const tightEmbedded = rows.filter(
      (item) =>
        item.topology ===
        'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    );
    expect(tightEmbedded).toHaveLength(4);
    expect(
      tightEmbedded.every(
        (item) => item.result === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      ),
    ).toBe(true);

    const contextual = rows.filter(
      (item) =>
        item.result === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
    );
    expect(contextual).toHaveLength(8);

    const noDirect = rows.filter(
      (item) => item.result === 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE',
    );
    expect(noDirect).toHaveLength(4);
  });

  it('replays all six R059 direct cases without globalizing their direction', () => {
    const rows = R143_COEXISTENCE_ROWS.filter(
      (item) => item.provenance === 'R059_DIRECT_REPLAY',
    );
    expect(rows).toHaveLength(6);
    expect(
      rows.filter((item) => item.result === 'SOURCE_BOUNDED_RESOLVES'),
    ).toHaveLength(4);
    expect(
      rows.filter((item) => item.result === 'SOURCE_BOUNDED_CAN_REACTIVATE'),
    ).toHaveLength(1);
    expect(
      rows.filter(
        (item) => item.result === 'SOURCE_BOUNDED_MAY_BE_INEFFECTIVE',
      ),
    ).toHaveLength(1);
    expect(
      rows.every(
        (item) =>
          item.sourceBoundedSettlementObserved === true &&
          item.totalRelationPrecedenceAuthorized === false,
      ),
    ).toBe(true);
  });

  it('keeps structural coexistence distinct from an effective relation verdict', () => {
    const structural = R143_COEXISTENCE_ROWS.filter(
      (item) => item.result === 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
    );
    expect(structural).toHaveLength(18);
    expect(
      structural.every(
        (item) =>
          item.sourceBoundedSettlementObserved === false &&
          item.executableGenericSettlementAuthorized === false,
      ),
    ).toBe(true);
  });

  it('rejects global combination-vs-clash shortcuts', () => {
    expect(R143_REJECTED_COLLAPSES).toEqual(
      expect.arrayContaining([
        'SIX_COMBINATION_ALWAYS_OVERRIDES_CLASH',
        'CLASH_ALWAYS_OVERRIDES_SIX_COMBINATION',
        'THREE_COMBINATION_ALWAYS_OVERRIDES_CLASH',
        'CLASH_ALWAYS_BREAKS_THREE_COMBINATION',
        'R059_RESOLVES_AS_GLOBAL_PRECEDENCE',
        'R059_ACTOR_DIRECTION_AS_TOTAL_ORDER',
        'DUAL_CLASH_COUNT_AS_STRONGER_WEIGHT',
        'MULTIPLE_CLASHES_AUTO_AGGREGATE',
        'STRUCTURAL_COEXISTENCE_AS_EFFECTIVE_COMBINATION',
        'STRUCTURAL_COEXISTENCE_AS_EFFECTIVE_CLASH',
        'NO_I46_DIRECT_SETTLEMENT_AS_INTACT',
        'CONTEXTUAL_UNRESOLVED_AS_DAMAGED',
        'CONTEXTUAL_UNRESOLVED_AS_INTACT',
        'SIX_COMBINATION_AS_TRANSFORMED_ELEMENT',
        'NUMERIC_RELATION_STRENGTH_SCORE',
        'ARRAY_ORDER_AS_SETTLEMENT_PRECEDENCE',
      ]),
    );
  });

  it('pins upstream authority boundaries closed', () => {
    expect(R143_UPSTREAM_BINDINGS.r055).toMatchObject({
      structuralPairCount: 6,
      pairPresenceImpliesEffectiveClash: false,
      universalCrossRelationPrecedenceAuthorized: false,
      executableEffectResolverAuthorized: false,
    });
    expect(R143_UPSTREAM_BINDINGS.r059).toMatchObject({
      directCaseCount: 6,
      universalPrecedenceAuthorized: false,
      totalOrderAuthorized: false,
      executableConflictResolverAuthorized: false,
    });
    expect(R143_UPSTREAM_BINDINGS.i43).toMatchObject({
      structuralPairingSourceResolved: true,
      transformedElementEmissionAuthorized: false,
      transformationStateEmissionAuthorized: false,
      noEffectConclusionAuthorized: false,
      interactionSettlementPolicyStillRequired: true,
    });
    expect(R143_UPSTREAM_BINDINGS.i46).toMatchObject({
      tightEmbeddedClashBreakVerdictAuthorized: true,
      embeddedNonTightDeterministicDamageVerdictAuthorized: false,
      outsideTightDeterministicDamageVerdictAuthorized: false,
      outsideNonTightDeterministicSettlementAuthorized: false,
      multipleClashAggregationAuthorized: false,
      clashForceWeightingAuthorized: false,
      genericPostInteractionBureauStateEmissionAuthorized: false,
    });
    expect(R143_UPSTREAM_BINDINGS.r141).toMatchObject({
      globalRelationPrecedenceAuthorized: false,
      totalRelationOrderAuthorized: false,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
    });
  });

  it('keeps generic settlement and production authority closed', () => {
    expect(R143_AUTHORITY).toMatchObject({
      researchOnly: true,
      allSixCombinationFamiliesCovered: true,
      allThreeCombinationFamiliesCovered: true,
      allR059DirectCasesReplayed: true,
      structuralCoexistenceDistinctFromSettlementObserved: true,
      placementSensitiveThreeCombinationBoundaryObserved: true,
      sourceBoundedSettlementDistinctFromGlobalPrecedenceObserved: true,
      combinationAlwaysWinsAuthorized: false,
      clashAlwaysWinsAuthorized: false,
      genericClashBreaksCombinationAuthorized: false,
      genericCombinationResolvesClashAuthorized: false,
      totalRelationPrecedenceAuthorized: false,
      multipleClashAggregationAuthorized: false,
      numericRelationWeightAuthorized: false,
      sixCombinationTransformedElementEmissionAuthorized: false,
      genericPostInteractionBureauStateEmissionAuthorized: false,
      executableGenericSettlementAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
