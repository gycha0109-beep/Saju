import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import type {
  ResolvedStructuralRoleImpact,
} from '../src/calculation/structural-role-impact.js';
import type {
  GovernedTemporalStructureBaseline,
} from '../src/calculation/temporal-structure-transition.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY,
  PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY_CONTENT_HASH,
  PRODUCT_DAYUN_TEMPORAL_RUNTIME_CAPABILITY,
  resolveAnnualTemporalStructureIntegration,
} from '../src/reading/annual-temporal-structure-integration.js';
import {
  projectAnnualTemporalStructureForReading,
} from '../src/reading/annual-temporal-structure-projection.js';

const snapshot = calculateCanonicalSajuSnapshot(
  {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  },
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
);

const baseline: GovernedTemporalStructureBaseline = {
  baselineId: 'baseline-structure-1',
  structureId: 'structure-1',
  authority: 'governed_upstream',
  state: 'intact',
};

function request(year: number): ReadingRequest {
  return {
    requestId: `annual-request-${year}`,
    intent: {
      domain: 'general',
      temporalScope: 'annual',
    },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: `${year}-06-15T12:00:00.000Z`,
      resolution: 'relative_current',
    },
  };
}

function assessment(
  id: string,
  impact: 'weakens_structure' | 'strengthens_structure' | 'maintains_structure',
): ResolvedStructuralRoleImpact {
  const disposition =
    impact === 'weakens_structure'
      ? 'supports_structure'
      : impact === 'strengthens_structure'
        ? 'harms_structure'
        : 'neutral';
  return {
    status: 'resolved',
    assessmentId: id,
    settlementId: `settlement-${id}`,
    structureId: 'structure-1',
    participantImpacts: [
      {
        participantRole: 'controller',
        roleAssignmentId: `role-${id}-primary`,
        pillar: 'year',
        stem: '갑',
        tenGod: '식신',
        disposition,
        criticality: 'core',
        functionState: impact === 'maintains_structure' ? 'preserved' : 'impaired',
        impact,
      },
      {
        participantRole: 'controlled',
        roleAssignmentId: `role-${id}-neutral`,
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
        ? [`role-${id}-neutral`, `role-${id}-primary`].sort()
        : [`role-${id}-primary`],
  };
}

describe('R194 product annual temporal structure integration', () => {
  test('binds an actual annual product request and annual facts to the R193 transition', () => {
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [assessment('weaken-2026', 'weakens_structure')],
    );

    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.period).toEqual({
      scope: 'annual',
      periodKey: 'annual:2026',
      sequence: 2026,
    });
    expect(result.annualFacts.targetYear).toBe(2026);
    expect(result.annualFacts.annualPillar).toEqual({
      stem: '병',
      branch: '오',
      cycleIndex: 42,
    });
    expect(result.transition.previousState).toBe('intact');
    expect(result.transition.periodImpact).toBe('weakens_structure');
    expect(result.transition.nextState).toBe('weakened');
  });

  test('changing the actual annual pillar does not invent semantic impact when the governed R192 input is unchanged', () => {
    const governedAssessment = assessment(
      'same-governed-impact',
      'weakens_structure',
    );
    const first = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [governedAssessment],
    );
    const second = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2027),
      baseline,
      [governedAssessment],
    );

    expect(first.status).toBe('resolved');
    expect(second.status).toBe('resolved');
    if (first.status !== 'resolved' || second.status !== 'resolved') {
      throw new Error('expected resolved annual integrations');
    }

    expect(first.annualFacts.annualPillar).not.toEqual(
      second.annualFacts.annualPillar,
    );
    expect(first.transition.periodImpact).toBe('weakens_structure');
    expect(second.transition.periodImpact).toBe('weakens_structure');
    expect(first.transition.nextState).toBe('weakened');
    expect(second.transition.nextState).toBe('weakened');
  });

  test('missing governed R192 assessments fails closed through R193', () => {
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [],
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe(
      'TEMPORAL_STRUCTURE_TRANSITION_UNAVAILABLE',
    );
    expect(result.transitionReasonCode).toBe(
      'no_structural_impact_assessment',
    );
  });

  test('non-annual requests fail closed instead of being silently converted', () => {
    const natalRequest: ReadingRequest = {
      requestId: 'natal-request',
      intent: {
        domain: 'general',
        temporalScope: 'natal',
      },
    };
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      natalRequest,
      baseline,
      [assessment('a1', 'weakens_structure')],
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('ANNUAL_REQUEST_REQUIRED');
  });

  test('Dayun capability is explicitly unavailable rather than inferred from research assets', () => {
    expect(PRODUCT_DAYUN_TEMPORAL_RUNTIME_CAPABILITY).toEqual({
      runtimeAvailable: false,
      reasonCode: 'DAYUN_RUNTIME_INPUT_NOT_AVAILABLE',
      readingTemporalScopeAvailable: false,
      readingTargetPeriodAvailable: false,
      executableDayunMethodResolverAvailable: false,
    });
  });

  test('same annual input and governed semantics are deterministic', () => {
    const first = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [assessment('stable-id', 'strengthens_structure')],
    );
    const second = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [assessment('stable-id', 'strengthens_structure')],
    );
    expect(second).toEqual(first);
  });

  test('reading projection exposes settled annual period facts and transition only', () => {
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      [assessment('projection', 'strengthens_structure')],
    );
    if (result.status !== 'resolved') throw new Error('expected resolved');

    const projected = projectAnnualTemporalStructureForReading(result);
    const serialized = JSON.stringify(projected);
    expect(serialized).not.toMatch(
      /research|hold|uncertain|conflict|provenance|source|policy|authority/i,
    );
    expect(projected.targetYear).toBe(2026);
    expect(projected.annualPillar).toEqual(result.annualFacts.annualPillar);
    expect(projected.transition.nextState).toBe('intact');
    expect(projected.transition.transitionKind).toBe('reinforced');
  });

  test('policy identity is content-addressed', () => {
    expect(
      PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY.policyVersion,
    ).toBe('1.0.0');
    expect(
      PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY_CONTENT_HASH,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
