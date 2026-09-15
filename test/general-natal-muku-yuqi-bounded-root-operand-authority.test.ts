import { describe, expect, test } from 'vitest';
import type { StemFact } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from '../src/research/general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
  bindMukuYuqiLightRootToBoundedOperand,
} from '../src/research/general-natal-muku-yuqi-bounded-root-operand-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY,
  evaluateMukuYuqiLightRoot,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';

const DAY_MASTERS = Object.freeze({
  목: { element: '목' },
  화: { element: '화' },
  토: { element: '토' },
  금: { element: '금' },
  수: { element: '수' },
} as const satisfies Readonly<Record<string, Pick<StemFact, 'element'>>>);

describe('General Natal governed Muku/Yuqi bounded comparison operand authority', () => {
  test('pins both exact upstream observation-only right operands', () => {
    expect(GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS).toEqual({
      muku: {
        propositionId: 'one_peer_less_than_one_applicable_muku',
        operandKind: 'applicable_muku_root',
        constituent: 'muku',
        observedInUpstreamRegistry: true,
      },
      yuqi: {
        propositionId: 'two_peers_less_than_one_applicable_yuqi',
        operandKind: 'applicable_yuqi_root',
        constituent: 'yuqi',
        observedInUpstreamRegistry: true,
      },
    });

    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
        (proposition) =>
          proposition.id === 'one_peer_less_than_one_applicable_muku' &&
          proposition.right.kind === 'applicable_muku_root',
      ),
    ).toBe(true);
    expect(
      GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
        (proposition) =>
          proposition.id === 'two_peers_less_than_one_applicable_yuqi' &&
          proposition.right.kind === 'applicable_yuqi_root',
      ),
    ).toBe(true);
  });

  test.each([
    [DAY_MASTERS.목, '미'],
    [DAY_MASTERS.화, '술'],
    [DAY_MASTERS.금, '축'],
    [DAY_MASTERS.수, '진'],
  ] as const)('admits every governed non-Earth Muku positive as applicable_muku_root', (dayMaster, branch) => {
    const lightRoot = evaluateMukuYuqiLightRoot(dayMaster, branch);
    expect(lightRoot.lightRootState).toBe('muku_light_root_established');

    expect(bindMukuYuqiLightRootToBoundedOperand(lightRoot)).toEqual({
      element: dayMaster.element,
      branch,
      upstreamLightRootState: 'muku_light_root_established',
      state: 'applicable_bounded_muku_root_operand',
      boundedOperandKind: 'applicable_muku_root',
      authority: 'research_only',
    });
  });

  test.each([
    [DAY_MASTERS.목, '진'],
    [DAY_MASTERS.화, '미'],
    [DAY_MASTERS.금, '술'],
    [DAY_MASTERS.수, '축'],
  ] as const)('admits every governed non-Earth Yuqi positive as applicable_yuqi_root', (dayMaster, branch) => {
    const lightRoot = evaluateMukuYuqiLightRoot(dayMaster, branch);
    expect(lightRoot.lightRootState).toBe('yuqi_light_root_established');

    expect(bindMukuYuqiLightRootToBoundedOperand(lightRoot)).toEqual({
      element: dayMaster.element,
      branch,
      upstreamLightRootState: 'yuqi_light_root_established',
      state: 'applicable_bounded_yuqi_root_operand',
      boundedOperandKind: 'applicable_yuqi_root',
      authority: 'research_only',
    });
  });

  test('keeps a governed nonmatch outside both bounded operands', () => {
    const lightRoot = evaluateMukuYuqiLightRoot(DAY_MASTERS.목, '자');
    expect(lightRoot.lightRootState).toBe('no_governed_light_root_match');

    const bound = bindMukuYuqiLightRootToBoundedOperand(lightRoot);
    expect(bound.state).toBe('not_applicable_bounded_light_root_operand');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test('preserves the Earth boundary as unresolved instead of inventing a Yuqi or no-root result', () => {
    const lightRoot = evaluateMukuYuqiLightRoot(DAY_MASTERS.토, '축');
    expect(lightRoot.lightRootState).toBe('earth_boundary_unresolved');

    const bound = bindMukuYuqiLightRootToBoundedOperand(lightRoot);
    expect(bound.state).toBe('earth_boundary_unresolved');
    expect(bound.boundedOperandKind).toBeNull();
  });

  test('consumes exactly one upstream evaluation and keeps local rediscovery/comparison authority closed', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_AUTHORITY;
    expect(bindMukuYuqiLightRootToBoundedOperand.length).toBe(1);
    expect(authority.decision).toBe('AUTHORIZED_RESEARCH_ONLY');
    expect(authority.directSourceOnePeerLessThanMukuObserved).toBe(true);
    expect(authority.directSourceTwoPeersLessThanYuqiObserved).toBe(true);
    expect(authority.directSourceMukuYuqiLightRootSemanticObserved).toBe(true);
    expect(authority.upstreamBoundedOperandsAvailableObservationOnly).toBe(true);
    expect(authority.upstreamMukuYuqiEvaluatorAvailableResearchOnly).toBe(true);
    expect(authority.upstreamMukuBindingObserved).toBe(true);
    expect(authority.upstreamYuqiBindingObserved).toBe(true);
    expect(authority.governedMukuToBoundedOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.governedYuqiToBoundedOperandAuthorizedResearchOnly).toBe(true);
    expect(authority.earthYuqiMappingResolved).toBe(false);
    expect(authority.upstreamMukuYuqiEvaluationConsumed).toBe(true);
    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.hiddenStemMembershipConsumed).toBe(false);
    expect(authority.hiddenStemArrayOrderConsumed).toBe(false);
    expect(authority.twelveGrowthMuConsumed).toBe(false);
    expect(authority.peerStemCountConsumed).toBe(false);
    expect(authority.chartLevelRootComparisonEvaluatorAuthorized).toBe(false);
    expect(GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('keeps weighting, ranking, Gyeokguk, production, and Commerce escalation closed', () => {
    const authority = GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_AUTHORITY;
    expect(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.earthYuqiMappingResolved).toBe(false);
    expect(GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.chartLevelComparisonEvaluatorAuthorized).toBe(false);
    expect(authority.transitiveClosureAuthorized).toBe(false);
    expect(authority.generalizedGlobalRootRankingAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.linearWeightScaleAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
