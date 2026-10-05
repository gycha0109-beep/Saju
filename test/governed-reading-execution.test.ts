import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativePolicy } from '../src/contracts/narrative.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../src/interpretation/interpretation-engine.js';
import type {
  CompiledNarrativePrompt,
  NarrativeGenerationParams,
  NarrativeModelAdapter,
} from '../src/llm/model-adapter.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { buildDeterministicFallbackDraft } from '../src/narrative/deterministic-fallback.js';
import {
  executeProductReading,
  type LegacyNarrativeRuntimeV1,
} from '../src/reading/governed-reading-execution.js';
import {
  I7_RESEARCH_SOURCES,
  createI7SeasonalSupportRegistry,
} from '../src/research/i7-seasonal-support-pack.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../src/research/general-natal-t8-structural-summary-candidate.js';

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
    const familyParents = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-parents-complete',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });
    const interpretation = executionWithClaims(currentSnapshot, registry, [familyParents]);
    const adapter = new TrackingAdapter();

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-complete', text: '부모운' },
      adapter,
      narrativePolicy,
      {
        ...executionOptions,
        narrativeNow: new Date('2026-08-24T00:10:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-24T00:11:00.000Z'),
      },
    );

    expect(result.state).toBe('completed');
    expect(result.preparation.state).toBe('ready_for_execution');
    expect(result.modelCalls).toBe(1);
    expect(adapter.calls).toHaveLength(1);
    expect(result.narrative?.outcome).toBe('model_first_pass');
    expect(result.artifact).toBeDefined();
    expect(result.canonicalSemantics).toBeUndefined();
    expect(result.officialReadingPlan).toBeUndefined();
    expect(result.officialReadingReport).toBeUndefined();
    expect(result.consumerReadingAuthority?.authority).toBe('legacy_narrative');
    expect(adapter.calls[0]?.prompt.evidence.narrativePolicyVersion).toBe(narrativePolicy.version);
    expect(result.preparation).not.toHaveProperty('narrativeRequest');
    expect(result.preparation).not.toHaveProperty('narrativeRequestRef');
    expect(result.artifact?.provenance.snapshotId).toBe(currentSnapshot.snapshotId);
    expect(result.artifact?.provenance.interpretationRunId).toBe(
      interpretation.run.interpretationRunId,
    );
    expect(result.artifact?.provenance.narrativeRunId).toBe(result.narrative?.run.narrativeRunId);
  });

  it('renders a canonical Official Reading and pins semantic provenance when selected claims carry report meaning', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const wealthBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-canonical-report',
      tier: 'T8',
      category: 'wealth',
      subcategory: 'friction',
    });
    const wealth: InterpretationClaim = {
      ...wealthBase,
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '준비와 결과 사이의 긴장',
        summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
    };
    const interpretation = executionWithClaims(currentSnapshot, registry, [wealth]);
    const adapter = new TrackingAdapter('provider_error');

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-canonical-report', text: '재물운' },
      adapter,
      narrativePolicy,
      {
        ...executionOptions,
        narrativeNow: new Date('2026-08-24T00:20:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-24T00:21:00.000Z'),
      },
    );

    expect(result.state).toBe('completed');
    expect(result.officialReadingReport?.sections.map((section) => section.title)).toEqual([
      '충돌·흔들림',
      '해석 범위',
    ]);
    expect(result.officialReadingReport?.sections[0]?.blocks).toEqual([
      {
        type: 'insights',
        items: [
          {
            headline: '준비와 결과 사이의 긴장',
            summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
            explainabilityRef: expect.stringMatching(
              /^explain_official_[0-9a-f]{16}$/u,
            ),
          },
        ],
      },
    ]);
    const officialInsight = result.officialReadingReport?.sections[0]?.blocks[0];
    if (officialInsight?.type !== 'insights') {
      throw new Error('fixture must render an Official insight block');
    }
    const officialExplainabilityRef = officialInsight.items[0]?.explainabilityRef;
    expect(
      result.officialReadingReport?.explainability.entries.some(
        (entry) => entry.explainabilityRef === officialExplainabilityRef,
      ),
    ).toBe(true);
    expect(result.officialReadingReport?.sourceSemanticHash).toBe(
      result.canonicalSemantics?.semanticHash,
    );
    expect(result.officialReadingReport?.sourcePlanHash).toBe(
      result.officialReadingPlan?.planHash,
    );
    expect(result.officialReadingReport?.rendererVersion).toBe(
      'myeonghwa-official-reading-renderer-v1',
    );
    expect(result.artifact).toBeDefined();
    expect(result.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(result.artifact?.schemaVersion).toBe('myeonghwa-official-reading-artifact-v1');
    expect(result.artifact?.provenance).not.toHaveProperty('narrativeRunId');
    expect(result.narrative).toBeUndefined();
    expect(result.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(result.constraints.mayInvokeNarrativeForOfficialReadingAuthority).toBe(false);
  });


  it('executes Official Reading without any Legacy Narrative runtime dependency', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const wealthBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-official-no-legacy-runtime',
      tier: 'T8',
      category: 'wealth',
      subcategory: 'friction',
    });
    const wealth: InterpretationClaim = {
      ...wealthBase,
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '준비와 결과 사이의 긴장',
        summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
    };

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [wealth]),
      registry,
      { requestId: 'execution-official-without-legacy-runtime', text: '재물운' },
      executionOptions,
    );

    expect(result.state).toBe('completed');
    expect(result.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(result.modelCalls).toBe(0);
    expect(result.narrative).toBeUndefined();
    expect(result.artifact?.schemaVersion).toBe('myeonghwa-official-reading-artifact-v1');
  });

  it('renders approved concise general meaning with zero model calls', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const generalBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-general-approved-concise',
      tier: 'T8',
      category: 'general',
      subcategory: 'month_branch_structural_context',
    });
    const general: InterpretationClaim = {
      ...generalBase,
      claimType: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
      predicate: 'month_branch_structural_context',
      value: {
        relation: 'peer',
        structuralRelationship: 'same_element',
        headline: '월지와 일간이 같은 오행 관계입니다',
        summary:
          '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        semanticScope: 'month_branch_structural_context_non_conclusive',
        classificationAuthorized: false,
        numericScoringAuthorized: false,
        fortunePolarityAuthorized: false,
        upstreamEvidenceDirectionAsFortuneMeaningAuthorized: false,
      },
      methodologyRef: {
        id: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.methodologyId,
        version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.version,
      },
      sourceRefs: [],
    };

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [general]),
      registry,
      {
        requestId: 'execution-official-approved-concise-general',
        text: '사주',
        outputPreferences: { preferredDetail: 'concise' },
      },
      executionOptions,
    );

    expect(result.state).toBe('completed');
    expect(result.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(result.modelCalls).toBe(0);
    expect(result.narrative).toBeUndefined();
    expect(result.officialReadingReport?.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'concise',
      resolution: 'exact',
    });
    expect(JSON.stringify(result.officialReadingReport?.sections)).toContain(
      '월지와 일간은 같은 오행으로 연결되며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    );
    expect(JSON.stringify(result.officialReadingReport?.sections)).not.toContain(
      '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    );
  });

  it('activates includeSourceSummaries only for Official Reading requests that ask for it', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const wealthBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-official-source-summary',
      tier: 'T8',
      category: 'wealth',
      subcategory: 'friction',
    });
    const wealth: InterpretationClaim = {
      ...wealthBase,
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '준비와 결과 사이의 긴장',
        summary: '배움과 실행 사이의 긴장을 함께 봅니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      sourceRefs: [I7_RESEARCH_SOURCES.ditianSui.sourceId],
    };
    const interpretation = executionWithClaims(currentSnapshot, registry, [wealth]);

    const requested = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-source-summary-on',
        text: '재물운',
        outputPreferences: { includeSourceSummaries: true },
      },
      executionOptions,
    );
    const omitted = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-source-summary-off',
        text: '재물운',
      },
      executionOptions,
    );

    const source = registry.sources.find(
      (candidate) => candidate.sourceId === I7_RESEARCH_SOURCES.ditianSui.sourceId,
    );
    if (source === undefined) throw new Error('fixture source must exist');
    const expectedText =
      `출처: ${source.title} — ${source.notes ?? 'Registered source metadata; no source text included.'}`;
    const requestedHints =
      requested.officialReadingReport?.sections.flatMap((section) =>
        section.blocks.filter((block) => block.type === 'source_hint'),
      ) ?? [];
    const omittedHints =
      omitted.officialReadingReport?.sections.flatMap((section) =>
        section.blocks.filter((block) => block.type === 'source_hint'),
      ) ?? [];

    expect(requested.state).toBe('completed');
    expect(requested.preparation.composition?.evidence?.bundle.sourceSummaries).toBeDefined();
    expect(requestedHints).toHaveLength(1);
    expect(requestedHints[0]).toMatchObject({
      type: 'source_hint',
      text: expectedText,
    });
    expect(omitted.state).toBe('completed');
    expect(omitted.preparation.composition?.evidence?.bundle.sourceSummaries).toBeUndefined();
    expect(omittedHints).toEqual([]);
    expect(requested.modelCalls).toBe(0);
    expect(omitted.modelCalls).toBe(0);
  });

  it('applies Official Reading detail preference resolution without changing visible governed content', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const wealthBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-official-detail-preference',
      tier: 'T8',
      category: 'wealth',
      subcategory: 'friction',
    });
    const wealth: InterpretationClaim = {
      ...wealthBase,
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '준비와 결과 사이의 긴장',
        summary: '배움과 실행 사이의 긴장을 함께 봅니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
    };
    const interpretation = executionWithClaims(currentSnapshot, registry, [wealth]);

    const baseline = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-detail-baseline',
        text: '재물운',
      },
      executionOptions,
    );
    const standard = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-detail-standard',
        text: '재물운',
        outputPreferences: { preferredDetail: 'standard' },
      },
      executionOptions,
    );
    const concise = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-detail-concise',
        text: '재물운',
        outputPreferences: { preferredDetail: 'concise' },
      },
      executionOptions,
    );
    const detailed = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-detail-detailed',
        text: '재물운',
        outputPreferences: { preferredDetail: 'detailed' },
      },
      executionOptions,
    );

    expect([
      baseline.state,
      standard.state,
      concise.state,
      detailed.state,
    ]).toEqual(['completed', 'completed', 'completed', 'completed']);
    expect([
      baseline.modelCalls,
      standard.modelCalls,
      concise.modelCalls,
      detailed.modelCalls,
    ]).toEqual([0, 0, 0, 0]);

    expect(baseline.officialReadingReport?.detailPreferenceResolution).toBeUndefined();
    expect(standard.officialReadingReport?.sections).toEqual(
      baseline.officialReadingReport?.sections,
    );
    expect(concise.officialReadingReport?.sections).toEqual(
      baseline.officialReadingReport?.sections,
    );
    expect(detailed.officialReadingReport?.sections).toEqual(
      baseline.officialReadingReport?.sections,
    );
    expect(concise.officialReadingReport?.explainability).toEqual(
      baseline.officialReadingReport?.explainability,
    );
    expect(detailed.officialReadingReport?.explainability).toEqual(
      baseline.officialReadingReport?.explainability,
    );

    expect(standard.officialReadingReport?.detailPreferenceResolution).toEqual({
      requestedDetail: 'standard',
      resolvedDetail: 'standard',
      resolution: 'exact',
    });
    expect(concise.officialReadingReport?.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_approved_concise_material',
    });
    expect(detailed.officialReadingReport?.detailPreferenceResolution).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });

    expect(concise.artifact?.sections).toEqual(baseline.artifact?.sections);
    expect(detailed.artifact?.sections).toEqual(baseline.artifact?.sections);
    expect(JSON.stringify(concise.artifact)).not.toContain(
      'myeonghwa-official-reading-detail-presentation-policy-v1',
    );
    expect(JSON.stringify(concise.artifact)).not.toContain(
      'missing_text_role_authority',
    );
  });

  it('does not inspect a malformed Legacy Narrative runtime for an Official Reading request', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const wealthBase = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-official-ignore-legacy-runtime',
      tier: 'T8',
      category: 'wealth',
      subcategory: 'friction',
    });
    const wealth: InterpretationClaim = {
      ...wealthBase,
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '공식 해석',
        summary: '공식 해석은 Legacy Narrative 런타임과 독립적으로 생성됩니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
    };
    const malformedRuntime = {
      runtimeVersion: 'invalid-runtime',
    } as unknown as LegacyNarrativeRuntimeV1;

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [wealth]),
      registry,
      { requestId: 'execution-official-ignore-malformed-runtime', text: '재물운' },
      executionOptions,
      malformedRuntime,
    );

    expect(result.state).toBe('completed');
    expect(result.modelCalls).toBe(0);
    expect(result.narrative).toBeUndefined();
  });

  it('fails closed with zero model calls when a Legacy request has no Narrative runtime', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const familyParents = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-parents-no-legacy-runtime',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [familyParents]),
      registry,
      { requestId: 'execution-legacy-without-runtime', text: '부모운' },
      executionOptions,
    );

    expect(result.state).toBe('invariant_blocked');
    expect(result.consumerReadingAuthority?.authority).toBe('legacy_narrative');
    expect(result.reasonCodes).toEqual(['LEGACY_NARRATIVE_RUNTIME_REQUIRED']);
    expect(result.modelCalls).toBe(0);
    expect(result.narrative).toBeUndefined();
    expect(result.artifact).toBeUndefined();
    expect(result.constraints.mayFallbackLegacyWithoutNarrativeRuntime).toBe(false);
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
    const familyParents = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-parents-provider-fallback',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });
    const adapter = new TrackingAdapter('provider_error');

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [familyParents]),
      registry,
      { requestId: 'execution-provider-fallback', text: '부모운' },
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
    const familyParents = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-parents-repair-limit',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });
    const adapter = new TrackingAdapter('always_invalid');

    const result = await executeProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [familyParents]),
      registry,
      { requestId: 'execution-repair-limit', text: '부모운' },
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
    const familyParents = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-parents-execution-determinism',
      tier: 'T8',
      category: 'family',
      subcategory: 'parents',
    });
    const interpretation = executionWithClaims(currentSnapshot, registry, [familyParents]);

    const first = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'execution-determinism', text: '부모운' },
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
      { requestId: 'execution-determinism', text: '부모운' },
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
