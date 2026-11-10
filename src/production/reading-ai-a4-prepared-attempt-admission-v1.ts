import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { SajuSourceAttemptContextV1 } from './reading-ai-source-call-correlation-v1.js';

const VERSION = 'myeongha-a4-prepared-attempt-handoff-v1' as const;
const ISSUER = 'myeongha-official-reading' as const;
const AUDIENCE = 'saju-a4-provider-capture' as const;
const DOMAIN = 'myeongha/a4/prepared-attempt-handoff/v1\0';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const SHA256 = /^[0-9a-f]{64}$/u;
const KEY_ID = /^[A-Za-z0-9_.-]{1,64}$/u;
const MAX_REQUEST_BYTES = 16 * 1024;
const MAX_TTL_MS = 120_000;

export interface SajuA4PreparedAttemptHandoffPayloadV1 {
  readonly version: typeof VERSION;
  readonly issuer: typeof ISSUER;
  readonly audience: typeof AUDIENCE;
  readonly keyId: string;
  readonly executionAttemptId: string;
  readonly requestSha256Hex: string;
  readonly nonce: string;
  readonly issuedAtMs: number;
  readonly expiresAtMs: number;
}
export interface SajuA4PreparedAttemptHandoffV1 {
  readonly payload: SajuA4PreparedAttemptHandoffPayloadV1;
  readonly signatureHex: string;
}
export interface SajuA4OneTimePreparedAttemptAuthorityV1 {
  /** Atomic, durable consume: must validate this exact prepared DB attempt and
   * nonce from a trusted server-to-server session, rejecting any replay.
   * Never implement with an in-memory Set for Production. */
  admitAndConsumeOnce(
    input: Readonly<{
      executionAttemptId: string;
      nonce: string;
      expiresAtMs: number;
      requestSha256Hex: string;
    }>,
  ): Promise<boolean>;
}

function exactKeys(input: unknown, names: readonly string[]): boolean {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return false;
  const keys = Object.keys(input);
  return keys.length === names.length && names.every((key) => Object.hasOwn(input, key));
}

export function verifySajuA4PreparedAttemptHandoffV1(
  input: Readonly<{
    proof: unknown;
    requestBody: string;
    keyBytes: Uint8Array;
    trustedKeyId: string;
    nowMs: number;
  }>,
): SajuA4PreparedAttemptHandoffPayloadV1 | null {
  if (
    !input ||
    typeof input.requestBody !== 'string' ||
    Buffer.byteLength(input.requestBody, 'utf8') < 1 ||
    Buffer.byteLength(input.requestBody, 'utf8') > MAX_REQUEST_BYTES ||
    !(input.keyBytes instanceof Uint8Array) ||
    input.keyBytes.length < 32 ||
    typeof input.trustedKeyId !== 'string' ||
    !KEY_ID.test(input.trustedKeyId) ||
    !Number.isSafeInteger(input.nowMs)
  )
    return null;

  if (!exactKeys(input.proof, ['payload', 'signatureHex'])) return null;
  const proof = input.proof as SajuA4PreparedAttemptHandoffV1;
  if (
    !exactKeys(proof.payload, [
      'version',
      'issuer',
      'audience',
      'keyId',
      'executionAttemptId',
      'requestSha256Hex',
      'nonce',
      'issuedAtMs',
      'expiresAtMs',
    ])
  )
    return null;
  const p = proof.payload;
  if (
    p.version !== VERSION ||
    p.issuer !== ISSUER ||
    p.audience !== AUDIENCE ||
    p.keyId !== input.trustedKeyId ||
    typeof p.executionAttemptId !== 'string' ||
    !UUID.test(p.executionAttemptId) ||
    typeof p.nonce !== 'string' ||
    !UUID.test(p.nonce) ||
    typeof p.requestSha256Hex !== 'string' ||
    !SHA256.test(p.requestSha256Hex) ||
    !Number.isSafeInteger(p.issuedAtMs) ||
    !Number.isSafeInteger(p.expiresAtMs) ||
    p.issuedAtMs < 1 ||
    p.expiresAtMs <= p.issuedAtMs ||
    p.expiresAtMs - p.issuedAtMs > MAX_TTL_MS ||
    input.nowMs < p.issuedAtMs - 5_000 ||
    input.nowMs >= p.expiresAtMs ||
    typeof proof.signatureHex !== 'string' ||
    !SHA256.test(proof.signatureHex)
  )
    return null;
  try {
    const parsed: unknown = JSON.parse(input.requestBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  } catch {
    return null;
  }

  const actualDigest = createHash('sha256').update(input.requestBody, 'utf8').digest('hex');
  if (!timingSafeEqual(Buffer.from(actualDigest, 'hex'), Buffer.from(p.requestSha256Hex, 'hex')))
    return null;
  const expected = createHmac('sha256', Uint8Array.from(input.keyBytes))
    .update(DOMAIN, 'utf8')
    .update(JSON.stringify(p), 'utf8')
    .digest();
  if (!timingSafeEqual(expected, Buffer.from(proof.signatureHex, 'hex'))) return null;
  return Object.freeze({ ...p });
}

/**
 * Creates an admission port for one private Saju request. Service bearer/auth,
 * request parsing and the authoritative Production Interpretation gate MUST
 * succeed in the enclosing server handler before this port is constructed.
 * This module grants neither of those permissions and mounts no route.
 */
export function createSajuA4SignedPreparedAttemptAdmissionV1(
  input: Readonly<{
    proof: unknown;
    requestBody: string;
    keyBytes: Uint8Array;
    trustedKeyId: string;
    nowMs: () => number;
    authority: SajuA4OneTimePreparedAttemptAuthorityV1;
  }>,
): Readonly<{
  admitAndConsumePreparedAttempt(attempt: SajuSourceAttemptContextV1): Promise<boolean>;
}> {
  if (
    !input ||
    typeof input.nowMs !== 'function' ||
    typeof input.authority?.admitAndConsumeOnce !== 'function'
  )
    throw new TypeError('Saju server authority and single-use attempt consumption required');
  const key = Uint8Array.from(input.keyBytes);
  return Object.freeze({
    async admitAndConsumePreparedAttempt(attempt: SajuSourceAttemptContextV1): Promise<boolean> {
      const payload = verifySajuA4PreparedAttemptHandoffV1({
        proof: input.proof,
        requestBody: input.requestBody,
        keyBytes: key,
        trustedKeyId: input.trustedKeyId,
        nowMs: input.nowMs(),
      });
      if (!payload || !attempt || payload.executionAttemptId !== attempt.executionAttemptId)
        return false;
      return input.authority.admitAndConsumeOnce({
        executionAttemptId: payload.executionAttemptId,
        nonce: payload.nonce,
        expiresAtMs: payload.expiresAtMs,
        requestSha256Hex: payload.requestSha256Hex,
      });
    },
  });
}
