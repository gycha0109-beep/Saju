import {
  SAJU_A4_RECEIPT_WRITER_ROLE_V1,
  type SajuA4ReceiptDatabasePoolV1,
} from './reading-ai-provider-receipt-postgres-v1.js';

/**
 * Narrow, server-owned intent. Must be created before network dispatch.
 * Intent is not proof that a request reached the provider or was billed.
 */
export interface SajuA4ProviderDispatchIntentV1 {
  readonly callId: string;
  readonly requestId: string;
  readonly providerKey: 'openai';
  readonly modelKey: string;
  readonly preparedAt: string;
}

export interface SajuA4ProviderDispatchLinkV1 {
  readonly executionAttemptId: string;
  readonly externalRequestRef: string;
  readonly intent: SajuA4ProviderDispatchIntentV1;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
const FIELDS = ['callId', 'requestId', 'providerKey', 'modelKey', 'preparedAt'] as const;
const INSERT = `
INSERT INTO saju_source_ops.a4_provider_dispatch_intents_v1
  (call_id, execution_attempt_id, external_request_ref, intent)
VALUES ($1::uuid, $2::uuid, $3::text, $4::jsonb)
ON CONFLICT (call_id) DO NOTHING
`.trim();
const READ = `
SELECT execution_attempt_id::text AS "executionAttemptId",
       external_request_ref AS "externalRequestRef",
       intent::text AS "intentJson"
FROM saju_source_ops.a4_provider_dispatch_intents_v1
WHERE call_id = $1::uuid LIMIT 2
`.trim();

interface Stored {
  readonly executionAttemptId: unknown;
  readonly externalRequestRef: unknown;
  readonly intentJson: unknown;
}

function strictIntent(raw: unknown): raw is SajuA4ProviderDispatchIntentV1 {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
  const v = raw as Record<string, unknown>;
  const keys = Object.keys(v);
  if (keys.length !== FIELDS.length || !FIELDS.every((key) => Object.hasOwn(v, key)))
    return false;
  if (
    typeof v.callId !== 'string' ||
    !UUID.test(v.callId) ||
    typeof v.requestId !== 'string' ||
    v.requestId.length < 1 ||
    v.requestId.length > 256 ||
    typeof v.modelKey !== 'string' ||
    v.modelKey.length < 1 ||
    v.modelKey.length > 128 ||
    v.providerKey !== 'openai' ||
    typeof v.preparedAt !== 'string' ||
    !/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(v.preparedAt)
  ) return false;
  const time = Date.parse(v.preparedAt);
  return Number.isFinite(time) && new Date(time).toISOString() === v.preparedAt;
}

function validateLink(link: SajuA4ProviderDispatchLinkV1): string {
  if (
    !link ||
    typeof link.executionAttemptId !== 'string' ||
    !UUID.test(link.executionAttemptId) ||
    typeof link.externalRequestRef !== 'string' ||
    !link.externalRequestRef.startsWith('saju_source_') ||
    !UUID.test(link.externalRequestRef.slice('saju_source_'.length)) ||
    !strictIntent(link.intent)
  )
    throw new TypeError('Invalid A4 pre-network dispatch intent evidence');
  const encoded = JSON.stringify(link.intent);
  if (Buffer.byteLength(encoded, 'utf8') > 1024)
    throw new TypeError('Oversized A4 pre-network dispatch intent');
  return encoded;
}

/**
 * Server-only immutable intent persistence, off by default. A real adapter
 * must await it BEFORE fetch; failing this transaction prevents dispatch.
 * The existing Source receipt writer role alone can append/read the intent.
 *
 * Returning from this function proves only that an intent record committed.
 * It is never a provider usage observation or a billing/coverage verdict.
 */
export function createPostgresSajuProviderDispatchIntentRecorderV1(
  pool: SajuA4ReceiptDatabasePoolV1,
): Readonly<{ recordBeforeRequest(link: SajuA4ProviderDispatchLinkV1): Promise<void> }> {
  if (!pool || typeof pool.connect !== 'function')
    throw new TypeError('Dedicated A4 Source pre-network intent pool required');
  return Object.freeze({
    async recordBeforeRequest(link: SajuA4ProviderDispatchLinkV1): Promise<void> {
      const json = validateLink(link);
      const client = await pool.connect();
      let active = false;
      let discard: unknown;
      try {
        await client.query('BEGIN READ WRITE');
        active = true;
        const role = await client.query<{ currentUser: unknown }>(
          'SELECT current_user::text AS "currentUser"',
        );
        if (
          role.rows.length !== 1 ||
          role.rows[0]?.currentUser !== SAJU_A4_RECEIPT_WRITER_ROLE_V1
        )
          throw new Error('Dedicated Saju pre-network dispatch Writer required');
        await client.query('SET LOCAL synchronous_commit TO on');
        await client.query(INSERT, [
          link.intent.callId,
          link.executionAttemptId,
          link.externalRequestRef,
          json,
        ]);
        const saved = await client.query<Stored>(READ, [link.intent.callId]);
        const row = saved.rows[0];
        if (
          saved.rows.length !== 1 ||
          !row ||
          row.executionAttemptId !== link.executionAttemptId ||
          row.externalRequestRef !== link.externalRequestRef ||
          typeof row.intentJson !== 'string'
        )
          throw new Error('Immutable A4 pre-network dispatch intent missing or conflicting');
        let parsed: unknown;
        try {
          parsed = JSON.parse(row.intentJson);
        } catch {
          throw new Error('Invalid persisted A4 pre-network dispatch intent');
        }
        if (
          !strictIntent(parsed) ||
          FIELDS.some((key) => parsed[key] !== link.intent[key])
        )
          throw new Error('Immutable A4 pre-network dispatch intent missing or conflicting');
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
              'A4 pre-network intent failed and rollback failed',
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
