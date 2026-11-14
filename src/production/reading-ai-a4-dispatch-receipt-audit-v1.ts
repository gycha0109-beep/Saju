import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const SOURCE_REF = /^saju_source_[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const FIELDS = ['callId', 'requestId', 'providerKey', 'modelKey', 'preparedAt'] as const;
const READ_INTENTS = [
  'SELECT call_id::text AS "callId", execution_attempt_id::text AS "executionAttemptId",',
  'external_request_ref AS "externalRequestRef", intent::text AS "intentJson"',
  'FROM saju_source_ops.a4_provider_dispatch_intents_v1',
  'WHERE execution_attempt_id = $1::uuid ORDER BY call_id LIMIT 501',
].join('\n');
const READ_UNMATCHED_INTENTS = [
  'SELECT i.call_id::text AS "callId", i.execution_attempt_id::text AS "executionAttemptId",',
  'i.external_request_ref AS "externalRequestRef", i.intent::text AS "intentJson"',
  'FROM saju_source_ops.a4_provider_dispatch_intents_v1 AS i',
  'WHERE NOT EXISTS (',
  '  SELECT 1 FROM saju_source_ops.a4_provider_call_signed_receipts_v1 AS r',
  '  WHERE r.call_id = i.call_id',
  ') ORDER BY i.call_id LIMIT 501',
].join('\n');
const READ_RECEIPTS = [
  'SELECT call_id::text AS "callId", proof::text AS "proofJson"',
  'FROM saju_source_ops.a4_provider_call_signed_receipts_v1',
  "WHERE proof #>> '{payload,link,executionAttemptId}' = $1::text",
  'ORDER BY call_id LIMIT 501',
].join('\n');

export type SajuA4DispatchReceiptStatusV1 =
  | 'no_local_evidence'
  | 'intent_without_receipt'
  | 'receipt_without_intent'
  | 'call_binding_mismatch'
  | 'invalid_source_evidence'
  | 'census_truncated'
  | 'matched_with_provider_usage_unverified'
  | 'matched_with_usage_unknown_unverified';

/** Only unmatched Source-local intents. Never implies an HTTP send or charge. */
export interface SajuA4UnmatchedDispatchIntentV1 {
  readonly callId: string;
  readonly executionAttemptId: string;
  readonly externalRequestRef: string;
  readonly preparedAt: string;
}
export interface SajuA4UnmatchedDispatchCensusV1 {
  readonly version: 'saju-a4-unmatched-dispatch-census-v1';
  readonly status:
    | 'no_local_intents_missing_receipts'
    | 'local_intents_without_receipts_observed'
    | 'census_truncated';
  /** Null when the bounded 500-row sample is incomplete. */
  readonly unmatchedIntents: readonly SajuA4UnmatchedDispatchIntentV1[] | null;
  readonly unmatchedCount: number | null;
  readonly completeCostCoverage: false;
}

export interface SajuA4DispatchReceiptAuditResultV1 {
  readonly version: 'saju-a4-dispatch-receipt-audit-v1';
  readonly executionAttemptId: string;
  readonly status: SajuA4DispatchReceiptStatusV1;
  readonly intentCount: number | null;
  readonly signedReceiptCount: number | null;
  readonly providerUsageReceipts: number | null;
  readonly unknownUsageReceipts: number | null;
  /** An intent is not proof of network transmission, provider billing, or cost completeness. */
  readonly completeCostCoverage: false;
}

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}
function parse(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== 'string') return null;
  try {
    return object(JSON.parse(raw));
  } catch {
    return null;
  }
}
function exact(value: Record<string, unknown> | null, keys: readonly string[]): boolean {
  return value !== null && Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key));
}
function dispatch(
  row: Record<string, unknown>,
  attemptId: string,
): Readonly<{ callId: string; externalRequestRef: string; intent: Record<string, unknown> }> | null {
  if (
    typeof row.callId !== 'string' || !UUID.test(row.callId) ||
    row.executionAttemptId !== attemptId ||
    typeof row.externalRequestRef !== 'string' || !SOURCE_REF.test(row.externalRequestRef)
  ) return null;
  const intent = parse(row.intentJson);
  if (
    !exact(intent, FIELDS) || intent!.callId !== row.callId ||
    intent!.providerKey !== 'openai' ||
    typeof intent!.requestId !== 'string' || intent!.requestId.length < 1 ||
    intent!.requestId.length > 256 ||
    typeof intent!.modelKey !== 'string' || intent!.modelKey.length < 1 ||
    intent!.modelKey.length > 128 ||
    typeof intent!.preparedAt !== 'string' ||
    !/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(intent!.preparedAt)
  ) return null;
  const timestamp = Date.parse(intent!.preparedAt);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString() !== intent!.preparedAt)
    return null;
  return { callId: row.callId, externalRequestRef: row.externalRequestRef, intent: intent! };
}
function receipt(
  row: Record<string, unknown>,
  attemptId: string,
): Readonly<{ callId: string; externalRequestRef: string; observation: Record<string, unknown> }> | null {
  if (typeof row.callId !== 'string' || !UUID.test(row.callId)) return null;
  const stored = parse(row.proofJson);
  const payload = object(stored?.payload);
  const link = object(payload?.link);
  const observation = object(link?.observation);
  if (
    !observation ||
    link?.executionAttemptId !== attemptId ||
    typeof link.externalRequestRef !== 'string' ||
    !SOURCE_REF.test(link.externalRequestRef) ||
    observation.callId !== row.callId ||
    observation.providerKey !== 'openai'
  ) return null;
  return { callId: row.callId, externalRequestRef: link.externalRequestRef, observation };
}

/**
 * Bounded, read-only Source provenance comparison. The EXISTING callback coverage
 * audit verifies receipt HMAC and local callback totals separately. This layer
 * only compares prior committed dispatch intents against those signed receipts.
 * It cannot prove actual network delivery, provider-wide calls or invoice costs.
 * Run only with the dedicated Source Writer; never expose as public HTTP.
 */
export function createPostgresSajuA4DispatchReceiptAuditV1(
  pool: SajuA4ReceiptDatabasePoolV1,
): Readonly<{
  inspectAttempt(id: string): Promise<SajuA4DispatchReceiptAuditResultV1>;
  inspectUnmatchedIntents(): Promise<SajuA4UnmatchedDispatchCensusV1>;
}> {
  if (!pool || typeof pool.connect !== 'function')
    throw new TypeError('Dedicated A4 Source audit pool required');
  return Object.freeze({
    async inspectAttempt(id: string): Promise<SajuA4DispatchReceiptAuditResultV1> {
      if (typeof id !== 'string' || !UUID.test(id))
        throw new TypeError('Exact server-selected execution attempt UUID required');
      const client = await pool.connect();
      let active = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ ONLY');
        active = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (role.rows.length !== 1 || role.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1)
          throw new Error('Dedicated Saju Source dispatch audit Writer required');
        const intents = await client.query<Record<string, unknown>>(READ_INTENTS, [id]);
        const receipts = await client.query<Record<string, unknown>>(READ_RECEIPTS, [id]);
        const truncated = intents.rows.length > 500 || receipts.rows.length > 500;
        let status: SajuA4DispatchReceiptStatusV1 = 'no_local_evidence';
        let providerUsageReceipts = 0;
        let unknownUsageReceipts = 0;
        if (truncated) {
          status = 'census_truncated';
        } else {
          const intentMap = new Map<string, NonNullable<ReturnType<typeof dispatch>>>();
          const receiptMap = new Map<string, NonNullable<ReturnType<typeof receipt>>>();
          let invalid = false;
          for (const row of intents.rows) {
            const parsed = dispatch(row, id);
            if (!parsed || intentMap.has(parsed.callId)) invalid = true;
            else intentMap.set(parsed.callId, parsed);
          }
          for (const row of receipts.rows) {
            const parsed = receipt(row, id);
            if (!parsed || receiptMap.has(parsed.callId)) invalid = true;
            else receiptMap.set(parsed.callId, parsed);
          }
          if (invalid) {
            status = 'invalid_source_evidence';
          } else if (intentMap.size === 0 && receiptMap.size === 0) {
            status = 'no_local_evidence';
          } else if ([...intentMap.keys()].some((id) => !receiptMap.has(id))) {
            status = 'intent_without_receipt';
          } else if ([...receiptMap.keys()].some((id) => !intentMap.has(id))) {
            status = 'receipt_without_intent';
          } else {
            let match = true;
            for (const [callId, intent] of intentMap) {
              const stored = receiptMap.get(callId)!;
              const observation = stored.observation;
              if (
                stored.externalRequestRef !== intent.externalRequestRef ||
                observation.requestId !== intent.intent.requestId ||
                observation.providerKey !== intent.intent.providerKey ||
                observation.modelKey !== intent.intent.modelKey
              ) {
                match = false;
                break;
              }
              if (observation.source === 'provider_response_usage') {
                providerUsageReceipts++;
              } else if (observation.source === 'provider_attempt_without_usage') {
                unknownUsageReceipts++;
              } else {
                match = false;
                break;
              }
            }
            status = !match
              ? 'call_binding_mismatch'
              : unknownUsageReceipts > 0
                ? 'matched_with_usage_unknown_unverified'
                : 'matched_with_provider_usage_unverified';
          }
        }
        const result: SajuA4DispatchReceiptAuditResultV1 = Object.freeze({
          version: 'saju-a4-dispatch-receipt-audit-v1',
          executionAttemptId: id,
          status,
          intentCount: truncated ? null : intents.rows.length,
          signedReceiptCount: truncated ? null : receipts.rows.length,
          providerUsageReceipts: truncated ? null : providerUsageReceipts,
          unknownUsageReceipts: truncated ? null : unknownUsageReceipts,
          completeCostCoverage: false,
        });
        await client.query('COMMIT');
        active = false;
        return result;
      } catch (error) {
        if (active) {
          try {
            await client.query('ROLLBACK');
          } catch (rollbackError) {
            discard = rollbackError;
            throw new AggregateError(
              [error, rollbackError], 'A4 Source dispatch audit and rollback failed',
              { cause: rollbackError },
            );
          }
        }
        throw error;
      } finally {
        client.release(discard);
      }
    },
    /**
     * Offline, bounded Source-only visibility into process-crash / receipt-write gaps.
     * Missing receipts do not establish that a request was actually transmitted,
     * accepted, billed, or retryable. Never automatically replay these calls.
     * This MUST NOT be mounted as a public/admin HTTP route without a separately
     * approved server authority and retention policy.
     */
    async inspectUnmatchedIntents(): Promise<SajuA4UnmatchedDispatchCensusV1> {
      const client = await pool.connect();
      let active = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ ONLY');
        active = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (role.rows.length !== 1 || role.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1)
          throw new Error('Dedicated Saju Source unmatched dispatch audit Writer required');

        const records = await client.query<Record<string, unknown>>(READ_UNMATCHED_INTENTS);
        const truncated = records.rows.length > 500;
        const unmatched: SajuA4UnmatchedDispatchIntentV1[] = [];
        if (!truncated) {
          const seen = new Set<string>();
          for (const row of records.rows) {
            if (typeof row.executionAttemptId !== 'string' || !UUID.test(row.executionAttemptId))
              throw new Error('Invalid unmatched Source dispatch attempt evidence');
            const verified = dispatch(row, row.executionAttemptId);
            if (!verified || seen.has(verified.callId))
              throw new Error('Invalid or duplicate unmatched Source dispatch evidence');
            seen.add(verified.callId);
            unmatched.push(Object.freeze({
              callId: verified.callId,
              executionAttemptId: row.executionAttemptId,
              externalRequestRef: verified.externalRequestRef,
              preparedAt: verified.intent.preparedAt as string,
            }));
          }
        }
        const result: SajuA4UnmatchedDispatchCensusV1 = Object.freeze({
          version: 'saju-a4-unmatched-dispatch-census-v1',
          status: truncated
            ? 'census_truncated'
            : unmatched.length === 0
              ? 'no_local_intents_missing_receipts'
              : 'local_intents_without_receipts_observed',
          unmatchedIntents: truncated ? null : Object.freeze(unmatched),
          unmatchedCount: truncated ? null : unmatched.length,
          completeCostCoverage: false,
        });
        await client.query('COMMIT');
        active = false;
        return result;
      } catch (error) {
        if (active) {
          try {
            await client.query('ROLLBACK');
          } catch (rollbackError) {
            discard = rollbackError;
            throw new AggregateError(
              [error, rollbackError], 'A4 unmatched Source dispatch audit and rollback failed',
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
