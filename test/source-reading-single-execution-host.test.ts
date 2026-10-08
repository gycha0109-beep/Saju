import { describe, expect, it, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { createMyeonghwaProductHost, createMyeonghwaSourceReadingProofHost } from '../src/host/product-host.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-single-execution-host-test',
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

const body = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  },
  reading: { text: '사주' },
};

function fixture(registryWithEvidence = true) {
  const calculate = vi.fn((input: Parameters<typeof calculateCanonicalSajuSnapshot>[0]) =>
    calculateCanonicalSajuSnapshot(input, policy, {
      now: new Date('2026-08-24T00:00:00.000Z'),
    }),
  );
  const interpret = vi.fn((snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>) => {
    const registry = registryWithEvidence
      ? createGeneralNatalUsefulReadingCandidateRegistry('2026-08-24T00:04:00.000Z')
      : createI7SeasonalSupportRegistry();
    return {
      registry,
      interpretation: runInterpretation(snapshot, registry, {
        requestId: 'source-single-execution-fixture-interpretation',
        now: new Date('2026-08-24T00:05:00.000Z'),
      }),
    };
  });
  const requestIdFactory = vi.fn(() => 'source-single-execution');
  const dependencies = {
    calculate,
    interpret,
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'source-single-execution-test-v1',
      narrativeNow: new Date('2026-08-24T00:06:00.000Z'),
      artifactGeneratedAt: new Date('2026-08-24T00:07:00.000Z'),
    },
    requestIdFactory,
    requestNowFactory: () => new Date('2026-08-24T00:06:00.000Z'),
  };
  return { dependencies, calculate, interpret, requestIdFactory };
}

describe('2B-3C-1 single Saju product execution and source readiness', () => {
  it('binds response, execution, profile, evidence and reading to the same single host run', async () => {
    const { dependencies, calculate, interpret, requestIdFactory } = fixture();
    const host = createMyeonghwaSourceReadingProofHost(dependencies);
    const { response, readiness } = await host.requestReadingWithProofReadiness(body);

    expect(calculate).toHaveBeenCalledTimes(1);
    expect(interpret).toHaveBeenCalledTimes(1);
    expect(requestIdFactory).toHaveBeenCalledTimes(1);
    expect(response.state).toBe('delivered');
    expect(readiness.state).toBe('held');
    expect(readiness.reason).toBe('source_attestation_not_implemented');
    expect(readiness.material).toMatchObject({
      responseId: response.responseId,
      readingId: response.reading?.readingId,
      responseBodyHash: deterministicContentHash(response),
    });
    expect(readiness.material?.executionId).toMatch(/^reading_execution_/u);
    expect(readiness.material?.preparationId).toMatch(/^reading_preparation_/u);
    expect(readiness.material?.selectionId).toBeTruthy();
    expect(readiness.material?.evidenceBundleHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(readiness.material?.profileRef.contentHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(readiness).toMatchObject({
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      canExecute: false,
      canPublish: false,
      canSell: false,
      requestBinding: 'NOT_ATTESTED',
      proofAuthenticity: 'NOT_ATTESTED',
    });
    expect(response).not.toHaveProperty('material');
    expect(response).not.toHaveProperty('execution');
    expect(response).not.toHaveProperty('readiness');
  });

  it('keeps the existing public facade response-only without exposing proof material', async () => {
    const { dependencies, calculate, interpret } = fixture();
    const publicHost = createMyeonghwaProductHost(dependencies);
    expect(Object.keys(publicHost)).toEqual(['requestReading']);
    const response = await publicHost.requestReading(body);
    expect(calculate).toHaveBeenCalledTimes(1);
    expect(interpret).toHaveBeenCalledTimes(1);
    expect(response.state).toBe('delivered');
    expect(response).not.toHaveProperty('execution');
    expect(response).not.toHaveProperty('delivery');
    expect(response).not.toHaveProperty('readiness');
    expect(response.reading).not.toHaveProperty('provenance');
  });

  it('keeps unavailable claim evidence blocked, never fabricates source proof or release', async () => {
    const { dependencies, calculate, interpret } = fixture(false);
    const result = await createMyeonghwaSourceReadingProofHost(
      dependencies,
    ).requestReadingWithProofReadiness(body);
    expect(calculate).toHaveBeenCalledTimes(1);
    expect(interpret).toHaveBeenCalledTimes(1);
    expect(result.readiness.state).toBe('blocked');
    expect(result.readiness).not.toHaveProperty('material');
    expect(result.readiness.canExecute).toBe(false);
    expect(result.readiness.canPublish).toBe(false);
    expect(result.readiness.canSell).toBe(false);
  });

  it('does not relabel an operational interpretation failure as missing evidence', async () => {
    const { dependencies } = fixture();
    const host = createMyeonghwaSourceReadingProofHost({
      ...dependencies,
      interpret: () => { throw new Error('runtime-unavailable'); },
    });
    await expect(host.requestReadingWithProofReadiness(body)).rejects.toThrow('runtime-unavailable');
  });
});
