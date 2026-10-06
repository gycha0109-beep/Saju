import { describe, expect, test } from 'vitest';
import { resolved } from '../src/contracts/common.js';
import type {
  StructuralRelationCandidate,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import {
  deriveAdoptedStemInteractionSettlements,
  JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY,
  JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH,
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

function relation(
  left: { pillar: 'year' | 'month' | 'day' | 'hour'; value: '갑' | '기' | '을' | '경' },
  right: { pillar: 'year' | 'month' | 'day' | 'hour'; value: '갑' | '기' | '을' | '경' },
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

describe('R189 deterministic non-day-master Jia-Ji settlement policy', () => {
  test('settles exact non-day-master Jia-Ji to constrained Jia and impaired Ji', () => {
    const settlements = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
    );

    expect(settlements).toHaveLength(1);
    expect(settlements[0]).toMatchObject({
      pair: ['갑', '기'],
      transformationApplied: false,
      activeRelations: ['stem_five_combination', 'jia_controls_ji'],
      participants: {
        jia: {
          pillar: 'year',
          stem: '갑',
          tenGod: '식신',
          element: '목',
          identityPreserved: true,
          functionState: 'constrained',
        },
        ji: {
          pillar: 'month',
          stem: '기',
          tenGod: '정관',
          element: '토',
          identityPreserved: true,
          functionState: 'impaired',
        },
      },
    });
  });

  test('participant order cannot change the semantic result', () => {
    const forward = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
    );
    const reverse = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'month', value: '기' }, { pillar: 'year', value: '갑' })],
      tenGods,
      '임',
    );

    expect(reverse[0]?.participants).toEqual(forward[0]?.participants);
    expect(reverse[0]?.transformationApplied).toBe(false);
  });

  test('day-stem participation and Jia/Ji day-master identity stay out of v1 scope', () => {
    expect(
      deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'day', value: '갑' }, { pillar: 'month', value: '기' })],
        tenGods,
        '갑',
      ),
    ).toEqual([]);

    expect(
      deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
        tenGods,
        '기',
      ),
    ).toEqual([]);
  });

  test('other five-combination pairs do not enter Jia-Ji settlement', () => {
    expect(
      deriveAdoptedStemInteractionSettlements(
        [relation({ pillar: 'year', value: '을' }, { pillar: 'month', value: '경' })],
        tenGods,
        '임',
      ),
    ).toEqual([]);
  });

  test('structure impact depends on the governed role disposition, not the LLM', () => {
    expect(resolveStructureImpactFromFunctionState('impaired', 'supports_structure')).toBe(
      'weakens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('impaired', 'harms_structure')).toBe(
      'strengthens_structure',
    );
    expect(resolveStructureImpactFromFunctionState('impaired', 'neutral')).toBe(
      'maintains_structure',
    );
    expect(resolveStructureImpactFromFunctionState('preserved', 'supports_structure')).toBe(
      'maintains_structure',
    );
  });

  test('identical input is deterministic across repeated evaluation', () => {
    const input = [
      relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' }),
    ];
    const baseline = deriveAdoptedStemInteractionSettlements(input, tenGods, '임');
    for (let index = 0; index < 100; index += 1) {
      expect(deriveAdoptedStemInteractionSettlements(input, tenGods, '임')).toEqual(
        baseline,
      );
    }
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY.policyVersion).toBe('1.0.0');
    expect(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('default reading projection excludes research and policy-internal uncertainty metadata', () => {
    const settlement = deriveAdoptedStemInteractionSettlements(
      [relation({ pillar: 'year', value: '갑' }, { pillar: 'month', value: '기' })],
      tenGods,
      '임',
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
    expect(projected.participants.jia.functionState).toBe('constrained');
    expect(projected.participants.ji.functionState).toBe('impaired');
    expect(impact.structureImpact).toBe('weakens_structure');
  });
});
