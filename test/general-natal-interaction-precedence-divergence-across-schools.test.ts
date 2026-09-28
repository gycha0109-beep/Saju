import { describe, expect, it } from 'vitest';

import {
  R148_AUTHORITY,
  R148_GOVERNANCE_GUARDS,
  R148_I46_EVIDENCE_ROWS,
  R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION,
  R148_PRECEDENCE_EVIDENCE_ROWS,
  R148_PROPOSITION_SYNTHESES,
  R148_R059_EVIDENCE_ROWS,
  R148_REJECTED_COLLAPSES,
  R148_SIX_COMBINATION_CONTROL_ROWS,
  R148_SUMMARY,
  R148_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-interaction-precedence-divergence-across-schools.js';

describe('R148 interaction precedence divergence across schools', () => {
  it('pins the deterministic evidence and governance shape', () => {
    expect(R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R148_SUMMARY).toEqual({
      precedenceEvidenceRowCount: 16,
      r059DirectEvidenceCount: 6,
      sixCombinationStructuralControlCount: 6,
      i46PlacementPolicyCount: 4,
      precedencePropositionCount: 5,
      sourceBoundedResolveSupportCount: 5,
      sourceBoundedLimitCount: 2,
      structuralCoexistenceUnresolvedCount: 6,
      contextualSettlementUnresolvedCount: 2,
      noDirectSettlementCount: 1,
      governanceGuardCount: 6,
      schoolLineageDivergenceEstablishedCount: 0,
      globalPrecedenceAuthorizedCount: 0,
      totalOrderAuthorizedCount: 0,
      majorityVoteAuthorizedCount: 0,
      sourceCountWinnerAuthorizedCount: 0,
      schoolCountWinnerAuthorizedCount: 0,
      numericWeightAuthorizedCount: 0,
      automaticTieBreakAuthorizedCount: 0,
      executableCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('replays all six R059 direct cases without globalizing bounded direction', () => {
    expect(R148_R059_EVIDENCE_ROWS).toHaveLength(6);
    expect(
      R148_R059_EVIDENCE_ROWS.filter(
        (item) => item.evidenceState === 'SOURCE_BOUNDED_SUPPORT',
      ),
    ).toHaveLength(4);
    expect(
      R148_R059_EVIDENCE_ROWS.filter(
        (item) => item.evidenceState === 'SOURCE_BOUNDED_LIMIT',
      ),
    ).toHaveLength(2);
    expect(
      R148_R059_EVIDENCE_ROWS.every(
        (item) =>
          item.globalPrecedenceAuthorized === false &&
          item.schoolDivergenceEstablished === false &&
          item.executable === false,
      ),
    ).toBe(true);
  });

  it('preserves bounded evidence in both meeting→clash and clash→meeting directions', () => {
    const p3 = R148_PROPOSITION_SYNTHESES.find(
      (item) => item.proposition === 'P3_MEETING_OVER_CLASH',
    );
    const p4 = R148_PROPOSITION_SYNTHESES.find(
      (item) => item.proposition === 'P4_CLASH_OVER_MEETING',
    );

    expect(p3).toMatchObject({
      synthesisState: 'BOUNDED_BIDIRECTIONAL_CASES',
      oppositeDirectionBoundedEvidenceObserved: true,
      globalPrecedenceAuthorized: false,
    });
    expect(p4).toMatchObject({
      synthesisState: 'BOUNDED_BIDIRECTIONAL_CASES',
      oppositeDirectionBoundedEvidenceObserved: true,
      globalPrecedenceAuthorized: false,
    });
    expect(p3?.supportingEvidenceIds.length).toBe(1);
    expect(p4?.supportingEvidenceIds.length).toBe(2);
  });

  it('keeps combination-over-clash bounded and clash-over-combination generic support insufficient', () => {
    const p1 = R148_PROPOSITION_SYNTHESES.find(
      (item) => item.proposition === 'P1_COMBINATION_OVER_CLASH',
    );
    const p2 = R148_PROPOSITION_SYNTHESES.find(
      (item) => item.proposition === 'P2_CLASH_OVER_COMBINATION',
    );

    expect(p1).toMatchObject({
      synthesisState: 'BOUNDED_SUPPORT_WITH_SCOPE_LIMITS',
      globalPrecedenceAuthorized: false,
    });
    expect(p1?.supportingEvidenceIds.length).toBe(1);
    expect(p1?.limitingEvidenceIds.length).toBe(7);

    expect(p2).toMatchObject({
      synthesisState: 'GENERIC_SUPPORT_INSUFFICIENT',
      globalPrecedenceAuthorized: false,
    });
    expect(p2?.supportingEvidenceIds.length).toBe(0);
    expect(p2?.limitingEvidenceIds.length).toBe(7);
  });

  it('aggregates each six-combination family only as an unresolved structural control', () => {
    expect(R148_SIX_COMBINATION_CONTROL_ROWS).toHaveLength(6);
    expect(
      R148_SIX_COMBINATION_CONTROL_ROWS.every(
        (item) =>
          item.evidenceState === 'STRUCTURAL_COEXISTENCE_UNRESOLVED' &&
          item.propositionSupportObserved === false &&
          item.stableDominanceObserved === false &&
          item.globalPrecedenceAuthorized === false,
      ),
    ).toBe(true);
  });

  it('keeps I46 tight embedded break source-bounded and all other placements non-deterministic', () => {
    expect(R148_I46_EVIDENCE_ROWS).toHaveLength(4);
    expect(
      R148_I46_EVIDENCE_ROWS.filter(
        (item) => item.evidenceState === 'SOURCE_BOUNDED_SUPPORT',
      ),
    ).toHaveLength(1);
    expect(
      R148_I46_EVIDENCE_ROWS.filter(
        (item) => item.evidenceState === 'CONTEXTUAL_SETTLEMENT_UNRESOLVED',
      ),
    ).toHaveLength(2);
    expect(
      R148_I46_EVIDENCE_ROWS.filter(
        (item) => item.evidenceState === 'NO_DIRECT_SETTLEMENT',
      ),
    ).toHaveLength(1);

    const p5 = R148_PROPOSITION_SYNTHESES.find(
      (item) =>
        item.proposition === 'P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU',
    );
    expect(p5).toMatchObject({
      synthesisState: 'PLACEMENT_SENSITIVE_BOUNDED_SUPPORT',
      globalPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
    });
    expect(p5?.supportingEvidenceIds.length).toBe(1);
    expect(p5?.limitingEvidenceIds.length).toBe(3);
  });

  it('separates school-lineage claims from proposition divergence', () => {
    expect(
      R148_PRECEDENCE_EVIDENCE_ROWS.every(
        (item) =>
          item.lineageAssertionState === 'INCONCLUSIVE' &&
          item.schoolDivergenceEstablished === false,
      ),
    ).toBe(true);
    expect(
      R148_PROPOSITION_SYNTHESES.every(
        (item) => item.schoolLineageDivergenceEstablished === false,
      ),
    ).toBe(true);
    expect(R148_AUTHORITY).toMatchObject({
      sourceOrMethodScopeDivergenceObserved: true,
      lineageAndPropositionRelationsSeparated: true,
      schoolLineageDivergenceEstablished: false,
    });
  });

  it('enforces all six upstream governance guards', () => {
    expect(R148_GOVERNANCE_GUARDS).toHaveLength(6);
    expect(
      R148_GOVERNANCE_GUARDS.every(
        (item) =>
          item.satisfied === true &&
          item.globalPrecedenceAuthorized === false &&
          item.majorityVoteAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.executable === false,
      ),
    ).toBe(true);

    expect(R148_UPSTREAM_BINDINGS.r095).toMatchObject({
      lineageAndPropositionRelationsSeparated: true,
      propositionComparisonRequiredForDivergence: true,
      crossSchoolBlendWithoutCompositionPolicyAuthorized: false,
    });
    expect(R148_UPSTREAM_BINDINGS.r020).toMatchObject({
      crossSchoolPrimitiveComparisonBounded: true,
      crossSchoolMajorityVoteSupported: false,
      sharedPhraseCountAsIndependentConfidenceSupported: false,
    });
    expect(R148_UPSTREAM_BINDINGS.r139).toMatchObject({
      globalCompositionAuthorized: false,
      methodWinnerResolverAuthorized: false,
      majorityVoteMethodSelectionAuthorized: false,
      sourceCountWinnerAuthorized: false,
    });
    expect(R148_UPSTREAM_BINDINGS.r140).toMatchObject({
      adversarialOrderPreservationObserved: true,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
      numericMethodPriorityAuthorized: false,
    });
    expect(R148_UPSTREAM_BINDINGS.r141).toMatchObject({
      inputEnumerationOrderInvariantRepresentationObserved: true,
      globalRelationPrecedenceAuthorized: false,
      firstMatchWinsAuthorized: false,
      sequentialMutationResolverAuthorized: false,
    });
    expect(R148_UPSTREAM_BINDINGS.r147).toMatchObject({
      sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
      globalPrecedenceAuthorized: false,
      executableDirectionResolverAuthorized: false,
    });
  });

  it('rejects votes, lineage shortcuts, order precedence, and automatic settlement', () => {
    expect(R148_REJECTED_COLLAPSES).toEqual(
      expect.arrayContaining([
        'COMBINATION_ALWAYS_OVERRIDES_CLASH',
        'CLASH_ALWAYS_OVERRIDES_COMBINATION',
        'MEETING_ALWAYS_OVERRIDES_CLASH',
        'CLASH_ALWAYS_OVERRIDES_MEETING',
        'CLASH_ALWAYS_BREAKS_THREE_COMBINATION',
        'R059_CASE_COUNT_AS_PRECEDENCE_VOTE',
        'SOURCE_COUNT_AS_WINNER',
        'SCHOOL_COUNT_AS_WINNER',
        'DIFFERENT_SOURCE_LABELS_IMPLY_SCHOOL_DIVERGENCE',
        'LINEAGE_RELATION_IMPLIES_PRECEDENCE_EQUIVALENCE',
        'R059_ACTOR_DIRECTION_AS_GLOBAL_PRECEDENCE',
        'R147_DIRECTIONALITY_AS_PRECEDENCE',
        'ARRAY_ORDER_AS_PRECEDENCE',
        'FIRST_MATCH_AS_PRECEDENCE',
        'I46_TIGHT_BREAK_AS_GENERIC_CLASH_WINS',
        'NO_DIRECT_SETTLEMENT_AS_COMBINATION_SURVIVES',
        'CONTEXTUAL_UNRESOLVED_AS_CLASH_WINS',
        'CONTEXTUAL_UNRESOLVED_AS_COMBINATION_WINS',
        'NUMERIC_RELATION_WEIGHT',
        'WEIGHTED_SOURCE_VOTE',
        'AUTO_SELECT_CANONICAL_SCHOOL',
        'AUTO_CONFLICT_TIEBREAK',
      ]),
    );
  });

  it('keeps all precedence and production authority closed', () => {
    expect(
      R148_PRECEDENCE_EVIDENCE_ROWS.every(
        (item) =>
          item.globalPrecedenceAuthorized === false &&
          item.totalOrderAuthorized === false &&
          item.majorityVoteAuthorized === false &&
          item.sourceCountWinnerAuthorized === false &&
          item.schoolCountWinnerAuthorized === false &&
          item.numericWeightAuthorized === false &&
          item.automaticTieBreakAuthorized === false &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R148_AUTHORITY).toMatchObject({
      researchOnly: true,
      sourceBoundedOppositeDirectionsObserved: true,
      contextDependentPrecedenceObserved: true,
      placementSensitivePrecedenceObserved: true,
      sourceOrMethodScopeDivergenceObserved: true,
      schoolLineageDivergenceEstablished: false,
      boundedSupportDistinctFromGlobalPrecedenceObserved: true,
      sourceCountDistinctFromAuthorityObserved: true,
      directionalityDistinctFromPrecedenceObserved: true,
      globalInteractionPrecedenceAuthorized: false,
      totalRelationOrderAuthorized: false,
      combinationAlwaysOverridesClashAuthorized: false,
      clashAlwaysOverridesCombinationAuthorized: false,
      meetingAlwaysOverridesClashAuthorized: false,
      clashAlwaysOverridesMeetingAuthorized: false,
      clashAlwaysBreaksThreeCombinationAuthorized: false,
      majorityVoteAuthorized: false,
      sourceCountWinnerAuthorized: false,
      schoolCountWinnerAuthorized: false,
      numericRelationWeightAuthorized: false,
      numericSourceWeightAuthorized: false,
      automaticCanonicalSchoolSelectionAuthorized: false,
      automaticTieBreakAuthorized: false,
      executablePrecedenceResolverAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
