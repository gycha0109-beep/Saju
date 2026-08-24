import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  createI13StrengthEvidenceRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const basePolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/scenario-evaluation-audit-test',
  policyVersion: '1.0.0',
  dayBoundary: 'jasi',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

describe('scenario-bound rule evaluation audit', () => {
  test('scenario-sensitive evaluations persist the exact scenarioRef even when no claim is emitted', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      basePolicy,
      { now: new Date('2026-08-19T00:00:00.000Z') },
    );
    expect(snapshot.scenarios.length).toBeGreaterThan(1);

    const result = runInterpretation(snapshot, createI13StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    const scenarioIds = new Set(snapshot.scenarios.map((scenario) => scenario.scenarioId));

    expect(result.evaluations.length).toBeGreaterThan(0);
    expect(result.evaluations.every((evaluation) => evaluation.scenarioRef !== undefined)).toBe(true);
    expect(
      result.evaluations.every(
        (evaluation) =>
          evaluation.scenarioRef !== undefined && scenarioIds.has(evaluation.scenarioRef),
      ),
    ).toBe(true);

    const skipped = result.evaluations.filter(
      (evaluation) => evaluation.status === 'skipped_missing_input',
    );
    expect(skipped.length).toBeGreaterThan(0);
    expect(skipped.every((evaluation) => evaluation.scenarioRef !== undefined)).toBe(true);

    for (const scenarioId of scenarioIds) {
      expect(result.evaluations.some((evaluation) => evaluation.scenarioRef === scenarioId)).toBe(true);
    }
  });

  test('known-time evaluation remains explicitly non-scenario-bound', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: true, hour: 5, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...basePolicy, dayBoundary: 'midnight' },
      { now: new Date('2026-08-19T00:00:00.000Z') },
    );
    expect(snapshot.scenarios).toEqual([]);

    const result = runInterpretation(snapshot, createI13StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });

    expect(result.evaluations.length).toBeGreaterThan(0);
    expect(result.evaluations.every((evaluation) => evaluation.scenarioRef === undefined)).toBe(true);
  });
});
