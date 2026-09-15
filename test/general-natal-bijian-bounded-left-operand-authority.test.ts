import { describe, expect, test } from 'vitest';
import { ambiguous, resolved, unavailable, type FactState } from '../src/contracts/common.js';
import type { TenGod, TenGodChartFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  bindVisibleBijianCountToBoundedLeftOperand,
} from '../src/research/general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';

function chart(
  year: TenGod,
  month: TenGod,
  hour: TenGod,
  day: TenGod | '일간' = '일간',
  branchBijian = false,
): TenGodChartFact {
  return {
    year: {
      stem: resolved(year),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    month: {
      stem: resolved(month),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    day: {
      stem: resolved(day),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    hour: {
      stem: resolved(hour),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
  };
}

function resolvedChart(
  year: TenGod,
  month: TenGod,
  hour: TenGod,
  day: TenGod | '일간' = '일간',
  branchBijian = false,
): FactState<TenGodChartFact> {
  return resolved(chart(year, month, hour, day, branchBijian));
}

describe('General Natal visible Bijian bounded left operand authority', () => {
  test('pins all three exact upstream peer-stem left operands', () => {
    expect(GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS).toEqual({
      one: {
        propositionId: 'one_peer_less_than_one_applicable_muku',
        count: 1,
        observedInUpstreamRegistry: true,
      },
      two: {
        propositionId: 'two_peers_less_than_one_applicable_yuqi',
        count: 2,
        observedInUpstreamRegistry: true,
      },
      three: {
        propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
        count: 3,
        observedInUpstreamRegistry: true,
      },
    });

    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.map((proposition) => proposition.left),
    ).toEqual([
      { kind: 'peer_stem_count', count: 1 },
      { kind: 'peer_stem_count', count: 2 },
      { kind: 'peer_stem_count', count: 3 },
    ]);
  });

  test.each([
    [resolvedChart('비견', '정재', '겁재'), 1, 'one_peer_less_than_one_applicable_muku'],
    [resolvedChart('비견', '비견', '정관'), 2, 'two_peers_less_than_one_applicable_yuqi'],
    [
      resolvedChart('비견', '비견', '비견'),
      3,
      'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
    ],
  ] as const)(
    'binds an exact resolved visible Bijian count to the matching bounded left operand',
    (tenGods, count, propositionId) => {
      expect(bindVisibleBijianCountToBoundedLeftOperand(tenGods)).toEqual({
        state: 'bounded_peer_stem_count_established',
        peerStemCount: count,
        boundedOperand: { kind: 'peer_stem_count', count },
        propositionId,
        authority: 'research_only',
      });
    },
  );

  test('returns no bounded operand when no visible peer stem is Bijian', () => {
    expect(
      bindVisibleBijianCountToBoundedLeftOperand(resolvedChart('겁재', '정재', '정관')),
    ).toEqual({
      state: 'no_bounded_peer_stem_operand',
      peerStemCount: 0,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });
  });

  test('does not count Jiecai, branch Ten-Gods, or the day self marker as Bijian', () => {
    const result = bindVisibleBijianCountToBoundedLeftOperand(
      resolvedChart('겁재', '정재', '정관', '일간', true),
    );

    expect(result.state).toBe('no_bounded_peer_stem_operand');
    expect(result.peerStemCount).toBe(0);
    expect(result.boundedOperand).toBeNull();
  });

  test('fails closed when the outer Ten-God chart is unavailable or ambiguous', () => {
    expect(bindVisibleBijianCountToBoundedLeftOperand(unavailable('birth-time-unknown'))).toEqual({
      state: 'ten_god_chart_unresolved',
      peerStemCount: null,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });

    const first = chart('비견', '정재', '정관');
    const second = chart('비견', '비견', '정관');
    const ambiguousChart = ambiguous<TenGodChartFact>(
      [
        { candidateId: 'ten-gods:one', value: first, reasonRefs: ['unknown-time'] },
        { candidateId: 'ten-gods:two', value: second, reasonRefs: ['unknown-time'] },
      ],
      ['unknown-time'],
    );

    expect(bindVisibleBijianCountToBoundedLeftOperand(ambiguousChart).state).toBe(
      'ten_god_chart_unresolved',
    );
  });

  test('fails closed when any visible stem fact is missing or unresolved', () => {
    const missingHour: TenGodChartFact = {
      ...chart('비견', '정재', '정관'),
      hour: {},
    };
    expect(bindVisibleBijianCountToBoundedLeftOperand(resolved(missingHour)).state).toBe(
      'visible_stem_facts_not_fully_resolved',
    );

    const unavailableMonth: TenGodChartFact = {
      ...chart('비견', '정재', '정관'),
      month: { stem: unavailable('test-unavailable') },
    };
    expect(bindVisibleBijianCountToBoundedLeftOperand(resolved(unavailableMonth)).state).toBe(
      'visible_stem_facts_not_fully_resolved',
    );
  });

  test('requires the canonical day stem self marker instead of treating another Ten-God as self', () => {
    const result = bindVisibleBijianCountToBoundedLeftOperand(
      resolvedChart('비견', '정재', '정관', '비견'),
    );
    expect(result.state).toBe('day_stem_semantic_mismatch');
    expect(result.peerStemCount).toBeNull();
    expect(result.boundedOperand).toBeNull();
  });

  test('consumes canonical Ten-God facts and keeps comparison authority closed', () => {
    const authority = GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY;
    expect(bindVisibleBijianCountToBoundedLeftOperand.length).toBe(1);
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(
      GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths,
    ).toContain('derivedFacts.tenGods');
    expect(authority.canonicalTenGodPathGoverned).toBe(true);
    expect(authority.directSourceOneBijianObserved).toBe(true);
    expect(authority.directSourceTwoBijianObserved).toBe(true);
    expect(authority.directSourceThreeBijianObserved).toBe(true);
    expect(authority.directSourceVisibleStemContextObserved).toBe(true);
    expect(authority.upstreamOnePeerBindingObserved).toBe(true);
    expect(authority.upstreamTwoPeerBindingObserved).toBe(true);
    expect(authority.upstreamThreePeerBindingObserved).toBe(true);
    expect(authority.visibleBijianCountToBoundedLeftOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.outerTenGodFactMustResolve).toBe(true);
    expect(authority.visibleStemFactsMustResolve).toBe(true);
    expect(authority.dayStemSelfExcluded).toBe(true);
    expect(authority.exactBijianOnly).toBe(true);
    expect(authority.jiecaiCountedAsBijian).toBe(false);
    expect(authority.branchTenGodConsumed).toBe(false);
    expect(authority.hiddenStemMembershipConsumed).toBe(false);
    expect(authority.hiddenStemArrayOrderConsumed).toBe(false);
    expect(authority.unresolvedCandidateSelectionAuthorized).toBe(false);
    expect(authority.chartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps weighting, ranking, Gyeokguk, production, and Commerce escalation closed', () => {
    const authority = GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY;
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartLevelComparisonEvaluatorAuthorized).toBe(
      false,
    );
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.linearWeightScaleAuthorized).toBe(false);
    expect(authority.nonNumericWeightingRuleResolved).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
