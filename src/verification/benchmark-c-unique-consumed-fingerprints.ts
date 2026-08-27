import {
  classifyManyToOneConvergences,
  type ConvergenceGroup,
  type ConvergenceObservation,
} from './convergence-classification.js';

export const BENCHMARK_C_DEFAULT_MINIMUM_UNIQUE_CONSUMED_FINGERPRINTS = 100 as const;

export type BenchmarkCFailureCode =
  | 'INSUFFICIENT_UNIQUE_CONSUMED_FINGERPRINTS'
  | 'UNEXPLAINED_COLLISIONS_PRESENT';

export interface BenchmarkCReport {
  minimumUniqueConsumedFingerprints: number;
  observationCount: number;
  distinctConsumedInputFingerprints: number;
  distinctInterpretationSignatures: number;
  manyToOneGroupCount: number;
  intentionalConvergenceGroupCount: number;
  unexplainedCollisionGroupCount: number;
  convergenceGroups: readonly ConvergenceGroup[];
  passed: boolean;
  failures: readonly BenchmarkCFailureCode[];
}

export function auditBenchmarkCUniqueConsumedFingerprints(
  observations: readonly ConvergenceObservation[],
  minimumUniqueConsumedFingerprints = BENCHMARK_C_DEFAULT_MINIMUM_UNIQUE_CONSUMED_FINGERPRINTS,
): BenchmarkCReport {
  if (!Number.isInteger(minimumUniqueConsumedFingerprints) || minimumUniqueConsumedFingerprints <= 0) {
    throw new RangeError('minimumUniqueConsumedFingerprints must be a positive integer.');
  }

  const distinctConsumedInputFingerprints = new Set(
    observations.map((observation) => observation.consumedInputFingerprint),
  ).size;
  const distinctInterpretationSignatures = new Set(
    observations.map((observation) => observation.interpretationSignature),
  ).size;
  const convergenceGroups = classifyManyToOneConvergences(observations);
  const intentionalConvergenceGroupCount = convergenceGroups.filter(
    (group) => group.classification === 'intentional_convergence',
  ).length;
  const unexplainedCollisionGroupCount = convergenceGroups.filter(
    (group) => group.classification === 'unexplained_collision',
  ).length;
  const failures: BenchmarkCFailureCode[] = [];

  if (distinctConsumedInputFingerprints < minimumUniqueConsumedFingerprints) {
    failures.push('INSUFFICIENT_UNIQUE_CONSUMED_FINGERPRINTS');
  }
  if (unexplainedCollisionGroupCount > 0) {
    failures.push('UNEXPLAINED_COLLISIONS_PRESENT');
  }

  return {
    minimumUniqueConsumedFingerprints,
    observationCount: observations.length,
    distinctConsumedInputFingerprints,
    distinctInterpretationSignatures,
    manyToOneGroupCount: convergenceGroups.length,
    intentionalConvergenceGroupCount,
    unexplainedCollisionGroupCount,
    convergenceGroups,
    passed: failures.length === 0,
    failures,
  };
}
