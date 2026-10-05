import { LEGACY_NARRATIVE_RUNTIME_VERSION } from '../src/reading/governed-reading-execution.js';
import { readFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import * as productHostPublic from '../src/product-host.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativePolicy } from '../src/contracts/narrative.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type {
  CompiledNarrativePrompt,
  NarrativeModelAdapter,
} from '../src/llm/model-adapter.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { buildDeterministicFallbackDraft } from '../src/narrative/deterministic-fallback.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';
import {
  createMyeonghwaProductHost,
  parseProductHostReadingRequest,
  type MyeonghwaProductHostDependencies,
} from '../src/host/product-host.js';
import { createMyeonghwaProductHostServer } from '../src/host/http-server.js';

const TEST_ONLY_CALCULATION_POLICY: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/product-host-test-only',
  policyVersion: '1.0.0-test',
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

const TEST_ONLY_NARRATIVE_POLICY: NarrativePolicy = {
  policyId: 'myeonghwa-product-host-test-only',
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

class TestNarrativeAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'test-model',
    modelRevision: 'product-host-mvp',
  } as const;

  readonly calls: CompiledNarrativePrompt[] = [];

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    this.calls.push(prompt);
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

function parentsClaim(snapshot: CanonicalSajuSnapshot): InterpretationClaim {
  return {
    claimId: 'claim-product-host-family-parents',
    schemaVersion: 'myeonghwa-product-host-test-claim-v1',
    snapshotId: snapshot.snapshotId,
    taxonomy: { tier: 'T8', category: 'family', subcategory: 'parents' },
    claimType: 'CLAIM-PRODUCT-HOST-FAMILY-PARENTS',
    subject: 'family',
    predicate: 'product_host_test_fixture',
    value: { fixture: 'claim-product-host-family-parents' },
    methodologyRef: { id: 'METHOD-PRODUCT-HOST-TEST', version: '1.0.0-test' },
    ruleRefs: [
      {
        ruleId: 'RULE-PRODUCT-HOST-FAMILY-PARENTS',
        version: '1.0.0-test',
        evaluationId: 'eval-product-host-career',
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}


function wealthOfficialClaim(snapshot: CanonicalSajuSnapshot): InterpretationClaim {
  return {
    claimId: 'claim-product-host-wealth-official',
    schemaVersion: 'myeonghwa-product-host-test-claim-v1',
    snapshotId: snapshot.snapshotId,
    taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'friction' },
    claimType: 'WEALTH-NATAL-OFFICIAL-NO-LEGACY-RUNTIME',
    subject: 'wealth',
    predicate: 'wealth_conclusion',
    value: {
      wealthKind: 'friction',
      headline: '준비와 결과 사이의 긴장',
      summary: '배움에 더 투자할지 지금 결과를 만들지 사이에서 긴장이 생길 수 있습니다.',
      futureMoneyTimingAuthorized: false,
      numericScoringAuthorized: false,
    },
    methodologyRef: { id: 'METHOD-PRODUCT-HOST-TEST', version: '1.0.0-test' },
    ruleRefs: [
      {
        ruleId: 'RULE-PRODUCT-HOST-WEALTH-OFFICIAL',
        version: '1.0.0-test',
        evaluationId: 'eval-product-host-wealth-official',
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function dependencies(
  claims: (snapshot: CanonicalSajuSnapshot) => readonly InterpretationClaim[] = () => [],
  adapter = new TestNarrativeAdapter(),
): MyeonghwaProductHostDependencies {
  return {
    calculate(input) {
      return calculateCanonicalSajuSnapshot(input, TEST_ONLY_CALCULATION_POLICY, {
        now: new Date('2026-08-24T01:00:00.000Z'),
      });
    },
    interpret(snapshot) {
      const registry = createI7SeasonalSupportRegistry();
      const base = runInterpretation(snapshot, registry, {
        now: new Date('2026-08-24T01:01:00.000Z'),
      });
      return {
        registry,
        interpretation: {
          ...base,
          claims: claims(snapshot),
          claimRelations: [],
          integrity: { valid: true, errors: [] },
          evidenceIndex: {},
        },
      };
    },
    legacyNarrativeRuntime: {
      runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
      adapter,
      narrativePolicy: TEST_ONLY_NARRATIVE_POLICY,
    },
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'myeonghwa-product-host-reading-v1-test',
      narrativeNow: new Date('2026-08-24T01:02:00.000Z'),
      artifactGeneratedAt: new Date('2026-08-24T01:03:00.000Z'),
    },
    requestIdFactory: () => 'test-request',
  };
}

const validBody = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  },
  reading: { text: '부모운' },
} as const;

async function listen(
  deps: MyeonghwaProductHostDependencies,
  options: { maxRequestBytes?: number } = {},
): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createMyeonghwaProductHostServer(deps, options);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const address = server.address() as AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error === undefined ? resolve() : reject(error)));
      }),
  };
}

describe('Myeonghwa Product Host MVP', () => {
  it('normalizes the consumer birth payload without selecting a calculation policy', () => {
    const parsed = parseProductHostReadingRequest(validBody);
    expect(parsed.birth).toEqual({
      calendarType: 'solar',
      date: '2024-03-10',
      time: '12:00',
      sex: 'unspecified',
    });
    expect(parsed.reading).toEqual({ text: '부모운' });
    expect(parsed).not.toHaveProperty('calculationPolicy');
    expect(parsed).not.toHaveProperty('registry');
  });

  it('accepts only the bounded product detail preference surface', () => {
    for (const preferredDetail of ['concise', 'standard', 'detailed'] as const) {
      const parsed = parseProductHostReadingRequest({
        ...validBody,
        reading: {
          text: '부모운',
          outputPreferences: { preferredDetail },
        },
      });
      expect(parsed.reading.outputPreferences).toEqual({ preferredDetail });
    }

    expect(() =>
      parseProductHostReadingRequest({
        ...validBody,
        reading: {
          text: '부모운',
          outputPreferences: { preferredDetail: 'verbose' },
        },
      }),
    ).toThrow(/preferredDetail must be concise, standard, or detailed/u);

    expect(() =>
      parseProductHostReadingRequest({
        ...validBody,
        reading: {
          text: '부모운',
          outputPreferences: { includeSourceSummaries: true },
        },
      }),
    ).toThrow(/Unexpected field: includeSourceSummaries/u);

    expect(() =>
      parseProductHostReadingRequest({
        ...validBody,
        reading: {
          text: '부모운',
          outputPreferences: {},
        },
      }),
    ).toThrow(/preferredDetail must be concise, standard, or detailed/u);
  });

  it('carries the product detail preference into the normalized governed reading request', async () => {
    const base = dependencies();
    let observedDetail: unknown;

    const host = createMyeonghwaProductHost({
      ...base,
      requestNowFactory: () => new Date('2026-10-05T07:00:00.000Z'),
      async interpret(snapshot, context, requestContext) {
        observedDetail =
          requestContext?.readingRequest.outputPreferences?.preferredDetail;
        return base.interpret(snapshot, context, requestContext);
      },
    });

    await host.requestReading({
      birth: validBody.birth,
      reading: {
        text: '올해 사업운',
        outputPreferences: { preferredDetail: 'concise' },
      },
    });

    expect(observedDetail).toBe('concise');
  });

  it('passes unknown birth time into the real calculation engine through the injected TEST-ONLY calculator', async () => {
    let observedSnapshot: CanonicalSajuSnapshot | undefined;
    const base = dependencies();
    const host = createMyeonghwaProductHost({
      ...base,
      calculate(input, context) {
        expect(input.time).toEqual({ known: false });
        const snapshot = base.calculate(input, context) as CanonicalSajuSnapshot;
        observedSnapshot = snapshot;
        return snapshot;
      },
    });

    const result = await host.requestReading({
      birth: { calendarType: 'solar', date: '2024-03-10', time: null },
      reading: { text: '사업운 재물운' },
    });

    expect(observedSnapshot?.snapshotId).toBeTruthy();
    expect(observedSnapshot?.input.time).toEqual({ known: false });
    expect(result.state).toBe('clarification_required');
  });

  it('runs birth input through calculation, interpretation injection, requestProductReading, and transport response', async () => {
    const adapter = new TestNarrativeAdapter();
    const host = createMyeonghwaProductHost(dependencies((snapshot) => [parentsClaim(snapshot)], adapter));

    const result = await host.requestReading(validBody);

    expect(result.state).toBe('delivered');
    expect(result.reading?.calculationSummary.pillars.day.value).toBeTruthy();
    expect(adapter.calls).toHaveLength(1);
    expect(result).not.toHaveProperty('artifact');
    expect(JSON.stringify(result)).not.toContain('claim-product-host-family-parents');
  });


  it('constructs and delivers an Official-capable host without Legacy Narrative runtime dependencies', async () => {
    const adapter = new TestNarrativeAdapter();
    const base = dependencies((snapshot) => [wealthOfficialClaim(snapshot)], adapter);
    const officialOnlyDependencies = { ...base };
    delete officialOnlyDependencies.legacyNarrativeRuntime;
    const host = createMyeonghwaProductHost(officialOnlyDependencies);

    const result = await host.requestReading({
      ...validBody,
      reading: { text: '재물운' },
    });

    expect(result.state).toBe('delivered');
    expect(result.reading).toBeDefined();
    expect(adapter.calls).toHaveLength(0);
  });

  it('keeps internal detail fallback metadata out of the product response', async () => {
    const adapter = new TestNarrativeAdapter();
    const base = dependencies((snapshot) => [wealthOfficialClaim(snapshot)], adapter);
    const officialOnlyDependencies = { ...base };
    delete officialOnlyDependencies.legacyNarrativeRuntime;
    const host = createMyeonghwaProductHost(officialOnlyDependencies);

    for (const preferredDetail of ['concise', 'detailed'] as const) {
      const result = await host.requestReading({
        ...validBody,
        reading: {
          text: '재물운',
          outputPreferences: { preferredDetail },
        },
      });
      const serialized = JSON.stringify(result);
      expect(result.state).toBe('delivered');
      expect(serialized).not.toContain(
        'myeonghwa-official-reading-detail-presentation-policy-v1',
      );
      expect(serialized).not.toContain('fallback_to_standard');
      expect(serialized).not.toContain('missing_text_role_authority');
      expect(serialized).not.toContain('missing_approved_concise_material');
      expect(serialized).not.toContain('missing_expansion_material');
      expect(serialized).not.toContain(
        'myeonghwa-official-reading-approved-concise-registry-v2',
      );
      expect(serialized).not.toContain(
        'myeonghwa-official-reading-concise-presentation-readiness-v1',
      );
    }
    expect(adapter.calls).toHaveLength(0);
  });

  it('fails closed instead of falling back to Official Reading when a Legacy request has no runtime', async () => {
    const adapter = new TestNarrativeAdapter();
    const base = dependencies((snapshot) => [parentsClaim(snapshot)], adapter);
    const legacyWithoutRuntime = { ...base };
    delete legacyWithoutRuntime.legacyNarrativeRuntime;
    const host = createMyeonghwaProductHost(legacyWithoutRuntime);

    const result = await host.requestReading(validBody);

    expect(result.state).toBe('temporarily_unavailable');
    expect(result.reading).toBeUndefined();
    expect(adapter.calls).toHaveLength(0);
  });

  it('serves the static product page with a restrictive script policy', async () => {
    const server = await listen(dependencies());
    try {
      const response = await fetch(`${server.baseUrl}/`);
      const html = await response.text();
      expect(response.status).toBe(200);
      expect(response.headers.get('content-security-policy')).toContain("script-src 'self'");
      expect(html).toContain('명화');
      expect(html).toContain('id="reading-form"');
      expect(html).toContain('src="/app.js"');
      expect(html).not.toContain('research');
    } finally {
      await server.close();
    }
  });

  it('accepts POST /api/readings and returns only the consumer transport response', async () => {
    const server = await listen(dependencies((snapshot) => [parentsClaim(snapshot)]));
    try {
      const response = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(validBody),
      });
      const payload = (await response.json()) as Record<string, unknown>;
      expect(response.status).toBe(200);
      expect(payload.state).toBe('delivered');
      expect(payload).not.toHaveProperty('artifact');
      expect(JSON.stringify(payload)).not.toContain('claim-product-host-family-parents');

      const detailedResponse = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...validBody,
          reading: {
            text: '부모운',
            outputPreferences: { preferredDetail: 'standard' },
          },
        }),
      });
      expect(detailedResponse.status).toBe(200);
      expect((await detailedResponse.json()) as Record<string, unknown>).toMatchObject({
        state: 'delivered',
      });
    } finally {
      await server.close();
    }
  });

  it('rejects malformed JSON and unsupported media types before invoking the engine', async () => {
    const server = await listen(dependencies());
    try {
      const malformed = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{broken',
      });
      expect(malformed.status).toBe(400);
      expect(await malformed.json()).toEqual({
        error: { code: 'HOST_INVALID_JSON', message: 'Request body must contain valid JSON.' },
      });

      const wrongType = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: '{}',
      });
      expect(wrongType.status).toBe(415);
    } finally {
      await server.close();
    }
  });

  it('enforces request size and route/method boundaries', async () => {
    const server = await listen(dependencies(), { maxRequestBytes: 64 });
    try {
      const oversized = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(validBody),
      });
      expect(oversized.status).toBe(413);

      const wrongMethod = await fetch(`${server.baseUrl}/api/readings`);
      expect(wrongMethod.status).toBe(405);
      expect(wrongMethod.headers.get('allow')).toBe('POST');

      const missing = await fetch(`${server.baseUrl}/missing`);
      expect(missing.status).toBe(404);
    } finally {
      await server.close();
    }
  });

  it('does not expose operational exception text as Saju meaning or HTTP error detail', async () => {
    const secret = 'registry-secret-internal-failure';
    const base = dependencies();
    const server = await listen({
      ...base,
      interpret() {
        throw new Error(secret);
      },
    });
    try {
      const response = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(validBody),
      });
      const body = JSON.stringify(await response.json());
      expect(response.status).toBe(500);
      expect(body).toContain('HOST_READING_EXECUTION_FAILED');
      expect(body).not.toContain(secret);
      expect(body).not.toContain('fortune');
    } finally {
      await server.close();
    }
  });

  it('rejects invalid birth and reading payloads before calculation', async () => {
    let calculationCalls = 0;
    const base = dependencies();
    const host = createMyeonghwaProductHost({
      ...base,
      calculate(input, context) {
        calculationCalls += 1;
        return base.calculate(input, context);
      },
    });

    await expect(
      host.requestReading({
        birth: { calendarType: 'solar', date: '2024-02-31', time: '12:00' },
        reading: { text: '부모운' },
      }),
    ).rejects.toMatchObject({ code: 'INVALID_BIRTH_INPUT' });
    await expect(
      host.requestReading({
        birth: { calendarType: 'solar', date: '2024-03-10', time: '12:00' },
        reading: { text: '' },
      }),
    ).rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
    await expect(
      host.requestReading({
        birth: { calendarType: 'solar', date: '2024-03-10', time: '12:00' },
        reading: {
          text: '부모운',
          outputPreferences: { preferredDetail: 'invalid' },
        },
      }),
    ).rejects.toMatchObject({ code: 'INVALID_READING_REQUEST' });
    expect(calculationCalls).toBe(0);
  });

  it('exposes only the curated host runtime surface from the product-host subpath', () => {
    expect(Object.keys(productHostPublic).sort()).toEqual([
      'PRODUCT_HOST_VERSION',
      'createMyeonghwaProductHost',
      'createMyeonghwaProductHostServer',
    ]);
    expect(productHostPublic).not.toHaveProperty('calculateCanonicalSajuSnapshot');
    expect(productHostPublic).not.toHaveProperty('runInterpretation');
    expect(productHostPublic).not.toHaveProperty('requestProductReading');
  });

  it('registers the product-host package subpath without changing the frozen product-reading entrypoint', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, { types: string; default: string }>;
    };
    expect(packageJson.exports['./product-host']).toEqual({
      types: './dist/product-host.d.ts',
      default: './dist/product-host.js',
    });
    expect(packageJson.exports['./product-reading']).toEqual({
      types: './dist/product-reading.d.ts',
      default: './dist/product-reading.js',
    });
  });
});
