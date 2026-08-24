import { describe, expect, it } from 'vitest';
import {
  buildCalculationPolicyProfiles,
  runCalculationPolicySensitivity,
} from '../src/calculation/calculation-policy-profiles.js';
import {
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
  PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
} from '../src/production/production-calculation-policy.js';
import type { BirthInput } from '../src/contracts/calculation.js';

function input(time: BirthInput['time']): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time,
    sexForTraditionalCalculation: 'unspecified',
  };
}

describe('production calculation authority V1', () => {
  it('binds C-option semantics under a distinct production authority identity', () => {
    const profiles = buildCalculationPolicyProfiles(input({ known: true, hour: 12, minute: 0 }));
    const reference = profiles.find((item) => item.profileId === 'civil-midnight-reference-v1');
    expect(reference?.availability.status).toBe('available');
    if (reference?.availability.status !== 'available') {
      throw new Error('Expected engineering reference profile to be available.');
    }

    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY_ID).toBe(
      'myeonghwa-production-civil-midnight-v1',
    );
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.policyId).toBe(
      'myeonghwa/production/civil-midnight-v1',
    );
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.dayBoundary).toBe(
      reference.availability.policy.dayBoundary,
    );
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.trueSolarTime).toEqual(
      reference.availability.policy.trueSolarTime,
    );
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.timeZonePolicy).toEqual(
      reference.availability.policy.timeZonePolicy,
    );
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.unknownBirthTimePolicy).toBe(
      reference.availability.policy.unknownBirthTimePolicy,
    );

    expect(reference.productionDefaultAuthorized).toBe(false);
    expect(profiles.map((item) => String(item.profileId))).not.toContain(
      PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
    );
  });

  it('keeps 23:30 day-boundary material sensitivity visible after default authorization', () => {
    const report = runCalculationPolicySensitivity(input({ known: true, hour: 23, minute: 30 }));
    expect(report.materiallySensitive).toBe(true);
    expect(report.distinctSemanticChartCount).toBeGreaterThan(1);
    expect(report.materialAffectedPaths).toContain('pillars.day');
    expect(report.materialAffectedPaths).toContain('pillars.hour');
  });

  it('preserves unknown birth time instead of manufacturing an hour', () => {
    expect(PRODUCTION_DEFAULT_CALCULATION_POLICY.unknownBirthTimePolicy).toBe(
      'preserve-unknown-and-enumerate-boundaries',
    );
  });
});
