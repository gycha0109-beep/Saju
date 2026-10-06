import { describe, expect, test } from 'vitest';
import { resolved } from '../src/contracts/common.js';
import type {
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
  resolveStructureImpactFromFunctionState,
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

function dayMasterOutside(pair: readonly [HeavenlyStem, HeavenlyStem]): HeavenlyStem {
  const found = ALL_STEMS.find((stem) => !pair.includes(stem));
  if (found === undefined) throw new Error('day-master fixture missing');
  return found;
}

describe('R189/R190 deterministic stem-five-combination settlement policy', () => {
  test('preserves the R189 Jia-Ji result under the generalized controller/controlled contract', () => {
    const settlements = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
    );

    expect(settlements).toHaveLength(1);
    expect(settlements[0]).toMatchObject({
      pair: ['갑', '기'],
      transformationApplied: false,
      activeRelations: ['stem_five_combination', 'element_control'],
      participants: {
        controller: {
          pillar: 'year',
          stem: '갑',
          tenGod: '식신',
          element: '목',
          identityPreserved: true,
          functionState: 'constrained',
        },
        controlled: {
          pillar: 'month',
          stem: '기',
          tenGod: '정관',
          element: '토',
          identityPreserved: true,
          functionState: 'impaired',
        },
      },
    });
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY.policyVersion).toBe('1.0.0');
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('settles all five combinations with the fixed five-element control direction', () => {
    expect(STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS).toHaveLength(5);

    for (const definition of STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS) {
      const settlements = deriveAdoptedStemInteractionSettlements(
        [
          relation(
            { pillar: 'year', value: definition.pair[0] },
            { pillar: 'month', value: definition.pair[1] },
          ),
        ],
        tenGods,
        dayMasterOutside(definition.pair),
      );

      expect(settlements).toHaveLength(1);
      const settlement = settlements[0];
      expect(settlement?.pair).toEqual(definition.pair);
      expect(settlement?.participants.controller.stem).toBe(definition.controller);
      expect(settlement?.participants.controller.functionState).toBe('constrained');
      expect(settlement?.participants.controlled.stem).toBe(definition.controlled);
      expect(settlement?.participants.controlled.functionState).toBe('impaired');
      expect(settlement?.transformationApplied).toBe(false);
    }
  });

  test('participant order cannot reverse controller and controlled roles', () => {
    for (const definition of STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS) {
      const dayMaster = dayMasterOutside(definition.pair);
      const forward = deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'year', value: definition.pair[0] }, { pillar: 'month', value: definition.pair[1] })],
        tenGods,
        dayMaster,
      );
      const reverse = deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'month', value: definition.pair[1] }, { pillar: 'year', value: definition.pair[0] })],
        tenGods,
        dayMaster,
      );
      expect(reverse[0]?.participants).toEqual(forward[0]?.participants);
    }
  });

  test('day-pillar participation and same-stem day masters stay outside v1 scope', () => {
    for (const definition of STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS) {
      expect(
        deriveAdoptedStemInteractionSettlements(
          [relation({ pillar: 'day', value: definition.pair[0] }, { pillar: 'month', value: definition.pair[1] })],
          tenGods,
          definition.pair[0],
        ),
      ).toEqual([]);

      expect(
        deriveAdoptedStemInteractionSettlements(
          [relation({ pillar: 'year', value: definition.pair[0] }, { pillar: 'month', value: definition.pair[1] })],
          tenGods,
          definition.pair[1],
        ),
      ).toEqual([]);
    }
  });

  test('structure impact remains a deterministic function of controlled-role disposition', () => {
    expect(resolveStructureImpactFromFunctionState('impaired', 'supports_structure')).toBe(
      'weakens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('impaired', 'harms_structure')).toBe(
      'strengthens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('impaired', 'neutral')).toBe(
      'maintains_structure',
    );
  });

  test('identical input is deterministic across repeated evaluation', () => {
    const definition = STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS[3];
    if (definition === undefined) throw new Error('fixture definition missing');
    const input = [
      relation({ pillar: 'year', value: definition.pair[0] }, { pillar: 'month', value: definition.pair[1] }),
    ];
    const dayMaster = dayMasterOutside(definition.pair);
    const baseline = deriveAdoptedStemInteractionSettlements(input, tenGods, dayMaster);

    for (let index = 0; index < 100; index += 1) {
      expect(deriveAdoptedStemInteractionSettlements(input, tenGods, dayMaster)).toEqual(
        baseline,
      );
    }

    expect(STEM_FIVE_COMBINATION_SETTLEMENT_POLICY.policyVersion).toBe('1.0.0');
    expect(STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('default reading projection exposes only settled semantics', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '정' }, { pillar: 'month', value: '임' })],
      tenGods,
      '갑',
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
    expect(projected.participants.controller.stem).toBe('임');
    expect(projected.participants.controlled.stem).toBe('정');
    expect(impact.affectedStem).toBe('정');
    expect(impact.structureImpact).toBe('weakens_structure');
  });
});
