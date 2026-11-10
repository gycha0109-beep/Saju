import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const HEX = /^[0-9a-f]{64}$/u;
const ROLE_SQL = 'SELECT current_user::text AS "currentUser"';
const INSERT = `
INSERT INTO saju_source_ops.a4_prepared_attempt_consumptions_v1
  (execution_attempt_id, nonce, request_sha256_hex, expires_at_ms)
VALUES ($1::uuid, $2::uuid, $3::text, $4::bigint)
ON CONFLICT DO NOTHING
RETURNING execution_attempt_id::text AS "executionAttemptId"
`.trim();

/**
 * Storage boundary for an already verified MyeongHa signed prepared-attempt
 * handoff. It never verifies a signature, Production interpretation rights or
 * service Bearer itself. The caller MUST verify those independently before
 * invoking this port. It is not mounted as a public HTTP route.
 *
 * The source-owned schema provides unique indexes on BOTH canonical attempt
 * and nonce. The first concurrent insert wins; a replay never becomes a new
 * network grant. A successful acknowledgment requires COMMIT.
 */
export function createPostgresSajuA4OneTimePreparedAttemptAuthorityV1(
  input: Readonly<{
    pool: SajuA4ReceiptDatabasePoolV1;
    nowMs: () => number;
  }>,
): Readonly<{
  admitAndConsumeOnce(
    request: Readonly<{
      executionAttemptId: string;
      nonce: string;
      expiresAtMs: number;
      requestSha256Hex: string;
    }>,
  ): Promise<boolean>;
}> {
  if (!input || typeof input.pool?.connect !== 'function' || typeof input.nowMs !== 'function')
    throw TypeError('Dedicated Saju source DB and server clock required');
  return Object.freeze({
    async admitAndConsumeOnce(request): Promise<boolean> {
      const now = input.nowMs();
      if (
        !request ||
        typeof request.executionAttemptId !== 'string' ||
        !UUID.test(request.executionAttemptId) ||
        typeof request.nonce !== 'string' ||
        !UUID.test(request.nonce) ||
        typeof request.requestSha256Hex !== 'string' ||
        !HEX.test(request.requestSha256Hex) ||
        !Number.isSafeInteger(request.expiresAtMs) ||
        !Number.isSafeInteger(now) ||
        now >= request.expiresAtMs ||
        request.expiresAtMs - now > 120_000 + 5_000
      )
        return false;
      const client = await input.pool.connect();
      let active = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ WRITE');
        active = true;
        const principal = await client.query<{ currentUser: unknown }>(ROLE_SQL);
        if (
          principal.rows.length !== 1 ||
          principal.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1
        )
          throw Error('Dedicated Saju prepared-attempt writer role required');
        await client.query('SET LOCAL synchronous_commit TO on');
        const inserted = await client.query<{ executionAttemptId: unknown }>(INSERT, [
          request.executionAttemptId,
          request.nonce,
          request.requestSha256Hex,
          request.expiresAtMs,
        ]);
        if (
          inserted.rows.length > 1 ||
          (inserted.rows.length === 1 &&
            inserted.rows[0]?.executionAttemptId !== request.executionAttemptId)
        )
          throw Error('Untrusted Saju prepared-attempt consumption acknowledgment');
        await client.query('COMMIT');
        active = false;
        return inserted.rows.length === 1;
      } catch (error) {
        if (active) {
          try {
            await client.query('ROLLBACK');
          } catch (rollbackError) {
            discard = rollbackError;
            throw new AggregateError(
              [error, rollbackError],
              'Saju prepared-attempt consumption and rollback failed',
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
