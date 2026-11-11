import type { SajuProviderCallObserverCoverageV1 } from './reading-ai-source-call-correlation-v1.js';
import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const KEYS = [
  'version',
  'executionAttemptId',
  'externalRequestRef',
  'observedCallbacks',
  'acknowledgedReceipts',
  'failedCallbacks',
  'pendingCallbacks',
  'execution',
  'completeCostCoverage',
] as const;
const INSERT = `
INSERT INTO saju_source_ops.a4_provider_call_coverage_v1
  (execution_attempt_id, external_request_ref, coverage)
VALUES ($1::uuid, $2::text, $3::jsonb)
ON CONFLICT (execution_attempt_id) DO NOTHING
`.trim();
const READ = `
SELECT coverage::text AS "coverageJson"
FROM saju_source_ops.a4_provider_call_coverage_v1
WHERE execution_attempt_id = $1::uuid
LIMIT 2
`.trim();

function validCoverage(raw: unknown): raw is SajuProviderCallObserverCoverageV1 {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
  const item = raw as Record<string, unknown>;
  const keys = Object.keys(item);
  if (keys.length !== KEYS.length || !KEYS.every((key) => Object.hasOwn(item, key))) return false;
  if (
    item.version !== 'saju-provider-call-observer-coverage-v1' ||
    typeof item.executionAttemptId !== 'string' ||
    !UUID.test(item.executionAttemptId) ||
    typeof item.externalRequestRef !== 'string' ||
    !/^saju_source_[0-9a-f-]{36}$/u.test(item.externalRequestRef) ||
    !UUID.test(item.externalRequestRef.slice('saju_source_'.length)) ||
    (item.execution !== 'returned' && item.execution !== 'threw') ||
    item.completeCostCoverage !== false
  )
    return false;
  const counters = KEYS.slice(3, 7);
  if (
    counters.some(
      (key) =>
        typeof item[key] !== 'number' || !Number.isSafeInteger(item[key]) || Number(item[key]) < 0,
    )
  )
    return false;
  return (
    item.observedCallbacks ===
    Number(item.acknowledgedReceipts) + Number(item.failedCallbacks) + Number(item.pendingCallbacks)
  );
}

function exactCoverage(returned: unknown, expected: SajuProviderCallObserverCoverageV1): boolean {
  if (!validCoverage(returned)) return false;
  const row = returned as unknown as Record<string, unknown>;
  const requested = expected as unknown as Record<string, unknown>;
  return KEYS.every((key) => row[key] === requested[key]);
}

/**
 * Durable source-owned per-attempt callback coverage record. It can only be
 * invoked by the preadmitted Saju execution scope after the provider adapter
 * settles. A report is acknowledged only after INSERT, readback and COMMIT.
 *
 * IMPORTANT: these counters describe OBSERVED callback attempts, never the
 * total external provider usage or invoice. completeCostCoverage is always
 * false, even if every locally observed callback was persisted.
 */
export function createPostgresSajuProviderCoverageRecorderV1(
  input: Readonly<{
    pool: SajuA4ReceiptDatabasePoolV1;
  }>,
): Readonly<{ reportCoverage(report: SajuProviderCallObserverCoverageV1): Promise<void> }> {
  if (!input || typeof input.pool?.connect !== 'function')
    throw new TypeError('Dedicated source coverage writer pool required');

  return Object.freeze({
    async reportCoverage(report: SajuProviderCallObserverCoverageV1): Promise<void> {
      if (!validCoverage(report))
        throw new TypeError('Valid incomplete Saju source callback coverage required');
      const client = await input.pool.connect();
      let active = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ WRITE');
        active = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (role.rows.length !== 1 || role.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1)
          throw Error('Dedicated Saju source coverage writer role required');

        await client.query('SET LOCAL synchronous_commit TO on');
        await client.query(INSERT, [
          report.executionAttemptId,
          report.externalRequestRef,
          JSON.stringify(report),
        ]);
        const rows = await client.query<{ coverageJson: unknown }>(READ, [
          report.executionAttemptId,
        ]);
        if (
          rows.rows.length !== 1 ||
          typeof rows.rows[0]?.coverageJson !== 'string' ||
          !exactCoverage(JSON.parse(rows.rows[0].coverageJson), report)
        )
          throw Error('Saju source coverage was not immutably acknowledged');
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
              'Saju source coverage failed and rollback failed',
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
