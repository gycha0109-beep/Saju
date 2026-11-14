import { createHmac } from 'node:crypto';
import type { SajuSourceProviderCallLinkV1 } from './reading-ai-source-call-correlation-v1.js';

export const SAJU_PROVIDER_CALL_SOURCE_PROOF_VERSION_V1 =
  'saju-provider-call-source-proof-v1' as const;
const DOMAIN = 'myeongha/a4/saju-provider-call-proof/v1\0';
const IDENT = /^[a-zA-Z0-9._:-]{3,128}$/u;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const OUTCOMES = new Set([
  'response_received',
  'http_failure',
  'network_failure',
  'timeout',
  'invalid_response',
]);
const COUNTERS = ['inputTokens', 'outputTokens', 'cachedInputTokens', 'reasoningTokens'] as const;

export interface SajuSignedProviderCallSourceProofV1 {
  readonly payload: Readonly<{
    version: typeof SAJU_PROVIDER_CALL_SOURCE_PROOF_VERSION_V1;
    issuer: string;
    audience: string;
    keyId: string;
    issuedAtMs: number;
    link: SajuSourceProviderCallLinkV1;
  }>;
  readonly signatureHex: string;
}

function canonicalize(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(canonicalize);
  if (v === null || typeof v !== 'object') return v;
  const object = v as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(object)
      .sort()
      .map((key) => [key, canonicalize(object[key])]),
  );
}

function validLink(link: SajuSourceProviderCallLinkV1, issuedAtMs: number): boolean {
  const o = link?.observation;
  const u = o?.usage;
  if (
    link?.version !== 'saju-source-provider-call-link-v1' ||
    !/^saju_source_[0-9a-f-]{36}$/u.test(link.externalRequestRef) ||
    !UUID.test(link.externalRequestRef.slice('saju_source_'.length)) ||
    !UUID.test(link.executionAttemptId) ||
    !o ||
    !UUID.test(o.callId) ||
    !o.requestId ||
    o.requestId.length > 256 ||
    !o.modelKey ||
    o.modelKey.length > 128 ||
    o.providerKey !== 'openai' ||
    !OUTCOMES.has(o.outcome) ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(o.observedAt) ||
    !Number.isFinite(Date.parse(o.observedAt)) ||
    issuedAtMs < Date.parse(o.observedAt) - 15_000 ||
    !u ||
    COUNTERS.some((k) => u[k] !== null && (!Number.isSafeInteger(u[k]) || Number(u[k]) < 0))
  )
    return false;
  if (o.source === 'provider_attempt_without_usage') {
    return COUNTERS.every((k) => u[k] === null);
  }
  return (
    o.source === 'provider_response_usage' &&
    o.outcome === 'response_received' &&
    u.inputTokens !== null &&
    u.outputTokens !== null &&
    (u.cachedInputTokens === null || u.cachedInputTokens <= u.inputTokens) &&
    (u.reasoningTokens === null || u.reasoningTokens <= u.outputTokens)
  );
}

/**
 * Sign only real, source-owned callback events after preadmitted DB attempt
 * scoping. This is NOT a source proof of Product Reading publication/issuance
 * and is not wired into a runtime or receipt store by itself.
 *
 * The caller must atomically preserve signed proofs in Saju-owned immutable
 * storage and separately deliver them to MyeongHa's source proof verifier.
 */
export function issueSajuProviderCallSourceProofV1(
  input: Readonly<{
    link: SajuSourceProviderCallLinkV1;
    issuer: string;
    audience: string;
    keyId: string;
    keyBytes: Uint8Array;
    issuedAtMs: number;
  }>,
): SajuSignedProviderCallSourceProofV1 {
  if (
    !IDENT.test(input.issuer) ||
    !IDENT.test(input.audience) ||
    !IDENT.test(input.keyId) ||
    !(input.keyBytes instanceof Uint8Array) ||
    input.keyBytes.byteLength < 32 ||
    !Number.isSafeInteger(input.issuedAtMs) ||
    input.issuedAtMs < 0 ||
    !validLink(input.link, input.issuedAtMs)
  ) {
    throw new TypeError('Source-owned verified provider observation required');
  }
  const link: SajuSourceProviderCallLinkV1 = Object.freeze({
    version: 'saju-source-provider-call-link-v1',
    externalRequestRef: input.link.externalRequestRef,
    executionAttemptId: input.link.executionAttemptId.toLowerCase(),
    observation: Object.freeze({
      ...input.link.observation,
      usage: Object.freeze({ ...input.link.observation.usage }),
    }),
  });
  const payload = Object.freeze({
    version: SAJU_PROVIDER_CALL_SOURCE_PROOF_VERSION_V1,
    issuer: input.issuer,
    audience: input.audience,
    keyId: input.keyId,
    issuedAtMs: input.issuedAtMs,
    link,
  });
  return Object.freeze({
    payload,
    signatureHex: createHmac('sha256', input.keyBytes)
      .update(DOMAIN)
      .update(JSON.stringify(canonicalize(payload)))
      .digest('hex'),
  });
}
