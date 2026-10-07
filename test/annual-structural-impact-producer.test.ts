import { describe, expect, test } from 'vitest';
import { resolved } from '../src/contracts/common.js';
import type {
  BranchFact,
  CanonicalSajuSnapshot,
  PillarFact,
  StemFact,
  StemInteractionSettlementFact,
} from '../src/contracts/calculation.js';
import type { StructuralRoleAssignment } from '../src/calculation/structural-role-impact.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY,
  ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY_CONTENT_HASH,
  deriveAnnualTemporalRootSupportObservationV1,
  deriveAnnualTemporalSettlementOverlayV1,
  produceAnnualStructuralImpactBundleV1,
  type AnnualTemporalStemSourceV1,
} from '../src/reading/annual-structural-impact-producer.js';
import { resolveAnnualTemporalStructureIntegration } from '../src/reading/annual-temporal-structure-integration.js';
import type { GovernedTemporalStructureBaseline } from '../src/calculation/temporal-structure-transition.js';

const STEMS: Record<'갑' | '기' | '경' | '임', StemFact> = {
  갑: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
  기: { value: '기', hanja: '己', element: '토', yinYang: '음' },
  경: { value: '경', hanja: '庚', element: '금', yinYang: '양' },
  임: { value: '임', hanja: '壬', element: '수', yinYang: '양' },
};
const BRANCHES: Record<'사' | '오' | '진' | '축', BranchFact> = {
  사: { value: '사', hanja: '巳', element: '화', yinYang: '음' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
  진: { value: '진', hanja: '辰', element: '토', yinYang: '양' },
  축: { value: '축', hanja: '丑', element: '토', yinYang: '음' },
};

function pillar(stem: keyof typeof STEMS, branch: keyof typeof BRANCHES): PillarFact {
  return { stem: STEMS[stem], branch: BRANCHES[branch] };
}

function settlement(): StemInteractionSettlementFact {
  return {
    settlementId: 'natal-settlement-r198',
    relationId: 'stem_five_combination:year:stem:갑|month:stem:기',
    kind: 'stem_five_combination',
    scope: 'non_day_master_stem_five_combination',
    pair: ['갑', '기'],
    transformationApplied: false,
    activeRelations: ['stem_five_combination', 'element_control'],
    pairControlEffective: true,
    externalInfluences: [],
    participants: {
      controller: {
        pillar: 'year',
        stem: '갑',
        tenGod: '식신',
        element: '목',
        identityPreserved: true,
        baseFunctionState: 'constrained',
        incomingInfluenceSummary: 'none',
        incomingInfluences: [],
        functionState: 'constrained',
      },
      controlled: {
        pillar: 'month',
        stem: '기',
        tenGod: '정관',
        element: '토',
        identityPreserved: true,
        baseFunctionState: 'impaired',
        incomingInfluenceSummary: 'none',
        incomingInfluences: [],
        functionState: 'impaired',
      },
    },
  };
}

function request(year: number): ReadingRequest {
  return {
    requestId: `r198-${year}`,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: `${year}-06-15T12:00:00.000Z`,
      resolution: 'relative_current',
    },
  };
}

function snapshot(dayunBranch: '오' | '진' = '오'): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
  );
  const safeNatalPillar = pillar('갑', '사');
  const luckPillars = Array.from({ length: 10 }, (_, index) => ({
    age: 1 + index * 10,
    pillar: pillar('경', dayunBranch),
  }));

  return {
    ...base,
    pillars: {
      year: resolved(safeNatalPillar),
      month: resolved(pillar('기', '사')),
      day: resolved(safeNatalPillar),
      hour: resolved(safeNatalPillar),
    },
    luckCycle: resolved({
      direction: 'forward',
      start: { age: 1, years: 1, months: 0, days: 0 },
      pillars: luckPillars,
    }),
    derivedFacts: {
      ...base.derivedFacts,
      stemInteractionSettlements: resolved([settlement()]),
    },
  };
}

const assignments: readonly StructuralRoleAssignment[] = [
  {
    roleAssignmentId: 'role-controller-core-support',
    structureId: 'structure-r198',
    authority: 'governed_upstream',
    pillar: 'year',
    stem: '갑',
    tenGod: '식신',
    disposition: 'supports_structure',
    criticality: 'core',
  },
  {
    roleAssignmentId: 'role-controlled-supporting-harm',
    structureId: 'structure-r198',
    authority: 'governed_upstream',
    pillar: 'month',
    stem: '기',
    tenGod: '정관',
    disposition: 'harms_structure',
    criticality: 'supporting',
  },
];

describe('R198 bounded annual structural impact producer', () => {
  test('coexists annual support and Dayun control without temporal precedence', () => {
    const current = snapshot();
    const result = produceAnnualStructuralImpactBundleV1(
      current,
      request(2042),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '임',
      branch: '술',
    });
    expect(result.dayunPillar).toMatchObject({
      stem: { value: '경' },
      branch: { value: '오' },
    });
    const overlay = result.overlays[0];
    expect(overlay).toBeDefined();
    expect(overlay?.temporalInfluences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sourceLayer: 'annual',
          sourceStem: '임',
          targetRole: 'controller',
          kind: 'support',
        }),
        expect.objectContaining({
          sourceLayer: 'dayun',
          sourceStem: '경',
          targetRole: 'controller',
          kind: 'control',
        }),
      ]),
    );
    expect(overlay?.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(overlay?.settlement.pairControlEffective).toBe(false);
    expect(overlay?.settlement.participants.controlled.functionState).toBe(
      'constrained',
    );
    expect(result.assessments[0]?.overallImpact).toBe('weakens_structure');
    expect(result.bundle.producerRef).toEqual({
      id: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.policyId,
      version: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.policyVersion,
    });
  });

  test('CONTROL outranks SUPPORT and source enumeration order cannot change overlay', () => {
    const sources: readonly AnnualTemporalStemSourceV1[] = [
      { layer: 'annual', stem: '임', element: '수' },
      { layer: 'dayun', stem: '경', element: '금' },
    ];
    const forward = deriveAnnualTemporalSettlementOverlayV1(
      settlement(),
      2042,
      sources,
    );
    const reverse = deriveAnnualTemporalSettlementOverlayV1(
      settlement(),
      2042,
      [...sources].reverse(),
    );
    expect(reverse).toEqual(forward);
    expect(forward.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(forward.temporalInfluences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ kind: 'support' }),
        expect.objectContaining({ kind: 'control' }),
      ]),
    );
  });

  test('does not mutate the canonical natal settlement', () => {
    const current = snapshot();
    const before = structuredClone(
      current.derivedFacts.stemInteractionSettlements,
    );
    const result = produceAnnualStructuralImpactBundleV1(
      current,
      request(2042),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    expect(current.derivedFacts.stemInteractionSettlements).toEqual(before);
    if (result.status === 'resolved') {
      expect(result.overlays[0]?.settlement.settlementId).not.toBe(
        settlement().settlementId,
      );
    }
  });

  test('fails closed when a temporal branch relation requires unresolved settlement', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('진'),
      request(2042),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([expect.stringContaining('clash:annual:술|dayun:진')]),
    );
  });

  test('admits branch-quiet annual root support as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2048),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '무',
      branch: '진',
    });
    expect(result.rootSupportObservations).toEqual([
      {
        layer: 'annual',
        stem: '무',
        branch: '진',
        stemElement: '토',
        hiddenStems: ['을', '무', '계'],
        sameElementHiddenStems: ['무'],
        rootSupportObserved: true,
        semantics: {
          qualifierOnly: true,
          numericWeightAssigned: false,
          functionStateOverrideAuthorized: false,
          temporalPrecedenceAuthorized: false,
        },
      },
      {
        layer: 'dayun',
        stem: '경',
        branch: '오',
        stemElement: '금',
        hiddenStems: ['정', '기'],
        sameElementHiddenStems: [],
        rootSupportObserved: false,
        semantics: {
          qualifierOnly: true,
          numericWeightAssigned: false,
          functionStateOverrideAuthorized: false,
          temporalPrecedenceAuthorized: false,
        },
      },
    ]);
    expect(result.overlays[0]?.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(result.overlays[0]?.settlement.participants.controlled.functionState).toBe(
      'constrained',
    );
  });

  test('root support observation itself does not change stem overlay state', () => {
    const observation = deriveAnnualTemporalRootSupportObservationV1(
      'annual',
      '무',
      '진',
    );
    expect(observation.rootSupportObserved).toBe(true);

    const overlay = deriveAnnualTemporalSettlementOverlayV1(
      settlement(),
      2048,
      [
        { layer: 'annual', stem: '무', element: '토' },
        { layer: 'dayun', stem: '경', element: '금' },
      ],
    );
    expect(overlay.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(overlay.settlement.participants.controlled.functionState).toBe(
      'constrained',
    );
  });

  test('admits exactly one isolated temporal six-combination as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2039),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '기',
      branch: '미',
    });
    expect(result.sixCombinationObservations).toEqual([
      {
        relationId: 'six_combination:annual:미|dayun:오',
        relationKind: 'six_combination',
        semantics: {
          qualifierOnly: true,
          bindingObserved: true,
          transformationApplied: false,
          conflictResolutionAuthorized: false,
          functionStateOverrideAuthorized: false,
          temporalPrecedenceAuthorized: false,
          numericWeightAssigned: false,
        },
      },
    ]);
    expect(result.overlays[0]?.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(result.overlays[0]?.settlement.participants.controlled.functionState).toBe(
      'constrained',
    );
  });

  test('keeps a six-combination blocked when another branch relation competes', () => {
    const current = snapshot();
    const mixed = {
      ...current,
      pillars: {
        ...current.pillars,
        year: resolved(pillar('갑', '축')),
      },
    } satisfies CanonicalSajuSnapshot;

    const result = produceAnnualStructuralImpactBundleV1(
      mixed,
      request(2039),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([
        'clash:natal:year:축|annual:미',
        'six_combination:annual:미|dayun:오',
      ]),
    );
  });

  test('fails closed instead of collapsing a Dayun transition year', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2041),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('dayun_boundary_year_unsupported');
  });

  test('missing governed role assignment fails closed', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2042),
      'structure-r198',
      assignments.slice(0, 1),
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('structural_role_impact_unavailable');
    expect(result.structuralRoleReasonCode).toBe('missing_role_assignment');
  });

  test('produced bundle is directly consumable by the R194 temporal transition path', () => {
    const current = snapshot();
    const produced = produceAnnualStructuralImpactBundleV1(
      current,
      request(2042),
      'structure-r198',
      assignments,
    );
    if (produced.status !== 'resolved') throw new Error('expected resolved');

    const baseline: GovernedTemporalStructureBaseline = {
      baselineId: 'baseline-r198',
      structureId: 'structure-r198',
      authority: 'governed_upstream',
      state: 'intact',
    };
    const integrated = resolveAnnualTemporalStructureIntegration(
      current,
      request(2042),
      baseline,
      produced.bundle,
    );
    expect(integrated.status).toBe('resolved');
    if (integrated.status !== 'resolved') throw new Error('expected resolved');
    expect(integrated.transition.periodImpact).toBe('weakens_structure');
    expect(integrated.transition.nextState).toBe('weakened');
  });

  test('same governed input is deterministic and content-addressed', () => {
    const current = snapshot();
    const first = produceAnnualStructuralImpactBundleV1(
      current,
      request(2042),
      'structure-r198',
      assignments,
    );
    const second = produceAnnualStructuralImpactBundleV1(
      current,
      request(2042),
      'structure-r198',
      [...assignments].reverse(),
    );
    expect(second).toEqual(first);
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY_CONTENT_HASH).toMatch(
      /^[0-9a-f]{64}$/u,
    );
  });

  test('policy remains bounded and non-event-producing', () => {
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.scope).toBe(
      'ISOLATED_LIUHE_QUALIFIER_SINGLE_DAYUN_SEGMENT_STEM_OVERLAY',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.eventRule).toBe('NONE');
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.branchRule).toBe(
      'ADMIT_ONE_ISOLATED_SIX_COMBINATION_AS_QUALIFIER_OTHERWISE_FAIL_CLOSED',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.sixCombinationRule).toBe(
      'QUALIFIER_ONLY_NO_TRANSFORMATION_OR_CONFLICT_RESOLUTION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.rootRule).toBe(
      'OBSERVE_AS_QUALIFIER_WITHOUT_WEIGHT_OR_OVERRIDE',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.numericWeightRule).toBe(
      'NONE',
    );
  });
});
