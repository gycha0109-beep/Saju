import { describe, expect, test } from 'vitest';
import type { BirthInput, CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import {
  ambiguous,
  assertVersionedRef,
  resolved,
  unavailable,
} from '../src/contracts/common.js';
import {
  assertBirthInput,
  assertCalculationPolicySnapshot,
} from '../src/contracts/runtime-validation.js';

describe('FactState constructors', () => {
  test('creates a resolved fact without inventing additional state', () => {
    expect(resolved('갑')).toEqual({ status: 'resolved', value: '갑' });
  });

  test('requires at least two candidates for an ambiguous fact', () => {
    expect(() =>
      ambiguous([{ candidateId: 'only', value: '갑', reasonRefs: ['boundary'] }], ['boundary']),
    ).toThrow(RangeError);
  });

  test('requires an ambiguity reason', () => {
    expect(() =>
      ambiguous(
        [
          { candidateId: 'a', value: '갑', reasonRefs: ['a'] },
          { candidateId: 'b', value: '을', reasonRefs: ['b'] },
        ],
        [],
      ),
    ).toThrow(RangeError);
  });

  test('rejects an empty unavailable reason', () => {
    expect(() => unavailable('   ')).toThrow(RangeError);
  });
});

describe('VersionedRef runtime assertion', () => {
  test('accepts a valid versioned reference', () => {
    const candidate: unknown = { id: 'policy/default', version: '1.0.0' };

    assertVersionedRef(candidate);

    expect(candidate.id).toBe('policy/default');
    expect(candidate.version).toBe('1.0.0');
  });

  test('rejects a missing version', () => {
    expect(() => assertVersionedRef({ id: 'policy/default' })).toThrow(TypeError);
  });
});

describe('BirthInput contract', () => {
  test('represents unknown birth time without a fabricated clock time', () => {
    const input = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    } satisfies BirthInput;

    assertBirthInput(input);

    expect(input.time.known).toBe(false);
    expect('hour' in input.time).toBe(false);
  });

  test('rejects fabricated clock values when birth time is unknown', () => {
    expect(() =>
      assertBirthInput({
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false, hour: 12, minute: 0 },
      }),
    ).toThrow(TypeError);
  });

  test('rejects leap-month state on solar input', () => {
    expect(() =>
      assertBirthInput({
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: true, hour: 5, minute: 30 },
        isLeapMonth: true,
      }),
    ).toThrow(TypeError);
  });
});

describe('CalculationPolicySnapshot runtime assertion', () => {
  test('accepts an explicit reproducible calculation policy', () => {
    const policy = {
      policyId: 'myeonghwa-calculation-policy',
      policyVersion: '0.1.0',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: true,
      },
      timeZonePolicy: {
        source: 'service-default',
        timeZone: 'Asia/Seoul',
      },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    } satisfies CalculationPolicySnapshot;

    expect(() => assertCalculationPolicySnapshot(policy)).not.toThrow();
  });

  test('rejects an unsupported day boundary', () => {
    expect(() =>
      assertCalculationPolicySnapshot({
        policyId: 'myeonghwa-calculation-policy',
        policyVersion: '0.1.0',
        dayBoundary: 'guess',
        trueSolarTime: {
          enabled: false,
          longitudeSource: 'not-applicable',
          applyEquationOfTime: false,
          applyHistoricalDst: true,
        },
        timeZonePolicy: {
          source: 'service-default',
          timeZone: 'Asia/Seoul',
        },
        unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
      }),
    ).toThrow(TypeError);
  });
});
