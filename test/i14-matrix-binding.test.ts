import { describe, expect, test } from 'vitest';
import {
  buildI14StrengthEvidenceMatrix,
  calculateCanonicalSajuSnapshot,
  createI13StrengthEvidenceRegistry,
  createI14StrengthEvidenceRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type InterpretationExecutionResult,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i14-binding-test',
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

function knownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
  );
}

describe('I14 matrix execution binding', () => {
  test('rejects an I13-only execution even when the snapshot matches', () => {
    const snapshot = knownSnapshot();
    const execution = runInterpretation(snapshot, createI13StrengthEvidenceRegistry());

    expect(() => buildI14StrengthEvidenceMatrix(snapshot, execution)).toThrow(
      /requires PACK-I14-STRENGTH-EVIDENCE-MATRIX-RESEARCH/i,
    );
  });

  test('rejects an evaluation whose scenario binding is outside the calculation scenario set', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
    );
    const execution = runInterpretation(snapshot, createI14StrengthEvidenceRegistry());
    const first = execution.evaluations[0];
    if (first === undefined) throw new Error('fixture requires evaluations');

    const tampered: InterpretationExecutionResult = {
      ...execution,
      evaluations: [{ ...first, scenarioRef: 'scenario-not-in-snapshot' }, ...execution.evaluations.slice(1)],
    };

    expect(() => buildI14StrengthEvidenceMatrix(snapshot, tampered)).toThrow(
      /unexpected evaluation scenarioRef/i,
    );
  });
});
