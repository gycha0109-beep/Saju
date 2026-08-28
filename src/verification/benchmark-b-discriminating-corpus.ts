import {
  auditDiscriminatingPair,
  type DiscriminatingPairAuditResult,
  type DiscriminatingPairExpectation,
  type PersonalizationObservation,
} from './discriminating-pair-audit.js';

export type BenchmarkBPairKind = 'methodology_consumed_dimension' | 'non_consumed_control';

export interface BenchmarkBPairObservation {
  pairId: string;
  kind: BenchmarkBPairKind;
  dimension: string;
  left: PersonalizationObservation;
  right: PersonalizationObservation;
  expectation: DiscriminatingPairExpectation;
}

export interface BenchmarkBPairAudit {
  pairId: string;
  kind: BenchmarkBPairKind;
  dimension: string;
  result: DiscriminatingPairAuditResult;
}

export type BenchmarkBFailureCode =
  | 'DISCRIMINATING_PAIR_FAILURE_PRESENT'
  | 'NON_CONSUMED_CONTROL_FAILURE_PRESENT'
  | 'NO_METHODOLOGY_CONSUMED_DIMENSION_PAIRS'
  | 'NO_NON_CONSUMED_CONTROL_PAIRS';

export interface BenchmarkBReport {
  pairCount: number;
  methodologyConsumedDimensionPairCount: number;
  nonConsumedControlPairCount: number;
  passedPairCount: number;
  failedPairCount: number;
  unexplainedCollisionCount: number;
  falseSensitivityCount: number;
  audits: readonly BenchmarkBPairAudit[];
  failures: readonly BenchmarkBFailureCode[];
  passed: boolean;
}

export function auditBenchmarkBDiscriminatingCorpus(
  pairs: readonly BenchmarkBPairObservation[],
): BenchmarkBReport {
  const audits = pairs.map((pair) => ({
    pairId: pair.pairId,
    kind: pair.kind,
    dimension: pair.dimension,
    result: auditDiscriminatingPair(pair.left, pair.right, pair.expectation),
  }));

  const methodologyPairs = audits.filter(
    (audit) => audit.kind === 'methodology_consumed_dimension',
  );
  const controlPairs = audits.filter((audit) => audit.kind === 'non_consumed_control');
  const failedMethodologyPairs = methodologyPairs.filter((audit) => !audit.result.passed);
  const failedControlPairs = controlPairs.filter((audit) => !audit.result.passed);
  const failures: BenchmarkBFailureCode[] = [];

  if (methodologyPairs.length === 0) failures.push('NO_METHODOLOGY_CONSUMED_DIMENSION_PAIRS');
  if (controlPairs.length === 0) failures.push('NO_NON_CONSUMED_CONTROL_PAIRS');
  if (failedMethodologyPairs.length > 0) failures.push('DISCRIMINATING_PAIR_FAILURE_PRESENT');
  if (failedControlPairs.length > 0) failures.push('NON_CONSUMED_CONTROL_FAILURE_PRESENT');

  return {
    pairCount: audits.length,
    methodologyConsumedDimensionPairCount: methodologyPairs.length,
    nonConsumedControlPairCount: controlPairs.length,
    passedPairCount: audits.filter((audit) => audit.result.passed).length,
    failedPairCount: audits.filter((audit) => !audit.result.passed).length,
    unexplainedCollisionCount: failedMethodologyPairs.filter((audit) =>
      audit.result.failures.includes('EXPECTED_INTERPRETATION_DIFFERENCE_COLLAPSED'),
    ).length,
    falseSensitivityCount: failedControlPairs.filter((audit) =>
      audit.result.failures.some(
        (failure) =>
          failure === 'EXPECTED_CONSUMED_INPUT_STABILITY_BROKEN' ||
          failure === 'EXPECTED_INTERPRETATION_STABILITY_BROKEN',
      ),
    ).length,
    audits,
    failures,
    passed: failures.length === 0,
  };
}
