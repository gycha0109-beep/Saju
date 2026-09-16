import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-yuqi-temporal-variability-source-observation-authority.js';
import {
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DECISION,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE_TEXT,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UPSTREAM_REFERENCES,
} from '../src/research/general-natal-yuqi-temporal-variability-source-observation-authority.js';

describe('Yuqi temporal variability source observation authority', () => {
  test('preserves exactly one immutable direct-source observation', () => {
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS)).toBe(true);
    expect(Object.isFrozen(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS[0])).toBe(true);
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_SOURCE_TEXT).toBe(
      '清明後十二日，乙木猶司令，輕而不輕，在土旺之後，則為輕矣；然亦可抵一比劫也。',
    );
  });

  test('retains each temporal and comparison phrase without converting it into a weight', () => {
    const observation = GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_OBSERVATIONS[0];
    expect(observation.sourceRootKind).toBe('餘氣');
    expect(observation.earlyTemporalAnchor).toBe('清明後十二日');
    expect(observation.earlyCommandPhrase).toBe('乙木猶司令');
    expect(observation.earlyWeightPhrase).toBe('輕而不輕');
    expect(observation.lateTemporalAnchor).toBe('土旺之後');
    expect(observation.lateWeightPhrase).toBe('則為輕矣');
    expect(observation.comparisonPhrase).toBe('然亦可抵一比劫也');
    expect(observation.temporalVariabilityObserved).toBe(true);
    expect(observation.executableTemporalClassifierAuthorized).toBe(false);
  });

  test('requires no canonical input and exports no executable evaluator', () => {
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      solarTermContextConsumed: false,
      yuqiEvaluationConsumed: false,
      boundedRootComparisonEvaluationConsumed: false,
      qingmingTermRuntimeRepresentable: true,
      qingmingRuntimeRepresentabilityIsSemanticAuthority: false,
      tuwangAfterBoundaryGoverned: false,
      earthMonthCommand18DayTimingFactAvailable: false,
      generalizedMonthCommandPhaseFactAvailable: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('records the exact upstream issue boundaries without consuming their evaluations', () => {
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UPSTREAM_REFERENCES).toEqual({
      boundedRootComparisonSourceObservationIssue: 566,
      earthWangTimingBoundaryIssue: 575,
      boundedSourcePropositionBindingIssue: 720,
      freshMainAtIssueCreation: '191047aab14e79ecfcb1fe55299ef06b2e1eade1',
    });
  });

  test('keeps temporal resolution, weighting, ranking, strength, and production fail-closed', () => {
    const authority = GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY;
    expect(authority.directSourceYuqiTemporalVariabilityObserved).toBe(true);
    expect(authority.qingmingTermRuntimeRepresentable).toBe(true);
    expect(authority.qingmingRuntimeRepresentabilityIsSemanticAuthority).toBe(false);
    expect(authority.tuwangAfterBoundaryGoverned).toBe(false);
    expect(authority.canonicalYuqiTemporalClassifierAuthorized).toBe(false);
    expect(authority.earthMonthCommand18DayTimingEvaluatorAuthorized).toBe(false);
    expect(authority.generalizedMonthCommandPhaseResolverAuthorized).toBe(false);
    expect(authority.yuqiNumericWeightAuthorized).toBe(false);
    expect(authority.yuqiNonNumericScalarAuthorized).toBe(false);
    expect(authority.yuqiEqualsOnePeerAuthorized).toBe(false);
    expect(authority.sourceComparisonToGlobalRootRankingAuthorized).toBe(false);
    expect(authority.inverseRootComparisonAuthorized).toBe(false);
    expect(authority.transitiveRootComparisonAuthorized).toBe(false);
    expect(authority.boundedRootComparisonToOrdinaryStrengthAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);

    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'tuwang_after_phrase_to_guessed_datetime_boundary',
    );
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'yuqi_to_one_peer_equivalence',
    );
    expect(GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_source_proposition_to_transitive_root_ranking',
    );
  });
});
