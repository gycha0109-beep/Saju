import { describe, expect, test } from 'vitest';
import {
  EvidenceSelectionError,
  buildNarrativeEvidenceBundle,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/narrative-evidence-test',
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
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

function ambiguousSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 2, day: 4 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    { ...policy, dayBoundary: 'jasi' },
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

describe('NarrativeEvidenceBundle selector', () => {
  test('builds an auditable full-reading bundle from the I7 research run', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry('2026-08-19T00:00:00.000Z');
    const execution = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-19T03:00:00.000Z'),
    });

    const first = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'request-known',
      purpose: 'full_reading',
      narrativePolicyVersion: 'narrative-policy-test-v1',
      includeSourceSummaries: true,
    });
    const second = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'request-known',
      purpose: 'full_reading',
      narrativePolicyVersion: 'narrative-policy-test-v1',
      includeSourceSummaries: true,
    });

    expect(first.evidenceBundleHash).toBe(second.evidenceBundleHash);
    expect(first.bundle.snapshotId).toBe(snapshot.snapshotId);
    expect(first.bundle.interpretationRunId).toBe(execution.run.interpretationRunId);
    expect(first.bundle.registrySnapshotId).toBe(registry.snapshot.registrySnapshotId);
    expect(first.bundle.claims.length).toBeGreaterThan(0);
    expect(first.bundle.claims.every((claim) => claim.state === 'active')).toBe(true);
    expect(first.bundle.canonicalFacts.map((fact) => fact.ref)).toContain('pillars.day');
    expect(first.bundle.canonicalFacts.map((fact) => fact.ref)).toContain('pillars.month');
    expect(first.bundle.canonicalFacts.every((fact) => fact.fact.status === 'resolved')).toBe(true);
    expect(first.bundle.sourceSummaries?.length).toBeGreaterThan(0);
    expect(first.bundle.constraints).toEqual({
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    });
  });

  test('non-full purposes require explicit active target claims', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(snapshot, registry);

    expect(() =>
      buildNarrativeEvidenceBundle(snapshot, execution, registry, {
        requestId: 'missing-target',
        purpose: 'question_answer',
        narrativePolicyVersion: 'v1',
      }),
    ).toThrow(EvidenceSelectionError);

    try {
      buildNarrativeEvidenceBundle(snapshot, execution, registry, {
        requestId: 'missing-target',
        purpose: 'question_answer',
        narrativePolicyVersion: 'v1',
      });
    } catch (error) {
      expect((error as EvidenceSelectionError).code).toBe('TARGET_CLAIMS_REQUIRED');
    }

    expect(() =>
      buildNarrativeEvidenceBundle(snapshot, execution, registry, {
        requestId: 'invalid-target',
        purpose: 'section_reading',
        narrativePolicyVersion: 'v1',
        targetClaimIds: ['claim-does-not-exist'],
      }),
    ).toThrow(EvidenceSelectionError);
  });

  test('targeted selection keeps the requested claim and its required context only', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(snapshot, registry);
    const guard = execution.claims.find((claim) => claim.claimType.includes('SCOPE-GUARD'));
    if (guard === undefined) throw new Error('fixture requires scope guard claim');

    const built = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'targeted',
      purpose: 'section_reading',
      narrativePolicyVersion: 'v1',
      targetClaimIds: [guard.claimId],
    });

    expect(built.bundle.claims.map((claim) => claim.claimId)).toEqual([guard.claimId]);
    expect(built.bundle.canonicalFacts.map((fact) => fact.ref)).toEqual([
      'pillars.day',
      'pillars.month',
    ]);
  });

  test('ambiguous calculations expose both canonical ambiguity and scenario-resolved fact refs', () => {
    const snapshot = ambiguousSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(snapshot, registry);
    const built = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'request-ambiguous',
      purpose: 'full_reading',
      narrativePolicyVersion: 'v1',
    });

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    const baseDay = built.bundle.canonicalFacts.find((fact) => fact.ref === 'pillars.day');
    const baseMonth = built.bundle.canonicalFacts.find((fact) => fact.ref === 'pillars.month');
    expect(baseDay?.fact.status).toBe('ambiguous');
    expect(baseMonth?.fact.status).toBe('ambiguous');

    const scenarioRefs = built.bundle.canonicalFacts.filter((fact) => fact.scenarioRef !== undefined);
    expect(scenarioRefs.length).toBeGreaterThan(0);
    expect(scenarioRefs.every((fact) => fact.ref.startsWith('scenario:'))).toBe(true);
    expect(scenarioRefs.every((fact) => fact.fact.status === 'resolved')).toBe(true);

    for (const scenario of snapshot.scenarios) {
      const relatedClaims = built.bundle.claims.filter((claim) => claim.scenarioRef === scenario.scenarioId);
      expect(relatedClaims.length).toBeGreaterThan(0);
      const facts = scenarioRefs.filter((fact) => fact.scenarioRef === scenario.scenarioId);
      expect(facts.some((fact) => fact.path === 'pillars.day')).toBe(true);
      expect(facts.some((fact) => fact.path === 'pillars.month')).toBe(true);
    }
  });

  test('run identity mismatches fail closed with dedicated error codes', () => {
    const snapshot = knownSnapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(snapshot, registry);

    expect(() =>
      buildNarrativeEvidenceBundle(
        { ...snapshot, snapshotId: 'different-snapshot' },
        execution,
        registry,
        {
          requestId: 'mismatch',
          purpose: 'full_reading',
          narrativePolicyVersion: 'v1',
        },
      ),
    ).toThrow(EvidenceSelectionError);

    try {
      buildNarrativeEvidenceBundle(
        { ...snapshot, snapshotId: 'different-snapshot' },
        execution,
        registry,
        {
          requestId: 'mismatch',
          purpose: 'full_reading',
          narrativePolicyVersion: 'v1',
        },
      );
    } catch (error) {
      expect((error as EvidenceSelectionError).code).toBe('RUN_SNAPSHOT_MISMATCH');
    }

    const otherRegistry = createI7SeasonalSupportRegistry('2026-08-20T00:00:00.000Z');
    expect(otherRegistry.snapshot.registrySnapshotId).toBe(registry.snapshot.registrySnapshotId);
    const tamperedRegistry = {
      ...otherRegistry,
      snapshot: { ...otherRegistry.snapshot, registrySnapshotId: 'different-registry' },
    };

    try {
      buildNarrativeEvidenceBundle(snapshot, execution, tamperedRegistry, {
        requestId: 'registry-mismatch',
        purpose: 'full_reading',
        narrativePolicyVersion: 'v1',
      });
    } catch (error) {
      expect((error as EvidenceSelectionError).code).toBe('RUN_REGISTRY_MISMATCH');
    }
  });
});
