import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import * as productReadingPublic from '../src/product-reading.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type CompiledNarrativePrompt,
  type InterpretationClaim,
  type InterpretationExecutionResult,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/product-reading-service-test',
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
  policyId: 'myeonghwa-product-reading-service-policy',
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

const serviceOptions = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'myeonghwa-reading-service-v1-test',
} as const;

class TrackingAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'test-model',
    modelRevision: 'product-reading-service-test',
  } as const;

  readonly calls: CompiledNarrativePrompt[] = [];

  constructor(private readonly providerError = false) {}

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    this.calls.push(prompt);
    if (this.providerError) throw new Error('provider unavailable');
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

function claim(
  snapshotId: string,
  id: string,
  tier: 'T8' | 'T9',
  category: string,
  subcategory?: string,
): InterpretationClaim {
  return {
    claimId: id,
    schemaVersion: 'myeonghwa-product-reading-service-test-claim-v1',
    snapshotId,
    taxonomy: {
      tier,
      category,
      ...(subcategory === undefined ? {} : { subcategory }),
    },
    claimType: `CLAIM-${id}`,
    subject: category,
    predicate: 'product_reading_service_fixture',
    value: { fixture: id },
    methodologyRef: { id: 'METHOD-PRODUCT-READING-SERVICE', version: '1.0.0-test' },
    ruleRefs: [
      { ruleId: `RULE-${id}`, version: '1.0.0-test', evaluationId: `eval-${id}` },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function interpretationWithClaims(
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

describe('Product Reading Service Facade', () => {
  it('returns a transport-safe delivered response from the single public service call', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, 'claim-career-service', 'T8', 'career');
    const adapter = new TrackingAdapter();

    const result = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretationWithClaims(currentSnapshot, registry, [career]),
      registry,
      { requestId: 'service-success', text: '직업운' },
      adapter,
      narrativePolicy,
      serviceOptions,
    );

    expect(result.state).toBe('delivered');
    expect(result.reading).toBeDefined();
    expect(adapter.calls).toHaveLength(1);
    expect(result).not.toHaveProperty('artifact');
    expect(result).not.toHaveProperty('audit');
    expect(result).not.toHaveProperty('constraints');
    expect(result.reading).not.toHaveProperty('explainability');
    expect(result.reading).not.toHaveProperty('provenance');
    expect(JSON.stringify(result)).not.toContain('claim-career-service');
  });

  it('returns clarification_required and performs zero model calls for ambiguous input', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const adapter = new TrackingAdapter();

    const result = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretationWithClaims(currentSnapshot, registry, []),
      registry,
      { requestId: 'service-ambiguous', text: '사업운 재물운' },
      adapter,
      narrativePolicy,
      serviceOptions,
    );

    expect(result.state).toBe('clarification_required');
    expect(result.clarification?.kind).toBe('domain');
    expect(adapter.calls).toHaveLength(0);
    expect(result.reading).toBeUndefined();
  });

  it('returns partial_evidence and performs zero model calls when annual evidence is incomplete', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const businessNatal = claim(
      currentSnapshot.snapshotId,
      'claim-business-service-partial',
      'T8',
      'business',
    );
    const adapter = new TrackingAdapter();

    const result = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretationWithClaims(currentSnapshot, registry, [businessNatal]),
      registry,
      { requestId: 'service-partial', text: '올해 사업운' },
      adapter,
      narrativePolicy,
      serviceOptions,
    );

    expect(result.state).toBe('partial_evidence');
    expect(result.coverage?.state).toBe('partial');
    expect(adapter.calls).toHaveLength(0);
    expect(result.reading).toBeUndefined();
  });

  it('preserves the existing grounded deterministic fallback as delivered_with_fallback', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(
      currentSnapshot.snapshotId,
      'claim-career-service-fallback',
      'T8',
      'career',
    );
    const adapter = new TrackingAdapter(true);

    const result = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretationWithClaims(currentSnapshot, registry, [career]),
      registry,
      { requestId: 'service-fallback', text: '직업운' },
      adapter,
      narrativePolicy,
      serviceOptions,
    );

    expect(result.state).toBe('delivered_with_fallback');
    expect(result.reading).toBeDefined();
    expect(adapter.calls).toHaveLength(1);
  });

  it('keeps operational configuration failures as exceptions rather than consumer Saju states', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();

    await expect(
      productReadingPublic.requestProductReading(
        currentSnapshot,
        interpretationWithClaims(currentSnapshot, registry, []),
        registry,
        { requestId: 'service-operational-error', text: '직업운' },
        new TrackingAdapter(),
        narrativePolicy,
        { ...serviceOptions, outputSchemaVersion: '' },
      ),
    ).rejects.toThrow('outputSchemaVersion must be a non-empty string');
  });

  it('exposes only the facade function and version as runtime values from the product-reading entrypoint', () => {
    expect(Object.keys(productReadingPublic).sort()).toEqual([
      'PRODUCT_READING_SERVICE_VERSION',
      'requestProductReading',
    ]);
    expect(productReadingPublic).not.toHaveProperty('prepareProductReading');
    expect(productReadingPublic).not.toHaveProperty('executeProductReading');
    expect(productReadingPublic).not.toHaveProperty('buildProductReadingDelivery');
    expect(productReadingPublic).not.toHaveProperty('buildProductReadingResponse');
  });

  it('registers the consumer product-reading subpath in the package export map', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, { types: string; default: string }>;
    };
    expect(packageJson.exports['./product-reading']).toEqual({
      types: './dist/product-reading.d.ts',
      default: './dist/product-reading.js',
    });
  });

  it('keeps the final response identity deterministic across audit timestamps', async () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(
      currentSnapshot.snapshotId,
      'claim-career-service-determinism',
      'T8',
      'career',
    );
    const interpretation = interpretationWithClaims(currentSnapshot, registry, [career]);

    const first = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'service-determinism', text: '직업운' },
      new TrackingAdapter(),
      narrativePolicy,
      {
        ...serviceOptions,
        narrativeNow: new Date('2026-08-24T01:00:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-24T01:01:00.000Z'),
      },
    );
    const second = await productReadingPublic.requestProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'service-determinism', text: '직업운' },
      new TrackingAdapter(),
      narrativePolicy,
      {
        ...serviceOptions,
        narrativeNow: new Date('2026-08-25T01:00:00.000Z'),
        artifactGeneratedAt: new Date('2026-08-25T01:01:00.000Z'),
      },
    );

    expect(second.responseId).toBe(first.responseId);
    expect(second.reading?.readingId).toBe(first.reading?.readingId);
    expect(second.reading?.generatedAt).not.toBe(first.reading?.generatedAt);
  });
});
