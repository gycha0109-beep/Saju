import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  PRODUCTION_CALCULATION_RUNTIME_VERSION,
  calculateAuthorizedMyeonghwaProductionSnapshot,
  inspectMyeonghwaProductionComposition,
} from '../src/production-runtime.js';

const INPUT: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
  birthplace: {
    label: 'Seoul',
    countryCode: 'KR',
    timeZone: 'Asia/Seoul',
  },
};

const FIXED_NOW = new Date('2026-09-01T00:00:00.000Z');

describe('authorized production calculation runtime', () => {
  it('executes the exact governed V1 production calculation authority', () => {
    const result = calculateAuthorizedMyeonghwaProductionSnapshot(INPUT, { now: FIXED_NOW });

    expect(result.runtimeVersion).toBe(PRODUCTION_CALCULATION_RUNTIME_VERSION);
    expect(result.authority).toEqual({
      calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
      authorizationId: 'myeonghwa-production-calculation-default-authorization-v1',
      authorityRecordRef: 'docs/decisions/ADR-0006-production-calculation-default-v1.md',
      policyVersion: 'myeonghwa-production-calculation-policy-v1',
      contentHash: deterministicContentHash(PRODUCTION_DEFAULT_CALCULATION_POLICY),
    });
    expect(result.snapshot.policy).toEqual(PRODUCTION_DEFAULT_CALCULATION_POLICY);
    expect(result.snapshot.provenance.policy).toEqual({
      id: 'myeonghwa/production/civil-midnight-v1',
      version: 'myeonghwa-production-calculation-policy-v1',
    });
    expect(result.snapshot.createdAt).toBe(FIXED_NOW.toISOString());
  });

  it('is exactly equivalent to the canonical engine under the separately authorized production policy', () => {
    const production = calculateAuthorizedMyeonghwaProductionSnapshot(INPUT, { now: FIXED_NOW });
    const direct = calculateCanonicalSajuSnapshot(INPUT, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
      now: FIXED_NOW,
    });

    expect(production.snapshot).toEqual(direct);
    expect(production.snapshot.calculationHash).toBe(direct.calculationHash);
    expect(production.snapshot.snapshotId).toBe(direct.snapshotId);
  });

  it('does not expose calculation-policy selection through the calculation-only boundary', () => {
    expect(calculateAuthorizedMyeonghwaProductionSnapshot.length).toBe(1);

    const result = calculateAuthorizedMyeonghwaProductionSnapshot(INPUT, { now: FIXED_NOW });
    expect(result.snapshot.policy.dayBoundary).toBe('midnight');
    expect(result.snapshot.policy.trueSolarTime).toEqual({
      enabled: false,
      longitudeSource: 'not-applicable',
      applyEquationOfTime: false,
      applyHistoricalDst: false,
    });
    expect(result.snapshot.policy.timeZonePolicy).toEqual({
      source: 'service-default',
      timeZone: 'Asia/Seoul',
    });
  });

  it('does not claim that production interpretation or full reading composition is ready', () => {
    const inspection = inspectMyeonghwaProductionComposition();

    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers.map((blocker) => blocker.code)).toContain(
      'PRODUCTION_INTERPRETATION_REGISTRY_REQUIRED',
    );
  });
});
