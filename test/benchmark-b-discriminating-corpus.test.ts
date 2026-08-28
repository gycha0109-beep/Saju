import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  auditBenchmarkBDiscriminatingCorpus,
  type BenchmarkBPairObservation,
} from '../src/verification/benchmark-b-discriminating-corpus.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';
import type { PersonalizationObservation } from '../src/verification/discriminating-pair-audit.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const INTEGRATION_OPTIONS = {
  narrativePolicyRef: { id: 'myeonghwa-narrative-policy', version: '1.0.0-benchmark-b' },
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
} as const;

const BASE_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const CAREER_CONDITION_DIMENSIONS = [
  'year.stem',
  'month.stem',
  'hour.stem',
  'year.branch',
  'month.branch',
  'day.branch',
  'hour.branch',
] as const;

type CareerConditionDimension = (typeof CAREER_CONDITION_DIMENSIONS)[number];

function calculatedSnapshot(minute = 0): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: FIXED_CALCULATION_TIME },
  );
}

function withTenGodFixture(chart: TenGodChartFact, minute = 0): CanonicalSajuSnapshot {
  const base = calculatedSnapshot(minute);
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(chart),
    },
  };
}

function replaceDimension(
  chart: TenGodChartFact,
  dimension: CareerConditionDimension,
): TenGodChartFact {
  switch (dimension) {
    case 'year.stem':
      return { ...chart, year: { ...chart.year, stem: resolved('겁재') } };
    case 'month.stem':
      return { ...chart, month: { ...chart.month, stem: resolved('겁재') } };
    case 'hour.stem':
      return { ...chart, hour: { ...chart.hour, stem: resolved('겁재') } };
    case 'year.branch':
      return { ...chart, year: { ...chart.year, branch: resolved('겁재') } };
    case 'month.branch':
      return { ...chart, month: { ...chart.month, branch: resolved('겁재') } };
    case 'day.branch':
      return { ...chart, day: { ...chart.day, branch: resolved('겁재') } };
    case 'hour.branch':
      return { ...chart, hour: { ...chart.hour, branch: resolved('겁재') } };
  }
}

function requireResolved(value: TenGodChartFact['year']['stem']): string {
  if (value.status !== 'resolved') throw new Error('Benchmark B requires resolved Ten-God fixtures.');
  return value.value;
}

function conditionVector(chart: TenGodChartFact): Readonly<Record<CareerConditionDimension, string>> {
  return {
    'year.stem': requireResolved(chart.year.stem),
    'month.stem': requireResolved(chart.month.stem),
    'hour.stem': requireResolved(chart.hour.stem),
    'year.branch': requireResolved(chart.year.branch),
    'month.branch': requireResolved(chart.month.branch),
    'day.branch': requireResolved(chart.day.branch),
    'hour.branch': requireResolved(chart.hour.branch),
  };
}

function changedDimensions(left: TenGodChartFact, right: TenGodChartFact): CareerConditionDimension[] {
  const leftVector = conditionVector(left);
  const rightVector = conditionVector(right);
  return CAREER_CONDITION_DIMENSIONS.filter(
    (dimension) => leftVector[dimension] !== rightVector[dimension],
  );
}

function resolvedTenGods(snapshot: CanonicalSajuSnapshot): TenGodChartFact {
  const fact = snapshot.derivedFacts.tenGods;
  if (fact.status !== 'resolved') throw new Error('Expected resolved Ten-God chart.');
  return fact.value;
}

function observe(snapshot: CanonicalSajuSnapshot, caseId: string): PersonalizationObservation {
  const registry = createCareerNatalReadingCandidateRegistry(FIXED_CALCULATION_TIME.toISOString());
  const execution = runInterpretation(snapshot, registry, {
    requestId: caseId,
    now: FIXED_INTERPRETATION_TIME,
  });
  const prepared = prepareProductReading(
    snapshot,
    execution,
    registry,
    { requestId: caseId, text: '직업운' },
    INTEGRATION_OPTIONS,
  );
  if (prepared.state !== 'ready_for_narrative' || prepared.composition === undefined) {
    throw new Error(`Expected ready Career selection for ${caseId}; got ${prepared.state}.`);
  }
  const selection = prepared.composition.selection;
  if (selection.profileAuthorization.state !== 'authorized') {
    throw new Error(`Career selection authorization missing for ${caseId}.`);
  }
  if (selection.constraints.mayPromoteResearchAuthority !== false) {
    throw new Error(`Research authority promotion became possible for ${caseId}.`);
  }

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
    throw new Error(`Incomplete Benchmark B observation for ${caseId}.`);
  }

  return {
    caseId,
    consumedInputFingerprint: fingerprint.fingerprint,
    interpretationSignature: signature.signature,
  };
}

describe('P5 Benchmark B — Career discriminating corpus', () => {
  it('changes T8 semantics for a controlled one-leaf change at every Career condition-consumed Ten-God position', () => {
    const leftSnapshot = withTenGodFixture(BASE_TEN_GODS);
    const pairs: BenchmarkBPairObservation[] = CAREER_CONDITION_DIMENSIONS.map((dimension) => {
      const rightTenGods = replaceDimension(BASE_TEN_GODS, dimension);
      expect(changedDimensions(BASE_TEN_GODS, rightTenGods)).toEqual([dimension]);

      return {
        pairId: `career-ten-god-${dimension}`,
        kind: 'methodology_consumed_dimension',
        dimension: `derivedFacts.tenGods.${dimension}`,
        left: observe(leftSnapshot, `benchmark-b-${dimension}-left`),
        right: observe(
          withTenGodFixture(rightTenGods),
          `benchmark-b-${dimension}-right`,
        ),
        expectation: {
          consumedInput: 'different',
          interpretation: 'different',
        },
      };
    });

    const controlLeft = calculatedSnapshot(0);
    const controlRight = calculatedSnapshot(30);
    expect(controlLeft.calculationHash).not.toBe(controlRight.calculationHash);
    expect(conditionVector(resolvedTenGods(controlLeft))).toEqual(
      conditionVector(resolvedTenGods(controlRight)),
    );
    pairs.push({
      pairId: 'career-non-consumed-minute-control',
      kind: 'non_consumed_control',
      dimension: 'birthInput.time.minute-within-same-hour-pillar',
      left: observe(controlLeft, 'benchmark-b-control-minute-00'),
      right: observe(controlRight, 'benchmark-b-control-minute-30'),
      expectation: {
        consumedInput: 'same',
        interpretation: 'same',
      },
    });

    const report = auditBenchmarkBDiscriminatingCorpus(pairs);

    process.stdout.write(
      `BENCHMARK_B_MEASUREMENT ${JSON.stringify({
        pairCount: report.pairCount,
        methodologyConsumedDimensionPairCount: report.methodologyConsumedDimensionPairCount,
        nonConsumedControlPairCount: report.nonConsumedControlPairCount,
        passedPairCount: report.passedPairCount,
        failedPairCount: report.failedPairCount,
        unexplainedCollisionCount: report.unexplainedCollisionCount,
        falseSensitivityCount: report.falseSensitivityCount,
        dimensions: report.audits.map((audit) => ({
          dimension: audit.dimension,
          kind: audit.kind,
          observed: audit.result.observed,
          passed: audit.result.passed,
        })),
      })}\n`,
    );

    expect(report.methodologyConsumedDimensionPairCount).toBe(CAREER_CONDITION_DIMENSIONS.length);
    expect(report.nonConsumedControlPairCount).toBe(1);
    expect(report.unexplainedCollisionCount).toBe(0);
    expect(report.falseSensitivityCount).toBe(0);
    expect(report.failedPairCount).toBe(0);
    expect(report.failures).toEqual([]);
    expect(report.passed).toBe(true);
  });

  it('fails the corpus when a discriminating semantic change collapses or a control becomes sensitive', () => {
    const base: PersonalizationObservation = {
      caseId: 'left',
      consumedInputFingerprint: 'input-a',
      interpretationSignature: 'signature-a',
    };
    const report = auditBenchmarkBDiscriminatingCorpus([
      {
        pairId: 'collapsed',
        kind: 'methodology_consumed_dimension',
        dimension: 'derivedFacts.tenGods.year.stem',
        left: base,
        right: {
          caseId: 'right',
          consumedInputFingerprint: 'input-b',
          interpretationSignature: 'signature-a',
        },
        expectation: { consumedInput: 'different', interpretation: 'different' },
      },
      {
        pairId: 'false-sensitive-control',
        kind: 'non_consumed_control',
        dimension: 'birthInput.time.minute-within-same-hour-pillar',
        left: base,
        right: {
          caseId: 'control-right',
          consumedInputFingerprint: 'input-c',
          interpretationSignature: 'signature-c',
        },
        expectation: { consumedInput: 'same', interpretation: 'same' },
      },
    ]);

    expect(report.unexplainedCollisionCount).toBe(1);
    expect(report.falseSensitivityCount).toBe(1);
    expect(report.failures).toEqual([
      'DISCRIMINATING_PAIR_FAILURE_PRESENT',
      'NON_CONSUMED_CONTROL_FAILURE_PRESENT',
    ]);
    expect(report.passed).toBe(false);
  });
});
