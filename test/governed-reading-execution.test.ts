import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  executeProductReading,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type CompiledNarrativePrompt,
  type InterpretationClaim,
  type InterpretationExecutionResult,
  type NarrativeGenerationParams,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';

const FIXED_READING_REFERENCE = '2026-09-03T12:00:00.000Z';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/governed-reading-execution-test',
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
  policyId: 'myeonghwa-governed-reading-narrative-policy',
  version: '1.0.0-test',
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

const executionOptions = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'myeonghwa-reading-v1-test',
} as const;

class TrackingAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'test-model',
    modelRevision: 'governed-reading-test',
  } as const;

  readonly calls: { prompt: CompiledNarrativePrompt; params?: NarrativeGenerationParams }[] = [];
  private callIndex = 0;

  constructor(private readonly mode: 'valid' | 'provider_error' | 'always_invalid' = 'valid') {}

  async generateStructured(
    prompt: CompiledNarrativePrompt,
    params?: NarrativeGenerationParams,
  ): Promise<unknown> {
    this.calls.push({ prompt, ...(params === undefined ? {} : { params }) });
    this.callIndex += 1;
    if (this.mode === 'provider_error') throw new Error('provider unavailable');
    if (this.mode === 'always_invalid') return { invalid: this.callIndex };
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-08-24T00:00:00.000Z') },
  );
}

interface ClaimFixture {
  id: string;
  tier: 'T8' | 'T9' | 'T11';
  category: string;
  subcategory?: string;
}

function claim(snapshotId: string, fixture: ClaimFixture): InterpretationClaim {
  return {
    claimId: fixture.id,
    schemaVersion: 'myeonghwa-governed-reading-execution-test-claim-v1',
    snapshotId,
    taxonomy: {
      tier: fixture.tier,
      category: fixture.category,
      ...(fixture.subcategory === undefined ? {} : { subcategory: fixture.subcategory }),
    },
    claimType: `CLAIM-${fixture.id}`,
    subject: fixture.category,
    predicate: 'governed_reading_execution_fixture',
    value: { fixture: fixture.id },
    methodologyRef: {
      id: 'METHOD-GOVERNED-READING-EXECUTION-TEST',
      version: '1.0.0-test',
    },
    ruleRefs: [
      {
        ruleId: `RULE-${fixture.id}`,
        version: '1.0.0-test',
        evaluationId: `eval-${fixture.id}`,
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function executionWithClaims(
  currentSnapshot: CanonicalSajuSnapshot,
  registry: ReturnType<typeof createI7SeasonalSupportRegistry>,
  claims: readonly InterpretationClaim[],
): InterpretationExecutionResult {
  const base = runInterpretation(currentSnapshot, registry, {
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  return {
    ...base,
    claims,
    claimRelations: [],
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
}

describe('Governed Reading Execution Orchestrator', () => {
  it('executes exactly one grounded model call and assembles a ReadingArtifact for complete evidence', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-complete',
      tier: 'T8',
      category: 'career',
    });
    const interpretation = executionWithClaims(currentSnapshot, registry, [career]);
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-complete', text: '직업운' },
      adapter,
      narrativePolicy,
      {
        ...executionOptions,
        narrativeNow: new Date('2026-08-24T00:10:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-24T00:11:00.000Z'),
      },
    );

    expect(result.state).toBe('completed');
    expect(result.preparation.state).toBe('ready_for_narrative');
    expect(result.modelCalls).toBe(1);
    expect(adapter.calls).toHaveLength(1);
    expect(result.narrative?.outcome).toBe('model_first_pass');
    expect(result.artifact).toBeDefined();
    expect(result.artifact?.provenance.snapshotId).toBe(currentSnapshot.snapshotId);
    expect(result.artifact?.provenance.interpretationRunId).toBe(
      interpretation.run.interpretationRunId,
    );
    expect(result.artifact?.provenance.narrativeRunId).toBe(result.narrative?.run.narrativeRunId);
  });

  it('makes zero model calls and creates no artifact for ambiguous input', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, []),
      registry,
      { requestId: 'execution-ambiguous', text: '올해 이번 달 사업운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('input_ambiguous');
    expect(result.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(result.narrative).toBeUndefined();
    expect(result.artifact).toBeUndefined();
    expect(result.constraints.mayInvokeModelWhenPreparationBlocked).toBe(false);
  });

  it('makes zero model calls and creates no artifact for partial coverage even when partial evidence exists', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const businessNatal = claim(currentSnapshot.snapshotId, {
      id: 'claim-business-partial',
      tier: 'T8',
      category: 'business',
    });
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [businessNatal]),
      registry,
      {
        requestId: 'execution-partial',
        text: '올해 사업운',
        referenceDateTime: FIXED_READING_REFERENCE,
      },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('partial_coverage');
    expect(result.preparation.composition?.evidence).toBeDefined();
    expect(result.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(result.artifact).toBeUndefined();
    expect(result.constraints.mayFillMissingEvidenceWithLLM).toBe(false);
  });

  it('makes zero model calls and creates no artifact for insufficient relationship evidence', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const child = claim(currentSnapshot.snapshotId, {
      id: 'claim-child-only',
      tier: 'T8',
      category: 'family',
      subcategory: 'children',
    });
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [child]),
      registry,
      { requestId: 'execution-insufficient', text: '부모운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('insufficient_evidence');
    expect(result.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(result.narrative).toBeUndefined();
    expect(result.artifact).toBeUndefined();
  });

  it('uses the existing deterministic fallback after a provider failure and still assembles a grounded artifact', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-provider-fallback',
      tier: 'T8',
      category: 'career',
    });
    const adapter = new TrackingAdapter('provider_error');

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [career]),
      registry,
      { requestId: 'execution-provider-fallback', text: '직업운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('completed_with_fallback');
    expect(result.modelCalls).toBe(1);
    expect(adapter.calls).toHaveLength(1);
    expect(result.narrative?.outcome).toBe('deterministic_fallback');
    expect(result.narrative?.run.validation.final).toBe('fallback');
    expect(result.artifact?.status).toBe('narrative_fallback');
    expect(result.reasonCodes).toEqual(['NARRATIVE_RUNTIME_USED_DETERMINISTIC_FALLBACK']);
  });

  it('inherits the existing one-repair limit and never performs a third model call', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-repair-limit',
      tier: 'T8',
      category: 'career',
    });
    const adapter = new TrackingAdapter('always_invalid');

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [career]),
      registry,
      { requestId: 'execution-repair-limit', text: '직업운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('completed_with_fallback');
    expect(result.modelCalls).toBe(2);
    expect(adapter.calls).toHaveLength(2);
    expect(adapter.calls[0]?.prompt.mode).toBe('generate');
    expect(adapter.calls[1]?.prompt.mode).toBe('repair');
    expect(result.constraints.mayRetryBeyondNarrativeRuntimePolicy).toBe(false);
    expect(result.artifact).toBeDefined();
  });

  it('executes explicit question-specific T11 evidence without granting the user text interpretation authority', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const questionClaim = claim(currentSnapshot.snapshotId, {
      id: 'claim-question-execution',
      tier: 'T11',
      category: 'question',
    });
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [questionClaim]),
      registry,
      { requestId: 'execution-question', text: '질문: 지금 이직을 고민해도 될까?' },
      adapter,
      narrativePolicy,
      executionOptions,
    );

    expect(result.state).toBe('completed');
    expect(adapter.calls).toHaveLength(1);
    expect(adapter.calls[0]?.prompt.purpose).toBe('question_answer');
    expect(adapter.calls[0]?.prompt.userRequest?.question).toBe('지금 이직을 고민해도 될까');
    expect(result.constraints.mayPromoteResearchAuthority).toBe(false);
  });

  it('keeps execution identity stable across audit timestamps when evidence and grounded output are identical', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-execution-determinism',
      tier: 'T8',
      category: 'career',
    });
    const interpretation = executionWithClaims(currentSnapshot, registry, [career]);

    const first = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-determinism', text: '직업운' },
      new TrackingAdapter(),
      narrativePolicy,
      {
        ...executionOptions,
        narrativeNow: new Date('2026-08-24T01:00:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-24T01:01:00.000Z'),
      },
    );
    const second = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-determinism', text: '직업운' },
      new TrackingAdapter(),
      narrativePolicy,
      {
        ...executionOptions,
        narrativeNow: new Date('2026-08-25T01:00:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-25T01:01:00.000Z'),
      },
    );

    expect(second.executionId).toBe(first.executionId);
    expect(second.narrative?.run.narrativeRunId).toBe(first.narrative?.run.narrativeRunId);
    expect(second.artifact?.readingId).toBe(first.artifact?.readingId);
    expect(second.artifact?.generatedAt).not.toBe(first.artifact?.generatedAt);
  });
});
