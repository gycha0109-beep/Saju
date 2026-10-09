import { describe, expect, test } from 'vitest';
import type {
  ResolvedStructuralRoleImpact,
  StructuralRoleCriticality,
} from '../src/calculation/structural-role-impact.js';
import type { StructureImpact } from '../src/calculation/stem-interaction-settlement.js';
import type { StemInteractionFunctionState } from '../src/contracts/calculation.js';
import {
  TEMPORAL_STRUCTURE_TRANSITION_POLICY,
  TEMPORAL_STRUCTURE_TRANSITION_POLICY_CONTENT_HASH,
  replayTemporalStructureTransitions,
  resolveTemporalStructureTransition,
  type GovernedTemporalStructureBaseline,
  type TemporalStructurePeriod,
  type TemporalStructureState,
} from '../src/calculation/temporal-structure-transition.js';
import {
  projectTemporalStructureTransitionForReading,
} from '../src/reading/temporal-structure-transition-projection.js';

function period(sequence: number): TemporalStructurePeriod {
  return {
    scope: 'annual',
    periodKey: `year-${2026 + sequence}`,
    sequence,
  };
}

function baseline(state: TemporalStructureState): GovernedTemporalStructureBaseline {
  return {
    baselineId: 'baseline-structure-1',
    structureId: 'structure-1',
    authority: 'governed_upstream',
    state,
  };
}

function assessment(
  assessmentId: string,
  impact: StructureImpact,
  criticality: StructuralRoleCriticality = 'core',
  functionState: StemInteractionFunctionState = 'impaired',
  structureId = 'structure-1',
): ResolvedStructuralRoleImpact {
  const directionalDisposition =
    impact === 'strengthens_structure'
      ? 'harms_structure'
      : impact === 'weakens_structure'
        ? 'supports_structure'
        : 'neutral';

  return {
    status: 'resolved',
    assessmentId,
    settlementId: `settlement-${assessmentId}`,
    structureId,
    participantImpacts: [
      {
        participantRole: 'controller',
        roleAssignmentId: `role-${assessmentId}-primary`,
        pillar: 'year',
        stem: '갑',
        tenGod: '식신',
        disposition: directionalDisposition,
        criticality,
        functionState,
        impact,
      },
      {
        participantRole: 'controlled',
        roleAssignmentId: `role-${assessmentId}-neutral`,
        pillar: 'month',
        stem: '기',
        tenGod: '정관',
        disposition: 'neutral',
        criticality: 'secondary',
        functionState: 'preserved',
        impact: 'maintains_structure',
      },
    ],
    overallImpact: impact,
    decisionRule:
      impact === 'maintains_structure' ? 'all_maintain' : 'single_direction',
    decisiveRoleAssignmentIds:
      impact === 'maintains_structure'
        ? [
            `role-${assessmentId}-neutral`,
            `role-${assessmentId}-primary`,
          ].sort()
        : [`role-${assessmentId}-primary`],
  };
}

describe('R193 temporal structure transition resolver', () => {
  test.each([
    ['intact', 'strengthens_structure', 'intact', 'reinforced'],
    ['intact', 'maintains_structure', 'intact', 'stable'],
    ['intact', 'weakens_structure', 'weakened', 'degraded'],
    ['weakened', 'strengthens_structure', 'intact', 'restored'],
    ['weakened', 'maintains_structure', 'weakened', 'remains_weakened'],
    ['weakened', 'weakens_structure', 'broken', 'broken'],
    ['broken', 'strengthens_structure', 'weakened', 'recovering'],
    ['broken', 'maintains_structure', 'broken', 'remains_broken'],
    ['broken', 'weakens_structure', 'broken', 'remains_broken'],
  ] as const)(
    '%s + %s -> %s / %s',
    (previous, impact, next, transitionKind) => {
      const result = resolveTemporalStructureTransition(
        baseline(previous),
        period(1),
        [assessment('a1', impact)],
      );
      expect(result.status).toBe('resolved');
      if (result.status !== 'resolved') throw new Error('expected resolved');
      expect(result.nextState).toBe(next);
      expect(result.transitionKind).toBe(transitionKind);
      expect(result.periodImpact).toBe(impact);
    },
  );

  test('same-period core weakening outranks supporting strengthening', () => {
    const result = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      [
        assessment('supporting-strengthen', 'strengthens_structure', 'supporting', 'impaired'),
        assessment('core-weaken', 'weakens_structure', 'core', 'constrained'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.periodImpact).toBe('weakens_structure');
    expect(result.aggregationRule).toBe('criticality');
    expect(result.nextState).toBe('weakened');
  });

  test('same criticality prefers stronger function degradation before direction', () => {
    const result = resolveTemporalStructureTransition(
      baseline('weakened'),
      period(1),
      [
        assessment('weaken-constrained', 'weakens_structure', 'core', 'constrained'),
        assessment('strengthen-impaired', 'strengthens_structure', 'core', 'impaired'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.periodImpact).toBe('strengthens_structure');
    expect(result.aggregationRule).toBe('function_degradation');
    expect(result.nextState).toBe('intact');
    expect(result.transitionKind).toBe('restored');
  });

  test('exact same-rank directional conflict conservatively weakens', () => {
    const result = resolveTemporalStructureTransition(
      baseline('weakened'),
      period(1),
      [
        assessment('weaken', 'weakens_structure', 'core', 'impaired'),
        assessment('strengthen', 'strengthens_structure', 'core', 'impaired'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.periodImpact).toBe('weakens_structure');
    expect(result.aggregationRule).toBe('conservative_tie_break');
    expect(result.nextState).toBe('broken');
  });

  test('assessment input order cannot change period result or transition identity', () => {
    const assessments = [
      assessment('supporting-strengthen', 'strengthens_structure', 'supporting', 'impaired'),
      assessment('core-weaken', 'weakens_structure', 'core', 'constrained'),
    ] as const;
    const forward = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      assessments,
    );
    const reverse = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      [...assessments].reverse(),
    );
    expect(reverse).toEqual(forward);
  });

  test('missing, mismatched, and duplicate assessment inputs fail closed', () => {
    const none = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      [],
    );
    expect(none.status).toBe('unavailable');
    if (none.status === 'unavailable') {
      expect(none.reasonCode).toBe('no_structural_impact_assessment');
    }

    const mismatch = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      [assessment('other', 'weakens_structure', 'core', 'impaired', 'other-structure')],
    );
    expect(mismatch.status).toBe('unavailable');
    if (mismatch.status === 'unavailable') {
      expect(mismatch.reasonCode).toBe('structure_id_mismatch');
    }

    const duplicateAssessment = assessment(
      'duplicate',
      'weakens_structure',
      'core',
      'impaired',
    );
    const duplicate = resolveTemporalStructureTransition(
      baseline('intact'),
      period(1),
      [duplicateAssessment, duplicateAssessment],
    );
    expect(duplicate.status).toBe('unavailable');
    if (duplicate.status === 'unavailable') {
      expect(duplicate.reasonCode).toBe('duplicate_assessment_id');
    }
  });

  test('chronological replay breaks and recovers without mutating the natal baseline', () => {
    const natalBaseline = baseline('intact');
    const replay = replayTemporalStructureTransitions(
      natalBaseline,
      [
        { period: period(4), assessments: [assessment('recover-2', 'strengthens_structure')] },
        { period: period(2), assessments: [assessment('break-2', 'weakens_structure')] },
        { period: period(1), assessments: [assessment('break-1', 'weakens_structure')] },
        { period: period(3), assessments: [assessment('recover-1', 'strengthens_structure')] },
      ],
    );

    expect(replay.status).toBe('resolved');
    if (replay.status !== 'resolved') throw new Error('expected resolved');
    expect(replay.transitions.map((item) => item.nextState)).toEqual([
      'weakened',
      'broken',
      'weakened',
      'intact',
    ]);
    expect(replay.transitions.map((item) => item.transitionKind)).toEqual([
      'degraded',
      'broken',
      'recovering',
      'restored',
    ]);
    expect(replay.finalState).toBe('intact');
    expect(natalBaseline.state).toBe('intact');
  });

  test('duplicate replay sequence fails closed', () => {
    const replay = replayTemporalStructureTransitions(
      baseline('intact'),
      [
        { period: period(1), assessments: [assessment('a1', 'weakens_structure')] },
        {
          period: { ...period(2), sequence: 1 },
          assessments: [assessment('a2', 'weakens_structure')],
        },
      ],
    );
    expect(replay).toEqual({
      status: 'unavailable',
      baselineId: 'baseline-structure-1',
      structureId: 'structure-1',
      reasonCode: 'duplicate_period_sequence',
    });
  });

  test('reading projection exposes temporal semantic result without research authority metadata', () => {
    const result = resolveTemporalStructureTransition(
      baseline('weakened'),
      period(1),
      [assessment('restore', 'strengthens_structure')],
    );
    if (result.status !== 'resolved') throw new Error('expected resolved');
    const projected = projectTemporalStructureTransitionForReading(result);
    const serialized = JSON.stringify(projected);
    expect(serialized).not.toMatch(
      /research|hold|uncertain|conflict|provenance|source|policy|authority/i,
    );
    expect(projected.previousState).toBe('weakened');
    expect(projected.transitionKind).toBe('restored');
    expect(projected.nextState).toBe('intact');
  });

  test('policy identity is content-addressed', () => {
    expect(TEMPORAL_STRUCTURE_TRANSITION_POLICY.policyVersion).toBe('1.0.0');
    expect(TEMPORAL_STRUCTURE_TRANSITION_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });
});
