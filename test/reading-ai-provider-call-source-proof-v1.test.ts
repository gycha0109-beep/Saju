import { describe, expect, it } from 'vitest';
import {
  createSajuSourceProviderCallCorrelationV1,
  type SajuSourceProviderCallLinkV1,
} from '../src/production/reading-ai-source-call-correlation-v1.js';
import { issueSajuProviderCallSourceProofV1 } from '../src/production/reading-ai-provider-call-source-proof-v1.js';

const KEY = Uint8Array.from(Buffer.from('a'.repeat(64), 'hex'));
const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const CALL = '123e4567-e89b-42d3-a456-426614174003';
const SOURCE = '123e4567-e89b-42d3-a456-426614174004';
const AT = '2026-11-09T08:00:00.000Z';
const ISSUED = Date.parse(AT) + 1000;

const link = {
  version: 'saju-source-provider-call-link-v1' as const,
  externalRequestRef: 'saju_source_' + SOURCE,
  executionAttemptId: ATTEMPT,
  observation: {
    callId: CALL,
    requestId: 'host_private',
    providerKey: 'openai' as const,
    modelKey: 'gpt-5.6',
    source: 'provider_response_usage' as const,
    outcome: 'response_received' as const,
    observedAt: AT,
    usage: { inputTokens: 120, outputTokens: 35, cachedInputTokens: 20, reasoningTokens: 10 },
  },
};

function sign(value: SajuSourceProviderCallLinkV1 = link) {
  return issueSajuProviderCallSourceProofV1({
    link: value,
    issuer: 'saju.private',
    audience: 'myeongha.admin',
    keyId: 'a4.key.1',
    keyBytes: KEY,
    issuedAtMs: ISSUED,
  });
}

describe('A4 Saju-only provider source proof issuing', () => {
  it('signs the exact provider call observed in the correct source scoped attempt', async () => {
    const proofs: ReturnType<typeof sign>[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE,
      emit: (item) => {
        proofs.push(sign(item));
      },
    });
    await source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT }, async (ref) => {
      expect(ref).toBe('saju_source_' + SOURCE);
      await source.onProviderCall(link.observation);
    });
    expect(proofs).toHaveLength(1);
    expect(proofs[0]?.payload).toEqual({
      version: 'saju-provider-call-source-proof-v1',
      issuer: 'saju.private',
      audience: 'myeongha.admin',
      keyId: 'a4.key.1',
      issuedAtMs: ISSUED,
      link,
    });
    expect(proofs[0]?.signatureHex).toMatch(/^[0-9a-f]{64}$/u);
    expect(JSON.stringify(proofs[0])).not.toContain('birth');
    expect(JSON.stringify(proofs[0])).not.toContain('secret');
  });

  it('produces deterministic HMAC for a fixed source-issued receipt', () => {
    expect(sign()).toEqual(sign());
    expect(sign().signatureHex).not.toEqual(
      issueSajuProviderCallSourceProofV1({
        link: { ...link, executionAttemptId: '123e4567-e89b-42d3-a456-426614174999' },
        issuer: 'saju.private',
        audience: 'myeongha.admin',
        keyId: 'a4.key.1',
        keyBytes: KEY,
        issuedAtMs: ISSUED,
      }).signatureHex,
    );
  });

  it('refuses unscoped invalid identifiers, invalid usage, future observation, weak key', () => {
    expect(() => sign({ ...link, executionAttemptId: 'caller-id' })).toThrow();
    expect(() =>
      sign({
        ...link,
        observation: {
          ...link.observation,
          usage: { ...link.observation.usage, inputTokens: -1 },
        },
      }),
    ).toThrow();
    expect(() =>
      sign({
        ...link,
        observation: {
          ...link.observation,
          observedAt: '2026-11-10T08:00:00.000Z',
        },
      }),
    ).toThrow();
    expect(() =>
      issueSajuProviderCallSourceProofV1({
        link,
        issuer: 'saju.private',
        audience: 'myeongha.admin',
        keyId: 'a4.key.1',
        keyBytes: new Uint8Array(8),
        issuedAtMs: ISSUED,
      }),
    ).toThrow();
  });
});
