import { timingSafeEqual } from 'node:crypto';
import {
  issueSajuProviderCallSourceProofV1,
  type SajuSignedProviderCallSourceProofV1,
} from './reading-ai-provider-call-source-proof-v1.js';
import type { SajuSourceProviderCallLinkV1 } from './reading-ai-source-call-correlation-v1.js';

export interface SajuImmutableProviderReceiptStoreV1 {
  appendOnceAndRead(
    input: Readonly<{
      callId: string;
      proof: SajuSignedProviderCallSourceProofV1;
    }>,
  ): Promise<SajuSignedProviderCallSourceProofV1 | null>;
}

export interface SajuSignedProviderReceiptEmitterConfigV1 {
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly keyBytes: Uint8Array;
  readonly store: SajuImmutableProviderReceiptStoreV1;
  readonly nowMs?: () => number;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value !== null && typeof value === 'object') {
    const object = value as Record<string, unknown>;
    return (
      '{' +
      Object.keys(object)
        .sort()
        .map((key) => JSON.stringify(key) + ':' + canonical(object[key]))
        .join(',') +
      '}'
    );
  }
  return JSON.stringify(value);
}

function matchesStoredReceipt(
  stored: SajuSignedProviderCallSourceProofV1 | null,
  originalLink: SajuSourceProviderCallLinkV1,
  config: SajuSignedProviderReceiptEmitterConfigV1,
  keyBytes: Uint8Array,
): boolean {
  if (
    !stored ||
    !stored.payload ||
    !Number.isSafeInteger(stored.payload.issuedAtMs) ||
    typeof stored.signatureHex !== 'string' ||
    !/^[a-f0-9]{64}$/u.test(stored.signatureHex)
  )
    return false;

  let expected: SajuSignedProviderCallSourceProofV1;
  try {
    expected = issueSajuProviderCallSourceProofV1({
      link: originalLink,
      issuer: config.issuer,
      audience: config.audience,
      keyId: config.keyId,
      keyBytes,
      issuedAtMs: stored.payload.issuedAtMs,
    });
  } catch {
    return false;
  }
  return (
    canonical(stored.payload) === canonical(expected.payload) &&
    timingSafeEqual(
      Buffer.from(stored.signatureHex, 'hex'),
      Buffer.from(expected.signatureHex, 'hex'),
    )
  );
}

/**
 * Server-only signing and immutable append seam. The supplied store MUST
 * atomically insert by unique callId if absent, never update existing evidence,
 * and return the committed row (including on replay). No receipt is acknowledged
 * unless that row's exact signed observation is independently reverified.
 * A process-local map, browser input or an uncommitted write is NOT a store.
 */
export function createSajuSignedProviderReceiptEmitterV1(
  config: SajuSignedProviderReceiptEmitterConfigV1,
): Readonly<{ emit(link: SajuSourceProviderCallLinkV1): Promise<void> }> {
  if (
    !config ||
    typeof config.store?.appendOnceAndRead !== 'function' ||
    !(config.keyBytes instanceof Uint8Array) ||
    config.keyBytes.length < 32
  )
    throw new TypeError('Authenticated immutable source receipt store and signing key required');

  const signingKey = Uint8Array.from(config.keyBytes);
  return Object.freeze({
    async emit(link: SajuSourceProviderCallLinkV1): Promise<void> {
      const proof = issueSajuProviderCallSourceProofV1({
        link,
        issuer: config.issuer,
        audience: config.audience,
        keyId: config.keyId,
        keyBytes: signingKey,
        issuedAtMs: (config.nowMs ?? Date.now)(),
      });
      const stored = await config.store.appendOnceAndRead({
        callId: proof.payload.link.observation.callId,
        proof,
      });
      if (!matchesStoredReceipt(stored, link, config, signingKey))
        throw new Error('Saju source signed receipt was not immutably acknowledged');
    },
  });
}
