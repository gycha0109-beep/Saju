import { describe, expect, it } from 'vitest';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  auditBenchmarkCUniqueConsumedFingerprints,
  type BenchmarkCReport,
} from '../src/verification/benchmark-c-unique-consumed-fingerprints.js';
import {
  buildConvergenceObservation,
  type ConvergenceObservation,
} from '../src/verification/convergence-classification.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const TARGET_UNIQUE_CONSUMED_FINGERPRINTS = 100;
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;

function careerSelection(
  execution: ReturnType<typeof runInterpretation>,
  caseId: string,
): ReadingEvidenceSelection {
  const selectedClaimIds = execution.claims
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === 'career',
    )
    .map((claim) => claim.claimId)
    .sort();

  if (selectedClaimIds.length === 0) {
    throw new Error(`Expected active Career T8 claims for ${caseId}.`);
  }

  return {
    selectionId: `benchmark-c-selection-${caseId}`,
    intent: { domain: 'career', temporalScope: 'natal' },
    coverageState: 'complete',
    targetClaimIds: selectedClaimIds,
    selectedClaimIds,
    omittedClaimIds: [],
    missingRequirements: [],
    scenarioRefs: [],
    conflictRelationIds: [],
    constraints: {
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    },
  };
}

function collectNaturalSyntheticCorpus(): {
  observations: readonly ConvergenceObservation[];
  scannedEngineCases: number;
} {
  const registry = createCareerNatalReadingCandidateRegistry('2026-08-27T08:25:00.000Z');
  const byFingerprint = new Map<string, ConvergenceObservation>();
  let scannedEngineCases = 0;

  outer: for (let month = 1; month <= 12; month += 1) {
    for (let day = 1; day <= 28; day += 1) {
      for (const hour of SYNTHETIC_HOURS) {
        scannedEngineCases += 1;
        const caseId = `synthetic-engine-${String(scannedEngineCases).padStart(4, '0')}`;
        const snapshot = calculateCanonicalSajuSnapshot(
          {
            calendarType: 'solar',
            date: { year: 2024, month, day },
            time: { known: true, hour, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          },
          PRODUCTION_DEFAULT_CALCULATION_POLICY,
          { now: new Date('2026-08-27T08:25:00.000Z') },
        );
        const execution = runInterpretation(snapshot, registry, {
          requestId: caseId,
          now: new Date('2026-08-27T08:26:00.000Z'),
        });
        const selection = careerSelection(execution, caseId);
        const fingerprints = deriveConsumedInputFingerprints(execution, registry, selection);
        const signatures = deriveDomainInterpretationSignatures(
          execution.claims,
          execution.claimRelations,
          selection,
        );

        if (fingerprints.length !== 1 || signatures.length !== 1) {
          throw new Error(
            `Expected one Career fingerprint/signature for ${caseId}; got ${fingerprints.length}/${signatures.length}.`,
          );
        }

        const fingerprint = fingerprints[0];
        const signature = signatures[0];
        if (fingerprint === undefined || signature === undefined) {
          throw new Error(`Incomplete Career personalization observation for ${caseId}.`);
        }

        if (!byFingerprint.has(fingerprint.fingerprint)) {
          byFingerprint.set(
            fingerprint.fingerprint,
            buildConvergenceObservation(caseId, fingerprint, signature),
          );
        }

        if (byFingerprint.size >= TARGET_UNIQUE_CONSUMED_FINGERPRINTS) break outer;
      }
    }
  }

  return { observations: [...byFingerprint.values()], scannedEngineCases };
}

function emitMeasurement(report: BenchmarkCReport, scannedEngineCases: number): void {
  process.stdout.write(
    `BENCHMARK_C_MEASUREMENT ${JSON.stringify({
      scannedEngineCases,
      observationCount: report.observationCount,
      distinctConsumedInputFingerprints: report.distinctConsumedInputFingerprints,
      distinctInterpretationSignatures: report.distinctInterpretationSignatures,
      manyToOneGroupCount: report.manyToOneGroupCount,
      intentionalConvergenceGroupCount: report.intentionalConvergenceGroupCount,
      unexplainedCollisionGroupCount: report.unexplainedCollisionGroupCount,
    })}\n`,
  );
}

describe('P5 Benchmark C — unique consumed fingerprints', () => {
  it(
    'collects 100 unique Career consumed fingerprints from real synthetic engine outputs and leaves no unexplained many-to-one collision',
    () => {
      const { observations, scannedEngineCases } = collectNaturalSyntheticCorpus();
      const report = auditBenchmarkCUniqueConsumedFingerprints(
        observations,
        TARGET_UNIQUE_CONSUMED_FINGERPRINTS,
      );

      emitMeasurement(report, scannedEngineCases);

      expect(report.distinctConsumedInputFingerprints).toBe(TARGET_UNIQUE_CONSUMED_FINGERPRINTS);
      expect(report.observationCount).toBe(TARGET_UNIQUE_CONSUMED_FINGERPRINTS);
      expect(report.unexplainedCollisionGroupCount).toBe(0);
      expect(report.failures).toEqual([]);
      expect(report.passed).toBe(true);
      expect(scannedEngineCases).toBeGreaterThanOrEqual(TARGET_UNIQUE_CONSUMED_FINGERPRINTS);
    },
    30_000,
  );

  it('fails when a corpus has too few unique consumed fingerprints', () => {
    const report = auditBenchmarkCUniqueConsumedFingerprints(
      [
        {
          caseId: 'a',
          consumedInputFingerprint: 'input-a',
          interpretationSignature: 'signature-a',
          producingT8RuleRefs: [{ id: 'rule-a', version: '1.0.0' }],
        },
      ],
      2,
    );

    expect(report.passed).toBe(false);
    expect(report.failures).toEqual(['INSUFFICIENT_UNIQUE_CONSUMED_FINGERPRINTS']);
  });

  it('fails when a many-to-one collision has no machine-verifiable convergence basis', () => {
    const report = auditBenchmarkCUniqueConsumedFingerprints(
      [
        {
          caseId: 'a',
          consumedInputFingerprint: 'input-a',
          interpretationSignature: 'shared-signature',
          producingT8RuleRefs: [{ id: 'rule-a', version: '1.0.0' }],
        },
        {
          caseId: 'b',
          consumedInputFingerprint: 'input-b',
          interpretationSignature: 'shared-signature',
          producingT8RuleRefs: [{ id: 'rule-b', version: '1.0.0' }],
        },
      ],
      2,
    );

    expect(report.unexplainedCollisionGroupCount).toBe(1);
    expect(report.passed).toBe(false);
    expect(report.failures).toEqual(['UNEXPLAINED_COLLISIONS_PRESENT']);
  });
});
