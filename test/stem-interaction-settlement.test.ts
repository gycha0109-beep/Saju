import { describe, expect, test } from 'vitest';
import { resolved } from '../src/contracts/common.js';
import type {
  FiveElement,
  HeavenlyStem,
  PillarSlot,
  StructuralRelationCandidate,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import {
  deriveAdoptedStemInteractionSettlements,
  JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY,
  JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH,
  STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS,
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY,
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
  STEM_THIRD_PARTY_INTERFERENCE_POLICY,
  STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH,
  resolveStructureImpactFromFunctionState,
  type VisibleStemInteractionSubject,
} from '../src/calculation/stem-interaction-settlement.js';
import {
  projectStemInteractionSettlementForReading,
  projectStemInteractionStructureImpactForReading,
} from '../src/reading/stem-interaction-settlement-projection.js';

const tenGods: TenGodChartFact = {
  year: { stem: resolved('식신'), branch: resolved('비견') },
  month: { stem: resolved('정관'), branch: resolved('겁재') },
  day: { stem: resolved('일간'), branch: resolved('편인') },
  hour: { stem: resolved('편재'), branch: resolved('정재') },
};

const ALL_STEMS: readonly HeavenlyStem[] = [
  '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계',
];

const ELEMENTS: Readonly<Record<HeavenlyStem, FiveElement>> = {
  갑: '목',
  을: '목',
  병: '화',
  정: '화',
  무: '토',
  기: '토',
  경: '금',
  신: '금',
  임: '수',
  계: '수',
};

function relation(
  left: { pillar: PillarSlot; value: HeavenlyStem },
  right: { pillar: PillarSlot; value: HeavenlyStem },
): StructuralRelationCandidate {
  return {
    relationId: `stem_five_combination:${left.pillar}:stem:${left.value}|${right.pillar}:stem:${right.value}`,
    kind: 'stem_five_combination',
    participants: [
      { pillar: left.pillar, component: 'stem', value: left.value },
      { pillar: right.pillar, component: 'stem', value: right.value },
    ],
    sourceIds: ['TEST'],
    semantics: {
      structuralMatchOnly: true,
      transformationEstablished: false,
    },
  };
}

function visible(
  pillar: PillarSlot,
  stem: HeavenlyStem,
): VisibleStemInteractionSubject {
  return { pillar, stem, element: ELEMENTS[stem] };
}

function dayMasterOutside(pair: readonly [HeavenlyStem, HeavenlyStem]): HeavenlyStem {
  const found = ALL_STEMS.find((stem) => !pair.includes(stem));
  if (found === undefined) throw new Error('day-master fixture missing');
  return found;
}

describe('R189-R191 deterministic stem interaction settlement policy', () => {
  test('preserves the R190 result when no external third-party influence is supplied', () => {
    const settlements = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
    );

    expect(settlements).toHaveLength(1);
    expect(settlements[0]).toMatchObject({
      pair: ['갑', '기'],
      transformationApplied: false,
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
    });
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY.policyVersion).toBe('1.0.0');
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('preserves all five R190 control directions before external interference', () => {
    expect(STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS).toHaveLength(5);

    for (const definition of STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS) {
      const settlement = deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'year', value: definition.pair[0] }, { pillar: 'month', value: definition.pair[1] })],
        tenGods,
        dayMasterOutside(definition.pair),
      )[0];

      expect(settlement?.participants.controller.stem).toBe(definition.controller);
      expect(settlement?.participants.controller.functionState).toBe('constrained');
      expect(settlement?.participants.controlled.stem).toBe(definition.controlled);
      expect(settlement?.participants.controlled.functionState).toBe('impaired');
      expect(settlement?.pairControlEffective).toBe(true);
    }
  });

  test('third-party control against the controller impairs it and releases the controlled side to constrained', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), visible('hour', '경')],
    )[0];

    expect(settlement?.participants.controller.incomingInfluenceSummary).toBe('control_only');
    expect(settlement?.participants.controller.functionState).toBe('impaired');
    expect(settlement?.pairControlEffective).toBe(false);
    expect(settlement?.participants.controlled.functionState).toBe('constrained');
    expect(settlement?.externalInfluences).toEqual([
      expect.objectContaining({
        sourcePillar: 'hour',
        sourceStem: '경',
        targetRole: 'controller',
        targetStem: '갑',
        kind: 'control',
      }),
    ]);
  });

  test('third-party support to the controlled side relieves impairment only to constrained', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), visible('hour', '병')],
    )[0];

    expect(settlement?.participants.controller.functionState).toBe('constrained');
    expect(settlement?.pairControlEffective).toBe(true);
    expect(settlement?.participants.controlled.incomingInfluenceSummary).toBe('support_only');
    expect(settlement?.participants.controlled.functionState).toBe('constrained');
  });

  test('third-party direct control against the controlled side keeps it impaired', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), visible('hour', '을')],
    )[0];

    expect(settlement?.participants.controlled.incomingInfluenceSummary).toBe('control_only');
    expect(settlement?.participants.controlled.functionState).toBe('impaired');
  });

  test('control outranks support for the same target without numeric counting and source order cannot change the result', () => {
    const baseRelation = relation(
      { pillar: 'year', value: '갑' },
      { pillar: 'month', value: '기' },
    );
    const sources = [
      visible('hour', '경'),
      visible('hour', '계'),
    ] as const;

    const forward = deriveAdoptedStemInteractionSettlements(
      [baseRelation],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), ...sources],
    )[0];
    const reverse = deriveAdoptedStemInteractionSettlements(
      [baseRelation],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), ...[...sources].reverse()],
    )[0];

    expect(forward?.participants.controller.incomingInfluenceSummary).toBe('mixed');
    expect(forward?.participants.controller.functionState).toBe('impaired');
    expect(forward?.pairControlEffective).toBe(false);
    expect(reverse).toEqual(forward);
  });

  test('day stem is never consumed as an external interferer', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), visible('day', '경')],
    )[0];

    expect(settlement?.externalInfluences).toEqual([]);
    expect(settlement?.participants.controller.functionState).toBe('constrained');
    expect(settlement?.participants.controlled.functionState).toBe('impaired');
  });

  test('participant order cannot reverse controller and controlled roles', () => {
    const forward = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '정' }, { pillar: 'month', value: '임' })],
      tenGods,
      '갑',
      [visible('year', '정'), visible('month', '임'), visible('hour', '토' as HeavenlyStem)],
    );
    const reverse = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'month', value: '임' }, { pillar: 'year', value: '정' })],
      tenGods,
      '갑',
    );
    expect(forward[0]?.participants.controller.stem).toBe('임');
    expect(reverse[0]?.participants.controller.stem).toBe('임');
  });

  test('structure impact remains a deterministic function of final controlled-role state', () => {
    expect(resolveStructureImpactFromFunctionState('impaired', 'supports_structure')).toBe(
      'weakens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('constrained', 'harms_structure')).toBe(
      'strengthens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('preserved', 'supports_structure')).toBe(
      'maintains_structure',
    );
  });

  test('policy identities remain content-addressed', () => {
    expect(STEM_FIVE_COMBINATION_SETTLEMENT_POLICY.policyVersion).toBe('1.0.0');
    expect(STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
    expect(STEM_THIRD_PARTY_INTERFERENCE_POLICY.policyVersion).toBe('1.0.0');
    expect(STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('default reading projection exposes settled network semantics but no research uncertainty metadata', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
      [visible('year', '갑'), visible('month', '기'), visible('hour', '경')],
    )[0];
    if (settlement === undefined) throw new Error('fixture settlement missing');

    const projected = projectStemInteractionSettlementForReading(settlement);
    const impact = projectStemInteractionStructureImpactForReading(
      settlement,
      'supports_structure',
    );
    const serialized = JSON.stringify({ projected, impact });

    expect(serialized).not.toMatch(
      /research|hold|uncertain|conflict|provenance|source|policy/i,
    );
    expect(projected.pairControlEffective).toBe(false);
    expect(projected.participants.controller.functionState).toBe('impaired');
    expect(projected.participants.controlled.functionState).toBe('constrained');
    expect(impact.functionState).toBe('constrained');
  });
});
