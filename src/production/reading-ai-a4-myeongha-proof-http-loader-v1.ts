/**
 * Server-to-server fetch port for the existing A4 signed attempt gate.
 * The returned proof remains untrusted until the Saju HMAC + source-owned
 * PostgreSQL single-use claim validates it. This module never issues a grant.
 */
export const SAJU_A4_PRIVATE_PROOF_ROUTE_V1 = '/api/internal/a4/prepared-attempts' as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const HEX64 = /^[0-9a-f]{64}$/u;
const MAX_BYTES = 4096;
const MAX_TIMEOUT_MS = 10000;

export interface SajuA4PreparedProofHttpFetchV1 {
  (input: string, init: RequestInit): Promise<Response>;
}
export interface SajuA4MyeongHaProofLoaderV1 {
  loadSignedProof(attemptId: string): Promise<unknown | null>;
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}
function exact(value: Record<string, unknown> | null, keys: readonly string[]): boolean {
  return (
    value !== null &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}
function validProofShape(raw: unknown, attemptId: string): boolean {
  const proof = record(raw);
  const payload = record(proof?.payload);
  return (
    exact(proof, ['payload', 'signatureHex']) &&
    exact(payload, [
      'version',
      'issuer',
      'audience',
      'keyId',
      'issuedAtMs',
      'expiresAtMs',
      'executionAttemptId',
      'readingId',
      'subjectId',
    ]) &&
    proof!.signatureHex !== null &&
    typeof proof!.signatureHex === 'string' &&
    HEX64.test(proof!.signatureHex) &&
    payload!.version === 'myeongha-a4-prepared-attempt-proof-v1' &&
    payload!.executionAttemptId === attemptId
  );
}

/**
 * Transport auth is an independent dedicated Bearer, not the signing key.
 * Only an exact configured HTTPS origin/path is contacted: no redirects,
 * cookies, cache, browser-provided origins or arbitrary URLs. Failure is
 * not turned into "no cost" or "admitted"; it propagates fail-closed.
 */
export function createSajuA4MyeongHaProofHttpLoaderV1(
  input: Readonly<{
    origin: string;
    bearerToken: string;
    fetchImpl?: SajuA4PreparedProofHttpFetchV1;
    timeoutMs?: number;
  }>,
): SajuA4MyeongHaProofLoaderV1 {
  let url: URL;
  try {
    url = new URL(input?.origin);
  } catch {
    throw new TypeError('Private MyeongHa A4 proof origin must be HTTPS');
  }
  if (
    url.protocol !== 'https:' ||
    url.origin !== input.origin ||
    url.pathname !== '/' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    typeof input.bearerToken !== 'string' ||
    input.bearerToken.length < 24 ||
    input.bearerToken.length > 1024 ||
    /\s/u.test(input.bearerToken)
  ) {
    throw new TypeError('Dedicated HTTPS MyeongHa A4 proof origin and Bearer required');
  }
  const timeoutMs = input.timeoutMs ?? 5000;
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMEOUT_MS)
    throw new TypeError('Invalid A4 proof fetch deadline');
  const fetchImpl = input.fetchImpl ?? fetch;
  return Object.freeze({
    async loadSignedProof(attemptId: string): Promise<unknown | null> {
      if (typeof attemptId !== 'string' || !UUID.test(attemptId)) return null;
      const target =
        url.origin +
        SAJU_A4_PRIVATE_PROOF_ROUTE_V1 +
        '/' +
        encodeURIComponent(attemptId) +
        '/proof';
      const response = await fetchImpl(target, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + input.bearerToken,
          accept: 'application/json',
        },
        cache: 'no-store',
        credentials: 'omit',
        redirect: 'error',
        signal: AbortSignal.timeout(timeoutMs),
      });
      try {
        if (response.status === 404) return null;
        if (response.status !== 200) throw new Error('MyeongHa A4 proof service unavailable');
        if (
          response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !==
          'application/json'
        )
          throw new Error('Invalid MyeongHa A4 proof media type');
        const declared = response.headers.get('content-length');
        if (
          declared !== null &&
          (!/^(0|[1-9]\d*)$/u.test(declared) || Number(declared) > MAX_BYTES)
        )
          throw new Error('Oversized MyeongHa A4 signed proof response');
        if (!response.body) throw new Error('Empty MyeongHa A4 proof response');
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let bytes = 0;
        try {
          while (true) {
            const part = await reader.read();
            if (part.done) break;
            bytes += part.value.byteLength;
            if (bytes > MAX_BYTES) throw new Error('Oversized MyeongHa A4 signed proof response');
            chunks.push(part.value);
          }
        } finally {
          reader.releaseLock();
        }
        const aggregate = new Uint8Array(bytes);
        let offset = 0;
        for (const item of chunks) {
          aggregate.set(item, offset);
          offset += item.byteLength;
        }
        let proof: unknown;
        try {
          proof = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(aggregate));
        } catch {
          throw new Error('Invalid MyeongHa A4 proof JSON');
        }
        if (!validProofShape(proof, attemptId))
          throw new Error('MyeongHa A4 proof identity or envelope invalid');
        // HMAC, issuer, audience, time, key ID and source DB single-use
        // remain mandatory in createSajuA4SignedPreparedAttemptAdmissionV1.
        return proof;
      } finally {
        if (!response.bodyUsed) await response.body?.cancel().catch(() => undefined);
      }
    },
  });
}
