import { describe, expect, test } from 'vitest';
import * as boundedRootComparisonModule from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_CONTEXT_OBSERVATIONS,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';

describe('General Natal bounded root-comparison observations', () => {
  test('governs exactly three source-stated bounded comparison propositions', () => {
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS).toHaveLength(3);
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.map((proposition) => ({
        id: proposition.id,
        leftCount: proposition.left.count,
        relation: proposition.relation,
        rightKind: proposition.right.kind,
        rightCount: proposition.right.count,
      })),
    ).toEqual([
      {
        id: 'one_peer_less_than_one_applicable_muku',
        leftCount: 1,
        relation: 'source_stated_less_than',
        rightKind: 'applicable_muku_root',
        rightCount: 1,
      },
      {
        id: 'two_peers_less_than_one_applicable_yuqi',
        leftCount: 2,
        relation: 'source_stated_less_than',
        rightKind: 'applicable_yuqi_root',
        rightCount: 1,
      },
      {
        id: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
        leftCount: 3,
        relation: 'source_stated_less_than',
        rightKind: 'applicable_changsheng_lu_ren_root',
        rightCount: 1,
      },
    ]);
  });

  test('records the surrounding source context as a reason to fail closed on universalization', () => {
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_CONTEXT_OBSERVATIONS).toHaveLength(2);
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceContextSensitivityObserved).toBe(
      true,
    );
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.boundedComparisonPropositionRegistryAuthorizedObservationOnly,
    ).toBe(true);
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('does not export a chart evaluator or matcher', () => {
    expect('evaluateBoundedRootComparison' in boundedRootComparisonModule).toBe(false);
    expect('matchBoundedRootComparison' in boundedRootComparisonModule).toBe(false);
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartFactsConsumed).toBe(false);
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartLevelComparisonEvaluatorAuthorized).toBe(
      false,
    );
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.boundedSourceExampleMatcherAuthorized).toBe(
      false,
    );
  });

  test('keeps transitivity, ranking, numeric and nonnumeric weighting rules fail-closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY;
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.linearWeightScaleAuthorized).toBe(false);
    expect(authority.nonNumericWeightingRuleResolved).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
  });

  test('keeps ordinary strength, Gyeokguk, and production escalation closed', () => {
    const authority = GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY;
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
