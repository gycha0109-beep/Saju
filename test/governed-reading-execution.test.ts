import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
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
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';
import { createGovernedAnnualStructuralImpactBundleV1 } from '../src/reading/annual-structural-impact-bundle.js';
import {
  I7_RESEARCH_SOURCES,
  createI7SeasonalSupportRegistry,
} from '../src/research/i7-seasonal-support-pack.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';

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

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

function fiveFamilySnapshot(): CanonicalSajuSnapshot {
  const base = snapshot();
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
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

  it('renders a complete approved concise general reading with zero model calls', async () => {
    const currentSnapshot = snapshot();
    const registry = createGeneralNatalUsefulReadingCandidateRegistry(
      '2026-08-24T00:04:00.000Z',
    );
    const interpretation = runInterpretation(currentSnapshot, registry, {
      requestId: 'execution-official-approved-concise-general-interpretation',
      now: new Date('2026-08-24T00:05:00.000Z'),
    });

    const baseline = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-approved-general-standard',
        text: '사주',
      },
      executionOptions,
    );
    const concise = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-official-approved-general-concise',
        text: '사주',
        outputPreferences: { preferredDetail: 'concise' },
      },
      executionOptions,
    );

    expect([baseline.state, concise.state]).toEqual(['completed', 'completed']);
    expect([
      baseline.consumerReadingAuthority?.authority,
      concise.consumerReadingAuthority?.authority,
    ]).toEqual(['official_reading', 'official_reading']);
    expect([baseline.modelCalls, concise.modelCalls]).toEqual([0, 0]);
    expect(baseline.narrative).toBeUndefined();
    expect(concise.narrative).toBeUndefined();
    expect(baseline.officialReadingReport?.detailPreferenceResolution).toBeUndefined();
    expect(concise.officialReadingReport?.detailPreferenceResolution).toEqual({
      requestedDetail: 'concise',
      resolvedDetail: 'concise',
      resolution: 'exact',
    });
    expect(concise.officialReadingReport?.explainability).toEqual(
      baseline.officialReadingReport?.explainability,
    );
    expect(concise.officialReadingReport?.sections).not.toEqual(
      baseline.officialReadingReport?.sections,
    );

    const baselineInsights =
      baseline.officialReadingReport?.sections.flatMap((section) =>
        section.blocks.flatMap((block) =>
          block.type === 'insights' ? block.items : [],
        ),
      ) ?? [];
    const conciseInsights =
      concise.officialReadingReport?.sections.flatMap((section) =>
        section.blocks.flatMap((block) =>
          block.type === 'insights' ? block.items : [],
        ),
      ) ?? [];

    expect(baselineInsights.length).toBeGreaterThan(0);
    expect(conciseInsights).toHaveLength(baselineInsights.length);
    expect(baselineInsights.some((item) => item.headline !== undefined)).toBe(
      true,
    );
    expect(conciseInsights.every((item) => item.headline === undefined)).toBe(
      true,
    );
  });

  it.each([
    {
      label: 'career',
      text: '직업운',
      createRegistry: createCareerNatalReadingCandidateRegistry,
    },
    {
      label: 'wealth',
      text: '재물운',
      createRegistry: createWealthNatalReadingCandidateRegistry,
    },
    {
      label: 'relationship',
      text: '관계운',
      createRegistry: createRelationshipNatalReadingCandidateRegistry,
    },
    {
      label: 'business',
      text: '사업운',
      createRegistry: createBusinessNatalReadingCandidateRegistry,
    },
  ])(
    'renders approved concise $label Official Reading with zero model calls',
    async ({ label, text, createRegistry }) => {
      const currentSnapshot = fiveFamilySnapshot();
      const registry = createRegistry('2026-10-06T01:10:00.000Z');
      const interpretation = runInterpretation(currentSnapshot, registry, {
        requestId: `execution-official-approved-concise-${label}-interpretation`,
        now: new Date('2026-10-06T01:11:00.000Z'),
      });

      const baseline = await executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        {
          requestId: `execution-official-approved-${label}-standard`,
          text,
        },
        executionOptions,
      );
      const concise = await executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        {
          requestId: `execution-official-approved-${label}-concise`,
          text,
          outputPreferences: { preferredDetail: 'concise' },
        },
        executionOptions,
      );

      expect([baseline.state, concise.state]).toEqual([
        'completed',
        'completed',
      ]);
      expect([
        baseline.consumerReadingAuthority?.authority,
        concise.consumerReadingAuthority?.authority,
      ]).toEqual(['official_reading', 'official_reading']);
      expect([baseline.modelCalls, concise.modelCalls]).toEqual([0, 0]);
      expect(baseline.narrative).toBeUndefined();
      expect(concise.narrative).toBeUndefined();
      expect(concise.officialReadingReport?.detailPreferenceResolution).toEqual(
        {
          requestedDetail: 'concise',
          resolvedDetail: 'concise',
          resolution: 'exact',
        },
      );
      expect(concise.officialReadingReport?.explainability).toEqual(
        baseline.officialReadingReport?.explainability,
      );
      expect(concise.officialReadingReport?.sections).not.toEqual(
        baseline.officialReadingReport?.sections,
      );
    },
  );

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
      'myeonghwa-official-reading-detail-presentation-policy-v2',
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
  it('routes governed annual structure transition through Official Reading artifact and public response when explicit annual authority is supplied', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const annualClaim = claim(currentSnapshot.snapshotId, {
      id: 'claim-general-annual-r195',
      tier: 'T9',
      category: 'general',
      subcategory: 'annual',
    });
    const interpretation = executionWithClaims(
      currentSnapshot,
      registry,
      [annualClaim],
    );

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'execution-r195-general-annual',
        text: '올해 사주',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
      },
      {
        ...executionOptions,
        artifactGeneratedAt: new Date('2026-10-06T10:30:00.000Z'),
        consumerReadingAuthorityResolver: (intent) => ({
          authorityVersion: 'test-r195-annual-official-v1',
          readingSection: `${intent.domain}:${intent.temporalScope}`,
          authority: 'official_reading',
          supportedOfficialReadingSection: 'general:annual',
          constraints: {
            mayPromoteProductionInterpretationAuthority: false,
            mayGrantPersistenceAuthority: false,
            mayGrantPublicGeneralAvailabilityAuthority: false,
            mayTreatUnsupportedSectionAsOfficialReading: false,
          },
        }),
        officialReadingSemanticProjectionResolver: ({ targetClaimIds }) => ({
          semanticTextBindings: targetClaimIds.map((targetClaimId) => ({
            targetClaimId,
            canonicalText: {
              headline: '연간 흐름의 기준',
              summary: '등록된 연간 claim 의미를 그대로 사용합니다.',
            },
            provenance: {
              admissionId: 'test-r195-admission',
              admissionRegistryVersion: '1.0.0-test',
              researchId: 'test-r195-research',
              researchVersion: '1.0.0-test',
              authorityState: 'test_official',
            },
          })),
          semanticQualifierBindings: [],
        }),
        governedAnnualTemporalStructure: {
          baseline: {
            baselineId: 'r195-baseline',
            structureId: 'r195-structure',
            authority: 'governed_upstream',
            state: 'intact',
          },
          impactBundle: createGovernedAnnualStructuralImpactBundleV1({
            snapshotId: currentSnapshot.snapshotId,
            targetYear: 2026,
            structureId: 'r195-structure',
            producerRef: {
              id: 'test-r195-governed-annual-producer',
              version: '1.0.0-test',
            },
            assessments: [
              {
                status: 'resolved',
                assessmentId: 'r195-assessment',
                settlementId: 'r195-settlement',
                structureId: 'r195-structure',
                participantImpacts: [
                  {
                    participantRole: 'controller',
                    roleAssignmentId: 'r195-role-primary',
                    pillar: 'year',
                    stem: '갑',
                    tenGod: '식신',
                    disposition: 'supports_structure',
                    criticality: 'core',
                    functionState: 'impaired',
                    impact: 'weakens_structure',
                  },
                  {
                    participantRole: 'controlled',
                    roleAssignmentId: 'r195-role-neutral',
                    pillar: 'month',
                    stem: '기',
                    tenGod: '정관',
                    disposition: 'neutral',
                    criticality: 'secondary',
                    functionState: 'preserved',
                    impact: 'maintains_structure',
                  },
                ],
                overallImpact: 'weakens_structure',
                decisionRule: 'single_direction',
                decisiveRoleAssignmentIds: ['r195-role-primary'],
              },
            ],
          }),
        },
      },
    );

    expect(result.state).toBe('completed');
    expect(result.consumerReadingAuthority?.authority).toBe('official_reading');
    const timing = result.artifact?.sections.find(
      (section) => section.sectionType === 'timing',
    );
    expect(timing?.title).toBe('2026년 구조 흐름');
    expect(timing?.blocks).toEqual([
      {
        type: 'fact_table',
        rows: [
          { label: '연간 기둥', value: '병오' },
          { label: '이전 구조 상태', value: '정상' },
          { label: '이번 구조 방향', value: '구조 약화 방향' },
          { label: '다음 구조 상태', value: '약화' },
        ],
      },
      {
        type: 'paragraph',
        text: '기존 구조가 한 단계 약해지는 흐름입니다.',
      },
    ]);

    const response = buildProductReadingResponse(
      buildProductReadingDelivery(result),
    );
    const publicTiming = response.reading?.sections.find(
      (section) => section.sectionType === 'timing',
    );
    expect(publicTiming).toEqual({
      sectionType: 'timing',
      title: '2026년 구조 흐름',
      blocks: [
        {
          type: 'fact_table',
          rows: [
            { label: '연간 기둥', value: '병오' },
            { label: '이전 구조 상태', value: '정상' },
            { label: '이번 구조 방향', value: '구조 약화 방향' },
            { label: '다음 구조 상태', value: '약화' },
          ],
        },
        {
          type: 'paragraph',
          text: '기존 구조가 한 단계 약해지는 흐름입니다.',
        },
      ],
      state: 'complete',
    });
    expect(JSON.stringify(response)).not.toMatch(
      /r195-assessment|r195-settlement|r195-role-primary|governed_upstream/u,
    );
  });

  it('does not silently mix governed annual temporal structure into the default legacy annual path', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const annualClaim = claim(currentSnapshot.snapshotId, {
      id: 'claim-general-annual-r195-default-authority',
      tier: 'T9',
      category: 'general',
      subcategory: 'annual',
    });
    const interpretation = executionWithClaims(
      currentSnapshot,
      registry,
      [annualClaim],
    );

    await expect(
      executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        {
          requestId: 'execution-r195-default-annual',
          text: '올해 사주',
          referenceDateTime: '2026-06-15T12:00:00.000Z',
        },
        {
          ...executionOptions,
          governedAnnualTemporalStructure: {
            baseline: {
              baselineId: 'r195-default-baseline',
              structureId: 'r195-default-structure',
              authority: 'governed_upstream',
              state: 'intact',
            },
            impactBundle: createGovernedAnnualStructuralImpactBundleV1({
              snapshotId: currentSnapshot.snapshotId,
              targetYear: 2026,
              structureId: 'r195-default-structure',
              producerRef: {
                id: 'test-r195-default-governed-annual-producer',
                version: '1.0.0-test',
              },
              assessments: [
                {
                  status: 'resolved',
                  assessmentId: 'r195-default-assessment',
                  settlementId: 'r195-default-settlement',
                  structureId: 'r195-default-structure',
                  participantImpacts: [
                    {
                      participantRole: 'controller',
                      roleAssignmentId: 'r195-default-role-primary',
                      pillar: 'year',
                      stem: '갑',
                      tenGod: '식신',
                      disposition: 'supports_structure',
                      criticality: 'core',
                      functionState: 'impaired',
                      impact: 'weakens_structure',
                    },
                    {
                      participantRole: 'controlled',
                      roleAssignmentId: 'r195-default-role-neutral',
                      pillar: 'month',
                      stem: '기',
                      tenGod: '정관',
                      disposition: 'neutral',
                      criticality: 'secondary',
                      functionState: 'preserved',
                      impact: 'maintains_structure',
                    },
                  ],
                  overallImpact: 'weakens_structure',
                  decisionRule: 'single_direction',
                  decisiveRoleAssignmentIds: ['r195-default-role-primary'],
                },
              ],
            }),
          },
        },
      ),
    ).rejects.toThrow(/requires Official Reading authority/u);
  });

});
