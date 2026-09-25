import { describe, expect, it } from 'vitest';
import {
  R135_AUTHORITY,
  R135_ORDINARY_SPECIAL_NONMONOTONICITY_VERSION,
  R135_REJECTED_MONOTONICITIES,
  R135_SUMMARY,
  R135_TRANSITIONS,
  R135_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-ordinary-special-pattern-transition-nonmonotonicity.js';
import {
  R029_AUTHORITY,
  R029_FOLLOW_PATTERN_VERSION,
} from '../src/research/general-natal-follow-pattern-entry-exit.js';
import {
  R030_AUTHORITY,
  R030_GEJU_CONFLICT_MATRIX_VERSION,
} from '../src/research/general-natal-geju-conflict-resolution-matrix.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from '../src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R133_AUTHORITY,
  R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
} from '../src/research/general-natal-pattern-rescue-failure-precedence-graph.js';
import {
  R134_AUTHORITY,
  R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
} from '../src/research/general-natal-special-pattern-exit-adversarial-corpus.js';

describe('R135 ordinary-to-special pattern transition non-monotonicity', () => {
  it('builds the bounded transition corpus above the acceptance floor', () => {
    expect(R135_ORDINARY_SPECIAL_NONMONOTONICITY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R135_SUMMARY).toMatchObject({
      transitionCount: 24,
      comparisonGroupCount: 18,
      representedTargetCount: 6,
      ordinaryToSpecialProbeCount: 12,
      specialToOrdinaryBlockCount: 6,
      unresolvedOrNeitherCount: 6,
      ordinaryFailureCounterexampleCount: 6,
      removeOrdinaryPathContextDivergenceRowCount: 6,
      oppositeDirectionPairCount: 6,
      scalarRankEmittedCount: 0,
      numericScoreEmittedCount: 0,
      temporalTransitionAuthorizedCount: 0,
      transitionResolverAuthorizedCount: 0,
      candidateFactsEmittedCount: 0,
      establishmentFactsEmittedCount: 0,
    });
  });

  it('represents all six R029 special/follow target families', () => {
    expect(new Set(R135_TRANSITIONS.map((item) => item.target))).toEqual(
      new Set([
        'FOLLOW_STRONG',
        'FOLLOW_PROSPEROUS',
        'FOLLOW_OFFICER_KILL',
        'FOLLOW_WEALTH',
        'FOLLOW_OUTPUT',
        'TRANSFORM_QI',
      ]),
    );
  });

  it('shows that removing the same ordinary-path blocker has context-dependent outcomes', () => {
    const rows = R135_TRANSITIONS.filter(
      (item) => item.perturbation === 'REMOVE_ORDINARY_PATH',
    );
    expect(rows).toHaveLength(6);
    expect(new Set(rows.map((item) => item.resultingState))).toEqual(
      new Set(['SPECIAL_PATH_RESEARCH_PLAUSIBLE', 'INDETERMINATE']),
    );
    expect(rows.every((item) => item.contextDivergenceKey !== null)).toBe(true);
    expect(R135_REJECTED_MONOTONICITIES).toContain(
      'SAME_PERTURBATION_EQUALS_SAME_OUTCOME_ACROSS_CONTEXTS',
    );
  });

  it('pairs opposite structural directions without creating a reversible numeric axis', () => {
    const keys = new Set(
      R135_TRANSITIONS.map((item) => item.oppositeDirectionPairKey).filter(
        (item): item is string => item !== null,
      ),
    );
    expect(keys.size).toBeGreaterThanOrEqual(4);
    for (const key of keys) {
      const rows = R135_TRANSITIONS.filter(
        (item) => item.oppositeDirectionPairKey === key,
      );
      expect(rows.map((item) => item.direction).sort()).toEqual([
        'ORDINARY_TO_SPECIAL_PROBE',
        'SPECIAL_TO_ORDINARY_BLOCK',
      ]);
    }
    expect(R135_REJECTED_MONOTONICITIES).toContain(
      'OPPOSITE_DIRECTION_PAIR_EQUALS_REVERSIBLE_NUMERIC_AXIS',
    );
  });

  it('keeps broken ordinary states from becoming special-pattern progress', () => {
    const broken = R135_TRANSITIONS.filter(
      (item) => item.ordinaryFailureCounterexample,
    );
    expect(broken.length).toBeGreaterThanOrEqual(6);
    expect(
      broken.every((item) => item.resultingState === 'ORDINARY_PATH_BROKEN'),
    ).toBe(true);
    expect(R135_REJECTED_MONOTONICITIES).toContain(
      'ORDINARY_FAILURE_EQUALS_SPECIAL_PROGRESS',
    );
    expect(R135_REJECTED_MONOTONICITIES).toContain(
      'BROKEN_ORDINARY_EQUALS_ABSENT_ORDINARY_PATH',
    );
  });

  it('keeps unresolved prerequisites unresolved rather than converting them to negative facts', () => {
    const rows = R135_TRANSITIONS.filter(
      (item) => item.direction === 'UNRESOLVED_OR_NEITHER',
    );
    expect(rows).toHaveLength(6);
    expect(rows.every((item) => item.unresolvedOperands.length > 0)).toBe(true);
    expect(rows.every((item) => item.resultingState === 'INDETERMINATE')).toBe(
      true,
    );
    expect(R135_REJECTED_MONOTONICITIES).toContain(
      'UNRESOLVED_PREREQUISITE_EQUALS_NEGATIVE_PREREQUISITE',
    );
  });

  it('emits no scalar rank, score, probability, distance, or temporal transition', () => {
    expect(
      R135_TRANSITIONS.every(
        (item) =>
          item.scalarRank === null &&
          item.numericScore === null &&
          item.probability === null &&
          item.distance === null &&
          item.temporalTransition === false,
      ),
    ).toBe(true);
  });

  it('pins upstream authority without widening it', () => {
    expect(R135_UPSTREAM_BINDINGS.r029).toMatchObject({
      version: R029_FOLLOW_PATTERN_VERSION,
      executableFollowPatternResolverAuthorized:
        R029_AUTHORITY.executableFollowPatternResolverAuthorized,
    });
    expect(R135_UPSTREAM_BINDINGS.r030).toMatchObject({
      version: R030_GEJU_CONFLICT_MATRIX_VERSION,
      conflictWinnerResolverAuthorized:
        R030_AUTHORITY.conflictWinnerResolverAuthorized,
      establishmentResolverAuthorized:
        R030_AUTHORITY.establishmentResolverAuthorized,
    });
    expect(R135_UPSTREAM_BINDINGS.r131).toMatchObject({
      version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
      candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
      establishmentPredicateAuthorized:
        R131_AUTHORITY.establishmentPredicateAuthorized,
    });
    expect(R135_UPSTREAM_BINDINGS.r133).toMatchObject({
      version: R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
      globalRelationPrecedenceAuthorized:
        R133_AUTHORITY.globalRelationPrecedenceAuthorized,
      rescueResolverAuthorized: R133_AUTHORITY.rescueResolverAuthorized,
    });
    expect(R135_UPSTREAM_BINDINGS.r134).toMatchObject({
      version: R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
      specialPatternResolverAuthorized:
        R134_AUTHORITY.specialPatternResolverAuthorized,
      temporalTransitionSemanticsAuthorized:
        R134_AUTHORITY.temporalTransitionSemanticsAuthorized,
      candidateIdentityAuthorized: false,
      establishmentPredicateAuthorized: false,
    });
  });

  it('keeps all resolver, candidate, establishment, and production authority closed', () => {
    expect(R135_AUTHORITY).toMatchObject({
      researchOnly: true,
      scalarSpecialnessAxisAuthorized: false,
      numericTransitionScoreAuthorized: false,
      transitionProbabilityAuthorized: false,
      reversibleNumericAxisAuthorized: false,
      temporalTransitionSemanticsAuthorized: false,
      transitionResolverAuthorized: false,
      specialPatternResolverAuthorized: false,
      candidateIdentityAuthorized: false,
      establishmentPredicateAuthorized: false,
      candidateFactsEmitted: false,
      establishmentFactsEmitted: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
