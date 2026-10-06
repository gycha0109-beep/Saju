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
  PRODUCT_ANNUAL_STRUCTURAL_IMPACT_PRODUCER_CAPABILITY,
  createGovernedAnnualStructuralImpactBundleV1,
} from '../src/reading/annual-structural-impact-bundle.js';
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
  structureId = 'structure-1',
  settlementId = `settlement-${id}`,
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
    settlementId,
    structureId,
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

function bundle(
  year: number,
  assessments: readonly ResolvedStructuralRoleImpact[],
  overrides: {
    snapshotId?: string;
    structureId?: string;
    producerId?: string;
  } = {},
) {
  return createGovernedAnnualStructuralImpactBundleV1({
    snapshotId: overrides.snapshotId ?? snapshot.snapshotId,
    targetYear: year,
    structureId: overrides.structureId ?? 'structure-1',
    producerRef: {
      id: overrides.producerId ?? 'test-governed-annual-producer',
      version: '1.0.0-test',
    },
    assessments,
  });
}

describe('R194/R196 product annual temporal structure integration', () => {
  test('binds an actual annual request and exact governed annual impact bundle to R193 transition', () => {
    const impactBundle = bundle(2026, [
      assessment('weaken-2026', 'weakens_structure'),
    ]);
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      impactBundle,
    );

    expect(result.status).toBe('resolved');
    if (result.status !== 'resolved') throw new Error('expected resolved');

    expect(result.semanticInputBundleId).toBe(impactBundle.bundleId);
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

  test('same semantic assessment may be supplied for another year only through a separately year-bound bundle', () => {
    const governedAssessment = assessment(
      'same-governed-impact',
      'weakens_structure',
    );
    const first = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      bundle(2026, [governedAssessment]),
    );
    const second = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2027),
      baseline,
      bundle(2027, [governedAssessment]),
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
    expect(first.semanticInputBundleId).not.toBe(second.semanticInputBundleId);
  });

  test('a bundle cannot be reused for a different annual target year', () => {
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2027),
      baseline,
      bundle(2026, [assessment('year-bound', 'weakens_structure')]),
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('ANNUAL_IMPACT_YEAR_MISMATCH');
  });

  test('snapshot and structure mismatches fail closed', () => {
    const wrongSnapshot = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      bundle(
        2026,
        [assessment('wrong-snapshot', 'weakens_structure')],
        { snapshotId: 'other-snapshot' },
      ),
    );
    expect(wrongSnapshot.status).toBe('unavailable');
    if (wrongSnapshot.status !== 'unavailable') throw new Error('expected unavailable');
    expect(wrongSnapshot.reasonCode).toBe('ANNUAL_IMPACT_SNAPSHOT_MISMATCH');

    const otherStructureAssessment = assessment(
      'wrong-structure',
      'weakens_structure',
      'structure-2',
    );
    const wrongStructure = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      bundle(2026, [otherStructureAssessment], { structureId: 'structure-2' }),
    );
    expect(wrongStructure.status).toBe('unavailable');
    if (wrongStructure.status !== 'unavailable') throw new Error('expected unavailable');
    expect(wrongStructure.reasonCode).toBe('ANNUAL_IMPACT_STRUCTURE_MISMATCH');
  });

  test('bundle rejects missing or duplicate assessment identities and settlements', () => {
    expect(() => bundle(2026, [])).toThrow(/at least one resolved assessment/u);

    const duplicateAssessment = assessment(
      'duplicate-assessment',
      'weakens_structure',
    );
    expect(() =>
      bundle(2026, [duplicateAssessment, duplicateAssessment]),
    ).toThrow(/duplicate assessmentId/u);

    expect(() =>
      bundle(2026, [
        assessment('settlement-a', 'weakens_structure', 'structure-1', 'same-settlement'),
        assessment('settlement-b', 'strengthens_structure', 'structure-1', 'same-settlement'),
      ]),
    ).toThrow(/duplicate settlementId/u);
  });

  test('bundle hash tampering fails closed before transition', () => {
    const valid = bundle(2026, [
      assessment('tamper', 'weakens_structure'),
    ]);
    const tampered = {
      ...valid,
      producerRef: {
        ...valid.producerRef,
        version: 'tampered',
      },
    };
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      tampered,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('ANNUAL_IMPACT_BUNDLE_INVALID');
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
      bundle(2026, [assessment('a1', 'weakens_structure')]),
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe('ANNUAL_REQUEST_REQUIRED');
  });

  test('automatic annual semantic producer remains explicitly unavailable', () => {
    expect(PRODUCT_ANNUAL_STRUCTURAL_IMPACT_PRODUCER_CAPABILITY).toEqual({
      runtimeAvailable: false,
      reasonCodes: [
        'R153_EXECUTABLE_ANNUAL_COMPOSITION_RESOLVER_NOT_AUTHORIZED',
        'R159_TEMPORAL_TRIGGER_SUFFICIENCY_NOT_ESTABLISHED',
      ],
      annualStemOnlyAuthorized: false,
      annualBranchIgnoringAuthorized: false,
      executableTemporalOutcomeResolverAuthorized: false,
    });
  });

  test('Dayun temporal context is available without promoting a semantic Dayun resolver', () => {
    expect(PRODUCT_DAYUN_TEMPORAL_RUNTIME_CAPABILITY).toEqual({
      runtimeAvailable: true,
      temporalContextAvailable: true,
      readingTemporalScopeAvailable: false,
      readingTargetPeriodAvailable: false,
      executableDayunMethodResolverAvailable: false,
      semanticCompositionAvailable: false,
    });
  });

  test('same annual input and governed bundle are deterministic', () => {
    const impactBundle = bundle(2026, [
      assessment('stable-id', 'strengthens_structure'),
    ]);
    const first = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      impactBundle,
    );
    const second = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      impactBundle,
    );
    expect(second).toEqual(first);
  });

  test('reading projection exposes settled annual period facts and transition only', () => {
    const result = resolveAnnualTemporalStructureIntegration(
      snapshot,
      request(2026),
      baseline,
      bundle(2026, [assessment('projection', 'strengthens_structure')]),
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

  test('integration policy identity is content-addressed', () => {
    expect(
      PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY.policyVersion,
    ).toBe('1.1.0');
    expect(
      PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY_CONTENT_HASH,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
