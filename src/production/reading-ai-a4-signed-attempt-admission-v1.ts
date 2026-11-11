import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { SajuA4ReceiptDatabasePoolV1 } from './reading-ai-provider-receipt-postgres-v1.js';
import type { SajuSourceAttemptContextV1 } from './reading-ai-source-call-correlation-v1.js';
import type { SajuA4PreparedAttemptAdmissionPortV1 } from './reading-ai-a4-private-provider-capture-v1.js';

export const SAJU_A4_PREPARED_ADMISSION_ROLE_V1 = 'saju_a4_prepared_attempt_claim_writer_v1';
export const SAJU_A4_PREPARED_ADMISSION_VERSION_V1 = 'myeongha-a4-prepared-attempt-proof-v1';
const DOMAIN = 'myeongha/a4/prepared-attempt-proof/v1\0';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const IDENT = /^[a-zA-Z0-9._:-]{3,128}$/u;
const SIGNATURE = /^[0-9a-f]{64}$/u;
const TTL_MAX_MS = 120_000;
const CLOCK_SKEW_MS = 10_000;
const INSERT = [
  'INSERT INTO saju_source_ops.a4_prepared_attempt_claims_v1',
  '  (execution_attempt_id, proof_digest_sha256)',
  'VALUES ($1::uuid, $2::text)',
  'ON CONFLICT (execution_attempt_id) DO NOTHING',
  'RETURNING execution_attempt_id::text AS "executionAttemptId"',
].join('\n');

function record(x: unknown): Record<string, unknown> | null {
  return x !== null && typeof x === 'object' && !Array.isArray(x)
    ? (x as Record<string, unknown>)
    : null;
}
function exact(x: Record<string, unknown> | null, fields: readonly string[]): boolean {
  return (
    x !== null &&
    Object.keys(x).length === fields.length &&
    fields.every((f) => Object.hasOwn(x, f))
  );
}
function canonical(x: unknown): unknown {
  if (Array.isArray(x)) return x.map(canonical);
  const r = record(x);
  if (!r) return x;
  return Object.fromEntries(
    Object.keys(r)
      .sort()
      .map((k) => [k, canonical(r[k])]),
  );
}

export interface MyeongHaA4PreparedAttemptProofV1 {
  readonly payload: Readonly<{
    version: typeof SAJU_A4_PREPARED_ADMISSION_VERSION_V1;
    issuer: string;
    audience: string;
    keyId: string;
    issuedAtMs: number;
    expiresAtMs: number;
    executionAttemptId: string;
    readingId: string;
    subjectId: string;
  }>;
  readonly signatureHex: string;
}

/**
 * Validates only MyeongHa's previously DB-admitted attempt assertion and
 * consumes a source-owned single-use claim. It NEVER proves Production
 * Interpretation Authority, entitlement, invoice coverage or publication.
 *
 * loadSignedProof is a private *trusted owner* connector, not a client body,
 * request header, or browser-supplied record. Until its real MyeongHa issuer,
 * authenticated transport and source DB role are installed, the capture
 * remains unmounted. Runtime callers MUST NOT fake a "true" admission.
 */
export function createSajuA4SignedPreparedAttemptAdmissionV1(
  input: Readonly<{
    pool: SajuA4ReceiptDatabasePoolV1;
    trustedIssuer: string;
    expectedAudience: string;
    trustedKeyId: string;
    keyBytes: Uint8Array;
    nowMs: () => number;
    loadSignedProof(attemptId: string): Promise<unknown>;
  }>,
): SajuA4PreparedAttemptAdmissionPortV1 {
  if (
    !input ||
    typeof input.pool?.connect !== 'function' ||
    typeof input.loadSignedProof !== 'function' ||
    typeof input.nowMs !== 'function' ||
    ![input.trustedIssuer, input.expectedAudience, input.trustedKeyId].every(
      (x) => typeof x === 'string' && IDENT.test(x),
    ) ||
    !(input.keyBytes instanceof Uint8Array) ||
    input.keyBytes.byteLength < 32
  )
    throw new TypeError('Trusted MyeongHa prepared-attempt signer and dedicated claim DB required');

  function validate(raw: unknown, attemptId: string): string | null {
    const proof = record(raw);
    if (!exact(proof, ['payload', 'signatureHex'])) return null;
    const payload = record(proof!.payload);
    if (
      !exact(payload, [
        'version',
        'issuer',
        'audience',
        'keyId',
        'issuedAtMs',
        'expiresAtMs',
        'executionAttemptId',
        'readingId',
        'subjectId',
      ])
    )
      return null;
    const now = input.nowMs();
    if (
      payload!.version !== SAJU_A4_PREPARED_ADMISSION_VERSION_V1 ||
      payload!.issuer !== input.trustedIssuer ||
      payload!.audience !== input.expectedAudience ||
      payload!.keyId !== input.trustedKeyId ||
      payload!.executionAttemptId !== attemptId ||
      ![payload!.readingId, payload!.subjectId].every(
        (v) => typeof v === 'string' && UUID.test(v),
      ) ||
      !Number.isSafeInteger(payload!.issuedAtMs) ||
      !Number.isSafeInteger(payload!.expiresAtMs) ||
      !Number.isSafeInteger(now) ||
      (payload!.expiresAtMs as number) <= (payload!.issuedAtMs as number) ||
      (payload!.expiresAtMs as number) - (payload!.issuedAtMs as number) > TTL_MAX_MS ||
      now < (payload!.issuedAtMs as number) - CLOCK_SKEW_MS ||
      now >= (payload!.expiresAtMs as number) ||
      typeof proof!.signatureHex !== 'string' ||
      !SIGNATURE.test(proof!.signatureHex)
    )
      return null;
    const expected = createHmac('sha256', input.keyBytes)
      .update(DOMAIN)
      .update(JSON.stringify(canonical(payload)))
      .digest();
    if (!timingSafeEqual(expected, Buffer.from(proof!.signatureHex, 'hex'))) return null;
    // Digest is audit-only. Neither a client-readable ticket nor key is stored.
    return createHash('sha256')
      .update(JSON.stringify(canonical(proof)))
      .digest('hex');
  }
  return Object.freeze({
    async admitAndConsumePreparedAttempt(attempt: SajuSourceAttemptContextV1): Promise<boolean> {
      if (
        !attempt ||
        typeof attempt.executionAttemptId !== 'string' ||
        !UUID.test(attempt.executionAttemptId)
      )
        return false;
      const proof = await input.loadSignedProof(attempt.executionAttemptId);
      const digest = validate(proof, attempt.executionAttemptId);
      if (digest === null) return false;
      const client = await input.pool.connect();
      let begun = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ WRITE');
        begun = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (
          role.rows.length !== 1 ||
          role.rows[0]?.currentUser !== SAJU_A4_PREPARED_ADMISSION_ROLE_V1
        )
          throw Error('Dedicated Saju A4 single-use admission claim role required');
        await client.query('SET LOCAL synchronous_commit TO on');
        const claimed = await client.query<{ executionAttemptId: unknown }>(INSERT, [
          attempt.executionAttemptId,
          digest,
        ]);
        if (
          claimed.rows.length > 1 ||
          (claimed.rows.length === 1 &&
            claimed.rows[0]?.executionAttemptId !== attempt.executionAttemptId)
        )
          throw Error('Untrusted A4 single-use admission claim response');
        await client.query('COMMIT');
        begun = false;
        return claimed.rows.length === 1;
      } catch (error) {
        if (begun) {
          try {
            await client.query('ROLLBACK');
          } catch (rollbackError) {
            discard = rollbackError;
            throw new AggregateError(
              [error, rollbackError],
              'Saju A4 attempt claim failed and rollback failed',
              { cause: rollbackError },
            );
          }
        }
        throw error;
      } finally {
        client.release(discard);
      }
    },
  });
}
