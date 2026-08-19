import { describe, expect, test } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  ambiguous,
  assertVersionedRef,
  resolved,
  unavailable,
} from '../src/contracts/common.js';

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

    expect(input.time.known).toBe(false);
    expect('hour' in input.time).toBe(false);
  });
});
