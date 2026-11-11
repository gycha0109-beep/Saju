import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

const CHECK_WRITER = `
SELECT current_user::text AS "currentUser",
  to_regclass('saju_source_ops.a4_provider_call_signed_receipts_v1')::text AS "receiptTable",
  to_regclass('saju_source_ops.a4_provider_call_coverage_v1')::text AS "coverageTable",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_signed_receipts_v1', 'call_id', 'INSERT') AS "receiptCallInsert",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_signed_receipts_v1', 'proof', 'INSERT') AS "receiptProofInsert",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_signed_receipts_v1', 'call_id', 'SELECT') AS "receiptCallRead",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_signed_receipts_v1', 'proof', 'SELECT') AS "receiptProofRead",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'execution_attempt_id', 'INSERT') AS "coverageAttemptInsert",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'external_request_ref', 'INSERT') AS "coverageRefInsert",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'coverage', 'INSERT') AS "coverageProofInsert",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'execution_attempt_id', 'SELECT') AS "coverageAttemptRead",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'external_request_ref', 'SELECT') AS "coverageRefRead",
  has_column_privilege(current_user, 'saju_source_ops.a4_provider_call_coverage_v1', 'coverage', 'SELECT') AS "coverageProofRead"
`.trim();

const REQUIRED_TRUE = [
  'receiptCallInsert',
  'receiptProofInsert',
  'receiptCallRead',
  'receiptProofRead',
  'coverageAttemptInsert',
  'coverageRefInsert',
  'coverageProofInsert',
  'coverageAttemptRead',
  'coverageRefRead',
  'coverageProofRead',
] as const;

interface WriterReadinessRow {
  readonly currentUser: unknown;
  readonly receiptTable: unknown;
  readonly coverageTable: unknown;
  readonly receiptCallInsert: unknown;
  readonly receiptProofInsert: unknown;
  readonly receiptCallRead: unknown;
  readonly receiptProofRead: unknown;
  readonly coverageAttemptInsert: unknown;
  readonly coverageRefInsert: unknown;
  readonly coverageProofInsert: unknown;
  readonly coverageAttemptRead: unknown;
  readonly coverageRefRead: unknown;
  readonly coverageProofRead: unknown;
}

/**
 * Fail closed before consuming a DB-authorized attempt or initiating a paid
 * provider request if the isolated Source receipt writer is not reachable
 * with the expected schema and column-scoped privileges.
 *
 * This read-only check cannot guarantee a subsequent INSERT, an eventual
 * provider callback, invoice completeness or continuous connectivity.
 */
export async function assertSajuA4SourceWriterReadyV1(
  pool: SajuA4ReceiptDatabasePoolV1,
): Promise<void> {
  if (typeof pool?.connect !== 'function')
    throw new TypeError('Dedicated A4 Source receipt writer required');
  const client = await pool.connect();
  let active = false;
  let discard: unknown;
  try {
    await client.query('BEGIN READ ONLY');
    active = true;
    const result = await client.query<WriterReadinessRow>(CHECK_WRITER);
    const row = result.rows[0];
    if (
      result.rows.length !== 1 ||
      !row ||
      row.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1 ||
      row.receiptTable !== 'saju_source_ops.a4_provider_call_signed_receipts_v1' ||
      row.coverageTable !== 'saju_source_ops.a4_provider_call_coverage_v1' ||
      REQUIRED_TRUE.some((key) => row[key] !== true)
    )
      throw new Error('Saju A4 Source receipt writer is not ready for provider dispatch');
    await client.query('COMMIT');
    active = false;
  } catch (error) {
    if (active) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        discard = rollbackError;
        throw new AggregateError(
          [error, rollbackError],
          'Saju A4 Source writer preflight and rollback failed',
          { cause: rollbackError },
        );
      }
    }
    throw error;
  } finally {
    client.release(discard);
  }
}
