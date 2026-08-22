import { describe, expect, test } from 'vitest';
import {
  I13_STRENGTH_EVIDENCE_METHODOLOGY,
  I13_STRENGTH_EVIDENCE_PACK,
  I13_STRENGTH_EVIDENCE_RULES,
  calculateCanonicalSajuSnapshot,
  createI13StrengthEvidenceRegistry,
  runInterpretation,
  type BirthInput,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i13-test',
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

function knownInput(): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function claimRecord(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('I13 claim value must be an object.');
  }
  return value as Record<string, unknown>;
}

describe('I13 strength evidence foundation', () => {
  test('is research-only and cannot emit a final strength classification', () => {
    expect(I13_STRENGTH_EVIDENCE_PACK.status).toBe('research');
    expect(I13_STRENGTH_EVIDENCE_METHODOLOGY.status).toBe('research');
    expect(I13_STRENGTH_EVIDENCE_RULES).toHaveLength(56);
    expect(new Set(I13_STRENGTH_EVIDENCE_RULES.map((rule) => rule.ruleId)).size).toBe(56);

    for (const rule of I13_STRENGTH_EVIDENCE_RULES) {
      expect(rule.status).toBe('research');
      expect(rule.methodologyRef).toEqual({
        id: I13_STRENGTH_EVIDENCE_METHODOLOGY.methodologyId,
        version: I13_STRENGTH_EVIDENCE_METHODOLOGY.version,
      });
      expect(['DAY_MASTER_STRENGTH_EVIDENCE', 'DAY_MASTER_STRENGTH_SCOPE_GUARD']).toContain(
        rule.output.claimType,
      );
      expect(rule.output.claimType).not.toBe('DAY_MASTER_STRENGTH_CLASSIFICATION');
      expect(rule.output.claimType).not.toBe('FUYI_BALANCING_USE');
    }
  });

  test('known-time execution emits traceable unweighted evidence plus a mandatory scope guard', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput(), policy, {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const result = runInterpretation(snapshot, createI13StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });

    expect(result.integrity.valid).toBe(true);
    expect(result.run.status).toBe('completed');

    const evidence = result.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_STRENGTH_EVIDENCE',
    );
    const guards = result.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_STRENGTH_SCOPE_GUARD',
    );

    expect(evidence.length).toBeGreaterThan(0);
    expect(guards).toHaveLength(1);
    expect(result.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION')).toBe(
      false,
    );
    expect(result.claims.some((claim) => claim.claimType === 'FUYI_BALANCING_USE')).toBe(false);

    for (const claim of evidence) {
      const value = claimRecord(claim.value);
      expect(value.overallStrength).toBe('not_determined');
      expect(value.weight).toBe('not_assigned');
      expect(typeof value.weight).not.toBe('number');
      expect(claim.factRefs.length).toBeGreaterThan(0);
      expect(claim.sourceRefs.length).toBeGreaterThan(0);
    }

    const guardValue = claimRecord(guards[0]?.value);
    expect(guardValue.status).toBe('undetermined');
    expect(guardValue.numericScore).toBe('not_defined');
    expect(guardValue.rootWeighting).toBe('not_defined');
    expect(guardValue.specialPatternGate).toBe('not_evaluated');
  });

  test('hidden-stem evidence explicitly distinguishes peer roots from hidden resource support', () => {
    const hiddenRules = I13_STRENGTH_EVIDENCE_RULES.filter(
      (rule) => rule.taxonomy.subcategory?.startsWith('hidden_') === true,
    );

    expect(hiddenRules).toHaveLength(40);
    expect(
      hiddenRules.some((rule) => rule.taxonomy.subcategory === 'hidden_peer_root_evidence'),
    ).toBe(true);
    expect(
      hiddenRules.some((rule) => rule.taxonomy.subcategory === 'hidden_resource_evidence'),
    ).toBe(true);

    for (const rule of hiddenRules) {
      expect(
        rule.inputs.some((input) => input.pathOrClaimType.startsWith('derivedFacts.hiddenStems.')),
      ).toBe(true);
      const value = claimRecord(rule.output.value);
      expect(value.weight).toBe('not_assigned');
      expect(value.overallStrength).toBe('not_determined');
    }
  });

  test('unknown birth time preserves scenario context and fails closed where Ten-God evidence is unavailable', () => {
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

    expect(snapshot.scenarios.length).toBeGreaterThan(1);

    const result = runInterpretation(snapshot, createI13StrengthEvidenceRegistry(), {
      now: new Date('2026-08-19T00:01:00.000Z'),
    });

    expect(result.integrity.valid).toBe(true);
    expect(result.run.status).toBe('partial');
    expect(result.claims.some((claim) => claim.claimType === 'DAY_MASTER_STRENGTH_CLASSIFICATION')).toBe(
      false,
    );
    expect(result.evaluations.some((evaluation) => evaluation.status === 'skipped_missing_input')).toBe(
      true,
    );
    expect(result.claims.length).toBeGreaterThan(0);
    expect(result.claims.every((claim) => claim.scenarioRef !== undefined)).toBe(true);
  });
});
