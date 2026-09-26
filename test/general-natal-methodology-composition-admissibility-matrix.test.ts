import { describe, expect, it } from 'vitest';

import {
  R139_AUTHORITY,
  R139_COMPOSITION_CELLS,
  R139_COMPOSITION_PROBES,
  R139_DIRECTIONAL_PROJECTION,
  R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
  R139_METHODS,
  R139_REJECTED_COLLAPSES,
  R139_SUMMARY,
  R139_UPSTREAM_BINDINGS,
  r139CanonicalPairKey,
} from '../src/research/general-natal-methodology-composition-admissibility-matrix.js';

describe('R139 methodology-composition admissibility matrix', () => {
  it('pins the complete matrix and probe shape', () => {
    expect(R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION).toBe('0.1.0-research');
    expect(R139_SUMMARY).toEqual({
      methodologyFamilyCount: 6,
      canonicalPairCount: 21,
      selfPairCount: 6,
      crossPairCount: 15,
      directionalProjectionCount: 36,
      probeCount: 42,
      r039SeedReplayCount: 3,
      sameElementDifferentRoleCount: 4,
      samePairDifferentContextRowCount: 42,
      samePairDifferentContextGroupCount: 21,
      sameMethodEvidenceCoexistenceCount: 6,
      coexistenceAdmissibleCount: 3,
      conditionalCompositionCount: 8,
      parallelPreservationOnlyCount: 8,
      compositionUnresolvedCount: 12,
      nonCompositionBoundaryCount: 5,
      methodWinnerAuthorizedCount: 0,
      numericPriorityAuthorizedCount: 0,
      finalYongShenAuthorizedCount: 0,
      roleCollapseAuthorizedCount: 0,
      automaticSpecialTransitionAuthorizedCount: 0,
      executableCount: 0,
    });
  });

  it('covers every methodology family, canonical pair, and directional projection', () => {
    expect(R139_METHODS).toHaveLength(6);
    expect(new Set(R139_COMPOSITION_CELLS.map((item) => item.pairKey)).size).toBe(21);
    expect(R139_DIRECTIONAL_PROJECTION).toHaveLength(36);
    expect(
      R139_DIRECTIONAL_PROJECTION.every(
        (item) =>
          item.evidenceCoexistenceRepresentable === true &&
          item.globalCompositionAuthorized === false &&
          item.executableResolutionAuthorized === false,
      ),
    ).toBe(true);
  });

  it('normalizes pair order without treating order as precedence', () => {
    for (const left of R139_METHODS) {
      for (const right of R139_METHODS) {
        expect(r139CanonicalPairKey(left, right)).toBe(r139CanonicalPairKey(right, left));
      }
    }
    expect(R139_REJECTED_COLLAPSES).toContain('ARRAY_ORDER_AS_PRECEDENCE');
    expect(R139_REJECTED_COLLAPSES).toContain('METHODOLOGY_ENUM_ORDER_AS_PRIORITY');
  });

  it('replays all three R039 governed coexistence cases without a winner', () => {
    const rows = R139_COMPOSITION_PROBES.filter(
      (item) => item.sourceGovernedCoexistenceReplay,
    );
    expect(rows).toHaveLength(3);
    expect(rows.every((item) => item.compositionState === 'COEXISTENCE_ADMISSIBLE')).toBe(
      true,
    );
    expect(rows.every((item) => item.methodWinnerAuthorized === false)).toBe(true);
  });

  it('keeps composition context-dependent for the same methodology pair', () => {
    expect(R139_SUMMARY.samePairDifferentContextGroupCount).toBe(21);
    const gejuClimate = R139_COMPOSITION_PROBES.filter(
      (item) =>
        item.pairKey === r139CanonicalPairKey('GEJU', 'CLIMATE_TIAOHOU'),
    );
    expect(gejuClimate).toHaveLength(2);
    expect(new Set(gejuClimate.map((item) => item.compositionState)).size).toBe(2);
  });

  it('keeps same element evidence in distinct semantic roles', () => {
    const rows = R139_COMPOSITION_PROBES.filter((item) => item.sameElementDifferentRole);
    expect(rows).toHaveLength(4);
    expect(rows.every((item) => item.leftValue === item.rightValue)).toBe(true);
    expect(rows.every((item) => item.leftRole !== item.rightRole)).toBe(true);
    expect(rows.every((item) => item.roleCollapseAuthorized === false)).toBe(true);
    expect(R139_REJECTED_COLLAPSES).toContain('SAME_ELEMENT_AS_SAME_ROLE');
    expect(R139_REJECTED_COLLAPSES).toContain('SAME_ELEMENT_AS_COMPOSITION_PROOF');
  });

  it('preserves Tongguan and Bingyao as parallel or unresolved rather than selecting a winner', () => {
    const rows = R139_COMPOSITION_PROBES.filter(
      (item) =>
        item.pairKey === r139CanonicalPairKey('FLOW_TONGGUAN', 'BINGYAO'),
    );
    expect(rows).toHaveLength(2);
    expect(rows.map((item) => item.compositionState)).toEqual([
      'PARALLEL_PRESERVATION_ONLY',
      'COMPOSITION_UNRESOLVED',
    ]);
    expect(rows.every((item) => item.methodWinnerAuthorized === false)).toBe(true);
  });

  it('blocks automatic ordinary-to-special composition', () => {
    const rows = R139_COMPOSITION_PROBES.filter(
      (item) =>
        item.leftMethod === 'SPECIAL_FOLLOW' || item.rightMethod === 'SPECIAL_FOLLOW',
    );
    expect(rows.length).toBeGreaterThanOrEqual(10);
    expect(rows.some((item) => item.compositionState === 'NON_COMPOSITION_BOUNDARY')).toBe(
      true,
    );
    expect(rows.every((item) => item.automaticSpecialTransitionAuthorized === false)).toBe(
      true,
    );
  });

  it('rejects voting, weighting, final-Yongshen, and auto-collapse shortcuts', () => {
    expect(R139_REJECTED_COLLAPSES).toContain('METHOD_COUNT_AS_WINNER');
    expect(R139_REJECTED_COLLAPSES).toContain('SOURCE_COUNT_AS_WINNER');
    expect(R139_REJECTED_COLLAPSES).toContain('MAJORITY_VOTE_METHOD_SELECTION');
    expect(R139_REJECTED_COLLAPSES).toContain('NUMERIC_METHOD_SCORE');
    expect(R139_REJECTED_COLLAPSES).toContain('WEIGHTED_METHOD_SCORE');
    expect(R139_REJECTED_COLLAPSES).toContain('GLOBAL_METHOD_PRECEDENCE');
    expect(R139_REJECTED_COLLAPSES).toContain('AUTO_FINAL_YONGSHEN');
    expect(R139_REJECTED_COLLAPSES).toContain('AUTO_ROLE_COLLAPSE');
    expect(R139_REJECTED_COLLAPSES).toContain('AUTO_SPECIAL_PATTERN_TRANSITION');
    expect(R139_REJECTED_COLLAPSES).toContain('AUTO_CONFLICT_TIEBREAK');
  });

  it('pins upstream resolver authority closed', () => {
    expect(R139_UPSTREAM_BINDINGS.r039).toMatchObject({
      trueConflictCaseVerified: false,
      forceSingleWinnerAuthorized: false,
      numericPriorityAuthorized: false,
    });
    expect(R139_UPSTREAM_BINDINGS.r040).toMatchObject({
      finalYongShenFieldAuthorized: false,
      methodWinnerResolverAuthorized: false,
      chartRoleAssignmentAuthorized: false,
    });
    expect(R139_UPSTREAM_BINDINGS.r134).toMatchObject({
      specialPatternResolverAuthorized: false,
      candidateIdentityAuthorized: false,
      establishmentPredicateAuthorized: false,
    });
    expect(R139_UPSTREAM_BINDINGS.r135).toMatchObject({
      ordinarySpecialNonMonotonicityObserved: true,
      transitionResolverAuthorized: false,
      specialPatternResolverAuthorized: false,
    });
    expect(R139_UPSTREAM_BINDINGS.r137).toMatchObject({
      sourceVerifiedTrueConflictAuthorized: false,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
    });
    expect(R139_UPSTREAM_BINDINGS.r138).toMatchObject({
      distinctResolutionFamiliesPreserved: true,
      sourceVerifiedCrossMethodTrueConflictAuthorized: false,
      crossMethodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
    });
  });

  it('keeps all engine, product, and production authority closed', () => {
    expect(R139_AUTHORITY).toMatchObject({
      researchOnly: true,
      canonicalPairNormalizationObserved: true,
      evidenceCoexistenceDistinctFromSemanticCompositionObserved: true,
      semanticCompositionDistinctFromExecutableResolutionObserved: true,
      contextDependentCompositionObserved: true,
      sameElementDifferentRolePreserved: true,
      globalCompositionAuthorized: false,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
      numericMethodPriorityAuthorized: false,
      majorityVoteMethodSelectionAuthorized: false,
      sourceCountWinnerAuthorized: false,
      finalYongShenAuthorized: false,
      roleCollapseAuthorized: false,
      automaticSpecialTransitionAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
