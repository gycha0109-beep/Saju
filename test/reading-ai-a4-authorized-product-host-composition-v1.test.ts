import { describe, expect, it, vi } from 'vitest';
import { createI14StrengthEvidenceRegistry } from '../src/research/i14-strength-evidence-registry.js';
import { ProductionCompositionBlockedError } from '../src/production/production-composition.js';
import { createUnstartedSajuA4CapturedProductionHostV1 } from '../src/production/reading-ai-a4-authorized-product-host-composition-v1.js';

const reader = () => ({
  async connect() {
    throw new Error('A4 must never connect a DB with blocked authority');
  },
});
const modelCalls = vi.fn(async () => {
  throw new Error('A4 must never call OpenAI with blocked authority');
});

function candidate() {
  return {
    production: {},
    narrativePolicy: {} as never,
    openAI: { apiKey: 'offline-do-not-call' },
    host: { serviceBearer: 'private-production-host-only' },
    a4: {
      claimPool: reader(),
      sourceReceiptPool: reader(),
      myeonghaPrivateOrigin: 'https://myeongha-private.example.test',
      myeonghaServiceBearer: 'separate-private-proof-service-bearer',
      trustedMyeonghaIssuer: 'myeongha-production',
      myeonghaProofAudience: 'saju-production-a4',
      trustedMyeonghaKeyId: 'mh-a4-prepared-v1',
      myeonghaSigningKey: new Uint8Array(32).fill(31),
      sourceIssuer: 'saju-production',
      sourceAudience: 'myeongha-admin-a4',
      sourceKeyId: 'saju-private-provider-1',
      sourceSigningKey: new Uint8Array(32).fill(93),
      nowMs: () => Date.parse('2026-11-11T01:00:00.000Z'),
    },
  };
}

describe('A4 private capture cannot bypass independent Production interpretation authority', () => {
  it('never constructs a production host when official interpretation authority is missing', () => {
    expect(() => createUnstartedSajuA4CapturedProductionHostV1(candidate())).toThrow(
      ProductionCompositionBlockedError,
    );
    expect(modelCalls).not.toHaveBeenCalled();
  });

  it('cannot promote a research registry into Production through A4 cost metadata', () => {
    const input = candidate();
    expect(() =>
      createUnstartedSajuA4CapturedProductionHostV1({
        ...input,
        production: { registry: createI14StrengthEvidenceRegistry() },
      }),
    ).toThrow(ProductionCompositionBlockedError);
    expect(modelCalls).not.toHaveBeenCalled();
  });

  it('cannot substitute a separate narrative runtime or observer', () => {
    const input = candidate();
    for (const request of [
      { ...input, production: { legacyNarrativeRuntime: {} as never } },
      { ...input, openAI: { ...input.openAI, onProviderCall: () => undefined } },
      { ...input, openAI: { ...input.openAI, onBeforeProviderRequest: () => undefined } },
      { ...input, openAI: { ...input.openAI, fetchImpl: modelCalls as never } },
      {
        ...input,
        openAI: { ...input.openAI, endpoint: 'https://alternate.example.test/v1/responses' },
      },
      { ...input, host: { ...input.host, a4SourceCapture: {} } },
      { ...input, a4: { ...input.a4, sourceRefFactory: () => 'client-controlled' } },
      { ...input, a4: { ...input.a4, fetchImpl: modelCalls } },
    ]) {
      expect(() =>
        createUnstartedSajuA4CapturedProductionHostV1(
          request as Parameters<typeof createUnstartedSajuA4CapturedProductionHostV1>[0],
        ),
      ).toThrow('A4 production capture cannot override');
    }
  });

  it('does not mount a socket or perform an A4 provider call during authority preflight', () => {
    expect(() => createUnstartedSajuA4CapturedProductionHostV1(candidate())).toThrow();
    expect(modelCalls).not.toHaveBeenCalled();
  });
});
