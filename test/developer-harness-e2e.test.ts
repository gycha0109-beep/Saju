import { describe, expect, test } from 'vitest';
import {
  buildDeterministicFallbackDraft,
  createI7SeasonalSupportRegistry,
  runDeveloperHarness,
  validateNarrativeDraftGrounding,
  type CalculationPolicySnapshot,
  type CompiledNarrativePrompt,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i10-e2e',
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

const narrativePolicy: NarrativePolicy = {
  policyId: 'POLICY-I10-E2E',
  version: 'narrative-policy-v1',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

class GroundedFixtureAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'fixture-provider',
    modelId: 'fixture-grounded-model',
    modelRevision: 'v1',
  } as const;

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

class FailingFixtureAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'fixture-provider',
    modelId: 'fixture-failing-model',
    modelRevision: 'v1',
  } as const;

  async generateStructured(): Promise<unknown> {
    throw new Error('synthetic provider outage');
  }
}

function baseRequest(now: Date, adapter: NarrativeModelAdapter) {
  return {
    requestId: 'request-i10-e2e',
    birthInput: {
      calendarType: 'solar' as const,
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true as const, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified' as const,
    },
    calculationPolicy,
    registry: createI7SeasonalSupportRegistry('2026-08-19T00:00:00.000Z'),
    narrativePolicy,
    narrativeModelAdapter: adapter,
    readingVersion: 'reading-v1',
    displayLabel: 'E2E Fixture',
    userRequest: {
      question: '현재 선택된 근거만 설명해 주세요.',
      preferredDetail: 'standard' as const,
    },
    now,
  };
}

describe('I10 developer harness E2E', () => {
  test('runs birth input through calculation, interpretation, evidence, narrative, and ReadingArtifact', async () => {
    const result = await runDeveloperHarness(
      baseRequest(new Date('2026-08-19T05:00:00.000Z'), new GroundedFixtureAdapter()),
    );

    expect(result.snapshot.input.date).toEqual({ year: 2024, month: 3, day: 10 });
    expect(result.interpretation.integrity.valid).toBe(true);
    expect(result.interpretation.claims.length).toBeGreaterThan(0);
    expect(result.evidence.bundle.snapshotId).toBe(result.snapshot.snapshotId);
    expect(result.evidence.bundle.interpretationRunId).toBe(
      result.interpretation.run.interpretationRunId,
    );
    expect(result.narrative.outcome).toBe('model_first_pass');
    expect(
      validateNarrativeDraftGrounding(result.narrative.draft, result.evidence.bundle).valid,
    ).toBe(true);

    expect(result.reading.provenance).toEqual({
      snapshotId: result.snapshot.snapshotId,
      interpretationRunId: result.interpretation.run.interpretationRunId,
      narrativeRunId: result.narrative.run.narrativeRunId,
      readingVersion: 'reading-v1',
    });
    expect(result.reading.subject.displayLabel).toBe('E2E Fixture');
    expect(result.reading.calculationSummary.pillars.day.status).toBe('resolved');
    expect(result.reading.sections.length).toBeGreaterThan(0);
    expect(result.reading.explainability.entries.length).toBeGreaterThan(0);
  });

  test('provider failure preserves completed calculation/interpretation and produces narrative_fallback ReadingArtifact', async () => {
    const result = await runDeveloperHarness(
      baseRequest(new Date('2026-08-19T05:00:00.000Z'), new FailingFixtureAdapter()),
    );

    expect(result.snapshot.snapshotId).toBeTruthy();
    expect(result.interpretation.integrity.valid).toBe(true);
    expect(result.narrative.outcome).toBe('deterministic_fallback');
    expect(result.narrative.modelCalls).toBe(1);
    expect(result.reading.status).toBe('narrative_fallback');
    expect(result.reading.sections.length).toBeGreaterThan(0);
  });

  test('unknown birth time remains explicit through the final ReadingArtifact', async () => {
    const result = await runDeveloperHarness({
      ...baseRequest(new Date('2026-08-19T05:00:00.000Z'), new GroundedFixtureAdapter()),
      requestId: 'request-i10-unknown-time',
      birthInput: {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      calculationPolicy: { ...calculationPolicy, dayBoundary: 'jasi' },
    });

    expect(result.snapshot.pillars.hour.status).toBe('unavailable');
    expect(result.snapshot.pillars.day.status).toBe('ambiguous');
    expect(result.reading.subject.birthInputDisplay.timeKnown).toBe(false);
    expect(result.reading.subject.birthInputDisplay).not.toHaveProperty('time');
    expect(result.reading.subject.calculationState).toBe('partially_ambiguous');
    expect(result.reading.calculationSummary.pillars.hour.status).toBe('unavailable');
    expect(result.reading.calculationSummary.ambiguity?.length).toBeGreaterThan(0);
    expect(result.reading.status).toBe('ready_with_ambiguity');
  });

  test('content-derived engine and reading identities are stable across audit timestamps', async () => {
    const first = await runDeveloperHarness(
      baseRequest(new Date('2026-08-19T05:00:00.000Z'), new GroundedFixtureAdapter()),
    );
    const second = await runDeveloperHarness(
      baseRequest(new Date('2026-08-20T05:00:00.000Z'), new GroundedFixtureAdapter()),
    );

    expect(first.snapshot.snapshotId).toBe(second.snapshot.snapshotId);
    expect(first.snapshot.calculationHash).toBe(second.snapshot.calculationHash);
    expect(first.interpretation.run.interpretationRunId).toBe(
      second.interpretation.run.interpretationRunId,
    );
    expect(first.evidence.evidenceBundleHash).toBe(second.evidence.evidenceBundleHash);
    expect(first.narrative.run.narrativeRunId).toBe(second.narrative.run.narrativeRunId);
    expect(first.reading.readingId).toBe(second.reading.readingId);
    expect(first.reading.generatedAt).not.toBe(second.reading.generatedAt);
  });
});
