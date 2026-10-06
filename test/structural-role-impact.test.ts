import { describe, expect, test } from 'vitest';
import type {
  StemInteractionSettlementFact,
} from '../src/contracts/calculation.js';
import {
  STRUCTURAL_ROLE_IMPACT_POLICY,
  STRUCTURAL_ROLE_IMPACT_POLICY_CONTENT_HASH,
  resolveStructuralRoleImpact,
  type StructuralRoleAssignment,
} from '../src/calculation/structural-role-impact.js';
import {
  projectStructuralRoleImpactForReading,
} from '../src/reading/structural-role-impact-projection.js';

function settlement(
  controllerState: 'constrained' | 'impaired' = 'impaired',
  controlledState: 'constrained' | 'impaired' = 'constrained',
): StemInteractionSettlementFact {
  return {
    settlementId: 'settlement-r192-fixture',
    relationId: 'stem_five_combination:year:stem:갑|month:stem:기',
    kind: 'stem_five_combination',
    scope: 'non_day_master_stem_five_combination',
    pair: ['갑', '기'],
    transformationApplied: false,
    activeRelations: ['stem_five_combination', 'element_control'],
    pairControlEffective: controllerState === 'constrained',
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
        functionState: controllerState,
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
        functionState: controlledState,
      },
    },
  };
}

function role(
  roleAssignmentId: string,
  participant: 'controller' | 'controlled',
  disposition: StructuralRoleAssignment['disposition'],
  criticality: StructuralRoleAssignment['criticality'],
): StructuralRoleAssignment {
  return participant === 'controller'
    ? {
        roleAssignmentId,
        structureId: 'structure-1',
        authority: 'governed_upstream',
        pillar: 'year',
        stem: '갑',
        tenGod: '식신',
        disposition,
        criticality,
      }
    : {
        roleAssignmentId,
        structureId: 'structure-1',
        authority: 'governed_upstream',
        pillar: 'month',
        stem: '기',
        tenGod: '정관',
        disposition,
        criticality,
      };
}

describe('R192 governed structural-role impact resolver', () => {
  test('does not assign fixed polarity from Ten-God identity', () => {
    const supportResult = resolveStructuralRoleImpact(
      settlement('constrained', 'impaired'),
      'structure-1',
      [
        role('controller-neutral', 'controller', 'neutral', 'secondary'),
        role('controlled-support', 'controlled', 'supports_structure', 'core'),
      ],
    );
    const harmResult = resolveStructuralRoleImpact(
      settlement('constrained', 'impaired'),
      'structure-1',
      [
        role('controller-neutral', 'controller', 'neutral', 'secondary'),
        role('controlled-harm', 'controlled', 'harms_structure', 'core'),
      ],
    );

    expect(supportResult.status).toBe('resolved');
    expect(harmResult.status).toBe('resolved');
    if (supportResult.status !== 'resolved' || harmResult.status !== 'resolved') {
      throw new Error('fixture role resolution failed');
    }
    expect(supportResult.participantImpacts[1].tenGod).toBe('정관');
    expect(harmResult.participantImpacts[1].tenGod).toBe('정관');
    expect(supportResult.overallImpact).toBe('weakens_structure');
    expect(harmResult.overallImpact).toBe('strengthens_structure');
  });

  test('core role impact outranks a conflicting supporting role', () => {
    const result = resolveStructuralRoleImpact(
      settlement('impaired', 'constrained'),
      'structure-1',
      [
        role('controller-core-support', 'controller', 'supports_structure', 'core'),
        role('controlled-supporting-harm', 'controlled', 'harms_structure', 'supporting'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.overallImpact).toBe('weakens_structure');
    expect(result.decisionRule).toBe('criticality');
    expect(result.decisiveRoleAssignmentIds).toEqual(['controller-core-support']);
  });

  test('core harmful role can outweigh a supporting protective role', () => {
    const result = resolveStructuralRoleImpact(
      settlement('impaired', 'constrained'),
      'structure-1',
      [
        role('controller-supporting-support', 'controller', 'supports_structure', 'supporting'),
        role('controlled-core-harm', 'controlled', 'harms_structure', 'core'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.overallImpact).toBe('strengthens_structure');
    expect(result.decisionRule).toBe('criticality');
  });

  test('same criticality prefers stronger degradation before direction', () => {
    const result = resolveStructuralRoleImpact(
      settlement('impaired', 'constrained'),
      'structure-1',
      [
        role('controller-support', 'controller', 'supports_structure', 'core'),
        role('controlled-harm', 'controlled', 'harms_structure', 'core'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.overallImpact).toBe('weakens_structure');
    expect(result.decisionRule).toBe('function_degradation');
  });

  test('exact directional tie resolves conservatively to structure weakening', () => {
    const result = resolveStructuralRoleImpact(
      settlement('impaired', 'impaired'),
      'structure-1',
      [
        role('controller-support', 'controller', 'supports_structure', 'core'),
        role('controlled-harm', 'controlled', 'harms_structure', 'core'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.overallImpact).toBe('weakens_structure');
    expect(result.decisionRule).toBe('conservative_tie_break');
    expect(result.decisiveRoleAssignmentIds).toEqual([
      'controlled-harm',
      'controller-support',
    ]);
  });

  test('neutral roles maintain the structure regardless of local constraint state', () => {
    const result = resolveStructuralRoleImpact(
      settlement('impaired', 'constrained'),
      'structure-1',
      [
        role('controller-neutral', 'controller', 'neutral', 'core'),
        role('controlled-neutral', 'controlled', 'neutral', 'core'),
      ],
    );
    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');
    expect(result.overallImpact).toBe('maintains_structure');
    expect(result.decisionRule).toBe('all_maintain');
  });

  test('missing or duplicate governed roles fail closed rather than guessing', () => {
    const missing = resolveStructuralRoleImpact(
      settlement(),
      'structure-1',
      [role('controller-only', 'controller', 'supports_structure', 'core')],
    );
    expect(missing).toEqual({
      status: 'unavailable',
      settlementId: 'settlement-r192-fixture',
      structureId: 'structure-1',
      reasonCode: 'missing_role_assignment',
      participantRoles: ['controlled'],
    });

    const duplicate = resolveStructuralRoleImpact(
      settlement(),
      'structure-1',
      [
        role('controller-a', 'controller', 'supports_structure', 'core'),
        role('controller-b', 'controller', 'harms_structure', 'core'),
        role('controlled', 'controlled', 'neutral', 'secondary'),
      ],
    );
    expect(duplicate).toEqual({
      status: 'unavailable',
      settlementId: 'settlement-r192-fixture',
      structureId: 'structure-1',
      reasonCode: 'duplicate_role_assignment',
      participantRoles: ['controller'],
    });
  });

  test('assignment input order cannot change the resolved assessment', () => {
    const assignments = [
      role('controller-core-support', 'controller', 'supports_structure', 'core'),
      role('controlled-supporting-harm', 'controlled', 'harms_structure', 'supporting'),
    ] as const;
    const forward = resolveStructuralRoleImpact(
      settlement(),
      'structure-1',
      assignments,
    );
    const reverse = resolveStructuralRoleImpact(
      settlement(),
      'structure-1',
      [...assignments].reverse(),
    );
    expect(reverse).toEqual(forward);
  });

  test('reading projection contains settled semantics and no research authority metadata', () => {
    const result = resolveStructuralRoleImpact(
      settlement(),
      'structure-1',
      [
        role('controller-core-support', 'controller', 'supports_structure', 'core'),
        role('controlled-secondary-harm', 'controlled', 'harms_structure', 'secondary'),
      ],
    );
    if (result.status !== 'resolved') throw new Error('expected resolved');

    const projected = projectStructuralRoleImpactForReading(result);
    const serialized = JSON.stringify(projected);
    expect(serialized).not.toMatch(
      /research|hold|uncertain|conflict|provenance|source|policy|authority/i,
    );
    expect(projected.overallImpact).toBe('weakens_structure');
    expect(projected.participantImpacts).toHaveLength(2);
  });

  test('policy identity is content-addressed', () => {
    expect(STRUCTURAL_ROLE_IMPACT_POLICY.policyVersion).toBe('1.0.0');
    expect(STRUCTURAL_ROLE_IMPACT_POLICY_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });
});
