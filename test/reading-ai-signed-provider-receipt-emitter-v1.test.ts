import { describe, expect, it } from 'vitest';
import {
  createSajuSignedProviderReceiptEmitterV1,
  type SajuImmutableProviderReceiptStoreV1,
} from '../src/production/reading-ai-signed-provider-receipt-emitter-v1.js';
import { createSajuSourceProviderCallCorrelationV1 } from '../src/production/reading-ai-source-call-correlation-v1.js';
import type { SajuSourceProviderCallLinkV1 } from '../src/production/reading-ai-source-call-correlation-v1.js';
import type { SajuSignedProviderCallSourceProofV1 } from '../src/production/reading-ai-provider-call-source-proof-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = '123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174003';
const KEY = new Uint8Array(32).fill(47);
const ISSUED = Date.parse('2026-11-09T10:00:01.000Z');
const observation = {
  callId: CALL,
  requestId: 'saju_server_private_7',
  providerKey: 'openai' as const,
  modelKey: 'gpt-5.6',
  source: 'provider_response_usage' as const,
  outcome: 'response_received' as const,
  observedAt: '2026-11-09T10:00:00.000Z',
  usage: { inputTokens: 25, outputTokens: 5, cachedInputTokens: null, reasoningTokens: null },
};
const link: SajuSourceProviderCallLinkV1 = {
  version: 'saju-source-provider-call-link-v1',
  executionAttemptId: ATTEMPT,
  externalRequestRef: 'saju_source_' + REF,
  observation,
};

function fixture() {
  const rows = new Map<string, SajuSignedProviderCallSourceProofV1>();
  let nextTime = ISSUED;
  const store: SajuImmutableProviderReceiptStoreV1 = {
    async appendOnceAndRead({ callId, proof }) {
      if (!rows.has(callId)) rows.set(callId, structuredClone(proof));
      return structuredClone(rows.get(callId)!);
    },
  };
  const config = {
    issuer: 'saju-production',
    audience: 'myeongha-admin-a4',
    keyId: 'saju-source-key-1',
    keyBytes: KEY,
    store,
    nowMs: () => nextTime++,
  };
  return { rows, config, store };
}

describe('A4 signed source receipt immutable append seam', () => {
  it('acknowledges only the exact committed signed provider-call event', async () => {
    const { rows, config } = fixture();
    const emitter = createSajuSignedProviderReceiptEmitterV1(config);
    await emitter.emit(link);
    expect(rows.size).toBe(1);
    const stored = rows.get(CALL)!;
    expect(stored.payload.link).toEqual(link);
    expect(stored.payload.issuedAtMs).toBe(ISSUED);
    expect(stored.signatureHex).toMatch(/^[a-f0-9]{64}$/u);
    expect(JSON.stringify(stored)).not.toContain('Bearer');
    expect(JSON.stringify(stored)).not.toContain('birth');
    await emitter.emit(link);
    expect(rows.size).toBe(1);
    expect(rows.get(CALL)).toEqual(stored);
  });

  it('rejects conflicting usage on the same callId rather than claiming idempotence', async () => {
    const { rows, config } = fixture();
    const emitter = createSajuSignedProviderReceiptEmitterV1(config);
    await emitter.emit(link);
    await expect(
      emitter.emit({
        ...link,
        observation: { ...observation, usage: { ...observation.usage, inputTokens: 250 } },
      }),
    ).rejects.toThrow('not immutably acknowledged');
    expect(rows.size).toBe(1);
  });

  it('rejects a changed attempt or source ref on a replay', async () => {
    const { config } = fixture();
    const emitter = createSajuSignedProviderReceiptEmitterV1(config);
    await emitter.emit(link);
    await expect(
      emitter.emit({
        ...link,
        executionAttemptId: '123e4567-e89b-42d3-a456-426614174099',
      }),
    ).rejects.toThrow('not immutably acknowledged');
    await expect(
      emitter.emit({
        ...link,
        externalRequestRef: 'saju_source_123e4567-e89b-42d3-a456-426614174088',
      }),
    ).rejects.toThrow('not immutably acknowledged');
  });

  it('rejects tampered signed rows and missing readback', async () => {
    const { rows, config } = fixture();
    const emitter = createSajuSignedProviderReceiptEmitterV1(config);
    await emitter.emit(link);
    const stored = rows.get(CALL)!;
    rows.set(CALL, { ...stored, signatureHex: '0'.repeat(64) });
    await expect(emitter.emit(link)).rejects.toThrow('not immutably acknowledged');
    const unavailable = createSajuSignedProviderReceiptEmitterV1({
      ...config,
      store: { appendOnceAndRead: async () => null },
    });
    await expect(unavailable.emit(link)).rejects.toThrow('not immutably acknowledged');
  });

  it('propagates failed persistence without acknowledging a receipt', async () => {
    const { config } = fixture();
    const unavailable = createSajuSignedProviderReceiptEmitterV1({
      ...config,
      store: {
        appendOnceAndRead: async () => {
          throw Error('durable receipt storage failed');
        },
      },
    });
    await expect(unavailable.emit(link)).rejects.toThrow('durable receipt storage failed');
    expect(() =>
      createSajuSignedProviderReceiptEmitterV1({
        ...config,
        keyBytes: new Uint8Array(5),
      }),
    ).toThrow('Authenticated immutable source receipt store');
  });

  it('accepts callback observations only inside the preadmitted attempt scope', async () => {
    const { rows, config } = fixture();
    const emitter = createSajuSignedProviderReceiptEmitterV1(config);
    const correlation = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: emitter.emit,
    });
    await correlation.onProviderCall(observation);
    expect(rows.size).toBe(0);
    const ref = await correlation.withAuthorizedReadingAttempt(
      { executionAttemptId: ATTEMPT },
      async (externalRequestRef) => {
        await correlation.onProviderCall(observation);
        return externalRequestRef;
      },
    );
    expect(ref).toBe(link.externalRequestRef);
    expect(rows.get(CALL)?.payload.link).toEqual(link);
  });
});
