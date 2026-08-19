import { describe, expect, test } from 'vitest';
import {
  I7_SEASONAL_SUPPORT_RULES,
  I13_STRENGTH_EVIDENCE_RULES,
  I14_STRENGTH_EVIDENCE_COMPOSITE_PACK,
  buildI14StrengthEvidenceMatrix,
  calculateCanonicalSajuSnapshot,
  createI14StrengthEvidenceRegistry,
  runInterpretation,
  type BirthInput,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i14-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function knownInput(day = 24): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

describe('I14 strength evidence matrix', () => {
  test('composite registry preserves both research methodologies without authorizing classification', () => {
    const registry = createI14StrengthEvidenceRegistry();

    expect(I14_STRENGTH_EVIDENCE_COMPOSITE_PACK.status).toBe('research');
    expect(registry.rules).toHaveLength(
      I7_SEASONAL_SUPPORT_RULES.length + I13_STRENGTH_EVIDENCE_RULES.length,
    );
    expect(registry.methodologies).toHaveLength(2);
    expect(registry.pack.status).toBe('research');
  });

  test('known-time execution produces one canonical evidence matrix with no score or classification authority', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput(), policy, {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    const matrix = buildI14StrengthEvidenceMatrix(snapshot, execution);

    expect(execution.integrity.valid).toBe(true);
    expect(execution.run.status).toBe('completed');
    expect(matrix.classificationAuthorized).toBe(false);
    expect(matrix.numericScoringAuthorized).toBe(false);
    expect(matrix.scenarioPreservationRequired).toBe(false);
    expect(matrix.scenarios).toHaveLength(1);

    const canonical = matrix.scenarios[0];
    expect(canonical?.basis).toBe('canonical');
    expect(canonical?.scenarioRef).toBeUndefined();
    expect(canonical?.executionState).toBe('complete');
    expect(canonical?.classificationAuthorized).toBe(false);
    expect(canonical?.numericScoringAuthorized).toBe(false);
    expect(canonical?.blockedEvaluationIds).toEqual([]);
    expect(canonical?.scopeGuardClaimIds.length).toBeGreaterThanOrEqual(2);
    expect(
      (canonical?.visibleStemEvidenceClaimIds.length ?? 0) +
        (canonical?.hiddenPeerRootClaimIds.length ?? 0) +
        (canonical?.hiddenResourceSupportClaimIds.length ?? 0),
    ).toBeGreaterThan(0);

    expect(
      execution.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION'),
    ).toBe(false);
    expect(execution.claims.some((claim) => claim.claimType === 'FUYI_BALANCING_USE')).toBe(false);
  });

  test('unknown-time chart creates one separately auditable matrix per calculation scenario', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
      { now: new Date('2026-08-19T00:00:00.000Z') },
    );
    const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    const matrix = buildI14StrengthEvidenceMatrix(snapshot, execution);
    const expectedScenarioIds = snapshot.scenarios.map((scenario) => scenario.scenarioId).sort();

    expect(expectedScenarioIds.length).toBeGreaterThan(1);
    expect(matrix.scenarioPreservationRequired).toBe(true);
    expect(matrix.scenarios).toHaveLength(expectedScenarioIds.length);
    expect(matrix.scenarios.map((scenario) => scenario.scenarioRef).sort()).toEqual(
      expectedScenarioIds,
    );

    for (const scenario of matrix.scenarios) {
      expect(scenario.basis).toBe('scenario');
      expect(scenario.executionState).toBe('partial');
      expect(scenario.blockedEvaluationIds.length).toBeGreaterThan(0);
      expect(scenario.scopeGuardClaimIds.length).toBeGreaterThan(0);
      expect(scenario.classificationAuthorized).toBe(false);
      expect(scenario.numericScoringAuthorized).toBe(false);
      expect(
        execution.evaluations
          .filter((evaluation) => evaluation.scenarioRef === scenario.scenarioRef)
          .every((evaluation) => scenario.evaluationIds.includes(evaluation.evaluationId)),
      ).toBe(true);
    }
  });

  test('matrix identity is deterministic across audit timestamps', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput(), policy, {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const registry = createI14StrengthEvidenceRegistry();
    const first = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    const second = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-20T12:34:56.000Z'),
    });

    const firstMatrix = buildI14StrengthEvidenceMatrix(snapshot, first);
    const secondMatrix = buildI14StrengthEvidenceMatrix(snapshot, second);

    expect(first.run.interpretationRunId).toBe(second.run.interpretationRunId);
    expect(firstMatrix.matrixId).toBe(secondMatrix.matrixId);
    expect(firstMatrix.scenarios).toEqual(secondMatrix.scenarios);
  });

  test('matrix refuses an interpretation run bound to another snapshot', () => {
    const firstSnapshot = calculateCanonicalSajuSnapshot(knownInput(24), policy);
    const secondSnapshot = calculateCanonicalSajuSnapshot(knownInput(25), policy);
    const execution = runInterpretation(firstSnapshot, createI14StrengthEvidenceRegistry());

    expect(() => buildI14StrengthEvidenceMatrix(secondSnapshot, execution)).toThrow(
      /snapshot mismatch/i,
    );
  });
});
