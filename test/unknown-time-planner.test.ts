import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type FactState,
  type PillarFact,
} from '../src/index.js';

function policy(
  overrides: Partial<CalculationPolicySnapshot> = {},
): CalculationPolicySnapshot {
  return {
    policyId: 'myeonghwa/unknown-time-test',
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
    ...overrides,
  };
}

function unknownInput(year: number, month: number, day: number) {
  return {
    calendarType: 'solar' as const,
    date: { year, month, day },
    time: { known: false as const },
    sexForTraditionalCalculation: 'unspecified' as const,
  };
}

function pillarKey(value: PillarFact): string {
  return `${value.stem.value}${value.branch.value}`;
}

function stateAt(snapshot: CanonicalSajuSnapshot, path: string): FactState<PillarFact> {
  switch (path) {
    case 'pillars.year':
      return snapshot.pillars.year;
    case 'pillars.month':
      return snapshot.pillars.month;
    case 'pillars.day':
      return snapshot.pillars.day;
    default:
      throw new Error(`unexpected scenario pillar path: ${path}`);
  }
}

function assertScenarioIntegrity(snapshot: CanonicalSajuSnapshot): void {
  const scenarioIds = snapshot.scenarios.map((scenario) => scenario.scenarioId);
  expect(new Set(scenarioIds).size).toBe(scenarioIds.length);

  const signatures = new Set<string>();
  for (const scenario of snapshot.scenarios) {
    expect(scenario.snapshotId).toBe(snapshot.snapshotId);
    expect(scenario.reasonRefs.length).toBeGreaterThan(0);

    const signatureParts: string[] = [];
    for (const override of scenario.factOverrides) {
      if (!override.path.startsWith('pillars.')) continue;
      const state = stateAt(snapshot, override.path);
      expect(state.status).toBe('ambiguous');
      if (state.status !== 'ambiguous') continue;

      const candidate = state.candidates.find(
        (item) => item.candidateId === override.candidateId,
      );
      expect(candidate).toBeDefined();
      expect(candidate?.value).toEqual(override.value);
      signatureParts.push(`${override.path}:${pillarKey(override.value as PillarFact)}`);
    }

    const signature = signatureParts.sort().join('|');
    expect(signatures.has(signature)).toBe(false);
    signatures.add(signature);
  }
}

describe('unknown-time planner invariants', () => {
  test('ordinary midnight-policy date stays invariant and emits no scenarios', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      unknownInput(1992, 10, 24),
      policy(),
    );

    expect(snapshot.pillars.year.status).toBe('resolved');
    expect(snapshot.pillars.month.status).toBe('resolved');
    expect(snapshot.pillars.day.status).toBe('resolved');
    expect(snapshot.pillars.hour.status).toBe('unavailable');
    expect(snapshot.scenarios).toEqual([]);
    expect(snapshot.completeness.birthTimeKnown).toBe(false);
    expect(snapshot.completeness.fullyResolved).toBe(false);
  });

  test('jasi policy produces only candidate-backed deduplicated scenarios', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      unknownInput(1992, 10, 24),
      policy({ dayBoundary: 'jasi' }),
    );

    expect(snapshot.pillars.day.status).toBe('ambiguous');
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    assertScenarioIntegrity(snapshot);
  });

  test('Lichun plus jasi can preserve multiple independent boundary changes without cross-products', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      unknownInput(2024, 2, 4),
      policy({ dayBoundary: 'jasi' }),
    );

    expect(snapshot.pillars.year.status).toBe('ambiguous');
    expect(snapshot.pillars.month.status).toBe('ambiguous');
    expect(snapshot.pillars.day.status).toBe('ambiguous');
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(snapshot.scenarios.length).toBeLessThan(10);
    assertScenarioIntegrity(snapshot);
  });

  test('true-solar correction can make day identity ambiguous near civil midnight', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      unknownInput(1990, 5, 15),
      policy({
        trueSolarTime: {
          enabled: true,
          longitudeSource: 'manual',
          longitude: 126.978,
          applyEquationOfTime: true,
          applyHistoricalDst: true,
        },
      }),
    );

    expect(snapshot.pillars.day.status).toBe('ambiguous');
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    assertScenarioIntegrity(snapshot);
  });

  test('same input and policy produce the same fact/scenario graph independent of createdAt', () => {
    const input = unknownInput(2024, 2, 4);
    const calculationPolicy = policy({ dayBoundary: 'jasi' });
    const first = calculateCanonicalSajuSnapshot(input, calculationPolicy, {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const second = calculateCanonicalSajuSnapshot(input, calculationPolicy, {
      now: new Date('2026-08-20T00:00:00.000Z'),
    });

    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.pillars).toEqual(second.pillars);
    expect(first.derivedFacts).toEqual(second.derivedFacts);
    expect(first.scenarios).toEqual(second.scenarios);
    expect(first.completeness).toEqual(second.completeness);
    expect(first.createdAt).not.toBe(second.createdAt);
  });
});
