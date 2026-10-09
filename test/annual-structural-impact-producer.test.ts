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
const BRANCHES: Record<'사' | '오' | '진' | '축' | '자' | '인' | '유', BranchFact> = {
  사: { value: '사', hanja: '巳', element: '화', yinYang: '음' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
  진: { value: '진', hanja: '辰', element: '토', yinYang: '양' },
  축: { value: '축', hanja: '丑', element: '토', yinYang: '음' },
  자: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  인: { value: '인', hanja: '寅', element: '목', yinYang: '양' },
  유: { value: '유', hanja: '酉', element: '금', yinYang: '음' },
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

function snapshot(
  dayunBranch: '오' | '진' | '자' | '인' | '사' | '축' = '오',
  natalBranch: '사' | '자' = '사',
): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
  );
  const safeNatalPillar = pillar('갑', natalBranch);
  const luckPillars = Array.from({ length: 10 }, (_, index) => ({
    age: 1 + index * 10,
    pillar: pillar('경', dayunBranch),
  }));

  return {
    ...base,
    pillars: {
      year: resolved(safeNatalPillar),
      month: resolved(pillar('기', natalBranch)),
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

  test('admits exactly one isolated temporal Zi-Mao punishment pair as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('자'),
      request(2035),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '을',
      branch: '묘',
    });
    expect(result.punishmentPairObservations).toEqual([
      {
        relationId: 'punishment_pair:annual:묘|dayun:자',
        relationKind: 'punishment_pair',
        semantics: {
          qualifierOnly: true,
          relationIdentityObserved: true,
          reciprocalPunishmentPairObserved: true,
          punishmentEffectAuthorized: false,
          favorableOrHarmfulInferenceAuthorized: false,
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
      'impaired',
    );
    expect(result.overlays[0]?.settlement.pairControlEffective).toBe(false);
    expect(result.overlays[0]?.temporalInfluences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sourceLayer: 'annual',
          sourceStem: '을',
          targetRole: 'controlled',
          kind: 'control',
        }),
        expect.objectContaining({
          sourceLayer: 'dayun',
          sourceStem: '경',
          targetRole: 'controller',
          kind: 'control',
        }),
      ]),
    );
  });

  test('keeps Zi-Mao punishment pair blocked when another branch relation competes', () => {
    const current = snapshot('자');
    const mixed = {
      ...current,
      pillars: {
        ...current.pillars,
        year: resolved(pillar('갑', '유')),
      },
    } satisfies CanonicalSajuSnapshot;

    const result = produceAnnualStructuralImpactBundleV1(
      mixed,
      request(2035),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([
        'clash:natal:year:유|annual:묘',
        'punishment_pair:annual:묘|dayun:자',
      ]),
    );
  });

  test('admits one isolated source-directed Yin-Si punishment pair as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('인', '자'),
      request(2037),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.directedPunishmentPairObservations).toEqual([
      {
        relationId:
          'punishment_directed_pair:punisher:dayun:인->punished:annual:사',
        relationKind: 'punishment_directed_pair',
        punisherBranch: '인',
        punishedBranch: '사',
        semantics: {
          qualifierOnly: true,
          relationIdentityObserved: true,
          sourceDirectionObserved: true,
          punishmentEffectAuthorized: false,
          favorableOrHarmfulInferenceAuthorized: false,
          conflictResolutionAuthorized: false,
          functionStateOverrideAuthorized: false,
          temporalPrecedenceAuthorized: false,
          numericWeightAssigned: false,
          fullFamilyAmplificationAuthorized: false,
        },
      },
    ]);
    expect(result.overlays[0]?.settlement.participants.controller.functionState).toBe(
      'impaired',
    );
    expect(result.overlays[0]?.settlement.participants.controlled.functionState).toBe(
      'constrained',
    );
    expect(result.overlays[0]?.settlement.pairControlEffective).toBe(false);

    const repeated = produceAnnualStructuralImpactBundleV1(
      snapshot('인', '자'),
      request(2037),
      'structure-r198',
      assignments,
    );
    expect(repeated.status).toBe('resolved');
    if (repeated.status !== 'resolved') throw new Error('expected resolved');
    expect(repeated.producerId).toBe(result.producerId);
    expect(repeated.directedPunishmentPairObservations).toEqual(
      result.directedPunishmentPairObservations,
    );
  });

  test('canonicalizes the same Yin-Si source direction when annual/dayun layers are reversed', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('사', '자'),
      request(2034),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.directedPunishmentPairObservations).toEqual([
      expect.objectContaining({
        relationId:
          'punishment_directed_pair:punisher:annual:인->punished:dayun:사',
        punisherBranch: '인',
        punishedBranch: '사',
      }),
    ]);
  });

  test('admits one isolated Chou-Xu directed punishment pair without promoting effect', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('축'),
      request(2030),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.directedPunishmentPairObservations).toEqual([
      expect.objectContaining({
        relationId:
          'punishment_directed_pair:punisher:dayun:축->punished:annual:술',
        punisherBranch: '축',
        punishedBranch: '술',
        semantics: expect.objectContaining({
          qualifierOnly: true,
          punishmentEffectAuthorized: false,
          favorableOrHarmfulInferenceAuthorized: false,
          fullFamilyAmplificationAuthorized: false,
        }),
      }),
    ]);
  });

  test('keeps directed punishment pairs fail-closed when another directed relation competes', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot('인'),
      request(2037),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds?.length).toBeGreaterThan(1);
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([
        'punishment_directed_pair:punisher:dayun:인->punished:annual:사',
      ]),
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

  test('admits exactly one isolated temporal six-clash pair as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2032),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '임',
      branch: '자',
    });
    expect(result.sixClashObservations).toEqual([
      {
        relationId: 'clash:annual:자|dayun:오',
        relationKind: 'clash',
        semantics: {
          qualifierOnly: true,
          pairIdentityObserved: true,
          effectiveClashAuthorized: false,
          conflictResolutionAuthorized: false,
          favorableOrHarmfulInferenceAuthorized: false,
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

  test('admits exactly one isolated temporal self-punishment as qualifier-only context', () => {
    const result = produceAnnualStructuralImpactBundleV1(
      snapshot(),
      request(2026),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.annualFacts.annualPillar).toMatchObject({
      stem: '병',
      branch: '오',
    });
    expect(result.selfPunishmentObservations).toEqual([
      {
        relationId: 'self_punishment:annual|dayun:오',
        relationKind: 'self_punishment',
        semantics: {
          qualifierOnly: true,
          relationIdentityObserved: true,
          repeatedSameBranchObserved: true,
          punishmentEffectAuthorized: false,
          favorableOrHarmfulInferenceAuthorized: false,
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

  test('keeps self-punishment blocked when another branch relation competes', () => {
    const current = snapshot();
    const mixed = {
      ...current,
      pillars: {
        ...current.pillars,
        year: resolved(pillar('갑', '자')),
      },
    } satisfies CanonicalSajuSnapshot;

    const result = produceAnnualStructuralImpactBundleV1(
      mixed,
      request(2026),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([
        'clash:natal:year:자|annual:오',
        'clash:natal:year:자|dayun:오',
        'self_punishment:annual|dayun:오',
      ]),
    );
  });

  test('keeps a six-clash pair blocked when a six-combination competes', () => {
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
      request(2032),
      'structure-r198',
      assignments,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('branch_relation_requires_settlement');
    expect(result.branchRelationIds).toEqual(
      expect.arrayContaining([
        'six_combination:natal:year:축|annual:자',
        'clash:annual:자|dayun:오',
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
      'ISOLATED_LIUHE_LIUCHONG_SELF_PUNISHMENT_ZIMAO_OR_DIRECTED_PUNISHMENT_PAIR_QUALIFIER_SINGLE_DAYUN_SEGMENT_STEM_OVERLAY',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.eventRule).toBe('NONE');
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.branchRule).toBe(
      'ADMIT_ONE_ISOLATED_SIX_COMBINATION_SIX_CLASH_SELF_PUNISHMENT_ZIMAO_OR_DIRECTED_PUNISHMENT_PAIR_AS_QUALIFIER_OTHERWISE_FAIL_CLOSED',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.sixCombinationRule).toBe(
      'QUALIFIER_ONLY_NO_TRANSFORMATION_OR_CONFLICT_RESOLUTION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.sixClashRule).toBe(
      'PAIR_IDENTITY_ONLY_NO_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.selfPunishmentRule).toBe(
      'RELATION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.punishmentPairRule).toBe(
      'ZIMAO_RELATION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.punishmentFamilyDetectionRule).toBe(
      'SOURCE_DIRECTED_PAIR_IDENTITY_ONLY',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.directedPunishmentPairRule).toBe(
      'SOURCE_DIRECTION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_CONFLICT_RESOLUTION_OR_FAMILY_AMPLIFICATION',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.policyVersion).toBe('1.6.0');
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.decisionRef).toBe('GH-2377');
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.rootRule).toBe(
      'OBSERVE_AS_QUALIFIER_WITHOUT_WEIGHT_OR_OVERRIDE',
    );
    expect(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.numericWeightRule).toBe(
      'NONE',
    );
  });
});
