import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  PRODUCTION_CALCULATION_RUNTIME_VERSION,
  PRODUCTION_CALCULATION_SENSITIVITY_DIAGNOSTIC_VERSION,
  diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity,
} from '../src/production-runtime.js';

const FIXED_NOW = new Date('2026-09-01T00:00:00.000Z');

function baseInput(overrides: Partial<BirthInput> = {}): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
    ...overrides,
  };
}

describe('authorized production calculation sensitivity diagnostic', () => {
  it('keeps the governed production authority separate from non-authoritative sensitivity profiles', () => {
    const diagnostic = diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(baseInput(), {
      now: FIXED_NOW,
    });

    expect(diagnostic.diagnosticVersion).toBe(
      PRODUCTION_CALCULATION_SENSITIVITY_DIAGNOSTIC_VERSION,
    );
    expect(diagnostic.runtimeVersion).toBe(PRODUCTION_CALCULATION_RUNTIME_VERSION);
    expect(diagnostic.authority.calculationPolicyId).toBe(
      'myeonghwa-production-civil-midnight-v1',
    );
    expect(diagnostic.productionDefaultPolicyId).toBe('myeonghwa-production-civil-midnight-v1');
    expect(diagnostic.referenceProfileId).toBe('civil-midnight-reference-v1');
    expect(diagnostic.referenceProductionDefaultAuthorized).toBe(false);
    expect(diagnostic.cases).toHaveLength(5);
    expect(
      diagnostic.cases.every(
        (candidate) =>
          candidate.role === 'sensitivity_only' && candidate.productionDefaultAuthorized === false,
      ),
    ).toBe(true);
    expect(
      diagnostic.cases.every(
        (candidate) =>
          !('snapshot' in candidate) &&
          !('semanticChartHash' in candidate) &&
          !('policy' in candidate) &&
          !('accuracyScore' in candidate) &&
          !('rank' in candidate),
      ),
    ).toBe(true);
  });

  it('reports a stable midday civil-time case as not materially sensitive', () => {
    const diagnostic = diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(baseInput(), {
      now: FIXED_NOW,
    });

    expect(diagnostic.materiallySensitive).toBe(false);
    expect(diagnostic.materialAffectedPaths).toEqual([]);

    const civilJasi = diagnostic.cases.find(
      (candidate) => candidate.profileId === 'civil-jasi-sensitivity-v1',
    );
    const civilSplitJasi = diagnostic.cases.find(
      (candidate) => candidate.profileId === 'civil-split-jasi-sensitivity-v1',
    );
    expect(civilJasi?.status).toBe('calculated');
    expect(civilSplitJasi?.status).toBe('calculated');
    if (civilJasi?.status === 'calculated') {
      expect(civilJasi.affectedPathsFromReference).toEqual([]);
    }
    if (civilSplitJasi?.status === 'calculated') {
      expect(civilSplitJasi.affectedPathsFromReference).toEqual([]);
    }
  });

  it('preserves the established 23:30 day-boundary sensitivity without returning alternate charts', () => {
    const diagnostic = diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(
      baseInput({ time: { known: true, hour: 23, minute: 30 } }),
      { now: FIXED_NOW },
    );

    expect(diagnostic.materiallySensitive).toBe(true);
    expect(diagnostic.materialAffectedPaths).toContain('pillars.day');
    expect(diagnostic.materialAffectedPaths).toContain('pillars.hour');

    const jasi = diagnostic.cases.find(
      (candidate) => candidate.profileId === 'civil-jasi-sensitivity-v1',
    );
    const split = diagnostic.cases.find(
      (candidate) => candidate.profileId === 'civil-split-jasi-sensitivity-v1',
    );
    expect(jasi?.status).toBe('calculated');
    expect(split?.status).toBe('calculated');
    if (jasi?.status === 'calculated') {
      expect(jasi.affectedPathsFromReference).toContain('pillars.day');
      expect(jasi.affectedPathsFromReference).toContain('pillars.hour');
    }
    if (split?.status === 'calculated') {
      expect(split.affectedPathsFromReference).toContain('pillars.day');
      expect(split.affectedPathsFromReference).toContain('pillars.hour');
    }
  });

  it('preserves the established apparent-solar-time hour sensitivity when birthplace data is available', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 7, minute: 5 },
      sexForTraditionalCalculation: 'unspecified',
      birthplace: {
        label: 'Seoul',
        longitude: 126.978,
        latitude: 37.5665,
        timeZone: 'Asia/Seoul',
      },
    };

    const diagnostic = diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(input, {
      now: FIXED_NOW,
    });

    expect(diagnostic.materiallySensitive).toBe(true);
    expect(diagnostic.materialAffectedPaths).toContain('pillars.hour');

    const solar = diagnostic.cases.find(
      (candidate) => candidate.profileId === 'solar-midnight-sensitivity-v1',
    );
    expect(solar?.status).toBe('calculated');
    if (solar?.status === 'calculated') {
      expect(solar.affectedPathsFromReference).toContain('pillars.hour');
    }
  });

  it('does not expose calculation-policy selection through the diagnostic boundary', () => {
    expect(diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity.length).toBe(1);
  });
});
