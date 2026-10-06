import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  DAYUN_TEMPORAL_CONTEXT_POLICY,
  DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH,
  resolveDayunTemporalContext,
} from '../src/reading/dayun-temporal-context.js';

const resolvedSnapshot = calculateCanonicalSajuSnapshot(
  {
    calendarType: 'solar',
    date: { year: 1990, month: 5, day: 15 },
    time: { known: true, hour: 14, minute: 30 },
    sexForTraditionalCalculation: 'male',
  },
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
);

function resolvedContextsInRange() {
  const values = [];
  for (let year = 1990; year <= 2110; year += 1) {
    const result = resolveDayunTemporalContext(resolvedSnapshot, year);
    if (result.status === 'resolved') values.push(result);
  }
  return values;
}

describe('R197 Dayun temporal context', () => {
  test('resolves an ordinary year to exactly one canonical Dayun segment', () => {
    const ordinary = resolvedContextsInRange().find((item) => {
      if (item.segments.length !== 1) return false;
      const segment = item.segments[0];
      return (
        segment?.annualOverlapStartLocalDateTime ===
          `${item.targetYear}-01-01T00:00` &&
        segment.annualOverlapEndExclusiveLocalDateTime ===
          `${item.targetYear + 1}-01-01T00:00`
      );
    });
    expect(ordinary).toBeDefined();
    expect(ordinary?.segments).toHaveLength(1);
  });

  test('preserves both old and new Dayun segments in a boundary year', () => {
    const boundary = resolvedContextsInRange().find(
      (item) => item.segments.length === 2,
    );
    expect(boundary).toBeDefined();
    if (boundary === undefined) throw new Error('expected boundary year');

    const [before, after] = boundary.segments;
    expect(before).toBeDefined();
    expect(after).toBeDefined();
    expect(before?.endExclusiveLocalDateTime).toBe(
      after?.startLocalDateTime,
    );
    expect(before?.annualOverlapStartLocalDateTime).toBe(
      `${boundary.targetYear}-01-01T00:00`,
    );
    expect(after?.annualOverlapEndExclusiveLocalDateTime).toBe(
      `${boundary.targetYear + 1}-01-01T00:00`,
    );
    expect(before?.ageMarker + 10).toBe(after?.ageMarker);
  });

  test('uses half-open interval behavior at the exact Dayun boundary', () => {
    const boundary = resolvedContextsInRange().find(
      (item) => item.segments.length === 2,
    );
    if (boundary === undefined) throw new Error('expected boundary year');
    const [before, after] = boundary.segments;
    expect(before?.annualOverlapEndExclusiveLocalDateTime).toBe(
      after?.annualOverlapStartLocalDateTime,
    );
  });

  test('fails closed before the first Dayun and after the available range', () => {
    const before = resolveDayunTemporalContext(resolvedSnapshot, 1989);
    expect(before.status).toBe('unavailable');
    if (before.status === 'unavailable') {
      expect(before.reasonCode).toBe('target_before_first_dayun');
    }

    const after = resolveDayunTemporalContext(resolvedSnapshot, 2200);
    expect(after.status).toBe('unavailable');
    if (after.status === 'unavailable') {
      expect(after.reasonCode).toBe('target_after_available_dayun_range');
    }
  });

  test('fails closed when luckCycle cannot be calculated from missing traditional sex', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1990, month: 5, day: 15 },
        time: { known: true, hour: 14, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    const result = resolveDayunTemporalContext(snapshot, 2030);
    expect(result.status).toBe('unavailable');
    if (result.status === 'unavailable') {
      expect(result.reasonCode).toBe('luck_cycle_unavailable');
    }
  });

  test('fails closed when birth time is unknown', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1990, month: 5, day: 15 },
        time: { known: false },
        sexForTraditionalCalculation: 'male',
      },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    const result = resolveDayunTemporalContext(snapshot, 2030);
    expect(result.status).toBe('unavailable');
    if (result.status === 'unavailable') {
      expect(result.reasonCode).toBe('luck_cycle_unavailable');
    }
  });

  test('same snapshot and year produce identical content identity', () => {
    const target = resolvedContextsInRange()[10];
    expect(target).toBeDefined();
    if (target === undefined) throw new Error('expected resolved target');
    const replay = resolveDayunTemporalContext(
      resolvedSnapshot,
      target.targetYear,
    );
    expect(replay).toEqual(target);
  });

  test('output remains temporal fact only and exposes no interpretation outcome', () => {
    const target = resolvedContextsInRange()[10];
    expect(target).toBeDefined();
    const serialized = JSON.stringify(target);
    expect(serialized).not.toMatch(
      /good|bad|favorable|unfavorable|event|score|weight|strengthens_structure|weakens_structure|길흉|사건/u,
    );
  });

  test('policy identity is content-addressed and explicitly non-semantic', () => {
    expect(DAYUN_TEMPORAL_CONTEXT_POLICY.policyVersion).toBe('1.0.0');
    expect(DAYUN_TEMPORAL_CONTEXT_POLICY.semanticRule).toBe(
      'NO_INTERPRETATION_OR_POLARITY',
    );
    expect(DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH).toMatch(
      /^[0-9a-f]{64}$/u,
    );
  });
});
